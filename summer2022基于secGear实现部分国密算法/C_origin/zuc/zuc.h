#ifndef SECGEAR_ZUC_H
#define SECGEAR_ZUC_H

#include <string.h>
#include "../include/common_utils.h"

/* S_BOX BEGIN */

const uint8 ZUC_S[2][256] = {
    {
    0x3E, 0x72, 0x5B, 0x47, 0xCA, 0xE0, 0x00, 0x33, 0x04, 0xD1, 0x54, 0x98, 0x09, 0xB9, 0x6D, 0xCB, 
    0x7B, 0x1B, 0xF9, 0x32, 0xAF, 0x9D, 0x6A, 0xA5, 0xB8, 0x2D, 0xFC, 0x1D, 0x08, 0x53, 0x03, 0x90, 
    0x4D, 0x4E, 0x84, 0x99, 0xE4, 0xCE, 0xD9, 0x91, 0xDD, 0xB6, 0x85, 0x48, 0x8B, 0x29, 0x6E, 0xAC, 
    0xCD, 0xC1, 0xF8, 0x1E, 0x73, 0x43, 0x69, 0xC6, 0xB5, 0xBD, 0xFD, 0x39, 0x63, 0x20, 0xD4, 0x38, 
    0x76, 0x7D, 0xB2, 0xA7, 0xCF, 0xED, 0x57, 0xC5, 0xF3, 0x2C, 0xBB, 0x14, 0x21, 0x06, 0x55, 0x9B, 
    0xE3, 0xEF, 0x5E, 0x31, 0x4F, 0x7F, 0x5A, 0xA4, 0x0D, 0x82, 0x51, 0x49, 0x5F, 0xBA, 0x58, 0x1C, 
    0x4A, 0x16, 0xD5, 0x17, 0xA8, 0x92, 0x24, 0x1F, 0x8C, 0xFF, 0xD8, 0xAE, 0x2E, 0x01, 0xD3, 0xAD, 
    0x3B, 0x4B, 0xDA, 0x46, 0xEB, 0xC9, 0xDE, 0x9A, 0x8F, 0x87, 0xD7, 0x3A, 0x80, 0x6F, 0x2F, 0xC8, 
    0xB1, 0xB4, 0x37, 0xF7, 0x0A, 0x22, 0x13, 0x28, 0x7C, 0xCC, 0x3C, 0x89, 0xC7, 0xC3, 0x96, 0x56, 
    0x07, 0xBF, 0x7E, 0xF0, 0x0B, 0x2B, 0x97, 0x52, 0x35, 0x41, 0x79, 0x61, 0xA6, 0x4C, 0x10, 0xFE, 
    0xBC, 0x26, 0x95, 0x88, 0x8A, 0xB0, 0xA3, 0xFB, 0xC0, 0x18, 0x94, 0xF2, 0xE1, 0xE5, 0xE9, 0x5D, 
    0xD0, 0xDC, 0x11, 0x66, 0x64, 0x5C, 0xEC, 0x59, 0x42, 0x75, 0x12, 0xF5, 0x74, 0x9C, 0xAA, 0x23, 
    0x0E, 0x86, 0xAB, 0xBE, 0x2A, 0x02, 0xE7, 0x67, 0xE6, 0x44, 0xA2, 0x6C, 0xC2, 0x93, 0x9F, 0xF1, 
    0xF6, 0xFA, 0x36, 0xD2, 0x50, 0x68, 0x9E, 0x62, 0x71, 0x15, 0x3D, 0xD6, 0x40, 0xC4, 0xE2, 0x0F, 
    0x8E, 0x83, 0x77, 0x6B, 0x25, 0x05, 0x3F, 0x0C, 0x30, 0xEA, 0x70, 0xB7, 0xA1, 0xE8, 0xA9, 0x65, 
    0x8D, 0x27, 0x1A, 0xDB, 0x81, 0xB3, 0xA0, 0xF4, 0x45, 0x7A, 0x19, 0xDF, 0xEE, 0x78, 0x34, 0x60, 
    },
    {
    0x55, 0xC2, 0x63, 0x71, 0x3B, 0xC8, 0x47, 0x86, 0x9F, 0x3C, 0xDA, 0x5B, 0x29, 0xAA, 0xFD, 0x77, 
    0x8C, 0xC5, 0x94, 0x0C, 0xA6, 0x1A, 0x13, 0x00, 0xE3, 0xA8, 0x16, 0x72, 0x40, 0xF9, 0xF8, 0x42, 
    0x44, 0x26, 0x68, 0x96, 0x81, 0xD9, 0x45, 0x3E, 0x10, 0x76, 0xC6, 0xA7, 0x8B, 0x39, 0x43, 0xE1, 
    0x3A, 0xB5, 0x56, 0x2A, 0xC0, 0x6D, 0xB3, 0x05, 0x22, 0x66, 0xBF, 0xDC, 0x0B, 0xFA, 0x62, 0x48, 
    0xDD, 0x20, 0x11, 0x06, 0x36, 0xC9, 0xC1, 0xCF, 0xF6, 0x27, 0x52, 0xBB, 0x69, 0xF5, 0xD4, 0x87, 
    0x7F, 0x84, 0x4C, 0xD2, 0x9C, 0x57, 0xA4, 0xBC, 0x4F, 0x9A, 0xDF, 0xFE, 0xD6, 0x8D, 0x7A, 0xEB, 
    0x2B, 0x53, 0xD8, 0x5C, 0xA1, 0x14, 0x17, 0xFB, 0x23, 0xD5, 0x7D, 0x30, 0x67, 0x73, 0x08, 0x09, 
    0xEE, 0xB7, 0x70, 0x3F, 0x61, 0xB2, 0x19, 0x8E, 0x4E, 0xE5, 0x4B, 0x93, 0x8F, 0x5D, 0xDB, 0xA9, 
    0xAD, 0xF1, 0xAE, 0x2E, 0xCB, 0x0D, 0xFC, 0xF4, 0x2D, 0x46, 0x6E, 0x1D, 0x97, 0xE8, 0xD1, 0xE9, 
    0x4D, 0x37, 0xA5, 0x75, 0x5E, 0x83, 0x9E, 0xAB, 0x82, 0x9D, 0xB9, 0x1C, 0xE0, 0xCD, 0x49, 0x89, 
    0x01, 0xB6, 0xBD, 0x58, 0x24, 0xA2, 0x5F, 0x38, 0x78, 0x99, 0x15, 0x90, 0x50, 0xB8, 0x95, 0xE4, 
    0xD0, 0x91, 0xC7, 0xCE, 0xED, 0x0F, 0xB4, 0x6F, 0xA0, 0xCC, 0xF0, 0x02, 0x4A, 0x79, 0xC3, 0xDE, 
    0xA3, 0xEF, 0xEA, 0x51, 0xE6, 0x6B, 0x18, 0xEC, 0x1B, 0x2C, 0x80, 0xF7, 0x74, 0xE7, 0xFF, 0x21, 
    0x5A, 0x6A, 0x54, 0x1E, 0x41, 0x31, 0x92, 0x35, 0xC4, 0x33, 0x07, 0x0A, 0xBA, 0x7E, 0x0E, 0x34, 
    0x88, 0xB1, 0x98, 0x7C, 0xF3, 0x3D, 0x60, 0x6C, 0x7B, 0xCA, 0xD3, 0x1F, 0x32, 0x65, 0x04, 0x28, 
    0x64, 0xBE, 0x85, 0x9B, 0x2F, 0x59, 0x8A, 0xD7, 0xB0, 0x25, 0xAC, 0xAF, 0x12, 0x03, 0xE2, 0xF2, 
    },
};

