---
title: pkgship 2.1.0 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - pkgship
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the pkgship 2.1.0
---

# pkgship 2.1.0 移植指南 (openEuler 20.03 LTS SP1)

## 简介

>pkgship是一款管理OS软件包依赖关系，提供依赖和被依赖关系完整图谱的查询工具，pkgship提供软件包依赖查询、生命周期管理、补丁查询等功能。

### 选用版本

> 2.1.0

##  检查当前系统版本信息

```shell
cat /etc/os-release
```
## 兼容性检查

> 使用x2openEuler对工具目录中的pkgship-2.1.0 RPM包进行分析

```shell
x2openEuler scan pkgship-2.1.0-7.oe1.noarch.rpm
```

> 根据依赖报告可知，移植到openEuler 20.03-LTS-sp1需要解决不同python版本的依赖相关问题

# 源码包安装

## 安装流程

- 安装依赖包
- 配置yum源
- 获取pkgship的源码包pkgship-2.1.0.tar.gz
- 解压源码包
- 修改部分源码内容以便和python3.7兼容
- 使用安装脚本setup.py安装pkgship
- 成功安装

## 安装pkgship

- 安装依赖包

```shell
[root@master ~]# yum install -y libffi-devel


[root@master ~]# vim requirements.txt

prettytable==0.7.2
Flask_RESTful==0.3.8
Flask_Session==0.3.1
Flask_Script==2.0.6
Flask_Limiter==1.4
Flask==1.1.2
marshmallow==3.5.1
PyYAML==5.3.1
gevent==20.12.1
requests==2.21.0
uwsgi==2.0.18
elasticsearch==7.10.1
redis==3.5.3
retrying==1.3.3

[root@master ~]# pip3 install -r requirements.txt
```


- 配置yum源

```shell
[root@master ~]# cd /etc/yum.repos.d/
[root@master yum.repos.d]# vim openEuler.repo
[openeuler]
name=openEuler-21.03
baseurl=http://119.3.219.20:82/openEuler:/21.03/standard_aarch64/
enabled=1
gpgcheck=0


[fedora]
name=fedora
baseurl=https://mirrors.huaweicloud.com/fedora/releases/30/Everything/aarch64/os/
enabled=0
gpgcheck=0

[elasticsearch]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md

```

- 获取源码包

> 从 https://gitee.com/src-openeuler/pkgship?_from=gitee_search 获取pkgship-2.1.0.tar.gz源码包。

- 解压源码包

```shell
tar -xzvf pkgship-2.1.0.tar.gz
```

- 修改部分源码文件

> 进入解压后的源码目录，修改源码路径下
```shell
./packageship/application/query/pkg.py
./packageship/application/query/depend.py
```

> 这两个文件中第19行的monkey.patch_all()为monkey.patch_all(thread=False, ssl=False)

> 进入源码目录的packageship目录下创建一个version.yaml文件，文件内容为

```shell
Version: 2.1.0
Release: 7.oe1
```
> 避免安装时因为缺少文件报如下错误

```shell
installing package data to build/bdist.linux-x86_64/egg
running install_data
creating /etc/pkgship
copying packageship/package.ini -&gt; /etc/pkgship/
copying conf.yaml -&gt; /etc/pkgship/
copying packageship/auto_install_pkgship_requires.sh -&gt; /etc/pkgship/
copying packageship/uwsgi_logrotate.sh -&gt; /etc/pkgship/
copying packageship/pkgshipd -&gt; /usr/bin
copying packageship/pkgship -&gt; /usr/bin
copying packageship/pkgship.service -&gt; /lib/systemd/system/
copying packageship/application/common/rsp/mapping.xml -&gt; build/bdist.linux-x86_64/egg/packageship/application/common/rsp
error: can't copy 'packageship/version.yaml': doesn't exist or not a regular file
```


- 安装pkgship

> 进入pkgship主目录，开始使用setup.py脚本安装pkgship

```shell
[root@localhost ~]# python3 --version
Python 3.7.9
[root@localhost ~]# python3 setup.py install
```


- 成功安装

```shell
Processing packageship-2.1.0-py3.7.egg
creating /usr/local/lib/python3.7/site-packages/packageship-2.1.0-py3.7.egg
Extracting packageship-2.1.0-py3.7.egg to /usr/local/lib/python3.7/site-packages
Adding packageship 2.1.0 to easy-install.pth file

Installed /usr/local/lib/python3.7/site-packages/packageship-2.1.0-py3.7.egg
Processing dependencies for packageship==2.1.0
Finished processing dependencies for packageship==2.1.0

[root@localhost pkgship-2.1.0]# pip3 list | grep packageship
packageship                   2.1.0
[root@localhost pkgship-2.1.0]# pkgship
usage: pkgship [-h] [-v] [-remote]
               {init,list,builddep,installdep,selfdepend,bedepend,pkginfo,dbs}
               ...

package related dependency management

positional arguments:
  {init,list,builddep,installdep,selfdepend,bedepend,pkginfo,dbs}
                        package related dependency management
    init                initialization of the database
    list                get all package data
    builddep            query the compilation dependencies of the specified
                        package
    installdep          query the installation dependencies of the specified
                        package
    selfdepend          query the self-compiled dependencies of the specified
                        package
    bedepend            dependency query for the specified package
    pkginfo             query the information of a single package
    dbs                 Get all data bases

optional arguments:
  -h, --help            show this help message and exit
  -v                    Get version information
  -remote               The address of the remote service
```
