/**
 * @file  学习模块国际化配置入口
 * */
module.exports = {
    cn: {
        MOOC: '慕课',
        MOOC_COURSE: [
            {
                ID: '1',
                IMG: '/img/learn/hcia/hcia.png',
                TITLE: 'HCIA-openEuler 认证培训课程',
                DESC: '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                APPLY_LINK: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 '
            }
        ],
        BTN_LEARN: '课程学习',
        BTN_APPLY: '考试报名',
        MOOC_CATALOG: '目录',
        COURSE_DOWNLOAD: '课件下载',
        TEACHER_TEAM: '讲师团队',
        MOOC_LIST_ROUTRE: '慕课',
        PREV_TEXT: '上一篇',
        NEXT_TEXT: '下一篇',
        MOOC_DATA: require('./../../data/learn').cn.COURSE_LIST,
        NAV_LIST: [
            {
                key: "#introduce",
                name: "活动介绍",
            },
            {
                key: "#step",
                name: "申请步骤",
            },
            {
                key: "#task",
                name: "实习任务",
            },
            {
                key: "#integral ",
                name: "激励规则",
            },
            {
                key: "#rule",
                name: "实习规则",
            },
            {
                key: "#partner",
                name: "合作伙伴",
            },
            {
                key: "#help",
                name: "帮助咨询",
            },
        ],
        INTRODUCE:
            " openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力。由openEuler社区提供实习任务，并提供导师辅导，学生通过实习申请后，可在社区领取任务，每完成一个任务可获得相应积分，积分累计达规定量后，可获得实习证明和实习工资。",
        STEP: {
            TITLE:"/img/internship/step-title.png",
            STEPNAV: [
                {
                    IMG: "/img/internship/step_1.png",
                    ACTIVE: "/img/internship/step_1active.png",
                    TEXT: "申请实习",
                },
                {
                    IMG: "/img/internship/step_2.png",
                    ACTIVE: "/img/internship/step_2active.png",
                    TEXT: "领取任务",
                },
                {
                    IMG: "/img/internship/step_3.png",
                    ACTIVE: "/img/internship/step_3active.png",
                    TEXT: "提交任务",
                },
                {
                    IMG: "/img/internship/step_4.png",
                    ACTIVE: "/img/internship/step_4active.png",
                    TEXT: "工资与实习证明",
                },
            ],
            STEP_ONE: {
                TITLE: "申请实习",
                TEXT1: "（1）阅读并签署活动声明。(见申请材料模板里)",
                TEXT2: "（2）完成",
                LINK1: "实习测试任务",
                TEXT3: "并提供PR链接。",
                TEXT4: "（3）填写报名资料表。",
                ATTENTION1: "将以上申请材料按照模板填写后发送至开源实习官方邮箱",
                ATTENTION2:
                    "。发送后等待审核，组织方将以邮件反馈审核结果，审核通过后，签订劳务协议，用所分配的账号开始实习。",
                DONWLOAD: "申请材料模板下载",
                TIP: "（注：组织方会根据所提交的资料对报名学生进行一定的审核筛选）"
            },
            ATTENTION: "注意",
            STEP_TOW: {
                TITLE: "领取任务",
                P_TEXT: [
                    "（1）在Gitee查看任务，找到你想做的任务issue。",
                    "（2）在任务issue下方评论区输入",
                    "/intern-assign",
                    "命令，认领该任务，然后发送邮件给任务导师请求审核。邮件需包括你的简历和该任务的开发方案。",
                    "（3）导师收到邮件后对申请人进行评审，在该任务issue评论下通过输入命令反馈结果，",
                    "/intern-approve",
                    "代表审核通过，学生成功领取任务,可以开始进行任务处理；",
                    "/intern-unapprove",
                    "代表领取失败，该学生可再去领取其他任务。",
                    "（4）如果领取后无法完成，可通过在issue下输入",
                    "/intern-unassign",
                    "放弃任务。",
                    "放弃超过3次，账号被限制一个月不能领取任务。",
                ],
                ATTENTION_TEXT: [
                    "每个任务只能有一个人认领，每人一次最多只能有2个认领中的任务。",
                    "输入",
                    "/intern-assign",
                    "命令后两周内没有发简历和方案给导师的，认领自动失效，任务被释放。",
                ],
                DONWLOAD: "任务认领邮件模板下载",
            },
            STEP_ThREE: {
                TITLE: "提交任务",
                P_TEXT: [
                    "（1）任务处理完成后，提交pr，在pr描述里添加 ",
                    "#issue",
                    " 编号;",
                    "（2）提交pr后在任务issue评论区输入",
                    "/intern-completed",
                    "命令，表示当前任务已提交，然后等待审核。",
                    "（3）跟进导师和相关SIG maintainer审核PR，PR被合入后，导师确认任务完成即在issue下输入",
                    "/intern-done",
                    "命令，issue关闭，学生获得积分。"
                ],
                ATTENTION_TEXT: [
                    "导师有不通过任务成果的权利，如学生提交的PR离实际所需太远，或未按时提交PR，可选择输入命令",
                    "/intern-fail",
                    "，不通过该任务，则无积分。",
                ],
            },
            STEP_FOUR: {
                TITLE: "工资与实习证明",
                P_TEXT1: [
                    "（1）在实习合同里约定的6个月期限内，学生可凭积分获得实习工资。",
                    "（2）证明申请：在实习有效期6个月内满60分即可开具实习证明，如需开具实习证明，发送邮件给实习官方邮箱",
                    "intern@openeuler.sh",
                    "提出申请。",
                ],
                P_TEXT: [
                    "满20分可获得工资总计1000元；",
                    "满40分可获得工资总计2500元；",
                    "满60分可获得工资总计4000元；",
                    "满80分可获得工资总计6000元；",
                    "满100分可获得工资总计8000元；",
                ],
                ATTENTION_TEXT: [
                    "以上工资金额为总计金额，每月月初按上月积分结算一次应发工资，在月底发放到实习生账户。应发工资为达到相应积分标准的总计工资金额减去已结算金额。",
                    "总计100分为工资结算上限。超过100分不再计算工资，可选择结束实习，或继续贡献社区，满150分可获得“开源之星”荣誉。",
                    "证明开具后视为实习结束，不再计算实习工资。",
                ],
                DONWLOAD: "证明申请材料和邮件模板下载",
            },
        },
        TASK: {
            TITLE:"/img/internship/task-title.png",
            INTRODUCE:
                "SIG（Special Interest Group）是openEuler社区的组织形式，找到你感兴趣的SIG，点击下列“实习任务”到Gitee查看相关SIG的任务（需先保持Gitee在登陆状态）。",
            EULER_TASK_ITEM: [
                {
                    NAME: "Kernel",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=10&name=Kernel",
                    INTRODUCE: "openEuler社区维护的Linux 内核",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590412&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590412&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/Kernel",
                },
                {
                    NAME: "sig-QA",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=41&name=sig-QA",
                    INTRODUCE: "致力于持续提升openEuler社区发行版本质量",
                    TASK: "https://gitee.com/organizations/src-openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590164&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590164&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-QA",
                },
                {
                    NAME: "sig-openstack",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=59&name=sig-openstack",
                    INTRODUCE:
                        "在openEuler之上提供原生的OpenStack，构建开放可靠的云计算技术栈",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590186&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590186&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/openstack",
                },
                {
                    NAME: "A-tune",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=1&name=A-Tune",
                    INTRODUCE: "基于openEuler开发的自动化、智能化性能调优引擎",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590194&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/A-Tune",
                },
                {
                    NAME: "sig-KIRAN-DESKTOP",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=37&name=sig-KIRAN-DESKTOP&mail=dev%40openeuler.org",
                    INTRODUCE:
                        "麒麟信安自主研发，致力于为用户提供更加美观，高效和易用的Linux桌面操作系统",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590528&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-KIRAN-DESKTOP",
                },
                {
                    NAME: "sig-ops",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=83&name=sig-ops",
                    INTRODUCE:
                        "致力于运维工具的移植与开发，提升openEuler操作系统的运维能力",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590323&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-ops",
                },
                {
                    NAME: "Cloud Native",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=85&name=sig-CloudNative",
                    INTRODUCE:
                        "提供便捷、易用的云原生基础设施，提供简单、高效的云原生应用开发托管环境，共建云原生生态",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590352&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-CloudNative",
                },
                {
                    NAME: "G11N",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=98&name=G11N",
                    INTRODUCE: "致力于openEuler的国际化和本地化",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590388&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/G11N",
                },
                {
                    NAME: "sig-UKUI",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=46&name=sig-UKUI",
                    INTRODUCE: "负责在openEuler上提供UKUI桌面环境，及相关软件包的规划、维护和升级",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590230&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-UKUI",
                },
                {
                    NAME: "sig-OSCourse",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-OSCourse",
                    INTRODUCE: "操作系统课程兴趣组",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=141433910&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-OSCourse",
                },
                {
                    NAME: "sig-DDE",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-DDE",
                    INTRODUCE: "深度科技自主开发的美观易用、极简操作的桌面环境",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590403&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-DDE",
                },
                {
                    NAME: "Infrastructure",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=Infrastructure",
                    INTRODUCE: "主要负责openEuler社区的基础设施功能开发、维护",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590142&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/Infrastructure",
                },
                {
                    NAME: "sig-OS-Builder",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-OS-Builder",
                    INTRODUCE: "维护openEuler业务软件包,提供更加方便的ISO构建/换标方案,提供更好的安装与升级方案",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=145511845&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-OS-Builder",
                },
                {
                    NAME: "sig-CICD",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-OS-Builder",
                    INTRODUCE: "致力于为开发者提供针对上游开源软件（来自Github、Gitee、Gitlab等托管平台）的测试服务、登录服务、故障辅助定界服务和基于历史数据的分析服务于一体的测试系统",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590412&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=146173410&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-CICD",
                },
                {
                    NAME: "sig-HPC",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-HPC",
                    INTRODUCE: "建立HPC领域的高校、企业与工程师的交流圈，打造HPC快速部署调优平台，让HPC流行起来！",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=125219718&single_label_text=&state=&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-HPC",
                },
                {
                    NAME: "其他",
                    INTRODUCE: "一些暂不属于任何SIG的任务，如Rust、存储等等",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=125884711&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&sort=&state=open&target_project&skip_mobile=true",
                },
                {
                    INTRODUCE: "更多SIG任务，敬请期待",
                },
            ],
            LOOKENG_TASK_ITEM: [
                {
                    NAME_LINK:
                        "https://openlookeng.io",
                    NAME: "openLooKeng",
                    INTRODUCE: "一款超强易用的数据虚拟化引擎，让大数据更简单",
                    TASK: "https://gitee.com/openlookeng-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true",
                    GITEE: "https://openlookeng.io",
                },
            ],
            OPENGAUSS_TASK_ITEM: [
                {
                    NAME_LINK:
                        "https://opengauss.org/",
                    NAME: "openGauss",
                    INTRODUCE: "一款高性能、高安全、高可靠的企业级开源关系型数据库",
                    TASK: "https://gitee.com/opengauss/opensource-intership/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true",
                    GITEE: "https://opengauss.org/",
                },
            ],
            MINDSPORE_TASK_ITEM: [
                {
                    NAME: "MindSpore开源实习招聘要求（公开）",
                    TASK: "https://gitee.com/mindspore/community/issues/I55QGD?from=project-issue&skip_mobile=true",
                    GITEE: "https://www.mindspore.cn/",
                    TEXT_ARRAY:[
                        '1、全日制大三大四本科生或在读研究生，计算机、软件、人工智能、电子信息、数学、计算物理、计算生物、计算化学等相关专业；',
                        '2、熟悉C++/Python编程，编码能力优秀，具有扎实的计算机基础；',
                        '3、至少熟悉一种主流深度学习框架，如MindSpore、Tensorflow、PyTorch等；',
                        '4、优选条件',
                        '（1）熟悉以下任一技术方向：分布式系统、并行计算、异构计算、深度学习编译优化、模型压缩、推理部署、算子开发、模型开发等；',
                        '（2）在高水平国际会议和学术期刊发表过相关论文或有高水平竞赛获奖经历；',
                        '（3）MindSpore社区优秀开发者、资深开发者、优秀布道师、资深布道师。'
                    ]
                },
            ],
            INTERNSHIP_TASK: "实习任务",
            SIG_DETAIL: "SIG详情",
        },
        INTEGRAL: {
            TITLE:"/img/internship/integral-title.png",
            REWARD: {
                HEAD: "1、实习工资、",
                TEXT: [
                    "实习有效期6个月内满20分以上，可获得不同级别的实习工资。具体见以上“申请步骤4”里的工资说明。",
                ],
                SUPPLEMENT:"",
            },
            HONOR: {
                HEAD: "2、实习证明",
                TEXT: [
                    "实习有效期6个月内积分满60分",
                    "至少找一位导师写实习评语",
                    "提交实习报告",
                ],
                SUPPLEMENT:"满足以上3条，实习评语与实习报告经评审合格后发放实习证明。",

            },
            INTEGRAL_DATA:[
                {
                    HEAD: "1、实习工资、",
                    TEXT: [
                        "实习有效期6个月内满20分以上，可获得不同级别的实习工资。具体见以上“申请步骤4”里的工资说明。",
                    ],
                    SUPPLEMENT:"",
                },
                {
                    HEAD: "2、实习证明",
                    TEXT: [
                        "实习有效期6个月内积分满60分",
                        "至少找一位导师写实习评语",
                        "开源实习报告模板",
                    ],
                    SUPPLEMENT:"满足以上3条，实习评语与实习报告经评审合格后发放实习证明。",
                },
                {
                    HEAD: "3、优秀实习生证书",
                    TEXT: [
                        "实习有效期6个月内积分满100分。（需包含有20及以上分值的任务）",
                        "至少找一位导师写优秀推荐评语。",
                        "完成优秀实习生线上公开答辩（直播形式）。",
                    ],
                    SUPPLEMENT:"满足以上3条，公开答辩获得评委打分80分以上后，发放优秀实习生证书。",
                },
                {
                    HEAD: "4、开源之星",
                    TEXT: [
                        "2022年内独在openEuler社区（或openGauss社区）积分满150分。",
                        "2022年内独在openEuler社区（或openGauss社区）满120分并在openEuler（或openGauss）公众号发布3篇以上实习项目相关文章及参与过一次实习直播主讲。",
                    ],
                    SUPPLEMENT:"满足以上一条可获得“开源之星”荣誉徽章，在openEuler（openGauss）官网展示，并获得参与2022年度实习优秀贡献者评选资格，评选上将获得奖金10000元。",
                },
            ],
            INTERNSHIP_COMMENT:{
                TEXT:'实习评语',
                LINK:'/doc/导师实习评语.txt',
                TITLE:'下载实习评语'
            },
            SUPPLEMENT_GAUSS:"（仅针对openEuler与openGauss社区）"
        },
        RULE: {
            TITLE:"/img/internship/rule-title.png",
            RULE_DATA: [
                {
                    QUESTION: "1、哪些人可以报名？",
                    ANSWER:
                        "A：开源实习面向全国范围内年满18周岁的全日制/非全日制在校学生招募，无专业年级限制，欢迎感兴趣的同学踊跃报名。",
                },
                {
                    QUESTION: "2、实习有效期6个月是如何计算的？",
                    ANSWER:
                        "A：在申请实习时需签署实习劳务合同，实习有效期即劳务合同上填写的实习有效期，为6个月期限，6个月期限内未满60积分则不能获得实习证明。线上实习时间管理相对自由，可根据自身情况安排时间，可提前结束实习。",
                },
                {
                    QUESTION: "3、超过了6个月或者完成了100积分还能继续在社区做任务吗？",
                    ANSWER:
                        "A：可以，但积分不能再用于领取证明和奖金，一年内累计到150积分可获得openEuler社区高校“开源之星”荣誉。 ",
                },
            ],
            MORE: ["更多问题，请移步", "本帖", "评论区提问。"],
        },
        OFFICAL_WEB: '官网详情',
        RANK: {
            FIRST: "第一名",
            SECOND: "第二名",
            THIRD: "第三名",
            SCORE: "积分",
            VIEW_ALL: "查看全部",
            PACK_UP: "收起全部",
        },
        PARTNER_TITLE:"/img/internship/partner-title.png",
        PARTNER_DATA: [
            {
                IMG: "/img/internship/iscas.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/qilinsoft.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/tongxin.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/kylinsec.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/mindSpore.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/openEuler.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/openGauss.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/openLooKeng.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/gitee.png",
                LINK: "",
            },
        ],
        HELP_TITLE:"/img/internship/help-title.png",
        HELP: [
            "联系邮箱:",
            "intern@openeuler.sh",
            "扫码加入“开源实习”学生QQ群，更多问题群内咨询。",
            "群号：526089131",
        ],
    },
    en: {
        MOOC: '慕课',
        MOOC_COURSE: [
            {
                ID: '1',
                IMG: '/img/learn/hcia/hcia.png',
                TITLE: 'HCIA-openEuler 认证培训课程',
                DESC: '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                APPLY_LINK: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 '
            }
        ],
        BTN_LEARN: '课程学习',
        BTN_APPLY: '考试报名',
        MOOC_CATALOG: '目录',
        COURSE_DOWNLOAD: '课件下载',
        TEACHER_TEAM: '讲师团队',
        MOOC_LIST_ROUTRE: '慕课',
        PREV_TEXT: '上一篇',
        NEXT_TEXT: '下一篇',
        MOOC_DATA: require('./../../data/learn').en.COURSE_LIST,
        NAV_LIST: [
            {
                key: "#introduce",
                name: "Introduction",
            },
            {
                key: "#step",
                name: "Procedure",
            },
            {
                key: "#task",
                name: "Internship Tasks",
            },
            {
                key: "#integral ",
                name: "Bonus Point Display",
            },
            {
                key: "#rule",
                name: "FAQs",
            },
            {
                key: "#partner",
                name: "Partners",
            },
            {
                key: "#help",
                name: "Help and Consultation",
            },
        ],
        INTRODUCE:
            "openEuler internship is an online internship project jointly initiated by the openEuler community and its partner. It aims to encourage students to join the open source community and improve their practical capabilities in open source projects. The openEuler community provides internship tasks and mentoring. If your application for the internship is approved, you can claim tasks in the community and earn a certain amount of bonus points upon completing each task. When you have accumulated the specified number of bonus points, you will be eligible to obtain an internship certificate and salary.",
        STEP: {
            TITLE:"/img/internship/step-title.png",
            STEPNAV: [
                {
                    IMG: "/img/internship/step_1.png",
                    ACTIVE: "/img/internship/step_1active.png",
                    TEXT: "Apply for Internship",
                },
                {
                    IMG: "/img/internship/step_2.png",
                    ACTIVE: "/img/internship/step_2active.png",
                    TEXT: "Claim a Task",
                },
                {
                    IMG: "/img/internship/step_3.png",
                    ACTIVE: "/img/internship/step_3active.png",
                    TEXT: "Submit the Task",
                },
                {
                    IMG: "/img/internship/step_4.png",
                    ACTIVE: "/img/internship/step_4active.png",
                    TEXT: "Obtain Salary and Internship Certificate",
                },
            ],
            STEP_ONE: {
                TITLE: "Apply for Internship",
                TEXT1: "（1）Read and sign the internship statement. (See the internship application template.)",
                TEXT2: "（2）Complete the",
                LINK1: " test task for internship ",
                TEXT3: "and provide the pull request (PR) link.",
                TEXT4: "（3）Fill in the internship application form.",
                ATTENTION1: "Prepare the application materials in accordance with the template, and send them to ",
                ATTENTION2:
                    ". Wait for the community to reply to your application by email. If you pass the review, sign the internship contract and use the allocated account to start the internship.",
                DONWLOAD: "Download Internship Application Template",
                TIP: "（Note: The community will review and screen applicants based on submitted materials.）"
            },
            ATTENTION: "Notes:",
            STEP_TOW: {
                TITLE: "Claim a Task",
                P_TEXT: [
                    "（1）View the internship tasks, and find a task you are interested in.",
                    "（2）Enter the",
                    "/intern-assign",
                    "command in the comment area of the issue to claim the task, and send an email to the task mentor for approval. The email should include your resume and development plan for the task.",
                    "（3）The mentor will review the application, and provide feedback in the comment area of the issue.",
                    "/intern-approve",
                    "indicates that the task has been successfully claimed.",
                    " /intern-unapprove",
                    "indicates that the task has not been claimed, and that you can try claiming another task.",
                    "（4）If you are unable to complete the claimed task, enter",
                    " /intern-unassign",
                    "in the comment area of the issue to cancel the task.",
                    "If you cancel claimed tasks more than three times, your account will be blocked from claiming any task for 30 days.",
                ],
                ATTENTION_TEXT: [
                    "Each task can only be claimed by a single intern. Each intern can claim a maximum of two tasks at a time.",
                    "If you do not send the resume and development plan to the task mentor within two weeks of having entered the",
                    "/intern-assign",
                    "command in the comment area of the issue, the claim will automatically become invalid, and the task will be released for others to claim.",
                ],
                DONWLOAD: "Download Task Claim Email Template",
            },
            STEP_ThREE: {
                TITLE: "Submit the Task",
                P_TEXT: [
                    "（1）After completing the task, submit a PR and add ",
                    "#issue_ID",
                    " to the PR description.",
                    "（2）After submitting the PR, enter the",
                    "/intern-completed",
                    "command in the comment area of the issue, indicating that the task has been submitted and is awaiting review.",
                    "（3）Follow up with the mentor and corresponding SIG maintainer on the PR review. After the PR is merged, the mentor will confirm that the task is completed, and enters the",
                    "/intern-done",
                    "command in the comment area of the issue. The issue will be closed and you will receive bonus points for the task."
                ],
                ATTENTION_TEXT: [
                    "The mentor has the right to reject the PR. If the PR submitted by the intern does not meet the requirements, or the intern does not submit the PR in time, the mentor can enter the",
                    "/intern-fail ",
                    "command to reject the PR. In this case, no bonus points will be awarded.",
                ],
            },
            STEP_FOUR: {
                TITLE: "Obtain Salary and Internship Certificate",
                P_TEXT1: [
                    "（1）Within the six-month period stipulated in the internship contract, you can claim an internship salary based on the number of bonus points you have earned.",
                    "（2）If you have earned 60 or more bonus points within the six-month internship, you can send an email to",
                    " intern@openeuler.sh ",
                    "to request an internship certificate.",
                ],
                P_TEXT: [
                    "Earn 20 bonus points for CNY 1,000.",
                    "Earn 40 bonus points for CNY 2,500.",
                    "Earn 60 bonus points for CNY 4,000.",
                    "Earn 80 bonus points for CNY 6,000.",
                    "Earn 100 bonus points for CNY 8,000.",
                ],
                ATTENTION_TEXT: [
                    "The above salary amounts are total amounts. At the beginning of each month, the payable salary is settled based on the bonus points earned the previous month. At the end of each month, the settled salary will be paid to your bank account. The salary to be paid is the total salary that can be obtained based on the accumulated bonus points minus the salary that had previously been paid to your account.",
                    "A maximum of 100 bonus points can be used for salary calculation purposes. If you have earned more than 100 bonus points, the extra bonus points will not be used to calculate your salary. You can choose to end your internship or continue to contribute to the community. If you earn 150 or more, you will be awarded the Open Source Star title.",
                    "Once the internship certificate is issued, the internship will be deemed to have ended, and no additional internship salary can be settled and paid.",
                ],
                DONWLOAD: "Download Certificate Application Email Template",
            },
        },
        TASK: {
            TITLE:"/img/internship/task-title.png",
            INTRODUCE:
                "The openEuler community is organized into Special Interest Groups (SIGs). Find the SIG that you are interested in, and click on View Internship Tasks to view internship tasks released by the SIG on Gitee (log in to Gitee in advance).",
            EULER_TASK_ITEM: [
                {
                    NAME: "Kernel",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=10&name=Kernel",
                    INTRODUCE: "Maintains the Linux kernel of openEuler.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590412&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590412&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/Kernel",
                },
                {
                    NAME: "sig-QA",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=41&name=sig-QA",
                    INTRODUCE: "Improves the quality of the openEuler releases on an ongoing basis.",
                    TASK: "https://gitee.com/organizations/src-openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590164&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590164&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-QA",
                },
                {
                    NAME: "sig-openstack",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=59&name=sig-openstack",
                    INTRODUCE:
                        "Provides native OpenStack based on openEuler, to build an open and reliable cloud computing technology stack.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590186&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590186&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/openstack",
                },
                {
                    NAME: "A-tune",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=1&name=A-Tune",
                    INTRODUCE: "Provides an automatic and intelligent performance tuning engine, based on openEuler.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590194&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/A-Tune",
                },
                {
                    NAME: "sig-KIRAN-DESKTOP",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=37&name=sig-KIRAN-DESKTOP&mail=dev%40openeuler.org",
                    INTRODUCE:
                        "Provides a more appealing, efficient, and easy-to-use Linux desktop environment, developed by Kylinsec.",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590528&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-KIRAN-DESKTOP",
                },
                {
                    NAME: "sig-ops",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=83&name=sig-ops",
                    INTRODUCE:
                        "Ports and develops O&M tools to improve the O&M capabilities of openEuler.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590323&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-ops",
                },
                {
                    NAME: "Cloud Native",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=85&name=sig-CloudNative",
                    INTRODUCE:
                        "Provides convenient and easy-to-use cloud-native infrastructure, and a simple and efficient cloud-native application development and hosting environment, for the purpose of building a cloud-native ecosystem.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590352&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE:
                        "https://gitee.com/openeuler/community/tree/master/sig/sig-CloudNative",
                },
                {
                    NAME: "G11N",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=98&name=G11N",
                    INTRODUCE: "Dedicated to openEuler internationalization and localization.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590388&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/G11N",
                },
                {
                    NAME: "sig-UKUI",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=46&name=sig-UKUI",
                    INTRODUCE: "Provides the UKUI desktop environment on openEuler, and plans, maintains, and upgrades related software packages.",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590230&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-UKUI",
                },
                {
                    NAME: "sig-OSCourse",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-OSCourse",
                    INTRODUCE: "Delivers OS-related courses.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=141433910&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-OSCourse",
                },
                {
                    NAME: "sig-DDE",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-DDE",
                    INTRODUCE: "Provides an elegant, easy-to-use, and simple desktop environment developed by deepin.",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590403&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-DDE",
                },
                {
                    NAME: "Infrastructure",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=Infrastructure",
                    INTRODUCE: "Develops and maintains the infrastructure features of openEuler.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590142&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/Infrastructure",
                },
                {
                    NAME: "sig-OS-Builder",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-OS-Builder",
                    INTRODUCE: "Maintains the openEuler service software packages, provides more convenient ISO image building solutions, and provides better installation and upgrade solutions.",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=145511845&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-OS-Builder",
                },
                {
                    NAME: "sig-CICD",
                    NAME_LINK:
                        "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-OS-Builder",
                    INTRODUCE: "Provides developers with a test system featuring test, login, assistant fault demarcation, and historical data-based analysis services for upstream open source software.",
                    TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590412&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=146173410&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
                    GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-CICD",
                },
                {
                    NAME: "Other",
                    INTRODUCE: "Lists tasks that do not belong to any SIG, such as tasks related to Rust and storage.",
                    TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=125884711&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&sort=&state=open&target_project&skip_mobile=true",
                },
                {
                    INTRODUCE: "More SIG tasks are coming soon",
                },
            ],
            LOOKENG_TASK_ITEM: [
                {
                    NAME_LINK:
                        "https://openlookeng.io",
                    NAME: "openLooKeng",
                    INTRODUCE: "A powerful and easy-to-use data virtualization engine, simplifying big data application.",
                    TASK: "https://gitee.com/openlookeng-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true",
                    GITEE: "https://openlookeng.io",
                },
            ],
            OPENGAUSS_TASK_ITEM: [
                {
                    NAME_LINK:
                        "https://opengauss.org/",
                    NAME: "openGauss",
                    INTRODUCE: "一款高性能、高安全、高可靠的企业级开源关系型数据库",
                    TASK: "https://gitee.com/opengauss/opensource-intership/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true",
                    GITEE: "https://opengauss.org/",
                },
            ],
            INTERNSHIP_TASK: "View Internship Tasks",
            SIG_DETAIL: "View SIG Details",
        },
        INTEGRAL: {
            TITLE:"/img/internship/integral-title.png",
            REWARD: {
                HEAD: "Bonus Points and Rewards",
                TEXT: [
                    "If you have earned more than 20 bonus points during the 6-month internship, you can obtain differing amounts of salary based on your bonus points.",
                    "If you accumulate 150 or more bonus points within one year, you will be awarded the Open Source Star title for college contributors by the openEuler community.",
                ],
            },
            HONOR: {
                HEAD: "Honorary rights and interests of the Open Source Star:",
                TEXT: [
                    "Obtain the Open Source Star badge issued by the openEuler community.",
                    "Extended showcase on the openEuler official website as a college contributor, and PR reports issued by the official community channel.",
                    "Invitation to the annual openEuler summit (transportation and accommodation included).",
                ],
            },
        },
        RULE: {
            TITLE:"/img/internship/rule-title.png",
            RULE_DATA: [
                {
                    QUESTION: "1. Who Is Eligible to Apply for the openEuler Internship?",
                    ANSWER:
                        "The openEuler internship is intended for full- and part-time college/university students aged 18 or above. There are no restrictions based on majors or grades. Students who are interested in the internship project are welcome to apply for the internship.",
                },
                {
                    QUESTION: "2. How Is the Six Month Validity Period for the Internship Calculated?",
                    ANSWER:
                        "When applying for the internship, you'll need to sign an internship contract. The validity period of six months states on the date specified in the contract. If you do not earn 60 bonus points within the six-month period, you will not be able to obtain the internship certificate. You can set aside time for the internship based on your needs, and end the internship in advance whenever you would like, and in accordance with requirements.",
                },
                {
                    QUESTION: "3. Can I Continue to Claim Tasks After This Six Months Has Elapsed, or After Having Earned 100 Bonus Points?",
                    ANSWER:
                        "Yes, you can. However, the extra bonus points will not be used to calculate salary, or for the purpose of obtaining additional internship certificates. If you accumulate 150 bonus points within one year, you will be awarded the Open Source Star title for college contributors by the openEuler community. ",
                },
            ],
            MORE: ["If you have other questions, feel free to contact us."],
        },
        OFFICAL_WEB: '官网详情',
        RANK: {
            FIRST: "First",
            SECOND: "Second",
            THIRD: "Third",
            SCORE: "Bonus Point",
            VIEW_ALL: "Expand",
            PACK_UP: "Collapse",
        },
        PARTNER_TITLE:"/img/internship/partner-title.png",
        PARTNER_DATA: [
            {
                IMG: "/img/internship/iscas.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/qilinsoft.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/tongxin.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/kylinsec.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/mindSpore.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/openEuler.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/openGauss.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/openLooKeng.png",
                LINK: "",
            },
            {
                IMG: "/img/internship/gitee.png",
                LINK: "",
            },
        ],
        HELP_TITLE:"/img/internship/help-title.png",
        HELP: [
            "Email:",
            "intern@openeuler.sh",
            "Scan the QR code to join the QQ group for the openEuler internship.",
            "QQ group ID: 458603235",
        ],
    },
    ru: {
        MOOC: '慕课',
        MOOC_COURSE: [
            {
                ID: '1',
                IMG: '/img/learn/hcia/hcia.png',
                TITLE: 'HCIA-openEuler 认证培训课程',
                DESC: '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                APPLY_LINK: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 '
            }
        ],
        BTN_LEARN: '课程学习',
        BTN_APPLY: '考试报名',
        MOOC_CATALOG: '目录',
        COURSE_DOWNLOAD: '课件下载',
        TEACHER_TEAM: '讲师团队',
        MOOC_LIST_ROUTRE: '慕课',
        PREV_TEXT: '上一篇',
        NEXT_TEXT: '下一篇',
        MOOC_DATA: require('./../../data/learn').ru.COURSE_LIST
    }
}
