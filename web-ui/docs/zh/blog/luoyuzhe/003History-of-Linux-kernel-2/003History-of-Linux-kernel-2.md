---
title: 第三期Linux内核发展史-2
date: 2020-08-06
tags:
    - Linur
    - 内核
    - 发展史
archives: 2020-08
author: 罗宇哲
summary: Linux内核发展史-2
---

 _作者：罗宇哲，中国科学院软件研究所智能软件研究中心_ 

Linux是由赫尔辛基大学的Linus Torvalds开发的，在系统开发期间得到了因特网上广大UNIX程序员的帮助。它最初只是受Andy Tanenbaum教授的Minix（—个小型的类UNIX系统）启发而开发的一个程序，纯属个人爱好，但后来它逐步发展成为一个完整的系统。Linux的成功来源于其之前操作系统和应用软件的已有工作，主要是UNIX和GNU。本小结我们将介绍一下UNIX的发展简史。

### 一、UNIX操作系统发展历史

UNIX操作系统最初是由贝尔实验室开发的，当时的贝尔实验室是电信业巨头AT&T（美国电报电话公司）旗下的一员。UNIX是在20世纪70年代为DEC（数字设备公司）的PDP系列计算机设计的，它现在已成为一种非常流行的多用户、多任务操作系统。UNIX操作系统可以运行在大量不同种类的硬件平台上，其适用范围从PC工作站一直到多处理器服务器和超级计算机。

UNIX系统的主要特点有[1]：

1.简单性：许多很有用的UNIX工具是非常简单的，因此也是很小并易于理解的。

2.集中性：在UNIX中，当用户出现新的需求时，我们通常是把小工具组合起来以完成更复杂的任务，而不是试图将一个用户期望的所有功能放在一个大程序里。

3.可重用组件：将应用程序的核心实现为库。具有简单而灵活的编程接口、文档齐备的库可以常助其他人开发出同类程序，或者把这些技术应用到新的应用领域。

4.过滤器：许多UNIX应用程序可用作过滤器。也就是说，它们对输入进行转换并产生输出。

5.开放的文件格式：比较成功并流行的UNIX程序都使用纯ASCII码的文本文件或XML文件作为配置文件和数据文件。

6.灵活性：你不能期待用户都能非常正确地使用你的程序。所以，你在編程时应尽景考虑到灵活性，尽量避免随意限制字段长度或记录数目。

最初的Unix是用汇编语言编写的，一些应用是由叫做B语言的解释型语言和汇编语言混合编写的。B语言在进行系统编程时不够强大，所以汤普逊和里奇对其进行了改造，并与1971年共同发明了C语言。1973年汤普逊和里奇用C语言重写了Unix。在当时，为了实现最高效率，系统程序都是由汇编语言编写，所以汤普逊和里奇此举是极具大胆创新和革命意义的。用C语言编写的UNIX代码简洁紧凑、易移植、易读、易修改，为此后UNIX的发展奠定了坚实基础。

1974年，汤普逊和里奇合作在ACM通信上发表了一篇关于UNIX的文章，这是UNIX第一次出现在贝尔实验室以外。此后UNIX被政府机关，研究机构，企业和大学注意到，并逐渐流行开来。

1975年，UNIX发布了4、5、6三个版本。1978年，已经有大约600台计算机在运行UNIX。1979年，版本7发布，这是最后一个广泛发布的研究型UNIX版本。20世纪80年代相继发布的8、9、10版本只授权给了少数大学。此后这个方向上的研究导致了九号计划的出现，这是一个新的分布式操作系统。

1982年，AT&T基于版本7开发了UNIX System Ⅲ的第一个版本，这是一个商业版本仅供出售。为了解决混乱的UNIX版本情况，AT&T综合了其他大学和公司开发的各种UNIX，开发了UNIX System V Release 1。

这个新的UNIX商业发布版本不再包含源代码，所以加州大学柏克莱分校继续开发BSD UNIX，作为UNIX System III和V的替代选择。BSD对UNIX最重要的贡献之一是TCP/IP。BSD有8个主要的发行版中包含了TCP/IP：4.1c、4.2、4.3、4.3-Tahoe、4.3-Reno、Net2、4.4以及4.4-lite。这些发布版中的TCP/IP代码几乎是现在所有系统中TCP/IP实现的前辈，包括AT&T System V UNIX和Microsoft Windows。其他一些公司也开始为其自己的小型机或工作站提供商业版本的UNIX系统，有些选择System V作为基础版本，有些则选择了BSD。BSD的一名主要开发者，比尔·乔伊，在BSD基础上开发了SunOS，并最终创办了太阳计算机系统公司。

1991年，一群BSD开发者（Donn Seeley、Mike Karels、Bill Jolitz和Trent Hein）离开了加州大学，创办了Berkeley Software Design, Inc (BSDI)。BSDI是第一家在便宜常见的Intel平台上提供全功能商业BSD UNIX的厂商。后来Bill Jolitz离开了BSDI，开始了386BSD的工作。386BSD被认为是FreeBSD、OpenBSD和NetBSD、DragonFlyBSD的先辈。AT&T继续为UNIX System V增加了文件锁定，系统管理，作业控制，流和远程文件系统。1987到1989年，AT&T决定将Xenix（微软开发的一个x86-pc上的UNIX版本），BSD，SunOS和System V融合为System V Release 4（**SVR4**）。这个新发布版将多种特性融为一体，结束了混乱的竞争局面。

1993年以后，大多数商业UNIX发行商都基于SVR4开发自己的UNIX变体了。

UNIX System V Release 4发布后不久，AT&T就将其所有UNIX权利出售给了Novell。Novell期望以此来对抗微软的Windows NT，但其核心市场受到了严重伤害，最终Novell将SVR4的权利出售给了X/OPEN Consortium，后者是定义UNIX标准的产业团体。最后X/OPEN和OSF/1合并，创建了Open Group。Open Group定义的多个标准定义着什么是以及什么不是UNIX。实际的UNIX代码则辗转到了Santa Cruz Operation，这家公司后来出售给了Caldera Systems。Caldera原来也出售Linux系统，交易完成后，新公司又被重命名为SCO Group。

下图以树状图的形式展示了从UNIX系统衍生出的各种操作系统[2]：

<img src="./Derivate-OS-of-NUIX.gif">


### 二、总结

本小节中我们简要介绍了有关Linux内核的一个重要基础——UNIX操作系统。下一小节我们将介绍Linux应用程序的一个重要来源——GNU。

参考文献

[1]《Linux程序设计（第四版）》

[2] https://www.cnblogs.com/alantu2018/p/8991158.html