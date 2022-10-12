---
title: openEuler社区参与之旅
date: 2020-05-13
tags:
    - 社区运营
    - 参与贡献
archives: 2020-05
author: myeuler
summary: openEuler社区参与之旅，介绍如何一步步参与到开源社区以及我能在社区贡献什么。
---

## 引言

openEuler社区已经建立起来了，也有不少合作伙伴, OSV, ISV等参与进来。整个社区的治理结构也初步建立了起来。但毕竟是一个年轻的社区，因此有一些流程方面还有待优化，很多文档还有待于完善。

鉴于有很多希望参与到社区里的工程师对整个社区的运作流程，开发流程还比较陌生，我总结了一个文档来帮助一个工程师更容易的参与到社区中。

## openEuler社区概要

openEuler的主站点是https://www.openeuler.org/

<img src="./2020-05-13-openEuler-travel-01.png" >


主站点主要是提供一些入口，对于工程师来说，最重要的应该是<font color="red"><b>下载链接</b></font>：

https://www.openeuler.org/zh/releases.html

<img src="./2020-05-13-openEuler-travel-02.png" >

除了下载以外，对工程师来说，真正的<font color="red"><b>社区开始之旅的起点</b></font>：

https://www.openeuler.org/zh/developer.html

这个链接给大家做了一个简要的引导，但是不幸的是，对于一个新人来说，信息量依然非常大，可能有些摸不到头脑。下面，就让我带着大家一步步的化繁为简的做一次openEuler参与之旅吧。

## 法律合规是第一步，也是最重要的一步

“开源”这两个字眼虽然在很大程度上代表了自由，奔放，随心所欲，符合码农天生追“自由飞翔”的特质。但是开源并不是法外之地，因此法律合规是一个社区健康发展最重要的前提，没有之一。因此，任何一个人，如果想要参与到openEuler项目中，第一步就是要<font color="red"><b>签署CLA协议</b></font>。协议的签署网址是：

https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=

虽然协议并不复杂，但是作为一个码农，通常我都对这类法律文书都是免疫的，我们连需要给自己赔钱的保险合同都不会多花上一分钟时间看上一眼，对于这种需要自己奉献的条款又怎会关注呢？还有更关键的是，如果码农看懂了法律文书，那还是码农么？ 虽然这很大程度是我们码农的现状，但是我还是建议大家认真阅读一下协议，了解一下权益范围并没有坏处。

## 我们是开源的

openEuler社区原则上只接受开源协议的软件，哪些开源协议是社区认可的开源协议呢？大家可以参考下面的网址。这个网站上所列举的开源协议都是openEuler社区所能接纳的协议。

https://opensource.org/licenses/alphabetical

对于社区本身，我们默认使用mulan V2协议，https://opensource.org/licenses/MulanPSL-2.0，这是一个非常友好的开源协议，也欢迎大家更多的使用这个协议来开发开源软件。

## 我能做点什么

在签署完CLA协议，了解我们所认可的开源协议范围以后，需要完成社区的注册。

由于openEuler本身是开放到gitee.com上，因此需要大家在gitee上拥有账号。我们也衷心希望gitee能成长为世界级的代码托管平台。

当大家完成了这些过程以后，就需要考虑在社区里具体能做点什么了。参与社区有很多种方法和形式，如果总结起来，大体有下面的四类：

1. <font color="red"><b>提交一些需求，或者bug</b></font>，简单来说就是发觉哪里用的不爽，直接提要求。 或者在用openEuler的过程中发现了一些问题，然后需要在社区把这个问题提出来。

2. <font color="red"><b>为社区修正bug</b></font>，这是更高一个层面的参与社区了，在这个层面，参与者实质上是以一个开发者的姿态进入到了社区中。一般我们都提倡，除了提出问题，更期待大家能解决问题。

3. <font color="red"><b>贡献软件包</b></font>，发现openEuler缺失了一个软件包，帮openEuler把这个软件包补上。实际上贡献软件包的过程就是帮助openEuler提供更丰富功能的过程。希望随着大家的参与，openEuler能够成为一个“无所不有”的软件生态系统。

4. <font color="red"><b>开发新软件</b></font>，有自己的一些想法，独立开发一个全新的软件，并将这个软件贡献到openEuler社区，成为openEuler发行版本中的一份子。


