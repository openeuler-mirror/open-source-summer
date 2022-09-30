---
title: Varnish 6.2.0 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - Varnish
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the Varnish 6.2.0
---

# Varnish 6.2.0 移植指南（openEuler 20.03 LTS SP1）

# 介绍

## 简要介绍
Varnish是一款高性能且开源的反向代理服务器和HTTP加速器，与传统的缓存服务器相比，Varnish具有性能更高、速度更快、管理更加方便等诸多优点，很多大型的网站都开始尝试使用Varnish来替换Squid，这些都促进Varnish迅速发展起来。

开发语言：C++

一句话描述：反向代理服务器和HTTP加速器

## 建议的版本
建议使用版本为“Varnish 6.2.0”。

# 环境要求
## 硬件要求
硬件要求如表1所示。
表1 硬件要求

|项目| 说明  |
|------|----------------------------|
|服务器| TaiShan 200服务器（型号2280）|
|CPU| 鲲鹏920 5250处理器|
|磁盘分区|对磁盘分区无要求|

## 操作系统要求
操作系统要求如表2所示。
表2 操作系统要求

|项目| 版本| 版本查看命令|
|----------|--------|-------|
|openEuler| 20.03 LTS SP1| ```cat /etc/openEuler-release```|
|Kernel| 4.19.90| uname -r|

# 配置编译环境
## 配置Yum源
  说明：
  如果组网环境处于外网受限情况下，服务器yum命令无法通过外界获取依赖包时，可参考本节内容进行本地源配置。
1. 将操作系统镜像文件openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso文件拷贝到每台服务器的“/root”目录下。
2. 镜像文件挂载。
    a. 将“/root”目录下的openEuler操作系统对应iso文件挂载到“/mnt”目录下。
    ```mount /root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt```
    说明：
    该操作单次生效，重启后失效。若需要配置开机启动自动挂载镜像（可选），可参考下面步骤。
    1. 打开fstab文件。
        ```vi /etc/fstab```
    2. 编辑fstab文件，在文件末尾添加如下信息：
        ```/root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt iso9660 loop 0 0```
    3. 保存并退出fstab文件。
3. 添加本地源文件。
    a. 进入“/etc/yum.repos.d”目录。
    ```cd /etc/yum.repos.d```
    说明：
    此时，建议将此目录下的*.repo文件移到任意其他备份目录下。
    b. 创建local.repo文件。
    1. 打开local.repo文件。
    ```vi local.repo```
    2. 编辑local.repo文件，在local.repo文件中添加如下内容：
    ```
    [local]
    name=local.repo
    baseurl=file:///mnt
    enabled=1
    gpgcheck=0
    ```
    说明：
    其中，baseurl中file路径为镜像挂载路径，与镜像文件挂载中的目录“/mnt” 对应。
    3. 保存并退出local.repo文件。
4. 生效本地源。
```
yum clean all
yum makecache
yum list
```

## 安装依赖包
下载并安装依赖包
1. 安装所需依赖。
```
yum install -y autoconf automake jemalloc-devel libedit-devel libtool ncurses-devel pcre-devel pkgconfig python-docutils python-sphinx graphviz httpd
```
2. 查看Python3版本
   ```
   [root@localhost]# python3 --version
   Python 3.7.9
   ```

# 安装
## 安装方式介绍
本文将介绍源码编译安装方式

## 源码编译安装
### 获取源码
1. 在本地浏览器下载Varnish源码。
下载地址：https://varnish-cache.org/_downloads/varnish-6.2.0.tgz
2. 将源码复制至服务器“/home”目录。
说明：
若服务器可以访问网络，则可以直接在服务器上使用wget命令下载源码。

### 编译和安装
1. 进入“home”目录。
```cd /home/```
2. 解压源码包。
```tar -zxvf varnish-6.2.0.tgz```
3. 进入“varnish-6.2.0”目录。
```cd /home/varnish-6.2.0/```
4. 执行自动编译。
```sh autogen.sh```
5. 检查依赖。
```./configure --prefix=/usr/local/varnish```
```
[root@localhost varnish-6.2.0]# ./configure --prefix=/usr/local/varnish
checking for gcc... gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables... 
checking whether we are cross compiling... no
checking for suffix of  files... o
checking whether we are using the GNU C compiler... yes
checking whether gcc accepts -g... yes
```
说明：
--prefix=PATH：指定Varnish的安装目录。

