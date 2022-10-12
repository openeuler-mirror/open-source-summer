#include "sm2.h"

/*
 * Ref: 
 * GB/T 32918.2-2016
 */

/** SM2 signature generation. 
 * \param msg       massage for signing. 
 * \param msglen    byte length of msg. 
 * \param id        identifier of user A. 
 * \param idlen     byte length of id. 
 * \param key       key of user A. 
 * \return the sign generated.
 */
SM2_SIG *sm2_sig_gen(const uint8 *msg, const size_t msglen, const uint8 *id, const size_t idlen, const EC_KEY *key) {
    SM3_CTX c;
    sm3_init(&c);
    uint8 *buf;
    BN_CTX *ctx;
    BIGNUM *e, *n, *k, *x, *r, *s, *rk, *dA, *tmp;
    EC_POINT *kG, *G;
    SM2_SIG *sig;
    ctx = BN_CTX_new();
    if (ctx == NULL) {
        return 0;
    }
    sig = SM2_SIG_new();
    if (sig == NULL) {
        return 0;
    }
    BN_CTX_start(ctx);
    e = BN_CTX_get(ctx);
    n = key->group->order;
    k = BN_CTX_get(ctx);
    x = BN_CTX_get(ctx);
    r = sig->r;
    s = sig->s;
    rk = BN_CTX_get(ctx);
    dA = key->priv_key;
    tmp = BN_CTX_get(ctx);
    G = key->group->generator;
    kG = EC_POINT_new();
    if (n == NULL 
        || r == NULL 
        || s == NULL 
        || dA == NULL 
        || tmp == NULL
        || G == NULL
        || kG == NULL) {
        return 0;
    }
    buf = malloc(SM3_DIGEST_LENGTH);
    /* A1: \bar{M} = ZA || M */
    if (!sm2_compute_z(buf, id, idlen, key)) {
        goto err;
    }
    if (!sm3_update(&c, buf, SM3_DIGEST_LENGTH)
     || !sm3_update(&c, msg, msglen)) {
        SM2ERR("sm2_sign(): compute e error!\n");
    }
    /* A2: e = SM3(\bar{M}), e -> bn */
    sm3_final(buf, &c);
    e = BN_bin2bn(buf, SM3_DIGEST_LENGTH, NULL);
    if (e == NULL) {
        SM2ERR("sm2_sign(): e error!\n");
    }
    for (;;) {
        /* A3: k = rand(1, n-1) */
        if (!BN_rand_range(k, n)) {
            SM2ERR("sm2_sign(): gen k error!\n");
        }
        if (BN_is_zero(k)) continue;
        /* A4: (x1, y1) = [k]G, x1 -> bn */
        if (!EC_POINT_mul(kG, G, k, key->group)) {
            return 0;
        }
        x = kG->X; 
        /* A5: r = (e + x1) % n, if r=0 or r+k=n, goto A3 */
        if (!BN_mod_add(r, e, x, n, ctx)) {
            SM2ERR("sm2_sign(): internal error!\n");
        }
        if (BN_is_zero(r)) continue;
        if (!BN_add(rk, r, k)) {
            SM2ERR("sm2_sign(): internal error!\n");
        }
        if (BN_cmp(rk, n) == 0) continue;
        /* A6: s = ((1+dA)^-1 \times (k- r \times dA)) % n, if s=0, goto A3 */
        if (!BN_add(s, dA, BN_value_one())
         || !BN_mod_inverse(s, s, n, ctx)
         || !printf("(1+dA)^-1: %s\n", BN_bn2hex(s))
         || !BN_mod_mul(tmp, dA, r, n, ctx)
         || !BN_sub(tmp, k, tmp)
         || !BN_mod_mul(s, s, tmp, n, ctx)) {
            SM2ERR("sm2_sign(): internal error!\n");
        }
        if (BN_is_zero(s)) continue;
        /* A7: r,s -> byte/u8[], sig = (r, s) */
        break;
    }
    err: 
    done: 
    BN_free(e);
    BN_CTX_free(ctx);
    return sig;
}

/* (2) Sign Verify */

/** SM2 signature verification. 
 * \param msg       massage for signing. 
 * \param msglen    byte length of msg. 
 * \param id        identifier of user A. 
 * \param idlen     byte length of id. 
 * \param key       key of user A. 
 * \param sig       signature to be verified. 
 * \return 1 on success and 0 if an error occurred.
 */
int sm2_sig_verify(const uint8 *msg, const size_t msglen, const uint8 *id, const size_t idlen, const EC_KEY *key, const SM2_SIG *sig) {
    SM3_CTX c;
    sm3_init(&c);
    BN_CTX *ctx;
    const BIGNUM *r, *s, *n;
    BIGNUM *e, *t, *R;
    const EC_POINT *G, *PA;
    EC_POINT *sG, *tPA, *tmp_point;
    uint8 *buf;
    r = sig->r;
    s = sig->s;
    n = key->group->order;
    G = key->group->generator;
    PA = key->pub_key;
    ctx = BN_CTX_new();
    if (ctx == NULL) {
        goto err;
    }
    BN_CTX_start(ctx);
    e = BN_CTX_get(ctx);
    t = BN_CTX_get(ctx);
    R = BN_CTX_get(ctx);
    sG = EC_POINT_new();
    tPA = EC_POINT_new();
    tmp_point = EC_POINT_new();
    if (R == NULL || tmp_point == NULL) {
        goto err;
    }
    buf = malloc(SM3_DIGEST_LENGTH);
    /* B1: check r' \in [1, n-1], otherwise goto BERR */
    /* B2: check s' \in [1, n-1], otherwise goto BERR */
    if (BN_cmp(r, BN_value_one()) < 0
        || BN_cmp(s, BN_value_one()) < 0
        || BN_cmp(n, r) <= 0
        || BN_cmp(n, s) <= 0) {
        goto err;
    }
    /* B3: \bar{M'} = ZA || M' */
    if (!sm2_compute_z(buf, id, idlen, key)) {
        goto err;
    }
    if (!sm3_update(&c, buf, SM3_DIGEST_LENGTH)
     || !sm3_update(&c, msg, msglen)) {
        SM2ERR("sm2_sign(): compute e error!\n");
    }
    /* B4: e' = SM3(\bar{M'}), e -> bn */
    sm3_final(buf, &c);
    e = BN_bin2bn(buf, SM3_DIGEST_LENGTH, NULL);
    /* B5: r', s' -> bn; t = (r'+s')%n, if t=0, goto BERR */
    if (!BN_mod_add_quick(t, r, s, n)
        || BN_is_zero(t)) {
        goto err;
    }
    /* B6: (x1', y1') = [s']G + [t]PA */
    if (!EC_POINT_mul(sG, G, s, key->group)
        || !EC_POINT_mul(tPA, PA, t, key->group)
        || !EC_POINT_add(tmp_point, sG, tPA, key->group)) {
        goto err;
    }
    /* B7: x1' -> bn; R = (e' + x1')%n, return R=r' */
    if (!BN_mod_add_quick(R, e, tmp_point->X, n)) {
        goto err;
    }
    if (BN_cmp(R, r) == 0) {
        return 1;
    }
    err: 
    BN_CTX_end(ctx);
    /* BERR: not pass, return 0 */
    return 0;
}
