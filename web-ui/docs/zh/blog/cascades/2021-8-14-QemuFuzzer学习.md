---
title: 【开源软件供应链点亮计划】Qemu Fuzzer学习
date: 2021-08-15
tags: 
    - Qemu 
    - Virtio
    - summer2021
archives: 2021-08
author: cascades
summary: Qemu Fuzzer是一个借助libqtest和LibFuzzer，对GusetOS读写设备的过程进行模糊测试的框架，包含在Qemu 5.0以后的版本中。
---

# Qemu Fuzzer学习

> 本文章来自于[开源软件供应链点亮计划](https://summer.iscas.ac.cn/)的openEuler社区项目
> 项目名称：[No.112 qemu设备fuzz测试完善](https://gitee.com/openeuler-competition/summer2021-112)
 
## 前言
一提到 Qemu + Fuzz 的组合，我首先想起的是AFL的Qemu模式，或者是各种使用虚拟化技术对IoT设备进行Fuzzing的工具。

而本文学习的是Qemu自身的Fuzzing框架，即对Hypervisor的Fuzzing。它借助Qtest框架模拟Guest OS对设备的读写，并使用LibFuzzer的启发式算法提供数据驱动。该框架最早源于[`Google Summer of Code 2019`](https://summerofcode.withgoogle.com/archive/2019/projects/6200259867312128/)项目，在Qemu5.0.0版本后被加入到master分支中。

## Qemu 设备模拟原理

[`Qemu`](https://www.qemu.org/)是一款开源的虚拟化和仿真工具，由[`Fabrice Bellard`](https://bellard.org/)实现。Qemu支持两种模式的仿真：
* `system mode`：对于CPU，内存以及外设的全系统仿真，提供KVM，Hyper-V等加速方式
* `user mode`：通过指令翻译在一种架构的CPU上运行另一种CPU架构的二进制程序

首先需要理解虚拟化的本质在于：使用一个用户态的程序，在只使用用户态内存的情况下，来处理模拟设备对内存以及其他特殊硬件的访问。由于Qemu需要仿真不同架构，不同指令集的设备，所以其采用了OOP的编程思想，实现了`Qemu Object Model`来描述设备模型。

* 设备模型：每个模拟出来的设备都对应一个TypeInfo对象，由设备名唯一标识，并存储在hash table中
* 设备启动：启动设备需要经过设备注册，设备类型初始化，设备实例化等步骤，
* 指令翻译：真正运行时，Qemu通过TCG（软件）或者KVM（硬件）等方式，接受模拟设备的指令，并翻译到物理设备上执行。这样会带来性能开销，相比起来硬件虚拟化带来的开销更低
* 内存模拟：Qemu负责提供内存映射给客户机。当客户机访问这部分内存以便写磁盘时，Qemu会捕获访问，并且将请求传送给qemu的IDE控制器设备模型，模型会解析I/O请求并且通过宿主机的系统调用来模拟指令。最终将客户机的内存拷贝至宿主机的磁盘中。

总之，在Guest OS中，它认为自己可以直接和Host OS上的硬件设备打交道，Qemu充当了中间人的角色，可以用下图来概括：

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
 
> 关于Qemu设备模拟的方法，可以参考[`User Documentation`](LLVMFuzzerTestOneInput)
> 关于Qemu设备模拟的理解，可以参考[`understanding Qemu devices`](https://www.qemu.org/2018/02/09/understanding-qemu-devices/)
> Qemu作者的论文：[`QEMU, a Fast and Portable Dynamic Translator`](https://www.usenix.org/legacy/event/usenix05/tech/freenix/full_papers/bellard/bellard.pdf#:~:text=We%20present%20the%20internals%20of%20QEMU%2C%20a%20fast,one%20target%20CPU%20can%20be%20runon%20another%20CPU.)

## Qemu Fuzzer 的使用方法

[文档说明](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html)

### 实验环境

采用了本机的WSL上的Docker环境

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

#### 环境问题

* 描述：Qemu的Fuzzing还没有适配AArch64架构，虽然编译成功，但运行报错。

![](https://img-blog.csdnimg.cn/img_convert/2161923b370fbd9f89318104b70fad11.png)

* 解决方案：适配AArch64下的Qemu Fuzzing正是本项目要做的内容，但在学习阶段，还是采用x86环境来运行。

#### 版本问题

* 描述：官网给出的示例使用的是clang-8，而最新的clang版本已经来到了clang-14，如果采用较新的版本，则会在编译阶段报错（原因为开启了Werror）。

* 解决方案：
    * （推荐）直接采用包管理器（apt/dnf）安装clang
    * git checkout到LLVM8-10之间的版本
    * 到[官方Release页面](https://releases.llvm.org/)下载LLVM8-10之间版本的源代码

```bash=
# sudo apt/dnf search xxx 可以查看包管理器中包含的软件以及对应版本，默认为clang-10
sudo apt/dnf install clang llvm compiler-rt
```

#### Docker打包

为了方便部署，采用了docker的形式来配置实验环境：[镜像地址](https://hub.docker.com/repository/docker/cascadessjtu/qemu_fuzz)。

### 简单使用

配置好环境后，通过如下命令编译运行Fuzzing程序，即显示LibFuzzer的输出。

```bash=
CC=clang-10 CXX=clang++-10 ./configure --enable-sanitizers --enable-fuzzing
# qemu-fuzz-isa isa为模拟设备的架构
make qemu-fuzz-i386 qemu-fuzz-aarch64
# 查看可用的Fuzzing对象
build/qemu-fuzz-i386 --fuzz-target=FUZZ_NAME
```

除了上述命令外，Qemu Fuzzer还支持LibFuzzer的编译指令，可以通过`-help=1`来查看

对于Fuzzing的结果，可以考虑采用[`Clang Sanitizer`](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html#generating-coverage-reports)查看。该工具需要使用CORPUS参数，并对编译指令进行一定的修改。在Fuzzing结束后，通过`llvm-cov`命令将生成的`default.profraw`文件转化为`.html`的可视化文件。

### 添加自定义Fuzzer

添加一个新的Fuzzer需要以下三个步骤：
1. 编写Fuzzer源文件`foo-device-fuzz.c`，放在`tests/qtest/fuzz`目录下
2. 参考已有的Fuzzer，使用libqos和libqtest中的API与模拟设备通信
3. 在`tests/qtest/fuzz/meson.build`文件中注册该Fuzzer

### 通用Fuzzer

为某些特定的设备类型写Fuzzer是非常费时费力的事情，尤其是那些libqos并没有包含的设备驱动。Qemu提供了`generic-fuzz`的选项，用于对所有设备进行初步的Fuzzing，包括设备的PIO，MMIO和DMA。如果要启用generic-fuzz，至少需要设置以下两个环境变量：
* `QEMU_FUZZ_ARGS=`：配置设备所需要的参数，比如网卡，用户名
* `QEMU_FUZZ_OBJECTS`=：采用字符串匹配的方式来指定Fuzzing的内存区域。可以用`./qemu-fuzz-i386 --fuzz-target=generic-fuzz -runs=0`来检查匹配到的内存区域。如果匹配到的内存区域越多，Fuzzing的`input-space`就越大，越难发现导致该设备crash的输入，所以`MemoryRegion`的选取要适度。

### 集成OSS-Fuzz
OSS-Fuzz是集成式的Fuzzing工具，它默认对所有的对象进行Fuzz。由于通用Fuzzer的启动需要额外对环境变量进行设置，所以Qemu在`tests/qtest/fuzz/generic_fuzz_configs.h`文件中自定义了一些设备类型，用于OSS-Fuzz。开发者可以在该文件中添加新的设备类型，官方也提供了用于搭建环境的[`Dockerfile`](https://github.com/google/oss-fuzz/blob/master/projects/qemu/Dockerfile)。

### crash复现工具

当复现crash的时候，需要不包含Fuzzer的Qemu，这样可以过滤调误报，并增强调试功能。可以使用OSS-Fuzz的脚本来创建一个`one-line reproducer`。

### Fuzzer生命周期

Qemu Fuzzer为LibFuzzer提供了两处入口点，在LibFuzzer自己的main函数之后调用：
* `LLVMFuzzerInitialize`：Fuzzing开始前调用，初始化环境
* `LLVMFuzzerTestOneInput`：每个Fuzzing任务运行时调用，提供输入并在Fuzzing结束后重置状态

因为Fuzzer的进程会在每次Fuzzing运行后被重置（reset），所以Qemu的状态也需要重置，有两种方法来实现重置，各有优劣。
* `Reboot`：在每次运行之间重启Guest OS
* `Fork`：在子进程中运行test case，和AFL的`fork-server`模式很相似

## Qemu Fuzzer的依赖库

Qemu Fuzzer实现主要依赖的是libqtest和libqos两个库，它们的关系可以参考[`Testing QEMU emulated devices using qtest`](https://www.linux-kvm.org/images/4/43/03x09-TestingQEMU.pdf)，这篇文章介绍了qtest的基本原理，提供的API函数，并给出了添加testcase的方法。

### libqtest

* [代码路径](https://github.com/qemu/qemu/tree/master/tests/qtest/libqtest.c)
* [文档说明](https://qemu.readthedocs.io/en/latest/devel/qtest.html)

Qtest是一个用于对Qemu模拟出的硬件设备做单元测试的框架，它由`Qtest Client`，`Qtest Server`两部分组成。两者之间通过UNIX Socket通信，支持PIO，MMIO，中断，QMP等指令。

* `Qtest Client`：它是为某个设备编写的驱动程序，按照自底向上的封装顺序，它依赖于glib单元测试框架，libqtest，libqos和qgraph。如果需要添加新的测试程序，需要如下四个步骤：
    1. 在Qtest目录下编写新的测试代码`tests/qtest/foo-test.c`
    2. 在Makefile.include中添加编译指令
    3. 编译：`make tests/qtest/foo-test.c`
    4. 运行：
    ```bash=
    QTEST_LOG=1 QTEST_QEMU_BINARY=i386-softmmu/qemu-system-i386 tests/qtest/foo-test`
    ```
* `Qtest Server`：它和TCG，KVM的功能类似，是一种加速器（accelerator），通过编译指令`-machine accel=qtest`注册。在普通的使用场景中，VCPU直接和虚拟硬件交互；而测试场景中，Qtest直接和虚拟硬件交互，充当了Qtest Client和虚拟硬件的中间角色。Qtest用于验证设备的行为是否正确，实际上并没有启动Guest OS。

运行时，`libqtest.c`将启动Qemu为子进程。Qemu的启动主函数在`vl.c`中，在测试场景中，调用`qtest.c`的`qtest_init()`函数，初始化Qtest Server。

两者的关系可以用下图表示：
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

* [代码路径](https://github.com/qemu/qemu/tree/master/tests/qtest/libqos/libqos.c)
* [文档说明](https://qemu.readthedocs.io/en/latest/devel/qtest.html?highlight=libqos)

libqos是用于编写qtest case的设备驱动框架，提供了关于`memory`，`PCI`，`virtio`的API函数。它的功能主要有以下两个：
* 相当于总线的wrapper，为每类总线都实现了特定的函数
* 统一了设备访问的模型，简化了开发者的工作

## Qemu Fuzzer 的整体流程

* [代码路径](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz)
* [文档说明](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html)

以上的两个依赖库都是为Qemu的功能性测试设计，依赖于测试输入的选取。而Fuzzing正是通过对输入增加随机性和变异算法来提高测试输入的质量。从而可以使用LibFuzzer对Qtest的输入进行HOOK，提高Qtest的测试效率。综上所述，Qemu Fuzzer的整体结构如图所示。

![](https://img-blog.csdnimg.cn/img_convert/f269d3ace4fe504117d7fe4e2a253375.png)

从源代码的角度来看：
* `fuzz.h`：定义了实现一个Fuzz Target用到的接口和数据结构，以及与LibFuzzer之间的交互
* `fork_fuzz.h`：定义了并发Fuzzer之间的共享内存
* `qos_fuzz.h`：定义了libqos在qtest上的进一步封装的接口
* `generic_fuzz_configs.h`：定义了通用的Fuzzer设置
* `virtio_xxx_fuzz.h`：实现了virtio设备（net，blk，scsi）的Fuzz Target

## Qemu Fuzzer 的用例分析

Qemu的[`Developer documentation`](https://wiki.qemu.org/Documentation/GettingStartedDevelopers)中写道：

> QEMU does not have a high level design description document - only the source code tells the full story.

所以作为Qemu的开发者，阅读源码非常关键。本节以virtio-net设备为例，分析Qemu Fuzzing的流程，代码路径为[`tests/qtest/fuzz/virto_net_fuzz.c`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/virtio_net_fuzz.c)。virtio是一种半虚拟化的技术，需要Host OS提供对设备的emulation，Guest OS负责对设备的驱动。工作模式如下图所示：

![](https://img-blog.csdnimg.cn/img_convert/8cbe7f371f062202bb88928900b3a481.png)

实现方面，以自顶向下的逻辑进行说明：
* 首先，实现注册函数`register_virtio_net_fuzz_targets()`。使用libqos提供的`fuzz_add_qos_target()`函数添加了三个Fuzzing对象。该函数是libqos对于`fuzz_add_target()`函数的wrapper，其原型如下：

```cpp=
void fuzz_add_qos_target(
        FuzzTarget *fuzz_opts,
        const char *interface,
        QOSGraphTestOptions *opts
        );
```

* 最后，修改[`meson.build`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/fuzz.c)文件，添加条件编译选项。

接下来，以`virtio-net-socket`为主，对Fuzzing对象的参数以及参数中涉及到的函数进行分析

* `virtio-net-socket`： 
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

第一个参数为指向FuzzTarget的临时对象的指针。该对象由[`fuzz.h`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/fuzz.c)定义，含标识信息和许多与Fuzzing特性相关的回调函数。介绍如下：
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
|             |                                                           | Its should handle setup, input execution and cleanup.                   |
|             |                                                           | Cannot be NULL                                                          |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
```

其中，`virtio_net_pre_fuzz`初始化了qos path和fork fuzz用到的共享内存。`virtio_net_fork_fuzz`首先fork出子进程，并调用`virtio_net_fuzz_multi`函数。该函数用自定义的`vq_action`来管理随机数据，根据数据包到来情况，将其加入`virtioqueue`中，并kick out出去。随后运行主循环。

第二个参数表示使用的设备接口名称，这里统一为virtio-net。

第三个参数为[`qgraph.h`](https://github.com/qemu/qemu/tree/master/tests/qtest/libqos/qgraph.h)提供的关于测试选项的结构体。其中`before`参数接受原型为`QOSBeforeTest`的函数。`virtio_net_test_setup_socket`函数指定了Qemu网络设备的后端为socket。它负责和虚拟设备通信，并将虚拟设备的数据包发送到宿主机的网络设备中。

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

`virtio_net_fork_fuzz_check_used`和`virtio_net_fork_fuzz`非常相似，不同之处在于调用`virtio_net_fuzz_multi`函数的时候使用了`true`。

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

`virtio_net_test_setup_user`指定了网络后端的类型为user

## Qemu Fuzzer 案例 CVE-2017-12809

最后，简要分析一个[由LibFuzzer发现](https://unit42.paloaltonetworks.com/unit42-palo-alto-networks-discovers-new-qemu-vulnerability/)的Qemu上的CVE漏洞。
* 漏洞描述：该漏洞属于拒绝服务类。当通过IDE硬盘和CD/DVD-ROM模拟器来构建Guest OS时，Guest OS中的特权用户可以通过清除一个空的CDROM设备驱动，造成空指针解引用，进而导致Qemu进程崩溃。
* 漏洞代码： 在`hw/ide/core.c`文件中调用`blk_aio_flush()`函数前没有检查`s->blk`是否为空
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
* [漏洞修复](https://lists.gnu.org/archive/html/qemu-devel/2017-08/msg01989.html)：除了在漏洞发生部分增加条件判断以外，还在`tests/ide-test.c`中增加了测试代码

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

* 漏洞复现：找到patch前的commit版本，加上新增test中的测试用例，运行qtest程序：
```bash=
# 不能直接wget对应的release版本，因为受影响的版本都被修复了
git clone https://gitlab.com/qemu-project/qemu.git;cd qemu
git checkout stable-2.10
# 从mailing list中获取patch的作者，找对应的commit
git log --author=Hajnoczi
git reset --hard=4da97120d51a4383aa96d741a2b837f8c4bbcd0b
# 构建
mkdir build;cd build;../configure ----disable-werror
make qtest
```

其实Qemu虚拟机逃逸漏洞已经常见于CTF比赛和CVE中了，比如知名的[CVE-2020-14364](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-14364)

> 有错误之处请批评指正，作者联系方式：[cascades-sjtu](https://cascadeschen.cn)

