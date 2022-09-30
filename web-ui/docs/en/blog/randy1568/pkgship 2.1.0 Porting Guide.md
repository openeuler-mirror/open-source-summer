---
title: pkgship 2.1.0 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - pkgship
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port pkgship 2.1.0
---

# pkgship 2.1.0 Porting Guide (openEuler 20.03 LTS SP1)

## Introduction

pkgship is a query tool used to manage the dependency of OS software packages and provide a complete dependency graph. It provides functions such as software package dependency query, lifecycle management, and patch query.

### Selected Version

2.1.0

##  OS Information

```shell
cat /etc/os-release
```
## Compatibility Check

Use x2openEuler to analyze the pkgship-2.1.0 RPM package in the tool directory.

```shell
x2openEuler scan pkgship-2.1.0-7.oe1.noarch.rpm
```

Based on the check report, dependency issues caused by different Python versions need to be resolved before porting pkgship to openEuler 20.03 LTS SP1.

# Installation from the Source Package

## Installation Procedure

- Install dependencies.  
- Configure the Yum repository.  
- Obtain the pkgship source package **pkgship-2.1.0.tar.gz**.  
- Decompress the source package.  
- Modify the source code to ensure pkgship is compatible with Python 3.7.  
- Use the installation script **setup.py** to install pkgship.  
- The installation is successful.  

## Installing pkgship

- Install dependencies.

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


- Configure the Yum repository.

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

- Obtain the source package.

> Obtain the **pkgship-2.1.0.tar.gz** package from https://gitee.com/src-openeuler/pkgship?_from=gitee_search.

- Decompress the source package.

```shell
tar -xzvf pkgship-2.1.0.tar.gz
```

- Modify the source code files.

> In the generated source code directory, modify the following files in the source code path:
```shell
./packageship/application/query/pkg.py
./packageship/application/query/depend.py
```

Set the value of **monkey.patch_all()** in the 19th line of the two files to **monkey.patch_all(thread=False,ssl=False)**.  

In the **packageship** directory of the source code directory, create a **version.yaml** file and then add the following content to the file:  

```shell
Version: 2.1.0
Release: 7.oe1
```
This operation avoids the following error caused by lack of the file during the installation.  

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


- Install pkgship.

In the main directory of pkgship, run the **setup.py** script to install pkgship.

```shell
[root@localhost ~]# python3 --version
Python 3.7.9
[root@localhost ~]# python3 setup.py install
```


- The following content indicates that the installation is successful.

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
