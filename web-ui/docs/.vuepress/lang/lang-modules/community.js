/**
 * @file  社区模块国际化中文配置入口
 * */

module.exports = {
    cn: {
        NEWS: {
            NEWS: '新闻',
            MONTHS: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],           
        },
        BLOG: {
            BLOG: '博客',
            LABEL: '标签',
            FILE: '发布时间',
            AUTHOR: '作者',
            BLOGGING: '发博攻略',
            READ_MORE: '查看全文 >>',
            DISCLAIMER: '【免责声明】本文仅代表作者本人观点，与本网站无关。本网站对文中陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完整性提供任何明示或暗示的保证。本文仅供读者参考，由此产生的所有法律责任均由读者本人承担。',
            COPYRIGHT_1: "【版权声明】Copyright © 2021 openEuler Community。本文由openEuler社区首发，欢迎遵照",
            COPYRIGHT_2: "协议规定转载。转载时敬请在正文注明并保留原文链接和作者信息。",
            OTHER_BLOG: "Ta的其他博文",
            CELECT_LABEL: "选择标签",
            CELECT_FILE: "选择发布时间",
            SELECT_AUTHOR: "请选择作者",
            BROWSE: "浏览",
            VIEWED: "次",
            ALL: "全部"
        },
        MAILING_LIST: {
            TITLE: "邮件列表",
            GUIDE_CONTENT: [
                {
                    LEFT: {
                        LEFT_INFO: "在邮件列表页面选择要订阅的邮件列表",
                        LEFT_CIRCLE: "选择",
                        LEFT_IMG: "/img/community/maillist/mail1.png"
                    },
                    RIGHT: {
                        RIGHT_INFO: "填入邮件地址和名字，名字可选，点击订阅",
                        RIGHT_CIRCLE: "订阅",
                        LEFT_IMG: "/img/community/maillist/mail2.png"
                    }
                },
                {
                    LEFT: {
                        LEFT_INFO: "您的邮箱将收到一封来自邮件列表的电子邮件，要求您确认订阅了邮件列表，回复该电子邮件确认订阅",
                        LEFT_CIRCLE: "确认",
                        LEFT_IMG: "/img/community/maillist/mail3.png"
                    },
                    RIGHT: {
                        RIGHT_INFO: "您的邮箱收到来自一封来自邮件列表的欢迎邮件，即成功订阅该邮件列表。如需退订，请参考",
                        DO_THIS:"此操作",
                        LINK:"/blog/liuqi/2021-10-14-unsubscribe-mailing-list.html",
                        RIGHT_CIRCLE: "成功",
                        LEFT_IMG: "/img/community/maillist/mail4.png"
                    }
                },
            ],
            SUBSCRIBE: {
                TITLE: "概要",
                PART_ONE: "openEuler社区的主要联系方式",
                PART_TWO: "要联系列表所有者，请试用以下电子邮件地址：community-owner@openeuler.org",
                PART_THREE: "要查看次列表及以往的邮件，请访问归档。",
                REMIND: "您不创建也可订阅。如果您愿意，请使用下面的表格。",
                INPUT_ADD: "您的电子邮件地址",
                INPUT_NAME: "您的名字（选填）",
                BUTTON: "订阅",
            },
            TABLE: {
                NAME: "列表名称",
                EMAIL_ADDRESS: "邮件地址",
                ARCHIVE: "归档路径",
                DESCRIPTION: "描述",
                NAME_H5: "名称",
                ARCHIVE_H5: "归档"
            },
            MAIL_ERROR: "邮件列表发生错误",
            SUBSCRIBE_ERROR: "邮件订阅发生错误",
            SUBSCRIBE_SUCCESS: "订阅请求已发送，稍后订阅确认邮件会发送到您的邮箱，请按邮件提示回复确认邮件后，订阅才能生效。",
            MAIL_ERROR: "邮箱填写错误",
            SUBSCRIBE_ALREADY_SUCCESS: '您已订阅成功',
            SUBSCRIBE_HAS_SENT: '订阅确认邮件已发送到您的邮箱，请按邮件提示回复确认邮件后，订阅才能生效。如您没有收到邮件，请确认是否被您的邮箱服务器拦截或者归类到垃圾邮件。'
        },
        CONTRIBUTION_H5: {
            TITLE: "贡献攻略",
            MOBILE_TITLE: "社区贡献攻略",
            GUIDE_CONTENT: [
                {
                    BUTTON: "签署CLA",
                    IMG: "/img/community/contribution/cla.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/cla.png',
                    VIDEO: "/img/community/contribution/cla.gif",
                    LINK: "https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI="
                },
                {
                    BUTTON: "提出Issue",
                    IMG: "/img/community/contribution/issue.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/issue.png',
                    VIDEO: "/img/community/contribution/issue.gif",
                    LINK: "",
                    LINKADRESSLIST:{
                        TITLE:'请选择跳转的链接：',
                        LINKMESSAGE:[
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/wechat.png')",
                                TEXT:'微信',
                                LINKADRESS:'/building/'
                            },
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/email.png')",
                                TEXT:'邮件',
                                LINKADRESS:'/building/'
                            },
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/gitee.png')",
                                TEXT:'Gitee',
                                LINKADRESS:'/building/'
                            }
                        ]
                    }
                },
                {
                    BUTTON: "贡献代码",
                    IMG: "/img/community/contribution/contribution.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/contribution.png',
                    VIDEO: "/img/community/contribution/contribution.gif",
                    LINK: "https://gitee.com/openeuler"
                },
                {
                    BUTTON: "加入SIG",
                    IMG: "/img/community/contribution/sig.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/sig.png',
                    VIDEO: "/img/community/contribution/sig.gif",
                    LINK: "/sig/sig-list/"
                },
                {
                    BUTTON: "参选技术委员会",
                    IMG: "/img/community/contribution/commit.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/commit.png',
                    VIDEO: "/img/community/contribution/commit.gif",
                    LINK: "/sig/sig-list/sig-detail.html?id=21&name=TC&mail=tc%40openeuler.org"
                },
            ]
        },
        CONTRIBUTION: {
            DOWLOAD_PDF_URL: '/openeuler-trail-chess.pdf',
            BACKGROUND_IMG_H5: ' https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%B4%A1%E7%8C%AE%E5%9C%B0%E5%9B%BE/webtrailchess_zh_mo.png',
            BACKGROUND_IMG: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%B4%A1%E7%8C%AE%E5%9C%B0%E5%9B%BE/webtrailchess_zh.png',
            LOOK_DESC: '查看文字版攻略',
            PRINT_MAP: '打印攻略地图',
            LINK_LIST: [
                'https://huaweicloud.com/product/ecs.html',
                'https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Virtualization/virtualization.html',
                'https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Installation/installation.html',
                'https://gitee.com/openeuler/raspberrypi',
                '/zh/other/projects/stratovirt/',
                '/zh/other/projects/atune/',
                '/zh/other/projects/isula/',
                '/zh/other/projects/secgear/',
                'https://pkgmanage.openeuler.org/',
                '/zh/other/projects/bishengjdk/',
                'https://compass-ci.openeuler.org/',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                '/zh/#meeting',
                '/zh/interaction/salon-list/',
                '/zh/interaction/live-list/',
                '/zh/interaction/summit-list/devday2022/',
                '/zh/sig/sig-list/',
                '/zh/sig/sig-guidance/',
                'https://gitee.com/openeuler/community/issues',
                '/zh/community/contribution/detail.html#_2-贡献编码',
                '/zh/community/contribution/detail.html#_3-贡献软件包',
                '/zh/community/contribution/detail.html#_4-贡献原创开源项目',
                '/zh/community/contribution/detail.html#_5-检视代码',
                'https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E6%B5%8B%E8%AF%95%E4%BD%93%E7%B3%BB%E4%BB%8B%E7%BB%8D.md',
                'https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md',
                'https://gitee.com/openeuler/community/blob/master/zh/contributors/non-code-contributions.md',
                'https://gitee.com/openeuler/security-committee/blob/master/security-disclosure.md',
                'https://gitee.com/openeuler/community/blob/master/community-membership_cn.md',
                '/zh/sig/sig-list/sig-detail.html?id=21&name=TC&mail=dev%40openeuler.org'
            ]
        },
        CONDUCT: {
            TITLE: "行为守则"
        },
        SERVICE: {
            TITLE:"openEuler 证书",
            DOWN:{
                DPSCRIPT_ONE:"openEuler 认证是面向对 openEuler 操作系统感兴趣的IT专业人员或学生 ，证明其对 openEuler 开发、技术支持、运维能力的一种认证。",
                GET_CARD:"证书获取",
                GET_CARD_DISC:"openEuler-HCIA /openEuler-HCIP/openEuler-HCIE 认证是 openEuler 社区承认的不同等级的能力认证，如果您有兴趣获取相应证书，可点击下列项目进行报名培训与认证考试，通过考试后，您即可同步获得对应等级的证书。",
                NOT_CARDURL:"敬请期待",
                OUTLINE_DOWN_TIP:"验证码已发送至您的邮箱，请输入验证码以获取证书",
                CARD_MODEL:[
                    {
                        DISC:"openEuler-HCIA",
                        NAME:"认证工程师",
                        IMG:"/img/community/conduct/hcia-icon.png",
                        NEXT_URL:"https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&amp;authenticationLevel=CTYPE_CARE_HCIA&amp;technicalField=PSC&amp;version=1.0",
                    },
                    {
                        DISC:"openEuler-HCIP",
                        NAME:"认证高级工程师",
                        IMG:"/img/community/conduct/hcip-icon.png",
                        NEXT_URL:""
                    },
                    {
                        DISC:"openEuler-HCIE",
                        NAME:"认证专家",
                        IMG:"/img/community/conduct/hcie-icon.png",
                        NEXT_URL:""
                    },
                ],
                DOWN_CARD:"证书下载",
                DOWN_CHOOSE_CARD:"下载选中证书",
                DOWN_CARD_DISC:"通过认证考试后可在此处下载证书。",
                SEARCH_RESULTS:"您的证书信息如下：",
                NO_CARD:"当前无可下载证书！",
                DOWN_FAIL_DISC_LEFT:"您的下载链接已过期，请点击",
                DOWN_FAIL_DISC_RIGHT:"重新获取下载链接。",
                DOWNCREDENT:[{
                    NAME:"证书下载",
                    IMG:"/img/community/conduct/down-card-icon.png",
                }]
            },
            SEARCH:{
                SEARCH:"证书查询",
                SEARCH_DISC:"请输入认证考试所用的邮箱以获取验证码，查询您的证书。",
                SEND_CODE:"发送验证码",
                SEND_AGAIN:"重新发送",
                EMAIL_ERROR:"您输入的邮箱有误",
                EMAIL_PLAHD:"您绑定的邮箱",
                CODE_PLAHD:"输入您获取的验证码",
                CODE_ERROR:"您输入的验证码有误！",
                SHOW_TEMPLATE:"/img/community/conduct/showtemplate.png"
            },
            BTNSURE:"确定"
        }
    },
    en: {
        NEWS: {
            NEWS: 'News',
            MONTHS: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        },
        BLOG: {
            BLOG: 'Blog',
            LABEL: 'Label',
            AUTHOR: "Author",
            FILE: 'Date of Release',
            BLOGGING: 'Guidance to post a blog', 
            READ_MORE: 'Read more >>',
            DISCLAIMER: "[Disclaimer] This article only represents the author's opinions, and is irrelevant to this website. This website is neutral in terms of the statements and opinions in this article, and does not provide any express or implied warranty of accuracy, reliability, or completeness of the contents contained therein. This article is for readers' reference only, and all legal responsibilities arising therefrom are borne by the reader himself.",
            COPYRIGHT_1: "[Copyright] Copyright © 2021 openEuler Community. This article is first released by the openEuler community. Please reproduce it in compliance with the",
            COPYRIGHT_2: "license. Please note the text and keep the original link and author information when reproducing the article.",
            OTHER_BLOG: "Other blogs",
            CELECT_LABEL: "Select tag",
            CELECT_FILE: "Select date",
            SELECT_AUTHOR: "Select author",
            BROWSE: "",
            VIEWED: " Viewed",
            ALL: "All"
        },
        MAILING_LIST: {
            TITLE: "Mailing Lists",
            GUIDE_CONTENT: [
                {
                    LEFT: {
                        LEFT_INFO: "Select the mailing list to be subscribed to on the Mailing Lists page.",
                        LEFT_CIRCLE: "Select",
                        LEFT_IMG: "/img/community/maillist/mail1.png",
                        INDEX: '01'
                    },
                    RIGHT: {
                        RIGHT_INFO: "Enter the e-mail address and name (optional), and click Subscribe. ",
                        RIGHT_CIRCLE: "Subscribe ",
                        LEFT_IMG: "/img/community/maillist/mail2.png",
                        INDEX: '02'
                    }
                },
                {
                    LEFT: {
                        LEFT_INFO: "Your mailbox will receive an e-mail from the mailing list, asking you to confirm that you have subscribed to the mailing list. Reply to the e-mail to confirm the subscription.",
                        LEFT_CIRCLE: "Confirm ",
                        LEFT_IMG: "/img/community/maillist/mail3.png",
                        INDEX: '03'
                    },
                    RIGHT: {
                        RIGHT_INFO: "Your mailbox receives a welcome e-mail from the mailing list, indicating that you have subscribed to the mailing list successfully.",
                        RIGHT_CIRCLE: "Succeed",
                        LEFT_IMG: "/img/community/maillist/mail4.png",
                        INDEX: '04'
                    }
                },
            ],
            SUBSCRIBE: {
                TITLE: "Summary",
                PART_ONE: "The main contact endpoint of openEuler community",
                PART_TWO: "To contact the list owners, use the following email address: community-owner@openeuler.org",
                PART_THREE: "To see the prior posting to the list, visit the archives.",
                REMIND: "You can also subscribe without creating an account. If you wish to do so, please use the form below.",
                INPUT_ADD: "Your email address",
                INPUT_NAME: "Your name(optional)",
                BUTTON: "Subscribe"
            },
            TABLE: {
                NAME: "Name",
                EMAIL_ADDRESS: "Mailing List",
                ARCHIVE: "Archive",
                DESCRIPTION: "Description",
                NAME_H5: "Name",
                ARCHIVE_H5: "Archive"
            },
            MAIL_ERROR: "Error in mailing list",
            SUBSCRIBE_ERROR: "Mail subscription error",
            SUBSCRIBE_SUCCESS: "The subscription request has been sent. A subscription confirmation e-mail will be sent to your mailbox later. please replay to the confirmation e-mail as prompted to make the subscription take effect.",
            MAIL_ERROR: "Email error",
            SUBSCRIBE_ALREADY_SUCCESS: 'Member already subscribed',
            SUBSCRIBE_HAS_SENT: 'The subscription confirmation e-mail has been sent to your mailbox. Please replay to the e-mail as prompted to make the subscription take effect. if you do not receive the e-mail, check whether the e-mail is blocked by your e-mail server or classified as spam.'
        },
        CONTRIBUTION_H5: {
            TITLE: "How to Contribute",
            MOBILE_TITLE: "How to Contribute",
            GUIDE_CONTENT: [
                {
                    BUTTON: "Sign CLA",
                    IMG: "/img/community/contribution/cla.png",
                    VIDEO: "/img/community/contribution/cla.gif",
                    MOBILEIMG:'/img/community/contribution/mobile-img/cla.png',
                    LINK: "https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI="
                },
                {
                    BUTTON: "Submit an Issue",
                    IMG: "/img/community/contribution/issue.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/issue.png',
                    VIDEO: "/img/community/contribution/issue.gif",
                    LINK: "",
                    LINKADRESSLIST:{
                        TITLE:'Choose your link：',
                        LINKMESSAGE:[
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/wechat.png')",
                                TEXT:'Wechat',
                                LINKADRESS:'/building/'
                            },
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/email.png')",
                                TEXT:'Email',
                                LINKADRESS:'/building/'
                            },
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/gitee.png')",
                                TEXT:'Gitee',
                                LINKADRESS:'/building/'
                            }
                        ]
                    }
                },
                {
                    BUTTON: "Contribute Code",
                    IMG: "/img/community/contribution/contribution.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/contribution.png',
                    VIDEO: "/img/community/contribution/contribution.gif",
                    LINK: "https://gitee.com/openeuler"
                },
                {
                    BUTTON: "Join SIG",
                    IMG: "/img/community/contribution/sig.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/sig.png',
                    VIDEO: "/img/community/contribution/sig.gif",
                    LINK: "/sig/sig-list/"
                },
                {
                    BUTTON: "Participate in Technical Committee Election",
                    IMG: "/img/community/contribution/commit.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/commit.png',
                    VIDEO: "/img/community/contribution/commit.gif",
                    LINK: "/sig/sig-list/sig-detail.html?id=21&name=TC&mail=tc%40openeuler.org"
                },
            ]
        },
        CONTRIBUTION: {
            DOWLOAD_PDF_URL: '/openeuler-trail-chess-en.pdf',
            BACKGROUND_IMG_H5: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%B4%A1%E7%8C%AE%E5%9C%B0%E5%9B%BE/webtrailchess_en_mo.png',
            BACKGROUND_IMG: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%B4%A1%E7%8C%AE%E5%9C%B0%E5%9B%BE/webtrailchess_en.png',
            LOOK_DESC: 'View Details',
            PRINT_MAP: 'Download',
            LINK_LIST: [
                'https://huaweicloud.com/intl/en-us/product/ecs.html',
                'https://docs.openeuler.org/en/docs/20.03_LTS/docs/Virtualization/virtualization.html',
                'https://docs.openeuler.org/en/docs/20.03_LTS/docs/Installation/Installation.html',
                'https://gitee.com/openeuler/raspberrypi',
                '/en/other/projects/stratovirt/',
                '/en/other/projects/atune/',
                '/en/other/projects/isula/',
                '/en/other/projects/secgear/',
                'https://pkgmanage.openeuler.org/',
                '/en/other/projects/bishengjdk/',
                'https://compass-ci.openeuler.org/',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                '/en/#meeting',
                '/en/interaction/salon-list/',
                '/en/interaction/live-list/',
                '/en/interaction/summit-list/devday2022/',
                '/en/sig/sig-list/',
                '/en/sig/sig-guidance/',
                'https://gitee.com/openeuler/community/issues',
                '/en/community/contribution/detail.html#_2-contribute-code',
                '/en/community/contribution/detail.html#_3-contribute-a-package',
                '/en/community/contribution/detail.html#_4-contribute-original-open-source-projects',
                '/en/community/contribution/detail.html#__5-review-code',
                'https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E6%B5%8B%E8%AF%95%E4%BD%93%E7%B3%BB%E4%BB%8B%E7%BB%8D.md',
                'https://gitee.com/openeuler/community/blob/master/en/contributors/packaging.md',
                'https://gitee.com/openeuler/community/blob/master/en/contributors/non-code-contributions.md',
                'https://gitee.com/openeuler/security-committee/blob/master/security-disclosure.md',
                'https://gitee.com/openeuler/community/blob/master/community-membership.md',
                '/en/sig/sig-list/sig-detail.html?id=21&name=TC&mail=dev%40openeuler.org'
            ]
        },
        CONDUCT: {
            TITLE: "Code of Covenant"
        },
        SERVICE: {
            TITLE:"openEuler Certification",
            DOWN:{
                DPSCRIPT_ONE:"openEuler certification is intended for IT professionals or students interested in the openEuler OS to prove their capabilities in openEuler development, technical support, and O&M.",
                GET_CARD:"Take Exams",
                GET_CARD_DISC:"openEuler-HCIA, openEuler-HCIP and openEuler-HCIE are the capability certifications at different levels recognized by the openEuler community. If you are interested in obtaining any of these certificates, click the following items to sign up for the trainings and tests.",
                NOT_CARDURL:"Coming soon",
                OUTLINE_DOWN_TIP:"The verification code has been sent to your email address. Enter the verification code to obtain the certificate.",
                CARD_MODEL:[
                    {
                        DISC:"openEuler-HCIA",
                        NAME:"Certified Engineer",
                        IMG:"/img/community/conduct/hcia-icon.png",
                        NEXT_URL:"https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&amp;authenticationLevel=CTYPE_CARE_HCIA&amp;technicalField=PSC&amp;version=1.0",
                    },
                    {
                        DISC:"openEuler-HCIP",
                        NAME:"Certified Senior Enginee",
                        IMG:"/img/community/conduct/hcip-icon.png",
                        NEXT_URL:""
                    },
                    {
                        DISC:"openEuler-HCIE",
                        NAME:"Certified Expert",
                        IMG:"/img/community/conduct/hcie-icon.png",
                        NEXT_URL:""
                    },
                ],
                DOWN_CARD:"Download Certificates",
                DOWN_CHOOSE_CARD:"Download Selected Certificates",
                DOWN_CARD_DISC:"Click to download the certificate after passing the exam.",
                SEARCH_RESULTS:"The information of your certificates is as follows:",
                NO_CARD:"No certificate is available for download.",
                DOWN_FAIL_DISC_LEFT:"Your download link has expired. Click ",
                DOWN_FAIL_DISC_RIGHT:" to obtain a new link.",
                DOWNCREDENT:[{
                    NAME:"Download Certificates",
                    IMG:"/img/community/conduct/down-card-icon.png",
                }]
            },
            SEARCH:{
                SEARCH:"Query Certificates",
                SEARCH_DISC:"Enter the email address used for the certification exam to obtain the verification code and query your certificate.",
                SEND_CODE:"Send a verification code",
                SEND_AGAIN:"Resend",
                EMAIL_ERROR:"The email address is incorrect.",
                EMAIL_PLAHD:"Your email address",
                CODE_PLAHD:"Enter the verification code.",
                CODE_ERROR:"The verification code is incorrect.",
                SHOW_TEMPLATE:"/img/community/conduct/showtemplate.png"
            },
            BTNSURE:"Confirm"
        }
    },
    ru: {
        NEWS: {
            NEWS: 'Новости',
            MONTHS: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        },
        BLOG: {
            BLOG: 'Блог',
            LABEL: 'Метка',
            AUTHOR: "Author",
            FILE: 'Дата выпуска релиза',
            BLOGGING: 'Ведение блога', 
            READ_MORE: 'Еще >>',
            DISCLAIMER: "[Заявление об отсутствии гарантий] Данная статья представляет только мнения автора и не имеет отношения к данному веб-сайту. Данный веб-сайт является нейтральным с точки зрения заявлений и мнений, содержащихся в данной статье, и отказывается от всех явно выраженных или подразумеваемых гарантий точности, надежности и полноты содержащейся информации. Информация, содержащаяся в данной статье, предназначена только для справки, и все юридические обязательства, вытекающие из нее, несет сам читатель.",
            COPYRIGHT_1: "[Заявление об авторском праве]Copyright © 2021 openEuler Community. Данная статья была впервые опубликована сообществом openEuler. Пожалуйста, копируйте и распространяйте ее в соответствии с лицензией",
            COPYRIGHT_2: "При перепечатке необходимо указать в тексте исходную ссылку и информацию об авторе.",
            OTHER_BLOG: "Other blogs",
            CELECT_LABEL: "Выбрать",
            CELECT_FILE: "Выбрать",
            SELECT_AUTHOR: "Select author",
            BROWSE: "",
            VIEWED: "Просмотрено",
            ALL: "Все"
        },
        MAILING_LIST: {
            TITLE: "Списки рассылок",
            GUIDE_CONTENT: [
                {
                    LEFT: {
                        LEFT_INFO: "На странице Списки рассылок выберите рассылку, на которую хотите подписаться.",
                        LEFT_CIRCLE: "Выбрать",
                        LEFT_IMG: "/img/community/maillist/mail1.png",
                        INDEX: '01'
                    },
                    RIGHT: {
                        RIGHT_INFO: "Введите адрес электронной почты и имя (необязательно), нажмите Подписаться.",
                        RIGHT_CIRCLE: "Подписаться ",
                        LEFT_IMG: "/img/community/maillist/mail2.png",
                        INDEX: '02'
                    }
                },
                {
                    LEFT: {
                        LEFT_INFO: "На ваш почтовый ящик поступит электронное письмо с запросом на подтверждение, что вы подписались на данную рассылку. Для подтверждения подписки ответьте на данное электронное письмо.",
                        LEFT_CIRCLE: "Подтвердить ",
                        LEFT_IMG: "/img/community/maillist/mail3.png",
                        INDEX: '03'
                    },
                    RIGHT: {
                        RIGHT_INFO: "На ваш почтовый ящик поступит электронное письмо с сообщением, что вы успешно подписались на данную рассылку.",
                        RIGHT_CIRCLE: "Успешно",
                        LEFT_IMG: "/img/community/maillist/mail4.png",
                        INDEX: '04'
                    }
                },
            ],
            SUBSCRIBE: {
                TITLE: "Summary",
                PART_ONE: "The main contact endpoint of openEuler community",
                PART_TWO: "To contact the list owners, use the following email address: community-owner@openeuler.org",
                PART_THREE: "To see the prior posting to the list, visit the archives.",
                REMIND: "You can also subscribe without creating an account. If you wish to do so, please use the form below.",
                INPUT_ADD: "Your email address",
                INPUT_NAME: "Your name(optional)",
                BUTTON: "Subscribe"
            },
            TABLE: {
                NAME: "Наименование",
                EMAIL_ADDRESS: "Списки рассылок",
                ARCHIVE: "Архив",
                DESCRIPTION: "Описание",
                NAME_H5: "Наименование",
                ARCHIVE_H5: "Архив"
            },
            MAIL_ERROR: "Error in mailing list",
            SUBSCRIBE_ERROR: "Mail subscription error",
            SUBSCRIBE_SUCCESS: "The subscription request has been sent. A subscription confirmation e-mail will be sent to your mailbox later. please replay to the confirmation e-mail as prompted to make the subscription take effect.",
            MAIL_ERROR: "Email error",
            SUBSCRIBE_ALREADY_SUCCESS: 'Member already subscribed',
            SUBSCRIBE_HAS_SENT: 'The subscription confirmation e-mail has been sent to your mailbox. Please replay to the e-mail as prompted to make the subscription take effect. if you do not receive the e-mail, check whether the e-mail is blocked by your e-mail server or classified as spam.'
        },
        CONTRIBUTION_H5: {
            TITLE: "Как принять участие",
            MOBILE_TITLE: "Как принять участие",
            GUIDE_CONTENT: [
                {
                    BUTTON: "Подписать CLA",
                    IMG: "/img/community/contribution/cla.png",
                    VIDEO: "/img/community/contribution/cla.gif",
                    MOBILEIMG:'/img/community/contribution/mobile-img/cla.png',
                    LINK: "https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI="
                },
                {
                    BUTTON: "Отправить вопрос",
                    IMG: "/img/community/contribution/issue.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/issue.png',
                    VIDEO: "/img/community/contribution/issue.gif",
                    LINK: "",
                    LINKADRESSLIST:{
                        TITLE:'Выберите ссылку:',
                        LINKMESSAGE:[
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/wechat.png')",
                                TEXT:'Wechat',
                                LINKADRESS:'/building/'
                            },
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/email.png')",
                                TEXT:'Эл. почта',
                                LINKADRESS:'/building/'
                            },
                            {
                                ICONIMAGE:"url('/img/community/contribution/icon/gitee.png')",
                                TEXT:'Gitee',
                                LINKADRESS:'/building/'
                            }
                        ]
                    }
                },
                {
                    BUTTON: "Включить код в проект",
                    IMG: "/img/community/contribution/contribution.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/contribution.png',
                    VIDEO: "/img/community/contribution/contribution.gif",
                    LINK: "https://gitee.com/openeuler"
                },
                {
                    BUTTON: "Присоединиться к группе SIG",
                    IMG: "/img/community/contribution/sig.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/sig.png',
                    VIDEO: "/img/community/contribution/sig.gif",
                    LINK: "/sig/sig-list/"
                },
                {
                    BUTTON: "Участвовать в выборах в Технический комитет",
                    IMG: "/img/community/contribution/commit.png",
                    MOBILEIMG:'/img/community/contribution/mobile-img/commit.png',
                    VIDEO: "/img/community/contribution/commit.gif",
                    LINK: "/sig/sig-list/sig-detail.html?id=21&name=TC&mail=tc%40openeuler.org"
                },
            ]
        },
        CONTRIBUTION: {
            DOWLOAD_PDF_URL: '/openeuler-trail-chess-en.pdf',
            BACKGROUND_IMG_H5: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%B4%A1%E7%8C%AE%E5%9C%B0%E5%9B%BE/webtrailchess_en_mo.png',
            BACKGROUND_IMG: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%B4%A1%E7%8C%AE%E5%9C%B0%E5%9B%BE/webtrailchess_en.png',
            LOOK_DESC: 'View Details',
            PRINT_MAP: 'Download',
            LINK_LIST: [
                'https://huaweicloud.com/product/ecs.html',
                'https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Virtualization/virtualization.html',
                'https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Installation/installation.html',
                'https://gitee.com/openeuler/raspberrypi',
                '/ru/other/projects/stratovirt/',
                '/ru/other/projects/atune/',
                '/ru/other/projects/isula/',
                '/ru/other/projects/secgear/',
                'https://pkgmanage.openeuler.org/',
                '/ru/other/projects/bishengjdk/',
                'https://compass-ci.openeuler.org/',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=',
                '/ru/#meeting',
                '/ru/interaction/salon-list/',
                '/ru/interaction/live-list/',
                '/ru/interaction/summit-list/devday2022/',
                '/ru/sig/sig-list/',
                '/ru/sig/sig-guidance/',
                'https://gitee.com/openeuler/community/issues',
                '/ru/community/contribution/detail.html#_2-贡献编码',
                '/ru/community/contribution/detail.html#_3-贡献软件包',
                '/ru/community/contribution/detail.html#_4-贡献原创开源项目',
                '/ru/community/contribution/detail.html#_5-检视代码',
                'https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E6%B5%8B%E8%AF%95%E4%BD%93%E7%B3%BB%E4%BB%8B%E7%BB%8D.md',
                'https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md',
                'https://gitee.com/openeuler/community/blob/master/zh/contributors/non-code-contributions.md',
                'https://gitee.com/openeuler/security-committee/blob/master/security-disclosure.md',
                'https://gitee.com/openeuler/community/blob/master/community-membership.md',
                '/ru/sig/sig-list/sig-detail.html?id=21&name=TC&mail=dev%40openeuler.org'
            ]
        },
        CONDUCT: {
            TITLE: "Кодекс поведения"
        },
        SERVICE: {
            TITLE:"сертификаты openEuler",
            DOWN:{
                DPSCRIPT_ONE:"Сертификация openEuler предназначена для ИТ-профессионалов или студентов, интересующихся ОС openEuler, чтобы они могли подтвердить свои способности в разработке, технической поддержке и эксплуатации openEuler.",
                GET_CARD:"Сдавать экзамены",
                GET_CARD_DISC:"openEuler-HCIA, openEuler-HCIP и openEuler-HCIE являются сертификатами, доказывающими возможности различных уровней, признанными сообществом openEuler. Если вы заинтересованы в получении сертификата, щелкните по следующим пунктам, чтобы зарегистрироваться для прохождения обучения и сертификационного экзамена.",
                NOT_CARDURL:"Скоро",
                OUTLINE_DOWN_TIP:"Проверочный код был отправлен на вашу электронную почту. Введите проверочный код для получения сертификата.",
                CARD_MODEL:[
                    {
                        DISC:"openEuler-HCIA",
                        NAME:"Сертифицированный инженер",
                        IMG:"/img/community/conduct/hcia-icon.png",
                        NEXT_URL:"https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&amp;authenticationLevel=CTYPE_CARE_HCIA&amp;technicalField=PSC&amp;version=1.0",
                    },
                    {
                        DISC:"openEuler-HCIP",
                        NAME:"Сертифицированный старший инженер",
                        IMG:"/img/community/conduct/hcip-icon.png",
                        NEXT_URL:""
                    },
                    {
                        DISC:"openEuler-HCIE",
                        NAME:"Сертифицированный эксперт",
                        IMG:"/img/community/conduct/hcie-icon.png",
                        NEXT_URL:""
                    },
                ],
                DOWN_CARD:"Загрузить сертификаты",
                DOWN_CHOOSE_CARD:"Загрузить выбранные сертификаты",
                DOWN_CARD_DISC:"Нажмите и загрузите сертификат после сдачи экзамена.",
                SEARCH_RESULTS:"Ниже приведена информация о ваших сертификатах:",
                NO_CARD:"Нет сертификата, доступного для загрузки.",
                DOWN_FAIL_DISC_LEFT:"Срок действия ссылки на загрузку истек. Нажмите Загрузить сертификаты ",
                DOWN_FAIL_DISC_RIGHT:" чтобы получить новую ссылку.",
                DOWNCREDENT:[{
                    NAME:"Загрузить сертификаты",
                    IMG:"/img/community/conduct/down-card-icon.png",
                }]
            },
            SEARCH:{
                SEARCH:"Запросить сертификаты",
                SEARCH_DISC:"Введите адрес электронной почты, используемый при проведении сертификационного экзамена, для получения проверочного кода и запроса сертификата.",
                SEND_CODE:"Отправить проверочный код",
                SEND_AGAIN:"Отправить заново",
                EMAIL_ERROR:"Неверный адрес электронной почты.",
                EMAIL_PLAHD:"Ваш адрес электронной почты",
                CODE_PLAHD:"Введите проверочный код.",
                CODE_ERROR:"Неверный проверочный код.",
                SHOW_TEMPLATE:"/img/community/conduct/showtemplate.png"
            },
            BTNSURE:"Подтвердить"
        }
    }
};