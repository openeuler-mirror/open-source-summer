---
title: Squid 4.8 移植指南 （openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - Squid
    - Porting Case
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything of the Squid 4.8 Porting Case
---

# Squid 4.8 移植指南（openEuler 20.03 LTS SP1）

# 介绍

#### 简要介绍

Squid cache（简称为Squid）是一个流行的代理服务器和Web缓存服务器，是一个开源软件（GNU通用公共许可证）。Squid有广泛的用途，从作为网页服务器的前置cache服务器缓存相关请求来提高Web服务器的速度，到为一组人共享网络资源而缓存万维网，域名系统和其他网络搜索，到通过过滤流量帮助网络安全，到局域网通过代理上网。Squid主要设计用于在Unix一类系统运行。Squid的发展历史相当悠久，功能也相当完善。除了HTTP外，对于FTP与HTTPS的支持也相当好，在3.0测试版中也支持了IPv6。

开发语言：C++

一句话描述：Web 代理服务、Web缓存服务器

#### 建议的版本

建议使用版本为“Squid 4.8”。

> 说明：
> 本文档适用于Squid 4.8，其他版本的Squid移植步骤也可参考本文档。

# 环境要求

#### 硬件要求

| 项目     | 说明                          |
| -------- | ----------------------------- |
| 服务器   | TaiShan 200服务器（型号2280） |
| CPU      | 鲲鹏920 5250处理器         |
| 内存      | 内存 >= 8G                |
| 磁盘分区 | 对磁盘分区无要求              |

#### 操作系统要求

| 项目       | 版本                               |
| --------- | --------------------------------- |
| openEuler | openEuler 20.03 LTS SP1 aarch64   |
| Kernel    | 4.19.90-2003.4.0.0036.oe1.aarch64 |

#### 安装操作系统

请参考：[20.03 LTS SP1 安装指南](https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html)


#### 检查当前系统版本信息

```bash
[root@localhost ~]# cat /etc/os-release
NAME="openEuler"
VERSION="20.03 (LTS-SP1)"
ID="openEuler"
VERSION_ID="20.03"
PRETTY_NAME="openEuler 20.03 (LTS-SP1)"
ANSI_COLOR="0;31"
```

> 说明：
> 如果是全新安装操作系统，安装方式建议不要使用最小化安装，否则很多软件包需要手动安装，可选择“Server with GUI”安装方式。

# 安装Squid

## 配置dns解析文件

```bash
[root@localhost ~]# echo "nameserver 114.114.114.114" >> /etc/resolv.conf
```

## 安装依赖包

```bash
[root@localhost ~]# yum install gcc  libxml2-devel libcap-devel libtool-ltdl-devel perl* -y
```

## 源码编译安装Squid

### 获取Squid 4.8的源码包。

```bash
[root@localhost ~]# cd /home
[root@localhost home]# wget http://www.squid-cache.org/Versions/v4/squid-4.8.tar.gz
```

### 安装Squid 4.8。

```bash
[root@localhost home]# tar -xf squid-4.8.tar.gz
[root@localhost home]# cd squid-4.8
[root@localhost squid-4.8]# ./configure
[root@localhost squid-4.8]# make -j 64 && make install
[root@localhost squid-4.8]# chmod 777 /usr/local/squid/var/logs/
```

# 运行和验证

```bash
[root@localhost squid-4.8]# /usr/local/squid/sbin/squid
[root@localhost squid-4.8]# ps -ef |grep squid
root       79023       1  0 19:40 ?        00:00:00 /usr/local/squid/sbin/squid
nobody     79025   79023  0 19:40 ?        00:00:00 (squid-1) --kid squid-1
nobody     79026   79025  0 19:40 ?        00:00:00 (logfile-daemon) /usr/local/squid/var/logs/access.log
root       79028    1405  0 19:40 pts/0    00:00:00 grep --color=auto squid
```