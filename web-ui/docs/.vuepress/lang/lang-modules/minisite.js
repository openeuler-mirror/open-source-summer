/**
 * @file  minisite页面国际化配置入口
 * */

module.exports = {
  cn: {
    MIGRATION_BANNER_TEXT: ["迁移指南"],
    MIGRATION_DESC: [
      "随着数字化转型深入，操作系统正在向支持多样性计算、支持全场景的方向发展，在进行操作系统升级时，企业面临以下挑战：硬件兼容性、软件兼容性、升级后系统环境如何快速恢复？升级后如何能够更好发挥系统性能？openEuler 作为一款面向数字基础设施的开源操作系统，最优支持多样性计算，满足服务器、云、边缘和嵌入式全场景。针对企业在升级操作系统时的需求，推出这份升级指南，助力企业简单、平稳、高效进行操作系统升级。",
    ],
    MIGRATION_SOURCE_DOWNLOAD: {
      TITLE: "资源下载",
      SOURCES: [
        {
          NAME: "oec-hardware",
          DESCRIBE: "openEuler硬件兼容性验证测试框架",
          DESCRIBE_DETAIL:
            "oec-hardware是保证 openEuler 与硬件平台的兼容性，验证仅限于基本功能验证，不包括性能测试等其它测试",
          VERSION: "1.0.0",
          LINK_TITLE: "软件下载",
          DOCUMENT_LINK:
            "https://gitee.com/openeuler/oec-hardware/blob/master/README.md",
          LINKS: [
            {
              NAME: "获取源码",
              LINK: "https://gitee.com/openeuler/oec-hardware",
            },
          ],
        },
        {
          NAME: "Compass-CI",
          DESCRIBE: "一个可持续集成的开源开放式测试服务平台",
          DESCRIBE_DETAIL:
            "集构建&测试系统、登录调测、测试分析比较、辅助定位于一体，旨在给社区开发者提供友好的开发体验，与社区开发者一起繁荣开源软件生态及提升开源软件质量。",
          VERSION: "1.0.0",
          LINK_TITLE: "开始使用",
          DOCUMENT_LINK:
            "https://gitee.com/openeuler/compass-ci/blob/master/README.zh.md",
          LINKS: [
            {
              NAME: "获取源码",
              LINK: "https://gitee.com/openeuler/compass-ci",
            },
            // {
            //   NAME: "平台使用指导",
            //   LINK: "https://gitee.com/openeuler/compass-ci/blob/master/README.zh.md",
            // },
          ],
        },
        {
          NAME: "x2openEuler",
          DESCRIBE: "从其他系统迁移到openEuler硬件和软件、配置兼容性评估",
          DESCRIBE_DETAIL:
            "软件评估，支持扫描并分析软件包、源码包，评估软件的兼容性及可移植性。配置评估，支持扫描并收集环境的操作系统配置信息，评估用户操作系统的配置兼容性。硬件评估，支持扫描并分析用户环境硬件信息，评估硬件兼容性。",
          VERSION: "2.0.0",
          LINK_TITLE: "软件下载",
          DOCUMENT_LINK:
            "https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/thirdparty_migration/x2openEuleruseguide.html",
          LINKS: [
            {
              NAME: "软件获取",
              LINK: "https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/",
            },
          ],
        },
        {
          NAME: "oecp",
          DESCRIBE: "操作系统之间的差异比较及兼容性分析工具",
          DESCRIBE_DETAIL:
            "1.检测2个ISO（基于RPM）的软件包，软件包内文件，库文件接口（C/C++）,内核KABI的变化差异，根据这些差异可以分析2个OS之间的兼容性，为软件移植提供了重要参考\n2.OECP还可以检测同一个软件（RPM包）在不同版本下的变化以及差异，判断软件包的文件，接口等变化，可以分析得出软件不同版本之间的兼容性",
          VERSION: "1.0.0",
          LINK_TITLE: "软件下载",
          DOCUMENT_LINK:
            "https://toscode.gitee.com/openeuler/oecp/blob/master/README.md",
          LINKS: [
            {
              ID: 1,
              NAME: "获取源码",
              LINK: "https://toscode.gitee.com/openeuler/oecp/tree/master",
            },
          ],
        },
      ],
    },
    MIGRATION_LISTCONTENT: [
      {
        SUBTITLE: "数字化转型带来的操作系统变化及迁移诉求",
        CONTENT: [
          "数字技术日益融入经济社会发展的各个领域和全过程，数字基础设施要面向 IT、CT 及 OT 等多种场景，要实现工业互联乃至万物智联，只有建立起强大的技术软件体系，才能够满足数字经济发展的需要；万物互联驱动多样性算力( CPU/GPU/XPU 等)发展,促使操作系统进行架构创新；同时随着企业产品持续创新、硬件算力的更新换代、操作系统版本生命周期演进，操作系统迁移的工作将成为常态；由于操作系统本身的差异带来软件、硬件、配置兼容性问题，影响了操作系统迁移进程。\n\n",
          "面向数字化转型过程中，企业一方面需要做好操作系统选型(如：持续演进、全场景支持、可靠、稳定等)，支撑企业持续发展、产品创新、数字化转型；另一方面需要有系统性的迁移方案及工具，保障迁移无忧。",
        ],
      },
      {
        SUBTITLE: "openEuler 面向数字基础设施的开源操作系统",
        LISTTITLE: "openEuler 面向数字基础设施的开源操作系统",
        CONTENT: [
          "openEuler 开源操作系统是面向数字基础设施的开源操作系统，支持服务器、云计算、边缘计算、嵌入式等应用场景，支持多样性计算，致力于提供安全、稳定、易用的操作系统。",
          "2021年11月9日在工信部的指导及产业力量的协同下，openEuler 社区捐赠给开放原子开源基金会，是当前唯一捐赠到开放原子开源基金会的数字基础设施开源操作系统项目。",
          "当前国内外 14 家主流 OSV（麒麟、统信、麒麟信安、SUSE、普华等）均已发布了基于 openEuler 的操作系统商业发行版；且发行产品已经广泛进入了政府、运营商、金融、电力等多个行业的核心系统，实现了规模商用 100+万套，成为企业应用持续创新、稳定运行的首选。",
          "社区当前已有超过 300+ 企业加入，汇聚了从处理器、整机、基础软件、应用软件、行业客户等全产业链伙伴，100% 兼容主流芯片，100% 支持主流场景，当前已经有近万名开源贡献者，100 多个 SIG 组，社区维护的软件包达到 8000+，是最具活力的开源社区。",
        ],
      },
      {
        LISTTITLE: "openEuler 聚焦内核能力，释放多样性算力，引领操作系统创新",
        CONTENT: [
          "openEuler 原生开源，独立演进，从三个层次实现持续发展，助力企业数字化转型。内核创新：在多核调度、多样性算力，以内存为中心新架构的支持等方面进行创新，自 2012 年以来向 Linux Kernel 社区持续贡献，在 Linux Kernel 5.10/5.14 版本中，内核代码贡献排名第一。核心模块：为用户提供“双平面”运行选择，通过原创 StratoVirt 提供类 QEMU 虚拟化能力，通过原创 iSulad 提供类 Docker 容器能力。全功能级：做到独立软件包选型，CVE 漏洞管理，Bug 快速修复 ,主要特性介绍如下：",
          "1. 性能最优：通过千核调度、内核热升级、NUMA aware、免锁优化、PB级内存扩展等独特内核创新技术，软硬协同优化，最佳支持多样性算力，性能相比于主流 OS 提升 5%~20%。",
          "2. 云原生“双平面”选择：iSula 和 StatioVirt 虚拟化技术及容器技术，提供从云，到边缘的安全、灵活业务部署，编排能力，应对复杂的业务场景。",
          "3. 稳定可靠：A-tune 动态智能识別操作系业务场景，匹配场景参数模型，使系统都处在最佳的运行状态，从而提升业务性能。A-ops，从智能定位、配置溯源、架构感知，进行故障定界定位、配置管理、网络拓扑绘制，快速定位问题。",
        ],
      },
      {
        LISTTITLE: "openEuler 产品架构介绍",
        CONTENT: [
          "openEuler 创新架构，全栈优化，释放多样性算力，打造全场景协同的数字基础设施操作系统，包括基础加速库、虚拟化、内核、驱动、编译器、OS工具、OpenJDK等组件。\n\n",
          "* 应用中间层 - 提供多种类型的中间件，提供数据库、桌面、机密计算等系统软件，支持其上的应用软件共享资源",
          "* 运行时及加速库层 - 提供程序运行时库和加速库",
          "* 虚拟化及容器层 - 提供虚拟化和容器能力，可以根据用户需求选择使用",
          "* 内核层 - 提供多种为应用程序对计算机硬件进行安全访问的软件，负责管理系统的进程、内存、设备驱动程序、文件和网络系统等",
          "* 芯片层 - 提供多种类型的驱动，提供硬件设备的访问和管理，支持硬件设备的访问和管理",
          "* 工具链 - 提供开源项目中开发使用到的多种效率提升的工具",
        ],
        FRAMEWORK_IMG: "/img/minisite/migration/framework.png",
      },
    ],
    MIGRATION_REFERENCE: {
      TITLE_OUTSIDE: "迁移文档",
      TITLE_INSIDE: "DOCUMENTATION",
      MENU_LIST: ["移植案例", "用户案例", "搬迁实施指导"],
      LINK_LIST: [
        {
          TEXT: "MySQL 5.7.21 移植案例",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/MySQL%205-7-21-migrate-guide.html",
        },
        {
          TEXT: "Apache 2.4.39 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Apache%202-4-39-porting-guide.html",
        },
        {
          TEXT: "Dubbo 2.6.8 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Dubbo%202-6-8-porting-guide.html",
        },
        {
          TEXT: "Dubbo 2.7.5 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Dubbo%202-7-5-porting-guide.html",
        },
        {
          TEXT: "HAProxy 1.9.0 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/HAProxy%201-9-0-porting-guide.html",
        },
        {
          TEXT: "Lighttpd 1.4.53 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Lighttpd%201-4-53-porting-guide.html",
        },
        {
          TEXT: "Iok 2.1.3 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Iok%202.1.3-porting-guide.html",
        },
        {
          TEXT: "Memcached 1.5.12 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Memcached%201-5-12-porting-guide%EF%BC%89.html",
        },
        {
          TEXT: "Nginx 1.14.2 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Nginx%201-14-2-porting-guide.html",
        },
        {
          TEXT: "Tengine 2.2.2 移植案例",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Tengine%202.2.2-porting-guide.html",
        },
        {
          TEXT: "Squid 4.8 移植案例",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Squid%204.8-porting-guide.html",
        },
        {
          TEXT: "Varnish 6.2.0 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/Varnish%206-2-0-porting-guide.html",
        },
        {
          TEXT: "X86硬件兼容性移迁指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/X86%20hardware%20compatibility%20assessment%20migration%20guide.html",
        },
        {
          TEXT: "flask 1.1.2 移植案例",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/flask%201-1-2-porting-guide.html",
        },
        {
          TEXT: "enca1.19 移植案例",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/enca1-19-porting-guide.html",
        },
        {
          TEXT: "tornado 4.2.1 移植案例",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/tornado%204-2-1-porting-guide.html",
        },
        {
          TEXT: "pkgship 2.1.0 移植指南",
          LINK: "https://www.openeuler.org/zh/blog/randy1568/pkgship%202-1-0-porting-guide.html",
        },
      ],
    },
    MOVE_CONTENT: {
      DESCRIBE:
        "为了减少操作系统迁移对业务的感知，浙江移动还在容器云底层增加了麒麟欧拉版操作系统的容器集群，并将应用重新发布至创新操作系统集群，实现应用在双平面的统一构建、统一编排、统一调度和统一运行。同时，浙江移动还集成了欧拉容器引擎iSulad，把容器应用的启动速度相比Docker提升了50%以上。",
      IMG: "/img/minisite/migration/move.png",
      SUBTITLE: "相关新闻：",
      LINK_LIST: [
        "http://www.cnii.com.cn/rmydb/202109/t20210923_311404.html",
        "https://www.ithome.com/0/573/057.html",
      ],
    },
    DIRECT_CONTENT: "https://gitee.com/openeuler/oec-application/issues",
    ATUNE_BANNER_TEXT: ["A-Tune", "一款基于AI开发的智能优化引擎"],
    ATUNE_BANNER_IMG: "/img/minisite/svirt/mobile-banner.png",
    ATUNE_DESC: [
      "A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。",
    ],
    ATUNE_MAIL: "mail to:a-tune@openeuler.org",
    NAV_TEXT: [
      {
        key: "#sourceDownload",
        name: "资源下载",
      },
      {
        key: "#framework",
        name: "背景",
      },
      {
        key: "#document",
        name: "方案介绍",
        children: [
          { name: "迁移面临的关键问题", key: "#h2-title-one" },
          { name: "迁移综合方案概述", key: "#h2-title-two" },
          { name: "OS基础兼容性", key: "#h2-title-three" },
          { name: "兼容性评估", key: "#h2-title-four" },
          { name: "移植适配", key: "#h2-title-five" },
          { name: "搬迁实施", key: "#h2-title-six" },
          { name: "迁移调优", key: "#h2-title-seven" },
        ],
      },
      {
        key: "#caseGuidance",
        name: "案例指导",
      },
    ],
    ATUNE_LINK: [
      {
        IMG: "/img/minisite/atune/zh-start.png",
        LINK: "https://gitee.com/openeuler/A-Tune",
        SHOW: false,
      },
      {
        IMG: "/img/minisite/atune/zh-speak.png",
        LINK: "mail",
        SHOW: true,
      },
      {
        IMG: "/img/minisite/atune/zh-join.png",
        LINK: "https://gitee.com/openeuler/A-Tune-UI",
        SHOW: false,
      },
    ],
    ATUNE_FRAMEWORK: {
      TITLE_OUTSIDE: "架构",
      TITLE_INSIDE: "ARCHITECTURE",
      DESC_LIST: [
        "A-Tune主要包括在线时静态调优和离线时动态调优两大核心能力，整体架构包括智能决策、系统画像和交互系统三层。",
        "智能决策层：包含感知和决策两个子系统，分别完成对应用的智能感知和对系统的调优决策。",
        "系统画像层：主要包括自动特征工程和两层分类模型，自动特征工程用于业务特征的自动选择，两层分类模型用于业务模型的学习和分类。",
        "交互系统层：用于各类系统资源的监控和配置，调优策略执行在本层进行。",
        "优化模型库：包含10大类20+款应用场景的优化配置",
      ],
      FRAMEWORK_IMG: "/img/minisite/atune/framework.png",
    },
    ATUNE_DOCUMENT: {
      TITLE_OUTSIDE: "文档",
      TITLE_INSIDE: "DOCUMENTATION",
      DOCS_LIST: [
        {
          IMG: "/img/minisite/atune/know.png",
          TITLE: "认识A-Tune",
          DESC: "查看A-Tune的简介、架构。了解其支持特性与业务模型。",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md",
        },
        {
          IMG: "/img/minisite/atune/install.png",
          TITLE: "安装与部署",
          DESC: "了解安装A-Tune的软硬件要求与环境准备，学习安装、部署和启动A-Tune。",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md",
        },
        {
          IMG: "/img/minisite/atune/use.png",
          TITLE: "使用方法",
          DESC: "本章介绍A-Tune客户端包含的功能和使用方法。学习用命令行使用A-Tune。",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md",
        },
        {
          IMG: "/img/minisite/atune/problem.png",
          TITLE: "常见问题",
          DESC: "点击查看A-Tune常见问题，在这里您可以获取解决方案。",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md",
        },
      ],
    },

    ISULA_BANNER_TEXT: ["iSula", "小个头 大能量"],
    ISULA_BANNER_IMG: "/img/minisite/isula/mobile-banner.png",
    ISULA_LOGO: "/img/minisite/isula/isula-logo.png",
    ISULA_DESC_UP: [
      "iSula /'i.zu.la/，华为容器技术方案品牌。其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。华为容器技术方案品牌因其“小个头、大能量”的含义而取名。",
    ],
    ISULA_DESC_DOWN: [
      "目前 iSula 家族提供了如下组件:",
      "iSulad：容器引擎，提供容器的全生命周期管理，北向兼容Kubernetes的CRI接口，南向兼容OCI 生态。",
      "isula-build：容器镜像构建工具，提供快速构建容器镜像的能力。",
      "isula-transform：容器迁移工具，提供Docker容器冷迁移至iSulad的能力。",
    ],
    ISULA_DESC_IMG: "/img/minisite/isula/zh-desc.png",
    ISULA_MAIL: "mail to:isulad@openeuler.org",
    ISULA_LINK: [
      {
        IMG: "/img/minisite/isula/zh-start.png",
        LINK: "https://gitee.com/openeuler/community/tree/master/sig/iSulad",
        SHOW: false,
      },
      {
        IMG: "/img/minisite/isula/zh-speak.png",
        LINK: "mail",
        SHOW: true,
      },
    ],
    ISULA_FRAMEWORK: {
      TITLE_OUTSIDE: "架构",
      TITLE_INSIDE: "ARCHITECTURE",
      TAB: [
        {
          KEY: "ISULAD",
          VALUE: "iSulad",
        },
        {
          KEY: "ISULAD_BUILD",
          VALUE: "isula-build",
        },
        {
          KEY: "ISULAD_TRANSFORM",
          VALUE: "isula-transform",
        },
      ],
      ISULAD: {
        DESC_LIST: [
          'iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。',
          "iSulad 的特点如下:",
          "轻量语言：C/C++，Rust on the way",
          "北向接口：提供CRI接口，支持对接Kubernets;同时提供便捷使用的命令行",
          "南向接口：支持OCI runtime和镜像规范，支持平滑替换",
          "容器形态：支持系统容器、虚机容器等多种容器形态",
          "扩展能力：提供插件化架构，可根据用户需要开发定制化插件",
          "以上的特点使得 iSulad 可以不受硬件规格和架构的限制，更小的底噪开销也使得它的可应用领域更为广泛。",
        ],
        FRAMEWORK_TITLE: "iSulad 系统架构如下：",
        FRAMEWORK_IMG: "/img/minisite/isula/isula-1.png",
      },
      ISULAD_BUILD: {
        DESC_LIST: [
          "isula-build 通常运行于构建侧环境，为运行侧环境提供构建好的容器镜像。",
          "构建时，isula-build读取Dockerfile作为输入，快速构建符合Docker镜像和OCI镜像规范的容器镜像，最后将镜像分发至同节点的iSulad/docker、本地tar包或远端容器镜像仓库。",
        ],
        FRAMEWORK_TITLE: "isula-build的架构图如下：",
        FRAMEWORK_IMG: "/img/minisite/isula/isula-2.png",
      },
      ISULAD_TRANSFORM: {
        DESC_LIST: [
          "isula-transform 配合 iSulad 2.0 推出，支持将 Docker 容器引擎管理的容器转换、迁移给 iSulad 引擎进行管理。迁移完成后，就可以通过 iSulad 完成容器的生命周期管理功能。",
        ],
        FRAMEWORK_IMG: "/img/minisite/isula/isula-3.png",
      },
    },
    ISULA_DOCUMENT: {
      TITLE_OUTSIDE: "文档",
      TITLE_INSIDE: "DOCUMENTATION",
      TAB: [
        {
          KEY: "ISULAD",
          VALUE: "iSulad",
        },
        {
          KEY: "ISULAD_BUILD",
          VALUE: "isula-build",
        },
        {
          KEY: "ISULAD_TRANSFORM",
          VALUE: "isula-transform",
        },
      ],
      ISULAD: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/README.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          DESC: [
            {
              TEXT: "架构说明",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/architecture_zh.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/compile.png",
          DESC: [
            {
              TEXT: "编译手册",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_zh.md",
            },
            {
              TEXT: "在risc-v上面",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_riscv.md",
            },
            {
              TEXT: "与k8s/CNI集成",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/integration.md",
            },
          ],
        },
      ],
      ISULAD_BUILD: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/isula-build/blob/master/README.zh.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/use.png",
          DESC: [
            {
              TEXT: "使用手册",
              LINK: "https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md",
            },
          ],
        },
      ],
      ISULAD_TRANSFORM: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/isula-transform/blob/master/README.md",
            },
          ],
        },
      ],
    },

    SVIRT_BANNER_TEXT: ["StratoVirt", "面向云数据中心的企业级虚拟化VMM"],
    SVIRT_BANNER_IMG: "/img/minisite/svirt/mobile-banner.png",
    SVIRT_DESC: [
      "StratoVirt是面向云数据中心的企业级虚拟化VMM (Virtual Machine Monitor)，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。",
      "StratoVirt在架构设计上预留了组件化拼装的能力和接口，可以按需灵活组装高级特性直至演化到支持标准虚拟化，在特性需求、应用场景和轻快灵巧之间找到最佳的平衡点。",
    ],
    SVIRT_IMG: "/img/minisite/svirt/pc-svirt.png",
    SVIRT_MB_IMG: "/img/minisite/svirt/mobile-svirt.png",
    SVIRT_NAV_TEXT: [
      {
        key: "#character",
        name: "特征",
      },
      {
        key: "#framework",
        name: "架构",
      },
      {
        key: "#document",
        name: "文档",
      },
    ],

    SVIRT_LINK: [
      {
        IMG: "/img/minisite/svirt/zh-start.png",
        LINK: "https://gitee.com/openeuler/stratovirt",
      },
      {
        IMG: "/img/minisite/svirt/zh-speak.png",
        LINK: "https://gitee.com/openeuler/stratovirt/issues",
      },
      {
        IMG: "/img/minisite/svirt/zh-join.png",
        LINK: "https://gitee.com/openeuler/community/tree/master/sig/Virt",
      },
    ],
    SVIRT_CHARACTER: {
      TITLE_OUTSIDE: "特征",
      TITLE_INSIDE: "FEATURE",
      CHARACTER_TEXT:
        "StratoVirt是openEuler最稳定、最坚固的保护层。它重构了openEuler虚拟化底座，具有以下六大技术特点。",
      CHARACTER_LIST: [
        {
          IMG: "/img/minisite/svirt/safety.png",
          TITLE: "强安全性",
          DESC: "采用Rust语言，支持seccomp，实现多租户安全隔离",
        },
        {
          IMG: "/img/minisite/svirt/low-noise.png",
          TITLE: "轻量低噪",
          DESC: "采用极简设备模型时，启动时间<50ms，内存底噪<4M，支持Serverless负载",
        },
        {
          IMG: "/img/minisite/svirt/flex.png",
          TITLE: "极速伸缩",
          DESC: "毫秒级设备扩缩能力，为轻量化负载提供灵活的资源伸缩能力",
        },
        {
          IMG: "/img/minisite/svirt/with.png",
          TITLE: "软硬协同",
          DESC: "同时支持x86的VT和鲲鹏的Kunpeng-V，实现多体系硬件加速",
        },
        {
          IMG: "/img/minisite/svirt/extend.png",
          TITLE: "高扩展性",
          DESC: "设备模型可扩展，支持PCI等复杂设备规范，实现标准虚拟机",
        },
        {
          IMG: "/img/minisite/svirt/strengthen.png",
          TITLE: "异构增强",
          DESC: "除支持常用的硬件SR-IOV直通方案，结合昇腾软件定义能力，实现更灵活异构算力分配",
        },
      ],
    },
    SVIRT_FRAMEWORK: {
      TITLE_OUTSIDE: "架构",
      TITLE_INSIDE: "ARCHITECTURE",
      LEFT_IMG: "/img/minisite/svirt/pc-fwork.png",
      RIGHT_TEXT: [
        "StratoVirt核心架构自顶向下分为三层：",
        "OCI兼容接口：兼容QMP（QEMU Machine Protocol）协议，具有完备的OCI兼容能力。",
        "BootLoader：抛弃传统BIOS+GRUB的启动模式，实现了更轻更快的启动流程。",
        "MicroVM：虚拟化层，充分利用软硬协同能力，精简化设备模型；低时延资源伸缩能力。",
      ],
    },
    SVIRT_DOCUMENT: {
      TITLE_OUTSIDE: "文档",
      TITLE_INSIDE: "DOCUMENTATION",
      LIST: [
        {
          ICON: "/img/minisite/svirt/doc-introduct.png",
          TEXT: "StratoVirt介绍",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-install.png",
          TEXT: "安装StratoVirt",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-ready.png",
          TEXT: "准备使用环境",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-virtual.png",
          TEXT: "虚拟机配置",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-source.png",
          TEXT: "虚拟机管理",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-box.png",
          TEXT: "对接iSula安全容器",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md",
        },
      ],
    },
    BISHENG_BANNER_TEXT: ["毕昇JDK", "ARM上最好用的JDK"],
    BISHENG_DESC: [
      "毕昇JDK是华为内部基于OpenJDK定制的Huawei JDK的开源版本。Huawei JDK运行在华为内部500多个产品上，研发团队积累了丰富的开发经验，解决了业务实际运行中遇到的多个疑难问题。",
      "毕昇JDK作为OpenJDK的下游，是一款高性能、可用于生产环境的OpenJDK发行版。毕昇JDK对华为内部应用场景中遇到的一些性能问题和稳定性问题进行了修复，并在ARM架构上进行了性能优化和稳定性增强，在ARM架构上更稳定，在大数据等场景下可以获得更好的性能。",
      "毕昇JDK致力于为JAVA开发者提供一款稳定可靠、高性能、易调测的JDK，也为用户在ARM架构上提供一个更好的选择。",
    ],
    BISHENG_LINK: [
      {
        IMG: "/img/minisite/bisheng/zh-speker.png",
        TITLE:'开启毕昇JDK之旅',
        LINK_LIST: [
          {
            TEXT: "毕昇JDK 8",
            LINK: "https://gitee.com/openeuler/bishengjdk-8",
          },
          {
            TEXT: "毕昇JDK 11",
            LINK: "https://gitee.com/openeuler/bishengjdk-11",
          },
          {
            TEXT: "毕昇JDK 17",
            LINK: "https://gitee.com/openeuler/bishengjdk-17",
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/zh-sponsor.png",
        TITLE:'想对毕昇JDK说',
        LINK_LIST: [
          {
            TEXT: "毕昇JDK 8",
            LINK: "https://gitee.com/openeuler/bishengjdk-8/issues",
          },
          {
            TEXT: "毕昇JDK 11",
            LINK: "https://gitee.com/openeuler/bishengjdk-11/issues",
          },
          {
            TEXT: "毕昇JDK 17",
            LINK: "https://gitee.com/openeuler/bishengjdk-17/issues",
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/meeting.png",
        TITLE:'Compiler SIG例会信息',
        LINK_LIST: [
          {
            TEXT: '2021',
            LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
          },
          {
            TEXT: '2022',
            LINK: 'https://etherpad.openeuler.org/p/Compiler-meetings',
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/roadmap.png",
        TITLE:'Roadmap',
        LINK_LIST: [
          "https://gitee.com/openeuler/bishengjdk-8/wikis/%E9%A1%B9%E7%9B%AE%E8%B7%AF%E6%A0%87?sort_id=4182245",
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/TCK-affidavit.png",
        TITLE:'TCK Affidavit of BiSheng JDK 8',
        LINK_LIST: [
          "/zh/other/projects/bishengjdk/tck-affidavit/",
        ],
        STATUS: false,
      },
    ],
    BISHENG_MORE: "更多信息：",
    BISHENG_INFO: [
      {
        THEME: "License: ",
        BODY: "采用GPLv2 with Classpath Exception协议。",
      },
      {
        THEME: "支持Java版本: ",
        BODY: "目前毕昇JDK支持8、11、17三个LTS版本。",
      },
      {
        THEME: "支持架构: ",
        BODY: "支持Linux/AArch64、Linux/x86_64架构。",
      },
      {
        THEME: "支持操作系统: ",
        BODY: "目前仅支持Linux版本，对操作系统的要求glibc版本不低于2.17，基本覆盖所有主流操作系统，发布前经过稳定性验证的操作系统有openEuler 全系列操作系统和CentOS 7.6",
      },
    ],
    BISHENG_FRAMEWORK: {
      TITLE_OUTSIDE: "架构",
      TITLE_INSIDE: "ARCHITECTURE",
      DESC_LIST: [
        "JDK整体架构如下图所示，其中JRE指的是Java Runtime Environment，包括了Java运行时的虚拟机JVM（Java Virtual Machine）、Libraries等。而JDK是JRE的超集，包括了JRE的所有内容，并包含javac、jdb等开发者必须的编译器和调试器。JRE仅提供运行时库、Java虚拟机和其他一些运行Java应用程序所必须的组件。",
      ],
      FRAMEWORK_IMG: "/img/minisite/bisheng/framework.png",
    },
    BISHENG_LEARN: {
      TITLE_OUTSIDE: "学习",
      TITLE_INSIDE: "LEARNING",
      DATA_LIST: [
        {
          IMG: "/img/minisite/isula/compile.png",
          THEME: "文档",
          LINK: [
            {
              TEXT: "毕昇JDK 8",
              LINK: "https://gitee.com/openeuler/bishengjdk-8/wikis/Home",
            },
            {
              TEXT: "毕昇JDK 11",
              LINK: "https://gitee.com/openeuler/bishengjdk-11/wikis/Home",
            },
            {
              TEXT: "毕昇JDK 17",
              LINK: "https://gitee.com/openeuler/bishengjdk-17/wikis/Home",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/install.png",
          THEME: "课程",
          LINK: [
            {
              TEXT: "毕昇JDK使用",
              LINK: "https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXK067+Self-paced/about",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          THEME: "下载",
          LINK: [
            {
              TEXT: "毕昇JDK历史版本",
              LINK: "https://www.hikunpeng.com/zh/developer/devkit/compiler/jdk",
            },
          ],
        },
      ],
    },
    BISHENG_REFERENCE: {
      TITLE_OUTSIDE: "友情链接",
      TITLE_INSIDE: "LINKS",
      LINK_LIST: [
        {
          TEXT: "毕昇JDK（鲲鹏社区） ",
          LINK: "https://www.hikunpeng.com/developer/devkit/compiler/jdk",
        },
        {
          TEXT: "毕昇编译器（鲲鹏社区）",
          LINK: "https://www.hikunpeng.com/developer/devkit/compiler/bisheng",
        },
        {
          TEXT: "GCC for openEuler（鲲鹏社区）",
          LINK: "https://www.hikunpeng.com/developer/devkit/compiler/gcc",
        },
      ],
    },
    SECGEAR_BANNER_TEXT: [
      "secGear",
      "secGear是一款供开发者开发安全应用的机密计算框架",
    ],
    SECGEAR_DESC: [
      "secGear是面向计算产业的机密计算安全应用开发套件，旨在方便开发者在不同的硬件设备上提供统一开发框架，让用户不感知底层各种机密计算架构和接口的差异，目前secGear支持Intel SGX硬件和ARM Trustzone(安全os支持iTrustee)。",
      "secGear同时在中间件层和服务层提供丰富的扩展能力，让开发者能够方便得调用安全组件，乃至直接使用机密计算安全服务。",
    ],
    SECGEAR_FRAMEWORK: {
      TITLE_OUTSIDE: "架构",
      TITLE_INSIDE: "ARCHITECTURE ",
      DESC_LIST: [
        "如图所示，secGear 主题包含三个层级（当前仅开源基础层 Base Layer，服务层和中间件层逐步开源）：",
        "服务层：提供完整的基于机密计算的安全服务，用户直接使用相关服务，享受机密计算带来的安全性。",
        "中间件层：提供常见的安全协议组件以及各种安全函数库，用户可以直接在安全及非安全侧调用相关接口，不必从头造轮子，当前构建中的有pkcs11、pake等",
        "基础层：提供丰富的 enclave 开发接口或工具，包含代码生成工具和enclave声明周期管理等接口，并且在安全侧支持POSIX APIs 和标准 OpenSSL 接口，用户基于这些接口可以自由开发安全应用程序 。",
      ],
      FRAMEWORK_IMG: "/img/minisite/secgear/framework.png",
    },
    SECGEAR_DOCUMENT: {
      TITLE_OUTSIDE: "文档",
      TITLE_INSIDE: "DOCUMENTATION",
      DATA_LIST: [
        {
          IMG: "/img/minisite/isula/readme.png",
          LINK: [
            {
              TEXT: "整体介绍",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E8%AE%A4%E8%AF%86secGear.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          LINK: [
            {
              TEXT: "安装",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%AE%89%E8%A3%85secGear.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/compile.png",
          LINK: [
            {
              TEXT: "开发指南",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%BC%80%E5%8F%91secGear%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/install.png",
          LINK: [
            {
              TEXT: "工具使用文档",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E4%BD%BF%E7%94%A8secGear%E5%B7%A5%E5%85%B7.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/use.png",
          LINK: [
            {
              TEXT: "API接口文档",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E6%8E%A5%E5%8F%A3%E5%8F%82%E8%80%83.md",
            },
          ],
        },
      ],
    },
  },
  en: {
    ATUNE_BANNER_TEXT: ["A-Tune", "AI-based Tuning Engine"],
    ATUNE_BANNER_IMG: "/img/minisite/atune/mobile-banner.png",
    ATUNE_DESC: [
      "A-Tune is an automatic and intelligent performance tuning engine developed based on openEuler. It adopts AI technologies to ensure the optimal service running. A-Tune builds precise models for services running on the operating system, understands service features dynamically to infer specific applications. And it adjusts the parameters based on service loads to provide the optimal parameter configurations.",
    ],
    ATUNE_MAIL: "mail to:a-tune@openeuler.org",
    NAV_TEXT: [
      {
        key: "#framework",
        name: "Architecture",
      },
      {
        key: "#document",
        name: "Documentation",
      },
    ],
    ATUNE_LINK: [
      {
        IMG: "/img/minisite/atune/en-start.png",
        LINK: "https://gitee.com/openeuler/A-Tune",
        SHOW: false,
      },
      {
        IMG: "/img/minisite/atune/en-speak.png",
        LINK: "mail",
        SHOW: true,
      },
      {
        IMG: "/img/minisite/atune/zh-join.png",
        LINK: "https://gitee.com/openeuler/A-Tune-UI",
        SHOW: false,
      },
    ],
    ATUNE_FRAMEWORK: {
      TITLE_OUTSIDE: "Architecture",
      TITLE_INSIDE: "ARCHITECTURE",
      DESC_LIST: [
        "A-Tune provides two core capabilities: online static tuning and offline dynamic tuning. The overall architecture consists of three layers: intelligent decision-making, system profiling, and interaction system.",
        "The intelligent decision-making layer consists of the sensing and decision-making subsystems, which implement intelligent sensing of applications and decision-making of system tuning, respectively.",
        "The system profiling layer includes the automatic feature engineering and the two-layer classification model. The automatic feature engineering is used for automatic selection of service features, and the two-layer classification model helps learn and classify service models.",
        "The interaction system layer monitors and configures various system resources. The tuning policies are executed at this layer.",
        "The tuning model library contains the tuning configurations for 20+ application scenarios of 10 categories.",
      ],
      FRAMEWORK_IMG: "/img/minisite/atune/framework_en.png",
    },
    ATUNE_DOCUMENT: {
      TITLE_OUTSIDE: "Documentation",
      TITLE_INSIDE: "DOCUMENTATION",
      DOCS_LIST: [
        {
          IMG: "/img/minisite/atune/know.png",
          TITLE: "About A-Tune",
          DESC: "Learn about the architecture, supported features, and service models of A-Tune.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md",
        },
        {
          IMG: "/img/minisite/atune/install.png",
          TITLE: "Installation and Deployment",
          DESC: "Discover the hardware and software requirements as well as the environment preparations for installing A-Tune. Learn how to install, deploy, and start A-Tune.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md",
        },
        {
          IMG: "/img/minisite/atune/use.png",
          TITLE: "How to Use",
          DESC: "Find out the functions and usage of the A-Tune client. Learn to use A-Tune from the CLI.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md",
        },
        {
          IMG: "/img/minisite/atune/problem.png",
          TITLE: "FAQs",
          DESC: "View the A-Tune FAQs.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md",
        },
      ],
    },

    ISULA_BANNER_TEXT: ["iSula", "Packs a huge punch in a small size"],
    ISULA_BANNER_IMG: "/img/minisite/isula/mobile-banner.png",
    ISULA_LOGO: "/img/minisite/isula/isula-logo.png",
    ISULA_DESC_UP: [
      "iSula is the brand of Huawei container solution. It derives its name from a species of ant, one of the most powerful insects in the world despite its small size. This combination of ultimate power and minimal size is the perfect description of the iSula container technology solution.",
    ],
    ISULA_DESC_DOWN: [
      "Currently, the iSula family includes the following components:",
      "iSulad: iSulad is the universal container engine that provides full lifecycle management. It is compatible with the Container Runtime Interface (CRI) of Kubernetes in the northbound direction as well as the OCI ecosystem in the southbound direction.",
      "isula-build: isula-build is the container image building tool that helps you quickly build container images.",
      "isula-transform: isula-transform is the container migration tool that enables the cold migration of Docker containers to iSulad.",
    ],
    ISULA_DESC_IMG: "/img/minisite/isula/en_desc.png",
    ISULA_MAIL: "mail to:isulad@openeuler.org",
    ISULA_LINK: [
      {
        IMG: "/img/minisite/isula/en-start.png",
        LINK: "https://gitee.com/openeuler/community/tree/master/sig/iSulad",
        SHOW: false,
      },
      {
        IMG: "/img/minisite/isula/en-speak.png",
        LINK: "mail",
        SHOW: true,
      },
    ],
    ISULA_FRAMEWORK: {
      TITLE_OUTSIDE: "Architecture",
      TITLE_INSIDE: "ARCHITECTURE",
      TAB: [
        {
          KEY: "ISULAD",
          VALUE: "iSulad",
        },
        {
          KEY: "ISULAD_BUILD",
          VALUE: "isula-build",
        },
        {
          KEY: "ISULAD_TRANSFORM",
          VALUE: "isula-transform",
        },
      ],
      ISULAD: {
        DESC_LIST: [
          "iSulad provides a unified architecture for different CT and IT requirements. It features a lightweight, fast, and flexible design, unlocking great power like the small isula ant.",
          "iSulad boasts the following features:",
          "Multiple languages: supports C/C++and will support Rust in the future.",
          "Northbound interface: provides the CRI that connects to Kubernets, as well as easy-to-use command lines.",
          "Southbound interface: supports OCI runtime and image specifications for smooth replacement.",
          "Container forms: supports multiple container forms, such as system and VM.",
          "Scalability: provides a plug-in architecture that allows you to develop custom plug-ins.",
          "iSulad is not restricted by hardware specifications and architectures. It features minimal background noise, making it a perfect option for many fields.",
        ],
        FRAMEWORK_TITLE: "The architecture of iSulad is as follows:",
        FRAMEWORK_IMG: "/img/minisite/isula/isula-1-en.png",
      },
      ISULAD_BUILD: {
        DESC_LIST: [
          "isula-build usually runs in the build environment and provides template container images for the runtime system.",
          "During the build operation, isula-build reads Dockerfile as the input to quickly build container images that comply with the Docker and OCI image specifications. Then, isula-build distributes the images to the iSulad/Docker on the same node, local TAR packages, or remote container image repositories.",
        ],
        FRAMEWORK_TITLE: "The architecture of isula-build is as follows:",
        FRAMEWORK_IMG: "/img/minisite/isula/isula-2.png",
      },
      ISULAD_TRANSFORM: {
        DESC_LIST: [
          "isula-transform was released together with iSulad 2.0 to convert containers managed by the Docker container engine and migrate them to the iSulad engine. After the migration, iSulad allows you to effortlessly manage the lifecycle of containers.",
        ],
        FRAMEWORK_IMG: "/img/minisite/isula/isula-3.png",
      },
    },
    ISULA_DOCUMENT: {
      TITLE_OUTSIDE: "Documentation",
      TITLE_INSIDE: "DOCUMENTATION",
      TAB: [
        {
          KEY: "ISULAD",
          VALUE: "iSulad",
        },
        {
          KEY: "ISULAD_BUILD",
          VALUE: "isula-build",
        },
        {
          KEY: "ISULAD_TRANSFORM",
          VALUE: "isula-transform",
        },
      ],
      ISULAD: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/README.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          DESC: [
            {
              TEXT: "Architecture",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/architecture_zh.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/compile.png",
          DESC: [
            {
              TEXT: "Build Guide",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_zh.md",
            },
            {
              TEXT: "for RISC-V",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_riscv.md",
            },
            {
              TEXT: "Integration",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/integration.md",
            },
          ],
        },
      ],
      ISULAD_BUILD: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/isula-build/blob/master/README.zh.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/use.png",
          DESC: [
            {
              TEXT: "Manual",
              LINK: "https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md",
            },
          ],
        },
      ],
      ISULAD_TRANSFORM: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/isula-transform/blob/master/README.md",
            },
          ],
        },
      ],
    },

    SVIRT_BANNER_TEXT: [
      "StratoVirt",
      "Virtualization platform for cloud data centers",
    ],
    SVIRT_BANNER_IMG: "/img/minisite/svirt/mobile-banner.png",
    SVIRT_DESC: [
      "StratoVirt is an enterprise-grade virtualization cloud platform that uses a single architecture to support VM, containers, and serverless data center scenarios. StratoVirt has competitive advantages in key technologies such as lightweight and low noise, software and hardware collaboration, as well as premium security using Rust language.",
      "StratoVirt reserves component-based assembling capabilities and interfaces in the architecture design, that is, premium features can be flexibly assembled and evolve to support standard virtualization. In this way, StratoVirt strikes a perfect balance between feature requirements, application scenarios, and flexibility.",
    ],
    SVIRT_IMG: "/img/minisite/svirt/pc-svirt.png",
    SVIRT_MB_IMG: "/img/minisite/svirt/mobile-svirt.png",
    SVIRT_NAV_TEXT: [
      {
        key: "#character",
        name: "Feature",
      },
      {
        key: "#framework",
        name: "Architecture",
      },
      {
        key: "#document",
        name: "Documentation",
      },
    ],
    SVIRT_LINK: [
      {
        IMG: "/img/minisite/svirt/en-start.png",
        LINK: "https://gitee.com/openeuler/stratovirt",
      },
      {
        IMG: "/img/minisite/svirt/en-speak.png",
        LINK: "https://gitee.com/openeuler/stratovirt/issues",
      },
      {
        IMG: "/img/minisite/svirt/en-join.png",
        LINK: "https://gitee.com/openeuler/community/tree/master/sig/Virt",
      },
    ],
    SVIRT_CHARACTER: {
      TITLE_OUTSIDE: "Feature",
      TITLE_INSIDE: "FEATURE",
      CHARACTER_TEXT:
        "StratoVirt is a stable protective layer of openEuler. It reconstructs the openEuler virtualization base and has the following technical features:",
      CHARACTER_LIST: [
        {
          IMG: "/img/minisite/svirt/safety.png",
          TITLE: "Enhanced Security",
          DESC: "StratoVirt uses the Rust language and supports seccomp to implement security isolation between multiple tenants.",
        },
        {
          IMG: "/img/minisite/svirt/low-noise.png",
          TITLE: "Lightweight and Low Noise",
          DESC: "The simplified device model offers a startup time of under 50 ms, and a memory noise floor less than 4 MB. Serverless load is supported.",
        },
        {
          IMG: "/img/minisite/svirt/flex.png",
          TITLE: "Fast Scaling",
          DESC: "StratoVirt supports device scaling within milliseconds, providing flexible resource scaling capabilities for lightweight loads.",
        },
        {
          IMG: "/img/minisite/svirt/with.png",
          TITLE: "Software and Hardware Collaboration",
          DESC: "StratoVirt supports x86 VT and Kunpeng-V to implement multi-system hardware acceleration.",
        },
        {
          IMG: "/img/minisite/svirt/extend.png",
          TITLE: "High Scalability",
          DESC: "The device model can be extended to support complex device specifications such as PCI and implement standard VMs.",
        },
        {
          IMG: "/img/minisite/svirt/strengthen.png",
          TITLE: "Enhanced Heterogeneity",
          DESC: "In addition to the common hardware SR-IOV passthrough solution, the Ascend software definition capability is used to implement more flexible allocation of heterogeneous computing power.",
        },
      ],
    },
    SVIRT_FRAMEWORK: {
      TITLE_OUTSIDE: "Architecture",
      TITLE_INSIDE: "ARCHITECTURE",
      LEFT_IMG: "/img/minisite/svirt/pc-fwork.png",
      RIGHT_TEXT: [
        "The StratoVirt core architecture comprises three layers from top to bottom:",
        "OCI compatibility interface: StratoVirt is compatible with the QEMU Machine Protocol (QMP) and inherits OCI capabilities.",
        "BootLoader: StratoVirt abandons the conventional BIOS + GRUB boot mode and implements a lighter and faster boot operation.",
        "MicroVM: This is the virtualization layer that leverages software and hardware collaboration to simplify the device management and support low-latency resource scaling.",
      ],
    },
    SVIRT_DOCUMENT: {
      TITLE_OUTSIDE: "Documentation",
      TITLE_INSIDE: "DOCUMENTATION",
      LIST: [
        {
          ICON: "/img/minisite/svirt/doc-introduct.png",
          TEXT: "Introduction to StratoVirt",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-install.png",
          TEXT: "Installing StratoVirt",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-ready.png",
          TEXT: "Preparing the Environment",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-virtual.png",
          TEXT: "Configuring VMs",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-source.png",
          TEXT: "Managing VM Lifecycle",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-box.png",
          TEXT: "Connecting to iSula Security Containers",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md",
        },
      ],
    },
    BISHENG_BANNER_TEXT: ["BiSheng JDK", "Top-notch JDK on ARM"],
    BISHENG_DESC: [
      "BiSheng JDK is an open source version of Huawei JDK customized based on OpenJDK. Huawei JDK runs on more than 500 Huawei products. The R&D team has accumulated rich development experience and resolved the problems that arose during service running.",
      "As a downstream product of OpenJDK, BiSheng JDK is a high-performance OpenJDK distribution that can be used in production environments. BiSheng JDK fixes some performance and stability issues encountered in Huawei internal applications, optimizes performance and enhances stability on the ARM architecture, and delivers improved performance in big data scenarios.",
      "BiSheng JDK is committed to providing Java developers with a stable, reliable, high-performance, and easy-to-debug JDK. It is also a better choice on the ARM architecture.  ",
    ],
    BISHENG_LINK: [
      {
        IMG: "/img/minisite/bisheng/zh-speker.png",
        TITLE:'Start with BiSheng JDK',
        LINK_LIST: [
          {
            TEXT: "BiSheng JDK 8",
            LINK: "https://gitee.com/openeuler/bishengjdk-8",
          },
          {
            TEXT: "BiSheng JDK 11",
            LINK: "https://gitee.com/openeuler/bishengjdk-11",
          },
          {
            TEXT: "BiSheng JDK 17",
            LINK: "https://gitee.com/openeuler/bishengjdk-17",
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/zh-sponsor.png",
        TITLE:'Word to BiSheng JDK',
        LINK_LIST: [
          {
            TEXT: "BiSheng JDK 8",
            LINK: "https://gitee.com/openeuler/bishengjdk-8/issues",
          },
          {
            TEXT: "BiSheng JDK 11",
            LINK: "https://gitee.com/openeuler/bishengjdk-11/issues",
          },
          {
            TEXT: "BiSheng JDK 17",
            LINK: "https://gitee.com/openeuler/bishengjdk-17/issues",
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/meeting.png",
        TITLE:'Compiler SIG Meetings',
        LINK_LIST: [
          {
            TEXT: '2021',
            LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
          },
          {
            TEXT: '2022',
            LINK: 'https://etherpad.openeuler.org/p/Compiler-meetings',
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/roadmap.png",
        TITLE:'Roadmap',
        LINK_LIST: [
          "https://gitee.com/openeuler/bishengjdk-8/wikis/%E9%A1%B9%E7%9B%AE%E8%B7%AF%E6%A0%87?sort_id=4182245",
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/TCK-affidavit.png",
        TITLE:'TCK Affidavit of BiSheng JDK 8',
        LINK_LIST: [
          "/en/other/projects/bishengjdk/tck-affidavit/",
        ],
        STATUS: false,
      },
    ],
    BISHENG_MORE: "More information:",
    BISHENG_INFO: [
      {
        THEME: "License: ",
        BODY: "The GPLv2 with Classpath Exception protocol is used.",
      },
      {
        THEME: "Supported Java versions: ",
        BODY: "Currently, BiSheng JDK supports Java 8 (LTS), 11 (LTS), and 17 (LTS).",
      },
      {
        THEME: "Supported architectures:",
        BODY: "Linux/AArch64 and Linux/x86_64.",
      },
      {
        THEME: "Supported OSs: ",
        BODY: " Almost all mainstream Linux OSs are supported. The glibc version must be 2.17 or later. BiSheng JDK has passed the stability verification on all openEuler OSs and CentOS 7.6 before the release.",
      },
    ],
    BISHENG_FRAMEWORK: {
      TITLE_OUTSIDE: "Architecture",
      TITLE_INSIDE: "ARCHITECTURE",
      DESC_LIST: [
        "The following figure shows the overall architecture of the JDK. JRE is short for Java Runtime Environment, including the Java Virtual Machine (JVM) and libraries. JDK is a superset of JRE, and therefore includes all JRE content as well as the compilers and debuggers such as javac and JDB required by developers. JRE provides only runtime libraries, JVMs, and other components required to run Java applications.",
      ],
      FRAMEWORK_IMG: "/img/minisite/bisheng/jiagoutu.png",
    },
    BISHENG_LEARN: {
      TITLE_OUTSIDE: "Learning",
      TITLE_INSIDE: "LEARNING",
      DATA_LIST: [
        {
          IMG: "/img/minisite/isula/compile.png",
          THEME: "Documentation",
          LINK: [
            {
              TEXT: "BiSheng JDK 8",
              LINK: "https://gitee.com/openeuler/bishengjdk-8/wikis/Home",
            },
            {
              TEXT: "BiSheng JDK 11",
              LINK: "https://gitee.com/openeuler/bishengjdk-11/wikis/Home",
            },
            {
              TEXT: "BiSheng JDK 17",
              LINK: "https://gitee.com/openeuler/bishengjdk-17/wikis/Home",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/install.png",
          THEME: "Learn and Practice",
          LINK: [
            {
              TEXT: "Using BiSheng JDK",
              LINK: "https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXK067+Self-paced/about",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          THEME: "Download",
          LINK: [
            {
              TEXT: "Earlier Versions",
              LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/jdk",
            },
          ],
        },
      ],
    },
    BISHENG_REFERENCE: {
      TITLE_OUTSIDE: "Links",
      TITLE_INSIDE: "LINKS",
      LINK_LIST: [
        {
          TEXT: "BiSheng JDK (Kunpeng Community) ",
          LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/jdk",
        },
        {
          TEXT: "BiSheng Compiler (Kunpeng Community)",
          LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/bisheng",
        },
        {
          TEXT: "GCC for openEuler (Kunpeng Community)",
          LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/gcc",
        },
      ],
    },
    SECGEAR_BANNER_TEXT: [
      "secGear",
      "Confidential computing framework for developing secure applications",
    ],
    SECGEAR_DESC: [
      "secGear is a confidential computing development suite used to develop secure applications in the computing industry. It aims to provide a unified development framework for different hardware devices, shielding the differences between underlying confidential computing architectures and APIs. Currently, secGear supports Intel® SGX hardware and Arm TrustZone (iTrustee supported).",
      "secGear provides rich extensibility capabilities at both the middleware layer and service layer, allowing developers to easily call security components and even directly use the confidential computing services.",
    ],
    SECGEAR_FRAMEWORK: {
      TITLE_OUTSIDE: "Architecture",
      TITLE_INSIDE: "ARCHITECTURE ",
      DESC_LIST: [
        "As shown in the figure, secGear consists of three layers. Currently, only the base layer is open source. The service layer and middleware layer will be gradually brought to open source.",
        "The service layer provides complete security services based on confidential computing. You can directly use related services to enjoy the security brought by confidential computing.",
        "The middleware layer provides common security protocol components and various security function libraries. You can directly call related APIs on the secure and non-secure sides without creating them by yourself. Currently, PKCS11 and PAKE are being built.",
        "The base layer provides rich enclave development APIs or tools, including code generation tools and enclave life cycle management APIs. POSIX APIs and standard OpenSSL APIs are supported on the secure side. You can develop secure applications based on these APIs.",
      ],
      FRAMEWORK_IMG: "/img/minisite/secgear/framework.png",
    },
    SECGEAR_DOCUMENT: {
      TITLE_OUTSIDE: "Documentation",
      TITLE_INSIDE: "DOCUMENTATION",
      DATA_LIST: [
        {
          IMG: "/img/minisite/isula/readme.png",
          LINK: [
            {
              TEXT: "Overview",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E8%AE%A4%E8%AF%86secGear.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          LINK: [
            {
              TEXT: "Installation",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%AE%89%E8%A3%85secGear.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/compile.png",
          LINK: [
            {
              TEXT: "Developer Guide",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%BC%80%E5%8F%91secGear%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/install.png",
          LINK: [
            {
              TEXT: "Tool Usage",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E4%BD%BF%E7%94%A8secGear%E5%B7%A5%E5%85%B7.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/use.png",
          LINK: [
            {
              TEXT: "API Reference",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E6%8E%A5%E5%8F%A3%E5%8F%82%E8%80%83.md",
            },
          ],
        },
      ],
    },
  },
  ru: {
    ATUNE_BANNER_TEXT: ["A-Tune", "инструмент настройки на базе ИИ"],
    ATUNE_BANNER_IMG: "/img/minisite/atune/mobile-banner.png",
    ATUNE_DESC: [
      "A-Tune — это автоматический интеллектуальный инструмент настройки рабочих параметров, разработанный сообществом openEuler. За счет использования технологий искусственного интеллекта инструмент обеспечивает оптимальную работу служб. A-Tune создает точные модели работающих в операционной системе служб, динамически отслеживает изменения их показателей и делает логические выводы о состоянии работы конкретных приложений. Настраивая параметры на основе данных о сервисной нагрузке, инструмент позволяет добиться их оптимальной конфигурации.",
    ],
    ATUNE_MAIL: "mail to:a-tune@openeuler.org",
    NAV_TEXT: [
      {
        key: "#framework",
        name: "Архитектура",
      },
      {
        key: "#document",
        name: "Документы",
      },
    ],
    ATUNE_LINK: [
      {
        IMG: "/img/minisite/atune/ru-start.png",
        LINK: "https://gitee.com/openeuler/A-Tune",
        SHOW: false,
      },
      {
        IMG: "/img/minisite/atune/ru-speak.png",
        LINK: "mail",
        SHOW: true,
      },
      {
        IMG: "/img/minisite/atune/zh-join.png",
        LINK: "https://gitee.com/openeuler/A-Tune-UI",
        SHOW: false,
      },
    ],
    ATUNE_FRAMEWORK: {
      TITLE_OUTSIDE: "Архитектура",
      TITLE_INSIDE: "ARCHITECTURE",
      DESC_LIST: [
        "A-Tune предоставляет два основных функционала: статическая онлайн-настройка и динамическая офлайн-настройка. Общая архитектура состоит из трех уровней: уровень интеллектуального принятия решений, уровень построения профиля системы и уровень системы взаимодействия.",
        "Уровень интеллектуального принятия решений состоит из подсистемы измерений, выполняющей функции интеллектуального измерения рабочих показателей приложений, и подсистемы принятия решений, которая принимает решения по оптимизации работы системы.",
        "Уровень построения профиля системы состоит из модуля автоматической компоновки функций и двухуровневой модели классификации. Модуль автоматической компоновки функций служит для автоматического выбора сервисных функций, а двухуровневая модель классификации используется для обучения и классификации сервисных моделей.",
        "На уровне системы взаимодействия осуществляется контроль и настройка различных системных ресурсов. На этом уровне применяются политики настройки.",
        "Библиотека моделей настройки содержит конфигурации для настройки приложений 10 категорий в более чем 20 сценариях.",
      ],
      FRAMEWORK_IMG: "/img/minisite/atune/framework_ru.png",
    },
    ATUNE_DOCUMENT: {
      TITLE_OUTSIDE: "Документы",
      TITLE_INSIDE: "DOCUMENTATION",
      DOCS_LIST: [
        {
          IMG: "/img/minisite/atune/know.png",
          TITLE: "Об инструменте A-Tune",
          DESC: "Learn about the architecture, supported features, and service models of A-Tune.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md",
        },
        {
          IMG: "/img/minisite/atune/install.png",
          TITLE: "Установка и развертывание",
          DESC: "Discover the hardware and software requirements as well as the environment preparations for installing A-Tune. Learn how to install, deploy, and start A-Tune.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md",
        },
        {
          IMG: "/img/minisite/atune/use.png",
          TITLE: "Использование инструмента",
          DESC: "Find out the functions and usage of the A-Tune client. Learn to use A-Tune from the CLI.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md",
        },
        {
          IMG: "/img/minisite/atune/problem.png",
          TITLE: "Вопросы и ответы",
          DESC: "View the A-Tune FAQs.",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md",
        },
      ],
    },

    ISULA_BANNER_TEXT: ["iSula", "Ударная сила в компактном размере"],
    ISULA_BANNER_IMG: "/img/minisite/isula/mobile-banner.png",
    ISULA_LOGO: "/img/minisite/isula/isula-logo.png",
    ISULA_DESC_UP: [
      "iSula — это контейнерное решение компании Huawei. Название решения происходит от вида муравьев, обитающих в джунглях Перу, — легких, быстрых и живучих. Сочетание невероятной мощности и компактного размера — самое точная характеристика контейнерного решения iSula.",
    ],
    ISULA_DESC_DOWN: [
      "На сегодняшний день в семейство iSula входят следующие компоненты:",
      "iSulad: Это универсальный контейнерный движок, который обеспечивает полное управление жизненным циклом. Он совместим с интерфейсом Container Runtime Interface (CRI) от Kubernetes на северной стороне и экосистемой OCI на южной стороне.",
      "isula-build: Это инструмент, помогающий быстро создавать образы контейнера.",
      "isula-transform: Инструмент, позволяющий осуществлять холодную миграцию контейнеров Docker в iSulad.",
    ],
    ISULA_DESC_IMG: "/img/minisite/isula/ru-desc.png",
    ISULA_MAIL: "mail to:isulad@openeuler.org",
    ISULA_LINK: [
      {
        IMG: "/img/minisite/isula/ru-start.png",
        LINK: "https://gitee.com/openeuler/community/tree/master/sig/iSulad",
        SHOW: false,
      },
      {
        IMG: "/img/minisite/isula/ru-speak.png",
        LINK: "mail",
        SHOW: true,
      },
    ],
    ISULA_FRAMEWORK: {
      TITLE_OUTSIDE: "Архитектура",
      TITLE_INSIDE: "ARCHITECTURE",
      TAB: [
        {
          KEY: "ISULAD",
          VALUE: "iSulad",
        },
        {
          KEY: "ISULAD_BUILD",
          VALUE: "isula-build",
        },
        {
          KEY: "ISULAD_TRANSFORM",
          VALUE: "isula-transform",
        },
      ],
      ISULAD: {
        DESC_LIST: [
          "iSulad предоставляет унифицированную архитектуру, адаптируемую под различные вычислительные и ИТ-ресурсы. Этот быстродействующий инструмент с легкой и гибкой структурой, который можно сравнить с крошечными, но сильными перуанскими муравьями семейства isula.",
          "iSulad обладает следующими особенностями:",
          "Поддерживает языки программирования C/C++ и в дальнейшем ожидается поддержка языка Rust.",
          "Северный интерфейс CRI исполняемой среды контейнера для интеграции с Kubernetes, а также удобные в использовании командные строки.",
          "Южный интерфейс OCI и спецификации образов для легкой замены.",
          "Поддерживает несколько форматов контейнеров — система и виртуальная машина.",
          "В плане масштабируемости инструмент предоставляет архитектуру подключаемых модулей, которая позволяет разрабатывать специализированные плагины.",
          "Функциональность iSulad не ограничивается спецификациями оборудования и архитектурами. Решение отличается минимальным влиянием со стороны фоновых процессов, что делает его идеальным вариантом применения во многих областях.",
        ],
        FRAMEWORK_TITLE: "Архитектура iSulad:",
        FRAMEWORK_IMG: "/img/minisite/isula/isula-1-ru.png",
      },
      ISULAD_BUILD: {
        DESC_LIST: [
          "Isula-build обычно работает в среде сборки и предоставляет шаблонные образы контейнера для исполняющей среды.",
          "Во время сборки isula-build считывает данные из файла Docker, используя их в качестве входных данных для быстрого создания образов контейнера, соответствующих спецификациям Docker и OCI. Далее isula-build передает образ в iSulad/Docker на том же узле, в локальные пакеты TAR или удаленные репозитории на хранение.",
        ],
        FRAMEWORK_TITLE: "Архитектура isula-build:",
        FRAMEWORK_IMG: "/img/minisite/isula/isula-2-ru.png",
      },
      ISULAD_TRANSFORM: {
        DESC_LIST: [
          "isula-transform, выпущенный вместе с версией iSulad 2.0, служит для конвертации контейнеров, управляемых контейнерным движком Docker, и миграции их в движок iSulad. После миграции пользователи легко управляют жизненным циклом контейнеров, используя iSulad.",
        ],
        FRAMEWORK_IMG: "/img/minisite/isula/isula-3-ru.png",
      },
    },
    ISULA_DOCUMENT: {
      TITLE_OUTSIDE: "Документы",
      TITLE_INSIDE: "DOCUMENTATION",
      TAB: [
        {
          KEY: "ISULAD",
          VALUE: "iSulad",
        },
        {
          KEY: "ISULAD_BUILD",
          VALUE: "isula-build",
        },
        {
          KEY: "ISULAD_TRANSFORM",
          VALUE: "isula-transform",
        },
      ],
      ISULAD: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/README.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          DESC: [
            {
              TEXT: "Architecture ",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/architecture_zh.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/compile.png",
          DESC: [
            {
              TEXT: "Build Guide",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_zh.md",
            },
            {
              TEXT: "for RISC-V",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_riscv.md",
            },
            {
              TEXT: "Integration",
              LINK: "https://gitee.com/openeuler/iSulad/blob/master/docs/integration.md",
            },
          ],
        },
      ],
      ISULAD_BUILD: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/isula-build/blob/master/README.zh.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/use.png",
          DESC: [
            {
              TEXT: "Manual",
              LINK: "https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md",
            },
          ],
        },
      ],
      ISULAD_TRANSFORM: [
        {
          IMG: "/img/minisite/isula/readme.png",
          DESC: [
            {
              TEXT: "README",
              LINK: "https://gitee.com/openeuler/isula-transform/blob/master/README.md",
            },
          ],
        },
      ],
    },

    SVIRT_BANNER_TEXT: [
      "StratoVirt",
      "Платформа виртуализации для облачных центров обработки данных",
    ],
    SVIRT_BANNER_IMG: "/img/minisite/svirt/mobile-banner.png",
    SVIRT_DESC: [
      "StratoVirt — это облачная платформа виртуализации корпоративного класса, на единой архитектуре которой поддерживаются виртуальные машины, контейнеры и центры обработки данных, работающие без сервера. StratoVirt обладает конкурентными преимуществами: облегченное решение с низким уровнем помех, взаимодействие программного и аппаратного обеспечения, а также безопасность премиум-уровня за счет использования языка программирования Rust.",
      "StratoVirt предоставляет функционалы высокого класса для гибкой компонентной сборки и интерфейсы, необходимые в проектировании архитектуры и поддержки стандартной виртуализации. StratoVirt позволяет добиться идеального баланса между функциональными требованиями, сценариями применения и гибкостью.",
    ],
    SVIRT_IMG: "/img/minisite/svirt/pc-svirt.png",
    SVIRT_MB_IMG: "/img/minisite/svirt/mobile-svirt.png",
    SVIRT_NAV_TEXT: [
      {
        key: "#character",
        name: "Особенности",
      },
      {
        key: "#framework",
        name: "Архитектура",
      },
      {
        key: "#document",
        name: "Документы",
      },
    ],
    SVIRT_LINK: [
      {
        IMG: "/img/minisite/svirt/ru-start.png",
        LINK: "https://gitee.com/openeuler/stratovirt",
      },
      {
        IMG: "/img/minisite/svirt/ru-speak.png",
        LINK: "https://gitee.com/openeuler/stratovirt/issues",
      },
      {
        IMG: "/img/minisite/svirt/ru-join.png",
        LINK: "https://gitee.com/openeuler/community/tree/master/sig/Virt",
      },
    ],
    SVIRT_CHARACTER: {
      TITLE_OUTSIDE: "Особенности",
      TITLE_INSIDE: "FEATURE",
      CHARACTER_TEXT:
        "StratoVirt является стабильно функционирующим защищенным уровнем openEuler. Он воссоздает базу виртуализации openEuler и обладает следующими техническими особенностями:",
      CHARACTER_LIST: [
        {
          IMG: "/img/minisite/svirt/safety.png",
          TITLE: "Улучшенная безопасность",
          DESC: "В решении StratoVirt используется язык Rust и поддерживаются функции seccomp для изоляции клиентов-арендаторов.",
        },
        {
          IMG: "/img/minisite/svirt/low-noise.png",
          TITLE: "Облегченное решение с низким уровнем помех",
          DESC: "Запуск устройства упрощенной модели в течение 50 мс и показатель Noise Floor памяти менее 4 МБ. Поддерживается безсерверная нагрузка.",
        },
        {
          IMG: "/img/minisite/svirt/flex.png",
          TITLE: "Быстрое масштабирование",
          DESC: "StratoVirt поддерживает масштабирование устройства за считанные миллисекунды, гибкие возможности расширения ресурсов для легких нагрузок.",
        },
        {
          IMG: "/img/minisite/svirt/with.png",
          TITLE: "Взаимодействие программного и аппаратного обеспечения",
          DESC: "Аппаратное ускорение на базе мультисистемной платформы за счет поддержки x86 VT и Kunpeng-V.",
        },
        {
          IMG: "/img/minisite/svirt/extend.png",
          TITLE: "Высокая степень масштабируемости",
          DESC: "Модель устройства можно расширить для поддержки таких сложных спецификаций, как PCI, и реализации стандартных виртуальных машин.",
        },
        {
          IMG: "/img/minisite/svirt/strengthen.png",
          TITLE: "Улучшенное распределение гетерогенных ресурсов",
          DESC: "Помимо общего решения аппаратного сквозного доступа SR-IOV, используется функционал определения программного обеспечения Ascend, который позволяет гибче распределять гетерогенные вычислительные ресурсы.",
        },
      ],
    },
    SVIRT_FRAMEWORK: {
      TITLE_OUTSIDE: "Архитектура",
      TITLE_INSIDE: "ARCHITECTURE",
      LEFT_IMG: "/img/minisite/svirt/pc-fwork-ru.png",
      RIGHT_TEXT: [
        "Базовая архитектура StratoVirt делится на три уровня (сверху вниз):",
        "Интерфейс OCI для обеспечения совместимости: StratoVirt полностью совместим с протоколом QEMU Machine Protocol и наследует функции OCI.",
        "BootLoader: StratoVirt реализует упрощенную и ускоренную загрузку вместо традиционного способа загрузки BIOS+GRUB.",
        "MicroVM: уровень виртуализации, который упрощает управление устройствами и поддерживает масштабирование ресурсов с низкой задержкой за счет взаимодействия программного и аппаратного обеспечения.",
      ],
    },
    SVIRT_DOCUMENT: {
      TITLE_OUTSIDE: "Документы",
      TITLE_INSIDE: "DOCUMENTATION",
      LIST: [
        {
          ICON: "/img/minisite/svirt/doc-introduct.png",
          TEXT: "Основы StratoVirt",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-install.png",
          TEXT: "Установка StratoVirt",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-ready.png",
          TEXT: "Подготовка среды",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-virtual.png",
          TEXT: "Конфигурирование виртуальных машин",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-source.png",
          TEXT: "Управление жизненным циклом виртуальной машины",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md",
        },
        {
          ICON: "/img/minisite/svirt/doc-box.png",
          TEXT: "Подключение к контейнерам безопасности iSula",
          LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md",
        },
      ],
    },
    BISHENG_BANNER_TEXT: ["BiSheng JDK", "Top-notch JDK on ARM"],
    BISHENG_DESC: [
      "BiSheng JDK is an open source version of Huawei JDK customized based on OpenJDK. Huawei JDK runs on more than 500 Huawei products. The R&D team has accumulated rich development experience and resolved the problems that arose during service running.",
      "As a downstream product of OpenJDK, BiSheng JDK is a high-performance OpenJDK distribution that can be used in production environments. BiSheng JDK fixes some performance and stability issues encountered in Huawei internal applications, optimizes performance and enhances stability on the ARM architecture, and delivers improved performance in big data scenarios.",
      "BiSheng JDK is committed to providing Java developers with a stable, reliable, high-performance, and easy-to-debug JDK. It is also a better choice on the ARM architecture.  ",
    ],
    BISHENG_LINK: [
      {
        IMG: "/img/minisite/bisheng/zh-speker.png",
        TITLE:'Start with BiSheng JDK',
        LINK_LIST: [
          {
            TEXT: "BiSheng JDK 8",
            LINK: "https://gitee.com/openeuler/bishengjdk-8",
          },
          {
            TEXT: "BiSheng JDK 11",
            LINK: "https://gitee.com/openeuler/bishengjdk-11",
          },
          {
            TEXT: "BiSheng JDK 17",
            LINK: "https://gitee.com/openeuler/bishengjdk-17",
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/zh-sponsor.png",
        TITLE:'Word to BiSheng JDK',
        LINK_LIST: [
          {
            TEXT: "BiSheng JDK 8",
            LINK: "https://gitee.com/openeuler/bishengjdk-8/issues",
          },
          {
            TEXT: "BiSheng JDK 11",
            LINK: "https://gitee.com/openeuler/bishengjdk-11/issues",
          },
          {
            TEXT: "BiSheng JDK 17",
            LINK: "https://gitee.com/openeuler/bishengjdk-17/issues",
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/meeting.png",
        TITLE:'Compiler SIG Meetings',
        LINK_LIST: [
          {
            TEXT: '2021',
            LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
          },
          {
            TEXT: '2022',
            LINK: 'https://etherpad.openeuler.org/p/Compiler-meetings',
          },
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/roadmap.png",
        TITLE:'Roadmap',
        LINK_LIST: [
          "https://gitee.com/openeuler/bishengjdk-8/wikis/%E9%A1%B9%E7%9B%AE%E8%B7%AF%E6%A0%87?sort_id=4182245",
        ],
        STATUS: false,
      },
      {
        IMG: "/img/minisite/bisheng/TCK-affidavit.png",
        TITLE:'TCK Affidavit of BiSheng JDK 8',
        LINK_LIST: [
          "/ru/other/projects/bishengjdk/tck-affidavit/",
        ],
        STATUS: false,
      },
    ],
    BISHENG_MORE: "More information:",
    BISHENG_INFO: [
      {
        THEME: "License: ",
        BODY: "The GPLv2 with Classpath Exception protocol is used.",
      },
      {
        THEME: "Supported Java versions: ",
        BODY: "Currently, BiSheng JDK supports Java 8 (LTS), 11 (LTS), and 17 (LTS).",
      },
      {
        THEME: "Supported architectures:",
        BODY: "Linux/AArch64 and Linux/x86_64.",
      },
      {
        THEME: "Supported OSs: ",
        BODY: " Almost all mainstream Linux OSs are supported. The glibc version must be 2.17 or later. BiSheng JDK has passed the stability verification on all openEuler OSs and CentOS 7.6 before the release.",
      },
    ],
    BISHENG_FRAMEWORK: {
      TITLE_OUTSIDE: "Architecture",
      TITLE_INSIDE: "ARCHITECTURE",
      DESC_LIST: [
        "The following figure shows the overall architecture of the JDK. JRE is short for Java Runtime Environment, including the Java Virtual Machine (JVM) and libraries. JDK is a superset of JRE, and therefore includes all JRE content as well as the compilers and debuggers such as javac and JDB required by developers. JRE provides only runtime libraries, JVMs, and other components required to run Java applications.",
      ],
      FRAMEWORK_IMG: "/img/minisite/bisheng/jiagoutu.png",
    },
    BISHENG_LEARN: {
      TITLE_OUTSIDE: "Learning",
      TITLE_INSIDE: "LEARNING",
      DATA_LIST: [
        {
          IMG: "/img/minisite/isula/compile.png",
          THEME: "Documentation",
          LINK: [
            {
              TEXT: "BiSheng JDK 8",
              LINK: "https://gitee.com/openeuler/bishengjdk-8/wikis/Home",
            },
            {
              TEXT: "BiSheng JDK 11",
              LINK: "https://gitee.com/openeuler/bishengjdk-11/wikis/Home",
            },
            {
              TEXT: "BiSheng JDK 17",
              LINK: "https://gitee.com/openeuler/bishengjdk-17/wikis/Home",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/install.png",
          THEME: "Learn and Practice",
          LINK: [
            {
              TEXT: "Using BiSheng JDK",
              LINK: "https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXK067+Self-paced/about",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          THEME: "Download",
          LINK: [
            {
              TEXT: "Earlier Versions",
              LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/jdk",
            },
          ],
        },
      ],
    },
    BISHENG_REFERENCE: {
      TITLE_OUTSIDE: "Links",
      TITLE_INSIDE: "LINKS",
      LINK_LIST: [
        {
          TEXT: "BiSheng JDK (Kunpeng Community) ",
          LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/jdk",
        },
        {
          TEXT: "BiSheng Compiler (Kunpeng Community)",
          LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/bisheng",
        },
        {
          TEXT: "GCC for openEuler (Kunpeng Community)",
          LINK: "https://www.hikunpeng.com/en/developer/devkit/compiler/gcc",
        },
      ],
    },
    SECGEAR_BANNER_TEXT: [
      "secGear",
      "Confidential computing framework for developing secure applications",
    ],
    SECGEAR_DESC: [
      "secGear is a confidential computing development suite used to develop secure applications in the computing industry. It aims to provide a unified development framework for different hardware devices, shielding the differences between underlying confidential computing architectures and APIs. Currently, secGear supports Intel® SGX hardware and Arm TrustZone (iTrustee supported).",
      "secGear provides rich extensibility capabilities at both the middleware layer and service layer, allowing developers to easily call security components and even directly use the confidential computing services.",
    ],
    SECGEAR_FRAMEWORK: {
      TITLE_OUTSIDE: "Architecture",
      TITLE_INSIDE: "ARCHITECTURE ",
      DESC_LIST: [
        "As shown in the figure, secGear consists of three layers. Currently, only the base layer is open source. The service layer and middleware layer will be gradually brought to open source.",
        "The service layer provides complete security services based on confidential computing. You can directly use related services to enjoy the security brought by confidential computing.",
        "The middleware layer provides common security protocol components and various security function libraries. You can directly call related APIs on the secure and non-secure sides without creating them by yourself. Currently, PKCS11 and PAKE are being built.",
        "The base layer provides rich enclave development APIs or tools, including code generation tools and enclave life cycle management APIs. POSIX APIs and standard OpenSSL APIs are supported on the secure side. You can develop secure applications based on these APIs.",
      ],
      FRAMEWORK_IMG: "/img/minisite/secgear/framework.png",
    },
    SECGEAR_DOCUMENT: {
      TITLE_OUTSIDE: "Documentation",
      TITLE_INSIDE: "DOCUMENTATION",
      DATA_LIST: [
        {
          IMG: "/img/minisite/isula/readme.png",
          LINK: [
            {
              TEXT: "Overview ",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E8%AE%A4%E8%AF%86secGear.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/desc.png",
          LINK: [
            {
              TEXT: "Installation",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%AE%89%E8%A3%85secGear.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/isula/compile.png",
          LINK: [
            {
              TEXT: "Developer Guide",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%BC%80%E5%8F%91secGear%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/install.png",
          LINK: [
            {
              TEXT: "Tool Usage",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E4%BD%BF%E7%94%A8secGear%E5%B7%A5%E5%85%B7.md",
            },
          ],
        },
        {
          IMG: "/img/minisite/atune/use.png",
          LINK: [
            {
              TEXT: "API Reference",
              LINK: "https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E6%8E%A5%E5%8F%A3%E5%8F%82%E8%80%83.md",
            },
          ],
        },
      ],
    },
  },
};
