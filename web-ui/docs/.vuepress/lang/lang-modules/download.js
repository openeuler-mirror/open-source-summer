/**
 * @file  下载模块国际化配置入口
 * */

module.exports = {
    cn: {
        RELEASE_DESC: '发行说明',
        SERVER_IMAGE:'服务器镜像',
        CLOUD_IMAGE:'云镜像',
        EDGE_IMAGE:'边缘镜像',
        EMBEDDEN_IMAGE:'嵌入式镜像',
        INSTALL_GUIDENCE: '安装指南',
        SEEK_HELP: '提问求助',
        GET_ISO: '获取 ISO',
        LIFE_CYCLE: '生命周期',
        DOWNLOAD_BTN_NAME: '下载',
        OUTSIDE_TITLE:'ISO',
        MANUFACTURER: '厂商',
        PUBLISH_DATE: '发行时间',
        WHITE_PAPER: '白皮书',
        WEBSITE_SELECT: '站点选择',
        COPY_SUCCESSFULLY: '复制成功！',
        DOWNLOAD_LIST : require('././../../data/download').cn.DOWNLOAD_LIST,
        MIRROR_SELECT: {
            TITLE: '优选镜像',
            RANK: 'Rank：',
            NAME: 'Mirror Name：',
            URL: 'URL：',
            COUNTRY: 'Area：',
            CONTINENT: 'Continent：',
            DISTANCE: 'Distance(KM)：',
            CONTENT: ['You are connecting from IP address: ',', which belongs to ','. We believe you are somewhere in ',' and have selected the applicable mirrors.']
        },
        MIRROR_ALL: {
            TITLE: '镜像仓列表',
            NAME: 'Mirror Name：',
            LOCATION: 'Location：',
            SPONSOR: 'Sponsor：',
            HTTPS: 'Http(s)：',
            RSNC: 'RSYNC：',
            FTP: 'FTP：',
            Mbs: 'NetworkBandwidth(Mb/s)：',
            TIME: 'Last Sync time：',
            CONTENT: ['openEuler welcomes new mirror sites. If you are considering to set up a public mirror site for openEuler, please follow the mirror guidelines to make sure that your mirror is consistent with the other mirror sites. Any questions, feel free to','contact us']
        }
    },
    en: {
        RELEASE_DESC: 'Release Description',
        SERVER_IMAGE:'Server Image',
        CLOUD_IMAGE:'Cloud Image',
        EDGE_IMAGE:'Edeg Image',
        EMBEDDEN_IMAGE:'Embedded Image',
        INSTALL_GUIDENCE: 'Installation Guide',
        SEEK_HELP: 'Seek Help',
        GET_ISO: 'Get Iso',
        LIFE_CYCLE: 'Lifecycle',
        DOWNLOAD_BTN_NAME: 'Download',
        OUTSIDE_TITLE:'ISO',
        MANUFACTURER: 'Manufacturer',
        WHITE_PAPER: 'White Paper',
        PUBLISH_DATE: 'Date of Release',
        WEBSITE_SELECT: 'Select Mirror',
        COPY_SUCCESSFULLY: 'copied successfully.',
        DOWNLOAD_LIST : require('././../../data/download').en.DOWNLOAD_LIST,
        MIRROR_SELECT: {
            TITLE: 'Selected Mirrors',
            RANK: 'Rank：',
            NAME: 'Mirror Name：',
            URL: 'URL：',
            COUNTRY: 'Area：',
            CONTINENT: 'Continent：',
            DISTANCE: 'Distance(KM)：',
            CONTENT: ['You are connecting from IP address: ',', which belongs to ','. We believe you are somewhere in ',' and have selected the applicable mirrors.']
        },
        MIRROR_ALL: {
            TITLE: 'Mirrors',
            NAME: 'Mirror Name：',
            LOCATION: 'Location：',
            SPONSOR: 'Sponsor：',
            HTTPS: 'Http(s)：',
            RSNC: 'RSYNC：',
            FTP: 'FTP：',
            Mbs: 'NetworkBandwidth(Mb/s)：',
            TIME: 'Last Sync time：',
            CONTENT: ['openEuler welcomes new mirror sites. If you are considering to set up a public mirror site for openEuler, please follow the mirror guidelines to make sure that your mirror is consistent with the other mirror sites. Any questions, feel free to','contact us']
        }
    },
    ru: {
        RELEASE_DESC: 'Описание релиза',
        INSTALL_GUIDENCE: 'Руководство по установке',
        SEEK_HELP: 'Справка',
        GET_ISO: 'Получить ISO',
        LIFE_CYCLE: 'Жизненный цикл',
        DOWNLOAD_BTN_NAME: 'Загрузить',
        OUTSIDE_TITLE:'ISO',
        MANUFACTURER: 'Поставщик',
        WHITE_PAPER: 'информационный документ',
        PUBLISH_DATE: 'Дата выпуска релиза  ',
        WEBSITE_SELECT: 'Select Mirror',
        COPY_SUCCESSFULLY: 'copied successfully.',
        DOWNLOAD_LIST : require('././../../data/download').ru.DOWNLOAD_LIST,
        MIRROR_SELECT: {
            TITLE: 'Selected Mirrors',
            RANK: 'Rank：',
            NAME: 'Mirror Name：',
            URL: 'URL：',
            COUNTRY: 'Area：',
            CONTINENT: 'Continent：',
            DISTANCE: 'Distance(KM)：',
            CONTENT: ['You are connecting from IP address: ',', which belongs to ','. We believe you are somewhere in ',' and have selected the applicable mirrors.']
        },
        MIRROR_ALL: {
            TITLE: 'Mirrors Lists',
            NAME: 'Mirror Name：',
            LOCATION: 'Location：',
            SPONSOR: 'Sponsor：',
            HTTPS: 'Http(s)：',
            RSNC: 'RSYNC：',
            FTP: 'FTP：',
            Mbs: 'NetworkBandwidth(Mb/s)：',
            TIME: 'Last Sync time：',
            CONTENT: ['openEuler welcomes new mirror sites. If you are considering to set up a public mirror site for openEuler, please follow the mirror guidelines to make sure that your mirror is consistent with the other mirror sites. Any questions, feel free to','contact us']
        }
    }
};