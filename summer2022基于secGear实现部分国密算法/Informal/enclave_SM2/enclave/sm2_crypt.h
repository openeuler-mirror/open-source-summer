#include "sm2.h"

/*
 * Ref: 
 * GB/T 32918.4-2016
 */

/* Encrypt */

int sm2_encrypt(uint8 *out, const uint8 *M, const uint64 klen, const EC_KEY *key) {
    SM3_CTX c;
    BIGNUM *n, *k, *h, *x_2, *y_2;
    EC_POINT *G, *C1, *S, *PB, *tmp_point;
    EC_GROUP *group;
    uint8 *_C1, *_C2, *_C3, *t, *buf;
    size_t C1len, MlenCBLOCK, buflen, i;
    int p_bytes;
    group = key->group;
    n = group->order;
    h = group->cofactor;
    G = group->generator;
    PB = key->pub_key;
    x_2 = BN_new();
    y_2 = BN_new();
    k = BN_new();
    C1 = EC_POINT_new();
    tmp_point = EC_POINT_new();
    S = EC_POINT_new();
    if (group == NULL 
        || n == NULL 
        || h == NULL 
        || k == NULL 
        || G == NULL 
        || S == NULL 
        || PB == NULL) {
        return 0;
    }
    p_bytes = BN_num_bytes(group->field);
    MlenCBLOCK = klen >> 3;
    C1len = (p_bytes << 1 | 1);
    buflen = p_bytes << 1;
    _C1 = malloc(C1len);
    _C2 = malloc(MlenCBLOCK);
    _C3 = malloc(SM3_DIGEST_LENGTH);
    buf = malloc(buflen);
    t = malloc(MlenCBLOCK);
    if (t == NULL) {
        goto err;
    }
    for (;;) {
        /* A1: k = rand(1, n-1) */
        do {
            if (!BN_rand_range(k, n)) {
                goto err;
            }
        } while(BN_is_zero(k));
        #ifdef GBT32918_4_2016_A2_TEST /* For GB/T 32918.4-2016 A.2 test */
        if (p_bytes * 8 == 192) {
            /* FP-192 */
            BN_hex2bn(&k, "384F30353073AEECE7A1654330A96204D37982A3E15B2CB5");
        }
        else {
            /* FP-256 */
            BN_hex2bn(&k, "4C62EEFD6ECFC2B95B92FD6C3D9575148AFA17425546D49018E5388D49DD7B4F");
        }
        #endif
        #ifdef GBT32918_5_2017_TEST 
            BN_hex2bn(&k, "59276E27D506861A16680F3AD9C02DCCEF3CC1FA3CDBE4CE6D54B80DEAC1BC21");
        #endif
        /* A2: C1 = [k]G = (x1, y1), C1 -> bytes */
        if (!EC_POINT_mul(C1, G, k, group)
            || !EC_POINT_ecp2bin_normal(_C1, C1, p_bytes)) {
            goto err;
        }
        /* A3: S = [h]PB, if s = O, goto err */
        if (!EC_POINT_mul(S, PB, h, group)
            || EC_POINT_is_infinity(S)) {
            goto err;
        }
        /* A4: [k]PB = (x2, y2), x2, y2 -> bytes */
        if (!EC_POINT_mul(tmp_point, PB, k, group)) {
            goto err;
        }
        x_2 = tmp_point->X;
        y_2 = tmp_point->Y;
        /* A5: t = KDF(x2 || y2, klen), if t == 0, goto A1 */
        if (!BN_bn2binpad(x_2, buf, p_bytes)
            || !BN_bn2binpad(y_2, buf+p_bytes, p_bytes)
            || !sm2_KDF(t, buf, buflen, klen)) {
            goto err;
        }
        for (i = 0; i < MlenCBLOCK; ++i) {
            if (t[i]) {
                goto A6;
            }
        }
    }
    /* A6: C2 = M ^ t */
    A6:
    for (i = 0; i < MlenCBLOCK; ++i) {
        _C2[i] = M[i] ^ t[i];
    }
    /* A7: C3 = SM3(x2 || M || y2) */
    if (!sm3_init(&c)
        || !BN_bn2binpad(x_2, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_update(&c, M, MlenCBLOCK)
        || !BN_bn2binpad(y_2, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_final(_C3, &c)) {
        goto err;
    }
    /* A8: C = C1 || C3 || C2 */
    if (!memcpy(out, _C1, C1len)
        || !memcpy(out+C1len, _C3, SM3_DIGEST_LENGTH)
        || !memcpy(out+C1len+SM3_DIGEST_LENGTH, _C2, MlenCBLOCK)) {
        goto err;
    }
    return 1;
    err:
    return 0;
}

/* Decrypt */

int sm2_decrypt(uint8 *_M, const uint8 *C, const uint64 klen, const EC_KEY *key) {
    SM3_CTX c;
    BIGNUM *dB, *h, *x_2, *y_2;
    EC_POINT *C1, *S, *tmp_point;
    EC_GROUP *group;
    uint8 *_C1, *_C2, *_C3, *t, *buf, *u;
    size_t C1len, MlenCBLOCK, buflen, i;
    int p_bytes;
    group = key->group;
    h = group->cofactor;
    dB = key->priv_key;
    x_2 = BN_new();
    y_2 = BN_new();
    C1 = EC_POINT_new();
    tmp_point = EC_POINT_new();
    S = EC_POINT_new();
    if (group == NULL 
        || h == NULL 
        || x_2 == NULL 
        || y_2 == NULL 
        || dB == NULL 
        || S == NULL) {
        return 0;
    }
    p_bytes = BN_num_bytes(group->field);
    MlenCBLOCK = klen >> 3;
    C1len = (p_bytes << 1 | 1);
    buflen = p_bytes << 1;
    _C1 = malloc(C1len);
    _C2 = malloc(MlenCBLOCK);
    _C3 = malloc(SM3_DIGEST_LENGTH);
    u = malloc(SM3_DIGEST_LENGTH);
    buf = malloc(buflen);
    t = malloc(MlenCBLOCK);
    if (t == NULL) {
        goto err;
    }
    /* C = C1 || C3 || C2 */
    if (!memcpy(_C1, C, C1len)
    || !memcpy(_C2, C+C1len+SM3_DIGEST_LENGTH, MlenCBLOCK)
    || !memcpy(_C3, C+C1len, SM3_DIGEST_LENGTH)) {
        goto err;
    }
    /* B1: C -> C1, check if C1 on the curve */
    if (!EC_POINT_bin2ecp(C1, _C1, p_bytes)
        || !EC_POINT_on_curve_simple(C1, group)) {
        goto err;
    }
    /* B2: S = [h]C1, if S == O, goto err */
    if (!EC_POINT_mul(S, C1, h, group)
        || EC_POINT_is_infinity(S)) {
        goto err;
    }
    /* B3: [dB]C1 = (x2, y2), x2, y2 -> bytes */
    if (!EC_POINT_mul(tmp_point, C1, dB, group)) {
        goto err;
    }
    x_2 = tmp_point->X;
    y_2 = tmp_point->Y;
    /* B4: t = KDF(x2 || y2, klen), if t = 0, goto err */
    if (!BN_bn2binpad(x_2, buf, p_bytes)
        || !BN_bn2binpad(y_2, buf+p_bytes, p_bytes)
        || !sm2_KDF(t, buf, buflen, klen)) {
        goto err;
    }
    for (i = 0; i < MlenCBLOCK; ++i) {
        if (t[i]) {
            goto B5;
        }
    }
    goto err;
    B5:
    /* B5: C -> C2, M' = C2 ^ t*/
    for (i = 0; i < MlenCBLOCK; ++i) {
        _M[i] = _C2[i] ^ t[i];
    }
    /* B6: u = SM3(x2 || M' || y2), check if u = C3 */
    if (!sm3_init(&c)
        || !BN_bn2binpad(x_2, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_update(&c, _M, MlenCBLOCK)
        || !BN_bn2binpad(y_2, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_final(u, &c)
        || memcmp(u, _C3, SM3_DIGEST_LENGTH) != 0) {
        goto err;
    }
    /* B7: output M' */
    return 1;
    err: 
    return 0;
}
