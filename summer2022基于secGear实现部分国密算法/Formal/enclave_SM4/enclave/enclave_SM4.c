#include "Enclave1_t.h"
#include <stdio.h>
#include "sm4.h"

uint32 message[4];
uint32 key[4];
uint32 res_enc[4], res_dec[4];

void sm4test(const uint32 *M, const uint32 *MK, const int rounds) {
    SM4_CTX c;
    sm4_init(&c, M, MK);
    for (int i=0; i<rounds; i++){
        sm4_encrypt(&c);
    }
    sm4_final(res_enc, &c);
	
    sm4_init(&c, res_enc, MK);
    for (int i=0; i<rounds; i++){
        sm4_decrypt(&c);
    }
    sm4_final(res_dec, &c);
}

void callsm4test1() {
    sm4test(message, key, 1);
}

void callsm4test2() {
    sm4test(message, key, 1000000);
}

void setSM4Message(uint32 *src) {
	memcpy(message, src, sizeof(message));
}

void setSM4Key(uint32 *src) {
	memcpy(key, src, sizeof(key));
}

void getSM4Result(uint32 *buf) {
	memcpy(buf, res_enc, sizeof(res_enc));
}