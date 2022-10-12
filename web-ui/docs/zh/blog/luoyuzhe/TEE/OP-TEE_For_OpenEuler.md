---
title: openEuler与OP-TEE的适配 
date: 2021-01-10
tags:     
    - Kunpeng920   
    - OP-TEE   
archives: 2021-01
author: luoyuzhe
summary: 介绍openEuler与OP-TEE适配的相关知识
---

# openEuler与OP-TEE的适配

Kunpeng920芯片支持ARM Trust Zone技术，理论上可以支持基于ARM的可信执行环境（Trusted Execution Environment）解决方法。Trust Zone技术将ARM CPU 的执行环境分为正常世界状态（Normal World State）和安全世界状态（Secure World State）两种状态，其中在正常世界状态执行的程序不能访问安全世界状态中的内存、缓存和其他外围安全硬件设备，从而提供了硬件级别的安全隔离。

在ARMv8架构中，CPU的执行等级可以分配EL0~EL3，其中EL0执行等级用于运行用户应用程序；EL1执行等级用于运行操作系统内核；EL2执行等级用于支持非安全操作下的虚拟化；EL3则用于安全世界状态和正常世界状态之间的转换。执行等级与安全状态之间的关系如下图所示：

![](./Execution-Level.jpg)



在上图中我们可以看到，Guest OS(如Linux，Android等)运行在正常世界状态中，它们的运行资源较为丰富，也被称为丰富执行环境（Rich Execution Environment）。而在安全世界状态中，则运行着安全操作系统（也叫可信执行环境操作系统，TEE OS ）和安全应用（也叫可信应用 Trusted Application, TA）。即使REE不可信，它也无法访问安全世界状态中的系统资源，如安全设备、安全内存数据和安全缓存数据等。从而用户可以将敏感数据保存在安全世界状态中，然后由TA来完成相关的数据处理。运行在安全世界状态的代码可以访问REE侧的地址空间。REE侧的程序可以通过运行在正常世界状态的客户端应用（Client Application，CA）来获取安全世界状态中特定的数据和调用特定的功能。为完成安全世界状态和正常世界状态之间的切换，系统执行smc指令进入EL3的Secure Monitor模式，并在该模式下实现状态切换。

从硬件的角度来看，为实现Trust Zone， ARMv8架构（1）为总线增加了安全位；（2）对MMU中的页表增加了安全位;(3)为缓存增加了安全位；（4）为外围组件进行扩展，增加安全操作全新控制和安全造作信号。当主设备发起读写操作时，从设备能检查总线上的安全位，从而防止从正常世界状态访问安全设备。同时，TrustZone也通过地址空间控制组将将从设备地址空间分为安全空间和非安全空间，安全空间的地址将会拒绝正常世界状态的访问，这种机制也用于控制对片外DRAM的访问。对于片上ROM或片上静态ARM，Trust Zone通过内存适配器组件将其划分为安全区域和非安全区域。对于外设，Trust Zone则通过保护控制器组件区分安全外设和非安全外设。

OP-TEE（ https://github.com/OP-TEE ）是一款由Linaro和ST合作开发的开源TEE解决方案，它遵循GlobalPlatform规范，主要包含正常世界状态的客户端API（optee_client）、一个Linux内核的TEE设备驱动（optee_linuxdriver）和一个Trusted OS（optee_os）。其中Trusted OS 采用BSD开源协议，因此SoC厂商和设备厂商可以在不公布修改内容的情况下对OP-TEE进行修改，从而有利于OP-TEE进入商业产品中。OP-TEE的架构如下图所示：

![](./Architecture.jpg)

在上图中，GlobalPlatform TEE Client API在OP-TEE中由libteec库提供，共有10个。它们提供了REE侧的应用程序向TEE侧请求建立联系、请求分配共享内存以及发送命令等功能。这些信息经由OP-TEE在Linux中的驱动程序传递给TEE侧。TEE Supplicant则是REE侧的一个常驻进程，负责接收并处理来自TEE侧的请求。TEE侧的应用程序（Trusted Application, TA）通过远程过程调用（RPC）将请求通过OP-TEE驱动发送给REE侧。TEE Supplicant会监控驱动中来自TEE侧的RPC请求的状况，一旦接到请求就会对该请求进行解析和处理。常见的来自TA的RPC请求有TA镜像加载、REE侧文件系统操作、Socket操作和REE侧数据库操作等。OP-TEE在Linux中的驱动程序会为RPC请求创建一个请求队列，TEE Supplicant每次接到一个来自TEE侧的RPC请求后都会自动创建一个线程用于接收来自请求队列的其他RPC请求，从而实现RPC请求的并发处理。TEE Supplicant将RPC请求处理完成后将处理结果通过OP-TEE驱动发送给TEE侧。

