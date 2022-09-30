#include <openssl/bn.h> /* BigNum */
#include "common_utils.h"

typedef struct ec_point_st {
    BIGNUM *X;
    BIGNUM *Y;
    int is_infinity;
} EC_POINT;

int EC_POINT_init(EC_POINT *point) {
    point->X = BN_new();
    point->Y = BN_new();
    point->is_infinity = 0;
    if (point->X == NULL || point->Y == NULL) {
        BN_free(point->X);
        BN_free(point->Y);
        return 0;
    }
    return 1;
}

EC_POINT *EC_POINT_new() {
    EC_POINT *ret = NULL;
    ret = malloc(sizeof(*ret));
    if (ret == NULL) {
        return NULL;
    }
    if (!EC_POINT_init(ret)) {
        free(ret);
        return NULL;
    }
    return ret;
}

int EC_POINT_setXY(EC_POINT *r, const BIGNUM *x, const BIGNUM *y) {
    if (r == NULL) {
        return 0;
    }
    if (!BN_copy(r->X, x) || !(BN_copy(r->Y, y))) {
        return 0;
    }
    return 1;
}

const EC_POINT *EC_point_infinity() {
    static const EC_POINT const_infinity = { NULL, NULL, 1 };
    return &const_infinity;
}

int EC_POINT_is_infinity(const EC_POINT *point) {
    return point->is_infinity;
}

int EC_POINT_copy(EC_POINT *dest, const EC_POINT *src) {
    if (dest == NULL) {
        return 0;
    }
    if (EC_POINT_is_infinity(src)) {
        dest->is_infinity = 1;
    }
    else{
        dest->is_infinity = 0;
        if (!BN_copy(dest->X, src->X) || !BN_copy(dest->Y, src->Y)) return 0;
    }
    return 1;
}

#define NORMAL 0x1
#define COMPRESS 0x2
#define MIX 0x4

int EC_POINT_ecp2bin(uint8 *out, const EC_POINT *point, int p_bytes, int flag) {
    uint8 PC;
    uint8 *p = out, *buf;
    int i;
    buf = malloc(p_bytes);
    if (EC_POINT_is_infinity(point)) {
        return 0;
    }
    if (flag == NORMAL) {
        PC = 0x04;
        *(p++) = PC;
        if (!BN_bn2binpad(point->X, buf, p_bytes)) {
            return 0;
        }
        for (i = 0; i < p_bytes; ++i) {
            *(p++) = buf[i];
        }
        if (!BN_bn2binpad(point->Y, buf, p_bytes)) {
            return 0;
        }
        for (i = 0; i < p_bytes; ++i) {
            *(p++) = buf[i];
        }
    }
    else {
        goto err; /* not supported */
    }
    return 1;
    err: 
    return 0;
}

int EC_POINT_bin2ecp(EC_POINT *point, const uint8 *src, int p_bytes) {
    if (point == NULL) {
        return 0;
    }
    uint8 PC = *src;
    const uint8 *data = src + 1;
    uint8 *buf;
    int i;
    if (PC == 0x04) {
        if (!BN_bin2bn(data, p_bytes, point->X)
        || !BN_bin2bn(data+p_bytes, p_bytes, point->Y)) {
            return 0;
        }
    }
    else {
        goto err; /* not supported */
    }
    return 1;
    err: 
    return 0;
}

int EC_POINT_ecp2bin_normal(uint8 *out, const EC_POINT *point, int p_bytes) {
    return EC_POINT_ecp2bin(out, point, p_bytes, NORMAL);
}

// int EC_POINT_ecp2bin_compressed(uint8 *out, const EC_POINT *point, int p_bytes) {
//     return EC_POINT_ecp2bin(out, point, p_bytes, COMPRESS);
// }

// int EC_POINT_ecp2bin_mix(uint8 *out, const EC_POINT *point, int p_bytes) {
//     return EC_POINT_ecp2bin(out, point, p_bytes, MIX);
// }

typedef struct ec_group_st {
    EC_POINT *generator;    /* point G */
    BIGNUM *order;          /* n */
    BIGNUM *cofactor;       /* h */
    BIGNUM *field;          /* module p */
    BIGNUM *a, *b;          /* ECC parameter */
} EC_GROUP;

