---
title: 下一代全场景虚拟化平台StratoVirt
date: 2020-09-25
tags:
  - Virt
archives: 2020-09
author: Xiaohe Yang, Zhigang Wang
summary: Introduction of StratoVirt
---

# openEuler重磅利器： StratoVirt下一代全场景虚拟化平台



**StratoVirt**是计算产业中面向云数据中心的企业级虚拟化平台，实现了一套架构统一支持虚拟机、容器、Serverless三种场景。StratoVirt在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。



## 为什么叫StratoVirt?



Strato， 取自stratosphere ，意指地球大气层中的平流层，寓意为保护openEuler平台上业务平稳运行的轻薄保护层。Strato承载了项目的愿景与未来： 轻量、灵活、 安全和完整的保护能力。

以Strato入名，同样代表着openEuler对推进下一代全场景虚拟化技术的繁荣、构建虚拟化关键技术竞争力，有着必胜的信心！




## 为什么需要StratoVirt？



在数据中心领域，虚拟化是资源隔离的重要手段，能以多种粒度提供安全的虚拟运行时环境。传统的虚拟化软件Qemu存在代码量庞大、CVE安全漏洞频出的问题，业界逐步演进出以Rust语言实现microVM形态的趋势。安全、轻量、高性能、低损耗，组件灵活拆分，全场景（数据中心、终端、边缘设备）通用的虚拟化技术是未来的趋势。 

作为华为自研的下一代全场景、性能领先的虚拟化平台，StratoVirt以极致轻量快速的特质、灵巧的组件配置能力，为轻量虚拟化场景注入澎湃动力，同时也为向标准虚拟化场景的演进提供了无限可能。



## StratoVirt优势

更轻、更快、更强！StratoVirt具有极大的行业竞争力， 在于

* 强安全性与隔离性
  * 采用内存安全语言Rust编写， 保证语言级安全性；
  * 基于硬件辅助虚拟化实现安全多租户隔离，并通过seccomp进一步约束非必要的系统调用，减小系统攻击面；
* 轻量低噪
  * 轻量化场景下冷启动时间<50ms，内存底噪<4M；
* 高速稳定的IO能力
  * 具有精简的设备模型，并提供了稳定高速的IO能力；
* 资源伸缩
  * 具有ms级别的设备伸缩时延，为轻量化负载提供灵活的资源伸缩能力；
* 全场景支持
  * 完美支持X86和Arm平台：X86支持VT，鲲鹏支持Kunpeng-V，实现多体系硬件加速； 
  * 可完美集成于容器生态，与Kubernetes生态完美对接，在虚拟机、容器和serverless场景有广阔的应用空间；
* 扩展性
  * 架构设计完备，各个组件可灵活地配置和拆分；
  * 设备模型可扩展，可扩展PCIe等复杂设备规范，实现标准虚拟机演进； 



## StratoVirt架构

<img src="./StratoVirt-arch.png" style="zoom:67%;" />



麻雀虽小，五脏俱全。StratoVirt核心架构自顶向下分为三层：

* OCI兼容接口：兼容qmp协议，具有完备的OCI兼容能力。
* BootLoader：抛弃传统的BIOS + GRUB启动模式， 实现了更轻更快的BootLoader，并达到极限启动时延。
* MicroVM：充分利用软硬协同能力；精简化设备模型；低时延资源伸缩能力；



## StratoVirt未来

StratoVirt的发展路标为， 通过一套架构，支持轻量虚拟机和标准虚拟机两种模式：

* 轻量虚拟机模式下，单虚机内存底噪小于4MB，启动时间小于50ms，且支持ms级时延的设备极速伸缩能力，当前已经开发完毕，2020年9月已经在openEuler社区开源；
* 标准虚拟机模式下，可支持完整的机器模型，启动标准内核镜像，可以达成Qemu的能力，同时在代码规模和安全性上有较大优势。 





## 关注我们

目前StratoVirt已经在openEuler社区开源，期待你的围观和加入！

项目地址：https://gitee.com/openeuler/stratovirt