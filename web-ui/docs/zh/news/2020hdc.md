---
title: "HDC.Cloud | openEuler黑客马拉松"
date: "2019-12-10"
tags: 
    - meetup
    - summit
banner: "img/banners/banner-2020hdc.png?t=20191219"
author: "openEuler"
summary: "HDC.Cloud | openEuler黑客马拉松"
---

<ClientOnly>
  <news-newsHeader />
</ClientOnly>

<div class="markdown">
<div class="competition-nav competitionnav-fixed" id="menuinfo">
    <a data-menuanchor="section1" href="#">竞赛简介</a>
    <a data-menuanchor="section2" href="#section1">参赛要求</a>
    <a data-menuanchor="section3" href="#section2">赛题介绍</a>
    <a data-menuanchor="section4" href="#section4">大赛日程及报名安排</a>
    <a data-menuanchor="section5" href="#section5">奖项设置</a>
</div>
<br>
<img src="/img/banners/banner-2020hdc.png?t=20191219" style="width:100%;"/>
<br>
<br>
<h4 id="section1" style="text-align: center; margin-bottom:30px;">竞赛简介</h4>

华为HDC 2020 openEuler黑客松大赛，是华为公司面向全球操作系统爱好者举办的一场编程马拉松大赛。

华为在服务器操作系统领域已有近10年的技术积累，内部解决方案已广泛应用于运营商、政府、金融等行业ICT系统中。

华为鲲鹏处理器，兼容ARM架构，最大可集成64个物理核，采用多合一SoC芯片架构，单颗处理器实现了CPU、 RoCE网卡、SAS控制器、桥片等4颗芯片的功能, 是业界领先的数据中心处理器。

针对鲲鹏处理器，华为在服务器操作系统的性能、可靠性、安全性等方面做了深度优化。

为了促进鲲鹏计算产业的发展和生态建设，华为将内部服务器操作系统解决方案进行开源，并命名为openEuler。当前openEuler内核源于Linux，支持鲲鹏及其它多种处理器，能够充分释放硬件的计算潜能。

本次大赛将通过“线上初赛+线下决赛”的形式，让广大参赛者进一步体验和熟悉基于”鲲鹏处理器 + openEuler操作系统”的基础架构环境(构建、编译、部署、运行等)，共同推动软硬件应用生态的创新和发展。

<h4 id="section2" style="text-align: center; margin-bottom:30px;">参赛要求</h4>

参赛对象：操作系统技术爱好者，如高校学生、开源社区贡献者、企业职员等，华为员工除外

组队要求：2人(最多)/队

<h4 id="section3" style="text-align: center; margin-bottom:30px;">赛题介绍</h4>

##### 初赛内容

各大Linux操作系统发行版的OS基础容器镜像是用户构建应用镜像的基础，其大小对使用有比较大的影响；本题目重点解决如下问题：

1. 构建尽量小的容器基础镜像，减小应用镜像的体积

2. 提供跨架构的容器镜像构建工具，实现在x86平台上开发制作的容器镜像，可以在鲲鹏(ARM64)平台上运行

具体的要求如下：

1. 基于<a href="http://openeuler-os-image.obs.cn-north-4.myhuaweicloud.com/openEuler-1.0-1205-aarch64-dvd.iso">openEuler ISO</a>构建最小的基础容器镜像

    a. 构建环境不限

    b. 生成的镜像包含基础能力(vim,bash,yum),但是不破坏应用包之间的依赖关系

    c. 需要给出安装的应用包列表

    d. 尽量删除无用、冗余数据

2. 编码实现异构镜像构建工具，并制作基于基础镜像的最小httpd服务镜像

    a. 在使用Intel X86处理器的本地设备(Desktop or Laptop)上通过本工具能够构建可以在基于华为鲲鹏处理器(ARM64)的服务器上运行的容器镜像

    b. 生成的容器镜像应该符合OCI规范

    c. 容器镜像构建工具需要具备Pull/Push/Build功能:

    Pull:

    * 参考docker命令行格式
    * 能够从容器镜像仓库中拉取public镜像

    Push:

    * 参考docker命令行格式
    * 能够上传镜像到容器镜像仓库（支持用户名、密码配置）

    Build:

    * 参考Docker命令行格式
    * 支持最简单语法（FROM，CP，RUN，PORT，CMD）

上述过程生成的镜像，可以在鲲鹏服务器/虚拟机上使用<a href="/doc/events/2020hdc/iSula容器用户指南.docx">iSulad容器引擎</a>正常运行。

##### 初赛验收标准

1. 参赛期间编写的代码需要公开可访问，且正确引用其他开源代码(如涉及)

2. 镜像需要符合OCI格式

3. 镜像需要上传到公开可获取的镜像仓库

4. 应用镜像的Dockerfile需要上传到公开可获取的git仓库

5. 镜像可以在鲲鹏服务器(ARM64)上正常运行

6. 项目获胜者的递进关系如下:

    a. 完成基础镜像者晋级

    b. 如果均完成a，完成httpd服务镜像者且能正常运行者晋级

    c. 如果均完成b，则httpd服务镜像最小者晋级

##### 初赛作品提交指南

为了便于提交结果的自动化处理，需要以json格式组织作品信息，并以邮件正文形式发送到邮箱：<dev@openeuler.org>，格式如下：