const uint16 ZUC_D[16] = {
    042327, 023274, 061153, 011536, 
    053611, 032742, 070465, 004657, 
    046570, 027423, 065704, 015361, 
    057046, 036115, 074232, 043654,
};

#define ZUC_S0(x) ZUC_S[0][x] 
#define ZUC_S1(x) ZUC_S[1][x]
#define ZUC_S_BOX(X) \
    CONCAT_8x4( \
        ZUC_S0(EXTRACT_8_32(X, 0)), \
        ZUC_S1(EXTRACT_8_32(X, 1)), \
        ZUC_S0(EXTRACT_8_32(X, 2)), \
        ZUC_S1(EXTRACT_8_32(X, 3))  \
    )

/* S_BOX END */

/* MOD_OPERATIONS BEGIN */

#define ZUC_MOD_NUM 0x7FFFFFFF
uint32 zuc_add(uint32 a, uint32 b) {
    uint32 c = a + b;
    return (c & ZUC_MOD_NUM) + (c >> 31);
}
uint32 zuc_mul(uint32 a, uint32 b) {
    uint32 res = 0;
    for (int i = 0; i < 31; ++i) {
        if (b & (1 << i)) {
            res = zuc_add(res, ROTATE_31(a, i));
        }
    }
    return res;
}
uint32 zuc_mul_powof2(uint32 a, uint32 log2b) {
    return ROTATE_31(a, log2b);
}