6. 编译安装Varnish。
```make  &amp;&amp; make install```
```
[root@localhost varnish-6.2.0]# make  && make install
make  all-recursive
make[1]: Entering directory '/home/varnish-6.2.0'
Making all in include
make[2]: Entering directory '/home/varnish-6.2.0/include'
make  all-am
make[3]: Entering directory '/home/varnish-6.2.0/include'
```

### 配置文件
1. 在Varnish安装路径中创建配置文件所需的文件夹。
```cd /usr/local/varnish &amp;&amp;  mkdir config```
2. 复制配置文件到“config”中。
```cp /usr/local/varnish/share/doc/varnish/example.vcl   /usr/local/varnish/config/default.vcl```

# 运行与验证
以本机作为Varnish后端对象为例，运行和验证Varnish。
1. 修改后端地址端口用于反向代理测试。
若需配置缓存策略，请从官网获取最新的Varnish Book）。此处配置本机作为后端对象，端口默认80。

   a. 打开配置文件。
   ```vi /usr/local/varnish/config/default.vcl```

   b. 配置如下内容后，保存并退出。
   ```
   vcl 4.0;
   # Default backend definition. Set this to point to your content server.
   backend default {
   .host = &quot;127.0.0.1&quot;;
   .port = &quot;80&quot;;
   }

   sub vcl_recv {
   }
   sub vcl_backend_response {
   }
   sub vcl_deliver {
   }
   ```

2. 启动后端对象的HTTP服务。
```systemctl start httpd```
3. 启动Varnish。
```/usr/local/varnish/sbin/varnishd  -a :12345 -T 127.0.0.1:6082 -s malloc,10GB -f /usr/local/varnish/config/default.vcl```
```
[root@localhost ~]# /usr/local/varnish/sbin/varnishd  -a :12345 -T 127.0.0.1:6082 -s malloc,10GB -f /usr/local/varnish/config/default.vcl
Debug: Version: varnish-6.2.0 revision b14a3d38dbe918ad50d3838b11aa596f42179b54
Debug: Platform: Linux,4.19.90-2012.4.0.0053.oe1.aarch64,aarch64,-jnone,-smalloc,-sdefault,-hcritbit
Debug: Child (30634) Started
```
Varnish启动参数说明见表 Varnish启动参数说明。
参数 : 说明

    -a address:port : 表示Varnish对HTTP的监测地址及其端口, 此处IP默认为本机。
    
    -T address:port : 设定Varnish的Telnet管理地址及其端口。
    
    -s : 指定Varnish缓存存放的方式，此处采用malloc的形式，总共分配10GB内存空间。
    
    -f : 指定Varnish的配置文件位置。

4. 访问本机即可看到后端服务的测试页面。
   ```curl http://localhost:80```
   ```
   ...
      <div class="content-middle">
       This page is used to test the proper operation of the Apache HTTP server after it has been installed. If you can read this page, it means that the Apache HTTP server installed at this site is working properly.
      </div>
      <hr>
   
      <div class="content-columns">
       <div class="content-column-left">
        <h2>If you are a member of the general public:</h2>
   
        The fact that you are seeing this page indicates that the website you just visited is either experiencing problems, or is undergoing routine maintenance.
   
        If you would like to let the administrators of this website know that you've seen this page instead of the page you expected, you should send them e-mail. In general, mail sent to the name "webmaster" and directed to the website's domain should reach the appropriate person.
   
        For example, if you experienced problems while visiting www.example.com, you should send e-mail to "webmaster@example.com".
   
        For information on openEuler Linux, please visit the <a href="#" class="white">openEuler, Inc. website</a>. The ation for openEuler Linux is <a href="#" class="white">available on the openEuler, Inc. website</a>.
    
   ...
   ```
    说明：
  - 若需要停止Varnish，则使用如下命令，业务运行中不需要执行该命令。
    ```pkill varnish```
  - 卸载Varnish，并查询。
    卸载源码方式安装的Varnish。
    ```rm -rf /usr/local/varnish/```



