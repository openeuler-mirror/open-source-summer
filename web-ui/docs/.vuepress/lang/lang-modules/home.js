/**
 * @file  首页模块国际化配置入口
 * */

module.exports = {
    cn: {
        HOME_CAROUSEL_DATA: [
            {
                TITLE: "iSula",
                LINK: "/other/projects/isula",
                DES: "小个头 大能量",
                IMG: "/img/minisite/isula/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/iSula.mp4"
            },
            {
                TITLE: "A-Tune",
                LINK: "/other/projects/atune",
                DES: "一款基于AI开发的智能优化引擎",
                IMG: "/img/minisite/atune/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/A-Tune.mp4"
            },
            {
                TITLE: "StratoVirt",
                LINK: "/other/projects/stratovirt",
                DES: "面向云数据中心的企业级虚拟化平台",
                IMG: "/img/minisite/svirt/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/StratoVirt-minisite.mp4"
            }
        ],
        ROOM_LEFT_IMG: [
            {
                IMG: '/img/activities/internship.png',
                LINK: '/internship/'
            },
            {
                IMG: '/img/activities/devday2022.png',
                LINK: '/interaction/summit-list/devday2022/'
            },
            {
                IMG: '/img/activities/pc_home_bottom_banner.png',
                LINK: '/activities/'
            }
        ],
        HOME_NEWRELEASE: [
            {
                MOBILE_IMG: "url('https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-devday-2022/images/home_devday_mo.png')",
                PC_IMG: "url('https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-devday-2022/images/home_devday_pc.png')",
                LINK: '/interaction/summit-list/devday2022/'
            },
        ],
        HOME_INTRODUCE: {
            INTRO_TITLE: "The Most Innovative Open Source Community",
            INTRO_HEAD: "开始openEuler之旅吧！",
            INTRO_DESCRIPTION: "openEuler通过开放的社区形式与全球开发者共同构建一个开放、多元和架构包容的软件生态体系，孵化支持多种处理器架构、覆盖数字设施全场景，推动企业数字基础设施软硬件、应用生态繁荣发展。",
            INTRO_IMG_URL: "",
            INTRO_MAP: [
                {
                    NAME: "下载",
                    TITLE: "openEuler ISO",
                    IMG: "/img/home/step1.png",
                    GIF: "/img/home/step-move-1.gif",
                    LINK: "/download/",
                },
                {
                    NAME: "体验",
                    TITLE: "openEuler系统",
                    IMG: "/img/home/step2.png",
                    GIF: "/img/home/step-move-2.gif",
                    LINK: "",
                },
                {
                    NAME: "查阅",
                    TITLE: "openEuler文档",
                    IMG: "/img/home/step3.png",
                    GIF: "/img/home/step-move-3.gif",
                    LINK: "/docs/",
                    OTHER_LINK: "/zh/"
                },
                {
                    NAME: "贡献",
                    TITLE: "openEuler社区",
                    IMG: "/img/home/step4.png",
                    GIF: "/img/home/step-move-4.gif",
                    LINK: "/community/contribution/",
                },

            ],
            INTRO_MAP_SND: {
                NAME: "体验",
                TITLE: "openEuler系统",
                IMG: "/img/home/step2.png",
                LINK: "javascript:;",
                GIF: "/img/home/step-move-2.gif"
            },
            INTRO_GUIDE: {
                INFO: "选择您喜欢的体验方式",
                GUIDE_WAY: [
                    {
                        TITLE: "树莓派",
                        IMG: "/img/home/areaPai.png",
                        LINK: "https://gitee.com/openeuler/raspberrypi"
                    },
                    {
                        TITLE: "硬件",
                        IMG: "/img/home/areaHardware.svg",
                        LINK: "/zh/docs/20.03_LTS/docs/Installation/installation.html"
                    },
                    {
                        TITLE: "虚拟机",
                        IMG: "/img/home/areaVirtual.svg",
                        LINK: "/zh/docs/20.03_LTS/docs/Virtualization/virtualization.html"
                    },
                    {
                        TITLE: "ECS",
                        IMG: "/img/home/areaECS.svg",
                        LINK: "https://huaweicloud.com/product/ecs.html"
                    }
                ]
            }
        },
        HOME_ACTIVE: {
            ACTIVE_TITLE: "好玩的活动停不下来",
            ACTIVE_DESCRIPTION: "openEuler社区不定期举办各种workshop、SIG讨论、线下活动、社区峰会，精彩动态随时掌握。"
        },
        HOME_ROUND: {
            ROUND_TITLE: '我们正在不断成长',
            VIEW_DETAIL: '查看详情',
            VIEW_DETAIL_LINK: 'https://datastat.openeuler.org/zh/overview',
            ROUND_LIST: [
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'contributors',
                    ROUND_IMG: '/img/round/contributer.png',
                    ROUND_TEXT: '贡献者',
                    ROUND_STYLE: {
                        backcolor: 'blue'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'repos',
                    ROUND_IMG: '/img/round/software.png',
                    ROUND_TEXT: '代码仓库',
                    ROUND_STYLE: {
                        backcolor: 'pink'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'sigs',
                    ROUND_IMG: '/img/round/sig.png',
                    ROUND_TEXT: '特别兴趣小组',
                    ROUND_STYLE: {
                        backcolor: 'yellow'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'users',
                    ROUND_IMG: '/img/round/user.png',
                    ROUND_TEXT: '社区用户',
                    ROUND_STYLE: {
                        backcolor: 'yellow'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'businessosv',
                    ROUND_IMG: '/img/round/osv.png',
                    ROUND_TEXT: '商用OSV',
                    ROUND_STYLE: {
                        backcolor: 'blue'
                    }
                }
            ]
        },
        HOME_ROOMS: {
            ROOM_NAME: ["最新活动", "博客", "新闻"],
            EVENT_NAME: "最新活动",
            BLOG_NAME: "博客",
            NEWS_NAME: "新闻",
            EVENT_LIST: [
                {
                    TAG: "事件",
                    DATE: "2020-06-07",
                    CONTENT: "吹响开源集结号——”点亮“暑假2020"
                },
                {
                    TAG: "事件",
                    DATE: "2020-01-04",
                    CONTENT: "去HDC.Cloud 2020 参加黑客松， 玩儿openEuler，赢取大礼"
                },
                {
                    TAG: "事件",
                    DATE: "2020-12-10",
                    CONTENT: "HDC.Cloud | openEuler黑客马拉松"
                },
            ],
            BLOG_LIST: [
                {
                    TAG: "openEuler Blog Maintainer",
                    DATE: "2020-05-08",
                    CONTENT: "A-Tune让系统更智能"
                },
                {
                    TAG: "zhongjun",
                    DATE: "2020-05-07",
                    CONTENT: "浅谈openEuler开源社区经营度量分析系统选型"
                },
                {
                    TAG: "Ivye",
                    DATE: "2020-05-06",
                    CONTENT: "HDC.Cloud | openEuler黑客马拉松"
                },
            ],
            NEWS_LIST: [
                {
                    TAG: "极云IT杂谈",
                    DATE: "2020-05-09",
                    CONTENT: "华为OpenEuler操作系统强势来袭，正式开源时代来了？"
                },
                {
                    TAG: "中国网科学频道",
                    DATE: "2020-05-06",
                    CONTENT: "华为联合产业伙伴openEuler2020年峰会成功召开"
                },
                {
                    TAG: "新浪",
                    DATE: "2020-04-12",
                    CONTENT: "openEuler开源路带来多样性计算计算技术与产业生态共荣"
                },
            ],
        },
        HOME_DEV: {
            DEV_TITLE: "相见恨晚的Developer",
            DEV_DESCRIPTION: "这里汇聚了无数精英大咖，快找找您感兴趣的Developer吧！",
            DEV_INFO: [
                {
                    NAME: "冯涛",
                    TITLE: "",
                    RANK: "sig-OS-Builder-Maintainer",
                    MAIL_LINK: "t.feng94@foxmail.com",
                    GITEE_LINK: "https://gitee.com/t_feng",
                    IMG: "/img/home/developer/fengtao.png"
                },
                {
                    NAME: "郭歌",
                    TITLE: "",
                    RANK: "Compiler SIG Maintainer",
                    MAIL_LINK: "nobleprize@foxmail.com",
                    GITEE_LINK: "https://gitee.com/jdkboy",
                    IMG: "/img/home/developer/guoge.png"
                },
                {
                    NAME: "杨丽",
                    TITLE: "",
                    RANK: "Packaging Maintainer",
                    MAIL_LINK: "rainbow1981@163.com",
                    GITEE_LINK: "https://gitee.com/yangli69393",
                    IMG: "/img/home/developer/yangli.png"
                },
                {
                    NAME: "张旭舟",
                    TITLE: "",
                    RANK: "Packaging Maintainer",
                    MAIL_LINK: "whoisxxx@126.com",
                    GITEE_LINK: "https://gitee.com/whoisxxx",
                    IMG: "/img/home/developer/zhangxuzhou.png"
                },
                {
                    NAME: "张芮",
                    TITLE: "",
                    RANK: "sig-OS-Builder-Maintainer",
                    MAIL_LINK: "13851924834@139.com",
                    GITEE_LINK: "https://gitee.com/anonymous_z",
                    IMG: "/img/home/developer/zhangrui.png"
                },
                {
                    NAME: "杨颖梁",
                    TITLE: "",
                    RANK: "Kernel  Maintainer",
                    MAIL_LINK: "zjutyyl@163.com",
                    GITEE_LINK: "https://gitee.com/yangyingliang",
                    IMG: "/img/home/developer/yangyingliang.png"
                },
                {
                    NAME: "徐延东",
                    TITLE: "",
                    RANK: "Virt-Maintainer",
                    MAIL_LINK: "gwmxyd@163.com",
                    GITEE_LINK: "https://gitee.com/xydong",
                    IMG: "/img/home/developer/xuyandong.png"
                },
                {
                    NAME: "夏森林",
                    TITLE: "",
                    RANK: "Desktop Maintainer",
                    MAIL_LINK: "13813374731@163.com",
                    GITEE_LINK: "https://gitee.com/small_leek",
                    IMG: "/img/home/developer/xiasenglin.png"
                },
                {
                    NAME: "伍伯东",
                    TITLE: "",
                    RANK: "CICD SIG-Maintainer",
                    MAIL_LINK: "walkingwalk@163.com",
                    GITEE_LINK: "https://gitee.com/walkingwalk",
                    IMG: "/img/home/developer/wubodong.png"
                },
                {
                    NAME: "王晓鹏",
                    TITLE: "",
                    RANK: "Networking SIG Maintainer",
                    MAIL_LINK: "wangxp006@163.com",
                    GITEE_LINK: "https://gitee.com/wangxp006",
                    IMG: "/img/home/developer/wangxiaopeng.png"
                },
                {
                    NAME: "汪奕如",
                    TITLE: "",
                    RANK: "System-Tool Maintainer",
                    MAIL_LINK: "wangyiruapp@163.com",
                    GITEE_LINK: "https://gitee.com/ruebb",
                    IMG: "/img/home/developer/wangyiru.png"
                },
                {
                    NAME: "林飞龙",
                    TITLE: "",
                    RANK: "Storage Maintainer",
                    MAIL_LINK: "404544243@qq.com",
                    GITEE_LINK: "https://gitee.com/volcanodragon",
                    IMG: "/img/home/developer/linfeilong.png"
                },
                {
                    NAME: "李清清",
                    TITLE: "",
                    RANK: "sig-RISC-V-Maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/liqingqing.png"
                },
                {
                    NAME: "李次华",
                    TITLE: "",
                    RANK: "Base-Service  Maintainer",
                    MAIL_LINK: "lilin_0209@163.com",
                    GITEE_LINK: "https://gitee.com/licihua",
                    IMG: "/img/home/developer/licihua.png"
                },
                {
                    NAME: "韩欣科",
                    TITLE: "",
                    RANK: "Base-Service  Maintainer",
                    MAIL_LINK: "1152071778@qq.com",
                    GITEE_LINK: "https://gitee.com/hanxinke",
                    IMG: "/img/home/developer/hanxingke.png"
                },
                {
                    NAME: "郭寒军",
                    TITLE: "",
                    RANK: "Kernel  Maintainer",
                    MAIL_LINK: "dileimao@126.com",
                    GITEE_LINK: "https://gitee.com/hanjun-guo",
                    IMG: "/img/home/developer/guohanjun.png"
                },
                {
                    NAME: "胡峰",
                    TITLE: "Application， System-tool， ",
                    RANK: "Packaging SIG Maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/hufen.png"
                },
                {
                    NAME: "杜开田",
                    TITLE: "Compatibility， CICD",
                    RANK: "Application",
                    MAIL_LINK: "dukaitian@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/dukaitian.png"
                },
                {
                    NAME: "何晓文",
                    TITLE: "Packaging SIG， Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "hexiaowen@huawei.com",
                    GITEE_LINK: "https://gitee.com/overweight_co",
                    IMG: "/img/home/developer/hexiaowen.png"
                },
                {
                    NAME: "朱春意",
                    TITLE: "Packaging SIG， Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "zhuchunyi@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhuchunyi",
                    IMG: "/img/home/developer/zhuchunyi.png"
                },
                {
                    NAME: "谢秀奇",
                    TITLE: "Kernel SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiexiuqi@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiexiuqi",
                    IMG: "/img/home/developer/xiexiuqi.png"
                },
                {
                    NAME: "董剑",
                    TITLE: "Packaging SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "dongjian13@huawei.com",
                    GITEE_LINK: "https://gitee.com/dogsheng",
                    IMG: "/img/home/developer/dongjian.png"
                },
                {
                    NAME: "蔡灏旻",
                    TITLE: "iSulad SIG",
                    RANK: " Maintainer",
                    MAIL_LINK: "caihaomin@huawei.com",
                    GITEE_LINK: "https://gitee.com/caihaomin",
                    IMG: "/img/home/developer/caihaomin.png"
                },
                {
                    NAME: "李峰",
                    TITLE: "Container SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lifeng68@huawei.com",
                    GITEE_LINK: "https://gitee.com/lifeng2221dd1",
                    IMG: "/img/home/developer/lifeng.png"
                },
                {
                    NAME: "张海亮",
                    TITLE: "Virt SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhang.zhanghailiang@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhanghailiang_lucky",
                    IMG: "/img/home/developer/zhanghailiang.png"
                },
                {
                    NAME: "郑弦",
                    TITLE: "sig-ai-bigdata SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "sinever@126.com",
                    GITEE_LINK: "gitee.com/sinever",
                    IMG: "/img/home/developer/zhengxian.png"
                },
                {
                    NAME: "朱健伟",
                    TITLE: "Base-Service SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhujianwei7@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhujianwei001",
                    IMG: "/img/home/developer/zhujianwei.png"
                },
                {
                    NAME: "谢志鹏",
                    TITLE: "A-Tune SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiezhipeng1@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiezhipeng1",
                    IMG: "/img/home/developer/xiezhipeng.png"
                },
                {
                    NAME: "熊伟",
                    TITLE: "sig-perl-modules/ sig-perl-",
                    RANK: "modules SIG Maintainer",
                    MAIL_LINK: "xiongwei888@huawei.com",
                    GITEE_LINK: "https://gitee.com/myeuler",
                    IMG: "/img/home/developer/xiongwei.png"
                },
                {
                    NAME: "朱延朋",
                    TITLE: "sig-release-management",
                    RANK: "SIG Maintainer",
                    MAIL_LINK: "zhuyanpeng@huawei.com",
                    GITEE_LINK: "https://gitee.com/zyp-rock",
                    IMG: "/img/home/developer/zhuyanpeng.png"
                },
                {
                    NAME: "刘志强",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lzhq28@mail.ustc.edu.cn",
                    GITEE_LINK: "https://gitee.com/liuzhiqiang26",
                    IMG: "/img/home/developer/liuzhiqiang.png"
                },
                {
                    NAME: "林飞龙",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "404544243@qq.com",
                    GITEE_LINK: "https://gitee.com/volcanodragon",
                    IMG: "/img/home/developer/linfeilong.png"
                },
            ]
        },
        HOME_SOURCE: {
            SOURCE_TITLE: "获取更多资源",
            SOURCE_APPLY: {
                TITLE: "测试资源申请",
                DES: "如果缺乏测试设备，可以尝试",
                APPLY: "在此申请。",
                SPONSOR: "感谢鹏城实验室赞助",
                SPONSORLINK: 'https://dw.pcl.ac.cn/'
            },
            SOURCE_MAIL: {
                TITLE: "邮件订阅",
                DES: "任何社区话题都可以在这里讨论。",
                SUBSCRIBE: "更多订阅请点击",
                LINK: "邮件列表",
                MAIL: "community@openeuler.org"
            },
            SOURCE_PUBLISH_TITLE: "发布 openEuler 商业发行版的厂商",
            SOURCE_LINK_TITLE: "友情链接",
        },
        HOME_SOURCE_EDITION: [
            {
                LEFT_IMG_LINK: 'http://www.kylinsec.com.cn/',
                LEFT_IMG_PC: '/img/home/link/xinan.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-xinan.png',
                RIGHT_IMG_LINK: 'https://www.uniontech.com/',
                RIGHT_IMG_PC: '/img/home/link/tongxin.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-tongxin.png'
            },
            {
                LEFT_IMG_LINK: 'https://www.kylinos.cn/',
                LEFT_IMG_PC: '/img/home/link/qiling.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-qiling.png',
                RIGHT_IMG_LINK: 'http://www.iscas.ac.cn/',
                RIGHT_IMG_PC: '/img/home/link/iscas.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-iscas.png',
            },
            {
                LEFT_IMG_LINK: 'http://www.i-soft.com.cn/',
                LEFT_IMG_PC: '/img/home/link/cetc.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-cetc.png',
                RIGHT_IMG_LINK: 'https://www.turbolinux.com.cn/',
                RIGHT_IMG_PC: '/img/home/link/turbo.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-turbo.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.hoperun.com/',
                LEFT_IMG_PC: '/img/home/link/hopeRun.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-hopeRun.png',
                RIGHT_IMG_LINK: 'http://www.tongyuanos.com/',
                RIGHT_IMG_PC: '/img/home/link/tongYuan.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-tongYuan.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.chinaredflag.cn/',
                LEFT_IMG_PC: '/img/home/link/zhongkehongqi.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-zhongkehongqi.png',
                RIGHT_IMG_LINK: 'https://www.suse.com/',
                RIGHT_IMG_PC: '/img/home/link/suse.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-suse.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.nfs-china.com/index.html',
                LEFT_IMG_PC: '/img/home/link/zhongkefangde.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-zhongkefangde.png',
                RIGHT_IMG_LINK: 'https://www.xfusion.com/cn/',
                RIGHT_IMG_PC: '/img/home/link/xfusion.png',
                RIGHT_IMG_MOBILE: '/img/home/link/xfusion_mobile.png',
            }
        ],
        FRIENDSHIP_LINK_LIST: [
            {
                LEFT_IMG_LINK: 'http://www.mulanos.cn/',
                LEFT_IMG_PC: '/img/home/link/mulan.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-mulan.png',
                RIGHT_IMG_LINK: 'https://kunpeng.huawei.com/',
                RIGHT_IMG_PC: '/img/home/link/kunpeng.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-kunpeng.png'
            },
            {
                LEFT_IMG_LINK: 'http://ic-openlabs.huawei.com/chat/#/',
                LEFT_IMG_PC: '/img/home/link/xiaozhi.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-xiaozhi.png',
                RIGHT_IMG_LINK: 'https://dw.pcl.ac.cn/',
                RIGHT_IMG_PC: '/img/home/link/pengcheng.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-pengcheng.png'
            },
            {
                LEFT_IMG_LINK: 'https://www.infoq.cn/?utm_source=openeuler&utm_medium=youlian',
                LEFT_IMG_PC: '/img/home/link/infoQ.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-infoQ.png',
                RIGHT_IMG_LINK: 'https://kaiyuanshe.cn/',
                RIGHT_IMG_PC: '/img/home/link/kaiyuanshe-logo.png',
                RIGHT_IMG_MOBILE: '/img/home/link/kaiyuanshe-logo-mobile.png',
            },
            {
                LEFT_IMG_LINK: 'http://www.vulab.com.cn/',
                LEFT_IMG_PC: '/img/home/link/zhongke_pc.png',
                LEFT_IMG_MOBILE: '/img/home/link/zhongke_mo.png',
                RIGHT_IMG_LINK: 'https://www.authing.cn/',
                RIGHT_IMG_PC: '/img/home/link/Authing_pc.png',
                RIGHT_IMG_MOBILE: '/img/home/link/Authing_mo.png',
            },
        ],
        MORE: "更多",
        EXPAND: "展开全部",
        RETRACT: "收起全部"
    },
    en: {
        HOME_CAROUSEL_DATA: [
            {
                TITLE: "iSula",
                LINK: "/other/projects/isula",
                DES: "Packs a huge punch in a small size",
                IMG: "/img/minisite/isula/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/iSula.mp4"
            },
            {
                TITLE: "A-Tune",
                LINK: "/other/projects/atune",
                DES: "AI-based Tuning Engine",
                IMG: "/img/minisite/atune/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/A-Tune.mp4"
            },
            {
                TITLE: "StratoVirt",
                LINK: "/other/projects/stratovirt",
                DES: "Virtualization platform for cloud data centers",
                IMG: "/img/minisite/svirt/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/StratoVirt-minisite.mp4"
            }
        ],
        HOME_NEWRELEASE: [
            {
                MOBILE_IMG: "url('https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-devday-2022/images/home_devday_mo.png')",
                PC_IMG: "url('https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-devday-2022/images/home_devday_pc.png')",
                LINK: '/interaction/summit-list/devday2022/'
            },
        ],
        ROOM_LEFT_IMG: [
            {
                IMG: '/img/home/blogImg.png',
                LINK: '/interaction/blog-list/'
            },
            {
                IMG: '/img/home/newsImg.png',
                LINK: '/interaction/news-list/'
            }
        ],
        HOME_LAST_BANNER: {},
        HOME_INTRODUCE: {
            INTRO_TITLE: "The Most Innovative Open Source Community",
            INTRO_HEAD: "Start your journey in openEuler",
            INTRO_DESCRIPTION: "As an open community, openEuler works with global developers to build an open, diverse, and architecture-inclusive software ecosystem that supports multiple processor architectures and covers a full range of digital facilities. openEuler is committed to supercharging enterprise digital infrastructure and boosting the application ecosystem.",
            INTRO_IMG_URL: "",
            INTRO_MAP: [
                {
                    NAME: "01",
                    TITLE: " Download openEuler ISO",
                    IMG: "/img/home/step1.png",
                    GIF: "/img/home/step-move-1.gif",
                    LINK: "/download/",
                },
                {
                    NAME: "02",
                    TITLE: "Use openEuler OS",
                    IMG: "/img/home/step2.png",
                    GIF: "/img/home/step-move-2.gif",
                    LINK: "",
                },
                {
                    NAME: "03",
                    TITLE: "Read openEuler Documentation",
                    IMG: "/img/home/step3.png",
                    GIF: "/img/home/step-move-3.gif",
                    LINK: "/docs/",
                    OTHER_LINK: "/en/"
                },
                {
                    NAME: "04",
                    TITLE: "Contribute to openEuler Community",
                    IMG: "/img/home/step4.png",
                    GIF: "/img/home/step-move-4.gif",
                    LINK: "/community/contribution/",
                },

            ],
            INTRO_MAP_SND: {
                NAME: "02",
                TITLE: "Use openEuler OS",
                IMG: "/img/home/step2.png",
                LINK: "",
                GIF: "/img/home/step-move-2.gif"
            },
            INTRO_GUIDE: {
                INFO: "Choose your favorite experience mode",
                GUIDE_WAY: [
                    {
                        TITLE: "Raspberry Pi",
                        IMG: "/img/home/areaPai.png",
                        LINK: "https://gitee.com/openeuler/raspberrypi"
                    },
                    {
                        TITLE: "Hardware",
                        IMG: "/img/home/areaHardware.svg",
                        LINK: "/en/docs/20.03_LTS/docs/Installation/Installation.html"
                    },
                    {
                        TITLE: "VM",
                        IMG: "/img/home/areaVirtual.svg",
                        LINK: "/en/docs/20.03_LTS/docs/Virtualization/virtualization.html"
                    },
                    {
                        TITLE: "ECS",
                        IMG: "/img/home/areaECS.svg",
                        LINK: "https://huaweicloud.com/product/ecs.html"
                    }
                ]
            }
        },
        HOME_ACTIVE: {
            ACTIVE_TITLE: "Join Us in Community Activities",
            ACTIVE_DESCRIPTION: "Join us in workshops, SIG discussions, offline activities, and community summits to keep abreast of the latest trend."
        },
        HOME_ROUND: {
            ROUND_TITLE: 'We Are Thriving',
            VIEW_DETAIL: 'View details',
            VIEW_DETAIL_LINK: 'https://datastat.openeuler.org/en/overview',
            ROUND_LIST: [
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'contributors',
                    ROUND_IMG: '/img/round/contributer.png',
                    ROUND_TEXT: 'Contributor',
                    ROUND_STYLE: {
                        backcolor: 'blue'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'repos',
                    ROUND_IMG: '/img/round/software.png',
                    ROUND_TEXT: 'Repository',
                    ROUND_STYLE: {
                        backcolor: 'pink'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'sigs',
                    ROUND_IMG: '/img/round/sig.png',
                    ROUND_TEXT: 'SIG',
                    ROUND_STYLE: {
                        backcolor: 'yellow'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'users',
                    ROUND_IMG: '/img/round/user.png',
                    ROUND_TEXT: 'User',
                    ROUND_STYLE: {
                        backcolor: 'yellow'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'businessosv',
                    ROUND_IMG: '/img/round/osv.png',
                    ROUND_TEXT: 'OS Vendor',
                    ROUND_STYLE: {
                        backcolor: 'blue'
                    }
                }
            ]
        },
        HOME_ROOMS: {
            ROOM_NAME: ["Latest Activity", "Blog", "News"],
            EVENT_NAME: "Latest Activity",
            BLOG_NAME: "Blog",
            EVENT_LIST: [
                {
                    TAG: "事件",
                    DATE: "2020-06-07",
                    CONTENT: "吹响开源集结号——”点亮“暑假2020"
                },
                {
                    TAG: "事件",
                    DATE: "2020-01-04",
                    CONTENT: "去HDC.Cloud 2020 参加黑客松， 玩儿openEuler，赢取大礼"
                },
                {
                    TAG: "事件",
                    DATE: "2020-12-10",
                    CONTENT: "HDC.Cloud | openEuler黑客马拉松"
                },
            ],
            NEWS_LIST: [
                {
                    TAG: "极云IT杂谈",
                    DATE: "2020-05-09",
                    CONTENT: "华为OpenEuler操作系统强势来袭，正式开源时代来了？"
                },
                {
                    TAG: "中国网科学频道",
                    DATE: "2020-05-06",
                    CONTENT: "华为联合产业伙伴openEuler2020年峰会成功召开"
                },
                {
                    TAG: "新浪",
                    DATE: "2020-04-12",
                    CONTENT: "openEuler开源路带来多样性计算计算技术与产业生态共荣"
                },
            ],
            NEWS_NAME: "News"
        },
        HOME_DEV: {
            DEV_TITLE: "Like-Minded Developers",
            DEV_DESCRIPTION: "The brightest minds of the development community gather here. Find the elite developers you are interested in.",
            DEV_INFO: [
                {
                    NAME: "Tao Feng",
                    TITLE: "",
                    RANK: "sig-OS-Builder-Maintainer",
                    MAIL_LINK: "t.feng94@foxmail.com",
                    GITEE_LINK: "https://gitee.com/t_feng",
                    IMG: "/img/home/developer/fengtao.png"
                },
                {
                    NAME: "Ge Guo",
                    TITLE: "",
                    RANK: "Compiler SIG Maintainer",
                    MAIL_LINK: "nobleprize@foxmail.com",
                    GITEE_LINK: "https://gitee.com/jdkboy",
                    IMG: "/img/home/developer/guoge.png"
                },
                {
                    NAME: "Li Yang",
                    TITLE: "",
                    RANK: "Packaging Maintainer",
                    MAIL_LINK: "rainbow1981@163.com",
                    GITEE_LINK: "https://gitee.com/yangli69393",
                    IMG: "/img/home/developer/yangli.png"
                },
                {
                    NAME: "Xuzhou Zhang",
                    TITLE: "",
                    RANK: "Packaging Maintainer",
                    MAIL_LINK: "whoisxxx@126.com",
                    GITEE_LINK: "https://gitee.com/whoisxxx",
                    IMG: "/img/home/developer/zhangxuzhou.png"
                },
                {
                    NAME: "Rui Zhang",
                    TITLE: "",
                    RANK: "sig-OS-Builder-Maintainer",
                    MAIL_LINK: "13851924834@139.com",
                    GITEE_LINK: "https://gitee.com/anonymous_z",
                    IMG: "/img/home/developer/zhangrui.png"
                },
                {
                    NAME: "Yingliang Yang",
                    TITLE: "",
                    RANK: "Kernel  Maintainer",
                    MAIL_LINK: "zjutyyl@163.com",
                    GITEE_LINK: "https://gitee.com/yangyingliang",
                    IMG: "/img/home/developer/yangyingliang.png"
                },
                {
                    NAME: "Yandong Xu",
                    TITLE: "",
                    RANK: "Virt-Maintainer",
                    MAIL_LINK: "gwmxyd@163.com",
                    GITEE_LINK: "https://gitee.com/xydong",
                    IMG: "/img/home/developer/xuyandong.png"
                },
                {
                    NAME: "Senglin Xia",
                    TITLE: "",
                    RANK: "Desktop Maintainer",
                    MAIL_LINK: "13813374731@163.com",
                    GITEE_LINK: "https://gitee.com/small_leek",
                    IMG: "/img/home/developer/xiasenglin.png"
                },
                {
                    NAME: "Bodong Wu",
                    TITLE: "",
                    RANK: "CICD SIG-Maintainer",
                    MAIL_LINK: "walkingwalk@163.com",
                    GITEE_LINK: "https://gitee.com/walkingwalk",
                    IMG: "/img/home/developer/wubodong.png"
                },
                {
                    NAME: "Xiaopeng Wang",
                    TITLE: "",
                    RANK: "Networking SIG Maintainer",
                    MAIL_LINK: "wangxp006@163.com",
                    GITEE_LINK: "https://gitee.com/wangxp006",
                    IMG: "/img/home/developer/wangxiaopeng.png"
                },
                {
                    NAME: "Yiru Wang",
                    TITLE: "",
                    RANK: "System-Tool Maintainer",
                    MAIL_LINK: "wangyiruapp@163.com",
                    GITEE_LINK: "https://gitee.com/ruebb",
                    IMG: "/img/home/developer/wangyiru.png"
                },
                {
                    NAME: "Feilong Lin",
                    TITLE: "",
                    RANK: "Storage Maintainer",
                    MAIL_LINK: "404544243@qq.com",
                    GITEE_LINK: "https://gitee.com/volcanodragon",
                    IMG: "/img/home/developer/linfeilong.png"
                },
                {
                    NAME: "Qingqing Li",
                    TITLE: "",
                    RANK: "sig-RISC-V-Maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/liqingqing.png"
                },
                {
                    NAME: "Cihua Li",
                    TITLE: "",
                    RANK: "Base-Service  Maintainer",
                    MAIL_LINK: "lilin_0209@163.com",
                    GITEE_LINK: "https://gitee.com/licihua",
                    IMG: "/img/home/developer/licihua.png"
                },
                {
                    NAME: "Xingke Han",
                    TITLE: "",
                    RANK: "Base-Service  Maintainer",
                    MAIL_LINK: "1152071778@qq.com",
                    GITEE_LINK: "https://gitee.com/hanxinke",
                    IMG: "/img/home/developer/hanxingke.png"
                },
                {
                    NAME: "Hanjun Guo",
                    TITLE: "",
                    RANK: "Kernel  Maintainer",
                    MAIL_LINK: "dileimao@126.com",
                    GITEE_LINK: "https://gitee.com/hanjun-guo",
                    IMG: "/img/home/developer/guohanjun.png"
                },
                {
                    NAME: "Feng Hu",
                    TITLE: "Application, System-tool, ",
                    RANK: "Packaging SIG Maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/hufen.png"
                },
                {
                    NAME: "Kaitian Du",
                    TITLE: "Application, CICD SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "dukaitian@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/dukaitian.png"
                },
                {
                    NAME: "Xiaowen He",
                    TITLE: "Packaging SIG, Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "hexiaowen@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/hexiaowen.png"
                },
                {
                    NAME: "Chunyi Zhu",
                    TITLE: "Packaging SIG, Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "zhuchunyi@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhuchunyi",
                    IMG: "/img/home/developer/zhuchunyi.png"
                },
                {
                    NAME: "Xiuqi Xie",
                    TITLE: "Kernel SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiexiuqi@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiexiuqi",
                    IMG: "/img/home/developer/xiexiuqi.png"
                },
                {
                    NAME: "Jian Dong",
                    TITLE: "Packaging SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "dongjian13@huawei.com",
                    GITEE_LINK: "https://gitee.com/dogsheng",
                    IMG: "/img/home/developer/dongjian.png"
                },
                {
                    NAME: "Haomin Tsai",
                    TITLE: "iSulad SIG",
                    RANK: " Maintainer",
                    MAIL_LINK: "caihaomin@huawei.com",
                    GITEE_LINK: "https://gitee.com/caihaomin",
                    IMG: "/img/home/developer/caihaomin.png"
                },
                {
                    NAME: "Feng Li",
                    TITLE: "Container SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lifeng68@huawei.com",
                    GITEE_LINK: "https://gitee.com/lifeng2221dd1",
                    IMG: "/img/home/developer/lifeng.png"
                },
                {
                    NAME: "Hailiang Zhang",
                    TITLE: "Virt SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhang.zhanghailiang@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhanghailiang_lucky",
                    IMG: "/img/home/developer/zhanghailiang.png"
                },
                {
                    NAME: "Xuan Zheng",
                    TITLE: "sig-ai-bigdata SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "sinever@126.com",
                    GITEE_LINK: "gitee.com/sinever",
                    IMG: "/img/home/developer/zhengxian.png"
                },
                {
                    NAME: "Jianwei Zhu",
                    TITLE: "Base-Service SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhujianwei7@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhujianwei001",
                    IMG: "/img/home/developer/zhujianwei.png"
                },
                {
                    NAME: "Zhipeng Xie",
                    TITLE: "A-Tune SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiezhipeng1@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiezhipeng1",
                    IMG: "/img/home/developer/xiezhipeng.png"
                },
                {
                    NAME: "Wei Xiong",
                    TITLE: "sig-perl-modules/ sig-perl-",
                    RANK: "Modules SIG Maintainer",
                    MAIL_LINK: "xiongwei888@huawei.com",
                    GITEE_LINK: "https://gitee.com/myeuler",
                    IMG: "/img/home/developer/xiongwei.png"
                },
                {
                    NAME: "Yanpeng Zhu",
                    TITLE: "sig-release-management",
                    RANK: "SIG Maintainer",
                    MAIL_LINK: "zhuyanpeng@huawei.com",
                    GITEE_LINK: "https://gitee.com/zyp-rock",
                    IMG: "/img/home/developer/zhuyanpeng.png"
                },
                {
                    NAME: "Zhiqiang Liu",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lzhq28@mail.ustc.edu.cn",
                    GITEE_LINK: "https://gitee.com/liuzhiqiang26",
                    IMG: "/img/home/developer/liuzhiqiang.png"
                },
                {
                    NAME: "Feilong Lin",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "404544243@qq.com",
                    GITEE_LINK: "https://gitee.com/volcanodragon",
                    IMG: "/img/home/developer/linfeilong.png"
                },
            ]
        },
        HOME_SOURCE: {
            SOURCE_TITLE: "More Resources",
            SOURCE_APPLY: {
                TITLE: "Test Resource Application",
                DES: "If test devices are not available, you can",
                APPLY: "apply for resources here.",
                SPONSOR: "Thanks for the sponsorship of Peng Cheng Laboratory.",
                SPONSORLINK: 'https://dw.pcl.ac.cn/'
            },
            SOURCE_MAIL: {
                TITLE: "E-mail Subscription",
                DES: "Discuss any community topic here.",
                SUBSCRIBE: "For more subscriptions, please click the ",
                LINK: "Mailing Lists",
                MAIL: "community@openeuler.org"
            },
            SOURCE_PUBLISH_TITLE: "Vendors with openEuler-based Commercial Editions",
            SOURCE_LINK_TITLE: "Reference Links",
        },
        HOME_SOURCE_EDITION: [
            {
                LEFT_IMG_LINK: 'http://www.kylinsec.com.cn/',
                LEFT_IMG_PC: '/img/home/link/xinan.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-xinan.png',
                RIGHT_IMG_LINK: 'https://www.uniontech.com/',
                RIGHT_IMG_PC: '/img/home/link/tongxin.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-tongxin.png'
            },
            {
                LEFT_IMG_LINK: 'https://www.kylinos.cn/',
                LEFT_IMG_PC: '/img/home/link/qiling.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-qiling.png',
                RIGHT_IMG_LINK: 'http://www.iscas.ac.cn/',
                RIGHT_IMG_PC: '/img/home/link/iscas.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-iscas.png',
            },
            {
                LEFT_IMG_LINK: 'http://www.i-soft.com.cn/',
                LEFT_IMG_PC: '/img/home/link/cetc.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-cetc.png',
                RIGHT_IMG_LINK: 'https://www.turbolinux.com.cn/',
                RIGHT_IMG_PC: '/img/home/link/turbo.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-turbo.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.hoperun.com/',
                LEFT_IMG_PC: '/img/home/link/hopeRun.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-hopeRun.png',
                RIGHT_IMG_LINK: 'http://www.tongyuanos.com/',
                RIGHT_IMG_PC: '/img/home/link/tongYuan.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-tongYuan.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.chinaredflag.cn/',
                LEFT_IMG_PC: '/img/home/link/zhongkehongqi.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-zhongkehongqi.png',
                RIGHT_IMG_LINK: 'https://www.suse.com/',
                RIGHT_IMG_PC: '/img/home/link/suse.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-suse.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.nfs-china.com/index.html',
                LEFT_IMG_PC: '/img/home/link/zhongkefangde.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-zhongkefangde.png',
                RIGHT_IMG_LINK: 'https://www.xfusion.com/en/',
                RIGHT_IMG_PC: '/img/home/link/xfusion.png',
                RIGHT_IMG_MOBILE: '/img/home/link/xfusion_mobile.png',
            },
        ],
        FRIENDSHIP_LINK_LIST: [
            {
                LEFT_IMG_LINK: 'http://www.mulanos.cn/',
                LEFT_IMG_PC: '/img/home/link/mulan.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-mulan.png',
                RIGHT_IMG_LINK: 'https://kunpeng.huawei.com/',
                RIGHT_IMG_PC: '/img/home/link/kunpeng.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-kunpeng.png'
            },
            {
                LEFT_IMG_LINK: 'http://ic-openlabs.huawei.com/chat/#/',
                LEFT_IMG_PC: '/img/home/link/xiaozhi.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-xiaozhi.png',
                RIGHT_IMG_LINK: 'https://dw.pcl.ac.cn/',
                RIGHT_IMG_PC: '/img/home/link/pengcheng.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-pengcheng.png'
            },
            {
                LEFT_IMG_LINK: 'https://www.infoq.cn/?utm_source=openeuler&utm_medium=youlian',
                LEFT_IMG_PC: '/img/home/link/infoQ.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-infoQ.png',
                RIGHT_IMG_LINK: 'https://kaiyuanshe.cn/',
                RIGHT_IMG_PC: '/img/home/link/kaiyuanshe-logo.png',
                RIGHT_IMG_MOBILE: '/img/home/link/kaiyuanshe-logo-mobile.png',
            },
            {
                LEFT_IMG_LINK: 'http://www.vulab.com.cn/',
                LEFT_IMG_PC: '/img/home/link/zhongke_pc.png',
                LEFT_IMG_MOBILE: '/img/home/link/zhongke_mo.png',
                RIGHT_IMG_LINK: 'https://www.authing.cn/',
                RIGHT_IMG_PC: '/img/home/link/Authing_pc.png',
                RIGHT_IMG_MOBILE: '/img/home/link/Authing_mo.png',
            },
        ],
        MORE: "Read More",
        EXPAND: "Expand All",
        RETRACT: "Collapse All"
    },
    ru: {
        HOME_CAROUSEL_DATA: [
            {
                TITLE: "iSula",
                LINK: "/other/projects/isula",
                DES: "Ударная сила в компактном размере",
                IMG: "/img/minisite/isula/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/iSula.mp4"
            },
            {
                TITLE: "A-Tune",
                LINK: "/other/projects/atune",
                DES: "инструмент настройки на базе ИИ",
                IMG: "/img/minisite/atune/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/A-Tune.mp4"
            },
            {
                TITLE: "StratoVirt",
                LINK: "/other/projects/stratovirt",
                DES: "Платформа виртуализации для облачных центров обработки данных",
                IMG: "/img/minisite/svirt/mobile-banner.png",
                VIDEO_URL: "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/StratoVirt-minisite.mp4"
            }
        ],
        HOME_NEWRELEASE: [
            {
                MOBILE_IMG: "url('https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-devday-2022/images/home_devday_mo.png')",
                PC_IMG: "url('https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-devday-2022/images/home_devday_pc.png')",
                LINK: '/interaction/summit-list/devday2022/'
            },
        ],
        ROOM_LEFT_IMG: [
            {
                IMG: '/img/home/blogImg.png',
                LINK: '/interaction/blog-list/'
            },
            {
                IMG: '/img/home/newsImg.png',
                LINK: '/interaction/news-list/'
            }
        ],
        HOME_LAST_BANNER: {},
        HOME_INTRODUCE: {
            INTRO_TITLE: "The Most Innovative Open Source Community",
            INTRO_HEAD: "Начните свой путь в openEuler",
            INTRO_DESCRIPTION: "Как открытое сообщество, openEuler работает с глобальными разработчиками, чтобы создать открытую, разнообразную и интегрированную с архитектурой экосистему программного обеспечения, которая поддерживает многопроцессорную архитектуру и охватывает весь спектр цифровых средств. openEuler стремится к эффективности корпоративной цифровой инфраструктуры и развитию экосистемы приложений.",
            INTRO_IMG_URL: "",
            INTRO_MAP: [
                {
                    NAME: "01",
                    TITLE: "Загрузить ISO openEuler",
                    IMG: "/img/home/step1.png",
                    GIF: "/img/home/step-move-1.gif",
                    LINK: "/download/",
                },
                {
                    NAME: "02",
                    TITLE: "Использовать ОС openEuler",
                    IMG: "/img/home/step2.png",
                    GIF: "/img/home/step-move-2.gif",
                    LINK: "",
                    OTHER_LINK: "/ru/"
                },
                {
                    NAME: "03",
                    TITLE: "Читать документацию openEuler",
                    IMG: "/img/home/step3.png",
                    GIF: "/img/home/step-move-3.gif",
                    LINK: "/docs/",
                    OTHER_LINK: "/en/"
                },
                {
                    NAME: "04",
                    TITLE: "Участвовать в сообществе openEuler",
                    IMG: "/img/home/step4.png",
                    GIF: "/img/home/step-move-4.gif",
                    LINK: "/community/contribution/",
                },

            ],
            INTRO_MAP_SND: {
                NAME: "02",
                TITLE: "Использовать ОС openEuler",
                IMG: "/img/home/step2.png",
                LINK: "",
                GIF: "/img/home/step-move-2.gif"
            },
            INTRO_GUIDE: {
                INFO: "Choose your favorite experience mode",
                GUIDE_WAY: [
                    {
                        TITLE: "Raspberry Pi",
                        IMG: "/img/home/areaPai.png",
                        LINK: "https://gitee.com/openeuler/raspberrypi"
                    },
                    {
                        TITLE: "Hardware",
                        IMG: "/img/home/areaHardware.svg",
                        LINK: "/en/docs/20.03_LTS/docs/Installation/Installation.html"
                    },
                    {
                        TITLE: "VM",
                        IMG: "/img/home/areaVirtual.svg",
                        LINK: "/en/docs/20.03_LTS/docs/Virtualization/virtualization.html"
                    },
                    {
                        TITLE: "ECS",
                        IMG: "/img/home/areaECS.svg",
                        LINK: "https://huaweicloud.com/product/ecs.html"
                    }
                ]
            }
        },
        HOME_ACTIVE: {
            ACTIVE_TITLE: "Присоединиться к сообществу",
            ACTIVE_DESCRIPTION: "Присоединяйтесь к сообществу и участвуйте в семинарах, обсуждениях специальных групп (SIG), традиционных мероприятиях и саммитах сообщества, чтобы быть в курсе актуальных тенденций."
        },
        HOME_ROUND: {
            ROUND_TITLE: 'Мы процветаем',
            VIEW_DETAIL: 'View details',
            VIEW_DETAIL_LINK: 'https://datastat.openeuler.org/en/overview',
            ROUND_LIST: [
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'contributors',
                    ROUND_IMG: '/img/round/contributer.png',
                    ROUND_TEXT: 'участников',
                    ROUND_STYLE: {
                        backcolor: 'blue'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'repos',
                    ROUND_IMG: '/img/round/software.png',
                    ROUND_TEXT: 'программных продуктов',
                    ROUND_STYLE: {
                        backcolor: 'pink'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'sigs',
                    ROUND_IMG: '/img/round/sig.png',
                    ROUND_TEXT: 'групп SIG',
                    ROUND_STYLE: {
                        backcolor: 'yellow'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'users',
                    ROUND_IMG: '/img/round/user.png',
                    ROUND_TEXT: 'пользователей',
                    ROUND_STYLE: {
                        backcolor: 'yellow'
                    }
                },
                {
                    ROUND_VALUE: '',
                    ROUND_KEY: 'businessosv',
                    ROUND_IMG: '/img/round/osv.png',
                    ROUND_TEXT: 'поставщиков ОС',
                    ROUND_STYLE: {
                        backcolor: 'blue'
                    }
                }
            ]
        },
        HOME_ROOMS: {
            ROOM_NAME: ["Новое мероприятие", "Блог", "Новости"],
            EVENT_NAME: "Новое мероприятие",
            BLOG_NAME: "Блог",
            EVENT_LIST: [
                {
                    TAG: "事件",
                    DATE: "2020-06-07",
                    CONTENT: "吹响开源集结号——”点亮“暑假2020"
                },
                {
                    TAG: "事件",
                    DATE: "2020-01-04",
                    CONTENT: "去HDC.Cloud 2020 参加黑客松， 玩儿openEuler，赢取大礼"
                },
                {
                    TAG: "事件",
                    DATE: "2020-12-10",
                    CONTENT: "HDC.Cloud | openEuler黑客马拉松"
                },
            ],
            NEWS_LIST: [
                {
                    TAG: "极云IT杂谈",
                    DATE: "2020-05-09",
                    CONTENT: "华为OpenEuler操作系统强势来袭，正式开源时代来了？"
                },
                {
                    TAG: "中国网科学频道",
                    DATE: "2020-05-06",
                    CONTENT: "华为联合产业伙伴openEuler2020年峰会成功召开"
                },
                {
                    TAG: "新浪",
                    DATE: "2020-04-12",
                    CONTENT: "openEuler开源路带来多样性计算计算技术与产业生态共荣"
                },
            ],
            NEWS_NAME: "Новости"
        },
        HOME_DEV: {
            DEV_TITLE: "Разработчики-единомышленники",
            DEV_DESCRIPTION: "Здесь собираются блестящие эксперты сообщества разработчиков. Найдите лучшего интересующего вас разработчика.",
            DEV_INFO: [
                {
                    NAME: "Tao Feng",
                    TITLE: "",
                    RANK: "sig-OS-Builder-Maintainer",
                    MAIL_LINK: "t.feng94@foxmail.com",
                    GITEE_LINK: "https://gitee.com/t_feng",
                    IMG: "/img/home/developer/fengtao.png"
                },
                {
                    NAME: "Ge Guo",
                    TITLE: "",
                    RANK: "Compiler SIG Maintainer",
                    MAIL_LINK: "nobleprize@foxmail.com",
                    GITEE_LINK: "https://gitee.com/jdkboy",
                    IMG: "/img/home/developer/guoge.png"
                },
                {
                    NAME: "Li Yang",
                    TITLE: "",
                    RANK: "Packaging Maintainer",
                    MAIL_LINK: "rainbow1981@163.com",
                    GITEE_LINK: "https://gitee.com/yangli69393",
                    IMG: "/img/home/developer/yangli.png"
                },
                {
                    NAME: "Xuzhou Zhang",
                    TITLE: "",
                    RANK: "Packaging Maintainer",
                    MAIL_LINK: "whoisxxx@126.com",
                    GITEE_LINK: "https://gitee.com/whoisxxx",
                    IMG: "/img/home/developer/zhangxuzhou.png"
                },
                {
                    NAME: "Rui Zhang",
                    TITLE: "",
                    RANK: "sig-OS-Builder-Maintainer",
                    MAIL_LINK: "13851924834@139.com",
                    GITEE_LINK: "https://gitee.com/anonymous_z",
                    IMG: "/img/home/developer/zhangrui.png"
                },
                {
                    NAME: "Yingliang Yang",
                    TITLE: "",
                    RANK: "Kernel  Maintainer",
                    MAIL_LINK: "zjutyyl@163.com",
                    GITEE_LINK: "https://gitee.com/yangyingliang",
                    IMG: "/img/home/developer/yangyingliang.png"
                },
                {
                    NAME: "Yandong Xu",
                    TITLE: "",
                    RANK: "Virt-Maintainer",
                    MAIL_LINK: "gwmxyd@163.com",
                    GITEE_LINK: "https://gitee.com/xydong",
                    IMG: "/img/home/developer/xuyandong.png"
                },
                {
                    NAME: "Senglin Xia",
                    TITLE: "",
                    RANK: "Desktop Maintainer",
                    MAIL_LINK: "13813374731@163.com",
                    GITEE_LINK: "https://gitee.com/small_leek",
                    IMG: "/img/home/developer/xiasenglin.png"
                },
                {
                    NAME: "Bodong Wu",
                    TITLE: "",
                    RANK: "CICD SIG-Maintainer",
                    MAIL_LINK: "walkingwalk@163.com",
                    GITEE_LINK: "https://gitee.com/walkingwalk",
                    IMG: "/img/home/developer/wubodong.png"
                },
                {
                    NAME: "Xiaopeng Wang",
                    TITLE: "",
                    RANK: "Networking SIG Maintainer",
                    MAIL_LINK: "wangxp006@163.com",
                    GITEE_LINK: "https://gitee.com/wangxp006",
                    IMG: "/img/home/developer/wangxiaopeng.png"
                },
                {
                    NAME: "Yiru Wang",
                    TITLE: "",
                    RANK: "System-Tool Maintainer",
                    MAIL_LINK: "wangyiruapp@163.com",
                    GITEE_LINK: "https://gitee.com/ruebb",
                    IMG: "/img/home/developer/wangyiru.png"
                },
                {
                    NAME: "Feilong Lin",
                    TITLE: "",
                    RANK: "Storage Maintainer",
                    MAIL_LINK: "404544243@qq.com",
                    GITEE_LINK: "https://gitee.com/volcanodragon",
                    IMG: "/img/home/developer/linfeilong.png"
                },
                {
                    NAME: "Qingqing Li",
                    TITLE: "",
                    RANK: "sig-RISC-V-Maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/liqingqing.png"
                },
                {
                    NAME: "Cihua Li",
                    TITLE: "",
                    RANK: "Base-Service  Maintainer",
                    MAIL_LINK: "lilin_0209@163.com",
                    GITEE_LINK: "https://gitee.com/licihua",
                    IMG: "/img/home/developer/licihua.png"
                },
                {
                    NAME: "Xingke Han",
                    TITLE: "",
                    RANK: "Base-Service  Maintainer",
                    MAIL_LINK: "1152071778@qq.com",
                    GITEE_LINK: "https://gitee.com/hanxinke",
                    IMG: "/img/home/developer/hanxingke.png"
                },
                {
                    NAME: "Hanjun Guo",
                    TITLE: "",
                    RANK: "Kernel  Maintainer",
                    MAIL_LINK: "dileimao@126.com",
                    GITEE_LINK: "https://gitee.com/hanjun-guo",
                    IMG: "/img/home/developer/guohanjun.png"
                },
                {
                    NAME: "Feng Hu",
                    TITLE: "Application, System-tool, ",
                    RANK: "Packaging SIG Maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/hufen.png"
                },
                {
                    NAME: "Kaitian Du",
                    TITLE: "Application, CICD SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "dukaitian@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/dukaitian.png"
                },
                {
                    NAME: "Xiaowen He",
                    TITLE: "Packaging SIG, Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "hexiaowen@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/hexiaowen.png"
                },
                {
                    NAME: "Chunyi Zhu",
                    TITLE: "Packaging SIG, Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "zhuchunyi@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhuchunyi",
                    IMG: "/img/home/developer/zhuchunyi.png"
                },
                {
                    NAME: "Xiuqi Xie",
                    TITLE: "Kernel SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiexiuqi@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiexiuqi",
                    IMG: "/img/home/developer/xiexiuqi.png"
                },
                {
                    NAME: "Jian Dong",
                    TITLE: "Packaging SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "dongjian13@huawei.com",
                    GITEE_LINK: "https://gitee.com/dogsheng",
                    IMG: "/img/home/developer/dongjian.png"
                },
                {
                    NAME: "Haomin Tsai",
                    TITLE: "iSulad SIG",
                    RANK: " Maintainer",
                    MAIL_LINK: "caihaomin@huawei.com",
                    GITEE_LINK: "https://gitee.com/caihaomin",
                    IMG: "/img/home/developer/caihaomin.png"
                },
                {
                    NAME: "Feng Li",
                    TITLE: "Container SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lifeng68@huawei.com",
                    GITEE_LINK: "https://gitee.com/lifeng2221dd1",
                    IMG: "/img/home/developer/lifeng.png"
                },
                {
                    NAME: "Hailiang Zhang",
                    TITLE: "Virt SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhang.zhanghailiang@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhanghailiang_lucky",
                    IMG: "/img/home/developer/zhanghailiang.png"
                },
                {
                    NAME: "Xuan Zheng",
                    TITLE: "sig-ai-bigdata SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "sinever@126.com",
                    GITEE_LINK: "gitee.com/sinever",
                    IMG: "/img/home/developer/zhengxian.png"
                },
                {
                    NAME: "Jianwei Zhu",
                    TITLE: "Base-Service SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhujianwei7@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhujianwei001",
                    IMG: "/img/home/developer/zhujianwei.png"
                },
                {
                    NAME: "Zhipeng Xie",
                    TITLE: "A-Tune SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiezhipeng1@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiezhipeng1",
                    IMG: "/img/home/developer/xiezhipeng.png"
                },
                {
                    NAME: "Wei Xiong",
                    TITLE: "sig-perl-modules/ sig-perl-",
                    RANK: "Modules SIG Maintainer",
                    MAIL_LINK: "xiongwei888@huawei.com",
                    GITEE_LINK: "https://gitee.com/myeuler",
                    IMG: "/img/home/developer/xiongwei.png"
                },
                {
                    NAME: "Yanpeng Zhu",
                    TITLE: "sig-release-management",
                    RANK: "SIG Maintainer",
                    MAIL_LINK: "zhuyanpeng@huawei.com",
                    GITEE_LINK: "https://gitee.com/zyp-rock",
                    IMG: "/img/home/developer/zhuyanpeng.png"
                },
                {
                    NAME: "Zhiqiang Liu",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lzhq28@mail.ustc.edu.cn",
                    GITEE_LINK: "https://gitee.com/liuzhiqiang26",
                    IMG: "/img/home/developer/liuzhiqiang.png"
                },
                {
                    NAME: "Feilong Lin",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "404544243@qq.com",
                    GITEE_LINK: "https://gitee.com/volcanodragon",
                    IMG: "/img/home/developer/linfeilong.png"
                },
            ]
        },
        HOME_SOURCE: {
            SOURCE_TITLE: "Дополнительные ресурсы",
            SOURCE_APPLY: {
                TITLE: "Применение тестовых ресурсов",
                DES: "Если нет тестовых устройств, вы можете подать",
                APPLY: "здесь заявку на их получение.",
                SPONSOR: "Благодарим лабораторию Peng Cheng Laboratory за спонсорскую поддержку.",
                SPONSORLINK: 'https://dw.pcl.ac.cn/'
            },
            SOURCE_MAIL: {
                TITLE: "Подписка по электронной почте",
                DES: "Вы можете обсудить здесь любую тему сообщества.",
                SUBSCRIBE: "Для перехода на страницу с подписками нажмите ",
                LINK: "Списки рассылок.",
                MAIL: "community@openeuler.org"
            },
            SOURCE_PUBLISH_TITLE: "Поставщики с коммерческими версиями на базе openEuler",
            SOURCE_LINK_TITLE: "Ссылки",
        },
        HOME_SOURCE_EDITION: [
            {
                LEFT_IMG_LINK: 'http://www.kylinsec.com.cn/',
                LEFT_IMG_PC: '/img/home/link/xinan.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-xinan.png',
                RIGHT_IMG_LINK: 'https://www.uniontech.com/',
                RIGHT_IMG_PC: '/img/home/link/tongxin.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-tongxin.png'
            },
            {
                LEFT_IMG_LINK: 'https://www.kylinos.cn/',
                LEFT_IMG_PC: '/img/home/link/qiling.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-qiling.png',
                RIGHT_IMG_LINK: 'http://www.iscas.ac.cn/',
                RIGHT_IMG_PC: '/img/home/link/iscas.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-iscas.png',
            },
            {
                LEFT_IMG_LINK: 'http://www.i-soft.com.cn/',
                LEFT_IMG_PC: '/img/home/link/cetc.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-cetc.png',
                RIGHT_IMG_LINK: 'https://www.turbolinux.com.cn/',
                RIGHT_IMG_PC: '/img/home/link/turbo.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-turbo.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.hoperun.com/',
                LEFT_IMG_PC: '/img/home/link/hopeRun.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-hopeRun.png',
                RIGHT_IMG_LINK: 'http://www.tongyuanos.com/',
                RIGHT_IMG_PC: '/img/home/link/tongYuan.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-tongYuan.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.chinaredflag.cn/',
                LEFT_IMG_PC: '/img/home/link/zhongkehongqi.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-zhongkehongqi.png',
                RIGHT_IMG_LINK: 'https://www.suse.com/',
                RIGHT_IMG_PC: '/img/home/link/suse.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-suse.png'
            },
            {
                LEFT_IMG_LINK: 'http://www.nfs-china.com/index.html',
                LEFT_IMG_PC: '/img/home/link/zhongkefangde.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-zhongkefangde.png',
                RIGHT_IMG_LINK: 'https://www.xfusion.com/en/',
                RIGHT_IMG_PC: '/img/home/link/xfusion.png',
                RIGHT_IMG_MOBILE: '/img/home/link/xfusion_mobile.png',
            }
        ],
        FRIENDSHIP_LINK_LIST: [
            {
                LEFT_IMG_LINK: 'http://www.mulanos.cn/',
                LEFT_IMG_PC: '/img/home/link/mulan.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-mulan.png',
                RIGHT_IMG_LINK: 'https://kunpeng.huawei.com/',
                RIGHT_IMG_PC: '/img/home/link/kunpeng.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-kunpeng.png'
            },
            {
                LEFT_IMG_LINK: 'http://ic-openlabs.huawei.com/chat/#/',
                LEFT_IMG_PC: '/img/home/link/xiaozhi.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-xiaozhi.png',
                RIGHT_IMG_LINK: 'https://dw.pcl.ac.cn/',
                RIGHT_IMG_PC: '/img/home/link/pengcheng.png',
                RIGHT_IMG_MOBILE: '/img/home/link/mobile-pengcheng.png'
            },
            {
                LEFT_IMG_LINK: 'https://www.infoq.cn/?utm_source=openeuler&utm_medium=youlian',
                LEFT_IMG_PC: '/img/home/link/infoQ.png',
                LEFT_IMG_MOBILE: '/img/home/link/mobile-infoQ.png',
                RIGHT_IMG_LINK: 'https://kaiyuanshe.cn/',
                RIGHT_IMG_PC: '/img/home/link/kaiyuanshe-logo.png',
                RIGHT_IMG_MOBILE: '/img/home/link/kaiyuanshe-logo-mobile.png',
            },
            {
                LEFT_IMG_LINK: 'http://www.vulab.com.cn/',
                LEFT_IMG_PC: '/img/home/link/zhongke_pc.png',
                LEFT_IMG_MOBILE: '/img/home/link/zhongke_mo.png',
                RIGHT_IMG_LINK: 'https://www.authing.cn/',
                RIGHT_IMG_PC: '/img/home/link/Authing_pc.png',
                RIGHT_IMG_MOBILE: '/img/home/link/Authing_mo.png',
            },
        ],
        MORE: "Read More",
        EXPAND: "Expand All",
        RETRACT: "Collapse All"
    }
};