在ARMv8架构上OP-TEE和Linux内核的加载和启动过程一般是由ARM可信固件（ARM Trusted Firmware, ATF)来完成的。ATF提供了统一的ARM底层接口标准，从而便于代码移植，其主要功能如下[1]：

> - 初始化安全世界状态运行环境、异常向量、控制寄存器、中断控制器、配置平台的中断；
> - 初始化ARM通用中断控制器（GIC 2.0 或 GIC 3.0）的驱动程序；
> - 执行ARM系统IP的标准初始化操作和安全扩展组件的初始配置；
> - 安全监控模式调用请求的逻辑处理代码；
> - 实现可信的板级引导功能，对引导过程中加载的镜像文件进行电子签名检查；
> - 支持自有固件引导，开发者可以根据具体需求将自有固件添加到ATF的引导流程中。

ATF完成了ARMv8的安全启动功能，其源代码分为bl1、bl2、bl31、bl32和bl33等部分，前一部分的代码用于加载后一部分的镜像文件，并提供后一部分代码的启动入口，在加载每一个镜像文件之前都会验证其电子签名以保证镜像文件的合法性。其中，bl31用于完成安全世界和正常世界之间的切换，bl32用于加载TEE OS，bl33用于加载REE OS。ATF的安全启动过程如下[1]:

> 1. 执行Chip ROM；
> 2. 获取并验证bl1的电子签名信息；
> 3. 跳转到bl1,验证bl2镜像的电子签名信息；
> 4. 运行bl2镜像并验证bl31镜像的电子签名信息；
> 5. 运行bl31镜像，完成EL3运行状态的软件配置, 验证TEE OS镜像是否合法；
> 6. 启动TEE OS,验证BootLoader是否合法;
> 7. 启动BootLoader（嵌入式系统支持，服务器一般使用BIOS）,验证内核或Recovery镜像是否合法；
> 8. 启动内核或Recovery镜像。

其中任何一步合法性验证失败都会导致系统挂死。其中,BootLoader一般用于嵌入式系统的启动过程，在服务器中一般使用BIOS，这就意味着在Kunpeng920启动的过程中，我们需要将上述过程中的BootLoader换成BIOS。OP-TEE启动BIOS的结构可以参考QEMU上运行OP-TEE所采用的BIOS结构。在QEMU上运行OP-TEE时，首先会通过编译过程生成bios.bin镜像文件，该文件中包含Linux Kernel的镜像、OP-TEE OS的镜像和rootfs的镜像。在启动过程中/bios/entry.S文件中的入口函数会进行中断向量表、BSS段和堆栈空间的初始化操作，并调用main_init_sec函数加载OP-TEE OS的镜像和调用main_init_ns函数启动Linux内核镜像。main_init_sec函数将OP-TEE OS镜像、Linux内核镜像、rootfs加载以及device tree相关信息到RAM中。在QEMU工程中device tree的信息处存放在DTB_START地址中而不是在bios.bin中（在openEuler中是否是这样？）。启动Linux的过程中会挂载rootfs和OP-TEE驱动。OP-TEE驱动是在编译阶段被编译到Linux内核镜像中的。最后，Linux在启动的过程中会自动创建TEE Supplicant作为常驻进程，该进程的启动信息时在编译时被写入/etc/init.d文件中的。

参考以上过程，在Kunpeng920上适配OP-TEE的初步方案如下：

1. 基于QEMU-v8的OP-TEE编译文件进行修改，去掉与QEMU相关的编译项；
2. 基于QEMU-v8编译结果进行bios修改，注意device tree的加载过程；
3. 修改ATF的安全引导过程，将BootLoader换成修改后的bios，这一过程应该可以通过ATF支持的自有固件引导实现。





------

### 参考文献

[1]《手机安全和可信应用开发指南：Trust Zone与OP-TEE技术详解》帅峰云，黄腾，宋洋著，2018

[2] https://www.linaro.org/blog/op-tee-open-source-security-mass-market/

[3]https://blog.csdn.net/yiyueming/article/details/72897362