---
title: 如何在鹏城实验室申请虚拟机
date: 2020-03-25
tags:
    - 虚拟机
    - 鹏城实验室
archives: 2020-03
author: openEuler Infrastructure
summary: 本文章介绍如何在鹏城实验室申请虚拟机。
---


### 向鹏城实验室申请Arm虚拟机进行openEuler测试流程

#### 简介

为了方便openEuler社区的开发者开发，[鹏城实验室](https://dw.pcl.ac.cn/)为openEuler社区的开发者提供了一些虚拟机，用于开发调测。本文介绍为openEuler社区开发者介绍在鹏城实验室申请Arm虚拟机的申请步骤。

**说明**：该资源面向在openEuler社区进行贡献的开发者，包括代码开发、软件测试、文档开发等不同形式的贡献。

#### 申请步骤

##### 在openEuler社区提交申请并得到批准

1. 登陆Gitee上的openEuler公共Issue，准备创建申请

链接在此<https://gitee.com/openeuler/community-issue/issues>

2. 创建Issue

- 类型：需求

- 标题：以"[鹏城实验室VM申请]"开头

- 内容模板：

```
- 鹏城生态门户开发者云ID：（在https://dw.pcl.ac.cn/cloud/login申请）

- 申请目的：

- 与该目的对应的openEuler社区链接（一个或多个）：
    - Issue链接：
    - Pull Request链接：
    - SIG组链接：
    - Project链接：

- 使用时长(天)：  不超过30天

- VM数量：

```

3. 提交Issue后，等待openEuler Infrastructure组的批准

如下人员可以审批：
@freesky-edward
@imjoey
@TommyLike
@zerodefect


4. 审批通过后，记录该issue的url。


#####  到鹏城实验室进行正式申请

1. 登陆<https://dw.pcl.ac.cn/cloud/login>，如果没有账号请注册

2. 点击`需求申请`申请VM

3. 第一页填写内容

- 项目名称：openEuler Development

- 项目信息：其他--openEuler

- 项目简介：openEuler项目是位于openeuler.org的开源项目，旨在通过社区合作，打造创新平台，构建支持多处理器架构、统一和开放的操作系统，推动软硬件应用生态繁荣发展。

- 领域信息：其他--openEuler操作系统

- 领域概述：openEuler操作系统，是基于Linux Kernel的Linux发行版。

4. 第二页填写内容

- 产品名称：openEuler

- 产品信息：测试/研发类产品

- 产品概述：openEuler项目是位于openeuler.org的开源项目，旨在通过社区合作，打造创新平台，构建支持多处理器架构、统一和开放的操作系统，推动软硬件应用生态繁荣发展。

- 云服务用途：根据实际用途

- 用途概述：openEuler开源社区开发测试试用，审批单号：issue url

5. 第三页：根据实际情况填写

6. 第四页：根据实际情况填写，与issue申请单内容一致

7. 完成申请

##### 释放资源

使用完成后，有两种方式可以释放资源。

1. 在<https://dw.pcl.ac.cn/cloud/>释放资源。

2. 申请时间到期后自动释放，提醒**做好备份**。

#### 帮助

1. 在资源申请过程中，如果有疑问，可以

- 发邮件给<infra@openeuler.org>咨询

- 在<https://gitee.com/openeuler/community-issue/issues>中提交问题，标题以`[鹏城实验室VM申请]`开头