/* MOD_OPERATIONS END */

/* LFSR BEGIN */

typedef struct ZUC_LFSR_st {
    uint32 S[16]; /* 31-bit */
} ZUC_LFSR;

void zuc_lfsr_init(ZUC_LFSR *lfsr, uint32 u) { /* u: 31-bit */
    uint32 v = zuc_add(
        zuc_add(
            zuc_add(
                zuc_mul_powof2(lfsr->S[15], 15), 
                zuc_mul_powof2(lfsr->S[13], 17)
            ),
            zuc_add(
                zuc_mul_powof2(lfsr->S[10], 21), 
                zuc_mul_powof2(lfsr->S[4], 20)
            )
        ),
        zuc_add(lfsr->S[0], zuc_mul_powof2(lfsr->S[0], 8))
    );
    uint32 S16 = zuc_add(v, u);
    S16 = zuc_add(S16, ZUC_MOD_NUM);
    for (int i = 0; i < 15; ++i) {
        lfsr->S[i] = lfsr->S[i + 1];
    }
    lfsr->S[15] = S16;
}
void zuc_lfsr_work(ZUC_LFSR *lfsr) {
    uint32 S16 = zuc_add(
        zuc_add(
            zuc_add(
                zuc_mul_powof2(lfsr->S[15], 15), 
                zuc_mul_powof2(lfsr->S[13], 17)
            ),
            zuc_add(
                zuc_mul_powof2(lfsr->S[10], 21), 
                zuc_mul_powof2(lfsr->S[4], 20)
            )
        ),
        zuc_add(lfsr->S[0], zuc_mul_powof2(lfsr->S[0], 8))
    );
    S16 = zuc_add(S16, ZUC_MOD_NUM);
    for (int i = 0; i < 15; ++i) {
        lfsr->S[i] = lfsr->S[i + 1];
    }
    lfsr->S[15] = S16;
}

/* LFSR END */

/* BR BEGIN */

typedef struct ZUC_BR_st {
    uint32 X[4]; /* 32-bit */
} ZUC_BR_CTX;

void zuc_br(ZUC_BR_CTX *br, ZUC_LFSR *lfsr) {
    br->X[0] = CONCAT_16x2(EXTRACT_16H_31(lfsr->S[15]), EXTRACT_16L_31(lfsr->S[14]));
    br->X[1] = CONCAT_16x2(EXTRACT_16L_31(lfsr->S[11]), EXTRACT_16H_31(lfsr->S[9]));
    br->X[2] = CONCAT_16x2(EXTRACT_16L_31(lfsr->S[7]), EXTRACT_16H_31(lfsr->S[5]));
    br->X[3] = CONCAT_16x2(EXTRACT_16L_31(lfsr->S[2]), EXTRACT_16H_31(lfsr->S[0]));
}

/* BR END */

/* F BEGIN */

#define ZUC_L1(X) \
    ((X) ^ ROTATE((X), 2) ^ ROTATE((X), 10) ^ ROTATE((X), 18) ^ ROTATE((X), 24))
#define ZUC_L2(X) \
    ((X) ^ ROTATE((X), 8) ^ ROTATE((X), 14) ^ ROTATE((X), 22) ^ ROTATE((X), 30))

typedef struct ZUC_F_st {
    uint32 R1, R2; /* 32-bit */
} ZUC_F_CTX;

uint32 zuc_f(ZUC_F_CTX *f, ZUC_BR_CTX *br) { /* X: 32-bit */
    uint32 X0 = br->X[0], X1 = br->X[1], X2 = br->X[2];
    uint32 R1 = f->R1, R2 = f->R2;
    uint32 W = (X0 ^ R1) + R2;
    uint32 W1 = R1 + X1;
    uint32 W2 = R2 ^ X2;
    R1 = ZUC_S_BOX(ZUC_L1(CONCAT_16x2(
        EXTRACT_16_32(W1, 1),
        EXTRACT_16_32(W2, 0)
    )));
    R2 = ZUC_S_BOX(ZUC_L2(CONCAT_16x2(
        EXTRACT_16_32(W2, 1),
        EXTRACT_16_32(W1, 0)
    )));
    f->R1 = R1;
    f->R2 = R2;
    return W;
}

/* F END */

/* ZUC_MAIN BEGIN */

