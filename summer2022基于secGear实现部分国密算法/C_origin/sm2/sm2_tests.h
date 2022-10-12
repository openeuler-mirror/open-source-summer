#ifndef SECGEAR_SM2_TESTS_H
#define SECGEAR_SM2_TESTS_H

#include "sm2_sign.h"
#include "sm2_exchange.h"
#include "sm2_crypt.h"

void sm2signtest(const int p_bytes, const uint8 *_M, const uint8 *_ID_A, const uint8 *_p, const uint8 *_a, const uint8 *_b, const uint8 *_n, const uint8 *_XG, const uint8 *_YG, const uint8 *_dA, const uint8 *_k) {
    printf("-----------Sign test start--------------\n");
    /* A.3 is not supported */
    int _w;
    printf("ID_A: ");
    uint16 entlenC = strlen((char *)_ID_A);
    uint16 entlA = entlenC*8;
    for (int i=0; i<entlenC; ++i) {
        printf("%02X%c", _ID_A[i], " \n"[i+1==entlenC]);
    }
    printf("ENTL_A: %04X\n",entlA);
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
    printf("p = %s\n", BN_bn2hex(p));
    printf("a = %s\n", BN_bn2hex(a));
    printf("b = %s\n", BN_bn2hex(b));
    printf("n = %s\n", BN_bn2hex(n));
    printf("XG = %s\n", BN_bn2hex(xG));
    printf("YG = %s\n", BN_bn2hex(yG));
    printf("dA = %s\n", BN_bn2hex(dA));
    printf("k = %s\n", BN_bn2hex(k));
    EC_POINT_setXY(G, xG, yG);
    printf("G: (%s, \n\t%s)\n", BN_bn2hex(G->X), BN_bn2hex(G->Y));
    _w = EC_GROUP_set_param(group, p, a, b, n, BN_value_one(), G);
    _w = EC_KEY_set_group(userA, group);
    _w = EC_KEY_set_priv_key(userA, dA);
    printf("userA.dA: %s\n", BN_bn2hex(userA->priv_key));
    _w = EC_KEY_generate_pub_key(userA);
    printf("userA.PA: (%s, \n\t%s)\n", BN_bn2hex(userA->pub_key->X), BN_bn2hex(userA->pub_key->Y));
    _w = EC_POINT_mul(kG, G, k, group);
    printf("kG: (%s, \n\t%s)\n", BN_bn2hex(kG->X), BN_bn2hex(kG->Y));
    SM2_SIG *sig;
    printf("------Sign Generation Start-----\n");
    sig = sm2_sig_gen(_M, strlen((char *)_M), _ID_A, strlen((char *)_ID_A), userA);
    printf("------Sign Generation End-----\n");
    printf("(r, s) = (%s,\n\t\t%s)\n", BN_bn2hex(sig->r), BN_bn2hex(sig->s));
    printf("--------Sign Verify Start-------\n");
    _w = sm2_sig_verify(_M, strlen((char *)_M), _ID_A, strlen((char *)_ID_A), userA, sig);
    printf("--------Sign Verify End-------\n");
    printf("Verify: %d\n", _w);
    printf("-----------Sign test end--------------\n");
}

