---
title: "openEuler 20.03 LTS SP1 现已发布"
date: "2020-12-28"
tags:
    - release
banner: "img/banners/openeuler2003LTSSP1.png"
author: "openEuler"
summary: "openEuler 20.03 LTS SP1是openEuler 20.03 LTS 的补丁版本,欢迎体验。"
---

<ClientOnly>
  <news-newsHeader />
</ClientOnly>

<div class="markdown">

经过社区贡献者的共同努力，openEuler 正式发布了 **openEuler 20.03 LTS SP1** 版本。此版本是openEuler 20.03 LTS 的补丁版本，生命周期与LTS版本相同。在该版本的开发过程中社区贡献者总共修复了**306**个cve，新增软件包**1400**个。

### 下载地址
ISO 下载地址 [点击这里](https://repo.openeuler.org/openEuler-20.03-LTS-SP1/ISO/)

Raspberry IMG 下载地址 [点击这里](https://repo.openeuler.org/openEuler-20.03-LTS-SP1/raspi_img/aarch64/)

### 关键特性列表
-   iSula轻量级容器解决方案，统一IoT，边缘和云计算容器解决方案
    -   支持配置匿名卷，支持镜像配置匿名卷并支持本地卷的管理，方便用户使用卷管理功能
    -   isula-build 支持pull、push镜像功能，支持save多个镜像到一个tarball
-   A-Tune智能系统性能优化引擎，推理出业务特征，配置最佳的系统参数合，使业务处于最优运行状态。
    -   新增了增量式调优功能
    -   新增了敏感参数识别和过滤调优功能
    -   新增了虚拟机场景的调优能力
    -   支持一键式模型训练能力
-   支持多版本JDK版本，满足不同客户对兼容性，性能和功能的诉求
    -   操作系统现在提供方便的JDK多版本支持，方便用户部署多版本Java应用
    -   支持Java 11，详见[JDK 11](http://openjdk.java.net/projects/jdk/11/)
    -   支持TLS 1.3，提供安全性更高的安全协议
    -   支持Java Flight Recorder`，低性能损耗、高效率的Java应用诊断工具
    -   支持实验性质的低时延ZGC算法
    -   支持最新的STS（Short Term Support）版本，目前是JDK 15，详见[JDK 15](http://openjdk.java.net/projects/jdk/15/)
    -   支持`Pattern Matching for instanceof (Second Preview)`
    -   支持`生产级别的ZGC`
    -   支持`生产级别的Shenandoah GC`
    -   支持`Foreign-Memory Access API (Second Incubator)`
    -   支持`Records (Second Preview)`
-   内核特性增强
    -   支持华为1822 HBA卡驱动
    -   支持NVDIMM提升大数据等业务场景性能
    -   支持飞腾CPU FT2000+/64通用计算
    -   支持iscsi work线程按numa亲和性绑核，提升IO性能
    -   文件缓存percpu免锁优化，减少原子开销，提升并发访问文件性能，提升Nginx场景性能
-   虚拟化特性增强
    -   ARM虚拟化支持CPU/内存热插、提高资源配置灵活性
    -   使能KVM CPU可配置为custom模式（ARM），实现虚拟机测CPU feature的自定义配置
    -   运维工具VMTOP，支持虚拟机陷入陷出等性能指标快速采集
    -   虚拟化支持安全启动，提高虚拟机安全性
-   桌面支持
    -   UKUI麒麟操作系统的默认桌面环境
    -   DDE统信开发桌面系统
-   高可靠支持
    -   由pacemaker + corosync的高可用集群软件
-   硬件使能
    -   Raspberry Pi支持：Raspberry系列板卡支持

### 特别说明
<p>Python核心团队已经于2020年1月停止对Python 2的维护。2020年，openEuler 20.03 LTS SP1仅修复Python 2的致命CVE，并将于2020年12月31日全面停止维护。请您尽快切换到Python 3。</p>
</div>
