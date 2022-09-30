#include <stdio.h>
#include "sm4.h"

const uint32 message[] = {
    0x01234567, 0x89ABCDEF, 
    0xFEDCBA98, 0x76543210, 
};
const uint32 key[] = {
    0x01234567, 0x89ABCDEF, 
    0xFEDCBA98, 0x76543210, 
};
uint32 res[4];

void sm4test(const uint32 *M, const uint32 *MK, const int rounds) {
    printf("---------SM4 encrypt test (%d)--------------\n", rounds);
    SM4_CTX c;
    sm4_init(&c, M, MK);
    for (int i=0; i<rounds; i++){
        sm4_encrypt(&c);
    }
    sm4_final(res, &c);
    for (int i=0; i<4; i++){
        printf("%08X", res[i]);
    }
    printf("\n");
    printf("---------SM4 decrypt test (%d)--------------\n", rounds);
    sm4_init(&c, res, MK);
    for (int i=0; i<rounds; i++){
        sm4_decrypt(&c);
    }
    sm4_final(res, &c);
    for (int i=0; i<4; i++){
        printf("%08X", res[i]);
    }
    printf("\n");
}

int main() {
    sm4test(message, key, 1);
    sm4test(message, key, 1000000);
    return 0;
}