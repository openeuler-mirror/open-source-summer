#include"enclave.h"
#include"Enclave1_u.h"
#include<stdio.h>
#include<string.h>

#define MAX_LEN 1024

using namespace std;

int main(int argc, char* argv[]) {
	cc_enclave_t *eid;
	cc_enclave_result_t ret;
	char *path = transferFromString(PATH);
	
	ret = cc_enclave_create(path, AUTO_ENCLAVE_TYPE, 0, SECGEAR_DEBUG_FLAG, NULL, 0, &eid);
	if (ret != CC_SUCCESS) {
		printf("ERR: %#x ,failed to create enclave.\n", ret);
		return -1;
	}
	
	

	if (CC_SUCCESS != cc_enclave_destroy(eid)) {
		return -1;
	}
	return 0;
}
