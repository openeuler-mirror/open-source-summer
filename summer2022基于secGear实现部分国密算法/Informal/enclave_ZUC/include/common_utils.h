#ifndef SECGEAR_SM_COMMON_UTILS
#define SECGEAR_SM_COMMON_UTILS

#include <ctype.h>
#define debugPrint (printf("%s: %s: %d\n",__FILE__,__FUNCTION__,__LINE__),fflush(stdout),1)

typedef __uint8_t uint8;
typedef __uint16_t uint16;
typedef __uint32_t uint32;
typedef __uint64_t uint64;

#define CONCAT_8x4(x0, x1, x2, x3) ((((uint32)(x0) << 8 | (x1)) << 8 | (x2)) << 8 | (x3)) // X = (x0 || x1 || x2 || x3)
#define CONCAT_16x2(x0, x1) ((uint32)(x0) << 16 | (x1)) // X = (x0 || x1)
#define EXTRACT_8_32(X, i) (((X) >> (((i) ^ 3) << 3)) & 0xFF) // X = (x0 || x1 || x2 || x3)
#define EXTRACT_16_32(X, i) (((X) >> (((i) ^ 1) << 4)) & 0xFFFF) // X = (x0 || x1)
#define EXTRACT_16H_31(X) (((X) >> 15) & 0xFFFF) // Higher 16-bit from 31-bit
#define EXTRACT_16L_31(X) ((X) & 0xFFFF) // Lower 16-bit from 31-bit

#define ROTATE(a, n) (((a) << (n)) | (((a) & 0xFFFFFFFF) >> ((32 - (n)) & 31)))
#define ROTATE_31(a, n) ((((a) << (n)) & 0x7FFFFFFF) | (((a) & 0x7FFFFFFF) >> (31 - (n))))

#define GET_BIT_VALUE_32(x, i) (((x) >> (31 - (i))) & 1)

const uint32 PREFIX_MASK_32[32] = {
    0x00000000,
    0x80000000, 
    0xC0000000, 
    0xE0000000, 
    0xF0000000, 
    0xF8000000, 
    0xFC000000, 
    0xFE000000, 
    0xFF000000, 
    0xFF800000, 
    0xFFC00000, 
    0xFFE00000, 
    0xFFF00000, 
    0xFFF80000, 
    0xFFFC0000, 
    0xFFFE0000, 
    0xFFFF0000, 
    0xFFFF8000, 
    0xFFFFC000, 
    0xFFFFE000, 
    0xFFFFF000, 
    0xFFFFF800, 
    0xFFFFFC00, 
    0xFFFFFE00, 
    0xFFFFFF00, 
    0xFFFFFF80, 
    0xFFFFFFC0, 
    0xFFFFFFE0, 
    0xFFFFFFF0, 
    0xFFFFFFF8, 
    0xFFFFFFFC, 
    0xFFFFFFFE
};

# define HOST_c2l(c,l)  (l =(((unsigned long)(*((c)++)))<<24),          \
                         l|=(((unsigned long)(*((c)++)))<<16),          \
                         l|=(((unsigned long)(*((c)++)))<< 8),          \
                         l|=(((unsigned long)(*((c)++)))    )           )
# define HOST_l2c(l,c)  (*((c)++)=(unsigned char)(((l)>>24)&0xff),      \
                         *((c)++)=(unsigned char)(((l)>>16)&0xff),      \
                         *((c)++)=(unsigned char)(((l)>> 8)&0xff),      \
                         *((c)++)=(unsigned char)(((l)    )&0xff),      \
                         l)

#endif