```
{
    "app_image": {
        "bin_path": "bin/imagetool",  <= 容器镜像构建工具
        "make_method": "make",
        "url": "xxx"  <= 应用容器镜像地址
    },
    "base_image": {
        "bin_path": "bin/makeBase.sh", <= 基础镜像构建脚本
        "make_method": "make",
        "url": "xxx"  <= 基础容器镜像地址
    },
    "code_source": https://gitee.com/xxxx/xxxxx  <= 容器镜像构建工具源码地址
}
```

相关字段说明如下（以Golang为例）

```
type Image struct {
        // Url表示镜像地址
        Url string `json:"url"`
        // MakeMethod表示源码编译的方式（地址由CodeSource指定）
        MakeMethod string `json:"make_method"`
        // BinPath表示镜像生成可执行文件的地址
        BinPath string `json:"bin_path"`
}

type work struct {
        // BaseImage表示BaseImage相关信息
        BaseImage Image `json:"base_image"`
        // AppImage表示AppImage相关信息
        AppImage Image `json:"app_image"`
        // CodeSoure表示源代码地址
        CodeSource string `json:"code_source"`
}
```

##### 初赛操作指南

1. OCI规范请参考 - https://github.com/opencontainers/image-spec

2. 代码实现参考项目:

    • https://www.kernel.org/doc/html/latest/admin-guide/binfmt-misc.html

    • https://www.tomczhen.com/2018/05/13/cross-platform-build-docker-image/

    • https://lantian.pub/article/modify-computer/build-arm-docker-image-on-x86-docker-hub-travis-automatic-build.lantian

    • https://github.com/docker/buildx

    • https://github.com/containers/buildah

3. openEuler操作系统请参考 - https://www.openeuler.org/

4. openEuler 操作系统 ISO: <a href="http://openeuler-os-image.obs.cn-north-4.myhuaweicloud.com/openEuler-1.0-1205-aarch64-dvd.iso">点击下载</a>

5. openEuler Repo源配置: <a href="/doc/events/2020hdc/openEuler repo configuration howto.docx">点击下载</a>

6. iSulad 使用指南: <a href="/doc/events/2020hdc/iSula容器用户指南.docx">点击下载</a>

7. 基于鲲鹏处理器云服务平台: 鹏城生态开发者云 - https://dw.pcl.ac.cn/cloud/login

　　　申请鲲鹏虚拟机指南(<b style="color: red;">请按指南内容填写相关信息, 否则资源申请请求不予批准</b>):

　　　a. 登陆https://dw.pcl.ac.cn/cloud/login, 注册新用户:

　　　　用户名: 以”openEuler-”为前缀

　　　　邮箱:  与参赛报名时提供的联系邮箱一致

　　　b.新建项目, 指定项目信息:

　　　　项目名称 – 以“openEuler@hdc-”为前缀

　　　　项目信息 - “其他”， 以”HDC 2020 openEuler 参赛项目”为前缀

　　　　领域信息 – “其他”，“国产操作系统”

　　　　<img src="/img/events/2020hdc/1.png" width="100%" style="max-width:597px" />

　　　c. 产品信息:

　　　　产品名称 – 以”openEuler-iSula@hdc-”为前缀

　　　　产品信息 – “互联网类产品”

　　　　云服务器用途 – “开发”

　　　　<img src="/img/events/2020hdc/2.png" width="100%" style="max-width:595px" />

　　　d. 基本信息:

　　　　名称 – 以”openEuler-iSula@hdc-”为前缀

　　　　类型 – “虚拟机”

　　　　使用时长 – “90天”

　　　　数量 – “1”

　　　　CPU架构要求 – “鲲鹏920”

　　　　OS 版本要求 – “openEuler 1.0 Beta”

　　　e. 资源:

　　　　CPU – 2

　　　　虚拟机内存 – 4G

　　　　系统磁盘容量 – 80G

　　　　网卡数量 – 1

　　　　是否申请云硬盘 – 否

　　　　<img src="/img/events/2020hdc/3.png" width="100%" style="max-width:583px" />

<h4 id="section4" style="text-align: center; margin-bottom:30px;">大赛日程及报名安排</h4>

##### 初赛（线上）

　　报名时间：2019年12月10日——2019年12月31日

　　初赛时间：2019年12月23日——2020年1月17日

　　阶段晋级队伍：共15支队伍

##### 决赛（线下，深圳）

　　决赛时间：2020年2月11日

　　阶段晋级队伍：共3个等级获奖队伍

##### 报名方式

　　报名邮箱：<dev@openeuler.org>

　　报名邮件主题：openEuler黑客松报名+参赛队伍名称

　　报名邮件内容：

　　　• 参队名称

　　　• 参赛者姓名

　　　• 所在院校或公司名称

　　　• 专业或者职位

　　　• 联系电话

　　　• 联系邮箱

<h4 id="section5" style="text-align: center;margin-bottom:30px;">奖项设置</h4>

##### 大赛奖项

　　一等奖：1队

　　二等奖：2队

　　三等奖：3队

##### 参赛者权益

1. 2020华为开发者大会入场通券，参与华为面向ICT（信息与通信）领域全球开发者的年度顶级旗舰活动

2. 华为开发者大会纪念版T恤

3. 每支初赛晋级队伍可获得树莓派4开发板1块

4. 获奖选手获得赛事荣誉证书

5. 获奖选手将在华为相关宣传渠道（官网、社区、社媒）得到宣传报道

</div>