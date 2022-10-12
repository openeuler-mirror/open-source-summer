#include"enclave.h"
#include"Enclave1_u.h"
#include<stdio.h>
#include<string.h>

#define MAX_LEN 1024

#define SM3_DIGEST_LENGTH 32
const int SM2_p_bytes = 256 >> 3;
const uint8 sign_ID_A[] = "1234567812345678";
const uint8 sign_M[] = "message digest";
const uint8 sign_dA[] = {
    0x39, 0x45, 0x20, 0x8F, 
    0x7B, 0x21, 0x44, 0xB1, 
    0x3F, 0x36, 0xE3, 0x8A, 
    0xC6, 0xD3, 0x9F, 0x95, 
    0x88, 0x93, 0x93, 0x69, 
    0x28, 0x60, 0xB5, 0x1A, 
    0x42, 0xFB, 0x81, 0xEF, 
    0x4D, 0xF7, 0xC5, 0xB8, 
};
const uint8 sign_k[] = {
    0x59, 0x27, 0x6E, 0x27, 
    0xD5, 0x06, 0x86, 0x1A, 
    0x16, 0x68, 0x0F, 0x3A, 
    0xD9, 0xC0, 0x2D, 0xCC, 
    0xEF, 0x3C, 0xC1, 0xFA, 
    0x3C, 0xDB, 0xE4, 0xCE, 
    0x6D, 0x54, 0xB8, 0x0D, 
    0xEA, 0xC1, 0xBC, 0x21, 
};

const uint8 exchange_ID_A[] = "1234567812345678";
const uint8 exchange_ID_B[] = "1234567812345678";
const uint8 exchange_dA[] = {
    0x81, 0xEB, 0x26, 0xE9, 
    0x41, 0xBB, 0x5A, 0xF1, 
    0x6D, 0xF1, 0x16, 0x49, 
    0x5F, 0x90, 0x69, 0x52, 
    0x72, 0xAE, 0x2C, 0xD6, 
    0x3D, 0x6C, 0x4A, 0xE1, 
    0x67, 0x84, 0x18, 0xBE, 
    0x48, 0x23, 0x00, 0x29, 
};
const uint8 exchange_dB[] = {
    0x78, 0x51, 0x29, 0x91, 
    0x7D, 0x45, 0xA9, 0xEA, 
    0x54, 0x37, 0xA5, 0x93, 
    0x56, 0xB8, 0x23, 0x38, 
    0xEA, 0xAD, 0xDA, 0x6C, 
    0xEB, 0x19, 0x90, 0x88, 
    0xF1, 0x4A, 0xE1, 0x0D, 
    0xEF, 0xA2, 0x29, 0xB5, 
};
const uint64 exchange_klen = 128;

const uint8 crypt_M[] = "encryption standard";
const uint8 crypt_dB[] = {
    0x39, 0x45, 0x20, 0x8F, 
    0x7B, 0x21, 0x44, 0xB1, 
    0x3F, 0x36, 0xE3, 0x8A, 
    0xC6, 0xD3, 0x9F, 0x95, 
    0x88, 0x93, 0x93, 0x69, 
    0x28, 0x60, 0xB5, 0x1A, 
    0x42, 0xFB, 0x81, 0xEF, 
    0x4D, 0xF7, 0xC5, 0xB8, 
};

int main(int argc, char* argv[]) {
	cc_enclave_t *eid;
	cc_enclave_result_t ret;
	char *path = transferFromString(PATH);
	
	ret = cc_enclave_create(path, AUTO_ENCLAVE_TYPE, 0, SECGEAR_DEBUG_FLAG, NULL, 0, &eid);
	if (ret != CC_SUCCESS) {
		printf("ERR: %#x ,failed to create enclave.\n", ret);
		return -1;
	}

	u_int8_t buffer[MAX_LEN], tmpu8;
	memset(buffer, 0, sizeof buffer);
	printf("A.2 start: \n");
	setSignIDA(eid, sign_ID_A, strlen(sign_ID_A));
	setSignM(eid, sign_M, strlen(sign_M));
	setSignDA(eid, sign_dA);
	setSignK(eid, sign_k);
    callsm2signtest(eid);
	getSignResult(eid, buffer, MAX_LEN);
	printf("sign sig: %s\n", buffer);
	getSignVerifyResult(eid, tmpu8);
	printf("sign verify: %x\n", tmpu8);
    printf("A.2 end: \n\n\n");
    /* PASSED */

    printf("B.2 start: \n");
	setExchangeIDA(eid, exchange_ID_A, strlen(exchange_ID_A));
	setExchangeIDB(eid, exchange_ID_B, strlen(exchange_ID_B));
	setExchangeDA(eid, exchange_dA);
	setExchangeDB(eid, exchange_dB);
	setExchangeKLen(eid, exchange_klen);	
    callsm2exchangetest(eid);
	getExchangeResult(eid, tmpu8);
	printf("exchange: %x\n", tmpu8);
    printf("B.2 end: \n\n\n");
    /* PASSED */

    printf("C.2 start: \n");
	setCryptM(eid, crypt_M, strlen(crypt_M));
	setCryptDB(eid, crypt_dB);
    callsm2crypttest(eid);
	int pwlen = (SM2_p_bytes << 1 | 1) + strlen(crypt_M) + SM3_DIGEST_LENGTH;
	getCryptPW(eid, buffer, pwlen);
    printf("encrypt pw: ");
    for (int i=0; i<pwlen; ++i) {
        printf("%02X", pw[i]);
    }
    printf("\n");
	getSignResult(eid, buffer, MAX_LEN);
	printf("decrypt message: %s\n", buffer);
    printf("C.2 end: \n\n\n");
    /* PASSED */

	if (CC_SUCCESS != cc_enclave_destroy(eid)) {
		return -1;
	}
	return 0;
}
