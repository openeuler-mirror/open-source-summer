---
title: iok 2.1.3 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - lok
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port iok 2.1.3 
---

# iok 2.1.3 Porting Guide (openEuler 20.03 LTS SP1)

## Introduction

iok is a keyboard mapping application that displays Indian languages.

### Selected Version

2.1.3

### Installation Guide

https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/Installation/Installation.html

### Checking OS Version

```shell
cat /etc/os-release
```

<img src="./image/lok-1.png">

### Checking Compatibility

#### Download iok-2.1.3 SRPM.

```
wget http://mirror.centos.org/centos/7/os/x86_64/Packages/iok-2.1.3-6.el7.x86_64.rpm
```

#### Download x2openEuler.

```
wget https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/stable/contrib/x2openEuler/noarch/Packages/x2openEuler-1.0-1.noarch.rpm

User guide:
https://gitee.com/openeuler/docs/blob/stable2-20.03_LTS_SP1/docs/en/docs/thirdparty_migration/x2openEuleruseguide.md
```

#### Deploy x2openEuler.

```
rpm -ivh x2openEuler-1.0-1.noarch.rpm
```

Note: You need to install the RPM package as the root user. Currently, a network connection is required for downloading and installing dependencies.
Install dependencies such as **bzip2-devel** as prompted.

```
su x2openEuler
x2openEuler redis-db -init
```

Enter the following information about the Redis database in sequential order.
IP address: 127.0.0.1
Port: 6379
Database index (0-16): 0
Password (encrypted by the tool): If the Redis password is not set or is empty, press **Enter**.

```
x2openEuler init source_centos7.6-openEuler20.03-LTS-SP1.tar.gz
```

Note: After x2openEuler is installed using an RPM package, the default resource package (source_centos7.6-openEuler20.03-LTS-SP1.tar.gz) is generated in the **/opt/x2openEuler** directory.
To support the evaluation of hardware compatibility between CentOS 8.2 and openEuler 20.03 LTS SP1, you need to obtain and import the corresponding static resource package. For example, if the resource package is **source_centos8.2-openEuler20.03-LTS-SP1.tar.gz**, run **x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz** to import the package.

#### Scan the software.

```
x2openEuler scan iok-2.1.3-6.el7.x86_64.rpm
The x2openEuler user must have the read permission on the file to be analyzed.
After the scan is complete, an HTML report is generated in the /opt/x2openEuler/output directory.
```

## Viewing Evaluation Results

The software compatibility evaluation report consists of three parts: dependency compatibility, C/C++ interface compatibility, and Java interface compatibility. Dependency compatibility reflects the required direct dependencies during software installation. If the dependency compatibility is not 100%, the installation fails. Interface compatibility reflects the calling of other software packages, dynamic libraries, or system interfaces during the running of the software. If the interface compatibility is not 100%, an exception may be triggered when a certain function is called. Manual confirmation is recommended for some results. The priority of software packages is as follows: packages that have been ported to openEuler > manually recompiled packages for openEuler > packages for CentOS.

<img src="./image/iok-1.png">



Result: According to the dependency report, the unique3 dependency issue needs to be resolved before porting iok to openEuler 20.03 LTS SP1.

## Including Dependencies

- Create an issue from the [openEuler/oec-application repository](https://gitee.com/openeuler/oec-application).

<img src="./image/lok-2.png">

- Track the issue until the missing dependency package is included in the YUM repository of openEuler 20.03 LTS SP1.

## Build Process

After the missing dependency package is included, you can perform the following operations:

- Obtain the CentOS 7.6.1810 SRPM package for iok.
- Build the binary package on openEuler 20.03 LTS SP1.

###Build the binary package.

```shell
yum install -y rpm-build
```

- Install the SRPM package over the network.

```shell
rpm -i https://vault.centos.org/7.6.1810/os/Source/SPackages/iok-2.1.3-6.el7.src.rpm
```

- Install the dependency.

```shell
yum-builddep -y ~/rpmbuild/SPECS/iok.spec
```

- Build the binary package.

```shell
rpmbuild -bb ~/rpmbuild/SPECS/iok.spec
```

- Install the binary package.

```
rpm -i ~/rpmbuild/RPMS/x86_64/*.rpm
```

- View the binary file.

```
which iok
```