我们就一个个来看看这4种参与方式如何进行把。


## 网站和社区

在具体讨论这四类参与方法之前，我先给出三个网址链接。

1. https://www.openeuler.org/

2. https://gitee.com/openeuler/

3. https://gitee.com/src-openeuler


第一个网址是openEuler的门户网站，是供大家获取一些通用信息的地方，前面已经提到过了。而真正我们所谓的“社区”则是体现在2，3这两个网址上。

这两个网址互相有链接，它们分别长这个样子：

<img src="./2020-05-13-openEuler-travel-03.png" >

<img src="./2020-05-13-openEuler-travel-04.png" >

长得这么像，为什么要分两个网址呢？ 两者有什么分工呢？我们在后续讲解中会慢慢的给大家说清楚。

不论怎么样，这两个网址，以及里面的内容将会是社区工作的主要场所。虽然人机界面并不友好，但我相信对于码农来说这不是一个大问题，因为码农们的世界从来都不曾经友好过。


## 参与方式一：提交需求&bug

最基本参与社区的方式当然是要先用一用社区的物件，看看还有哪些需要改进的地方。提出一些有价值的建议和意见了。这几乎是最简单参与社区的方式了。

在社区中，我们提交问题都是通过“issue”机制来进行。但是在提交之前，提交人得先明确这个issue要提交给谁。在社区里，我们是一个个“repo”来对功能进行分组的。比如我们著名的Linux操作系统的“内核”（kernel）就有一个独立的“repo”(通常我们称之为“仓”)。

如果你发现了一个内核的问题，或者需求，那么就需要找到内核相关的repo地址：https://gitee.com/openeuler/kernel

它的界面这个样子。

<img src="./2020-05-13-openEuler-travel-05.png" >

其中红圈里大家可以看到Issues这个字样，这就是我们所有问题&bug&需求的入口了。点进去以后可以看到：

<img src="./2020-05-13-openEuler-travel-06.png" >


红圈位置的按钮就是我们建立一个新的Issue的入口。

进入以后，就可以提交issue了，有分类栏来说明这个issue属于什么类别。

<img src="./2020-05-13-openEuler-travel-07.png" >

在这里，可能会有一些同学们会问：<font color="red"><b>为什么没有一个bugzilla</b></font>
？这是一个拷问灵魂的问题，是呀，为啥没有建立一个工程师们更为熟悉的bugzilla呢？我没有办法给出一个合理的解释，不过目前看越来越多的项目都逐步通过issue，PR等机制来管理项目，如果再独立构建一个bugzilla系统，那么和PR，Merge合入等的工作就需要进行交联，复杂度会增加，因此目前我们还是选择通过issue来管理bug和需求。

这里有一个小问题，我的问题需要提交到哪里去呢？

### Issue的归宿

总体来说，提交issue分如下几类：

1. 具体软件的问题直接提交到相关的软件repo中，比如上面所提到的kernel的repo中。

2. 社区中的一些基础设施用的不爽，比如网页看起来不顺眼等，提交到https://gitee.com/openeuler/infrastructure，基础设施组。

3. 如果是一些社区治理方面问题，例如技术选型，软件的增加，删除，gnome和KDE哪个更图形界面原教旨主义一些等问题可以提到https://gitee.com/openeuler/community里。

4. 如果你实在不知道该提到什么地方，就统统提交到https://gitee.com/openeuler/community-issue，这里会为你排忧解难。


更为详细的issue提交流程可以参见如下的专业讲解。

https://gitee.com/openeuler/community/blob/master/zh/contributors/issue-submit.md


## 参与方式二：修复bug

在社区里，通常我们希望提出问题并同时解决问题，如果有一个问题，当然最好的情况是同时提供问题解决的patch补丁。我们以社区的轻量化容器引擎iSulad为例，https://gitee.com/openeuler/iSulad，假定我们需要为iSulad提交一个patch补丁，基本流程如下：

### 第一步：建立自己的分支

<img src="./2020-05-13-openEuler-travel-08.png" >

在红圈处先要Fork一个“分支”到自己的账号下。如果大家不清楚fork的含义，建议学习一下git的使用方法。在这里要提一句，无论如何，现代工程师要理解git的开发模式，不了解git在当代几乎会寸步难行。


### 第二步，修改代码并生成Pull Request(简称PR)

