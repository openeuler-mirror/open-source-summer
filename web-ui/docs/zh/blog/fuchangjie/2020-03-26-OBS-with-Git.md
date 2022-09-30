---
title: 如何使用 openEuler OBS - （二）与gitee的联动
date: 2020-03-26
tags:
  - OBS
archives: 2020-03
author: Changjie Fu
summary: OBS系统如何借助Source Services自动获取git仓库中的代码。
---

## 概要

本文分为两部分：

 - 利用Source Services（下称源服务）直接获取git源码并编译成包
 - 利用webhook 使源服务在git仓库push时触发，从而实现OBS始终跟进git仓库最新版本源码的效果

> 此文章的全部步骤使用[openEuler OBS](http://openeuler-build.huawei.com/)完成，使用其他服务器时可能出现工具不全的情况。

## 利用源服务直接获取git源码并编译成包

### Source Services 相关

> Source Services 是用于以可靠方式验证，生成或修改源的工具。它们被设计为最小的工具，并且可以按照经典UNIX设计的强大思想进行组合。

源服务就像是系统中的函数，我们可以通过运行脚本调用它；而脚本就是Package中的_service文件。


### 创建使用源服务的Package

1. 通过命令行工具或者网页新建一个空的Package 

  <img src="./2020-03-26-OBS-with-Git-空Package.png" >

2. 进入Package目录并创建_service:

	* 网页端点击*Add file* ，点击*Choose a file*，并选择本地建好的_service文件。
	* 命令行则在Package目录中新建_service文件并上传之服务器。

3. 准备编辑_service文件

### 编辑_service文件

最基础的_service文件将会如下所示：

```powershell
	<services>
	  <service name="tar_scm">
	    <param name="scm">git</param>
	    <param name="url">git://github.com/cs2c-fu/hi.git</param>
	  </service>
	  <service name="recompress" mode="buildtime">
	    <param name="compression">xz</param>
	    <param name="file">*.tar</param>
	  </service>
	  <service name="set_version" mode="buildtime"/>
	</services>
```

最外层为`<services>`标记，在`<services>`内则为一个个`<service>`函数，而`<param>`则为`<service>`函数的参数。

为了实现“**利用源服务直接获取git源码并编译成包**”这个目标，

我们的_service应该类似于这样（以下格式请根据具体情况选择合适的顺序）：

```xml
<services>

  <service name="tar_scm">
    <param name="scm">git</param>
    <param name="filename">helloworld</param>
    <param name="url">git://github.com/cs2c-fu/hi.git</param>
    <param name="versionprefix">VERSION.git</param>
  </service>

  <service name="extract_file">
    <param name="archive">*.*</param>
    <param name="files">*/*.spec */*.patch</param>
  </service>

  <service name="recompress" mode="buildtime">
    <param name="compression">xz</param>
    <param name="file">*.tar</param>
  </service>

  <service name="set_version" mode="buildtime"/>

</services>
```

下面将对所需的服务逐一进行介绍：

**第一个服务：[tar_scm](https://github.com/openSUSE/obs-service-tar_scm)**

**tar_scm** 会将链接 url 中的仓库下载下来并打包为 tar 文件，文件包命名格式为：

>  [Name]-[Version].[commit_timestamp].tar

其中，[commit_timestamp]为 commit 十六进制时间戳。

可选参数：

 - **filename** 定义打包后文件的 Name，默认为git仓库名。
 - **versionprefix** 定以打包后文件的 Version 格式，默认为当前十进制时间戳。


在OBS官方服务器中， **tar_scm** 服务由于在空间利用率上表现不佳， 已被 **obs_scm**、**tar** 服务取代，但openEuler的外网OBS暂时还不支持**obs_scm**，所以这里选择 **tar_scm** 。

> 详见：[链接](https://openbuildservice.org/2016/04/08/new_git_in_27/)

**第二个服务：[extract_file](https://github.com/openSUSE/obs-service-extract_file)**

**extract_file** 可以从tar包中提取文件， 具体需要提取什么文件取决于git仓库中的文件格式。


一般来说我们可以将打包需要的内容分为四大类：

 - **源码** ： 参与编译过程的文件
 - **spec文件** ： 指导如何打包的规范文件
 - **patch文件** ： 修改源码的差异文件
 - **源文件** ： 不参与编译但需要打包的文件

对于**git仓库**来说，一般会将所有文件放到仓库的根目录。

<img src="./2020-03-26-OBS-with-Git-git仓库.png" >

此时我们需要将**spec文件、patch文件、源文件**提取出来， **源码**则留在tar包中等待之后的服务将其压缩打包。

对于**OBS仓库**来说，为了方便OBS系统使用，人们已经对源码进行压缩打包。

<img src="./2020-03-26-OBS-with-Git-OBS仓库.png" >
	
此时我们需要将**所有文件**提取出来并省略之后的压缩打包环节。

参数：

 - **archive** 定义提取来源文件格式
 - **files** 定义提取文件类型 _注意：存在一个顶层目录，其名称未知，因此文件名应以 “*/” 开头_

**第三个服务：[recompress](https://github.com/openSUSE/obs-service-recompress)**

**recompress** 会对指定文件进行压缩

参数：

 - **compression** 压缩格式，可选：none、gz、bz2、xz
 - **file** 压缩内容

**第四个服务：[set_version](https://github.com/openSUSE/obs-service-set_version)**

会将spec文件中的Version替换为obs_scm时的

`[Version].[commit_timestamp]`

spec文件中可以以

`helloworld-%{version}.tar.xz`

格式定位源码包。

### 等待编译完成

由于使用源服务获取源码，所以编译时需要额外过程与时间。

<img src="./2020-03-26-OBS-with-Git-OBS仓库.png" >

当状态显示为 **blocked** 时， 表明源服务正在运行。当源服务运行完毕时会正常开始打包过程。

我的参考案例：[链接](http://openeuler-build.huawei.com/package/show/home:changjie_fu/hi)

### Source Services 在实际场景中的应用

在[oVirt-SIG](http://openeuler-build.huawei.com/project/show/oVirt-SIG)组中，我们应用了源服务实现代码由git到OBS的同步。

首先，我们在git仓库中以：**spec文件、patch文件、 **源码tar包** 的格式上传并管理源码。

<img src="./2020-03-26-OBS-with-Git-gitee仓库.png" >

在OBS系统中建立对应包并以一下格式定义_service文件：

```xml
<services>
  <service name="tar_scm">
    <param name="scm">git</param>
    <param name="filename">ioprocess</param>
    <param name="url">https://gitee.com/openkylin/ioprocess.git</param>
  </service>
  <service name="extract_file">
    <param name="archive">*.*</param>
    <param name="files">*/*</param>
  </service>
</services>
```

由于我们已经很好的在git仓库中设置了存储格式， 此时我们只需将所有文件下载并提取即可。

在这之后，OBS系统会帮助我们完成编译与打包的环节。

## 利用 webhook 使源服务在git仓库push时触发

在写此文时，OBS系统还不支持gitee格式的webhook，所以以下内容为使用github仓库实现。

> obs可以创建令牌（token），当令牌被触发时，OBS会运行源服务。
>
> 将网址与令牌添加到git仓库的webhook列表中，就可以在git仓库中实现触发源服务，进而更新OBS中的包版本。
>
>
> **具体步骤：**
>
> 创建专属包的OBS Token（OBS令牌）：
> ```
> osc token --create <PROJECT> <PACKAGE>
> ```
>
> 命令将生成仅对Project/Package生效的token。
>
> - 使用命令 `osc token` 可以查看当前生效的令牌列表。
>
> - 使用命令`osc token --delete <TOKEN>` 可以删除令牌
>
>
> 打开git仓库网址（以github为例）：
>
>  <img src="./2020-03-26-OBS-with-Git-git仓库页.png" >
>
> 打开仓库 -> Setting -> Webhooks 
>
  <img src="./2020-03-26-OBS-with-Git-Webhook页.png" >
>
> 点击左上方的 Add webhook 。
>
> 
  <img src="./2020-03-26-OBS-with-Git-新建Webhook.png" >
>
> 在 Payload URL中以：
>
> ` http://openeuler-build.huawei.com/trigger/webhook?id=<令牌ID>`
>
> 为格式填入。
> 
> 在 Secret 中填入令牌秘匙，按需求选择trigger类型， 保证Webhook为Active状态。
>
> 之后点击 Add webhook 即成功实现。
>
> 可尝试触发trigger以验证成果。


