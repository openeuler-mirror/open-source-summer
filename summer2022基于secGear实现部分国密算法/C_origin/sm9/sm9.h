#ifndef SECGEAR_SM9_H
#define SECGEAR_SM9_H

/*
 * Ref: 
 * GB/T 38635.1-2020
 * GB/T 38635.2-2020
 */

#include <string.h>
#include "../include/common_utils.h"
#include "../include/ec.h"
#include "../sm3/sm3.h"
#include "../sm4/sm4.h"
/*
 * export C_INCLUDE_PATH="/PATH/TO/OPENSSL/include"
 * export CPLUS_INCLUDE_PATH="/PATH/TO/OPENSSL/include"
 * export LIBRARY_PATH="/PATH/TO/OPENSSL/lib"
 */

#define SM9_PARAM_CBLOCK 32
#define SM9_PARAM_LBLOCK (SM9_PARAM_CBLOCK/4)

const uint8 SM9_T[SM9_PARAM_CBLOCK] = {
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x60, 0x00, 0x00, 0x00,
    0x00, 0x58, 0xF9, 0x8A, 
};
const uint8 SM9_TR[] = {};
const uint8 SM9_Q[SM9_PARAM_CBLOCK] = {
    0xB6, 0x40, 0x00, 0x00,
    0x02, 0xA3, 0xA6, 0xF1,
    0xD6, 0x03, 0xAB, 0x4F,
    0xF5, 0x8E, 0xC7, 0x45,
    0x21, 0xF2, 0x93, 0x4B,
    0x1A, 0x7A, 0xEE, 0xDB,
    0xE5, 0x6F, 0x9B, 0x27,
    0xE3, 0x51, 0x45, 0x7D, 
};
const uint8 SM9_A[SM9_PARAM_CBLOCK] = {
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
};
const uint8 SM9_B[SM9_PARAM_CBLOCK] = {
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x05, 
};
const uint8 SM9_N[SM9_PARAM_CBLOCK] = {
    0xB6, 0x40, 0x00, 0x00,
    0x02, 0xA3, 0xA6, 0xF1,
    0xD6, 0x03, 0xAB, 0x4F,
    0xF5, 0x8E, 0xC7, 0x44,
    0x49, 0xF2, 0x93, 0x4B,
    0x18, 0xEA, 0x8B, 0xEE,
    0xE5, 0x6E, 0xE1, 0x9C,
    0xD6, 0x9E, 0xCF, 0x25, 
};
const uint8 SM9_CF = 1;
const uint8 SM9_K = 12;
const uint8 SM9_D1 = 1;
const uint8 SM9_D2 = 2;
const uint8 SM9_CID = 0x12;
const uint8 SM9_XP1[SM9_PARAM_CBLOCK] = {
    0x93, 0xDE, 0x05, 0x1D,
    0x62, 0xBF, 0x71, 0x8F,
    0xF5, 0xED, 0x07, 0x04,
    0x48, 0x7D, 0x01, 0xD6,
    0xE1, 0xE4, 0x08, 0x69,
    0x09, 0xDC, 0x32, 0x80,
    0xE8, 0xC4, 0xE4, 0x81,
    0x7C, 0x66, 0xDD, 0xDD,
};
const uint8 SM9_YP1[SM9_PARAM_CBLOCK] = {
    0x21, 0xFE, 0x8D, 0xDA,
    0x4F, 0x21, 0xE6, 0x07,
    0x63, 0x10, 0x65, 0x12,
    0x5C, 0x39, 0x5B, 0xBC,
    0x1C, 0x1C, 0x00, 0xCB,
    0xFA, 0x60, 0x24, 0x35,
    0x0C, 0x46, 0x4C, 0xD7,
    0x0A, 0x3E, 0xA6, 0x16,
};
const uint8 SM9_XP21[SM9_PARAM_CBLOCK] = {
    0x85, 0xAE, 0xF3, 0xD0,
    0x78, 0x64, 0x0C, 0x98,
    0x59, 0x7B, 0x60, 0x27,
    0xB4, 0x41, 0xA0, 0x1F,
    0xF1, 0xDD, 0x2C, 0x19,
    0x0F, 0x5E, 0x93, 0xC4,
    0x54, 0x80, 0x6C, 0x11,
    0xD8, 0x80, 0x61, 0x41,
};
const uint8 SM9_XP22[SM9_PARAM_CBLOCK] = {
    0x37, 0x22, 0x75, 0x52,
    0x92, 0x13, 0x0B, 0x08,
    0xD2, 0xAA, 0xB9, 0x7F,
    0xD3, 0x4E, 0xC1, 0x20,
    0xEE, 0x26, 0x59, 0x48,
    0xD1, 0x9C, 0x17, 0xAB,
    0xF9, 0xB7, 0x21, 0x3B,
    0xAF, 0x82, 0xD6, 0x5B,
};
const uint8 SM9_YP21[SM9_PARAM_CBLOCK] = {
    0x17, 0x50, 0x9B, 0x09,
    0x2E, 0x84, 0x5C, 0x12,
    0x66, 0xBA, 0x0D, 0x26,
    0x2C, 0xBE, 0xE6, 0xED,
    0x07, 0x36, 0xA9, 0x6F,
    0xA3, 0x47, 0xC8, 0xBD,
    0x85, 0x6D, 0xC7, 0x6B,
    0x84, 0xEB, 0xEB, 0x96,
};
const uint8 SM9_YP22[SM9_PARAM_CBLOCK] = {
    0xA7, 0xCF, 0x28, 0xD5,
    0x19, 0xBE, 0x3D, 0xA6,
    0x5F, 0x31, 0x70, 0x15,
    0x3D, 0x27, 0x8F, 0xF2,
    0x47, 0xEF, 0xBA, 0x98,
    0xA7, 0x1A, 0x08, 0x11,
    0x62, 0x15, 0xBB, 0xA5,
    0xC9, 0x99, 0xA7, 0xC7,
};
const uint8 SM9_EID = 0x04;

