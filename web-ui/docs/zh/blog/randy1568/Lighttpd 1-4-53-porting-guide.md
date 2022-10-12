---
title: Lighttpd 1.4.53 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - Lighttpd
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the Lighttpd 1.4.53
---

# Lighttpd 1.4.53 移植指南（openEuler 20.03 LTS SP1）

# 介绍

## 简要介绍

Lighttpd 是开源Web服务器软件，其根本的目的是提供一个专门针对高性能网站，安全、快速、兼容性好并且灵活的Web Server环境。具有非常低的内存开销、CPU占用率低、效能好以及丰富的模块等特点。

Lighttpd是众多OpenSource轻量级的Web Server中较为优秀的一个。支持FastCGI，CGI，Auth，输出压缩(output compress)，URL重写，Alias等重要功能；而Apache之所以流行，很大程度也是因为功能丰富，在Lighttpd上很多功能都有相应的实现了，这点对于Apache的用户是非常重要的，因为迁移到Lighttpd就必须面对这些问题。

开发语言：C

一句话描述：Web 服务器

## 建议的版本

建议使用版本为“Lighttpd 1.4.53”。

# 环境要求

## 硬件要求

###硬件要求如下所示。

|项目|说明|
|-----|-----|
|服务器 |TaiShan 200服务器（型号2280）|
|CPU|鲲鹏920 5250处理器|
|磁盘分区|对磁盘分区无要求|

## 操作系统要求

操作系统要求如下所示。

项目 | 版本
----- | -----
openEuler | 20.03 sp1 aarch64
Kernel | 4.19

说明：

    如果是全新安装操作系统，安装方式建议不要使用最小化安装，否则很多软件包需要手动安装，可选择“Server with GUI”安装方式。

# 配置编译环境

1. 安装依赖库

 yum -y install gcc gcc-c++ glib2-devel pcre-devel bzip2-devel zlib-devel gamin-devel

3. 获取源码

 下载地址：https://download.lighttpd.net/lighttpd/releases-1.4.x/lighttpd-1.4.53.tar.gz

## 配置安装

```
cp lighttpd-1.4.53.tar.gz $HOME &amp;&amp; cd $HOME
tar xzvf lighttpd-1.4.53.tar.gz
```

## 编译安装

```
cd lighttpd-1.4.53
./configure  --prefix=/usr/local/lighttpd  --with-fam
make -j60 &amp;&amp; make install
```

说明：

 --prefix=PATH：指定Lighttpd的安装目录。
 --with-fam：fam 用于减少stat()函数调用次数。


# 参数配置

## 创建软件目录

```
cd /usr/local/lighttpd/
mkdir log webpages cache config
```

## 拷贝配置文件/目录

```
cp $HOME/lighttpd-1.4.53/doc/config/lighttpd.conf  /usr/local/lighttpd/config/
cp $HOME/lighttpd-1.4.53/doc/config/modules.conf   /usr/local/lighttpd/config/
cp $HOME/lighttpd-1.4.53/doc/config/conf.d         /usr/local/lighttpd/config/ -r
```

说明：

 Lighttpd安装后的安装路径下只有三个文件夹 lib，sbin和share，其他文件需要自己拷贝和创建。

## 修改lighttpd.conf

```
vi /usr/local/lighttpd/config/lighttpd.conf

```

修改第16-20行为：

```
var.log_root       =   &quot;/usr/local/lighttpd/log&quot;
var.server_root    =   &quot;/usr/local/lighttpd&quot;
var.state_dir      =   &quot;/usr/local/lighttpd&quot;
var.home_dir       =   &quot;/usr/local/lighttpd&quot;
var.conf_dir       =   &quot;/usr/local/lighttpd/config&quot;
```

修改第61行为：

```
var.cache_dir      =   &quot;/usr/local/lighttpd/cache&quot;
```

第93行加注释：

```
#server.use-ipv6 = &quot;enable&quot;
```

修改第104-105行（该项为操作权限，不建议使用root）为：

```
server.username  =  &quot;lighttpd1&quot;
server.groupname  =  &quot;lighttpd&quot;
```

修改第115行（访问页面存放路径）为：

```
server.document-root  =  server_root + &quot;webpages&quot;
```

修改第246行（缓存模式，默认为simple，官方解释fam要优于simple）为：

```
server.stat-cache-engine = &quot;fam&quot;
```

在第182行添加如下内容（该项为配置多进程模式，Lighttpd默认单进程,数值可根据实际需求修改） ：

```
server.max-worker = 4
```

## 创建用户组

```
groupadd  lighttpd
useradd -g lighttpd  lighttpd1
```

## 修改权限

```
chown lighttpd1  /usr/local/lighttpd/log
```

## 添加测试页面

 cd /usr/local/lighttpd/webpages
 vi index.html 

```
	&lt;html&gt;
	&lt;head&gt;
	&lt;title&gt;lighttpd test&lt;/title&gt;
	&lt;/head&gt;
	&lt;body&gt;
	&lt;p&gt;this is a testing&lt;/p&gt;
	&lt;/body&gt;
	&lt;/html&gt;
```

# 服务测试

启动lighttpd:

```
/usr/local/lighttpd/sbin/lighttpd -f /usr/local/lighttpd/config/lighttpd.conf
```

查看程序进程:


```
ps -ef |grep lighttpd
```

停止apache:

```
pkill lighttpd
```

测试网页：

 http://{{ server_ip }}:80/index.html
