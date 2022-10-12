---
title: 初试openEuler（二）：windows下使用VirtualBox安装openEuler
date: 2020-03-27
tags:
    - 安装openEuler
archives: 2020-03
author: traffic_millions
summary: windows下使用VirtualBox安装openEuler虚拟机。

---

### 【背景】
今天华为开发者大会上，openEuler开源社区发布了最新的LTS版本，手上只有一台windows机器，考虑使用VirtualBox安装openEuler虚拟机.

### 【环境准备】

- Windows10 64位
- Oracle VM VirtualBox 6.1.4
- openEuler开源社区下载：[openEuler-20.03-LTS-x86_64-dvd.iso](https://repo.openeuler.org/openEuler-20.03-LTS/ISO/x86_64/openEuler-20.03-LTS-x86_64-dvd.iso)  （X86）

<img src="./2020-03-27-VirtualBox-media/index-x86.png" >

### 【安装步骤】

##### 一、下载安装Virtual Box

在[VirtualBox官网](https://www.virtualbox.org/wiki/Downloads)下载安装程序

<img src="./2020-03-27-VirtualBox-media/VirtualBox-main.png" >

安装的时候可以自定义安装路径如（D:\software\Oracle\VirtualBox），然后一路next即可;

<img src="./2020-03-27-VirtualBox-media/route.png" >

安装结束之后，使用Ctrl+G打开全局设置，修改默认虚拟电脑位置如（D:\myVM），方便之后查找;

<img src="./2020-03-27-VirtualBox-media/global.png" >

##### 二、创建虚拟机

选择 【控制】-->【新建】，填写虚拟机的配置信息，示例如下

名称：openEuler，类型：Linux，由于没有openEuler，所以版本选择Other Linux(64-bit)，下一步

<img src="./2020-03-27-VirtualBox-media/config-virtual-machine.png" >

设置虚拟机的内存，此内存即为虚拟机所占用的系统内存，这里将虚拟内存设置为4G

<img src="./2020-03-27-VirtualBox-media/4G.png" >

选择【现在创建虚拟硬盘(c)】

<img src="./2020-03-27-VirtualBox-media/hard.png" >

虚拟硬盘文件类型，选择默认的【VDI（VirtualBox磁盘映像）】，下一步

<img src="./2020-03-27-VirtualBox-media/virtual_file.png" >

选择【动态分配】，下一步

分配给虚拟机的内存空间较大，使用时逐渐占用磁盘空间，闲置时自动缩减比较合理

<img src="./2020-03-27-VirtualBox-media/dynamic.png" >

这里选择设置虚拟机硬盘大小为64G 

<img src="./2020-03-27-VirtualBox-media/64G.png" >

虚拟机创建完成，openEuler所需的硬件资源准备完毕 

<img src="./2020-03-27-VirtualBox-media/virtual_done.png" >

##### 三、安装openEuler

启动上一步创建好的虚拟机 

<img src="./2020-03-27-VirtualBox-media/start.png" >

点击右侧“文件夹图标”

<img src="./2020-03-27-VirtualBox-media/file_icon.png" >

点击注册，选择准备阶段下载好的**openEuler-20.03-LTS-x86_64-dvd.iso**

<img src="./2020-03-27-VirtualBox-media/select_iso.png" >

选择【启动】，进入到安装界面

<img src="./2020-03-27-VirtualBox-media/select_start.png" >

选择 【Install openEuler 20.03-LTS】回车，进行安装  

<img src="./2020-03-27-VirtualBox-media/install_lts.png" >

选择Continue

<img src="./2020-03-27-VirtualBox-media/continue.png" >

选择Installation Destination

<img src="./2020-03-27-VirtualBox-media/install_destination.png" >

选择要安装的磁盘，Done

<img src="./2020-03-27-VirtualBox-media/select_disk.png" >

选择Begin Installation

<img src="./2020-03-27-VirtualBox-media/begin_install.png" >

安装状态如下

<img src="./2020-03-27-VirtualBox-media/install_status.png" >

选择Root Password 设置root用户的密码（后面登录要用到！~）

<img src="./2020-03-27-VirtualBox-media/set_pass.png" >

安装完成后，选择Reboot重启虚拟机

<img src="./2020-03-27-VirtualBox-media/reboot.png" >

显示重新回到了安装界面

<img src="./2020-03-27-VirtualBox-media/return.png" >

关闭虚拟机，选择【设置】选中openEuler-20.03-LTS-x86_64-dvd.iso，鼠标右键，删除盘片，保存退出

<img src="./2020-03-27-VirtualBox-media/save.png" >

重新启动虚拟机，显示如下界面，直接回车

<img src="./2020-03-27-VirtualBox-media/reboot_start.png" >

输入用户（root）密码（安装阶段设置的密码），进入openEuler虚拟机

<img src="./2020-03-27-VirtualBox-media/install_over.png" >

到这里openEuler虚拟机已经安装完成了~
