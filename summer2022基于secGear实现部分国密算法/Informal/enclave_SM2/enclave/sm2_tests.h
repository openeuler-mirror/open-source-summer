#ifndef SECGEAR_SM2_TESTS_H
#define SECGEAR_SM2_TESTS_H

#include "sm2_sign.h"
#include "sm2_exchange.h"
#include "sm2_crypt.h"

uint8 *sign_buffer, sign_verify_ret;

void sm2signtest(const int p_bytes, const uint8 *_M, const uint8 *_ID_A, const uint8 *_p, const uint8 *_a, const uint8 *_b, const uint8 *_n, const uint8 *_XG, const uint8 *_YG, const uint8 *_dA, const uint8 *_k) {
    /* A.3 is not supported */
    int _w;
    uint16 entlenC = strlen((char *)_ID_A);
    uint16 entlA = entlenC*8;
    BIGNUM *p, *a, *b, *n, *xG, *yG, *dA, *k;
    EC_POINT *G, *kG;
    EC_GROUP *group;
    EC_KEY *userA;
    group = EC_GROUP_new();
    p = BN_new();
    a = BN_new();
    b = BN_new();
    n = BN_new();
    xG = BN_new();
    yG = BN_new();
    dA = BN_new();
    k = BN_new();
    G = EC_POINT_new();
    kG = EC_POINT_new();
    userA = EC_KEY_new();
    BN_bin2bn(_p, p_bytes, p);
    BN_bin2bn(_a, p_bytes, a);
    BN_bin2bn(_b, p_bytes, b);
    BN_bin2bn(_n, p_bytes, n);
    BN_bin2bn(_XG, p_bytes, xG);
    BN_bin2bn(_YG, p_bytes, yG);
    BN_bin2bn(_dA, p_bytes, dA);
    BN_bin2bn(_k, p_bytes, k);
    EC_POINT_setXY(G, xG, yG);
    _w = EC_GROUP_set_param(group, p, a, b, n, BN_value_one(), G);
    _w = EC_KEY_set_group(userA, group);
    _w = EC_KEY_set_priv_key(userA, dA);
    _w = EC_KEY_generate_pub_key(userA);
    _w = EC_POINT_mul(kG, G, k, group);
    SM2_SIG *sig;
    sig = sm2_sig_gen(_M, strlen((char *)_M), _ID_A, strlen((char *)_ID_A), userA);
    sign_buffer = (uint8 *)malloc(p_bytes * 4);
    memcpy(sign_buffer, BN_bn2hex(sig->r), p_bytes * 2);
    memcpy(sign_buffer + p_bytes * 2, BN_bn2hex(sig->s), p_bytes * 2);

    _w = sm2_sig_verify(_M, strlen((char *)_M), _ID_A, strlen((char *)_ID_A), userA, sig);
    sign_verify_ret = _w;
}

uint8 exchange_ret;

/* h = 1 by default */
void sm2exchangetest(const int p_bytes, const uint8 *_ID_A, const uint8 *_ID_B, const uint8 *_p, const uint8 *_a, const uint8 *_b, const uint8 *_n, const uint8 *_XG, const uint8 *_YG, const uint8 *_dA, const uint8 *_dB, const uint64 klen) {
    /* A.3 is not supported */
    int _w;
    uint16 entlenAC = strlen((char *)_ID_A);
    uint16 entlA = entlenAC*8;
    uint16 entlenBC = strlen((char *)_ID_B);
    uint16 entlB = entlenBC*8;
    BIGNUM *p, *a, *b, *h, *n, *xG, *yG, *dA, *dB;
    EC_POINT *G, *kG;
    EC_GROUP *group;
    EC_KEY *userA, *userB;
    uint8 *ZA, *ZB;
    ZA = malloc(SM3_DIGEST_LENGTH);
    ZB = malloc(SM3_DIGEST_LENGTH);
    group = EC_GROUP_new();
    p = BN_new();
    a = BN_new();
    b = BN_new();
    h = (BIGNUM *)BN_value_one();
    n = BN_new();
    xG = BN_new();
    yG = BN_new();
    dA = BN_new();
    dB = BN_new();
    G = EC_POINT_new();
    kG = EC_POINT_new();
    userA = EC_KEY_new();
    userB = EC_KEY_new();
    BN_bin2bn(_p, p_bytes, p);
    BN_bin2bn(_a, p_bytes, a);
    BN_bin2bn(_b, p_bytes, b);
    BN_bin2bn(_n, p_bytes, n);
    BN_bin2bn(_XG, p_bytes, xG);
    BN_bin2bn(_YG, p_bytes, yG);
    BN_bin2bn(_dA, p_bytes, dA);
    BN_bin2bn(_dB, p_bytes, dB);
    EC_POINT_setXY(G, xG, yG);
    _w = EC_GROUP_set_param(group, p, a, b, n, h, G);
    _w = EC_KEY_set_group(userA, group);
    _w = EC_KEY_set_priv_key(userA, dA);
    _w = EC_KEY_generate_pub_key(userA);
    _w = EC_KEY_set_group(userB, group);
    _w = EC_KEY_set_priv_key(userB, dB);
    _w = EC_KEY_generate_pub_key(userB);
    _w = sm2_compute_z(ZA, _ID_A, strlen((char *)_ID_A), userA);
    _w = sm2_compute_z(ZB, _ID_B, strlen((char *)_ID_B), userB);
    _w = sm2_exchange(userA, userB, klen, ZA, ZB);
    exchange_ret = _w;
}

uint8 *encrypt_pw, *decrypt_msg;

void sm2crypttest(int p_bytes, const uint8 *M, const uint8 *_p, const uint8 *_a, const uint8 *_b, const uint8 *_n, const uint8 *_XG, const uint8 *_YG, const uint8 *_dB) {
    /* A.3 is not supported */
    int _w;
    BIGNUM *p, *a, *b, *n, *xG, *yG, *dB;
    EC_POINT *G;
    EC_GROUP *group;
    EC_KEY *userB;
    uint64 klen;
    int MlenCBLOCK;
    size_t pwlen;
    group = EC_GROUP_new();
    p = BN_new();
    a = BN_new();
    b = BN_new();
    n = BN_new();
    xG = BN_new();
    yG = BN_new();
    dB = BN_new();
    G = EC_POINT_new();
    userB = EC_KEY_new();
    BN_bin2bn(_p, p_bytes, p);
    BN_bin2bn(_a, p_bytes, a);
    BN_bin2bn(_b, p_bytes, b);
    BN_bin2bn(_n, p_bytes, n);
    BN_bin2bn(_XG, p_bytes, xG);
    BN_bin2bn(_YG, p_bytes, yG);
    BN_bin2bn(_dB, p_bytes, dB);
    EC_POINT_setXY(G, xG, yG);
    MlenCBLOCK = strlen((char *)M);
    _w = EC_GROUP_set_param(group, p, a, b, n, BN_value_one(), G);
    _w = EC_KEY_set_group(userB, group);
    _w = EC_KEY_set_priv_key(userB, dB);
    _w = EC_KEY_generate_pub_key(userB);
    klen = MlenCBLOCK * 8;
    pwlen = (p_bytes << 1 | 1) + MlenCBLOCK + SM3_DIGEST_LENGTH;
    encrypt_pw = malloc(pwlen);
    _w = sm2_encrypt(encrypt_pw, M, klen, userB);
    decrypt_msg = malloc(MlenCBLOCK+1);
    memset(decrypt_msg, 0, MlenCBLOCK+1);
    _w = sm2_decrypt(decrypt_msg, encrypt_pw, klen, userB);
}

#endif