int EC_GROUP_init(EC_GROUP *group) {
    group->generator = EC_POINT_new();
    group->order = BN_new();
    group->cofactor = BN_new();
    group->field = BN_new();
    group->a = BN_new();
    group->b = BN_new();
    if (group->generator == NULL || group->b == NULL) {
        free(group->generator);
        BN_free(group->order);
        BN_free(group->cofactor);
        BN_free(group->field);
        BN_free(group->a);
        BN_free(group->b);
        return 0;
    }
    return 1;
}

EC_GROUP *EC_GROUP_new() {
    EC_GROUP *ret = NULL;
    ret = malloc(sizeof(*ret));
    if (ret == NULL) {
        return NULL;
    }
    if (!EC_GROUP_init(ret)) {
        free(ret);
        return NULL;
    }
    return ret;
}

int EC_GROUP_copy(EC_GROUP *dest, const EC_GROUP *src) {
    if (dest == NULL) {
        return 0;
    }
    if (dest == src) {
        return 1;
    }
    if (!EC_POINT_copy(dest->generator, src->generator)
        || !BN_copy(dest->order, src->order)
        || !BN_copy(dest->cofactor, src->cofactor)
        || !BN_copy(dest->field, src->field)
        || !BN_copy(dest->a, src->a)
        || !BN_copy(dest->b, src->b)) {
        return 0;
    }
    return 1;
}

int EC_GROUP_set_param(EC_GROUP *group, const BIGNUM *field, const BIGNUM *a, const BIGNUM *b, const BIGNUM *order, const BIGNUM *cofactor, const EC_POINT *point) {
    if (group == NULL) {
        return 0;
    }
    group->field = BN_new();
    group->a = BN_new();
    group->b = BN_new();
    group->order = BN_new();
    group->cofactor = BN_new();
    group->generator = EC_POINT_new();
    if (group->cofactor == NULL
    || group->generator == NULL) {
        return 0;
    }
    if (!BN_copy(group->field, field)
        || !BN_copy(group->a, a)
        || !BN_copy(group->b, b)
        || !BN_copy(group->order, order)
        || !BN_copy(group->cofactor, cofactor)
        || !EC_POINT_copy(group->generator, point)) {
        return 0;
    }
    return 1;
}

int EC_POINT_double(EC_POINT *r, const EC_POINT *a, const EC_GROUP *group) {
    const BIGNUM *p;
    BN_CTX *ctx = NULL;
    int ret = 0;
    BIGNUM *ax, *ay, *lnum, *ldeno;
    BIGNUM *tmp, *bn_value_3;
    if (r == NULL) {
        return 0;
    }
    if (EC_POINT_is_infinity(a)) {
        return EC_POINT_copy(r, EC_point_infinity());
    }
    p = group->field;
    ctx = BN_CTX_new();
    if (ctx == NULL) {
        return 0;
    }
    BN_CTX_start(ctx);
    ax = BN_CTX_get(ctx);
    ay = BN_CTX_get(ctx);
    lnum = BN_CTX_get(ctx);
    ldeno = BN_CTX_get(ctx);
    tmp = BN_CTX_get(ctx);
    bn_value_3 = BN_CTX_get(ctx);
    if (bn_value_3 == NULL) {
        goto done;
    }
    if (!BN_copy(ax, a->X)
        || !BN_copy(ay, a->Y)) {
        goto done;
    }
    if (!BN_set_word(bn_value_3, 3)
        || !BN_mod_sqr(lnum, ax, p, ctx)
        || !BN_mod_mul(lnum, lnum, bn_value_3, p, ctx)
        || !BN_mod_add_quick(lnum, lnum, group->a, p)
        || !BN_mod_lshift1_quick(ldeno, ay, p)
        || !BN_mod_inverse(ldeno, ldeno, p, ctx)
        || !BN_mod_mul(lnum, lnum, ldeno, p, ctx)) {
        goto done;
    }
    if (!BN_mod_sqr(r->X, lnum, p, ctx)) {
        goto done;
    }
    if (!BN_mod_lshift1_quick(tmp, ax, p)) {
        goto done;
    }
    if (!BN_mod_sub_quick(r->X, r->X, tmp, p)) {
        goto done;
    }
    if (!BN_mod_sub_quick(r->Y, ax, r->X, p)) {
        goto done;
    }
    if (!BN_mod_mul(r->Y, lnum, r->Y, p, ctx)) {
        goto done;
    }
    if (!BN_mod_sub_quick(r->Y, r->Y, ay, p)) {
        goto done;
    }
    if (r == NULL) {
        r = EC_POINT_new();
        if (r == NULL) {
            goto done;
        }
    }
    ret = 1;
    done:
    BN_CTX_end(ctx);
    BN_CTX_free(ctx);
    return ret;
}

