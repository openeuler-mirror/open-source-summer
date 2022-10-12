#include"enclave.h"
#include"Enclave1_u.h"
#include<stdio.h>
#include<string.h>

const u_int32_t message[4] = {
    0x01234567, 0x89ABCDEF, 
    0xFEDCBA98, 0x76543210, 
};
const u_int32_t key[4] = {
    0x01234567, 0x89ABCDEF, 
    0xFEDCBA98, 0x76543210, 
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
	
	u_int32_t res[4];
	setSM4Message(eid, message);
	setSM4Key(eid, key);
	callsm4test1(eid);
	getSM4Result(eid, res);
	printf("encrypt 1: ");
    for (int i=0; i<4; i++){
        printf("%08X", res[i]);
    }
    printf("\n");

	setSM4Message(eid, message);
	setSM4Key(eid, key);
	callsm4test2(eid);
	getSM4Result(eid, res);
	printf("encrypt 100000: ");
    for (int i=0; i<4; i++){
        printf("%08X", res[i]);
    }
    printf("\n");

	if (CC_SUCCESS != cc_enclave_destroy(eid)) {
		return -1;
	}
	return 0;
}
