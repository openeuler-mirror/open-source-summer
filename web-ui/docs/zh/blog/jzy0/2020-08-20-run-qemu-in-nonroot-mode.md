---
title: 非root用户起qemu虚拟机：规避权限问题
date: 2020-08-20
tags:
    - qemu
    - 权限
    - root用户
    - libvirt
archives: 2020-08
author: Zeyu Jin
summary: 本文小结了非root用户起qemu虚拟机的步骤，规避可能出现的权限问题导致其虚拟机失败。
---

### 背景
在多人使用虚拟机的场景中，每人对应一个非root用户。当某一个非root用户想要使用virsh命令起qemu虚拟机的时候，等待他的可能是一段小坑不断的试错之路。

非root用户起虚拟机最常遇到的是权限问题，比如运行`virsh start`的时候，出现下列报错：
```
error: Failed to start domain jzy-lts
error: internal error: qemu unexpectedly closed the monitor: 2020-07-14T13:29:11.323694Z qemu-kvm: -drive file=/home/jzy/kvm/openEuler-20.03-LTS.aarch64.qcow2,format=qcow2,if=none,id=drive-scsi0-0-0-0,cache=none,aio=native: Could not open '/home/jzy/kvm/openEuler-20.03-LTS.aarch64.qcow2': Permission denied
```

有些朋友遇到类似问题会怀疑是qemu本身有bug，其实不然，很有可能操作不当才是原因。
下面是本人总结的非root用户起qemu虚拟机的步骤，规避可能出现的权限问题。

### 步骤

从创建用户到起虚拟机：
1. 创建一个用户并添加进kvm组
```
[root]    useradd -m jzy
[root]	  gpasswd -a jzy kvm
```
2. 配置 `/etc/libvirt/qemu.conf`
```
# user = "root"
后面加
user = "jzy"
```
```
# group = "root"
后面加
group = "jzy"
```
3. 重启libvirtd
```
[root]    service libvirtd restart
或者
[root]    systemctl restart libvirtd.service
```
4. 允许jzy使用sudo
```
[root]    vim /etc/sudoers
```
增加 `jzy   ALL=(ALL)       ALL`
然后 `wq！`

5. 切用户，到/home/jzy 准备好相关的文件
保证文件和目录都是755的权限, 比如
```
[jzy@localhost ~]$ pwd
/home/jzy

[jzy@localhost ~]$ ll
total 4.0K
drwxr-xr-x 2 jzy jzy 4.0K Jul 23 11:29 kvm

[jzy@localhost ~]$ ll kvm
total 7.2G
-rwxr-xr-x 1 jzy  jzy  1.6K Jul 23 11:29 openE_jzy.xml
-rwxr-xr-x 1 jzy  jzy  4.4G Jul 23 11:25 openEuler-20.03-LTS-aarch64-dvd.iso
-rwxr-xr-x 1 root root 2.9G Jul 23 11:32 openEuler-image.qcow2
```
6. 就可以起虚拟机了
```
[jzy@localhost ~]$ sudo virsh create kvm/openE_jzy.xml
Domain openEulerVM created from kvm/openE_jzy.xml
```

特别注意：
文件的owner 和 group 不要搞错！