/*
 * H1 if typ == 1, H2 if typ == 2. 
 */

typedef struct sm9_ctx_st {
    //
} SM9_CTX;

int sm9_init(SM3_CTX *ctx) {
    memset(ctx, 0, sizeof(*ctx));
    return 1;
}

int sm9_H(BIGNUM *h, const uint8 typ, const uint8 *Z, const size_t Zlen, const EC_GROUP *group) {
    const uint64 v = 256; /* SM3: 256bit digest */
    if (h == NULL) {
        return 0;
    }
    int ret = 0;
    uint32 hlen, ct = 1, lmt, tmp;
    uint8 *_ct, *tmp_u8, *digest, *K, *p;
    BN_CTX *ctx;
    ctx = BN_CTX_new();
    if (ctx == NULL) {
        return 0;
    }
    BN_CTX_start(ctx);
    BIGNUM *tmp_bn = BN_new(), *n;
    n = group->order;
    if (tmp_bn == NULL || n == NULL) {
        goto err;
    }
    if (!BN_copy(h, BN_value_one())
    || !BN_mul_word(h, 5)
    || !BN_exp(h, n, h, ctx)) {
        goto err;
    }
    hlen = (BN_num_bits(h) + 31) >> 5;
    K = (uint8 *)malloc(hlen);
    hlen = 8 * hlen;
    lmt = (hlen + v - 1) / v;
    _ct = (uint8 *)malloc(4UL);
    digest = (uint8 *)malloc(SM3_DIGEST_LENGTH);
    SM3_CTX c;
    while (ct < lmt) {
        tmp_u8 = _ct;
        HOST_l2c(ct, tmp_u8);
        if (!sm3_init(&c)
            || !sm3_update(&c, &typ, 1)
            || !sm3_update(&c, Z, Zlen)
            || !sm3_update(&c, _ct, 4UL)
            || !sm3_final(digest, &c)
            || !memcpy(p, digest, SM3_DIGEST_LENGTH)) {
            goto err;
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
        goto err;
    }
    tmp = hlen % v;
    if (!tmp) {
        if (!memcpy(p, digest, SM3_DIGEST_LENGTH)) {
            goto err;
        }
    }
    else {
        if (!memcpy(p, digest, tmp >> 3)) {
            goto err;
        }
    }
    BN_bin2bn(K, hlen >> 3, h);
    if (!BN_sub(tmp_bn, n, BN_value_one())
        || !BN_mod(h, h, tmp_bn, ctx)) {
        goto err;
    }
    ret = 1;
    err:
    BN_CTX_end(ctx);
    BN_CTX_free(ctx);
    return ret;
}

int sm9_H1(BIGNUM *h, const uint8 typ, const uint8 *Z, const size_t Zlen, const EC_GROUP *group) {
    return sm9_H(h, 0x01, Z, Zlen, group);
}

int sm9_H2(BIGNUM *h, const uint8 typ, const uint8 *Z, const size_t Zlen, const EC_GROUP *group) {
    return sm9_H(h, 0x02, Z, Zlen, group);
}

int sm9_KDF(uint8 *K, const uint8 *Z, const size_t Zlen, const uint64 klen) {
    const uint64 v = 256; /* SM3: 256bit digest */
    if (v*0xFFFFFFFFU <= klen) {
        return 0;
    }
    if (klen & 7) {
        return 0;
    }
    uint32 ct = 1, lmt = (klen+v-1)/v, tmp;
    uint8 *_ct, *tmp_u8, *digest, *p = K;
    _ct = (uint8 *)malloc(4UL);
    digest = (uint8 *)malloc(SM3_DIGEST_LENGTH);
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

typedef struct sm9_sig_st {
    BIGNUM *h;
    BIGNUM *S;
} SM9_SIG;

int SM9_SIG_init(SM9_SIG *sig) {
    sig->h = BN_new();
    sig->S = BN_new();
    if (sig->h == NULL || sig->S == NULL) {
        BN_free(sig->h);
        BN_free(sig->S);
        return 0;
    }
    return 1;
}

SM9_SIG *SM9_SIG_new() {
    SM9_SIG *ret;
    ret = malloc(sizeof(*ret));
    if (ret == NULL) {
        return NULL;
    }
    if (!SM9_SIG_init(ret)) {
        free(ret);
        return NULL;
    }
    return ret;
}

#endif