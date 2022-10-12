---
title: ARM上跑Mysql, 能行吗？
date: 2020-04-23
tags:
    - Database
    - Mysql
    - arm64
archives: 2020-04
author: bzhaoopenstack
summary: 本文介绍Mysql对于ARM平台的支持情况。
---
译者：[bzhaoopenstack](https://github.com/bzhaoopenstack)

作者: [Krunal Bauskar](https://github.com/mysqlonarm)

原文链接: https://mysqlonarm.github.io/Running-MySQL-on-ARM/

我相信在座的大多数都会有这个问题。事实上，在我开始主动开始#mysqlonarm 相关工作之前，我也有过同样的经历。在ARM上运行MySQL需要什么？真的有用吗？包依赖关系呢？它有什么样的表现？支持什么功能呢？社区支持这么玩吗？还有很多悬而未决的问题。。

让我们试着用简单的问答形式来回答这些问题。

#### Q: Mysql支持ARM架构吗?

A:支持，Mysql官方支持ARM。可以从mysql.com站点下载可用的软件包。

#### Q: 支持啥OS?

A: 目前支持RHEL-7 & 8/Oracle-Linux- 7 & 8，还没有发现发布其他OS的包。

#### Q: 我们能在ARM架构下从源代码在OS上(如ubuntu)构建Mysql吗?

A: 可以，能玩。我一直在源码构建二进制包，使用的是当前mysql的release tag mysql-8.0.19。同样也可以在CentOS上玩。这也意味着所有需要的包依赖性问题都得到了解决，或已经可用。

#### Q: ARM上的工具链可用吗?

A: 因为软件包是可用的，而且我能够从源代码构建它，所以默认的应用程序工具，如mysql shell/mysqladmin/mysqlslap/mysqldump/etc...，以及大量其他的默认程序都随二进制文件一起发布了。如果你关心某个特定的工具，告诉我，我会检查它们。现在，我尝试了一些我认为比较重要的工具，它们工作正常。

#### Q: MariaDB和Percona在ARM上是否支持各自的服务器规格?

A: MariaDB Community Server软件包（来自MariaDB公司）在ARM (CentOS7/Ubuntu-16.04/18.04)上可用，MariaDB服务器工具在ARM上暂未正式发布。 Percona尚未正式支持ARM ，但我能够从源代码构建它（ MyRocks / TokuDB不可用）。

#### Q: 如果工具不可用。这能阻止我在ARM上尝试MySQL(或其衍生软件)吗？

A: 不会，因为大多数工具都是符合mysql标准的，不是所谓的强绑定特定平台。所以你当然既可以把它们安装在X86，同时安装在ARM上(除非工具还没有移植到ARM上)。

#### Q: 社区支持这么玩吗?

A: MySQL on ARM 已经有一段时间了。ARM、高通、华为等多家厂商积极贡献，Mysql社区发展迅速。在对Mysql ARM优化方面，社区呈现很大的兴趣，非常多的开发者想参与其中。挑战极具吸引力，然而最麻烦的是ARM硬件资源短缺。如果你有兴趣参与，和我聊聊（给我发一封电子邮件）。

#### Q: 看起来都还行。性能咋样?

A: 这是一个大话题，所以我会在未来几天内发布多个关于这个话题的博文，但把它在一定范围内的表现是可比的。另一方面，ARM实例提供更好的价格比。

#### Q:可以从哪里获取帮助?

由于软件包可以从MySQL官方下载，我假定他们的服务提供也应涵盖ARM。和MariaDB一样。当然，除了官方支持之外，还有普通团体和独立开发者。

#### Command to build MySQL on ARM

```
cmake .. -DWITH_NUMA=1 -DDOWNLOAD_BOOST=1 -DWITH_BOOST=<boost-dir> -DCMAKE_INSTALL_PREFIX=<dir-to-install>
make -j <num-of-cores>
```

因此，在ARM上构建Mysql不需要什么特殊的flag。(假设你已经安装了标准依赖). 它会默认使用"CMAKE_BUILD_TYPE=RelWithDebInfo"来编译。

## 结论

MySQL on ARM已为事实，并且得到了日益增长的生态系统/社区来支持。可以来试试。当你不考虑性能或功能时，它可以成为你节约成本这个大目标的必选项。

*如果你还有问题/疑问，请告诉我。我会尝试回答*