#define ZUC_INIT_CONCAT(k, d, iv) (((uint32)(k) << 15 | (d)) << 8 | (iv))
#define ZUC_INTEGRITY_CONCAT(K1, K2, offset) \
    (((K1) << (offset)) | ((offset) ? (K2) >> (32 - (offset)) : 0))

typedef struct ZUCstate_st {
    ZUC_LFSR lfsr;
    ZUC_BR_CTX br;
    ZUC_F_CTX f;
} ZUC_CTX;

/* Initiate phase. Both k and iv are uint8 arrays of length 16. */
int zuc_init(ZUC_CTX *z, uint8 k[], uint8 iv[]) {
    memset(z, 0, sizeof(*z));
    for (int i = 0; i < 16; ++i) {
        z->lfsr.S[i] = ZUC_INIT_CONCAT(k[i], ZUC_D[i], iv[i]);
    }
    #ifdef SECGEAR_ZUC_DEBUG
    printf("LSFR init: \n");
    for (int i = 0; i < 16; ++i) {
        printf("%08x%c", z->lfsr.S[i], " \n"[(i & 7) == 7]);
    }
    #endif
    for (int i = 0; i < 32; ++i) {
        zuc_br(&z->br, &z->lfsr);
        uint32 W = zuc_f(&z->f, &z->br);
        zuc_lfsr_init(&z->lfsr, W >> 1);
        #ifdef SECGEAR_ZUC_DEBUG
        printf("Init round %2d: \n", i);
        printf("BR_X: ");
        for (int i = 0; i < 4; ++i) {
            printf("%08x%c", z->br.X[i], " \n"[i == 3]);
        }
        printf("F_R: %08x %08x\n", z->f.R1, z->f.R2);
        printf("W = %08x S15 = %08x\n", W, z->lfsr.S[15]);
        #endif
    }
    return 1;
}

/* Work phase. Z is uint32 array that stores output keys. */
/* len is the length of the key in the unit of 32-bit. */
int zuc_work(ZUC_CTX *z, uint32 Z[], size_t len) {
    zuc_br(&z->br, &z->lfsr);
    #ifndef SECGEAR_ZUC_DEBUG
    (void)zuc_f(&z->f, &z->br);
    #else
    uint32 _Z = zuc_f(&z->f, &z->br) ^ z->br.X[3];
    #endif
    zuc_lfsr_work(&z->lfsr);
    #ifdef SECGEAR_ZUC_DEBUG
    printf("Key stream: \n");
    printf("BR_X: ");
    for (int i = 0; i < 4; ++i) {
        printf("%08x%c", z->br.X[i], " \n"[i == 3]);
    }
    printf("F_R: %08x %08x\n", z->f.R1, z->f.R2);
    printf("Z = %08x S15 = %08x\n", _Z, z->lfsr.S[15]);
    #endif
    for (size_t i = 0; i < len; ++i) {
        zuc_br(&z->br, &z->lfsr);
        Z[i] = zuc_f(&z->f, &z->br) ^ z->br.X[3];
        zuc_lfsr_work(&z->lfsr);
        #ifdef SECGEAR_ZUC_DEBUG
        printf("Key round %2zu: \n", i);
        printf("BR_X: ");
        for (int i = 0; i < 4; ++i) {
            printf("%08x%c", z->br.X[i], " \n"[i == 3]);
        }
        printf("F_R: %08x %08x\n", z->f.R1, z->f.R2);
        printf("Z = %08x S15 = %08x\n", Z[i], z->lfsr.S[15]);
        #endif
    }
    return 1;
}

/* Generate 32-bit ZUC key stream. Use the array Z[] to receive the output. */
int zuc_final(uint8 k[], uint8 iv[], uint32 Z[], size_t len) {
    ZUC_CTX res, *z;
    z = &res;
    zuc_init(z, k, iv);
    #ifdef SECGEAR_ZUC_DEBUG
    printf("After init: \n");
    printf("LSFR: \n");
    for (int i = 0; i < 16; ++i) {
        printf("%08x%c", z->lfsr.S[i], " \n"[(i & 7) == 7]);
    }
    printf("F_R: %08x %08x\n", z->f.R1, z->f.R2);
    #endif
    zuc_work(z, Z, len);
    #ifdef SECGEAR_ZUC_DEBUG
    printf("Output: \n");
    for (size_t i = 0; i < len; ++i) {
        printf("z[%2zu] = %08x\n", i, Z[i]);
    }
    #endif
    return 1;
}