当fork完毕以后，大家可以在下图的红圈1中发现，目录已经从openEuler切换成了自己的账户。

<img src="./2020-05-13-openEuler-travel-09.png" >

接下来，就可以在自己的“分支”上进行代码的修改了。

修改完以后，点击红圈2中的+Pull Request，这可能是提交代码中最关键的一个步骤，这里会正式生成一个patch并送到https://gitee.com/openeuler/iSulad这个原始社区。

比如我修改了一个函数，增加了一行printf(“hello, world”)这行代码。那么PR看起来就是这样的：

<img src="./2020-05-13-openEuler-travel-10.png" >

你需要为这个PR起一个名字，同时填写一个说明。分别是红圈1和2，最后确定patch没有问题以后，点击红圈3中的“创建”按钮提交。

你会在openEuler/iSulad上看到你所提交的PR，红圈一表明你提交的PR已经进入了iSulad的社区，红圈2中的数字228是这个PR的编号。同时这个PR的URL是：https://gitee.com/openeuler/iSulad/pulls/228

<img src="./2020-05-13-openEuler-travel-11.png" >

至此，作为一个patch提交者的工作就做完了，你剩下所要做的事情就是耐心的等待iSulad开发组的maintainer来审核你的patch，比如我相信今天晚上他会非常诧异，谁提交了这么一个stupid的patch，而且公然用useless demo这样的PR题目来挑战他脆弱而敏感的maintainer神经。

 

因此，你的PR可能有三种命运：

1. 被iSulad社区接受。

2. 被iSulad社区残忍的拒绝。

3. 提出修改意见，修改后再提交PR。goto 1


不仅仅是可以提交代码的PR，任何修改，甚至是为readme修正了一个拼写错误，所遵循的流程都一摸一样。


更细致，更专业的介绍请参考：

https://gitee.com/openeuler/community/blob/master/zh/contributors/Gitee-workflow.md

这里有一步步的教程引导大家来提交。


另外，PR的提交也在很大程度上体现了提交者的专业能力和亲和力。Be nice很重要，下面的链接可以帮助大家理解如何更优雅的提交一个PR。

https://gitee.com/openeuler/community/blob/master/zh/contributors/pull-request.md


<font color="red"><b>好了，恭喜您，至此，您的第一次真正意义上的社区开发之旅就画上了一个完美的句号。</b></font>



让我们进入下一个挑战环节，为openEuler增加一个新的软件包。


## 参与方式三：贡献软件包

在能够为openEuler贡献一个软件包之前，需要我们的开发者理解两个基本的概念：

1. 什么是Linux的软件包。或者说Linux操作系统是怎么组织的。

2. 如何制作一个软件包。


### OS是怎么组织的

显然这是一个非常巨大的话题，可能需要写一本书来讲OS是怎么组织，怎么构建出来的。在这里我只能简要的给大家介绍一下。


实际上，一个OS系统的组成既复杂，也简单。


何所谓简单呢，其实OS本质上就是一堆安装包的大杂烩，就类似我们不论使用Windows也好，使用Android也罢，或者使用Linux，我们都经历过“安装”这个概念，就是从网上，或者是从“仓库”中下载一个安装包，然后安装到系统上，所以大家可以看到安装的“进度条”。实际上，一个OS的安装过程和在andorid上安装微信的道理一摸一样。只不过所谓的安装OS是需要一次性的要把几千个软件包按照一定的顺序安装到机器中。


那么OS所谓的组织很复杂呢，大家可以想象以下，几千个软件，他们之间会有很多的交联关系，通常我们叫做“依赖关系”，就好比，如果你想用微信小程序，那么前提是必须先得有微信，那么安装微信小程序的前提就是必须要先安装微信。因此，即使我们考虑一个OS的安装过程，其实也是非常复杂的，必须要精确的计算哪些软件需要先安装，哪些需要后安装。随着系统的膨胀，那么这些软件包之间就形成了复杂的网状关系。即使我们这些行业内的人都为此头痛不已。


讲了这么多，和我们的openEuler社区开发有啥关系呢？其实，上面的讲解是要让大家理解，任何OS的基本零件就是软件包，就类似组成人体的基本零件是细胞一样。这一个个软件包就是构成OS的一个个基本零件。


在Linux的世界，有两种基本的安装包格式：

#### RPM

