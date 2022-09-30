---
title: Tengine 2.2.2 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - Tengine
    - Porting Case
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port Tengine 2.2.2.
---

# Tengine 2.2.2 Porting Guide

# Introduction

#### Overview

Tengine is a web server project initiated by Taobao. Tengine provides many advanced functions and features based on Nginx to meet the requirements of websites with large access traffic. It aims to build an efficient and secure web platform.

Programming language: C

Brief description: lightweight web server


#### Recommended Version

Tengine 2.2.2

NOTE: This document applies to Tengine 2.2.2. However, you can refer to this document when porting other Tengine versions.

# Environment Requirements

#### Hardware

| Item    | Description                         |
| -------- | ----------------------------- |
| Server  | TaiShan 200 server (model 2280)|
| CPU      | Kunpeng 920 5250 processor           |
| Drive partition| No requirements             |

#### Operating System

| Item      | Version:                              |
| --------- | --------------------------------- |
| openEuler | openEuler 20.03 LTS SP1 AArch64 |
| Kernel    | 4.19.90-2003.4.0.0036.oe1.aarch64 |

#### Installing the OS

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

> NOTE:
> When installing the OS for the first time, select "Server with GUI" instead of "Minimal Install". Otherwise, lots of software packages need to be installed manually.

# Installing Tengine

## Configuring the DNS Resolution File

```bash
[root@localhost ~]# echo "nameserver 114.114.114.114" >> /etc/resolv.conf
```

## Installing Dependencies

```bash
[root@localhost ~]# yum install gcc gcc-c++ make libtool zlib zlib-devel pcre pcre-devel perl-devel perl-ExtUtils-Embed wget vim -y
```

## Obtaining Tengine RPM from the Mirror Site

> Note:
> The RPM packages in the mirror site are compiled and packaged using open-source code, and then uploaded to the mirror site.

### Obtaining the RPM Package of Tengine 2.2.2.

```bash
[root@localhost ~]# cd /home
[root@localhost home]# wget https://mirrors.huaweicloud.com/kunpeng/yum/el/7/aarch64/Packages/web/tengine-2.2.2-1.el7_4.ngx.aarch64.rpm
```

### Evaluating Compatibility

#### Downloading the Tool

```
wget https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/stable/contrib/x2openEuler/noarch/Packages/x2openEuler-1.0-1.noarch.rpm

User guide:
https://gitee.com/openeuler/docs/blob/stable2-20.03_LTS_SP1/docs/zh/docs/thirdparty_migration/x2openEuleruseguide.md
```

#### Deploying the Tool

```
rpm -ivh x2openEuler-1.0-1.noarch.rpm
```

> NOTE: Install the RPM package as the root user. Currently, the network is required for downloading and installing dependencies.
> NOTE: Install dependencies such as **bzip2-devel** as prompted.

```
su x2openEuler
x2openEuler redis-db -init
```

> Enter the following information about the Redis database in sequence. 
> IP address: 127.0.0.1
> Port: 6379
> Database index (0-16): 0
> Password (encrypted by the tool): If the Redis password is not set or is empty, press **Enter**.

```
x2openEuler init source_centos7.6-openEuler20.03-LTS-SP1.tar.gz
```

> Note: After x2openEuler is installed using an RPM package, the default resource package (source_centos7.6-openEuler20.03-LTS-SP1.tar.gz) is generated in the **/opt/x2openEuler** directory.
> To support the evaluation of hardware compatibility between CentOS 8.2 and openEuler 20.03 LTS SP1, you need to obtain and import the corresponding static resource package. For example, if the resource package is **source_centos8.2-openEuler20.03-LTS-SP1.tar.gz**, run **x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz** to import the package.

#### Scanning the Software

```
x2openEuler scan tengine-2.2.2-1.el7_4.ngx.aarch64.rpm
The x2openEuler user must have the read permission on the file to be analyzed.
After the scan is complete, an HTML report is generated in the /opt/x2openEuler/output directory.
```

## Viewing Evaluation Results

The software compatibility evaluation report consists of three parts: dependency compatibility, C/C++ interface compatibility, and Java interface compatibility. Dependency compatibility reflects the required direct dependencies during software installation. If the dependency compatibility is not 100%, the installation fails. Interface compatibility reflects the calling of other software packages, dynamic libraries, or system interfaces during the running of the software. If the interface compatibility is not 100%, an exception may be triggered when a certain function is called. Manual confirmation is recommended for some results. The priority of software packages is as follows: packages that have been ported to openEuler > manually recompiled packages for openEuler > packages for CentOS.

