---
title: "[Open Source Promotion Plan] Learning about the QEMU Fuzzer"
date: 2021-08-15
tags: 
    - Qemu 
    - Virtio
    - summer2021
archives: 2021-08
author: cascades
summary: QEMU Fuzzer is a framework that uses libqtest and libFuzzer to perform fuzz testing on the process of reading and writing devices by the guest OS. QEMU Fuzzer is included in QEMU 5.0 and later versions.
---

# Learning about the QEMU Fuzzer

This article was first published in the openEuler community [Open Source Promotion Plan](https://summer.iscas.ac.cn/).
Project Name: [No. 112 Improving QEMU Fuzzing](https://gitee.com/openeuler-competition/summer2021-112)

## About This Document
Common QEMU + Fuzzing implementations include the qemu-afl mode and various tools that use virtualization technologies to fuzz IoT devices.

This article describes the fuzzing framework for QEMU that performs fuzzing on Hypervisor. It adopts the Qtest framework to emulate the guest OS's read and write operations on devices and uses the heuristic algorithms of libFuzzer to collect massive amounts of data. This framework originates from the [`Google Summer of Code 2019`](https://summerofcode.withgoogle.com/archive/2019/projects/6200259867312128/) project and is added to the master branch in QEMU 5.0.0 and later versions.

## QEMU Emulation Principles

[`QEMU`](https://www.qemu.org/) is an open-source virtualization and emulation tool implemented by [`Fabrice Bellard`](https://bellard.org/). It supports two emulation modes:

* `Full-system`: provides KVM and Hyper-V acceleration modes for CPU, memory, and peripheral emulation.
* `User-mode`: runs binary programs of another CPU architecture through instruction translation.

Virtualization is to use a user-mode program to process the access of a device emulator to the memory and other special hardware when only the user-mode memory is used. To emulate devices with different architectures and instruction sets, QEMU adopts object-oriented programming and implements the `QEMU Object Model` to describe device models.

* Device model: Each emulated device corresponds to a TypeInfo object, which is uniquely identified by a device name and stored in the hash table.
* Device startup: Device registration, device model initialization, and device instantiation are required before starting a device.
* Instruction translation: QEMU uses the software Tiny Code Generator (TCG) or kernel-based virtual machines (KVM) to receive instructions from the device emulator and translates the instructions to physical devices. Despite the performance overheads, the hardware virtualization overheads are relatively lower than those software virtualization overheads.
* Memory emulation: QEMU provides memory mappings for the client. When the client accesses the memory to write data to a drive, QEMU captures the access and sends the request to the IDE controller device model of QEMU. The model parses the I/O request and emulates an instruction via the system call of the host. Then, the memory of the client is copied to the drive of the host.

In short, the guest OS considers that it can directly communicate with hardware devices on the host OS. Actually, QEMU acts as an intermediary as follows:

```asciidoc=
+----------+ +----------+ +----------+ +----------+ +----------+
| UserSpace| | UserSpace| | UserSpace| | UserSpace| | UserSpace|
+----------+ +----------+ +----------+ +----------+ +----------+
|  Linux   | | Mac OS   | | Windows  | | Linux    | | Solaris  |
+----------+ +----------+ +----------+ +----------+ +----------+
|  Drivers | | Drivers  | | Drivers  | | Drivers  | | Drivers  |
+----------+ +----------+ +----------+ +----------+ +----------+
+----------+ +----------+ +----------+ +----------+ +----------+
| QEMU x86 | | QEMU x86 | | QEMU ARM | | QEMU PPC | | QEMU MIPS|
+----------+ +----------+ +----------+ +----------+ +----------+
+----------+-+----------+-+----------+-+----------+-+----------+
|               Host System:Linux,Mac OS,Windows               |
+--------------------------------------------------------------+
+--------------------------------------------------------------+
|         Hardware:CPU,memory,disk,networking,USB,etc          |
+--------------------------------------------------------------+
```
  
For details about QEMU emulation, see [`User Documentation`](LLVMFuzzerTestOneInput).  
For details about QEMU devices, see [`Understanding QEMU devices`](https://www.qemu.org/2018/02/09/understanding-qemu-devices/).  
For details about QEMU, see [`QEMU, a Fast and Portable Dynamic Translator`](https://www.usenix.org/legacy/event/usenix05/tech/freenix/full_papers/bellard/bellard.pdf#:~:text=We%20present%20the%20internals%20of%20QEMU%2C%20a%20fast,one%20target%20CPU%20can%20be%20runon%20another%20CPU.).  

## Using the QEMU Fuzzer

See the [official documentation](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html).

### Test Environment

For this experiment, we use the Docker environment on the local Windows Subsystem for Linux (WSL).  

```bash=
root@31b23c4c00b7:~/qemu# lscpu
Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Byte Order:                      Little Endian
CPU(s):                          16
root@31b23c4c00b7:~/qemu# cat /etc/os-release
NAME="Ubuntu"
VERSION="20.04.2 LTS (Focal Fossa)"
```

#### Problem with the Environment

* Description: The QEMU Fuzzer has not adapted to the AArch64 architecture. Although the compilation is successful, an error is reported during the running.  

![](https://img-blog.csdnimg.cn/img_convert/2161923b370fbd9f89318104b70fad11.png)  

* Solution: Adapting QEMU Fuzzer to AArch64 is the goal of this project. Currently, the x86 environment is used.

#### Wrong Version

* Description: The example on the official website uses Clang 8. However, the latest Clang version is Clang 14. If a version later than Clang 8 is used, an error is reported in the compile phase because **-Werror** is enabled.

* Solution  
    * (Recommended) Use the package manager (apt/dnf) to install Clang.
    * Run the **git checkout** command to match LLVM 8 to 10.
    * Go to the [official release page](https://releases.llvm.org/) and download the LLVM source code whose version is between 8 and 10.

```bash=
# Run the sudo apt/dnf search xxx command to view the software contained in the package manager and the corresponding version. The default version is Clang 10.
sudo apt/dnf install clang llvm compiler-rt
```

#### Packaging Docker

To facilitate deployment, Docker is used to configure the experiment environment: [image path](https://hub.docker.com/repository/docker/cascadessjtu/qemu_fuzz)  

### Using the Fuzzer in Simple Mode

After configuring the environment, run the following commands to compile and run the fuzzing program. The libFuzzer output is displayed.  

```bash=
CC=clang-10 CXX=clang++-10 ./configure --enable-sanitizers --enable-fuzzing
# qemu-fuzz-isa     isa indicates the architecture of the device emulator.
make qemu-fuzz-i386 qemu-fuzz-aarch64
# View available fuzzing objects.
build/qemu-fuzz-i386 --fuzz-target=FUZZ_NAME
```

The QEMU Fuzzer also supports libFuzzer compilation instructions, which can be viewed by running the `-help=1` command.  

To view fuzzing results, run [`Clang Sanitizer`](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html#generating-coverage-reports), a tool that uses the CORPUS parameter and modifies compilation instructions. After fuzzing is complete, run the `llvm-cov` command to convert the generated `default.profraw` file into an `.html` file.
  
### Adding a User-Defined Fuzzer

To add a new fuzzer, perform the following:  
1. Compile the fuzzer source file `foo-device-fuzz.c` and save it in the `tests/qtest/fuzz` directory.  
2. Refer to the existing fuzzer and use APIs in libqos and libqtest to communicate with the device emulator.  
3. Register the fuzzer in the `tests/qtest/fuzz/meson.build` file.  

### Using the Fuzzer in Generic Mode

Writing fuzzers for specific device models is time-consuming and laborious, especially for device drivers that are not included in libqos. QEMU provides the `generic-fuzz` option to perform preliminary fuzzing on all devices, including PIO, MMIO, and DMA. To enable generic-fuzz, set the following environment variables:  
* `QEMU_FUZZ_ARGS=`: parameters required for configuring a device, such as the NIC and user name.
* `QEMU_FUZZ_OBJECTS`=: matching character strings to specify the memory area for fuzzing. Use `./qemu-fuzz-i386 --fuzz-target=generic-fuzz -runs=0` to check the matched memory area. More matched memory areas create a  larger `input-space` for fuzzing. This makes it more difficult to identify the input that causes the device crash. Therefore, `MemoryRegion` must be set to a proper value.

### Integrating OSS-Fuzz
OSS-Fuzz is an integrated fuzzing tool that fuzzes all objects by default. The official [`Dockerfile`](https://github.com/google/oss-fuzz/blob/master/projects/qemu/Dockerfile) for environment setup is provided, and the startup of the generic fuzzer requires additional settings of environment variables. Therefore, QEMU defines some device models in the `tests/qtest/fuzz/generic_fuzz_configs.h` file for OSS-Fuzz. In addition, developers can add new device models to the file.  

### Crash Reproduction Tool

When you reproduce a crash, the QEMU that does not contain a fuzzer is required to filter out false alarms and enhance the debugging function. You can use the OSS-Fuzz script to create a `one-line reproducer`.  

### Fuzzer Lifespan

The QEMU Fuzzer provides two entry points for libFuzzer, which are called after the main function of libFuzzer is called.  
* `LLVMFuzzerInitialize`: called before fuzzing starts to initialize the environment.  
* `LLVMFuzzerTestOneInput`: called when each fuzzing task is running to provide input and reset the status after fuzzing is complete.  

The Fuzzer process is reset after each fuzzing operation. In addition, the QEMU status needs to be reset. The following are two methods to reset the QEMU status.  
* `Reboot`: Restart the guest OS after each fuzzing operation is complete.  
* `Fork`: Run **test case** in subprocesses, which is similar to the `fork-server` mode of AFL.  

## Dependencies of the QEMU Fuzzer

The implementation of the QEMU Fuzzer depends on the libqtest and libqos libraries. For details, see [`Testing QEMU emulated devices using qtest`](https://www.linux-kvm.org/images/4/43/03x09-TestingQEMU.pdf). This document describes the basic principles of Qtest, APIs, and methods of adding test cases.

### libqtest

* [Code path](https://github.com/qemu/qemu/tree/master/tests/qtest/libqtest.c)
* [Documentation](https://qemu.readthedocs.io/en/latest/devel/qtest.html)

Qtest is a framework used to perform unit tests on hardware devices emulated by QEMU. It consists of the `Qtest Client` and `Qtest Server`. The two communicate with each other through UNIX Socket and support instructions such as PIO, MMIO, interrupt, and QMP.  

* `Qtest Client`: A driver program compiled for a device. It is encapsulated from bottom to top and depends on the glib unit test framework, libqtest, libqos, and qgraph. To add a new test program, perform the following:  
    
    1. Compile new test code `tests/qtest/foo-test.c` in the Qtest directory.  
    2. Add compilation instructions to **Makefile.include**.  
    3. Perform compilation: `make tests/qtest/foo-test.c`  
    4. Run the test program.  
    ```bash=
    QTEST_LOG=1 QTEST_QEMU_BINARY=i386-softmmu/qemu-system-i386 tests/qtest/foo-test`
    ```
* `Qtest Server`: Similar to the TCG and KVM, the `Qtest Server` is an accelerator and is registered by running `-machine accel=qtest`. In common scenarios, the vCPU directly interacts with virtual hardware. In test scenarios, the Qtest directly interacts with virtual hardware and acts as an intermediary between the Qtest client and virtual hardware. Qtest is used to check whether the device behavior is correct, and the guest OS is not started.  

During running, `libqtest.c` starts QEMU as a subprocess. The main function for starting QEMU is in `vl.c`. In the test scenario, the `qtest_init()` function of `qtest.c` is called to initialize the Qtest server.  

The following shows the relationship between the Qtest client and Qtest server.  
```asciidoc=
+----------------+  socket  +----------------+----------------------+
|  Qtest Client  +---------->  Qtest Server  |                      |
+----------------+          +-------+--------+                      |
+----------------+                  |        |         Qemu         |
|  Qgraph        |               PIO|MMIO    |                      |
+----------------+                  |        |                      |
+----------------+          +-------v--------+----------------------+
|  libqos        |          |          Hardware Emulation           |
+----------------+          +---------------------------------------+
+----------------+
|  libqtest      |
+----------------+
+----------------+
|  glib test     |
+----------------+
```

### libqos

* [Code path](https://github.com/qemu/qemu/tree/master/tests/qtest/libqos/libqos.c)
* [Documentation](https://qemu.readthedocs.io/en/latest/devel/qtest.html?highlight=libqos)

libqos is a device driver framework used to compile qtest cases and provides APIs related to `memory`, `PCI`, and `virtio`. It provides the following functions:  
* Acts as the wrapper of the bus and implements specific functions for each type of bus.  
* Unifies the device access model and simplifies developers' work.  

## QEMU Fuzzer Process

* [Code path](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz)
* [Documentation](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html)

The preceding two dependencies are designed for QEMU function tests and depend on the test input. Fuzzing improves the test input quality by adding randomness and mutation algorithms to the input. In this way, libFuzzer can be used to hook the Qtest input to improve the test efficiency. The following shows the overall structure of the QEMU Fuzzer.  

![](https://img-blog.csdnimg.cn/img_convert/f269d3ace4fe504117d7fe4e2a253375.png)  

In the source code:  
* `fuzz.h` defines the interface and data structure for implementing a fuzzing target and the interaction with libFuzzer.
* `fork_fuzz.h` defines the shared memory between concurrent fuzzers.
* `qos_fuzz.h` defines the encapsulated interfaces of libqos on Qtest.
* `generic_fuzz_configs.h` defines generic fuzzer settings.
* `virtio_xxx_fuzz.h` implements the fuzzing target of virtio devices (net, blk, and scsi).

## QEMU Fuzzer Case Analysis

The QEMU [`developer documentation`](https://wiki.qemu.org/Documentation/GettingStartedDevelopers) writes:

QEMU does not have a high level design description document - only the source code tells the full story.  

Therefore, it is essential for QEMU developers to learn about the source code. This section uses the virtio-net device as an example to analyze the QEMU fuzzing process. The code path is [`tests/qtest/fuzz/virto_net_fuzz.c`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/virtio_net_fuzz.c). Virtio is a paravirtualization technology. It requires the host OS to emulate devices and the guest OS to drive devices. The following shows the working process.  

![](https://img-blog.csdnimg.cn/img_convert/8cbe7f371f062202bb88928900b3a481.png)  

The following describes the top-down implementation logic.  
* First, implement the registration function `register_virtio_net_fuzz_targets()`. The `fuzz_add_qos_target()` function is provided by libqos to add three fuzzing objects and is the wrapper of `fuzz_add_target()` function by libqos. The prototype is as follows:

```cpp=
void fuzz_add_qos_target(
        FuzzTarget *fuzz_opts,
        const char *interface,
        QOSGraphTestOptions *opts
        );
```

* Finally, modify the [`meson.build`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/fuzz.c) file and add conditional compilation options.  

The following uses `virtio-net-socket` as the major fuzzing target to analyze the parameters and the functions involved in the parameters.  

* `virtio-net-socket`:
```cpp=
fuzz_add_qos_target(&(FuzzTarget){
        .name = "virtio-net-socket",
        .description = "Fuzz the virtio-net virtual queues. Fuzz incoming "
        "traffic using the socket backend",
        .pre_fuzz = &virtio_net_pre_fuzz,
        .fuzz = virtio_net_fork_fuzz,},
        "virtio-net",
        &(QOSGraphTestOptions){.before = virtio_net_test_setup_socket}
        );
```

The first parameter is the pointer that points to the temporary object of FuzzTarget. This object is defined by [`fuzz.h`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/fuzz.c) and contains identification information and many callback functions related to fuzzing. It is described as follows:  
```asciidoc=
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| Field       | Declaration                                               | Description                                                             |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| name        | const char *name                                          | target identifier (passed to --fuzz-target=)                            |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| description | const char *description                                   | help text                                                               |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| pre_fuzz    | void(*pre_fuzz)(QTestState *)                             | will run once, after QEMU has been initialized, prior to the fuzz-loop. |
|             |                                                           | eg: detect the memory map                                               |
|             |                                                           | Can be NULL                                                             |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| fuzz        | void(*fuzz)(QTestState *, const unsigned char *, size_t); | accepts and executes an input from LibFuzzer.                           |
|             |                                                           | this is repeatedly executed during the fuzzing loop.                    |
|             |                                                           | It should handle setup, input execution and cleanup.                   |
|             |                                                           | Cannot be NULL                                                          |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
```

`virtio_net_pre_fuzz` initializes the shared memory used by **qos path** and **fork fuzz**. `virtio_net_fork_fuzz` forks the child process and calls the `virtio_net_fuzz_multi` function. This function uses the user-defined `vq_action` to manage random data, adds data packets to `virtioqueue` based on the arrival of data packets, and kicks out the data packets. The main loop is then run.  

The second parameter indicates the name of the used device. In this example, the value is **virtio-net**.  

The third parameter is the structure about the test options provided by [`qgraph.h`](https://github.com/qemu/qemu/tree/master/tests/qtest/libqos/qgraph.h). The `before` parameter accepts functions whose prototype is `QOSBeforeTest`. The `virtio_net_test_setup_socket` function specifies the backend of the QEMU network device as **socket**. It facilitates communication with the virtual device and sends the data packets of the virtual device to the host network.  

* `virtio-net-socket-check-use`

```cpp=
fuzz_add_qos_target(&(FuzzTarget){
        .name = "virtio-net-socket-check-used",
        .description = "Fuzz the virtio-net virtual queues. Wait for the "
        "descriptors to be used. Timeout may indicate improperly handled "
        "input",
        .pre_fuzz = &virtio_net_pre_fuzz,
        .fuzz = virtio_net_fork_fuzz_check_used,},
        "virtio-net",
        &(QOSGraphTestOptions){.before = virtio_net_test_setup_socket}
        );
```

`virtio_net_fork_fuzz_check_used` is similar to `virtio_net_fork_fuzz`. The difference is that `true` is used when the `virtio_net_fuzz_multi` function is called.  

* `cirtio-net-slirp`

```cpp=
fuzz_add_qos_target(&(FuzzTarget){
        .name = "virtio-net-slirp",
        .description = "Fuzz the virtio-net virtual queues with the slirp "
        " backend. Warning: May result in network traffic emitted from the "
        " process. Run in an isolated network environment.",
        .pre_fuzz = &virtio_net_pre_fuzz,
        .fuzz = virtio_net_fork_fuzz,},
        "virtio-net",
        &(QOSGraphTestOptions){.before = virtio_net_test_setup_user}
        );
```

`virtio_net_test_setup_user` specifies the network backend as **user**.

## QEMU Fuzzer Case CVE-2017-12809

This part briefly analyzes a [CVE vulnerability](https://unit42.paloaltonetworks.com/unit42-palo-alto-networks-discovers-new-qemu-vulnerability/) on QEMU discovered by libFuzzer.  
* Vulnerability description: This vulnerability is a denial of service vulnerability. When an IDE drive and CD/DVD-ROM emulator are used to build the guest OS, privileged users in the guest OS can clear an empty CD-ROM device driver, causing null pointer dereference. As a result, the QEMU process breaks down.  
* Vulnerability code: Before calling the `blk_aio_flush()` function in the `hw/ide/core.c` file, the system does not check whether `s->blk` is empty.
```asciidoc=
---
 hw/ide/core.c | 10 +++++++++-
 1 file changed, 9 insertions(+), 1 deletion(-)

diff --git a/hw/ide/core.c b/hw/ide/core.c
index 0b48b64d3a..bea39536b0 100644
--- a/hw/ide/core.c
+++ b/hw/ide/core.c
@@ -1063,7 +1063,15 @@ static void ide_flush_cache(IDEState *s)
     s->status |= BUSY_STAT;
     ide_set_retry(s);
     block_acct_start(blk_get_stats(s->blk), &s->acct, 0, BLOCK_ACCT_FLUSH);
-    s->pio_aiocb = blk_aio_flush(s->blk, ide_flush_cb, s);
+
+    if (blk_bs(s->blk)) {
+        s->pio_aiocb = blk_aio_flush(s->blk, ide_flush_cb, s);
+    } else {
+        /* XXX blk_aio_flush() crashes when blk_bs(blk) is NULL, remove this
+         * temporary workaround when blk_aio_*() functions handle NULL blk_bs.
+         */
+        ide_flush_cb(s, 0);
+    }
 }
 
 static void ide_cfata_metadata_inquiry(IDEState *s)
-- 
```
* [Vulnerability troubleshooting](https://lists.gnu.org/archive/html/qemu-devel/2017-08/msg01989.html): Add a condition judgment to where the vulnerability occurs and test code to `tests/ide-test.c`.  

```asciidoc=
---
 tests/ide-test.c | 19 +++++++++++++++++++
 1 file changed, 19 insertions(+)

diff --git a/tests/ide-test.c b/tests/ide-test.c
index bfd79ddbdc..aa9de065fc 100644
--- a/tests/ide-test.c
+++ b/tests/ide-test.c
@@ -689,6 +689,24 @@ static void test_flush_nodev(void)
     ide_test_quit();
 }
 
+static void test_flush_empty_drive(void)
+{
+    QPCIDevice *dev;
+    QPCIBar bmdma_bar, ide_bar;
+
+    ide_test_start("-device ide-cd,bus=ide.0");
+    dev = get_pci_device(&bmdma_bar, &ide_bar);
+
+    /* FLUSH CACHE command on device 0 */
+    qpci_io_writeb(dev, ide_bar, reg_device, 0);
+    qpci_io_writeb(dev, ide_bar, reg_command, CMD_FLUSH_CACHE);
+
+    /* Just testing that qemu doesn't crash... */
+
+    free_pci_device(dev);
+    ide_test_quit();
+}
+
 static void test_pci_retry_flush(void)
 {
     test_retry_flush("pc");
@@ -954,6 +972,7 @@ int main(int argc, char **argv)
 
     qtest_add_func("/ide/flush", test_flush);
     qtest_a
     cd qemu
     git checkout stable-2.10dd_func("/ide/flush/nodev", test_flush_nodev);
+    qtest_add_func("/ide/flush/empty_drive", test_flush_empty_drive);
     qtest_add_func("/ide/flush/retry_pci", test_pci_retry_flush);
     qtest_add_func("/ide/flush/retry_isa", test_isa_retry_flush);
 
-- 
```

* Vulnerability reproduction: Find the commit version before the patch is installed, add the test cases in the new test, and run the Qtest program.  
```bash=
# The corresponding version cannot be obtained by running the **wget** command because all affected versions have been fixed.
git clone https://gitlab.com/qemu-project/qemu.git;cd qemu
git checkout stable-2.10
# Obtain the author of the patch from the mailing list and find the corresponding commit.
git log --author=Hajnoczi
git reset --hard=4da97120d51a4383aa96d741a2b837f8c4bbcd0b
# Start building.
mkdir build;cd build;../configure ----disable-werror
make qtest
```

The QEMU VM escape vulnerability has been common in Capture the Flag (CTF) competitions and Common Vulnerabilities and Exposures (CVE), for example, [CVE-2020-14364](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-14364).  

If there is any error, please contact [cascades-sjtu](https://cascadeschen.cn).