这个格式是redhat, suse, WindRiver, openEuler等所选用，目前在企业市场，基本是以这些厂家为主，因此rpm格式在商用企业市场用的比较多。

#### Deb

这个格式是debian, Ubuntu, android使用的，目前在desktop，终端侧用的比较广泛。


这两种格式本身没有什么优劣之分，只是不用厂商的选择而已。当然，对于客户，开发者来说，世界被割裂成为两个互不兼容的部分总归是一种不必要的残忍。对于这个问题社区也有不同的尝试，但目前为止还没有出现某个大一统的软件包格式能够终结这个分裂的世界。


不过幸好我们有容器，很大程度上，容器的出现缓解了这个问题。那未来能不能找到一条优雅的技术道路将这些不兼容，将这些复杂的软件包的依赖带来的诸多痛苦一并解决掉呢？我把这个问题留给本文的爱好者吧，也许在你们中间就会出现这样的“历史终结者”。

所以，一个软件从源代码到能进入到我们的OS安装光盘中，要经历三个步骤。

<img src="./2020-05-13-openEuler-travel-12.png" >

#### 第一步：

源代码开发阶段，也就是写程序的阶段。这个阶段可以在任何地方，可以在github，gitlab, gitee等代码托管平台上，也可以是自己的笔记本电脑上。

#### 第二步：

将代码编译，生成二进制可执行程序。并且制作RPM软件包，其中“制作RPM”的过程实际上也是一种“编程”，只不过使用的是一种定义好的脚本语言，“程序”是一种叫做spec的文件。讲真，spec的编写是非常不符合老派程序员思维的，那种分段式的，跳跃式的，宏式的写法绝对挑战老派程序员的神经。所以，我们有很多很好的程序员，但是却很少有程序员能将一个程序真正制作成一个rpm包（或者deb包）。希望大家能挑战一下自己，成为一个RPMer。真的，不难，但是够你手忙脚乱一阵的。

我们有一个rpm的编写规范，可以供大家参考。

https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md


#### 第三步

将这些rpm包放在iso中，做成安装光盘。这一步一般的工程师不用感知，后台有自动化的系统来完整整个工作，而且相关的工具我们也会开源到openEuler中。也就是说，后续任何人都可以简单的为自己构建一个My Linux。


那就让我们看看如果你有一个项目在github上，我们如何将它最终转变成为安装光盘上的一个软件包吧。


### 首先，你得有一个组织

人生活在社会中，无时无刻不属于某个组织，并受到一些人的领导，比如白天，你需要属于某一个公司组织，晚上，你需要属于一个家庭组织。


社区也一样，在你想要把一个软件做成软件包放到openEuler系统中之前，你需要明确两件事情：

1. **你自己属于哪个组织**？

2. **你要加入的这个软件包属于哪个组织**？


在openEuler社区中，它的基本“组织”单元是SIG组，也就是special interest group，我至今没有弄明白为什么“兴趣”要加上“特殊”这个极易产生歧义和联想的前缀。不过anyway，如果你想有归属感，你有两种选择：

1. 寻找到和你具有同样“特殊爱好”的小组，然后申请加入。

2. 你的爱好太“特殊”以至于目前还没有志同道合的人，自己申请建一个。


openEuler所有的SIG组都在https://gitee.com/openeuler/community/tree/master/sig列出来，大家可以参考。


如果你有意愿，同时也展示了对某些“特殊爱好”有着深厚的积累或者惊人的天赋，那么欢迎你参照https://gitee.com/openeuler/community/blob/master/zh/technical-committee/governance/README.md完成一个新的SIG组的申请。我不得不说，这个流程不光看起来有一些复杂，也不友好，实际操作起来也是这样的。但我相信这难不倒码农，我们不就是为了制造这些复杂和不友好而生的吗！


最后一步，当创建完SIG的PR申请以后，需要到技术委员会(TC)的例行会议上进行评审，在https://gitee.com/openeuler/community/tree/master/zh/technical-committee可以找到TC委员会的基本信息，还有联系方式，大家可以订阅TC的邮件列表来获取一些动态，特别是例会的信息。


既然说到了TC（技术委员会），我们就简要讲一下openEuler的组织结构吧。

## 组织结构

openEuler是一个完全开放的组织架构，而且非常简单，https://gitee.com/openeuler/community这里可以看到基本的情况。

