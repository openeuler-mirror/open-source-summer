---
title: Squid 4.8 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - Squid
    - Porting Case
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port Squid 4.8
---

# Squid 4.8 Porting Guide (openEuler 20.03 LTS SP1)

# Introduction

#### Squid Overview

Squid cache, or Squid for short, is a popular open-source proxy server and web cache server that runs on Unix systems, and released under GNU General Public License (GPL). Squid caches related requests as the frontend cache server of a web server to improve the speed of the web server, caches the World Wide Web, DNS, and other network searches for a group of people to share network resources, filters traffic to help ensure network security, and provides proxy access for a local area network. It has a long history of development and, with a rich function portfolio, can fit a wide scope of industry scenarios. In addition, it supports HTTP, FTP, and HTTPS, and IPv6 in the test version 3.0.  

Programming language: C++

Brief description: web proxy service and web cache server  

#### Recommended Version

Squid 4.8

Note: This document applies to Squid 4.8. You can also refer to this document when porting other Squid versions.  

# Environment Requirements

#### Hardware

| Item    | Description                         |
| -------- | ----------------------------- |
| Server  | TaiShan 200 server (model 2280)|
| CPU      | Kunpeng 920 5250 processor        |
| Memory     | 8 GB or more               |
| Drive partition| No requirements             |

#### Operating System

| Item      | Version                              |
| --------- | --------------------------------- |
| openEuler | openEuler 20.03 LTS SP1 AArch64  |
| Kernel    | 4.19.90-2003.4.0.0036.oe1.aarch64 |

#### OS Installation

For details, see [openEuler 20.03 LTS SP1 Installation Guide](https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/Installation/Installation.html).


#### Checking the Current System Information

```bash
[root@localhost ~]# cat /etc/os-release
NAME="openEuler"
VERSION="20.03 (LTS-SP1)"
ID="openEuler"
VERSION_ID="20.03"
PRETTY_NAME="openEuler 20.03 (LTS-SP1)"
ANSI_COLOR="0;31"
```

> Note:
> When installing the OS for the first time, select "Server with GUI" instead of "Minimal Install". Otherwise, you will need to install multiple software packages manually.

# Installing Squid

## Configuring the DNS Resolution File

```bash
[root@localhost ~]# echo "nameserver 114.114.114.114" >> /etc/resolv.conf
```

## Installing Dependencies

```bash
[root@localhost ~]# yum install gcc  libxml2-devel libcap-devel libtool-ltdl-devel perl* -y
```

## Compiling Source Code to Install Squid

### Obtain the Squid 4.8 source package.

```bash
[root@localhost ~]# cd /home
[root@localhost home]# wget http://www.squid-cache.org/Versions/v4/squid-4.8.tar.gz
```

### Install Squid 4.8.

```bash
[root@localhost home]# tar -xf squid-4.8.tar.gz
[root@localhost home]# cd squid-4.8
[root@localhost squid-4.8]# ./configure
[root@localhost squid-4.8]# make -j 64 && make install
[root@localhost squid-4.8]# chmod 777 /usr/local/squid/var/logs/
```

# Running and Verifying Squid

```bash
[root@localhost squid-4.8]# /usr/local/squid/sbin/squid
[root@localhost squid-4.8]# ps -ef |grep squid
root       79023       1  0 19:40 ?        00:00:00 /usr/local/squid/sbin/squid
nobody     79025   79023  0 19:40 ?        00:00:00 (squid-1) --kid squid-1
nobody     79026   79025  0 19:40 ?        00:00:00 (logfile-daemon) /usr/local/squid/var/logs/access.log
root       79028    1405  0 19:40 pts/0    00:00:00 grep --color=auto squid
```