int EC_POINT_add(EC_POINT *r, const EC_POINT *a, const EC_POINT *b, const EC_GROUP *group) {
    const BIGNUM *p;
    BN_CTX *ctx = NULL;
    int ret = 0;
    BIGNUM *ax, *ay, *bx, *by, *lnum, *ldeno;
    BIGNUM *tmp, *bn_value_3;
    if (r == NULL) {
        return 0;
    }
    if (a == b) {
        return EC_POINT_double(r, a, group);
    }
    if (EC_POINT_is_infinity(a)) {
        return EC_POINT_copy(r, b);
    }
    if (EC_POINT_is_infinity(b)) {
        return EC_POINT_copy(r, a);
    }
    p = group->field;
    ctx = BN_CTX_new();
    if (ctx == NULL) {
        return 0;
    }
    BN_CTX_start(ctx);
    ax = BN_CTX_get(ctx);
    ay = BN_CTX_get(ctx);
    bx = BN_CTX_get(ctx);
    by = BN_CTX_get(ctx);
    lnum = BN_CTX_get(ctx);
    ldeno = BN_CTX_get(ctx);
    tmp = BN_CTX_get(ctx);
    bn_value_3 = BN_CTX_get(ctx);
    if (bn_value_3 == NULL) {
        goto done;
    }
    if (!BN_copy(ax, a->X)
        || !BN_copy(ay, a->Y)
        || !BN_copy(bx, b->X)
        || !BN_copy(by, b->Y)) {
        goto done;
    }
    if (BN_cmp(ax, bx) == 0) {
        if (!BN_mod_add_quick(tmp, ay, by, p)) {
            goto done;
        }
        if (BN_is_zero(tmp)
            || !EC_POINT_copy(r, EC_point_infinity())) {
            goto done;
        }
        if (!BN_set_word(bn_value_3, 3)) {
            goto done;
        }
        if (!BN_mod_sqr(lnum, ax, p, ctx)
            || !BN_mod_mul(lnum, lnum, bn_value_3, p, ctx)
            || !BN_mod_add_quick(lnum, lnum, group->a, p)
            || !BN_mod_lshift1_quick(ldeno, ay, p)
            || !BN_mod_inverse(ldeno, ldeno, p, ctx)
            || !BN_mod_mul(lnum, lnum, ldeno, p, ctx)) {
            goto done;
        }
    }
    else {
        if (!BN_mod_sub_quick(lnum, by, ay, p)) {
            goto done;
        }
        if (!BN_mod_sub_quick(ldeno, bx, ax, p)) {
            goto done;
        }
        if (!BN_mod_inverse(ldeno, ldeno, p, ctx)) {
            goto done;
        }
        if (!BN_mod_mul(lnum, lnum, ldeno, p, ctx)) {
            goto done;
        }
    }
    if (!BN_mod_sqr(tmp, lnum, p, ctx)) {
        goto done;
    }
    if (!BN_mod_sub_quick(tmp, tmp, ax, p)) {
        goto done;
    }
    if (!BN_mod_sub_quick(r->X, tmp, bx, p)) {
        goto done;
    }
    if (!BN_mod_sub_quick(r->Y, ax, r->X, p)) {
        goto done;
    }
    if (!BN_mod_mul(r->Y, lnum, r->Y, p, ctx)) {
        goto done;
    }
    if (!BN_mod_sub_quick(r->Y, r->Y, ay, p)) {
        goto done;
    }
    if (r == NULL) {
        r = EC_POINT_new();
        if (r == NULL) {
            goto done;
        }
    }
    ret = 1;
    done:
    BN_CTX_end(ctx);
    BN_CTX_free(ctx);
    return ret;
}

