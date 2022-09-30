#ifndef SECGEAR_SM2_H
#define SECGEAR_SM2_H

/*
 * Ref: 
 * GB/T 32918.1-2016
 * GB/T 32918.2-2016
 * GB/T 32918.3-2016
 * GB/T 32918.4-2016
 * GB/T 32918.5-2017
 */

#include <string.h>
#include "../include/common_utils.h"
#include "../include/ec.h"
#include "../sm3/sm3.h"
#define SM2ERR(msg) fprintf(stderr,msg);goto err;
/*
 * export C_INCLUDE_PATH="/PATH/TO/OPENSSL/include"(/opt/homebrew/Cellar/openssl@1.1/1.1.1m/include)
 * export CPLUS_INCLUDE_PATH="/PATH/TO/OPENSSL/include"
 * export LIBRARY_PATH="/PATH/TO/OPENSSL/lib"
 */

/* Parameters */
/* EC: y^2 = x^3 + ax + b */

#define SM2_PARAM_CBLOCK 32
#define SM2_PARAM_LBLOCK (SM2_PARAM_CBLOCK/4)

const uint8 SM2_P[SM2_PARAM_CBLOCK] = {
    0xFF, 0xFF, 0xFF, 0xFE, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0x00, 0x00, 0x00, 0x00, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
};
const uint8 SM2_A[SM2_PARAM_CBLOCK] = {
    0xFF, 0xFF, 0xFF, 0xFE, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0x00, 0x00, 0x00, 0x00, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFC, 
};
const uint8 SM2_B[SM2_PARAM_CBLOCK] = {
    0x28, 0xE9, 0xFA, 0x9E, 
    0x9D, 0x9F, 0x5E, 0x34, 
    0x4D, 0x5A, 0x9E, 0x4B, 
    0xCF, 0x65, 0x09, 0xA7, 
    0xF3, 0x97, 0x89, 0xF5, 
    0x15, 0xAB, 0x8F, 0x92, 
    0xDD, 0xBC, 0xBD, 0x41, 
    0x4D, 0x94, 0x0E, 0x93, 
};
const uint8 SM2_N[SM2_PARAM_CBLOCK] = {
    0xFF, 0xFF, 0xFF, 0xFE, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 
    0x72, 0x03, 0xDF, 0x6B, 
    0x21, 0xC6, 0x05, 0x2B, 
    0x53, 0xBB, 0xF4, 0x09, 
    0x39, 0xD5, 0x41, 0x23, 
};
const uint8 SM2_XG[SM2_PARAM_CBLOCK] = {
    0x32, 0xC4, 0xAE, 0x2C, 
    0x1F, 0x19, 0x81, 0x19, 
    0x5F, 0x99, 0x04, 0x46, 
    0x6A, 0x39, 0xC9, 0x94, 
    0x8F, 0xE3, 0x0B, 0xBF, 
    0xF2, 0x66, 0x0B, 0xE1, 
    0x71, 0x5A, 0x45, 0x89, 
    0x33, 0x4C, 0x74, 0xC7, 
};
const uint8 SM2_YG[SM2_PARAM_CBLOCK] = {
    0xBC, 0x37, 0x36, 0xA2, 
    0xF4, 0xF6, 0x77, 0x9C, 
    0x59, 0xBD, 0xCE, 0xE3, 
    0x6B, 0x69, 0x21, 0x53, 
    0xD0, 0xA9, 0x87, 0x7C, 
    0xC6, 0x2A, 0x47, 0x40, 
    0x02, 0xDF, 0x32, 0xE5, 
    0x21, 0x39, 0xF0, 0xA0, 
};

typedef struct sm2_sig_st {
    BIGNUM *r;
    BIGNUM *s;
} SM2_SIG;

int SM2_SIG_init(SM2_SIG *sig) {
    sig->r = BN_new();
    sig->s = BN_new();
    if (sig->r == NULL || sig->s == NULL) {
        BN_free(sig->r);
        BN_free(sig->s);
        return 0;
    }
    return 1;
}

SM2_SIG *SM2_SIG_new() {
    SM2_SIG *ret;
    ret = malloc(sizeof(*ret));
    if (ret == NULL) {
        return NULL;
    }
    if (!SM2_SIG_init(ret)) {
        free(ret);
        return NULL;
    }
    return ret;
}

