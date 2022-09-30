#ifndef SECGEAR_SM3_H
#define SECGEAR_SM3_H

/*
 * Ref: 
 * GB/T 32905-2016
 */

#include <string.h>
#include "../include/common_utils.h"

#define SM3_DIGEST_LENGTH 32
#define SM3_WORD uint32

#define SM3_CBLOCK 64
#define SM3_LBLOCK (SM3_CBLOCK/4)

typedef struct SM3state_st {
    SM3_WORD A, B, C, D, E, F, G, H;
    SM3_WORD Nl, Nh;
    SM3_WORD data[SM3_LBLOCK];
    unsigned int num;
} SM3_CTX;

#define P0(X) (X ^ ROTATE(X, 9) ^ ROTATE(X, 17))
#define P1(X) (X ^ ROTATE(X, 15) ^ ROTATE(X, 23))

#define FF(J,X,Y,Z) (J<16 ? (X ^ Y ^ Z) : ((X & Y) | (X & Z) | (Y & Z)))
#define GG(J,X,Y,Z) (J<16 ? (X ^ Y ^ Z) : ((X & Y) | ((~X) & Z)))

#define T(J) (J<16 ? 0x79cc4519 : 0x7a879d8a)

#define EXPAND(W0,W7,W13,W3,W10) \
    (P1(W0 ^ W7 ^ ROTATE(W13, 15)) ^ ROTATE(W3, 7) ^ W10)

#define SM3_A 0x7380166fUL
#define SM3_B 0x4914b2b9UL
#define SM3_C 0x172442d7UL
#define SM3_D 0xda8a0600UL
#define SM3_E 0xa96f30bcUL
#define SM3_F 0x163138aaUL
#define SM3_G 0xe38dee4dUL
#define SM3_H 0xb0fb0e4eUL

#define SM3_MAKE_STRING(c, s)               \
    do {                                    \
        unsigned long ll;                   \
        ll=(c)->A; (void)HOST_l2c(ll, (s)); \
        ll=(c)->B; (void)HOST_l2c(ll, (s)); \
        ll=(c)->C; (void)HOST_l2c(ll, (s)); \
        ll=(c)->D; (void)HOST_l2c(ll, (s)); \
        ll=(c)->E; (void)HOST_l2c(ll, (s)); \
        ll=(c)->F; (void)HOST_l2c(ll, (s)); \
        ll=(c)->G; (void)HOST_l2c(ll, (s)); \
        ll=(c)->H; (void)HOST_l2c(ll, (s)); \
    } while (0)

void sm3_block_data_order(SM3_CTX *ctx, const void *p, size_t num) {
    const unsigned char *data = p;
    SM3_WORD A, B, C, D, E, F, G, H;
    SM3_WORD w[68]={}, ww[64]={};
    while (num--) {
        A = ctx->A;
        B = ctx->B;
        C = ctx->C;
        D = ctx->D;
        E = ctx->E;
        F = ctx->F;
        G = ctx->G;
        H = ctx->H;
        for (int j = 0; j < 16; ++j) {
            HOST_c2l(data, w[j]);
        }
        for (int j = 16; j < 68; ++j) {
            w[j] = EXPAND(w[j-16], w[j-9], w[j-3], w[j-13], w[j-6]);
        }
        for (int j = 0; j < 64; ++j) {
            ww[j] = w[j] ^ w[j+4];
        }
        for (int j = 0; j < 64; j++) {
            SM3_WORD SS1, SS2, TT1, TT2;
            SS1 = ROTATE(ROTATE(A, 12) + E + ROTATE(T(j), j&31), 7);
            SS2 = SS1 ^ ROTATE(A, 12);
            TT1 = FF(j, A, B, C) + D + SS2 + ww[j];
            TT2 = GG(j, E, F, G) + H + SS1 + w[j];
            D = C;
            C = ROTATE(B,9);
            B = A;
            A = TT1;
            H = G;
            G = ROTATE(F, 19);
            F = E;
            E = P0(TT2);
        }
        ctx->A ^= A;
        ctx->B ^= B;
        ctx->C ^= C;
        ctx->D ^= D;
        ctx->E ^= E;
        ctx->F ^= F;
        ctx->G ^= G;
        ctx->H ^= H;
    }
}

int sm3_init(SM3_CTX *c) {
    memset(c, 0, sizeof(*c));
    c->A = SM3_A;
    c->B = SM3_B;
    c->C = SM3_C;
    c->D = SM3_D;
    c->E = SM3_E;
    c->F = SM3_F;
    c->G = SM3_G;
    c->H = SM3_H;
    return 1;
}

int sm3_update(SM3_CTX *c, const void *data_, size_t len) {
    const unsigned char *data = data_;
    unsigned char *p;
    SM3_WORD l;
    size_t n;
    if (len == 0) return 1;
    l = (c->Nl + (((SM3_WORD) len) << 3)) & 0xffffffffUL;
    if (l < c->Nl) c->Nh++;
    c->Nh += (SM3_WORD) (len >> 29); 
    c->Nl = l;
    n = c->num;
    if (n != 0) {
        p = (unsigned char *)c->data;
        if (len >= SM3_CBLOCK || len + n >= SM3_CBLOCK) {
            memcpy(p + n, data, SM3_CBLOCK - n);
            sm3_block_data_order(c, p, 1);
            n = SM3_CBLOCK - n;
            data += n;
            len -= n;
            c->num = 0;
            memset(p, 0, SM3_CBLOCK);
        } 
        else {
            memcpy(p + n, data, len);
            c->num += (unsigned int)len;
            return 1;
        }
    }
    n = len / SM3_CBLOCK;
    if (n > 0) {
        sm3_block_data_order(c, data, n);
        n *= SM3_CBLOCK;
        data += n;
        len -= n;
    }
    if (len != 0) {
        p = (unsigned char *)c->data;
        c->num = (unsigned int)len;
        memcpy(p, data, len);
    }
    return 1;
}

int sm3_final(unsigned char *md, SM3_CTX *c) {
    unsigned char *p = (unsigned char *)c->data;
    size_t n = c->num;
    p[n] = 0x80;
    n++;
    if (n > (SM3_CBLOCK - 8)) {
        memset(p + n, 0, SM3_CBLOCK - n);
        n = 0;
        sm3_block_data_order(c, p, 1);
    }
    memset(p + n, 0, SM3_CBLOCK - 8 - n);
    p += SM3_CBLOCK - 8;
    (void)HOST_l2c(c->Nh, p);
    (void)HOST_l2c(c->Nl, p);
    p -= SM3_CBLOCK;
    sm3_block_data_order(c, p, 1);
    c->num = 0;
    SM3_MAKE_STRING(c, md);
    return 1;
}

#endif