/**
 * @file  sig模块国际化配置入口
 * */

module.exports = {
    cn: {
        GUIDANCE_LIST: {
            GUIDE: {
                MOBILE_TITLE: "SIG申请流程",
                TITLE: "申请流程",
                LINE_CONTENT: [{
                        LEFT: {
                            LEFT_INFO: "个人或公司在openEuler社区中寻找2 - 3个具有共同目标的人讨论决定成立SIG组，维护openEuler社区中的某一个技术方向软件包或发起孵化项目。",
                            LEFT_CIRCLE: "寻人",
                            LEFT_IMG: "/img/sig/sig1.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "按照成立 SIG 组的<a target='_blank' href='https://gitee.com/openeuler/community/blob/master/zh/technical-committee/governance/README.md'>成立流程</a>，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间。",
                            RIGHT_CIRCLE: "申请",
                            LEFT_IMG: "/img/sig/sig2.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致。",
                            LEFT_CIRCLE: "沟通",
                            LEFT_IMG: "/img/sig/sig3.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库。",
                            RIGHT_CIRCLE: "获批",
                            LEFT_IMG: "/img/sig/sig4.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作。",
                            LEFT_CIRCLE: "运作",
                            LEFT_IMG: "/img/sig/sig5.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会周期 Review SIG 的运作情况，给出指导意见。",
                            RIGHT_CIRCLE: "改进",
                            LEFT_IMG: "/img/sig/sig6.png"
                        }
                    },
                ]
            }
        },
        SIG_LIST: {
            HOME_PAGE: '前往gitee首页',
            MAIL: '邮件',
            IRC: 'IRC频道',
            MANAGER: '管理员',
            NAME: 'SIG名称',
            GITEE_PAGE: 'Gitee主页'
        },
        SIG_DESCRIPTION: {
            P1: 'SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织，以便于更好的管理和改善工作流程。',
            P2: 'SIG 组均是开放的，欢迎任何人来参与。',
            LI1: '每一个SIG在Gitee上都会拥有一个或多个项目，这些项目会拥有一个或多个Repository，SIG的交付成果会保存在这些Repository内。您可以在SIG对应的Repository内提交Issue、针对特定问题参与讨论，提交和解决问题，参与评审等。',
            LI2: 'SIG都是针对特定的一个或多个技术主题而成立的。SIG的核心成员主导SIG的治理，SIG内的成员推动交付成果输出，并争取让交付成果成为openEuler社区发行的一部分。',
            LI3: '在SIG团队项目的gitee首页README.md文件中，可以找到该项目所属的SIG信息、交流方式、成员和联系方式等，欢迎通过邮件列表、公开例会及对应的README.md 文件中提到的联系方式积极参与进SIG内的交流。'
        },
        SIG_LANDSCAPE: {
            BUILDING: '建设中，敬请期待'
        },
        SIG_DETAIL: {
            VIDEO: '视频',
            NEWS: '新闻',
            MORE: '更多 >',
            BLOG: '博客',
            LATEST_DYNAMIC: '最新动态',
            SIG_EMPTY_TEXT1: '这里空空如也，快给你的SIG',
            SIG_EMPTY_TEXT2: '添加简介',
            SIG_EMPTY_TEXT3: '吧!',
            INTRODUCTION: 'SIG简介',
            NO_MEETINGS: '暂无会议',
            ORGANIZING_MEETINGS: 'SIG会议',
            MEMBERS: 'SIG成员',
            CONTACT: '联系方式',
            MAIL_LIST: '邮件列表',
            EXPAND: "展开全部",
            RETRACT: "收起全部",
            BLOG_EMPTY1: "我看你骨骼惊奇，必是写文好手。这里有一本",
            BLOG_EMPTY2: "发博客攻略",
            BLOG_EMPTY3: "，赶紧拿回去看看吧。",
            NEWS_EMPTY: '不想当裁缝的厨子不是好司机，不发新闻的博客不是好视频。',
            NEWS_EMPTY2: '',
            NEWS_EMPTY3: '点击',
            NEWS_EMPTY4: '发送SIG的第一篇新闻。',
            VIDEO_EMPTY: '我都把最好的位置留给你啦，你愿意投递一个视频吗？'
        },
        ROLE_DESCRIPTION:{
            ROLE_DESCRIPTION:'角色说明',
            TABLE_TITLE:'社区成员',
            TABLE_DESCRIPTION:'本文简要描述了openEuler社区中贡献者角色的各种职责。大部分角色的职责限于这些SIG(Special Interest Group)内：',
            TABLE_THEAD:["角色","职责范围（简要描述）","要求","定义的文件"],
            TABLE_TBODY:[
                {
                    ROLE:'Contributor',
                    RESPONSIBILITIES:'项目的贡献者',
                    REQUIREMENT:'',
                    DEFINED_DOCUMENT:'Gitee注册成员'
                },
                {
                    ROLE:'Committer',
                    RESPONSIBILITIES:'审核其他成员的贡献',
                    REQUIREMENT:'SIG的积极贡献者，经验丰富，愿意投入精力参与到审核工作',
                    DEFINED_DOCUMENT:'openEuler SIG拥有的存储库中OWNERS文件中的Committer条目。'
                },
                {
                    ROLE:'Maintainer',
                    RESPONSIBILITIES:'项目Owner',
                    REQUIREMENT:'经验丰富，富有责任心、出色的技术能力和管理能力',
                    DEFINED_DOCUMENT:'openEuler SIG拥有的存储库中OWNERS文件中的Maintainer条目。'
                }
            ]
        }
    },
    en: {
        GUIDANCE_LIST: {
            GUIDE: {
                MOBILE_TITLE: "SIG申请流程",
                TITLE: "Application Process",
                LINE_CONTENT: [{
                        LEFT: {
                            LEFT_INFO: "Individuals or companies find two or three persons with common goals in the openEuler community to discuss and set up a SIG, which aims to maintain a specific type of software package in the openEuler community or to initiate an incubation project.",
                            LEFT_CIRCLE: "01",
                            MOBILE_CIRCLE: 'Find',
                            LEFT_IMG: "/img/sig/sig1.png",
                            LEFT_DESC: 'Find'
                        },
                        RIGHT: {
                            RIGHT_INFO: "Create an application file on Gitee and initiate a pull request (PR) according to the <a target='_blank' href='https://gitee.com/openeuler/community/blob/master/en/technical-committee/governance/README.md'>procedure</a> for setting up a SIG. Make an appointment for attending the Technical Committee meeting. ",
                            RIGHT_CIRCLE: "02",
                            MOBILE_CIRCLE: 'Apply',
                            LEFT_IMG: "/img/sig/sig2.png",
                            RIGHT_DESC: 'Apply'
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "At the regular Technical Committee (TC) meeting, discuss and reach an agreement on the technical scope and maintenance objectives of the SIG.",
                            LEFT_CIRCLE: "03",
                            MOBILE_CIRCLE: 'Discuss',
                            LEFT_IMG: "/img/sig/sig3.png",
                            LEFT_DESC: 'Discuss'
                        },
                        RIGHT: {
                            RIGHT_INFO: "The TC approves the establishment of the SIG. The corresponding PR is integrated into the code repository, and the infrastructure automatically establishes the corresponding repository.",
                            RIGHT_CIRCLE: "04",
                            MOBILE_CIRCLE: 'Approve',
                            LEFT_IMG: "/img/sig/sig4.png",
                            RIGHT_DESC: 'Approve'
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "The SIG starts to operate. Members use the mailing list and regular meetings for discussion and operation.",
                            LEFT_CIRCLE: "05",
                            MOBILE_CIRCLE: 'Operate',
                            LEFT_IMG: "/img/sig/sig5.png",
                            LEFT_DESC: 'Operate'
                        },
                        RIGHT: {
                            RIGHT_INFO: "The TC periodically reviews the SIG operation and provides guidance.",
                            RIGHT_CIRCLE: "06",
                            MOBILE_CIRCLE: 'Improve',
                            LEFT_IMG: "/img/sig/sig6.png",
                            RIGHT_DESC: 'Improve'
                        }
                    },
                ]
            }
        },
        SIG_LIST: {
            HOME_PAGE: 'Go to Gitee home page',
            MAIL: 'E-mail',
            IRC: 'IRC Channel',
            MANAGER: 'Administrators',
            NAME: 'SIG',
            GITEE_PAGE: 'Gitee'
        },
        SIG_DESCRIPTION: {
            P1: 'The openEuler community is organized based on Special Interest Groups (SIGs) to better manage and improve the work processes.',
            P2: 'SIGs are open to everyone.',
            LI1: 'Each SIG comprises one or more projects on Gitee, and each project has repositories that store SIG deliverables. Registering with an SIG enables you to submit, discuss, and resolve issues with other members, as well as participate in reviews in an SIG repository.',
            LI2: 'An SIG is established for one or more specific technical topics. Core members of an SIG can manage each group, and members can contribute to the quality and the output of deliverables for the openEuler community.',
            LI3: 'In the README.md file on the project Gitee page, you can find project SIG information, members, and contact information. You can join specific SIGs by mailing the listed email addresses. Also, you can attend public meetings, join discussions or forums, or participate in other activities listed in the corresponding README.md file.'
        },
        SIG_LANDSCAPE: {
            BUILDING: 'Coming soon'
        },
        SIG_DETAIL: {
            VIDEO: 'Video',
            NEWS: 'News',
            MORE: 'Read More',
            BLOG: 'Blog',
            LATEST_DYNAMIC: "What's New",
            SIG_EMPTY_TEXT1: 'Nothing found. ',
            SIG_EMPTY_TEXT2: 'Add a profile',
            SIG_EMPTY_TEXT3: ' to your SIG.',
            INTRODUCTION: 'SIG Introduction',
            NO_MEETINGS: 'Not available now',
            ORGANIZING_MEETINGS: 'SIG Schedule',
            MEMBERS: 'SIG Members',
            CONTACT: 'Contact',
            MAIL_LIST: 'Mailing list',
            EXPAND: "Expand All",
            RETRACT: "Collapse All",
            BLOG_EMPTY1: "Dive into the ",
            BLOG_EMPTY2: "blogging guide",
            BLOG_EMPTY3: " and post your first blog.",
            NEWS_EMPTY: 'Broadcast the latest news of your SIG.',
            NEWS_EMPTY2: 'Click ',
            NEWS_EMPTY3: 'here ',
            NEWS_EMPTY4: 'to publish your first SIG news.',
            VIDEO_EMPTY: 'Share your first video now.'
        },
        ROLE_DESCRIPTION:{
            ROLE_DESCRIPTION:'Role Description',
            TABLE_TITLE:'Community Member',
            TABLE_DESCRIPTION:'This article briefly describes the responsibilities and privilege of the contributor in the openEuler community. The responsibilities of most contributor are limited to SIG (Special Interest groups) :',
            TABLE_THEAD:["Role","Responsibilities","Requirement","Defined Document"],
            TABLE_TBODY:[
                {
                    ROLE:'Contributor',
                    RESPONSIBILITIES:'Contributors of the project',
                    REQUIREMENT:'',
                    DEFINED_DOCUMENT:'Registered members on Gitee'
                },
                {
                    ROLE:'Committer',
                    RESPONSIBILITIES:'Review and approve the contributions submitted',
                    REQUIREMENT:'Frequently contributing to SIG, experienced,and willing to undertake review work',
                    DEFINED_DOCUMENT:'developer entry in the OWNERS file owned by openEuler SIG'
                },
                {
                    ROLE:'Maintainer',
                    RESPONSIBILITIES:'Owner of the project',
                    REQUIREMENT:'Experienced, responsible, outstanding technologies and management skills',
                    DEFINED_DOCUMENT:'developer entry in the OWNERS file owned by openEuler SIG'
                }
            ]
        }
    },
    ru: {
        GUIDANCE_LIST: {
            GUIDE: {
                MOBILE_TITLE: "SIG申请流程",
                TITLE: "Процесс применения",
                LINE_CONTENT: [{
                        LEFT: {
                            LEFT_INFO: "Отдельные пользователи или организации могут найти в сообществе openEuler двух-трех участников с общими целями, с которыми можно обсудить вопрос создания специальной группы SIG, направленной на сопровождение пакета программного обеспечения определенного типа в сообществе openEuler или на инициирование проекта развития.",
                            LEFT_CIRCLE: "01",
                            MOBILE_CIRCLE: 'Найти',
                            LEFT_IMG: "/img/sig/sig1.png",
                            LEFT_DESC: 'Найти'
                        },
                        RIGHT: {
                            RIGHT_INFO: "Создайте файл приложения на Gitee и инициируйте запрос на включение кода в соответствии с процедурой настройки SIG. Сделайте заявку на участие в собрании Технического комитета. ",
                            RIGHT_CIRCLE: "02",
                            MOBILE_CIRCLE: 'Применить',
                            LEFT_IMG: "/img/sig/sig2.png",
                            RIGHT_DESC: 'Применить'
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "На периодически проходящем собрании Технического комитета обсуждаются технические вопросы и цели группы SIG, вырабатывается определенное компромиссное решение.",
                            LEFT_CIRCLE: "03",
                            MOBILE_CIRCLE: 'Обсудить',
                            LEFT_IMG: "/img/sig/sig3.png",
                            LEFT_DESC: 'Обсудить'
                        },
                        RIGHT: {
                            RIGHT_INFO: "Создание группы SIG утверждает Технический комитет. В репозиторий исходного кода вносится соответствующий запрос на включение кода, после чего в инфраструктуре автоматически создается соответствующий репозиторий.",
                            RIGHT_CIRCLE: "04",
                            MOBILE_CIRCLE: 'Утвердить',
                            LEFT_IMG: "/img/sig/sig4.png",
                            RIGHT_DESC: 'Утвердить'
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "Группа SIG приступает к работе. Для проведения обсуждений и работы группы организуются регулярные совещания, участники группы оповещаются через рассылку.",
                            LEFT_CIRCLE: "05",
                            MOBILE_CIRCLE: 'Работа группы',
                            LEFT_IMG: "/img/sig/sig5.png",
                            LEFT_DESC: 'Работа группы'
                        },
                        RIGHT: {
                            RIGHT_INFO: "Технический комитет периодически проверяет деятельность группы SIG и дает соответствующие указания.",
                            RIGHT_CIRCLE: "06",
                            MOBILE_CIRCLE: 'Улучшить',
                            LEFT_IMG: "/img/sig/sig6.png",
                            RIGHT_DESC: 'Улучшить'
                        }
                    },
                ]
            }
        },
        SIG_LIST: {
            HOME_PAGE: 'Перейти на главную страницу Gitee',
            MAIL: 'Эл. почта',
            IRC: 'Канал IRC',
            MANAGER: 'Администраторы'
        },
        SIG_DESCRIPTION: {
            P1: 'The openEuler community is organized based on Special Interest Groups (SIGs) to better manage and improve the work processes.',
            P2: 'SIGs are open to everyone.',
            LI1: 'Each SIG comprises one or more projects on Gitee, and each project has repositories that store SIG deliverables. Registering with an SIG enables you to submit, discuss, and resolve issues with other members, as well as participate in reviews in an SIG repository.',
            LI2: 'An SIG is established for one or more specific technical topics. Core members of an SIG can manage each group, and members can contribute to the quality and the output of deliverables for the openEuler community.',
            LI3: 'In the README.md file on the project Gitee page, you can find project SIG information, members, and contact information. You can join specific SIGs by mailing the listed email addresses. Also, you can attend public meetings, join discussions or forums, or participate in other activities listed in the corresponding README.md file.'
        },
        SIG_DETAIL: {
            VIDEO: 'Video',
            NEWS: 'News',
            MORE: 'Read More',
            BLOG: 'Blog',
            LATEST_DYNAMIC: "What's New",
            SIG_EMPTY_TEXT1: 'Nothing found. ',
            SIG_EMPTY_TEXT2: 'Add a profile ',
            SIG_EMPTY_TEXT3: 'to your SIG.',
            INTRODUCTION: 'SIG Introduction',
            NO_MEETINGS: 'Not available now',
            ORGANIZING_MEETINGS: 'SIG Schedule',
            MEMBERS: 'SIG Members',
            CONTACT: 'Contact',
            MAIL_LIST: 'Mailing list',
            EXPAND: "Expand All",
            RETRACT: "Collapse All",
            BLOG_EMPTY1: "Dive into the ",
            BLOG_EMPTY2: "blogging guide",
            BLOG_EMPTY3: " and post your first blog.",
            NEWS_EMPTY: 'Broadcast the latest news of your SIG.',
            NEWS_EMPTY2: 'Click ',
            NEWS_EMPTY3: 'here ',
            NEWS_EMPTY4: 'to publish your first SIG news.',
            VIDEO_EMPTY: 'Share your first video now.'
        },
        ROLE_DESCRIPTION:{
            ROLE_DESCRIPTION:'Role Description',
            TABLE_TITLE:'Community Member',
            TABLE_DESCRIPTION:'This article briefly describes the responsibilities and privilege of the contributor in the openEuler community. The responsibilities of most contributor are limited to SIG (Special Interest groups) :',
            TABLE_THEAD:["Role","Responsibilities","Requirement","Defined Document"],
            TABLE_TBODY:[
                {
                    ROLE:'Contributor',
                    RESPONSIBILITIES:'Contributors of the project',
                    REQUIREMENT:'',
                    DEFINED_DOCUMENT:'Registered members on Gitee'
                },
                {
                    ROLE:'Committer',
                    RESPONSIBILITIES:'Review and approve the contributions submitted',
                    REQUIREMENT:'Frequently contributing to SIG, experienced,and willing to undertake review work',
                    DEFINED_DOCUMENT:'developer entry in the OWNERS file owned by openEuler SIG'
                },
                {
                    ROLE:'Maintainer',
                    RESPONSIBILITIES:'Owner of the project',
                    REQUIREMENT:'Experienced, responsible, outstanding technologies and management skills',
                    DEFINED_DOCUMENT:'developer entry in the OWNERS file owned by openEuler SIG'
                }
            ]
        }
    }
};