<img src="./2020-05-13-openEuler-travel-13.png" >

我想这副图已经说的很清楚了。


### 开始干活，先要弄明白干什么

当然，即使你完全不属于任何一个SIG组，理论上也能提交一个软件包到openEuler中，只是被接受的概率相对较低而已。其主要原因是很难来评估相关提交的质量，SIG组很大的意义就在于一些专业方面的人能够为每次提交做出质量的保证。


软件包本身必须是要属于某一个SIG的。以我自己常用的一个软件包为例，我每次写完程序以后，都总会执行一下cloc这个命令，看一下今天又新增了多少行代码，以期获得一下码农与生俱来的成就感，并中和一下写PPT带来的空虚和乏力感。


显然cloc是一个开发类的工具，帮助码农统计代码行，幸运的是，拥有同样“特殊爱好”的人并不在少数，他们建立了一个dev-utils的SIG组，https://gitee.com/openeuler/community/tree/master/sig/dev-utils，我们可以将cloc这个软件归属于这个SIG组。


### 如何把大象放到冰箱里

一般来说，增加一个软件包到openEuler中，需要如下的几个大步骤

1. 让系统为你的cloc软件包建立一个“仓”，也就是git仓。

2. 上传制作cloc软件包所需要的“零件”

3. 将这个软件系统加入到openEuler的自动化编译系统中，由系统自动化构建出软件。


#### 建仓

建仓其实就是提交一个PR，一般来说需要修改三个文件。

1. https://gitee.com/openeuler/community/blob/master/sig/dev-utils/README.md

2. https://gitee.com/openeuler/community/blob/master/sig/sigs.yaml

3. https://gitee.com/openeuler/community/blob/master/repository/src-openeuler.yaml


修改第一个文件README.md将你要加入的cloc软件的名字和地址放上去。

修改sigs.yaml文件，将cloc软件增加到dev-utils这个SIG分组下面。

修改src-openeuler.yaml将cloc增加到src-openeuler里。


你要做的就是照猫画虎的把这三个文件修改了，然后提交PR就可以了。剩下的就是等待“命运的裁决”。


当申请的结果被批准以后，你所需要的“仓”就会被系统自动建立起来，对于cloc来说，它的代码仓的位置在https://gitee.com/src-openeuler/cloc，这是PR被批准以后由系统自动为我建立的。


剩下的时间，你就可以开始真正上传制作cloc软件的原材料了。

#### 上传软件包

一般来说，一个软件只需要上传两个“原材料”就足够制作一个软件包了。如下图所示：

<img src="./2020-05-13-openEuler-travel-14.png" >

第一个材料：首先要上传这个软件包的spec文件，也就是告诉构建系统如何编译，制作cloc这个软件包。

第二个材料：cloc的源代码压缩包。

其它零件：如果spec中需要有patch，那么也需要把相关的patch文件上传到仓中。


上传完毕一个软件包所需要的原材料，下一步就是要把这些原材料加入到构建系统中，使之能够被真正编译，生成一个实际的软件包。


#### 加入构建系统

openEuler现在使用obs作为构建工具系统，大家可以参考下面的这个链接把自己的软件加入到obs中

https://gitee.com/openeuler/community/blob/master/zh/contributors/create-obs-package.md


加入到构建系统中，就意味着你的软件可以被系统自动编译，自动生成rpm包，继而在后续的openEuler发行版本中出现。


#### TIPS

在整个过程中有几点需要开发者要注意：

1. <font color="red"><b>能够本地构建</b></font>：提交的软件包首先要在自己的笔记本，或者服务器上能够编译通过。也就是如果你的软件包在本地无法构建成功，那么上传到openEuler社区也不会构建成功。因此。我们建议最好能下载最新的openEuler版本，安装以后通过rpmbuild等命令来进行构建验证。

2. <font color="red"><b>保证软件包可用</b></font>：软件除了能够被编译和生成软件包，还要能正确运行，因此，在本地环境要保证制作出来的软件包能够：

a)   正确的安装

b)   正确的卸载

c)   正确的升级

d)   软件的功能是正常的。

3. <font color="red"><b>保证多体系架构支持</b></font>：openEuler目前支持x86_64和ARM64两种指令集，因此在构建过程中需要能够保证软件包在这两种环境下都能被正确编译和运行。虽然ARM64环境可能并不那么容易获取，但幸运的是，一般性软件在这两个系统上没有那么大的差异。

