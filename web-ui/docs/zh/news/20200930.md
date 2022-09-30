---
title: "openEuler 20.09 如约而至"
date: "2020-09-30"
tags:
    - release
banner: "img/banners/openeuler2009.jpg"
author: "openEuler"
summary: "openEuler 20.09 如约而至"
---

<ClientOnly>
  <news-newsHeader />
</ClientOnly>

<div class="markdown">

# openEuler 20.09 如约而至

经过社区贡献者的共同努力，openEuler 正式发布了 **openEuler 20.09** 版本。根据版本计划，**openEuler 20.09** 版本属于创新版本而非 **LTS (Long Term Support)** 版本。该版本的 Linux Kernel 使用 **4.19.140** 版本，修复了自 20.03 版本发布以来发现的 CVE 漏洞。在该版本的开发过程中社区贡献者总共合并了 **11485** 个 Pull Request，SIG 组的数量也增加到了 **71** 个，覆盖了从云计算、云原生到桌面端等多个领域。同时社区开发者在 openEuler 20.09 版本中带来了众多的新特性，尤其是带来了全新的开源项目 **StratoVirt** ，它是一个安全、轻量、高性能、低损耗、组件化的面向全场景的通用化虚拟机运行时项目，同时 **iSula** 项目也发布了 **isula-build** 实现了镜像构建能力。

### 下载地址
ISO 下载地址 [点击这里](https://repo.openeuler.org/openEuler-20.09/ISO/)

Raspberry IMG 下载地址 [点击这里](https://repo.openeuler.org/openEuler-20.09/raspi_img/aarch64/)

### 新特性列表
- StratoVirt：
    - 采用 **Rust** 语言，支持 seccomp，支持多租户隔离，提供可信安全运行环境
    - 具备 **<50ms** 的启动性能，**<4M** 的内存底噪，极致性能和轻量，适用端、边、云等多样场景
    - X86 VT，鲲鹏 Kunpeng-V 等多体系硬件加速虚拟引擎支持
    - ms 级设备扩缩能力，为轻量化负载提供灵活的资源伸缩能力
    - 设备模型可扩展，支持 PCI 等复杂设备规范，兼容 QEMU 软件生态
    - 多种计算、网络，存储加速方案支持，异构算力灵活协同
- iSula
    - 优化启动和容器生命周期操作性能
    - 容器镜像构建工具 isula-build，提供了安全、快速的容器镜像构建能力
    - 支持虚拟机安全启动和可信启动，增强虚拟机安全性
- 虚拟化特性增强
    - 通过双层调度和 Hypervisor 感知 VM 调度，优化 VM 锁抢占，提升多核超分场景性能
    - 通过 Guest-Idle-Haltpoll 机制优化IPI中断性能，提升数据库业务性能
    - 针对 ARM 平台虚拟化特性，支持 CPU /内存热插、支持 KVM CPU 可配置为 custom 模式，提高资源配置灵活性
    - 运维工具 VMTOP，支持虚拟机陷入陷出等性能指标快速采集
    - PMU NMI watchdog 特性使能 hardlockup 检测
- 内核特性增强
    - IMA 商用增强: 在开源IMA方案基础上，增强安全性、提升性能、提高易用性，助力商用落地
    - NUMA Aware Qspinlock 支持：减少锁竞争跨 NUMA 的 Cache 同步和乒乓，提升系统性能
    - Ktask 并行化支持：内核任务并行化框架，支持内核任务并行化运行
    - MPAM 资源管控: ARM64 架构 Cache QoS 以及内存带宽控制技术
    - 内存系统锁优化：vmalloc 分配大锁优化、Pagecache 锁优化
- 编程语言和编译器
    - JDK8 增强：APPCDS 特性和 crc32 硬加速指令支持
    - GCC 优化：循环优化、自动矢量化、全局优化
- 硬件和芯片使能
    - Raspberry Pi支持：Raspberry 系列板卡支持
- 桌面支持
    - UKUI：麒麟操作系统的默认桌面环境，其布局、风格和使用习惯接近传统 Windows
- 智能运维
    - A-Tune：智能系统性能优化引擎，推理出业务特征，配置最佳的系统参数集合，使业务处于最优运行状态

</div>