int sm2_compute_z(uint8 *out, const uint8 *id, const size_t idlen, const EC_KEY *key){
    /* ZA = SM3(ENTLA || IDA || a || b || xG || yG || xA || yA) */
    uint16 entlen = idlen << 3;
    // printf("entlen: %04X\n", entlen);
    uint8 e_bytes, *buf;
    int p_bytes;
    SM3_CTX c;
    sm3_init(&c);
    // debugPrint;
    if (idlen > (UINT16_MAX >> 3)) {
        SM2ERR("SM2_compute_z(): idlen too large!\n");
    }
    e_bytes = entlen >> 8;
    // printf("ENTL_H: %02X\n", e_bytes);
    sm3_update(&c, &e_bytes, 1);
    e_bytes = entlen & 0xFF;
    // printf("ENTL_L: %02X\n", e_bytes);
    sm3_update(&c, &e_bytes, 1);
    // printf("ID_A: ");
    // for (int i=0; i<idlen; ++i) {
    //     printf("%02X", id[i]);
    // }
    // printf("\n");
    if (!sm3_update(&c, id, idlen)) {
        goto err;
    }
    p_bytes = BN_num_bytes(key->group->field);
    // debugPrint;
    buf = malloc(p_bytes);
    // debugPrint;
    if (!BN_bn2binpad(key->group->a, buf, p_bytes)) {
        goto err;
    }
    // printf("a: ");
    // for (int i=0; i<p_bytes; ++i) {
    //     printf("%02X", buf[i]);
    // }
    // printf("\n");
    // debugPrint;
    if (!sm3_update(&c, buf, p_bytes)) {
        goto err;
    }
    // debugPrint;
    if (!BN_bn2binpad(key->group->b, buf, p_bytes)) {
        goto err;
    }
    // printf("b: ");
    // for (int i=0; i<p_bytes; ++i) {
    //     printf("%02X", buf[i]);
    // }
    // printf("\n");
    // debugPrint;
    if (!sm3_update(&c, buf, p_bytes)) {
        goto err;
    }
    // debugPrint;
    if (!BN_bn2binpad(key->group->generator->X, buf, p_bytes)) {
        goto err;
    }
    // printf("XG: ");
    // for (int i=0; i<p_bytes; ++i) {
    //     printf("%02X", buf[i]);
    // }
    // printf("\n");
    // debugPrint;
    if (!sm3_update(&c, buf, p_bytes)) {
        goto err;
    }
    // debugPrint;
    if (!BN_bn2binpad(key->group->generator->Y, buf, p_bytes)) {
        goto err;
    }
    // printf("YG: ");
    // for (int i=0; i<p_bytes; ++i) {
    //     printf("%02X", buf[i]);
    // }
    // printf("\n");
    // debugPrint;
    if (!sm3_update(&c, buf, p_bytes)) {
        goto err;
    }
    // debugPrint;
    if (BN_bn2binpad(key->pub_key->X, buf, p_bytes) < 0) {
        goto err;
    }
    // printf("XA: ");
    // for (int i=0; i<p_bytes; ++i) {
    //     printf("%02X", buf[i]);
    // }
    // printf("\n");
    // debugPrint;
    if (!sm3_update(&c, buf, p_bytes)) {
        goto err;
    }
    // debugPrint;
    if (BN_bn2binpad(key->pub_key->Y, buf, p_bytes) < 0) {
        goto err;
    }
    // printf("YA: ");
    // for (int i=0; i<p_bytes; ++i) {
    //     printf("%02X", buf[i]);
    // }
    // printf("\n");
    // debugPrint;
    if (!sm3_update(&c, buf, p_bytes)) {
        goto err;
    }
    // debugPrint;
    sm3_final(out, &c);
    // printf("Z: ");
    // for (int i=0; i<SM3_DIGEST_LENGTH; ++i) {
    //     printf("%02X", out[i]);
    // }
    // printf("\n");
    // debugPrint;
    return 1;
    err: 
    return 0;
}

int sm2_KDF(uint8 *K, const uint8 *Z, const size_t Zlen, const uint64 klen) {
    const uint64 v = 256; /* SM3: 256bit digest */
    if (v*0xFFFFFFFFU <= klen) {
        return 0;
    }
    if (klen & 7) {
        return 0;
    }
    uint32 ct = 1, lmt = (klen+v-1)/v, tmp;
    uint8 *_ct, *tmp_u8, *digest, *p = K;
    _ct = malloc(4UL);
    digest = malloc(SM3_DIGEST_LENGTH);
    SM3_CTX c;
    while (ct < lmt) {
        tmp_u8 = _ct;
        HOST_l2c(ct, tmp_u8);
        if (!sm3_init(&c)
            || !sm3_update(&c, Z, Zlen)
            || !sm3_update(&c, _ct, 4UL)
            || !sm3_final(digest, &c)
            || !memcpy(p, digest, SM3_DIGEST_LENGTH)) {
            return 0;
        }
        ++ct;
        p += SM3_DIGEST_LENGTH;
    }
    tmp_u8 = _ct;
    HOST_l2c(ct, tmp_u8);
    if (!sm3_init(&c)
        || !sm3_update(&c, Z, Zlen)
        || !sm3_update(&c, _ct, 4UL)
        || !sm3_final(digest, &c)) {
        return 0;
    }
    tmp = klen % v;
    if (!tmp) {
        if (!memcpy(p, digest, SM3_DIGEST_LENGTH)) {
            return 0;
        }
    }
    else {
        if (!memcpy(p, digest, tmp >> 3)) {
            return 0;
        }
    }
    return 1;
}

#endif