4. <font color="red"><b>保证正确的依赖关系</b></font>：一个软件通常都需要依赖其它的一些软件才能运行，比如所有软件都需要依赖glibc这个库来执行，一些复杂的软件可能会依赖很多软件包来提供功能。这些软件包可能已经在openEuler社区中有了，也可能没有。如果没有，那么就需要同时在openEuler社区中将这这些软件包补齐才行。比如cloc这样一个小软件，缺需要依赖如下的几个perl的软件包：

![img](http://image.huawei.com/tiny-lts/v1/images/e505b26c4c16514e5669_678x206.png@900-0-90-f.png)

也就是说在提交cloc软件包的同时，也需要同时提交这几个软件包，这样才能保证cloc能够被系统正确的编译和构建出来。

5. <font color="red"><b>保证spec文件的规范性</b></font>：要保证spec文件是“规范”的，避免将外部的spec直接引入到openEuler中，因为如前所述，因为选择包的范围，依赖关系，版本等都不相同，同时保证所有软件包spec是一致的，请依照前面的rpm制作规范中的内容来书写spec文件。

 

因此，制作一个软件包，有的时候远比想象中的要复杂一些。但好在这并不是一个难度很大的事情，只需要提交一个软件包，走一遍流程，后续就会轻车熟路了。


## 参与方式四：开发新软件

上面讲的过程都是怎么给“别人”的软件提意见，怎么把“别人”做的软件添加到openEuler社区。但是每一个真正做软件的人内心都希望能拥有属于自己的作品，那么如何建立自己的作品，如何将自己的作品融入到openEuler社区呢？

 

将自己的作品融入到openEuler社区有如下两种方法：


### 方法一：在其它社区开发，集成到openEuler中

假定你已经在github，gitlab或者gitee上拥有了自己的项目，那么只需要按照参与方式三那样，将软件加入到src-openeuler这个repo仓就可以了。


### 方法二：在openEuler社区中开发，在openEuler中集成

另外一种方法是，直接在https://gitee.com/openeuler中建立项目，类似将项目“托管”到openEuler社区。比如现在社区中的iSula和A-Tune这样的项目就是这样的模式。

<img src="./2020-05-13-openEuler-travel-15.png" >


至此，我相信所有人都能明白了为什么openEuler会建立两个仓：

https://gitee.com/openeuler

https://gitee.com/src-openeuler


openeuler这个仓是存储所有“原生态”的软件，也就是为原创性的软件提供一个展示的舞台，或者是一个孵化器平台。

而src-openeuler则是为openEuler的release发行版提供生成rpm包等构建信息等的地方。


因此，当一个很有梦想，很有情怀的工程师突然有一天有了一个很棒的idea，那么他可以依照下面的过程来深度参与到openEuler中。

1. 在TC委员会的例会meeting中申请一个开源项目，比如项目名称叫做“broken_dream”。

2. 如果TC委员会认为这是一个很好的idea，并且认为值得为破碎的梦想提供一个机会，那么我们会在https://gitee.com/openeuler中建立一个repo，网址就是https://gitee.com/openeuler/broken_dream

3. 这个项目在openeuler中持续开发和孵化，直到有一天，大家认为broken_dream已经足以成熟到为所有人提供破碎的梦想服务了，那么就可以在src-openeuler中建立一个仓，为broken_dream提供相关的spec文件，制作成为一个rpm。

4. 最终broken_dream.rpm会随着openEuler的发布版本走遍全世界，为世界人民提供broken_dream功能。


我始终认为，一个工程师，在他的职业生涯中，至少要有一个，哪怕只有一个项目和他自己的名字是息息相关的。只有这样，才能在孙子，孙女骑在我们背上，问我们这辈子做的最棒的事情是什么的时候，我们可以让他们爬下来，然后直起身，看着他们天真无邪，对未来充满憧憬的大眼睛，认真的问他们：你知道broken_dream的作者是谁吗？


最后，我要感谢openEuler社区中每一个贡献者，特别是文档的撰写者们，文档对于码农们来说永远是痛苦的源泉，但正是各位文档的撰写者的辛勤工作，才使得本文能够有一个机会为大家呈现一个完整的openEuler参与之旅。


## openEuler社区欢迎大家