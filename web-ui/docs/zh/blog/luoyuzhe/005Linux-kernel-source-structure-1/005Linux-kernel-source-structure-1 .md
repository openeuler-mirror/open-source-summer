---
title: 第五期Linux内核源码结构-1
date: 2020-08-06
tags:
    - Linux
    - 内核
    - 源码
archives: 2020-08
author: 罗宇哲
summary: Linux内核源码结构-1
---

 _作者：罗宇哲，中国科学院软件研究所智能软件研究中心_ 

在上一期中，我们介绍了Linux内核发展的历史，也介绍了与其相关的UNIX和GNU的相关知识。从这一期开始，我们将介绍Linux内核的源码结构。我们将先根据Linux源码的目录结构进行分析，到本文章发布前，Linux 4.19的最新版本为Linux 4.19.94，我们将依据openEuler开源社区源码并参考Linux 4.19.94版内核源码进行分析。

### 一、Linux内核源码的目录结构分析

下图列出了截至文章发表前openEuler开源社区kernel目录下的目录结构[5]：

<img src="./Directory-structure-1.png">

<img src="./Directory-structure-2.png">

<img src="./Directory-structure-3.png">

其中各个文件夹中**源代码的功能**如下表所示[1][3]：

| **目录/文件名**  | **源码功能简介**                                             |
| ---------------- | ------------------------------------------------------------ |
| `/Documentation` | 说明文档，对每个目录的具体作用进行说明。                     |
| `/arch`          | 不同CPU架构下的核心代码。其中的每一个子目录都代表Linux支持的CPU架构。 |
| `/block`         | 块设备通用函数。                                             |
| `/certs`         | 与证书相关。                                                 |
| `/crypto`        | 常见的加密算法的C语言实现代码，譬如crc32、md5、sha1等。      |
| `/drivers`       | 内核中所有设备的驱动程序，其中的每一个子目录对应一种设备驱动。 |
| `/include`       | 内核编译通用的头文件。                                       |
| `/init`          | 内核初始化的核心代码。                                       |
| `/ipc`           | 内核中进程间的通信代码。                                     |
| `/kernel`        | 内核的核心代码，此目录下实现了大多数Linux系统的内核函数。与处理器架构相关的内核代码在`/kernel/$ARCH/kernel`。 |
| `/lib`           | 内核共用的函数库，与处理器架构相关的库在`/kernel/$ARCH/lib`。 |
| `/mm`            | 内存管理代码，譬如页式存储管理内存的分配和释放等。与具体处理器架构相关的内存管理代码位于`/arch/$ARCH/mm`目录下。 |
| `/net`           | 网络通信相关代码。                                           |
| `/samples`       | 示例代码。                                                   |
| `/scripts`       | 用于内核配置的脚本文件，用于实现内核配置的图形界面。         |
| `/security`      | 安全性相关的代码。                                           |
| `/sound`         | 与音频有关的代码，包括与音频有关的驱动程序[2]。              |
| `/tools`         | Linux中的常用工具。                                          |
| `/usr`           | 该目录中的代码为内核尚未完全启动时执行用户空间代码提供了支持。 |
| `/virt`          | 此文件夹包含了虚拟化代码，它允许用户一次运行多个操作系统。   |
| `COPYING`        | 许可和授权信息。                                             |
| `CREDITS`        | 贡献者列表。                                                 |
| `Kbuild`         | 内核设定脚本，可以对内核中的变量进行设定。                   |
| `Kconfig`        | 配置哪些文件编译，那些文件不用编译[4]。                      |
| `Makefile`       | 该文件将编译参数、编译所需的文件和必要的信息传给编译器。     |

### 二、结语

本期我们根据openEuler的目录，并参考Linux目录结构简要介绍了openEuler kernel中各个子目录的功能，下一期我们将结合Linux 内核的Kernel Map介绍**Linux内核的基本功能和抽象层级**。

参考文献

[1] https://www.cnblogs.com/CaesarTao/p/10600462.html

[2] http://blog.chinaunix.net/uid-30374564-id-5571674.html

[3] https://blog.csdn.net/wangyachao0803/article/details/81380882

[4] https://blog.csdn.net/jianwen_hi/article/details/53398141

[5] https://gitee.com/openeuler/kernel