/* h = 1 by default */
void sm2exchangetest(const int p_bytes, const uint8 *_ID_A, const uint8 *_ID_B, const uint8 *_p, const uint8 *_a, const uint8 *_b, const uint8 *_n, const uint8 *_XG, const uint8 *_YG, const uint8 *_dA, const uint8 *_dB, const uint64 klen) {
    printf("-----------Exchange test start--------------\n");
    /* A.3 is not supported */
    int _w;
    printf("ID_A: ");
    uint16 entlenAC = strlen((char *)_ID_A);
    uint16 entlA = entlenAC*8;
    for (int i=0; i<entlenAC; ++i) {
        printf("%02X%c", _ID_A[i], " \n"[i+1==entlenAC]);
    }
    printf("ENTL_A: %04X\n",entlA);
    printf("ID_B: ");
    uint16 entlenBC = strlen((char *)_ID_B);
    uint16 entlB = entlenBC*8;
    for (int i=0; i<entlenBC; ++i) {
        printf("%02X%c", _ID_B[i], " \n"[i+1==entlenBC]);
    }
    printf("ENTL_B: %04X\n",entlB);
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
    printf("p = %s\n", BN_bn2hex(p));
    printf("a = %s\n", BN_bn2hex(a));
    printf("b = %s\n", BN_bn2hex(b));
    printf("h = %s\n", BN_bn2hex(h));
    printf("n = %s\n", BN_bn2hex(n));
    printf("XG = %s\n", BN_bn2hex(xG));
    printf("YG = %s\n", BN_bn2hex(yG));
    printf("dA = %s\n", BN_bn2hex(dA));
    printf("dB = %s\n", BN_bn2hex(dB));
    EC_POINT_setXY(G, xG, yG);
    printf("G: (%s, \n\t%s)\n", BN_bn2hex(G->X), BN_bn2hex(G->Y));
    _w = EC_GROUP_set_param(group, p, a, b, n, h, G);
    _w = EC_KEY_set_group(userA, group);
    _w = EC_KEY_set_priv_key(userA, dA);
    printf("userA.dA: %s\n", BN_bn2hex(userA->priv_key));
    _w = EC_KEY_generate_pub_key(userA);
    printf("userA.PA: (%s, \n\t%s)\n", BN_bn2hex(userA->pub_key->X), BN_bn2hex(userA->pub_key->Y));
    _w = EC_KEY_set_group(userB, group);
    _w = EC_KEY_set_priv_key(userB, dB);
    printf("userB.dB: %s\n", BN_bn2hex(userB->priv_key));
    _w = EC_KEY_generate_pub_key(userB);
    printf("userB.PB: (%s, \n\t%s)\n", BN_bn2hex(userB->pub_key->X), BN_bn2hex(userB->pub_key->Y));
    _w = sm2_compute_z(ZA, _ID_A, strlen((char *)_ID_A), userA);
    printf("ZA: ");
    for (int i=0; i<SM3_DIGEST_LENGTH; ++i) {
        printf("%02X", ZA[i]);
    }
    printf("\n");
    _w = sm2_compute_z(ZB, _ID_B, strlen((char *)_ID_B), userB);
    printf("ZB: ");
    for (int i=0; i<SM3_DIGEST_LENGTH; ++i) {
        printf("%02X", ZB[i]);
    }
    printf("\n");
    _w = sm2_exchange(userA, userB, klen, ZA, ZB);
    printf("exchange = %d\n", _w);
    printf("-----------Exchange test end--------------\n");
}

void sm2crypttest(int p_bytes, const uint8 *M, const uint8 *_p, const uint8 *_a, const uint8 *_b, const uint8 *_n, const uint8 *_XG, const uint8 *_YG, const uint8 *_dB) {
    /* A.3 is not supported */
    int _w;
    BIGNUM *p, *a, *b, *n, *xG, *yG, *dB;
    EC_POINT *G;
    EC_GROUP *group;
    EC_KEY *userB;
    uint8 *pw, *_M;
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
    printf("-----------Encrypt %d test start--------------\n", p_bytes*8);
    printf("p = %s\n", BN_bn2hex(p));
    printf("a = %s\n", BN_bn2hex(a));
    printf("b = %s\n", BN_bn2hex(b));
    printf("n = %s\n", BN_bn2hex(n));
    printf("XG = %s\n", BN_bn2hex(xG));
    printf("YG = %s\n", BN_bn2hex(yG));
    printf("dB = %s\n", BN_bn2hex(dB));
    EC_POINT_setXY(G, xG, yG);
    printf("G: (%s, \n\t%s)\n", BN_bn2hex(G->X), BN_bn2hex(G->Y));
    MlenCBLOCK = strlen((char *)M);
    printf("M: %s\n", M);
    printf("Message: ");
    for (int i=0; i<MlenCBLOCK; ++i) {
        printf("%02X", M[i]);
    }
    printf("\n");
    _w = EC_GROUP_set_param(group, p, a, b, n, BN_value_one(), G);
    _w = EC_KEY_set_group(userB, group);
    _w = EC_KEY_set_priv_key(userB, dB);
    printf("userB.dB: %s\n", BN_bn2hex(userB->priv_key));
    _w = EC_KEY_generate_pub_key(userB);
    printf("userB.PB: (%s, \n\t%s)\n", BN_bn2hex(userB->pub_key->X), BN_bn2hex(userB->pub_key->Y));
    klen = MlenCBLOCK * 8;
    pwlen = (p_bytes << 1 | 1) + MlenCBLOCK + SM3_DIGEST_LENGTH;
    pw = malloc(pwlen);
    _w = sm2_encrypt(pw, M, klen, userB);
    printf("encrypt = %d\n", _w);
    printf("pw: ");
    for (int i=0; i<pwlen; ++i) {
        printf("%02X", pw[i]);
    }
    printf("\n");
    printf("-----------Encrypt %d test end--------------\n", p_bytes*8);
    printf("-----------Decrypt %d test start--------------\n", p_bytes*8);
    _M = malloc(MlenCBLOCK+1);
    memset(_M, 0, MlenCBLOCK+1);
    _w = sm2_decrypt(_M, pw, klen, userB);
    printf("decrypt = %d\n", _w);
    printf("Message: ");
    for (int i=0; i<MlenCBLOCK; ++i) {
        printf("%02X", _M[i]);
    }
    printf("\n");
    printf("M' = %s\n", _M);
    printf("-----------Decrypt %d test end--------------\n", p_bytes*8);
}

#endif