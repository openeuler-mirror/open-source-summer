---
title: openEuler 跑到树莓派上
date: 2020-05-25
tags:
    - Raspberry Pi
    - summer2020
    - 操作系统移植
archives: 2020-05
author: woqidaideshi
summary: openEuler Raspberry Pi 版本镜像的构建、使用。
---

# 概要

树莓派由英国“Raspberry Pi 基金会”开发，类似微型计算机，价格便宜，体积小，具有电脑的所有基本功能。自2012年以来，几乎每年都有新的版本发布，而且配置有了很大提升。树莓派从最初只做主板，到现在已经慢慢增加了周边的设备，包括显示器、摄像头以及一些传感器等。树莓派40针接口作为一个开放接口，提供了很大开发空间。作为开源硬件领域的一个较为高阶的硬件产品，树莓派近年来得到了越来越的开发者和专业人士的追捧。

为了降低 openEuler 使用门槛，促进用户推广，让大家尽快体验并使用 openEuler，本文将介绍如何将 openEuler 移植到树莓派。

本文主要包括三部分：

- 刷写镜像
- 使用树莓派
- 构建镜像

本文内容参考自 [openEuler-RaspberryPi](https://gitee.com/openeuler/raspberrypi)。如有疑问，欢迎大家在本文提交评论或者在 [openEuler-RaspberryPi](https://gitee.com/openeuler/raspberrypi) 提交 issue。

# 刷写镜像

## 实验环境

- Windows10/Linux/Mac
- 树莓派 3B/3B+/4B
- 16G 以上的 Micro SD 卡

## 获取树莓派 img 镜像

下载适配树莓派的 openEuler 镜像，也可以参照 [构建镜像](#构建镜像) 定制自己的 openEuler 树莓派镜像。

下载 openEuler 发布的 openEuler 20.09 版本镜像，[下载](https://repo.openeuler.org/openEuler-20.09/raspi_img/aarch64/openEuler-20.09-raspi-aarch64.img.xz)。

该镜像的基本信息：

- [更新日志](https://gitee.com/openeuler/raspberrypi/blob/master/documents/changelog/changelog-20.09-release.md)
- 发布时间：2020-09-30
- 大小：259 MiB
- 操作系统版本：openEuler 20.09
- 内核版本：4.19.138-2008.1.0.0001
- 固件来源：[firmware](https://github.com/raspberrypi/firmware)、[bluez-firmware](https://github.com/RPi-Distro/bluez-firmware)、[firmware-nonfree](https://github.com/RPi-Distro/firmware-nonfree)
- 构建文件系统的源仓库：[openEuler 20.09 源仓库](https://gitee.com/src-openeuler/openEuler-repos/blob/openEuler-20.09/generic.repo)
- 镜像内置源仓库：[openEuler 20.09 源仓库](https://gitee.com/src-openeuler/openEuler-repos/blob/openEuler-20.09/generic.repo)

发布的镜像更新情况参见 [openEuler-RaspberryPi](https://gitee.com/openeuler/raspberrypi/blob/master/README.md)。

## 刷写 SD 卡

可以在 Windows、Linux、Mac 环境下的刷写 SD 卡，详见 [刷写镜像](https://gitee.com/openeuler/raspberrypi/blob/master/documents/刷写镜像.md)。

下面我们以 Windows 环境为例，介绍如何将镜像刷写到 SD 卡。

### 格式化 SD 卡

请按照以下步骤格式化 SD 卡：

1.  下载并安装格式化 SD 卡工具，以下操作以 SD Card Formatter 格式化工具为例。
2.  打开 SD Card Formatter，在 “Select card” 中选择需要格式化的 SD 卡的盘符。

    若 SD 卡之前未安装过镜像，盘符只有一个。在 “Select card” 中选择需要格式化的 SD 卡对应盘符。

    若 SD 卡之前安装过镜像，盘符会有一个或多个。例如，SD 卡对应三个盘符：E、G、H。在 “Select card” 中选择需要格式化的 SD 卡对应 boot 分区盘符 E。

3.  在 “Formatting options” 中选择格式化方式。默认为 “Qick format”。
4.  单击“Format”开始格式化。界面通过进度条显示格式化进度。
5.  格式化完成后会弹出 “Formatting was successfully completed” 的提示框，单击“确定”完成格式化。

### 写入 SD 卡

注意，如果获取的是压缩后的镜像文件，如 `openEuler-20.09-raspi-aarch64.img.xz`，需要先将压缩文件解压得到 `openEuler-20.09-raspi-aarch64.img` 镜像文件。

请按照以下步骤将 `openEuler-20.09-raspi-aarch64.img` 镜像文件写入 SD 卡：

1.  下载并安装刷写镜像的工具，以下操作以 Win32 Disk Imager 工具为例。
2.  右键选择“以管理员身份运行”，打开 Win32 Disk Imager。
3.  在“映像文件”中选择 img 格式的镜像文件路径。
4.  在“设备”中选择待写入的 SD 卡盘符。
5.  单击“写入”。界面通过任务进度条显示写入 SD 卡的进度。
6.  写入完成后会弹出 “写入成功” 的提示框，单击“OK”完成写入。

# 使用树莓派

## 启用树莓派

版本要求：树莓派 3B/3B+/4B。

默认用户名：root，密码：openeuler。

将刷写镜像后的 SD 卡插入树莓派，通电启用。

登录树莓派有以下两种方式：

1.  本地登录

    树莓派连接显示器（树莓派视频输出接口为 Micro HDMI）、键盘、鼠标后，启动树莓派，可以看到树莓派启动日志输出到显示器上。待树莓派启动成功，输入用户名（root）和密码（openeuler）登录。

2.  ssh 远程登录

    树莓派默认采用 DHCP 的方式自动获取 IP。如果树莓派连接已知路由器，可登录路由器查看，新增的 IP 即为树莓派 IP。例如，树莓派对应 IP 为：192.168.31.109，使用命令 `ssh root@192.168.31.109` 后输入密码 `openeuler`，即可远程登录树莓派。

## 根目录分区扩展

默认根目录分区空间比较小，在使用之前，需要对分区进行扩容。详情参见 [根目录分区扩展
](https://gitee.com/openeuler/raspberrypi/blob/master/documents/树莓派使用.md#根目录分区扩展)。

## wifi 连接

wifi 使用详情参见 [wifi 连接
](https://gitee.com/openeuler/raspberrypi/blob/master/documents/树莓派使用.md#wifi-连接)。

## 音频

音频使用详情参见 [音频
](https://gitee.com/openeuler/raspberrypi/blob/master/documents/树莓派使用.md#音频)。

## 蓝牙

蓝牙使用详情参见 [蓝牙
](https://gitee.com/openeuler/raspberrypi/blob/master/documents/树莓派使用.md#蓝牙)。

## GPIO

GPIO 使用详情参见 [GPIO
](https://gitee.com/openeuler/raspberrypi/blob/master/documents/树莓派使用.md#gpio)。


# 构建镜像

可以根据需要定制内核，构建镜像。详细内容请参考 [openEuler 镜像的构建](https://gitee.com/openeuler/raspberrypi/blob/master/documents/openEuler镜像的构建.md)。

主要过程包括：

1.  准备环境
2.  编译内核
3.  准备树莓派固件和应用
4.  制作 openEuler 的 rootfs
5.  制作镜像

## 准备环境

- 操作系统：openEuler；
- 架构：AArch64；
- 硬盘存储不低于 50G；
- 内存不低于 2G；
- 可访问外网。

可以通过以下方式获取 AArch64 架构的运行环境：

- 使用 AArch64 架构的主机，例如刷写 openEuler 镜像的树莓派 3B/3B+/4B
- 使用 [QEMU](https://www.qemu.org/) 模拟器搭建 AArch64 运行环境

## 编译内核

除了使用 AArch64 架构的 openEuler 或 Centos 7/8 运行环境，也可以采用交叉编译的方式编译内核，文档详见 [交叉编译内核](https://gitee.com/openeuler/raspberrypi/blob/master/documents/交叉编译内核.md)。

用户可以根据需要定制自己的内核，内核编译过程详见 [编译内核](https://gitee.com/openeuler/raspberrypi/blob/master/documents/openEuler镜像的构建.md#编译内核)。

## 准备树莓派固件和应用

过程详见 [树莓派固件和应用](https://gitee.com/openeuler/raspberrypi/blob/master/documents/openEuler镜像的构建.md#树莓派固件和应用)。

树莓派固件：

- [firmware](https://github.com/raspberrypi/firmware)
- [bluez-firmware](https://github.com/RPi-Distro/bluez-firmware)
- [firmware-nonfree](https://github.com/RPi-Distro/firmware-nonfree)

树莓派应用：

- [pi-bluetooth](https://github.com/RPi-Distro/pi-bluetooth)

## 制作 openEuler 的 rootfs

过程详见 [制作 openEuler 的 rootfs](https://gitee.com/openeuler/raspberrypi/blob/master/documents/openEuler镜像的构建.md#制作-openeuler-的-rootfs)。

使用 rpm 命令制作 openEuler 的 rootfs，并为 rootfs 安装 NetworkManager、openssh-server、 passwd 等必要软件，设置网络等。

rootfs 的基本信息：

- 操作系统版本：openEuler 20.09
- 构建文件系统的源仓库：[openEuler 20.09 源仓库](https://gitee.com/src-openeuler/openEuler-repos/blob/openEuler-20.09/generic.repo)
- 镜像内置源仓库：[openEuler 20.09 源仓库](https://gitee.com/src-openeuler/openEuler-repos/blob/openEuler-20.09/generic.repo)

## 制作镜像

过程详见 [制作镜像](https://gitee.com/openeuler/raspberrypi/blob/master/documents/openEuler镜像的构建.md#制作镜像)。

主要过程包括：

1. 创建镜像文件
    1. 创建镜像后分区
    2. 格式化分区后挂载其 boot 和根目录分区
2. 完善根目录分区，需要拷贝的文件
    1. 制作的 rootfs
    2. 编译的内核模块
    3. 树莓派部分固件和应用
3. 完善 boot 分区，需要拷贝的文件
    1. 树莓派引导文件
    2. 编译的内核和设备树文件

注意，完善根目录分区时还需要根据实际情况设置 fstab 等内容，完善 boot 分区时需要根据实际需要设置 config.txt 等内容。

至此，openEuler 的树莓派镜像制作完成。发布的镜像更新情况参见 [openEuler-RaspberryPi](https://gitee.com/openeuler/raspberrypi/blob/master/README.md)。