#include "Enclave1_t.h"
#define SM2_EXCHANGE_OPTIONAL
#include "sm2.h"
#include "sm2_tests.h"

/*
 * Ref: 
 * GB/T 32918.5-2017
 */

const int SM2_p_bytes = 256 >> 3;
uint8 *sign_ID_A;
uint8 *sign_M;
uint8 sign_dA[SM2_p_bytes];
uint8 sign_k[SM2_p_bytes];

void setSignIDA(uint8 *src, size_t len) {
	if (len < MAX_LEN) {
		memcpy(sign_ID_A, src, len + 1);
	}
}

void setSignM(uint8 *src, size_t len) {
	if (len < MAX_LEN) {
		memcpy(sign_M, src, len + 1);
	}
}

void setSignDA(uint8 *src) {
	memcpy(sign_dA, src, SM2_p_bytes);
}

void setSignK(uint8 *src) {
	memcpy(sign_k, src, SM2_p_bytes);
}

void getSignResult(uint8 *buf, size_t len) {
	if (len > strlen(sign_buffer)) {
		memcpy(buf, sign_buffer, strlen(sign_buffer) + 1);
	}
}

void getSignVerifyResult(uint8 buf) {
	memcpy(buf, &sign_verify_ret, 1);
}

void callsm2signtest() {
	sm2signtest(SM2_p_bytes, sign_M, sign_ID_A, SM2_P, SM2_A, SM2_B, SM2_N, SM2_XG, SM2_YG, sign_dA, sign_k);
}

uint8 *exchange_ID_A;
uint8 *exchange_ID_B;
uint8 exchange_dA[SM2_p_bytes];
uint8 exchange_dB[SM2_p_bytes];
uint64 exchange_klen = 128;

void setExchangeIDA(uint8 *src, size_t len) {
	if (len < MAX_LEN) {
		memcpy(exchange_ID_A, src, len + 1);
	}
}

void setExchangeIDB(uint8 *src, size_t len) {
	if (len < MAX_LEN) {
		memcpy(exchange_ID_B, src, len + 1);
	}
}

void setExchangeDA(uint8 *src) {
	memcpy(exchange_dA, src, SM2_p_bytes);
}

void setExchangeDB(uint8 *src) {
	memcpy(exchange_dB, src, SM2_p_bytes);
}

void setExchangeKLen(uint64 *src) {
	memcpy(exchange_klen, src, sizeof(uint64));
}

void getExchangeResult(uint8 buf) {
	memcpy(buf, &exchange_ret, 1);
}

void callsm2exchangetest() {
	sm2exchangetest(SM2_p_bytes, exchange_ID_A, exchange_ID_B, SM2_P, SM2_A, SM2_B, SM2_N, SM2_XG, SM2_YG, exchange_dA, exchange_dB, exchange_klen);
}

uint8 *crypt_M;
uint8 crypt_dB[SM2_p_bytes];

void setCryptM(uint8 *src, size_t len) {
	if (len < MAX_LEN) {
		memcpy(crypt_M, src, len + 1);
	}
}

void setCryptDB(uint8 *src) {
	memcpy(crypt_dB, src, SM2_p_bytes);
}

void getCryptPW(uint8 *buf, size_t len) {
	if (len > strlen(encrypt_pw)) {
		memcpy(buf, encrypt_pw, strlen(encrypt_pw) + 1);
	}
}

void getCryptMSG(uint8 *buf, size_t len) {
	if (len > strlen(decrypt_msg)) {
		memcpy(buf, decrypt_msg, strlen(decrypt_msg) + 1);
	}
}

void callsm2crypttest() {
	sm2crypttest(SM2_p_bytes, crypt_M, SM2_P, SM2_A, SM2_B, SM2_N, SM2_XG, SM2_YG, crypt_dB);
}
