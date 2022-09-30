#include "sm2.h"

/*
 * Ref: 
 * GB/T 32918.3-2016
 */

/*
 * This function should **NOT** be used directly.                        
 * The exchange process should obey the definition in GB/T 32918.3-2016 
 */
int sm2_exchange(const EC_KEY *userA, const EC_KEY *userB, const uint64 klen, const uint8 *ZA, const uint8 *ZB) {
    int w = (BN_num_bits(userA->group->order) + 1) / 2 - 1; /* For n is not pow of 2 */
    size_t p_bytes = BN_num_bytes(userB->group->field), k_bytes = (klen >> 3) + ((klen & 7) ? 1 : 0), Zlen;
    uint8 const_byte;
    SM3_CTX c;
    BN_CTX *ctx;
    ctx = BN_CTX_new();
    if (ctx == NULL) {
        return 0;
    }
    BN_CTX_start(ctx);
    /* A-pre: */
    BIGNUM *rA, *x_1, *y_1, *tmpa, *tA;
    const BIGNUM *nA, *dA, *hA;
    EC_POINT *RA, *U, *tmp_pointA;
    const EC_POINT *GA, *PA;
    EC_GROUP *groupA;
    uint8 *Z, *K, *buf, *tmp_char, *SA, *S1, *SB, *S2, *buf_digest;
    SA = malloc(SM3_DIGEST_LENGTH);
    S1 = malloc(SM3_DIGEST_LENGTH);
    SB = malloc(SM3_DIGEST_LENGTH);
    S2 = malloc(SM3_DIGEST_LENGTH);
    buf_digest = malloc(SM3_DIGEST_LENGTH);
    if (buf_digest == NULL) {
        return 0;
    }
    groupA = userA->group;
    nA = groupA->order;
    dA = userA->priv_key;
    hA = groupA->cofactor;
    x_1 = BN_CTX_get(ctx);
    y_1 = BN_CTX_get(ctx);
    tmpa = BN_CTX_get(ctx);
    tA = BN_CTX_get(ctx);
    rA = BN_CTX_get(ctx);
    GA = groupA->generator;
    PA = userA->pub_key;
    U = EC_POINT_new();
    tmp_pointA = EC_POINT_new();
    RA = EC_POINT_new();
    if (groupA == NULL
        || nA == NULL
        || dA == NULL
        || hA == NULL
        || rA == NULL
        || GA == NULL
        || PA == NULL
        || RA == NULL) {
        return 0;
    }
    /* A1: rA = rand(1, n-1) */
    do {
        if (!BN_rand_range(rA, nA)) {
            return 0;
        }
    } while(BN_is_zero(rA));
    #ifdef GBT32918_3_2016_A2_TEST
    /* For GB/T 32918.3-2016 A.2 test */
    BN_hex2bn(&rA, "83A2C9C8B96E5AF70BD480B472409A9A327257F1EBB73F5B073354B248668563");
    #endif
    #ifdef GBT32918_5_2017_TEST
    BN_hex2bn(&rA, "D4DE15474DB74D06491C440D305E012400990F3E390C7E87153C12DB2EA60BB3");
    #endif
    /* A2: RA = [rA]G = (x1, y1) */
    if (!EC_POINT_mul(RA, GA, rA, groupA)) {
        return 0;
    }
    /* A3: send RA to userB */
    /* B-pre: */
    BIGNUM *rB, *x_2, *y_2, *tmpb, *tB;
    const BIGNUM *nB, *dB, *hB;
    EC_POINT *RB, *V, *tmp_pointB;
    const EC_POINT *GB, *PB;
    EC_GROUP *groupB;
    groupB = userB->group;
    nB = groupB->order;
    dB = userB->priv_key;
    hB = groupB->cofactor;
    x_2 = BN_CTX_get(ctx);
    y_2 = BN_CTX_get(ctx);
    tmpb = BN_CTX_get(ctx);
    tB = BN_CTX_get(ctx);
    rB = BN_CTX_get(ctx);
    GB = groupB->generator;
    PB = userB->pub_key;
    V = EC_POINT_new();
    tmp_pointB = EC_POINT_new();
    RB = EC_POINT_new();
    if (groupB == NULL
        || nB == NULL
        || dB == NULL
        || hB == NULL
        || rB == NULL
        || GB == NULL
        || PB == NULL
        || RB == NULL) {
        return 0;
    }
    /* B1: rB = rand(1, n-1) */
    do {
        if (!BN_rand_range(rB, nB)) {
            return 0;
        }
    } while(BN_is_zero(rB));
    #ifdef GBT32918_3_2016_A2_TEST
    /* For GB/T 32918.3-2016 A.2 test */
    BN_hex2bn(&rB, "33FE21940342161C55619C4A0C060293D543C80AF19748CE176D83477DE71C80");
    #endif
    #ifdef GBT32918_5_2017_TEST
    BN_hex2bn(&rB, "7E07124814B309489125EAED101113164EBF0F3458C5BD88335C1F9D596243D6");
    #endif
    /* B2: RB = [rB]G = (x2, y2) */
    if (!EC_POINT_mul(RB, GB, rB, groupB)) {
        return 0;
    }
    /* B3: \bar{x_2} = 2^w + (x_2 & (2^w - 1)) */
    if (!BN_one(tmpb)
        || !BN_lshift(tmpb, tmpb, w)
        || !BN_mod(x_2, RB->X, tmpb, ctx)
        || !BN_add(x_2, x_2, tmpb)) {
        return 0;
    }
    /* B4: tB = (dB + \bar{x_2} \times rB) % n */
    if (!BN_mod_mul(tB, x_2, rB, nB, ctx)
        || !BN_mod_add_quick(tB, tB, dB, nB)) {
        return 0;
    }
    /* B5: verify RA is on curve, \bar{x_1} = 2^w + (x_1 & (2^w - 1)) */
    if (!EC_POINT_on_curve_simple(RA, groupB)) {
        return 0;
    }
    if (!BN_one(tmpb)
        || !BN_lshift(tmpb, tmpb, w)
        || !BN_mod(x_1, RA->X, tmpb, ctx)
        || !BN_add(x_1, x_1, tmpb)) {
        return 0;
    }
    /* B6: V = [h \times tB](PA + [\bar{x1}]RA) = (xV, yV) */
    if (!EC_POINT_mul(tmp_pointB, RA, x_1, groupB)
        || !EC_POINT_add(tmp_pointB, tmp_pointB, PA, groupB)
        || !BN_mul(tmpb, hB, tB, ctx)
        || !EC_POINT_mul(V, tmp_pointB, tmpb, groupB)
        || EC_POINT_is_infinity(V)) {
        return 0;
    }
    /* B7: KB = KDF(xV || yV || ZA || ZB, klen) */
    K = malloc((klen + 7) >> 3);
    Zlen = (p_bytes + SM3_DIGEST_LENGTH) * 2;
    Z = malloc(Zlen);
    buf = malloc(p_bytes);
    tmp_char = Z;
    if (!BN_bn2binpad(V->X, buf, p_bytes)
    || !memcpy(tmp_char, buf, p_bytes)
    || !(tmp_char += p_bytes)
    || !BN_bn2binpad(V->Y, buf, p_bytes)
    || !memcpy(tmp_char, buf, p_bytes)
    || !(tmp_char += p_bytes)
    || !memcpy(tmp_char, ZA, SM3_DIGEST_LENGTH)
    || !(tmp_char += p_bytes)
    || !memcpy(tmp_char, ZB, SM3_DIGEST_LENGTH)) {
        return 0;
    }
    if (!sm2_KDF(K, Z, Zlen, klen)) {
        return 0;
    }
    #ifdef SM2_EXCHANGE_OPTIONAL
    /* B8: SB = SM3(0x02 || yV || SM3(xV || ZA || ZB || x1 || y1 || x2 || y2)) (optional) */
    if (!sm3_init(&c)
        || !BN_bn2binpad(V->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_update(&c, ZA, SM3_DIGEST_LENGTH)
        || !sm3_update(&c, ZB, SM3_DIGEST_LENGTH)
        || !BN_bn2binpad(RA->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RA->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_final(buf_digest, &c)) {
        return 0;
    }
    const_byte = 2;
    if (!sm3_init(&c)
    || !(sm3_update(&c, &const_byte, 1), 1)
    || !BN_bn2binpad(V->Y, buf, p_bytes)
    || !sm3_update(&c, buf, p_bytes)
    || !sm3_update(&c, buf_digest, SM3_DIGEST_LENGTH)
    || !sm3_final(SB, &c)) {
        return 0;
    }
    #endif
    /* B9: Send RB, (and SB, optionals) to userA */
    /* A4: \bar{x_1} = 2^w + (x_1 & (2^w - 1)) */
    if (!BN_one(tmpa)
        || !BN_lshift(tmpa, tmpa, w)
        || !BN_mod(x_1, RA->X, tmpa, ctx)
        || !BN_add(x_1, x_1, tmpa)) {
        return 0;
    }
    /* A5: tA = (dA + \bar{x_1} \times rA) % n */
    if (!BN_mod_mul(tA, x_1, rA, nA, ctx)
        || !BN_mod_add_quick(tA, tA, dA, nA)) {
        return 0;
    }
    /* A6: verify RB is on curve, \bar{x_2} = 2^w + (x_2 & (2^w - 1)) */
    if (!EC_POINT_on_curve_simple(RB, groupA)) {
        return 0;
    }
    if (!BN_one(tmpa)
        || !BN_lshift(tmpa, tmpa, w)
        || !BN_mod(x_2, RB->X, tmpa, ctx)
        || !BN_add(x_2, x_2, tmpa)) {
        return 0;
    }
    /* A7: U = [h \times tA](PB + [\bar{x2}]RB) = (xU, yU) */
    if (!EC_POINT_mul(tmp_pointA, RB, x_2, groupA)
        || !EC_POINT_add(tmp_pointA, tmp_pointA, PB, groupA)
        || !BN_mul(tmpa, hA, tA, ctx)
        || !EC_POINT_mul(U, tmp_pointA, tmpa, groupA)
        || EC_POINT_is_infinity(U)) {
        return 0;
    }
    /* A8: KA = KDF(xU || yU || ZA || ZB, klen) */
    K = malloc((klen + 7) >> 3);
    Zlen = (p_bytes + SM3_DIGEST_LENGTH) * 2;
    Z = malloc(Zlen);
    buf = malloc(p_bytes);
    tmp_char = Z;
    if (!BN_bn2binpad(U->X, buf, p_bytes)
    || !memcpy(tmp_char, buf, p_bytes)
    || !(tmp_char += p_bytes)
    || !BN_bn2binpad(U->Y, buf, p_bytes)
    || !memcpy(tmp_char, buf, p_bytes)
    || !(tmp_char += p_bytes)
    || !memcpy(tmp_char, ZA, SM3_DIGEST_LENGTH)
    || !(tmp_char += p_bytes)
    || !memcpy(tmp_char, ZB, SM3_DIGEST_LENGTH)) {
        return 0;
    }
    if (!sm2_KDF(K, Z, Zlen, klen)) {
        return 0;
    }
    #ifdef SM2_EXCHANGE_OPTIONAL
    /* A9: S1 = SM3(0x02 || yU || SM3(xU || ZA || ZB || x1 || y1 || x2 || y2)), verify S1==SB (optional) */
    if (!sm3_init(&c)
        || !BN_bn2binpad(U->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_update(&c, ZA, SM3_DIGEST_LENGTH)
        || !sm3_update(&c, ZB, SM3_DIGEST_LENGTH)
        || !BN_bn2binpad(RA->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RA->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_final(buf_digest, &c)) {
        return 0;
    }
    const_byte = 2;
    if (!sm3_init(&c)
    || !(sm3_update(&c, &const_byte, 1), 1)
    || !BN_bn2binpad(V->Y, buf, p_bytes)
    || !sm3_update(&c, buf, p_bytes)
    || !sm3_update(&c, buf_digest, SM3_DIGEST_LENGTH)
    || !sm3_final(S1, &c)) {
        return 0;
    }
    if (memcmp(S1, SB, SM3_DIGEST_LENGTH) != 0) {
        return 0;
    }
    #endif
    #ifdef SM2_EXCHANGE_OPTIONAL
    /* A10: SA = SM3(0x03 || yU || SM3(xU || ZA || ZB || x1 || y1 || x2 || y2)) (optional) */
    if (!sm3_init(&c)
        || !BN_bn2binpad(U->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_update(&c, ZA, SM3_DIGEST_LENGTH)
        || !sm3_update(&c, ZB, SM3_DIGEST_LENGTH)
        || !BN_bn2binpad(RA->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RA->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_final(buf_digest, &c)) {
        return 0;
    }
    const_byte = 3;
    if (!sm3_init(&c)
    || !(sm3_update(&c, &const_byte, 1), 1)
    || !BN_bn2binpad(U->Y, buf, p_bytes)
    || !sm3_update(&c, buf, p_bytes)
    || !sm3_update(&c, buf_digest, SM3_DIGEST_LENGTH)
    || !sm3_final(SA, &c)) {
        return 0;
    }
    #endif
    #ifdef SM2_EXCHANGE_OPTIONAL
    /* B10: S2 = SM3(0x03 || yV || SM3(xV || ZA || ZB || x1 || y1 || x2 || y2)), verify S2==SA (optional) */
    if (!sm3_init(&c)
        || !BN_bn2binpad(V->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_update(&c, ZA, SM3_DIGEST_LENGTH)
        || !sm3_update(&c, ZB, SM3_DIGEST_LENGTH)
        || !BN_bn2binpad(RA->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RA->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->X, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !BN_bn2binpad(RB->Y, buf, p_bytes)
        || !sm3_update(&c, buf, p_bytes)
        || !sm3_final(buf_digest, &c)) {
        return 0;
    }
    const_byte = 3;
    if (!sm3_init(&c)
    || !(sm3_update(&c, &const_byte, 1), 1)
    || !BN_bn2binpad(V->Y, buf, p_bytes)
    || !sm3_update(&c, buf, p_bytes)
    || !sm3_update(&c, buf_digest, SM3_DIGEST_LENGTH)
    || !sm3_final(S2, &c)) {
        return 0;
    }
    if (memcmp(S2, SA, SM3_DIGEST_LENGTH) != 0) {
        return 0;
    }
    #endif
    return 1;
    fail:
    return 0;
}
