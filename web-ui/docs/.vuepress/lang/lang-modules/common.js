/**
 * @file  公共模块国际化配置入口
 * */

module.exports = {
    cn: {
        MEETINGS_TIME: '会议时间：',
        MEETINGS_REPLAY: '回放链接',
        SEARCH_PLACE_HOLDER: '输入内容',
        COOKIE_LEGAL_TEXT: '本站点使用Cookies，继续浏览表示您同意我们使用Cookies。',
        COOKIE_LEGAL_LINK_TEXT: 'Cookies和隐私政策>',
        NAV_ROUTER_CONFIG: [{
                PATH: '',
                NAME: '下载',
                CHILDREN: [
                    {
                        NAME: 'ISO',
                        PATH: '/download/'
                    },
                    {
                        NAME: '镜像仓列表',
                        PATH: '/mirror/list/'
                    }
                ],
                CLASS: []
            },
            {
                NAME: '学习',
                CHILDREN: [
                    {
                        NAME: '文档',
                        PATH: '/zh/',
                        IS_OPEN_WINDOW: 1
                    },
                    {
                        NAME: '慕课',
                        PATH: '/learn/mooc/'
                    },
                    {
                        NAME: '实习',
                        PATH: '/internship/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '互动',
                CHILDREN: [{
                        NAME: '新闻',
                        PATH: '/interaction/news-list/'
                    },
                    {
                        NAME: '博客',
                        PATH: '/interaction/blog-list/'
                    },
                    {
                        NAME: '直播',
                        PATH: '/interaction/live-list/'
                    },
                    {
                        NAME: '沙龙',
                        PATH: '/interaction/salon-list/'
                    },
                    {
                        NAME: '峰会',
                        PATH: '/interaction/summit-list/devday2022/'
                    }
                ],
                OTHER_CHILDREN: [
                    {
                        PATH: '/news/'
                    },
                    {
                        PATH: '/blog/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '社区',
                CHILDREN: [{
                        NAME: '贡献攻略',
                        PATH: '/community/contribution/'
                    },
                    {
                        NAME: '行为守则',
                        PATH: '/community/conduct/'
                    },
                    {
                        NAME: '邮件列表',
                        PATH: '/community/mailing-list/'
                    },
                    {
                        NAME: '个人认证',
                        PATH: '/community/certification-services/'
                    },
                    {
                        NAME: '贡献看板',
                        PATH: 'https://datastat.openeuler.org/zh/overview',
                        IS_OPEN_MINISITE_WINDOW: 1
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'SIG',
                CHILDREN: [{
                        NAME: '查看SIG',
                        PATH: '/sig/sig-list/'
                    },
                    {
                        NAME: '申请流程',
                        PATH: '/sig/sig-guidance/'
                    },
                    {
                        NAME: '角色说明',
                        PATH: '/sig/role-description/'
                    },
                    {
                        NAME: '会议指南',
                        PATH: '/sig/meeting-guide/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '探索',
                CHILDREN: [{
                        NAME: 'A-Tune',
                        PATH: '/other/projects/atune'
                    },
                    {
                        NAME: 'BiSheng JDK',
                        PATH: '/other/projects/bishengjdk'
                    },
                    {
                        NAME: 'iSula',
                        PATH: '/other/projects/isula'
                    },
                    {
                        NAME: 'secGear',
                        PATH: '/other/projects/secgear'
                    },
                    {
                        NAME: 'StratoVirt',
                        PATH: '/other/projects/stratovirt'
                    },
                    {
                        NAME: 'Compass-CI',
                        PATH: 'https://compass-ci.openeuler.org/',
                        IS_OPEN_MINISITE_WINDOW: 1
                    },
                    {
                        NAME: 'Compliance',
                        PATH: 'https://compliance.openeuler.org/',
                        IS_OPEN_MINISITE_WINDOW: 1
                    },
                    {
                        NAME: 'Pkgship',
                        PATH: 'https://pkgmanage.openeuler.org/',
                        IS_OPEN_MINISITE_WINDOW: 1
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '支持',
                CHILDREN: [{
                        NAME: '漏洞管理',
                        PATH: '/security/vulnerability-reporting/'
                    },
                    {
                        NAME: '安全公告',
                        PATH: '/security/safety-bulletin/'
                    },
                    {
                        NAME: 'CVE',
                        PATH: '/security/cve/'
                    },
                    {
                        NAME: 'OSV技术测评',
                        PATH: '/approve/'
                    },
                    {
                        NAME: '兼容性技术测评',
                        PATH: 'https://certification.openeuler.org/',
                        IS_OPEN_MINISITE_WINDOW: 1
                    },
                    {
                        NAME: '兼容性列表',
                        PATH: '/compatibility/'
                    },
                    {
                        NAME: '迁移指南',
                        PATH: '/other/migration/'
                    }
                ],
                CLASS: []
            }
        ],
        LANG: '中文',
        LANG_LIST: ['中文','English','Русский'],
        GITTE: '源码',
        CODE: '代码',
        GITTE_RESOURCE_LIST: [{
                NAME: '代码仓',
                URL: 'https://gitee.com/openeuler'
            },
            {
                NAME: '软件包仓',
                URL: 'https://gitee.com/src-openeuler'
            },
            {
                NAME: 'GitHub镜像仓',
                URL: 'https://github.com/openeuler-mirror'
            }
        ],
        FOOTER: {
            ATOM_TEXT:'openEuler 是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源项目',
            ATOM_PC:'/atom-pc.png',
            ATOM_MO:'/atom-mo.png',
            MAIL: 'contact@openeuler.io',
            COPY_RIGHT: '版权所有 © 2022 openEuler 保留一切权利',
            RIGHT_LIST: [{
                    NAME: '品牌',
                    URL: '/other/brand/'
                },
                {
                    NAME: '隐私政策',
                    URL: '/other/privacy/'
                },
                {
                    NAME: '法律声明',
                    URL: '/other/legal/'
                },
                {
                    NAME: '服务状态',
                    URL: 'https://status.openeuler.org/'
                },
            ],
            QR_CODE: '扫码关注公众号'
        },
        BUILDING:{
            BUILDING:'建设中',
            BUILDINGMES:'敬请期待...'
        }
    },
    en: {
        MEETINGS_TIME: 'Time: ',
        MEETINGS_REPLAY: 'Replay',
        SEARCH_PLACE_HOLDER: 'Input content',
        COOKIE_LEGAL_TEXT: 'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.',
        COOKIE_LEGAL_LINK_TEXT: 'Read our privacy policy>',
        NAV_ROUTER_CONFIG: [{
                PATH: '',
                NAME: 'Download',
                CHILDREN: [
                    {
                        NAME: 'Software Packages',
                        PATH: '/download/'
                    },
                    {
                        NAME: 'Mirrors',
                        PATH: '/mirror/list/'
                    }
                ],
                CLASS: []
            },
            {
                NAME: 'Learning',
                CHILDREN: [
                    {
                        NAME: 'Documentation',
                        PATH: '/en/',
                        IS_OPEN_WINDOW: 1
                    },
                    {
                        NAME: 'MOOC',
                        PATH: '/learn/mooc/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Connect',
                CHILDREN: [{
                        NAME: 'News',
                        PATH: '/interaction/news-list/'
                    },
                    {
                        NAME: 'Blog',
                        PATH: '/interaction/blog-list/'
                    },
                    {
                        NAME: 'Live',
                        PATH: '/interaction/live-list/'
                    },
                    {
                        NAME: 'Meetups',
                        PATH: '/interaction/salon-list/'
                    },
                    {
                        NAME: 'Summit',
                        PATH: '/interaction/summit-list/devday2022/'
                    }
                ],
                OTHER_CHILDREN: [
                    {
                        PATH: '/news/'
                    },
                    {
                        PATH: '/blog/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Community',
                CHILDREN: [{
                        NAME: 'Contribution',
                        PATH: '/community/contribution/'
                    },
                    {
                        NAME: 'Convention',
                        PATH: '/community/conduct/'
                    },
                    {
                        NAME: 'Mailing Lists',
                        PATH: '/community/mailing-list/'
                    },
                    {
                        NAME: 'Certification',
                        PATH: '/community/certification-services/'
                    },
                    {
                        NAME: 'Statistics',
                        PATH: 'https://datastat.openeuler.org/en/overview',
                        IS_OPEN_MINISITE_WINDOW: 1
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'SIG',
                CHILDREN: [{
                        NAME: 'SIG Lists',
                        PATH: '/sig/sig-list/'
                    },
                    {
                        NAME: 'Application',
                        PATH: '/sig/sig-guidance/'
                    },
                    {
                        NAME: 'Roles',
                        PATH: '/sig/role-description/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Discovery',
                CHILDREN: [{
                        NAME: 'A-Tune',
                        PATH: '/other/projects/atune'
                    },
                    {
                        NAME: 'BiSheng JDK',
                        PATH: '/other/projects/bishengjdk'
                    },
                    {
                        NAME: 'iSula',
                        PATH: '/other/projects/isula'
                    },
                    {
                        NAME: 'secGear',
                        PATH: '/other/projects/secgear'
                    },
                    {
                        NAME: 'StratoVirt',
                        PATH: '/other/projects/stratovirt'
                    },
                    {
                        NAME: 'Compass-CI',
                        PATH: 'https://compass-ci.openeuler.org/',
                        IS_OPEN_MINISITE_WINDOW: 1
                    },
                    {
                        NAME: 'Compliance',
                        PATH: 'https://compliance.openeuler.org/',
                        IS_OPEN_MINISITE_WINDOW: 1
                    },
                    {
                        NAME: 'Pkgship',
                        PATH: 'https://pkgmanage.openeuler.org/',
                        IS_OPEN_MINISITE_WINDOW: 1
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Support',
                CHILDREN: [{
                        NAME: 'Vulnerability Management',
                        PATH: '/security/vulnerability-reporting/'
                    },
                    {
                        NAME: 'Security Advisories',
                        PATH: '/security/safety-bulletin/'
                    },
                    {
                        NAME: 'CVE',
                        PATH: '/security/cve/'
                    },
                    {
                        NAME: 'Compatibility List',
                        PATH: '/compatibility/'
                    },
                ],
                CLASS: []
            }
        ],
        LANG: 'English',
        LANG_LIST: ['中文','English','Русский'],
        GITTE: 'Source code',
        CODE: 'CODE',
        GITTE_RESOURCE_LIST: [{
                NAME: 'Code Sources',
                URL: 'https://gitee.com/openeuler'
            },
            {
                NAME: 'Package Sources',
                URL: 'https://gitee.com/src-openeuler'
            },
            {
                NAME: 'GitHub Mirror',
                URL: 'https://github.com/openeuler-mirror'
            }
        ],
        FOOTER: {
            ATOM_TEXT:'openEuler is an open source project incubated and operated by the OpenAtom Foundation.',
            ATOM_PC:'/atom-pc.png',
            ATOM_MO:'/atom-mo.png',
            MAIL: 'contact@openeuler.io',
            COPY_RIGHT: 'Copyright © 2022 openEuler. All rights reserved.',
            RIGHT_LIST: [{
                    NAME: 'Trademark',
                    URL: '/other/brand/'
                },
                {
                    NAME: 'Privacy Policy',
                    URL: '/other/privacy/'
                },
                {
                    NAME: 'Legal Notice',
                    URL: '/other/legal/'
                },
                {
                    NAME: 'Service Status',
                    URL: 'https://status.openeuler.org/'
                }
            ],
            QR_CODE: 'WeChat Subscription'
        },
        BUILDING:{
            BUILDING:'Building',
            BUILDINGMES:'Coming soon…'
        }
    },
    ru: {
        MEETINGS_TIME: 'Time: ',
        MEETINGS_REPLAY: 'Воспроизведение',
        SEARCH_PLACE_HOLDER: 'Введите текст',
        COOKIE_LEGAL_TEXT: 'Продолжая просмотр сайта и(или) нажимая X, я соглашаюсь с использованием файлов cookie владельцем сайта в соответствии с ',
        COOKIE_LEGAL_TEXT_OTHER: 'в том числе на передачу данных, указанных в Политике, третьим лицам (статистическим службам сети Интернет), в соответствии с ',
        COOKIE_LEGAL_LINK_TEXT: 'Политикой в отношении файлов cookie ',
        COOKIE_LEGAL_LINK_TEXT_OTHER: 'Пользовательским соглашением >',
        NAV_ROUTER_CONFIG: [{
                PATH: '',
                NAME: 'Загрузить',
                CHILDREN: [
                    {
                        NAME: 'Software Packages',
                        PATH: '/download/'
                    },
                    {
                        NAME: 'Mirrors',
                        PATH: '/mirror/list/'
                    }
                ],
                CLASS: []
            },
            {
                NAME: 'Обучение',
                CHILDREN: [
                    {
                        NAME: 'Документация',
                        PATH: '/ru/',
                        IS_OPEN_WINDOW: 1
                    },
                    {
                        NAME: 'МООК',
                        PATH: '/learn/mooc/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Подключиться',
                CHILDREN: [{
                        NAME: 'Новости',
                        PATH: '/interaction/news-list/'
                    },
                    {
                        NAME: 'Блог',
                        PATH: '/interaction/blog-list/'
                    },
                    {
                        NAME: 'Прямой эфир',
                        PATH: '/interaction/live-list/'
                    },
                    {
                        NAME: 'Семинары',
                        PATH: '/interaction/salon-list/'
                    },
                    {
                        NAME: 'Саммит',
                        PATH: '/interaction/summit-list/devday2022/'
                    }
                ],
                OTHER_CHILDREN: [
                    {
                        PATH: '/news/'
                    },
                    {
                        PATH: '/blog/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Сообщество',
                CHILDREN: [
                    {
                        NAME: 'Кодекс',
                        PATH: '/community/conduct/'
                    },
                    {
                        NAME: 'Сертификация',
                        PATH: '/community/certification-services/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'SIG',
                CHILDREN: [{
                        NAME: 'Списки SIG',
                        PATH: '/sig/sig-list/'
                    },
                    {
                        NAME: 'Заявка',
                        PATH: '/sig/sig-guidance/'
                    },
                    {
                        NAME: 'Роли',
                        PATH: '/sig/role-description/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Открытие',
                CHILDREN: [{
                        NAME: 'A-Tune',
                        PATH: '/other/projects/atune'
                    },
                    {
                        NAME: 'BiSheng JDK',
                        PATH: '/other/projects/bishengjdk'
                    },
                    {
                        NAME: 'iSula',
                        PATH: '/other/projects/isula'
                    },
                    {
                        NAME: 'secGear',
                        PATH: '/other/projects/secgear'
                    },
                    {
                        NAME: 'StratoVirt',
                        PATH: '/other/projects/stratovirt'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Поддержка',
                CHILDREN: [{
                        NAME: 'Управление уязвимостями',
                        PATH: '/security/vulnerability-reporting/'
                    },
                    {
                        NAME: 'Консультанты по безопасности',
                        PATH: '/security/safety-bulletin/'
                    },
                    {
                        NAME: 'CVE',
                        PATH: '/security/cve/'
                    },
                    {
                        NAME: 'Список совместимости',
                        PATH: '/compatibility/'
                    },
                ],
                CLASS: []
            }
        ],
        LANG: 'Русский',
        LANG_LIST: ['中文','English','Русский'],
        GITTE: 'Source code',
        CODE: 'Код',
        GITTE_RESOURCE_LIST: [{
                NAME: 'Источники кода',
                URL: 'https://gitee.com/openeuler'
            },
            {
                NAME: 'Источники пакетов',
                URL: 'https://gitee.com/src-openeuler'
            },
            {
                NAME: 'Зеркало GitHub',
                URL: 'https://github.com/openeuler-mirror'
            }
        ],
        FOOTER: {
            ATOM_TEXT:'openEuler - это проект с открытым исходным кодом, созданный и управляемый фондом OpenAtom.',
            ATOM_PC:'/atom-pc.png',
            ATOM_MO:'/atom-mo.png',
            MAIL: 'contact@openeuler.io',
            COPY_RIGHT: 'Авторские права © openEuler 2022. Все права защищены.',
            RIGHT_LIST: [{
                    NAME: 'Товарный знак',
                    URL: '/other/brand/'
                },
                {
                    NAME: 'Политика конфиденциальности',
                    URL: '/other/privacy/'
                },
                {
                    NAME: 'Правовое уведомление',
                    URL: '/other/legal/'
                },
                {
                    NAME: 'Статус сервиса',
                    URL: 'https://status.openeuler.org/'
                }
            ],
            QR_CODE: 'Подписка на WeChat'
        },
        BUILDING:{
            BUILDING:'Создание',
            BUILDINGMES:'Ожидается...'
        }
    }
};