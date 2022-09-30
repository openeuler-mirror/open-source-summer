---
title: Web开源服务之ARM64现状
date: 2020-04-14
tags:
    - web
    - arm64
archives: 2020-04
author: Xiyuan Wang
summary: 本文介绍华为在Web主流开源服务中推动ARM64支持的情况。
---

社区核心参与者：[Martin Grigorov](https://github.com/martin-g)、[Michael Rumph](https://www.linkedin.com/in/mikerumph/)、[王玺源](https://github.com/wangxiyuan)

# 背景

开源界中Web服务众多,但其中很多软件对ARM64的支持并不理想。或是没有官方CI测试保证代码质量，或是在ARM64上的性能明显差于X86_64，甚至有的服务根本无法在ARM上运行。为了完善Web领域的ARM64生态，我们参与了主流的几个开源社区，旨在推动Web on ARM64。以下是我们近期的一些进展，以供大家参考。


# 概述

我们目前参与了主流的共9个Web相关项目。如下所示

|  项目   | 主要语言 |
|   ---   |   ---  |
| Apache Httpd Server  | C |
| Apache Tomcat  | Java |
| Memcached | C |
| Nginx | C |
| Lighttpd | C |
| JBoss/WildFly | Java |
| HAProxy | C |
| Squid | C++ | C |
| Varnish Cache | C |

针对这些项目，我们按照以下三个方面循序渐进的推动中:

1. 能不能在ARM上运行
2. 如何稳定在ARM上运行
3. 怎么更好的在ARM上运行

# 能不能在ARM上运行

我们可以看到这9大项目主要由Java和C/C++编写。

首先，像Python、Java这种自带runtime的语言天生就是跨平台的。这样的项目在ARM64平台上至少可以保证程序的可运行。

而C/C++项目则需要先编译成ARM64平台的目标可执行文件。这样的项目则需要先进行编译测试。

经过我们的测试，这9个Web项目都可以在ARM64上成功编译并运行。

# 如何稳定在ARM上运行

所谓稳定，包含两个方面：

1. 软件在ARM64上是否和在X86_64上行为一致？
2. 随着代码更新迭代，软件在ARM64上是否持续可用？

## 行为一致

我们常遇到两类行为一致的问题：

1. 同样的代码，不同的结果
2. 同样的功能，不同的支持

很遗憾，由于架构不同、底层实现不同等原因，很多软件的某些行为在X86_64和ARM64上的行为并不一致。

例如，之前的[文章](https://kunpengcompute.github.io/2020/04/08/arm-you-hua-he-java-math-ku-you-guan-de-na-xie-keng/)提到的Java中Math计算结果的差异。

又或者某些功能依赖独有的平台特性或者特殊的第三方库，导致在X86_64上可以运行的功能，在ARM64上却执行失败。

例如我们发现WildFly官方发布的源码包中缺少了个别ARM64平台的`.so`文件，这就导致个别调用`.so`的功能不可用。

针对这种问题，我们需要打开代码逐个分析、逐个修复。保证所有测试在ARM64上全部通过。

## 持续可用

CI/CD是保证软件持续可用的重要方法。主流软件的CI系统都有X86_64平台的测试。而ARM64平台的少之又少。

针对这个问题，我们推动了这9个项目的ARM CI支持。除Lighttpd还在推动中以外，其他8个项目目前都已支持了ARM CI。甚至其中4个项目已经官方声明了ARM64的支持（详见附录）。

其中Httpd、Tomcat、Memcached、HAProxy和Varnish Cache通过Travis CI支持了ARM64测试。Nginx使用内部CI，对外不可见。Squid使用自己的树莓派。而JBOSS使用了我们捐献的基于Kunpeng 920的ARM虚拟机。同时我们也计划捐献同样的测试机到Lighttpd社区中。

随着ARM CI的落地，我们将持续保证ARM CI的稳定。我们相信在不久的将来，这9大核心Web项目都会官方声明ARM64的支持，并满足用户在ARM64上稳定、高效使用Web服务的需求。

# 怎么更好的在ARM上运行

我们不仅希望软件在ARM64上能用，还在不断探索如何让软件在ARM64上用的好。其中**性能优化**是重中之重，也是我们未来一段时间的主要投入点。

例如，有些软件只实现了X86_64的汇编实现，但缺少ARM64的汇编代码。

又或者有些在X86_64上纯软实现的功能，可以在ARM64上通过下沉至硬编码的方式提高性能。

甚至还可以考虑如何最大化利用ARM64的多核优势，或规避ARM64的锁劣势等等。

关于性能优化的内容，我们将在以后的文章中针对不同的软件一一细说。敬请期待。

# 操作系统支持

一般情况下，开源软件很少自己分发不同操作系统的安装包。以我们参与的9个Web服务为例，只有Nginx提供了Ubuntu的安装包，Varnish Cache只提供了编译好的可执行文件，而其他7个服务仅仅提供了源码。

针对Nginx这种官方提供安装包的项目，我们希望它能提供更多操作系统的安装包，在我们的推动下，Nginx社区已表示下一步会推出CentOS和Alpine的安装包。OpenEuler也在我们的规划中。敬请期待。

大多数只提供源码或可执行文件的服务，针对这种情况，各个操作系统需要自行打包、分发。以OpenEuler为例，可以看到在官方[Repo](https://repo.openeuler.org)中已经支持了部分Web服务aarch64安装包。丰富的安装包支持也是操作系统易用性的重要体现。我们相信随着ARM64软件生态的不断丰富，OpenEuler的仓库也会不断充实。


# 附录

最后附上我们参与Web社区的总览表格及相关链接，感兴趣的同学可以进一步详读，有任何问题，欢迎留言。

| | Official arm64 CI | CI tool | Package in Downloads | Official ARM support |
| ---- | ---- | ---- | ---- | ---- |
| [Apache Tomcat](https://tomcat.apache.org/) | [YES](https://github.com/apache/tomcat/commit/f386fbb4abaa3fe8f3b3df1da7d14f756c729e2e) | [TravisCI](https://github.com/apache/tomcat/blob/master/.travis.yml) | [Binary](https://tomcat.apache.org/download-90.cgi) | WIP(work in progress) |
| [Memcached](https://memcached.org/) | [YES](https://github.com/memcached/memcached/pull/593) | 1. [BuildBot](http://build.memcached.org:8010/) 2. [TravisCI](https://github.com/memcached/memcached/blob/master/.travis.yml) | [Source Code](https://memcached.org/downloads) | [YES](https://github.com/memcached/memcached/wiki/Hardware) |
| [Apache httpd](https://httpd.apache.org/) | [YES](https://markmail.org/message/ajm3eouaqfhm22ox)  | [TravisCI](https://github.com/apache/httpd/blob/trunk/.travis.yml) | [Source Code](http://httpd.apache.org/download.cgi) | [YES](https://github.com/apache/httpd/blob/2.4.x/CHANGES#L17-L20) |
| [NGINX](https://nginx.org/) | [YES](https://mailman.nginx.org/pipermail/nginx-devel/2020-January/012943.html) | Internal | Only for [Ubuntu](https://nginx.org/en/linux_packages.html) LTSs | [YES](https://nginx.org/en/linux_packages.html#Ubuntu) |
| [Lighttpd](https://www.lighttpd.net/) | NO | [Jenkins](https://ci.lighttpd.net/view/lighttpd1.4/job/lighttpd1.4/) | [Source Code](https://www.lighttpd.net/download/) | NO |
| [JBoss/Wildfly](https://www.wildfly.org/) | [YES](https://ci.wildfly.org/viewType.html?buildTypeId=WF_MasterLinuxArm64OpenJ911) | [TeamCity](https://ci.wildfly.org/) | [Source Code](https://wildfly.org/downloads/) | NO |
| [HAProxy](https://www.haproxy.org/) | [YES](https://github.com/haproxy/haproxy/commit/9bf2a1be89a6eaddb00f07b9d069a9a16c24c037) | 1. [CirrusCI](https://cirrus-ci.com/github/haproxy/haproxy) <br> 2. [TravisCI](https://github.com/haproxy/haproxy/blob/master/.travis.yml) | [Source Code](http://www.haproxy.org/) | [YES](https://www.haproxy.org/#plat) |
| [Squid](http://www.squid-cache.org/) | [YES](http://build.squid-cache.org/computer/arm64-rpi/) | [Jenkins](http://build.squid-cache.org/) | [Source Code](http://squid-cache.org/Versions/) | NO |
| [Varnish Cache](https://github.com/varnishcache/varnish-cache/) | [YES](https://github.com/varnishcache/varnish-cache/pull/3195) | [Travis](https://github.com/varnishcache/varnish-cache/blob/master/.travis.yml) | 1. [Source Code](https://varnish-cache.org/releases/index.html) <br> 2. [Package](https://packagecloud.io/varnishcache) | NO  |
