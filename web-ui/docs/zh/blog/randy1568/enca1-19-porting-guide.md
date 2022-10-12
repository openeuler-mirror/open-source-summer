---
title: enca 1.19 移植指南 （openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - enca
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the enca 1.19
---

# enca 1.19 移植指南 (openEuler 20.03 LTS SP1)

# 介绍

## 简要介绍

enca是一个实用的编码转换工具。本案例使用x86_64架构虚拟机，通过评估工具x2openEuler评估enca1.19软件移植到openEuler操作系统的兼容性，并根据评估结果完成软件移植。

开发语言：C

## 建议的版本

建议使用版本为enca 1.19.1。

> 说明:
> 本文档适用于enca 1.19.1，其他版本的enca移植步骤也可参考本文档。

# 环境要求

##  操作系统要求
| 操作系统 | 版本  |
|---|---|
| openEuler  | 20.03 LTS SP1 |
| CentOS  |  7.6 |

## 安装操作系统

   如果是全新安装操作系统，安装方式建议不要使用最小化安装，否则很多软件包需要手动安装，可选择“Server with GUI”安装方式。
安装openEuler操作系统请参考：https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html。

# 兼容性评估

评估工具：x2openEuler
评估环境：CentOS7.6

#### 下载x2openEuler工具

```
下载指引：https://www.openeuler.org/zh/other/migration/
```

#### 部署工具

```
rpm -ivh x2openEuler-2.0.0-1.x86_64.rpm
```

> 注意：安装rpm时需要使用root用户，且目前需要网络（用于下载安装依赖）
> 注意：根据提示安装依赖包如bzip2-devel等

```
su x2openEuler
x2openEuler redis-db -init
```

> 依次录入redis数据库的ip:127.0.0.1
> 端口：6379
> 数据库索引号（0-16）：0
> 密码（工具会对密码加密处理）：如果redis密码没有设置或者为空时，直接回车即可

```
x2openEuler init source_centos7.6-openEuler20.03-LTS-SP1.tar.gz
```

> 备注：x2openEuler使用rpm安装完成后会在/opt/x2openEuler目录下带有source_centos7.6-openEuler20.03-LTS-SP1.tar.gz这个默认资源包
> 需要支持centos8.2到openEuler20.03-LTS-SP1的评估，则需获取对应的静态资源包导入，如对应的资源包为source_centos8.2-openEuler20.03-LTS-SP1.tar.gz，导入此包命令：`x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz`，请示情况选择对应的资源包

#### 扫描软件

```
wget http://rpmfind.net/linux/epel/7/x86_64/Packages/e/enca-1.19-1.el7.x86_64.rpm
x2openEuler scan enca-1.19-1.el7.x86_64.rpm
注意要分析的移植文件需要有能够让x2openEuler用户可以读取的权限
扫描完成后会在/opt/x2openEuler/output目录生成html格式的报告
```

## 查看评估结果

软件兼容性评估报告分三块内容展示软件兼容性，分别是依赖包兼容性、C/C++接口兼容性、java接口兼容性，依赖包兼容性反映了软件包安装过程中的直接依赖，非100%表明无法正确安装；接口兼容性反映的是单个软件运行过程中对其他软件包、动态库或系统接口的调用变化，非100%表明在某个功能调用时可能会触发异常，未调用到时可能表现正常；部分结果建议人工复核，最终软件包使用建优先级建议 openEuler已移植包>openEuler上人工重编译包>centos软件包。

<img src="./image/enca-1.png">

结果：通过报告可知外部接口兼容性100%，依赖包兼容性人工复核后通过，经评估enca1.19软件包在openEuler 20.03 LTS SP1系统上兼容，可安装此软件包至openEuler 20.03 LTS SP1系统进行验证。

# RPM方式安装enca

1. 下载rpm包：http://rpmfind.net/linux/epel/7/x86_64/Packages/e/enca-1.19-1.el7.x86_64.rpm。
2. 上传至openEuler服务器。
    > 说明：
    > 若服务器可以访问网络，则可以直接在服务器上使用wget命令下载源码包。

3. 执行如下命令，安装enca。
```shell
    rpm -ivh enca-1.19-1.el7.x86_64.rpm
```

# 运行和验证

1. 执行如下命令，验证enca是否安装成功。
```shell
   enca --version 
```
2. 回显信息如下，则表示安装成功。
```shell
   enca 1.19
 
   Features: -librecode-interface +iconv-interface +external-converter +language-detection +locale-alias+
   target-charset-auto +ENCAOPT 
 
   Copyright (C) 2000-2005 David Necas (Yeti) (&lt;yeti@physics.muni.cz&gt;),
              2005 Zuxy Meng (&lt;zuxy.meng@gmail.com&gt;).
 
   Enca is free software; it can be copied and/or modified under the terms of
   version 2 of GNU General Public License, run `enca --license' to see the full
   license text.  There is NO WARRANTY; not even for MERCHANTABILITY or FITNESS
   FOR A PARTICULAR PURPOSE.
```

