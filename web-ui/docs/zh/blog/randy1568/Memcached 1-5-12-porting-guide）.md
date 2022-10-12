---
title: Memcached 1.5.12 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - Memcached
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the Memcached 1.5.12
---

# Memcached 1.5.12 移植指南

## 介绍

#### 简要介绍

Memcached是LiveJournal旗下Danga Interactive公司以Brad Fitzpatric为首开发的一款高性能分布式内存对象缓存系统，通过缓存数据库查询结果，减少数据库访问次数，来提高动态Web应用的访问速度、提高可扩展性。

Memcached的官方链接：https://memcached.org/

开发语言：C

一句话描述：分布式内存对象缓存系统

## 环境要求

#### 硬件要求

硬件要求如下表所示。

| 项目     | 说明                          |
| -------- | ----------------------------- |
| 服务器   | TaiShan 200服务器（型号2280） |
| CPU      | 鲲鹏920 5250处理器            |
| 磁盘分区 | 对磁盘分区无要求              |

#### 操作系统要求

操作系统要求如下表所示。

| 项目      | 版本                  |
| --------- | --------------------- |
| openEuler | 20.03 LTS SP1 aarch64 |
| Kernel    | 4.19                  |

查询当前系统版本信息

```
cat /etc/os-release
```

<img src="./image/Memcached-1.jpeg">

安装openEuler操作系统，请参考https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html      
说明：
安装方式建议选择“Server with GUI”安装方式。

## 配置编译环境

编译Memcached需要准备C编译器、GNU、make、automake、libevent和libevent-devel。

1. 安装gcc，已安装则跳过

   ```bash
   yum -y install gcc gcc-c++ kernel-devel 
   ```

2. 安装GNU make和automake、unzip、telnet，已安装则跳过

   ```bash
   yum -y install make automake unzip telnet
   ```

3. 安装libevent和libevent-devel

   ```bash
   yum -y install libevent libevent-devel
   ```

## 获取源码

若您的服务器可以访问网络，执行 wget https://github.com/memcached/memcached/archive/1.5.12.zip 命令下载源码。否则，请访问 https://github.com/memcached/memcached/archive/1.5.12.zip 下载源码并复制到服务器“/home”目录。

## 编译和安装

以本地下载源码并上传到服务器为例说明编译和安装操作

1. 解压源码包

   ```bash
   cd /home
   ```

   ```bash
   unzip 1.5.12.zip
   ```

2. 进入“memcached-1.5.12”目录

   ```bash
   cd memcached-1.5.12
   ```

3. 配置Memcached

   ```bash
   sh autogen.sh
   ```

   ```bash
   ./configure --prefix=/opt/memcached
   ```

   可在该步骤指定Memcached安装目录，例如本文指定安装在“/opt/memcached”目录下。

4. 执行编译

   ```bash
   make -j60
   ```

   -j60参数充分利用多核CPU优势，加快编译速度。  

5. 执行安装

   ```bash
   make install
   ```

6. 进入指定的Memcached安装目录“/opt/memcached”，若生成的“bin”目录中出现“memcached”可执行文件，说明编译安装完成

7. 配置环境变量

   a. 将以下命令添加至“/etc/profile”文件中  

   ```bash
   export PATH=/opt/memcached/bin/:$PATH
   ```

   b. 使环境变量生效  

   ```bash
   source /etc/profile
   ```

## 运行和验证

- 使用命令启动

  ```bash
  memcached -t 24 -p 11211 -u root -m 49152 -c 10240
  ```

  启动命令参数说明如下表所示。

| 命令参数 | 说明                                  | 默认值                     |
| -------- | ------------------------------------- | -------------------------- |
| -t       | 线程数。                              | 4                          |
| -p       | 监测的TCP端口。                       | 11211                      |
| -u       | 指定用户启动。                        | 默认不能用root用户启动进程 |
| -m       | 分配给Memcached的内存大小。单位：MB。 | 64M                        |
| -c       | 最大并发连接数。                      | 1024                       |
| -d       | 后台启动一个守护进程。                | -                          |

- 另外启动一个Shell窗口，连接到Memcached

  ```bash
  telnet 127.0.0.1 11211
  ```

- 创建连接之后，可使用stats命令获取到Memcached服务端的统计信息

  ```bash
  stats
  ```

  <img src="./image/Memcached-2.jpeg">

常用的stats命令如[下表](https://support.huaweicloud.com/prtg-kunpengwebs/kunpengmemcached_02_0006.html#kunpengmemcached_02_0006__table1896316817714)所示。

   

| 命令            | 功能                                                         |
| --------------- | ------------------------------------------------------------ |
| stats           | 显示Memcached总体状态信息，包括启动时间、存储数据量、缓存命中率、当前连接数等。 |
| stats items     | 输出各个slab中item的信息。                                   |
| stats slabs     | 输出更详细的slab信息。                                       |
| stats sizes     | 显示所有item的大小和个数。                                   |
| stats cachedump | 导出下的数据，是输出个数，若传入0则输出该slab下所有数据。    |
| stats detail    | 设置（on/off）或显示（dump）详细操作记录，如get/set操作。    |
| flush_all       | 使内存中所有item失效，该操作并不会暂停服务端，因为不会真正释放内存空间，而是将现有item标记为失效状态。 |

   说明：
   如需退出Telnet连接可执行**quit**命令。

   ```bash
   quit
   ```

除Telnet连接Memcached服务获取数据信息以外，源码中还提供了一些工具脚本，可以直接使用，如memcached-tool，位于源码中的scripts目录下。

memcached-tool的使用方法如[下表](https://support.huaweicloud.com/prtg-kunpengwebs/kunpengmemcached_02_0006.html#kunpengmemcached_02_0006__table15821759181818)所示。



| 命令                                         | 功能                     |
| -------------------------------------------- | ------------------------ |
| ./memcached-tool localhost display           | 显示slabs信息            |
| ./memcached-tool 10.0.0.5:11211 display      | 显示slabs信息            |
| ./memcached-tool 10.0.0.5:11211 stats        | 显示Memcached统计信息    |
| ./memcached-tool 10.0.0.5:11211 settings     | 显示Memcached设置信息    |
| ./memcached-tool 10.0.0.5:11211 sizes        | 显示items的大小和个数    |
| ./memcached-tool 10.0.0.5:11211 dump [limit] | 导出缓存中的Keys和Values |