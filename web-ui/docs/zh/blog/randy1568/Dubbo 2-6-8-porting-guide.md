---
title: Dubbo 2.6.8 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - Dubbo
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the Dubbo 2.6.8 
---

#  Dubbo 2.6.8 移植指南（openEuler 20.03 LTS SP1)

## 介绍

### 简要介绍

Dubbo是阿里巴巴公司开源的一个高性能优秀的服务框架，使得应用可通过高性能的RPC（远程过程调用）实现服务的输出和输入功能，可以和Spring框架无缝集成。简单地说，Dubbo是一个基于Spring的RPC框架，能够实现服务的远程调用、服务的治理。



### 建议版本

建议使用Dubbo 2.6.8版本。



## 环境要求



### 硬件要求

硬件要求如[表1](https://support.huaweicloud.com/prtg-dubbo-kunpengwebs/kunpengdubbo268_02_0002.html#kunpengdubbo268_02_0002__d0e90)所示。

| 项目 | 说明          |
| ---- | ------------- |
| CPU  | 鲲鹏920处理器 |
| 网络 | 可访问外网    |
| 存储 | 无要求        |
| 内存 | 无要求        |



### 操作系统要求

操作系统要求如[表2](https://support.huaweicloud.com/prtg-dubbo-kunpengwebs/kunpengdubbo268_02_0002.html#kunpengdubbo268_02_0002__d0e141)所示。



| 项目      | 版本                  |
| --------- | --------------------- |
| openEuler | 20.03 LTS-SP1 aarch64 |
| Kernel    | 4.19.90               |



## 配置编译环境

### 配置DNS服务器

```
# cat /etc/resolv.conf 
nameserver 114.114.114.114
nameserver 8.8.8.8
```



### 安装依赖包

1. 下载并安装依赖包

```
yum install java-1.8.0* tcl git gcc gcc-c++ make cmake libtool autoconf automake -y
```



2. 查看Java版本

```
[root@localhost ~]# java -version
openjdk version "1.8.0_272"
OpenJDK Runtime Environment Bisheng (build 1.8.0_272-b10)
OpenJDK 64-Bit Server VM Bisheng (build 25.272-b10, mixed mode)

```



### 安装Maven



1. 下载Maven安装包

```
wget https://archive.apache.org/dist/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
```



2. 解压安装包到指定目录

```
tar -zxvf apache-maven-3.6.3-bin.tar.gz -C /opt/
```



3. 配置Maven环境变量。

a.在“/etc/profile” 文件末尾增加Maven路径

```
echo "MAVEN_HOME=/opt/apache-maven-3.6.3/" >> /etc/profile
echo "export PATH=$MAVEN_HOME/bin:$PATH" >> /etc/profile
```



b.使修改的环境变量生效。

```
source /etc/profile
```



4. 检查配置是否生效。

```
[root@localhost ~]# mvn -v
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /opt/apache-maven-3.6.3
Java version: 1.8.0_272, vendor: Bisheng, runtime: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.272.b10-7.oe1.aarch64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.19.90-2012.4.0.0053.oe1.aarch64", arch: "aarch64", family: "unix"

```



5. 修改Maven配置文件中的本地仓、远程仓、代理等。

配置文件路径：“/opt/apache-maven-3.6.3/conf/settings.xml”。

配置网络代理，其中host，port，username，password需要根据当前环境修改：

```
<proxies>
   <proxy>
     <id>my-proxy</id>
     <active>true</active>
     <protocol>https</protocol>
     <host>代理服务器网址</host>
     <port>代理服务器端口</port>
     <username>用户名</username>
     <password>密码</password>
     <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
   </proxy>
   <proxy>
     <id>my-proxy1</id>
     <active>true</active>
     <protocol>http</protocol>
     <host>代理服务器网址</host>
     <port>代理服务器端口</port>
     <username>用户名</username>
     <password>密码</password>
     <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
   </proxy>
</proxies>
```

配置远程仓库：

```
<mirrors>
         <mirror>
                <id>huaweicloud</id>
                <mirrorOf>*</mirrorOf>
                <url>https://mirrors.huaweicloud.com/repository/maven/</url>
         </mirror>
</mirrors>
```



## 编译Dubbo 2.6.8



### 获取源码

```
mkdir /home/Dubbo && cd /home/Dubbo && wget https://github.com/apache/dubbo/archive/dubbo-2.6.8.tar.gz
&& tar -xvf dubbo-2.6.8.tar.gz
```



### 编译dubbo-rpc-redis模块

```
mvn install
```



![img](https://support.huaweicloud.com/prtg-dubbo-kunpengwebs/zh-cn_image_0301675619.png)

若窗口显示 **BUILD SUCCESS**，则dubbo-rpc-redis模块编译成功。



### 编译Dubbo 2.6.8

  /home/Dubbo/dubbo-dubbo-2.6.8/pom.xml文件552行后增加如下内容：

<img src="./image/Dubbo-1.png">


若显示 **BUILD SUCCESS**，则Dubbo 2.6.8编译成功。

<img src="./image/Dubbo-2.png">



编译完成后的dubbo-2.6.8.jar包保存在“all/target”目录。