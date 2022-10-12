---
title: Tengine 2.2.2 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - Tengine
    - Porting Case
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything of the tengine 2.2.2 porting case
---

# Tengine 2.2.2 移植指南

# 介绍

#### 简要介绍

Tengine是由淘宝网发起的Web服务器项目。它在Nginx的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。它的目的是打造一个高效、安全的Web平台。

开发语言：C

一句话描述：轻量级Web服务器


#### 建议的版本

建议使用版本为“Tengine 2.2.2”。

> 说明：
> 本文档适用于Tengine 2.2.2，其他版本的Tengine移植步骤也可参考本文档。

# 环境要求

#### 硬件要求

| 项目     | 说明                          |
| -------- | ----------------------------- |
| 服务器   | TaiShan 200服务器（型号2280） |
| CPU      | 鲲鹏920 5250处理器            |
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

# 安装Tengine

## 配置dns解析文件

```bash
[root@localhost ~]# echo "nameserver 114.114.114.114" >> /etc/resolv.conf
```

## 安装依赖包

```bash
[root@localhost ~]# yum install gcc gcc-c++ make libtool zlib zlib-devel pcre pcre-devel perl-devel perl-ExtUtils-Embed wget vim -y
```

## 镜像站RPM方式安装tengine

> 说明：
> 镜像站中的RPM包都是通过开源代码编译打包而成，然后将其上传到镜像站。

### 获取Tengine 2.2.2的RPM包。

```bash
[root@localhost ~]# cd /home
[root@localhost home]# wget https://mirrors.huaweicloud.com/kunpeng/yum/el/7/aarch64/Packages/web/tengine-2.2.2-1.el7_4.ngx.aarch64.rpm
```

### 兼容性评估

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
x2openEuler scan tengine-2.2.2-1.el7_4.ngx.aarch64.rpm
注意要分析的移植文件需要有能够让x2openEuler用户可以读取的权限
扫描完成后会在/opt/x2openEuler/output目录生成html格式的报告
```

## 查看评估结果

软件兼容性评估报告分三块内容展示软件兼容性，分别是依赖包兼容性、C/C++接口兼容性、java接口兼容性，依赖包兼容性反映了软件包安装过程中的直接依赖，非100%表明无法正确安装；接口兼容性反映的是单个软件运行过程中对其他软件包、动态库或系统接口的调用变化，非100%表明在某个功能调用时可能会触发异常，未调用到时可能表现正常；部分结果建议人工复核，最终软件包使用建优先级建议 openEuler已移植包>openEuler上人工重编译包>centos软件包。

<img src="./image/tengine-1.png">

结果：通过报告可知外部接口兼容性100%，依赖包兼容性人工复核后通过，经评估tengine2.2.2软件包在openEuler 20.03 LTS SP1系统上兼容，可安装此软件包至openEuler 20.03 LTS SP1系统进行验证。

### 安装Tengine

```bash
[root@localhost home]# rpm -ivh tengine-2.2.2-1.el7_4.ngx.aarch64.rpm
Verifying...                          ################################# [100%]
Preparing...                          ################################# [100%]
Updating / installing...
   1:tengine-1:2.2.2-1.el7_4.ngx      ################################# [100%]
```


### 查看安装目录。

```bash
[root@localhost home]# cd /usr/local/tengine-nginx/
[root@localhost tengine-nginx]# ls
conf  html  include  logs  modules  sbin
```


# 运行和验证

## 配置HTTPS功能

### 生成证书

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

## 配置Tengine

```bash
vim /usr/local/tengine-nginx/conf/nginx.conf
```

修改如下内容

```
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    <== 修改这里： 证书位置 ==>
    #    ssl_certificate      /usr/local/tengine-nginx/server_2048.crt;
    #    ssl_certificate_key  /usr/local/tengine-nginx/server_2048.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
```


## 运行Tengine

```bash
[root@localhost tengine-nginx]# /usr/local/tengine-nginx/sbin/nginx -c /usr/local/tengine-nginx/conf/nginx.conf
[root@localhost tengine-nginx]# ps -ef | grep nginx
root        5710       1  0 17:25 ?        00:00:00 nginx: master process /usr/local/tengine-nginx/sbin/nginx -c /usr/local/tengine-nginx/conf/nginx.conf
nobody      5711    5710  0 17:25 ?        00:00:00 nginx: worker process
root        5713    1407  0 17:25 pts/0    00:00:00 grep --color=auto nginx
```

提示：

- 报`http upstream check_shm_size is too small`错误

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