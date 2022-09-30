---
title: lighttpd 1.4.53 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - Lighttpd
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port lighttpd 1.4.53
---

# lighttpd 1.4.53 Porting Guide (openEuler 20.03 LTS SP1)

# Introduction  

## Overview

lighttpd is an excellent open source lightweight software, whose fundamental purpose is to provide a secure, fast, compatible, and flexible web server environment for high-performance websites. It has a low memory footprint, is loaded with a small CPU, and delivers good performance and abundant modules.

Programming language: C

Brief description: web server

## Recommended Version

lighttpd 1.4.53

# Environmental Requirements  

## Hardware

The following table lists the hardware requirements.

|Item|Description|
|-----|-----|
|Server|TaiShan 200 server (model 2280)|
|CPU|Kunpeng 920 5250 processor|
|Drive partition|No requirements|

## Operating Systems

The following table lists the requirements for the operating system.

Item| Version
----- | -----
openEuler | 20.03 SP1 AArch64
Kernel | 4.19

Note:
When installing the OS for the first time, select "Server with GUI" instead of "Minimal Install". This will bypass the need to manually install lots of software packages.

# Configuring the Compilation Environment

1. Install dependencies.

 yum -y install gcc gcc-c++ glib2-devel pcre-devel bzip2-devel zlib-devel gamin-devel

2. Obtain the source code.

 URL: https://download.lighttpd.net/lighttpd/releases-1.4.x/lighttpd-1.4.53.tar.gz

## Preparing the Installation Package

```
cp lighttpd-1.4.53.tar.gz $HOME &amp;&amp; cd $HOME
tar xzvf lighttpd-1.4.53.tar.gz
```

## Compiling and Installing lighttpd

```
cd lighttpd-1.4.53
./configure  --prefix=/usr/local/lighttpd  --with-fam
make -j60 &amp;&amp; make install
```

Note:

 **--prefix=PATH** specifies the lighttpd installation directory.  
 **--with-fam** reduces the number of times that **stat()** is called.


# Configuring Parameters

## Creating a Software Directory

```
cd /usr/local/lighttpd/
mkdir log webpages cache config
```

## Copying the Configuration File or Directory

```
cp $HOME/lighttpd-1.4.53/doc/config/lighttpd.conf  /usr/local/lighttpd/config/
cp $HOME/lighttpd-1.4.53/doc/config/modules.conf   /usr/local/lighttpd/config/
cp $HOME/lighttpd-1.4.53/doc/config/conf.d         /usr/local/lighttpd/config/ -r
```

Note:

 When lighttpd is installed, only three folders **lib**, **sbin**, and **share** exist in the installation directory. Other files need to be copied and created.

## Modifying the lighttpd.conf File

```
vi /usr/local/lighttpd/config/lighttpd.conf

```

Modify lines 16 to 20 as follows:

```
var.log_root       =   &quot;/usr/local/lighttpd/log&quot;
var.server_root    =   &quot;/usr/local/lighttpd&quot;
var.state_dir      =   &quot;/usr/local/lighttpd&quot;
var.home_dir       =   &quot;/usr/local/lighttpd&quot;
var.conf_dir       =   &quot;/usr/local/lighttpd/config&quot;
```

Modify line 61 as follows:

```
var.cache_dir      =   &quot;/usr/local/lighttpd/cache&quot;
```

Add the following comment to line 93:

```
#server.use-ipv6 = &quot;enable&quot;
```

Modify lines 104 to 105 as follows: (This item is about the operation permission. You are not advised to use the **root** user.)

```
server.username  =  &quot;lighttpd1&quot;
server.groupname  =  &quot;lighttpd&quot;
```

Modify line 115 (path for storing the access page) as follows:

```
server.document-root  =  server_root + &quot;webpages&quot;
```

Modify line 246 (cache mode) as follows: (The default value is **simple**. According to the official explanation, **fam** is better than **simple**.)

```
server.stat-cache-engine = &quot;fam&quot;
```

Add the following content to line 182. (This configuration item is used to configure the multi-process mode. The lighttpd process is a single process by default. You can change the value based on the site requirements.)

```
server.max-worker = 4
```

## Creating a User Group

```
groupadd  lighttpd
useradd -g lighttpd  lighttpd1
```

## Modifying Permissions

```
chown lighttpd1  /usr/local/lighttpd/log
```

## Adding a Test Page

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

# Testing the Service

Start lighttpd.

```
/usr/local/lighttpd/sbin/lighttpd -f /usr/local/lighttpd/config/lighttpd.conf
```

Check the program process.


```
ps -ef |grep lighttpd
```

Stop lighttpd.

```
pkill lighttpd
```

Test web page:

 http://{{ server_ip }}:80/index.html
