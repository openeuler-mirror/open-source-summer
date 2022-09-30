---
title: openEuler 社区暑期 2020任务详解分类
date: 2020-06-03
tags:
    - openEuler 社区
    - 暑期 2020献
archives: 2020-06
author: genedna
summary: openEuler 社区参与暑期 2020 的 102 个任务具体分析。
---


## openEuler 社区 [暑期 2020](https://isrc.iscas.ac.cn/summer2020) 任务详解分类

[openEuler](https://www.openeuler.org) 社区在 [暑期 2020](https://isrc.iscas.ac.cn/summer2020) 活动中共发布了 [102](https://gitee.com/openeuler/marketing/blob/master/events/summer2020/tasks.md) 个任务，涵盖了 Linux 、容器、云计算和编程语言等多个技术栈。参与暑期 2020 活动的同学可以通过阅读本文的深度解析，找到感兴趣和符合自身技术栈的任务，这样可以在申请任务的过程中提高成功率。同时，openEuler 社区在 June 7th, 2020 、June 8th, 2020 和 June 9th, 2020 三天点晚间 19:00 ~ 20:00 间在[ Bilibili ](https://live.bilibili.com/22290444) 进行直播，由相关任务的社区 Maintainer 为大家更为详细的讲解技术点、具体要求等，现场回答同学们的问题。

更多问题可以和本文作者 邮件/Twitter/Telegram 联系：

- 邮件：eli@patch.sh 
- Twitter: https://twitter.com/genedna
- Telegram: genedna

相关问题：

- 任务是必须在 aarch64 架构上完成么？

    在任务的要求中写明需要在 aarch64 架构下完成的，都需要在 [openEuler](https://www.openeuler.org) 的 aarch64 架构上验证通过才可以；没有写此要求的任务，由申请者和任务导师协商，以协商结果为准。

- 在哪里找到 aarch64 的环境？

    可以在树莓派上进行开发，相关内容请参考 https://www.openeuler.org/zh/blog/2020/05/25/2020-05-25-raspberrypi-userguide.html 。华为公司为针对 aarch64 架构的任务赞助华为公有云的鲲鹏计算资源，可使用 openEuler 的镜像用于完成任务开发。在学生申请任务成功后，会由活动组织方统一发放。

- 任务验收标准不清晰？

    验收标准可以和导师进行沟通，导师会根据沟通情况，提出具体的验收标准。

关于直播活动请大家加入到暑期 2020 学生的微信群，关注微信群的时间通知。

<img src="/img/events/summer-2020-wechat-3.jpg" style="width:40%;"/>

### B 站直播计划，房间地址 https://live.bilibili.com/22290444

June 7th, 2020 19:00 ~ 20:00 方亚芬讲解

* 暑期 2020 团体任务 - [No.88 - 移植 openEuler 至 RK3399 平台](https://gitee.com/openeuler/marketing/issues/I1IJ4B)
* [No.1 - 为 openEuler 添加 Xfce 桌面环境并能够运行在树莓派 4B 上](https://gitee.com/openeuler/marketing/issues/I1H8G3)
* [No.2 - 精简 openEuler 的树莓派 4B 镜像体积小于 500 MiB](https://gitee.com/openeuler/marketing/issues/I1H8H9) 
* [No.3 - 为 openEuler 树莓派 4B 镜像提供 UEFI 启动支持](https://gitee.com/openeuler/marketing/issues/I1H8HV)

June 8th, 2020 19:00 ~ 20:00 何晓文讲解 

* 暑期 2020 团体任务 [No.88 - 移植 openEuler 至 RK3399 平台](https://gitee.com/openeuler/marketing/issues/I1IJ4B)
* [No.49 - 基于 openEuler 的 ABI 检查工具](https://gitee.com/openeuler/marketing/issues/I1HQSE)
* [No.47 - 开发 openEuler bootstrap 工具](https://gitee.com/openeuler/marketing/issues/I1HAXJ)          

June 9th, 2020 19:00 ~ 20:00 蔡灏旻讲解容器技术相关任务 

* [No.7 - 构建可运行 iSulad 点容器镜像，并推送到 Docker Hub 镜像仓库](https://gitee.com/openeuler/marketing/issues/I1HVZF)
* [No.9 - iSula 相关项目支持编译 Debian 包](https://gitee.com/openeuler/marketing/issues/I1HWDZ)
* [No.10 - iSula 项目内存池设计与实现](https://gitee.com/openeuler/marketing/issues/I1HX3G)
* [No.11 - iSula 项目线程池设计与实现](https://gitee.com/openeuler/marketing/issues/I1HX5Y)
* [No.12 - iSula-kits 支持在多个 OS 发型版上运行](https://gitee.com/openeuler/marketing/issues/I1HXE7)
* [No.13 - iSula 容器镜像构建工具支持多存储驱动](https://gitee.com/openeuler/marketing/issues/I1HXS9)-
* [No.84 - 在 RISC-V 架构 openEuler 平台上提供 iSulad](https://gitee.com/openeuler/marketing/issues/I1HXS9)

June 15th, 2020 20:00 ~ 21:00 虚拟化相关任务讲解

* [No.52 - openEuler 虚拟化调度性能评估工具及方法构建](https://gitee.com/openeuler/marketing/issues/I1I9XJ)
* [No.6 - 虚拟化场景下的类似 top 点调测工具 virttop](https://gitee.com/openeuler/marketing/issues/I1HVM7)
* [No.66 - QEMU 中集成 virtio-fuzz 能力以支持模拟设备的模糊测试](https://gitee.com/openeuler/marketing/issues/I1IHCJ)
* [No.62 - QEMU 用户态进程热补丁框架](https://gitee.com/openeuler/marketing/issues/I1IG8E)

June 16th, 2020 20:00 ~ 21:00 测试相关任务讲解

* [No.69 - api-sanity-checker 与 oss-fuzz 测试结合的误报优化](https://gitee.com/openeuler/marketing/issues/I1IHNM)
* [No.34 - 对 openEuler 社区发布包 keepalived 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6CG)
* [No.35 - 对 openEuler 社区发布包 kmod-kvdo 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6CY)
* [No.36 - 对 openEuler 社区发布包 OpenVPN 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6D6)
* [No.37 - 对 openEuler 社区发布包 lrzsz 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6EO)
* [No.38 - 对 openEuler 社区发布包 ipvsadm 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6F2)
* [No.39 - 对 openEuler 社区发布包 MongoDB 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6GM)
* [No.40 - 对 openEuler 社区发布包 Redis 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6GW)
* [No.41 - 对 openEuler 社区发布包 sssd 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6IK)
* [No.42 - 对 openEuler 社区发布包 MySQL 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6IN)
* [No.43 - 对 openEuler 社区发布包 rpcbind 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6JE)
* [No.44 - 对 openEuler 社区发布包 haproxy 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6JI)
* [No.29 - 对openEuler社区发布包osc和obs-build进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I5WZ)

June 17th, 2020 20:00 ~ 21:00 openEuler 社区之旅参与介绍

* 介绍如何在 openEuler 社区贡献

### 任务分类

1. [No.88 - 移植 openEuler 至 RK3399 平台](https://gitee.com/openeuler/marketing/issues/I1IJ4B) 团体项目 - **建议申请此任务的团队需要有一定的 Linux 操作系统实战能力，掌握 Linux 内核及硬件驱动相关知识，熟悉掌握操作系统引导与启动机制。**

    [openEuler](https://www.openeuler.org) 社区致力于把 [openEuler](https://www.openeuler.org) 发行版移植到多种设备上，目前已经能在 [Raspberry Pi](https://www.raspberrypi.org) 4B Model 上顺利运行。这次团体任务的目标是把 [openEuler](https://www.openeuler.org) 20.03 LTS 版本移植到瑞芯微推出的 RK3399 芯片上运行，社区建议参与此任务团队在 Firefly 出品的 [4GB 内存/16GB 闪存](https://item.jd.com/23958924426.html) 版本的开发板进行移植任务。
    
    任务地址 https://gitee.com/openeuler/marketing/issues/I1IJ4B

2. Raspberry Pi 树莓派相关任务 -  **建议申请此任务的同学需要有一定的 Linux 操作系统实战能力，掌握 Linux DNF/RPM 管理方案，熟悉 Linux 桌面系统的同学申请此类任务**

    [openEuler](https://www.openeuler.org) 社区致力于把 [openEuler](https://www.openeuler.org) 发行版移植到多种设备上，目前已经能在 [Raspberry Pi](https://www.raspberrypi.org) 4B Model 上顺利运行。为了让  [openEuler](https://www.openeuler.org) 项目更好的运行在树莓派上， [openEuler](https://www.openeuler.org) 社区 [Raspberry Pi SIG](https://gitee.com/openeuler/community/tree/master/sig/sig-RaspberryPi) 的 Maintainer 方亚芬([yafen@iscas.ac.cn](mailto:yafen@iscas.ac.cn)) 发起了 3 个优化运行效果的任务。

    - [No.2 - 精简 openEuler 的树莓派 4B 镜像体积小于 500 MiB](https://gitee.com/openeuler/marketing/issues/I1H8H9) 任务地址 https://gitee.com/openeuler/marketing/issues/I1H8H9
    - [No.1 - 为 openEuler 添加 Xfce 桌面环境并能够运行在树莓派 4B 上](https://gitee.com/openeuler/marketing/issues/I1H8G3) 任务地址 https://gitee.com/openeuler/marketing/issues/I1H8G3
    - [No.3 - 为 openEuler 树莓派 4B 镜像提供 UEFI 启动支持](https://gitee.com/openeuler/marketing/issues/I1H8HV) 任务地址 https://gitee.com/openeuler/marketing/issues/I1H8HV

3. Linux 桌面相关任务 - **建议申请此任务的同学掌握 Linux DNF/RPM 管理方案，熟悉 Linux 桌面系统的同学申请此类任务**

    由于历史原因，目前 [openEuler](https://www.openeuler.org) 还没有正式提供桌面环境，所以在这次活动中 [sig-UKUI](https://gitee.com/openeuler/community/tree/master/sig/sig-UKUI) 的 Maintainer [douyan@kylinos.cn](mailto:douyan@kylinos.cn) 和 [jianfengli@ubuntukylin.com](mailto:jianfengli@ubuntukylin.com) 发起了移植 [UKUI](https://www.ukui.org) 到 [openEuler](https://www.openeuler.org) 的任务。在 [No.1](https://gitee.com/openeuler/marketing/issues/I1H8G3) 任务则是把轻量级桌面系统 [Xfce](https://www.xfce.org) 移植到 [openEuler](https://www.openeuler.org) 系统中。

    [UKUI](https://www.ukui.org) 是麒麟软件桌面研发团队开发的基于 Linux 发行版的轻量级桌面环境，其设计紧贴普通用户需求，特别是针对有一定 Windows 系统使用习惯的用户，减少其使用 Linux 系统的学习成本。2019年，麒麟软件全面启动 UKUI 3.0 的设计和研发工作，全新的 UKUI 3.0 使用 QT 开发，秉承 “友好易用，简单轻松” 的设计理念，将为用户提供更愉快的交互体验。

    - [No.100 - 将 UKUI 移植到 openEuler，并支持生物识别](https://gitee.com/openeuler/marketing/issues/I1IRJ3) 任务地址 https://gitee.com/openeuler/marketing/issues/I1IRJ3

4. Linux 容器引擎相关任务 - **建议熟悉 Linux 容器引擎技术实现(如 Docker )的同学申请此类任务**

    [openEuler](https://www.openeuler.org) 在兼容主流的容器引擎同时，孵化自己的容器引擎项目 [iSula](https://gitee.com/openeuler/iSulad)，它在支持 Docker 镜像的同时支持 OCI 格式的镜像和规范。 [iSulad SIG](https://gitee.com/openeuler/community/tree/master/sig/iSulad) 的 Maintainers 为同学带来了多个任务。更多 [iSula](https://gitee.com/openeuler/iSulad) 的任务请访问它的官方[文档](https://www.openeuler.org/zh/docs/20.03_LTS/docs/Container/container.html)

    Linux 容器相关知识可以参考：

    - Docker 相关文档 https://docs.docker.com
    - [Open Container Initiative](https://opencontainers.org) 基金会对 Linux Container 定义可以在其 Github 网站 https://github.com/opencontainers
    - https://riscv.org

    任务列表：

    - [No.7 - 构建可运行 iSulad 点容器镜像，并推送到 Docker Hub 镜像仓库](https://gitee.com/openeuler/marketing/issues/I1HVZF)  任务链接 https://gitee.com/openeuler/marketing/issues/I1HVZF
    - [No.9 - iSula 相关项目支持编译 Debian 包](https://gitee.com/openeuler/marketing/issues/I1HWDZ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HWDZ 
    - [No.10 - iSula 项目内存池设计与实现](https://gitee.com/openeuler/marketing/issues/I1HX3G) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HX3G
    - [No.11 - iSula 项目线程池设计与实现](https://gitee.com/openeuler/marketing/issues/I1HX5Y) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HX5Y
    - [No.12 - iSula-kits 支持在多个 OS 发型版上运行](https://gitee.com/openeuler/marketing/issues/I1HXE7) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HXE7
    - [No.13 - iSula 容器镜像构建工具支持多存储驱动](https://gitee.com/openeuler/marketing/issues/I1HXS9) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HXS9
    - [No.84 - 在 RISC-V 架构 openEuler 平台上提供 iSulad](https://gitee.com/openeuler/marketing/issues/I1HXS9) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HXS9
    - [No.8 - C 语言 JSON 解析转换代码生成框架](https://gitee.com/openeuler/marketing/issues/I1HWB3) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HWB3

5. Kubernetes 相关任务 - **建议熟悉 Kubernetes 编排调度技术的同学申请此类任务**

    [openEuler](https://www.openeuler.org) 当然不会缺席当前业界最热的开源项目 [Kubernetes](https://kubernetes.io) ，多个 SIG 组的 Maintainer 推出了相关的任务，从相对简单的集成任务到有一定难度的开发任务。[Kubernetes](https://kubernetes.io) 的资料很多，这里就不一一列举。

    相关资料：

    - https://kubernetes-csi.github.io/docs
    - https://goharbor.io
    - https://www.cs.nmsu.edu/~pfeiffer/fuse-tutorial
    - https://github.com/libfuse/libfuse
    - https://www.kernel.org/doc/html/latest/filesystems/fuse.html

    任务列表：

    - [No61. - openEuler 集成 Kubernetes 相关软件包](https://gitee.com/openeuler/marketing/issues/I1IF4R) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IF4R
    - [No.91 - 用 RUST 实现基于 FUSE 的 Kubernetes CSI 接口](https://gitee.com/openeuler/marketing/issues/I1IMJY) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMJY
    - [No. 14 - openEuler 集成 Harbor 项目](https://gitee.com/openeuler/marketing/issues/I1HXBE) 任务链接  https://gitee.com/openeuler/marketing/issues/I1HXBE

6. 虚拟化、云相关任务 - **建议熟悉 QEMU 等虚拟化技术的同学申请此类任务**

    [QEMU](https://www.qemu.org) 可以说是云计算的基石技术，在很多云计算的架构中是配合 KVM 来完成虚拟化工作。因为 KVM 是硬件辅助的虚拟化技术，主要负责比较繁琐的 CPU 和内存虚拟化，而 QEMU 则负责 I/O 虚拟化，两者合作各自发挥自身的优势相得益彰。

    相关资料：

    - https://www.qemu.org
    - https://www.youtube.com/watch?v=dk6SUD8ovXw

    任务列表：

    - [No.56 - 以 openEuler LTS 为基础生成公有云镜像](https://gitee.com/openeuler/marketing/issues/I1ICCJ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1ICCJ
    - [No.52 - openEuler 虚拟化调度性能评估工具及方法构建](https://gitee.com/openeuler/marketing/issues/I1I9XJ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I9XJ
    - [No.6 - 虚拟化场景下的类似 top 点调测工具 virttop](https://gitee.com/openeuler/marketing/issues/I1HVM7) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HVM7
    - [No.66 - QEMU 中集成 virtio-fuzz 能力以支持模拟设备的模糊测试](https://gitee.com/openeuler/marketing/issues/I1IHCJ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IHCJ
    - [No.62 - QEMU 用户态进程热补丁框架](https://gitee.com/openeuler/marketing/issues/I1IG8E) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IG8E

7. Golang 相关任务 -  **建议熟悉 Golang 语言、对 aarch64 架构和算法有一定程度了解等的同学申请此类任务**

    [Golang](https://golang.org) 随着容器技术和 [Kubernetes](https://kubernetes.io) 的逐渐被开发者接受。[openEuler](https://www.openeuler.org) 社区提出的 [Golang](https://golang.org) 大多是基于 ARM64 的优化任务。需要对 ARM 的指令集和 Golang 语言编译器等有一定的了解才能顺利完成任务

    相关资料：

    - https://community.arm.com/developer/tools-software/oss-platforms/b/android-blog/posts/arm-neon-programming-quick-reference
    - https://gcc.gnu.org/onlinedocs/gcc-5.2.0/gcc.pdf
    - https://static.docs.arm.com/ddi0487/a/DDI0487A_j_armv8_arm.pdf
    - https://www.element14.com/community/servlet/JiveServlet/previewBody/41836-102-1-229511/ARM.Reference_Manual.pdf
    - https://courses.cs.washington.edu/courses/cse469/18wi/Materials/arm64.pdf

    任务列表：

    - [No.81 - 优化 Golang 同步包中锁或原子操作在 ARM64 上的实现，提升安全并发的性能](https://gitee.com/openeuler/marketing/issues/I1IJ86) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ86
    - [No.80 - 增强 Golang 编译器基于 ARM64 的智能化编译](https://gitee.com/openeuler/marketing/issues/I1IJ5W) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ5W
    - [No.79 - Golang 编解码算法性能优化](https://gitee.com/openeuler/marketing/issues/I1IJ5T) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ5T
    - [No.78 - 基于 ARM 的硬件加速能力软硬件协同调优 Golang 数学库函数](https://gitee.com/openeuler/marketing/issues/I1IJ4X) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ4X
    - [No.76 - 优化 Golang 压缩库的压缩率或压缩性能](https://gitee.com/openeuler/marketing/issues/I1IJ4M) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ4M
    - [No.74 - 优化 Golang 图像库功能和性能](https://gitee.com/openeuler/marketing/issues/I1IJ24) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ24
    - [No.73 - 增强 Golang 运行时库在 ARM 上的性能和安全性](https://gitee.com/openeuler/marketing/issues/I1IJ0J) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ0J
    - [No.72 - 针对 Golang 加解密库进行 ARM64 相关的优化](https://gitee.com/openeuler/marketing/issues/I1IIW6) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IIW6

8. Rust 相关任务 - **建议熟悉 Rust 语言、具有一定存储知识(部分任务需要)的同学申请此类任务**

    [Rust](https://www.rust-lang.org) 是近几年崛起的系统级编程语言，也在 TIOBE 的排名上进入了前 20 名。越来越多的项目在使用 [Rust](https://www.rust-lang.org) 来开发。

    相关资料：

    - https://www.rust-lang.org
    - https://coolshell.cn/articles/9606.html
    - https://coolshell.cn/articles/9703.html
    - https://coolshell.cn/articles/8239.html

    任务列表：

    - [No.93 - 用 Rust 实现无锁 HashMap](https://gitee.com/openeuler/marketing/issues/I1IMNX) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMNX
    - [No.92 - 用 Rust 实现无锁 LRU 缓存](https://gitee.com/openeuler/marketing/issues/I1IMNR) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMNR
    - [No.91 - 用 RUST 实现基于 FUSE 的 Kubernetes CSI 接口](https://gitee.com/openeuler/marketing/issues/I1IMJY) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMJY
    - [No.89 - 基于 Rust 实现 HDFS 的用户态 FUSE 驱动](https://gitee.com/openeuler/marketing/issues/I1IMGW) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMGW
    - [no.87 - 基于 Rust 高性能 HTTP 库 Hyper 或 Tide 实现 S3 服务端](https://gitee.com/openeuler/marketing/issues/I1IMFO) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMFO

9. 存储相关任务 - **建议熟悉 Linux 存储知识的同学申请此类任务**

    [FUSE] 是用户态的文件系统，目前业界都在探索把存储前置到用户态，提升效率和管控的能力。[openEuler](https://www.openeuler.org) 提出的存储业务大部分都跟此方向相关。

    相关资料：

    - https://hadoop.apache.org/docs/r3.2.1/hadoop-project-dist/hadoop-hdfs/HdfsUserGuide.html
    - https://www.ibm.com/analytics/hadoop/hdfs
    - https://en.wikipedia.org/wiki/Apache_Hadoop
    - https://en.wikipedia.org/wiki/Filesystem_in_Userspace
    - https://spdk.io
    - https://lwn.net/Articles/740157
    - http://www.tcpdump.org/papers/bpf-usenix93.pdf
    - https://lwn.net/Articles/599755
    - http://blog.memsql.com/bpf-linux-performance

    任务列表：

    - [No.91 - 用 RUST 实现基于 FUSE 的 Kubernetes CSI 接口](https://gitee.com/openeuler/marketing/issues/I1IMJY) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMJY
    - [No.89 - 基于 Rust 实现 HDFS 的用户态 FUSE 驱动](https://gitee.com/openeuler/marketing/issues/I1IMGW) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMGW
    - [No.82 - 基于 SPDK 的高性能用户态用户态文件系统](https://gitee.com/openeuler/marketing/issues/I1IKCX) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IKCX
    - [No.90 - 基于 Perf 或 eBPF 对 FUSE 进行 Tracing 分析](https://gitee.com/openeuler/marketing/issues/I1IMIA) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMIA

10. ARM64 相关任务 - **建议熟悉 aarch64 架构，算法有一定能力的同学申请此类任务**

    [openEuler](https://www.openeuler.org) 提出的 ARM64 相关任务都是优化类型，此部分参考资料参见第 7 类 [Golang](https://golang.org) 的相关资料。

    任务列表：

    - [No.16 - 为 ARM 平台优化开源软件的 CRC 实现](https://gitee.com/openeuler/marketing/issues/I1HYCD) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HYCD
    - [No.81 - 优化Go同步包中锁或原子操作在 ARM64 上的实现，提升安全并发的性能](https://gitee.com/openeuler/marketing/issues/I1IJ86) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ86
    - [No.80 - 增强 Golang 编译器基于ARM64的智能化编译](https://gitee.com/openeuler/marketing/issues/I1IJ5W) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ5W
    - [No.78 - 基于ARM的硬件加速能力软硬件协同调优go数学库函数](https://gitee.com/openeuler/marketing/issues/I1IJ4X) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ4X
    - [No.77 - 在Eigen社区中提供ARM的CI环境](https://gitee.com/openeuler/marketing/issues/I1IJ4N) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ4N
    - [No.75 - Numpy 在 ARM 平台的优化](https://gitee.com/openeuler/marketing/issues/I1IJ3H) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ3H
    - [No.73 - 增强Golang运行时库在ARM上的性能和安全性](https://gitee.com/openeuler/marketing/issues/I1IJ0J) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IJ0J
    - [No.72 - 针对Go加解密库进行ARM64相关的优化](https://gitee.com/openeuler/marketing/issues/I1IIW6) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IIW6
    - [No.65 - adler32算法在ARM平台的优化](https://gitee.com/openeuler/marketing/issues/I1IGXZ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IGXZ

11. RISC-V 相关任务 - **建议熟悉 RISC-V 架构的同学申请此类任务**

    [RISC-V](https://riscv.org) 是一种是一个基于精简指令集(RISC)原则的开源指令集架构(ISA)，[openEuler](https://www.openeuler.org) 的 [RISC-V](https://gitee.com/openeuler/community/tree/master/sig/sig-RISC-V) SIG 的 Maintainer 正在致力于移植工作。

    相关资料:

    - https://riscv.org

    任务列表：

    - [No.84 - 在 RISC-V 架构 openEuler 平台上提供 iSulad](https://gitee.com/openeuler/marketing/issues/I1IKQO) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IKQO
    - [No.83 - 在 RISC-V 架构openEuler平台上提供golang支持](https://gitee.com/openeuler/marketing/issues/I1IKOI) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IKOI
    - [No.21 - 为openEuler - RISC-V 添加grub的引导启动方式](https://gitee.com/openeuler/marketing/issues/I1I1TS) 任务链接  https://gitee.com/openeuler/marketing/issues/I1I1TS

12. 安全相关任务 - **建议熟悉 Linux 安全的同学申请此类任务**

    安全是业界永恒的话题，[openEuler](http://openeuler.org) 从第一天开始就重视安全问题，除了 CVE 漏洞披露以外，也在 openEuler 中加入各种安全特性。

    相关资料：

    - https://www.open-scap.org
    - https://www.redhat.com/en/topics/linux/what-is-selinux
    - https://wiki.ubuntu.com/AppArmor
    - https://www.op-tee.org

    任务列表：

    - [No.50 - 提供 openEuler 满足 openscap 标准的安全配置基线](https://gitee.com/openeuler/marketing/issues/I1I7JW) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I7JW
    - [No.46 - SELinux 策略应用指导](https://gitee.com/openeuler/marketing/issues/I1I7H3) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I7H3
    - [No.45 - 移植 libapparmor 到 openEuler 社区](https://gitee.com/openeuler/marketing/issues/I1I77C) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I77C
    - [No.51 - optee 移植到 openEuler](https://gitee.com/openeuler/marketing/issues/I1I8IS) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I8IS

13. 测试相关任务 - **建议测试专业的同学申请此类任务**

    测试类的任务难度较低，只要熟悉要测试的软件包，对 Linux 的基本操作比较熟悉就可报名参与。

    主要工作：

    - 分析软件包提供的功能/具体用户使用场景/发布命令及参数/提供服务/包使用资源消耗等方面
    - 进行相应的测试设计活动，如功能类/性能类/可靠性类等
    - 根据测试设计编写相应的测试代码和调试

    相关任务：

    - [No.69 - api-sanity-checker 与 oss-fuzz 测试结合的误报优化](https://gitee.com/openeuler/marketing/issues/I1IHNM) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IHNM
    - [No.34 - 对 openEuler 社区发布包 keepalived 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6CG) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6CG
    - [No.35 - 对 openEuler 社区发布包 kmod-kvdo 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6CY) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6CY
    - [No.36 - 对 openEuler 社区发布包 OpenVPN 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6D6) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6D6
    - [No.37 - 对 openEuler 社区发布包 lrzsz 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6EO) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6EO
    - [No.38 - 对 openEuler 社区发布包 ipvsadm 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6F2) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6F2
    - [No.39 - 对 openEuler 社区发布包 MongoDB 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6GM) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6GM
    - [No.40 - 对 openEuler 社区发布包 Redis 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6GW) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6GW
    - [No.41 - 对 openEuler 社区发布包 sssd 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6IK) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6IK
    - [No.42 - 对 openEuler 社区发布包 MySQL 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6IN) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6IN
    - [No.43 - 对 openEuler 社区发布包 rpcbind 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6JE) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6JE
    - [No.44 - 对 openEuler 社区发布包 haproxy 进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I6JI) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I6JI
    - [No.29 - 对openEuler社区发布包osc和obs-build进行加固测试](https://gitee.com/openeuler/marketing/issues/I1I5WZ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I5WZ

    14. AI、大数据相关任务 - **建议熟悉 AI 、大数据框架的同学申请此类任务**

    AI、大数据类的相关任务同测试相关任务类似，只要熟悉相关的软件，具有一定的 Linux 知识就可报名参与。

    任务列表：

    - [No.5 - 在 openEuler aarch64 架构上完成 PyTorch 基于公开数据集完成 mnist 训练过程](https://gitee.com/openeuler/marketing/issues/I1HR9C) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HR9C
    - [No.4 -在 openEuler aarch64 架构上完成 Tensorflow 基于公开数据集完成 mnist 训练过程](https://gitee.com/openeuler/marketing/issues/I1HR7W) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HR7W
    - [No.23 - 在 openEuler aarch64 架构上完成 Hadoop WordCount 统计过程](https://gitee.com/openeuler/marketing/issues/I1I290) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I290
    - [No.22 - 在 openEuler aarch64 架构上完成 mlpack 基于公开数据集完成 mnist 训练过程](https://gitee.com/openeuler/marketing/issues/I1I281) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I281
    - [No. 24 - 在 openEuler aarch64 架构上完成 Spark WordCount 统计过程](https://gitee.com/openeuler/marketing/issues/I1I29G) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I29G
    - [No.25 - 在 openEuler aarch64 架构上完成 Flink WordCount 统计过程](https://gitee.com/openeuler/marketing/issues/I1I2A0) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I2A0
    
15. Linux 系统相关任务 - **建议熟悉 Linux 系统的同学申请此类任务**

    Linux 系统相关任务涉及到 Linux 的方方面面，无法在此进行详解。需要申请的同学对 Linux 特定领域有深入的了解，同时具有一定的开发能力。

    任务列表：

    - [No.67 - 基于需求覆盖度判断的用例筛选方法（RBC，requirement-based coverage）探索及工程构建](https://gitee.com/openeuler/marketing/issues/I1IHGJ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IHGJ
    - [No.98 - 众核场景下OS基础设施机制线性度探索](https://gitee.com/openeuler/marketing/issues/I1IO7D) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IO7D
    - [No.97 - 优化glibc内存管理框架内容空洞导致内存占用不断增加的问题](https://gitee.com/openeuler/marketing/issues/I1IO19) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IO19
    - [No.96 - 优化nfs-utils锁以解决并发性能差问题](https://gitee.com/openeuler/marketing/issues/I1INR1) 任务链接 https://gitee.com/openeuler/marketing/issues/I1INR1
    - [No.95 - openEuler CPU 故障隔离](https://gitee.com/openeuler/marketing/issues/I1INPO) 任务链接 https://gitee.com/openeuler/marketing/issues/I1INPO
    - [No.102 - 内核态CR(Checkpoint and Restore )用户态应用程序](https://gitee.com/openeuler/marketing/issues/I1INPF) 任务链接 https://gitee.com/openeuler/marketing/issues/I1INPF
    - [No.94 - 实现API识别软件包依赖的功能](https://gitee.com/openeuler/marketing/issues/I1IMTI) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMTI
    - [No.90 - 基于Perf或eBPF对FUSE进行tracing分析](https://gitee.com/openeuler/marketing/issues/I1IMIA) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IMIA
    - [No.57 - 内核数据竞争检测工具](https://gitee.com/openeuler/marketing/issues/I1ICGN) 任务链接 https://gitee.com/openeuler/marketing/issues/I1ICGN
    - [No.71 - openEuler 不同系统间源码包成分信息比较](https://gitee.com/openeuler/marketing/issues/I1IHVG) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IHVG
    - [No.70 - openEuler 源码包成分提取、归档](https://gitee.com/openeuler/marketing/issues/I1IHUT) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IHUT
    - [No. 20 - LUTF - Linux Userspace Task Framework](https://gitee.com/openeuler/marketing/issues/I1I1RK) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I1RK
    - [No.60 - everything tool on openEuler](https://gitee.com/openeuler/marketing/issues/I1IELF) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IELF
    - [No. 19 - LSCA - Linux 系统调用代理](https://gitee.com/openeuler/marketing/issues/I1I1JR) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I1JR
    - [No. 18 - SVA （Share Virtual Address）引擎](https://gitee.com/openeuler/marketing/issues/I1I1D1) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I1D1
    - [No.17 - 库函数行为收集器](https://gitee.com/openeuler/marketing/issues/I1I06J) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I06J
    - [No.15 - 改进 openEuler-Advisor 来支持 openEuler 快速滚动升级](https://gitee.com/openeuler/marketing/issues/I1HXMV) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HXMV
    - [No.49 - 基于 openEuler 的 ABI 检查工具](https://gitee.com/openeuler/marketing/issues/I1HQSE) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HQSE
    - [No.47 - 开发 openEuler bootstrap 工具](https://gitee.com/openeuler/marketing/issues/I1HAXJ) 任务链接 https://gitee.com/openeuler/marketing/issues/I1HAXJ
    - [No.33 - 基于 Posix 接口的协程框架](https://gitee.com/openeuler/marketing/issues/I1I66U) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I66U
    - [No.32 - 系统资源负载预测框架](https://gitee.com/openeuler/marketing/issues/I1I64J) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I64J
    - [No.31 - Linux 内核 Crash 问题自动定位工具](https://gitee.com/openeuler/marketing/issues/I1I632) 任务链接 https://gitee.com/openeuler/marketing/issues/I1I632

16. 开源基础设施相关任务 - **建议具有基本开发能力的同学申请此类任务**

    本类任务需要社区内的同学具有基本的开发能力，对于开源过程中开发者体验有自己的想法和见解。

    - [No.53 - 为 openEuler 创建用户轨迹运营看板](https://gitee.com/openeuler/marketing/issues/I1IAOD) 任务链接 https://gitee.com/openeuler/marketing/issues/I1IAOD
    - [No.58 - 为 openEuler 提供 PR Preview 功能](https://gitee.com/openeuler/marketing/issues/I1ICRB) 任务链接 https://gitee.com/openeuler/marketing/issues/I1ICRB
    - [No.59 - 开源基础设施智能自检自愈系统](https://gitee.com/openeuler/marketing/issues/I1ICRK) 任务链接 https://gitee.com/openeuler/marketing/issues/I1ICRK
   