<img src="./image/tengine-1.png">

Result: The report shows that the external interface compatibility is 100%. The dependency package compatibility passes the manual review. The Tengine 2.2.2 software package is compatible with the openEuler 20.03 LTS SP1.

### Installing Tengine

```bash
[root@localhost home]# rpm -ivh tengine-2.2.2-1.el7_4.ngx.aarch64.rpm
Verifying...                          ################################# [100%]
Preparing...                          ################################# [100%]
Updating / installing...
   1:tengine-1:2.2.2-1.el7_4.ngx      ################################# [100%]
```


### Viewing the Installation Directory

```bash
[root@localhost home]# cd /usr/local/tengine-nginx/
[root@localhost tengine-nginx]# ls
conf  html  include  logs  modules  sbin
```


# Running and Verifying Tengine

## Configuring HTTPS

### Generating a Certificate

```bash
[root@localhost tengine-nginx]# openssl genrsa -des3 -out server_2048.key 2048
Generating RSA private key, 2048 bit long modulus (2 primes)
...................................+++++
..................+++++
e is 65537 (0x010001)
Enter pass phrase for server_2048.key:
Verifying - Enter pass phrase for server_2048.key:
[root@localhost tengine-nginx]# openssl rsa -in server_2048.key -out server_2048.key
Enter pass phrase for server_2048.key:
writing RSA key
[root@localhost tengine-nginx]# openssl req -new -key server_2048.key -out server_2048.csr
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
[root@localhost tengine-nginx]# openssl rsa -in server_2048.key -out server_2048.key
writing RSA key
[root@localhost tengine-nginx]# openssl x509 -req -days 365 -in server_2048.csr -signkey server_2048.key -out server_2048.crt
Signature ok
subject=C = CN, ST = Some-State, O = Internet Widgits Pty Ltd
Getting Private key
[root@localhost tengine-nginx]# ls
conf  html  include  logs  modules  sbin  server_2048.crt  server_2048.csr  server_2048.key
```

## Configuring Tengine

```bash
vim /usr/local/tengine-nginx/conf/nginx.conf
```

Modify the following contents:

```
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    
    #    ssl_certificate      /usr/local/tengine-nginx/server_2048.crt;
    #    ssl_certificate_key  /usr/local/tengine-nginx/server_2048.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
```


## Running Tengine

```bash
[root@localhost tengine-nginx]# /usr/local/tengine-nginx/sbin/nginx -c /usr/local/tengine-nginx/conf/nginx.conf
[root@localhost tengine-nginx]# ps -ef | grep nginx
root        5710       1  0 17:25 ?        00:00:00 nginx: master process /usr/local/tengine-nginx/sbin/nginx -c /usr/local/tengine-nginx/conf/nginx.conf
nobody      5711    5710  0 17:25 ?        00:00:00 nginx: worker process
root        5713    1407  0 17:25 pts/0    00:00:00 grep --color=auto nginx
```

Hints:

- The `http upstream check_shm_size is too small` error is reported.

```bash
[root@localhost tengine-nginx]# /usr/local/tengine-nginx/sbin/nginx -c /usr/local/tengine-nginx/conf/nginx.conf
nginx: [crit] ngx_slab_alloc() failed: no memory
nginx: [emerg] http upstream check_shm_size is too small, you should specify a larger size.
[root@localhost tengine-nginx]#
[root@localhost tengine-nginx]# sed -i "/http {/a\check_shm_size 50m;" /usr/local/tengine-nginx/conf/nginx.conf
[root@localhost tengine-nginx]# /usr/local/tengine-nginx/sbin/nginx -c /usr/local/tengine-nginx/conf/nginx.conf
[root@localhost tengine-nginx]# ps -ef | grep nginx
root        5710       1  0 17:25 ?        00:00:00 nginx: master process /usr/local/tengine-nginx/sbin/nginx -c /usr/local/tengine-nginx/conf/nginx.conf
nobody      5711    5710  0 17:25 ?        00:00:00 nginx: worker process
root        5713    1407  0 17:25 pts/0    00:00:00 grep --color=auto nginx
```
