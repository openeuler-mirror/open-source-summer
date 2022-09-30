/**
 * @file  下载模块国际化配置入口
 * */

 module.exports = {
    cn: {
        TITLE: 'OSV技术测评列表',
        SUMMARY: {
            TITLE: 'OSV技术测评简介',
            CONTENT: '工具聚焦openEuler内核和基础包，检测伙伴二次发行版生态核心特性不丢失，关键配置不更改 结合社区选包策略及软件包等级策略，检查L1、L2软件包版本、打包方式、接口一致性，KABI白名单，架构特性（如ARM/X86特性）使能，性能优化配置，牵引实现扩展仓库openEuler系共享、共用，主流行业应用在openEuler系不同的OSV生态复用度。'
        },
        TO_STEP:{
            TEXT_1:'关于OSV技术测评，openEuler提供了完整的测试流程和工具，详见',
            LINK_1:' openEuler OSV技术测评整体介绍'
        },
        STEP_HEAD: 'openEuler OSV技术测评整体介绍',
        STEP_TITLE: 'OSV技术测评步骤',
        STEP_CONTENT: [
                {
                    ID:'01',
                    TITLE:'申请加入openEuler社区',
                    TEXT_1:'您需要在Gitee平台申请加入openEuler社区，成为组织成员。申请地址：',
                    LINK_1:'https://github.com/GeorgeCao-hw/georgedoc/blob/master/openEuler-Infra-FAQ.md'
                },
                {
                    ID:'02',
                    TITLE:'了解OSV技术测评策略',
                    TEXT_1:'开展OSV技术测评之前，您需要了解OSV技术测评策略，测评标准，以及使用OSV技术测评工具进行自验证。地址如下：',
                    LINK_1:'https://gitee.com/openeuler/oecp'
                },
                {
                    ID:'03',
                    TITLE:'申请OSV技术测评',
                    TEXT_1:'您需要向公共邮箱（ ',
                    LINK_1:'oecompatibility@openeuler.org',
                    TEXT_2:'）发送OSV技术测评申请，邮件标题需要注明“申请OSV技术测评”。收到邮件后，openEuler团队中sig组会与您沟通进行协议签署，如果已经签署，请忽略。',
                    TEXT_3:'tips：如果没有签署CLA，请先签署：',
                    LINK_2:'https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI='
                },
                {
                    ID:'04',
                    TITLE:'提交OSV技术测评申请issue',
                    TEXT_1:'完成协议签署后，您需要在openEuler社区（',
                    LINK_1:'https://gitee.com/openeuler/oecp/issues',
                    TEXT_2:'）的OSV技术测评项目下创建issue，将所需要测评的操作系统信息在issue中明确，以及ISO镜像地址。openEuler团队会及时了解issue的信息，并提出建议。'
                },
                {
                    ID:'05',
                    TITLE:'OSV技术测评',
                    TEXT_1:'openEuler社区会第一时间对提供的ISO进行OSV技术测评，测评之后会联系您进行部分结果确认以及审核，之后，会将测评结果发布到 ',
                    LINK_TEXT:'openEuler官网',
                    LINK_1:'https://www.openeuler.org/zh/',
                    TEXT_2:' 上。',
                },
                {
                    ID:'06',
                    TITLE:'OSV技术测评结果发布',
                    TEXT_1:'openEuler团队会针对提交结果进行审核，如果通过，会将OSV技术测评结果添加到OSV技术测评列表中。',
                },
        ],
        TABLE_TITLE: 'OSV技术测评结果',
        SELECT_PLACEHOLDER: '请选择',
        SELECT_COMPANY: 'OS厂商',
        SELECT_TYPE: '分类',
        SELECT_ALL: '全部',
        SEARCH_PLACEHOLDER: 'OS厂商、OS版本、分类',
        SEARCH_TEXT: '搜索',
        TABLE_COLUMN: {
            ARCHITECTURE: '架构',
            COMPANY: 'OS厂商',
            VERSION: 'OS版本',
            DOWNLOAD: 'OS下载地址',
            TYPE: '分类',
            DATE: '测评日期',
            DETAILS: '测评详情',
            LINK: '友情链接',
            REPORT: '查看报告'
        },
        SUBTITLE_REPORT:'OSV技术测评报告',
        ADOPT:'通过',
        FAIL:'不通过',
        ASSESS_LIST:{
            ASSESS_INFO:'评估信息',
            OSV:'系统版本',
            ARCHITECTURE: '架构',
            PUBLISH_ADDRESS:'发布地址',
            CHECKSUM:'checksum',
            OPENEULER_EDITION:'基于openEuler的版本',
            COMPATIBLE:'COMPATIBLE'
        },
        TOOL_LIST:{
            TOOL_DETECT:'工具检测',
            TEST_ITEM:'检测项',
            DETECTION_DESC:'检测点描述',
            TEST_RESULT:'测试结果',
            CONCLUSION:'结论'
        },
        PLATFORM_DESCRIBE:{
            REPO:'EPOL仓/软件所仓库在OSV版本上安装成功比例',
            BASE:'社区AT用例运行结果',
            PERFORMANCE:'基础性能测试结果',
            RUNNING:'OSV版本运行时默认配置一致性'
        },
        TOOL_DESCRIBE:{
            CORE_PKG:'核心包一致性比例',
            SOFT_PKG:'L1/L2 软件包一致性比例',
            KABI:'OSV内核KABI接口白名单与openEuler内核KABI接口白名单一致性比例',
            ABI:'OSV软件包ABI接口与openEuler软件包ABI一致性比例',
            SERVICE:'OSV软件包Service文件与openEuler软件包Service文件一致性比例',
            SOFT_CONFIG:'OSV软件包配置文件与openEuler软件包配置文件一致性比例',
            KARNEL_CONFIG:'OSV的内核配置与openEuler一致性比例'
        },
        TOOL_NAME:{
            CORE_PKG:'核心包',
            SOFT_PKG:'软件包',
            KABI:'内核KABI接口',
            ABI:'用户态ABI接口',
            SERVICE:'Service默认配置',
            SOFT_CONFIG:'软件包默认配置',
            KARNEL_CONFIG:'内核特性配置'
        },
        PLATFORM_NAME:{
            REPO:'仓库',
            BASE:'基本功能',
            PERFORMANCE:'基础性能',
            RUNNING:'运行时默认配置'
        },
        PLATFORM_LIST:{
            PLATFORM_VERIFY:'平台验证'
        },
    },
};