/* Use the array obs[] to receive the output. */
int zuc_confidentiality(uint32 count, uint8 bearer, uint8 direction, uint8 ck[], 
                        uint32 length, uint32 ibs[], uint32 obs[]) {
    /* 
     * @param COUNT     (length =  32b, counter)
     * @param BEARER    (length =   5b, bearer identifier)
     * @param DIRECTION (length =   1b, direction identifier)
     * @param CK        (length = 128b = 8b * 16, confidential key)
     * @param LENGTH    (length =  32b, bit length of input bit stream)
     * @param IBS       (length =  LENGTH b = 32b * L, input bit stream)
     * @param OBS       (length =  LENGTH b = 32b * L, output bit stream)
     */

    /* Initiate k and iv for ZUC. */
    bearer &= 0x1F; direction &= 1;
    uint8 _k[16], _iv[16], _count[4];
    memcpy(_k, ck, sizeof _k);
    for (int i = 0; i < 4; ++i) {
        _count[i] = EXTRACT_8_32(count, i);
    }
    _iv[0] = _count[0]; _iv[1] = _count[1]; _iv[2] = _count[2]; _iv[3] = _count[3]; 
    _iv[4] = (uint8)((bearer << 1 | direction) << 2); _iv[5] = _iv[6] = _iv[7] = 0;
    for (int i = 8; i < 16; ++i) {
        _iv[i] = _iv[i ^ 8];
    }
    size_t L = (length >> 5) + ((length & 0x1F) ? 1 : 0);
    uint32 Z[L];
    zuc_final(_k, _iv, Z, L);
    for (size_t i = 0; i < L; ++i) {
        obs[i] = ibs[i] ^ Z[i];
    }
    if (length & 0x1F) {
        obs[L - 1] &= PREFIX_MASK_32[length & 0x1F];
    }
    #ifdef SECGEAR_ZUC_DEBUG_2
    printf("Output: \n");
    for (size_t i = 0; i < L; ++i) {
        printf("%08x%c", obs[i], " \n"[i % 10 == 9]);
    }
    putchar('\n');
    #endif
    return 1;
}

uint32 zuc_integrity(uint32 count, uint8 bearer, uint8 direction, uint8 ik[], 
                     uint32 length, uint32 M[]) {
    /*
     * @param COUNT     (length =  32b, counter)
     * @param BEARER    (length =   5b, bearer identifier)
     * @param DIRECTION (length =   1b, direction identifier)
     * @param IK        (length = 128b = 8b * 16, integrity key)
     * @param LENGTH    (length =  32b, bit length of input bit stream)
     * @param M         (length =  LENGTH b = 32b * L, input massage stream)
     * @return MAC      (length =  32b, massage verification code)
     */

    /* Initiate k and iv for ZUC. */
    bearer &= 0x1F; direction &= 1;
    uint8 _k[16], _iv[16], _count[4];
    memcpy(_k, ik, sizeof _k);
    for (int i = 0; i < 4; ++i) {
        _count[i] = EXTRACT_8_32(count, i);
    }
    _iv[0] = _count[0]; _iv[1] = _count[1]; _iv[2] = _count[2]; _iv[3] = _count[3]; 
    _iv[4] = (uint8)(bearer << 3); _iv[5] = _iv[6] = _iv[7] = 0;
    _iv[8] = _iv[0] ^ (uint8)(direction << 7); 
    _iv[9] = _iv[1]; _iv[10] = _iv[2]; _iv[11] = _iv[3];
    _iv[12] = _iv[4]; _iv[13] = _iv[5];
    _iv[14] = _iv[6] ^ (uint8)(direction << 7); 
    _iv[15] = _iv[7];
    size_t L = (length >> 5) + ((length & 0x1F) ? 1 : 0) + 2;
    uint32 Z[L];
    uint32 T = 0;
    zuc_final(_k, _iv, Z, L);
    for (size_t i = 0; i < length; ++i) {
        if (GET_BIT_VALUE_32(M[i >> 5], i & 0x1F)) {
            T = T ^ ZUC_INTEGRITY_CONCAT(Z[i >> 5], Z[(i >> 5) + 1], i & 0x1F);
        }
    }
    T = T ^ ZUC_INTEGRITY_CONCAT(Z[length >> 5], Z[(length >> 5) + 1], length & 0x1F);
    T = T ^ Z[L - 1];
    #ifdef SECGEAR_ZUC_DEBUG_3
    printf("Output: \n");
    printf("%08x\n", T);
    #endif
    return T;
}

/* ZUC_MAIN END */

#endif