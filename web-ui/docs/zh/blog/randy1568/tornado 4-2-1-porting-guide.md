---
title: tornado 4.2.1 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - tornado
    - Porting Case
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything of the tornado 4.2.1 porting case
---

# tornado 4.2.1 移植指南（openEuler 20.03 LTS SP1）

# 介绍

## 简要介绍

Tornado是一个Python Web框架和异步网络库，最初由FriendFeed开发。 通过使用非阻塞网络I / O，Tornado可以扩展到成千上万的开放连接，非常适合长时间轮询，WebSocket和需要与每个用户建立长期连接的其他应用程序。
本案例使用x86_64架构虚拟机，通过评估工具x2openEuler评估tornado 4.2.1软件移植到openEuler操作系统的兼容性，并根据评估结果完成软件移植。

语言：C++/Python

一句话描述：一个Python Web框架和异步网络库

开源协议：Apache

## 建议的版本

建议使用版本为tornado 4.2.1。

> 说明:
> 本文档适用于tornado 4.2.1，其他版本的tornado移植步骤也可参考本文档。

# 环境要求

## 操作系统要求

| 操作系统  | 版本          |
| :-------- | :------------ |
| openEuler | 20.03 LTS SP1 |
| CentOS    | 7.6           |

## 安装操作系统

如果是全新安装操作系统，安装方式建议不要使用最小化安装，否则很多软件包需要手动安装，可选择“Server with GUI”安装方式。
安装openEuler操作系统请参考：[https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html。](https://bbs.huaweicloud.com/forum/thread-116157-1-1.html#)

# 兼容性评估

## 获取tornado的RPM包

```
wget http://mirror.centos.org/centos/7/os/x86_64/Packages/python-tornado-4.2.1-5.el7.x86_64.rpm
```

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
x2openEuler scan python-tornado-4.2.1-5.el7.x86_64.rpm
注意要分析的移植文件需要有能够让x2openEuler用户可以读取的权限
扫描完成后会在/opt/x2openEuler/output目录生成html格式的报告
```

## 查看评估结果

软件兼容性评估报告分三块内容展示软件兼容性，分别是依赖包兼容性、C/C++接口兼容性、java接口兼容性，依赖包兼容性反映了软件包安装过程中的直接依赖，非100%表明无法正确安装；接口兼容性反映的是单个软件运行过程中对其他软件包、动态库或系统接口的调用变化，非100%表明在某个功能调用时可能会触发异常，未调用到时可能表现正常；部分结果建议人工复核，最终软件包使用建优先级建议 openEuler已移植包>openEuler上人工重编译包>centos软件包。

<img src="./image/tornado-1.png">

结果：通过报告可知外部接口兼容性100%，依赖包兼容性人工复核后通过，经评估tornado4.2.1软件包在openEuler 20.03 LTS SP1系统上兼容，可安装此软件包至openEuler 20.03 LTS SP1系统进行验证。

# 安装tornado

## rpm安装

由于兼容性报告显示兼容，尝试直接用下载的rpm包安装。

```
[root@localhost ~]# yum install python-tornado-4.2.1-5.el7.x86_64.rpm -y
Last metadata expiration check: 0:11:53 ago on Mon 22 Mar 2021 01:25:06 PM CST.
Dependencies resolved.
================================================================================
 Package                              Arch   Version         Repository    Size
================================================================================
Installing:
 python-tornado                       x86_64 4.2.1-5.el7     @commandline 641 k
Installing dependencies:
 python2-backports                    x86_64 1.0-17.oe1      everything   9.2 k
 python2-backports-ssl_match_hostname noarch 3.7.0.1-2.oe1   everything    16 k
 python2-ipaddress                    noarch 1.0.23-1.oe1    everything    41 k
 python3-pycurl                       x86_64 7.43.0.3-1.oe1  OS            65 k

Transaction Summary
================================================================================
Install  5 Packages

Total size: 772 k
Total download size: 131 k
Installed size: 4.1 M
Downloading Packages:
(1/4): python2-backports-1.0-17.oe1.x86_64.rpm   53 kB/s | 9.2 kB     00:00
(2/4): python2-backports-ssl_match_hostname-3.7  63 kB/s |  16 kB     00:00
(3/4): python2-ipaddress-1.0.23-1.oe1.noarch.rp 126 kB/s |  41 kB     00:00
(4/4): python3-pycurl-7.43.0.3-1.oe1.x86_64.rpm 113 kB/s |  65 kB     00:00
--------------------------------------------------------------------------------
Total                                           226 kB/s | 131 kB     00:00
warning: /var/cache/dnf/OS-fcb43ce6e8cef091/packages/python3-pycurl-7.43.0.3-1.oe1.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID b25e7f66: NOKEY
OS                                               14 kB/s | 2.1 kB     00:00
Importing GPG key 0xB25E7F66:
 Userid     : "private OBS (key without passphrase) <defaultkey@localobs>"
 Fingerprint: 12EA 74AC 9DF4 8D46 C69C A0BE D557 065E B25E 7F66
 From       : http://repo.openeuler.org/openEuler-20.03-LTS-SP1/OS/x86_64/RPM-GPG-KEY-openEuler
Key imported successfully
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1
  Installing       : python2-ipaddress-1.0.23-1.oe1.noarch                  1/5
  Installing       : python2-backports-1.0-17.oe1.x86_64                    2/5
  Installing       : python2-backports-ssl_match_hostname-3.7.0.1-2.oe1.n   3/5
  Installing       : python3-pycurl-7.43.0.3-1.oe1.x86_64                   4/5
  Installing       : python-tornado-4.2.1-5.el7.x86_64                      5/5
  Running scriptlet: python-tornado-4.2.1-5.el7.x86_64                      5/5
  Verifying        : python3-pycurl-7.43.0.3-1.oe1.x86_64                   1/5
  Verifying        : python2-backports-1.0-17.oe1.x86_64                    2/5
  Verifying        : python2-backports-ssl_match_hostname-3.7.0.1-2.oe1.n   3/5
  Verifying        : python2-ipaddress-1.0.23-1.oe1.noarch                  4/5
  Verifying        : python-tornado-4.2.1-5.el7.x86_64                      5/5
Installed:
  python-tornado-4.2.1-5.el7.x86_64
  python2-backports-1.0-17.oe1.x86_64
  python2-backports-ssl_match_hostname-3.7.0.1-2.oe1.noarch
  python2-ipaddress-1.0.23-1.oe1.noarch
  python3-pycurl-7.43.0.3-1.oe1.x86_64

Complete!
```

安装成功。

# 运行和验证

## 检查版本

```
[root@localhost ~]# python
Python 2.7.18 (default, Dec  8 2020, 03:37:36)
[GCC 7.3.0] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import tornado
>>> tornado.version
'4.2.1'
```

## 使用tornado

编写一个handlers来响应一个标准的http请求。(代码来自tornado官网[https://www.tornadoweb.org/en/stable/](https://bbs.huaweicloud.com/forum/thread-115816-1-1.html#))

```
vim hello.py
```

编辑内容如下:

```
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
```

编辑后保存退出，在终端输入如下命令：

```
python hello.py
```

打开另外一个终端，输入如下命令。

```
curl http://localhost:8888
```

系统回显如下，则表示安装成功。

```
Hello, world
```