int EC_POINT_mul(EC_POINT *r, const EC_POINT *a, const BIGNUM *b, const EC_GROUP *group) {
    if (r == NULL) {
        return 0;
    }
    if (BN_is_negative(b)) {
        EC_POINT *_a = EC_POINT_new();
        BIGNUM *_b = BN_new();
        if (!EC_POINT_copy(_a, a)
            || !BN_copy(_b, b)
            || !BN_mod_sub_quick(_a->Y, group->field, _a->Y, group->field)) {
            return 0;
        }
        BN_set_negative(_b, 0);
        return EC_POINT_mul(r, _a, _b, group);
    }
    if (!EC_POINT_copy(r, EC_point_infinity())){
        return 0;
    }
    int bits = BN_num_bits(b);
    for (int i = bits-1; i >= 0; --i) {
        if (!EC_POINT_double(r, r, group)) {
            return 0;
        }
        if (BN_is_bit_set(b, i)) {
            if (!EC_POINT_add(r, r, a, group)) {
                return 0;
            }
        }
    }
    return 1;
}

/*
 * Only for curve y^2 = x^3 + ax + b. 
 * Please check infinity before calling.
 */
int EC_POINT_on_curve_simple(const EC_POINT *point, const EC_GROUP *group) {
    if (point == NULL || group == NULL) {
        return 0;
    }
    if (EC_POINT_is_infinity(point)) {
        return 1;
    }
    int ret = 0;
    BN_CTX *ctx;
    BIGNUM *p, *a, *b, *x, *y, *lhs, *rhs;
    EC_POINT *Nq;
    ctx = BN_CTX_new();
    if (ctx == NULL) {
        return ret;
    }
    BN_CTX_start(ctx);
    p = group->field;
    a = group->a;
    b = group->b;
    x = point->X;
    y = point->Y;
    lhs = BN_CTX_get(ctx);
    rhs = BN_CTX_get(ctx);
    Nq = EC_POINT_new();
    if (p == NULL 
        || a == NULL 
        || b == NULL 
        || x == NULL 
        || y == NULL 
        || rhs == NULL
        || Nq == NULL) {
        return ret;
    }
    if (!BN_mod_mul(lhs, y, y, p, ctx)
        || !BN_mod_mul(rhs, x, x, p, ctx)
        || !BN_mod_add_quick(rhs, rhs, a, p)
        || !BN_mod_mul(rhs, rhs, x, p, ctx)
        || !BN_mod_add_quick(rhs, rhs, b, p)
        || !EC_POINT_mul(Nq, point, group->order, group)) {
        return ret;
    }
    if (BN_cmp(lhs, rhs) != 0
        || !EC_POINT_is_infinity(Nq)) {
        return ret;
    }
    ret = 1;
    BN_CTX_end(ctx);
    BN_CTX_free(ctx);
    return ret;
}

typedef struct ec_key_st {
    EC_GROUP *group;
    EC_POINT *pub_key;
    BIGNUM *priv_key;
} EC_KEY;

int EC_KEY_init(EC_KEY *key) {
    key->group = EC_GROUP_new();
    key->pub_key = EC_POINT_new();
    key->priv_key = BN_new();
    if (key->group == NULL 
        || key->pub_key == NULL
        || key->priv_key == NULL) {
            free(key->group);
            free(key->pub_key);
            BN_free(key->priv_key);
            return 0;
    }
    return 1;
}

EC_KEY *EC_KEY_new() {
    EC_KEY *ret = NULL;
    ret = malloc(sizeof(*ret));
    if (ret == NULL) {
        return NULL;
    }
    if (!EC_KEY_init(ret)) {
        free(ret);
        return NULL;
    }
    return ret;
}

int EC_KEY_set_group(EC_KEY *key, const EC_GROUP *group) {
    if (!EC_GROUP_copy(key->group, group)) {
        return 0;
    }
    return 1;
}

int EC_KEY_set_priv_key(EC_KEY *key, const BIGNUM *priv_key) {
    BIGNUM *tmp;
    tmp = BN_dup(priv_key);
    if (tmp == NULL) {
        return 0;
    }
    BN_clear_free(key->priv_key);
    key->priv_key = tmp;
    return 1;
}

int EC_KEY_generate_pub_key(EC_KEY *key) {
    return EC_POINT_mul(key->pub_key, key->group->generator, key->priv_key, key->group);
}

const BIGNUM *EC_KEY_get_priv_key(const EC_KEY *key) {
    return key->priv_key;
}

int EC_KEY_generate_key() {}
