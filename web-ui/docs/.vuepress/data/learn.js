/**
 * @file  资料组维护数据文件
 * */

 module.exports = {
    cn: {
        COURSE_LIST: [
            {
                ID: 1,
                COURSE_H1: 'HCIA-openEuler 认证培训课程',
                NAV_DATA: [
                    {
                        label: '课程导读',
                        key: 'introduction0',
                        introduction: [
                            '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                            'OpenEuler是一个开源免费的Linux发行版系统，通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。openEuler同时是一个创新的系统，倡导客户在系统上提出创新想法、开拓新思路、实践新方案。',
                            'HCIA-openEuler华为认证openEuler工程师在线课程定位于培养和认证具备企业数据中心核心操作系统基础操作与管理能力的工程师。',
                            '通过HCIA-OpenEuler V1.0 认证，您将掌握openEuler操作系统基础命令，掌握openEuler用户管理、网络管理、权限管理，掌握shell基础知识；具备企业数据中心核心操作系统基础操作与管理能力；能够胜任Linux系统运维工程师等岗位。',
                            '本次课程我们首先需要系统地了解openEuler是什么，对openEuler进行初步的了解。',
                            '然后会依次学习并了解：',
                            '1、操作系统发展史',
                            '2、openEuler基础命令如目录操作、文件查看等',
                            '3、vi与vim文本编辑器',
                            '4、openEuler用户、用户组与权限管理',
                            '5、openEuler操作系统应用软件安装',
                            '6、openEuler存储空间管理',
                            '7、openEuler系统计划任务、网络与服务管理',
                            '8、shell脚本基础',
                            '9、Samba文件共享服务器'
                        ],
                        teacher: [
                            {
                                img: '/img/learn/hcia/yanglei.png',
                                position: '华为认证高级讲师',
                                name: '杨磊'
                            },
                            {
                                img: '/img/learn/hcia/zhongyunan.png',
                                position: '华为认证高级讲师',
                                name: '钟育楠'
                            }
                        ]
                    },
                    {
                        label: '1 openEuler操作系统入门',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction1',
                                introduction: [
                                    '本章《openEuler操作系统入门》作为课程的第一章，将帮助大家快速了解什么是openEuler。本章课程主要介绍了GNU自由软件基金会、Linux起源、openEuler操作系统以及它们之间的关系，并且演示了如何安装openEuler操作系统，以及如何登录使用openEuler操作系统。',
                                    '以理论加实验的方式，更加生动地引领大家进入openEuler之旅。',
                                    '本章主要内容包括：',
                                    '1、Linux介绍',
                                    '2、openEuler安装',
                                    '3、openEuler入门级操作'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx'
                            },
                            {
                                label: '1.1 Linux介绍',
                                key: '1.1 Linux介绍',
                                desc: '这一单元我们主要介绍Linux操作系统的入门知识。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.1%2Blinux%E4%BB%8B%E7%BB%8D.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            },
                            {
                                label: '1.2 openEuler安装',
                                key: '1.2 openEuler安装',
                                desc: '这一单元我们主要介绍如何安装openEuler。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.2%2BopenEuler%E5%AE%89%E8%A3%85.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            },
                            {
                                label: '1.3 openEuler入门级操作',
                                key: '1.3 openEuler入门级操作',
                                desc: '这一单元我们主要介绍如何使用openEuler操作系统。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.3%2BopenEuler%E5%85%A5%E9%97%A8%E7%BA%A7%E6%93%8D%E4%BD%9C.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            }
                        ]
                    },
                    {
                        label: '2 命令行操作基础',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction2',
                                introduction: [
                                    '本章我们主要介绍命令行的一些基础操作，包括入门级命令行代码，以及如何使用命令行管理文件。',
                                    '我们的课程分为理论和实验两部分，理论部分介绍命令行，实验部分加深印象。通过本章的学习，希望大家可以掌握Linux命令的基础知识、Linux系统登录命令、系统电源管理命令、系统帮助命令和文件管理命令。',
                                    '本章主要内容包括：',
                                    '1、Linux命令基础知识。',
                                    '2、Linux系统中的目录操作、文件操作和文件查看操作。',
                                    '3、文件的分页查看操作和查找操作。',
                                    '4、文件的压缩和打包操作。'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                            },
                            {
                                label: '2.1 Linux命令行基础',
                                key: '2.1 Linux命令行基础',
                                desc: '这一单元我们主要介绍Linux命令行操作基础，包括命令行入门和使用命令行管理文件。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.1%20Linux%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E7%A1%80%E3%80%81%E7%99%BB%E5%BD%95%E5%92%8C%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%E4%BB%A5%E5%8F%8A%E4%B8%BB%E8%A6%81%E7%9B%AE%E5%BD%95%E7%9A%84%E7%94%A8%E9%80%94/2.1%20Linux%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E7%A1%80%E3%80%81%E7%99%BB%E5%BD%95%E5%92%8C%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%E4%BB%A5%E5%8F%8A%E4%B8%BB%E8%A6%81%E7%9B%AE%E5%BD%95%E7%9A%84%E7%94%A8%E9%80%94.mp4'
                            },
                            {
                                label: '2.2 目录操作、文件操作和查看操作',
                                key: '2.2 目录操作、文件操作和查看操作',
                                desc: '这一单元我们主要介绍Linux系统中的目录操作、文件操作、和文件查看操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.2%20%E7%9B%AE%E5%BD%95%E6%93%8D%E4%BD%9C%E3%80%81%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C/2.2%20%E7%9B%AE%E5%BD%95%E6%93%8D%E4%BD%9C%E3%80%81%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C.mp4'
                            },
                            {
                                label: '2.3 分页查看操作和查找操作',
                                key: '2.3 分页查看操作和查找操作',
                                desc: '这一单元我们主要介绍文件的分页查看操作和查找操作。 ',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.3%20%E5%88%86%E9%A1%B5%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E6%89%BE%E6%93%8D%E4%BD%9C/2.3%20%E5%88%86%E9%A1%B5%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E6%89%BE%E6%93%8D%E4%BD%9C.mp4'
                            },
                            {
                                label: '2.4 压缩和打包操作',
                                key: '2.4 压缩和打包操作',
                                desc: '这一单元我们主要介绍文件的压缩和打包操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.4%20%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%89%93%E5%8C%85%E6%93%8D%E4%BD%9C/2.4%20%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%89%93%E5%8C%85%E6%93%8D%E4%BD%9C.mp4'
                            }
                        ]
                    },
                    {
                        label: '3 文本编辑器及文本处理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction3',
                                introduction: [
                                    '本章课程我们将了解Linux系统中常见的文本编辑器，以及对应的文本处理方式，常见的文本编辑器包括Emacs、nano、gedit、vi和vim等等，本章我们将重点介绍vi和vim编辑器，以及它们的三种主要模式。通过本章的学习，希望大家可以掌握vim文本编辑器的常用操作，包括如何使用vim打开文件、修改文件、保存文件，以及vim文本编辑器的常用快捷操作等等。',
                                    '本章我们依然分理论和实验两部分进行讲解。理论部分我们主要讲解Linux文本编辑器的作用、架构、原理和流程。实验部分主要锻炼大家理论联系实际的能力，真正地掌握和理解文本编辑器的日常运维操作。',
                                    '本章主要内容包括：',
                                    '1、常见文本编辑器，以及VIM打开文件和移动光标',
                                    '2、如何使用VIM编辑器',
                                    '3、如何在Linux中查看文件',
                                    '4、文件摘选和字段提取'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx'
                            },
                            {
                                label: '3.1 常见文本编辑器',
                                key: '3.1 常见文本编辑器',
                                desc: '这一单元我们主要介绍Linux系统中常用的文本编辑器，包括Emacs、nano、gedit、vi和vim，以及如何使用vim文本编辑器打开文件，如何在vim中移动光标等内容。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.1%20%E5%B8%B8%E8%A7%81%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%8C%E4%BB%A5%E5%8F%8AVIM%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6%E5%92%8C%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87/3.1%20%E5%B8%B8%E8%A7%81%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%8C%E4%BB%A5%E5%8F%8AVIM%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6%E5%92%8C%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87.mp4'
                            },
                            {
                                label: '3.2 如何使用VIM编辑器',
                                key: '3.2 如何使用VIM编辑器',
                                desc: '这一单元我们主要介绍如何使用vim文本编辑器，包括数据操作，行号的显示和取消，vim中的查找与替换，设置搜索高亮，修改文件撤销或重做，以及如何保存文件并退出等内容。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.2%20%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8VIM%E7%BC%96%E8%BE%91%E5%99%A8/3.2%20%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8VIM%E7%BC%96%E8%BE%91%E5%99%A8.mp4'
                            },
                            {
                                label: '3.3 在Linux查看文件-cat、more、less',
                                key: '3.3 在Linux查看文件-cat、more、less',
                                desc: '这一单元我们主要介绍文本处理的命令，包括如何查看文件，如何筛选文件，如何提取列或者字段，以及如何提取关键字。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.3%20%E5%9C%A8Linux%E6%9F%A5%E7%9C%8B%E6%96%87%E4%BB%B6-cat%E3%80%81more%E3%80%81less/3.3%20%E5%9C%A8Linux%E6%9F%A5%E7%9C%8B%E6%96%87%E4%BB%B6-cat%E3%80%81more%E3%80%81less.mp4'
                            },
                            {
                                label: '3.4 文件摘选和字段提取',
                                key: '3.4 文件摘选和字段提取',
                                desc: '这一单元我们主要介绍查看文件的命令：cat、more和less。Linux文件的摘选命令：head和tail。提取文件中列或者字段的命令：cut。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.4%20%E6%96%87%E4%BB%B6%E6%91%98%E9%80%89%E5%92%8C%E5%AD%97%E6%AE%B5%E6%8F%90%E5%8F%96/3.4%20%E6%96%87%E4%BB%B6%E6%91%98%E9%80%89%E5%92%8C%E5%AD%97%E6%AE%B5%E6%8F%90%E5%8F%96.mp4'
                            }
                        ]
                    },
                    {
                        label: '4 用户和权限管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction4',
                                introduction: [
                                    '本章我们将学习用户和权限管理，帮助大家了解用户和组的基础概念，掌握文件和目录的命令行和权限管理操作，以及文件的特殊访问权限管理。',
                                    '本章我们在介绍时仍然会分为两个部分，理论部分主要讲解用户、用户组和文件权限的基本概念，实验部分会重点锻炼大家对相关管理命令的操作，帮助大家理论联系实际，真正了解和掌握用户和权限管理。',
                                    '本章主要内容包括：',
                                    '1、用户的概念和用户相关的管理命令',
                                    '2、用户组的概念和相关的管理命令',
                                    '3、文件权限的基础概念'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '4.1 用户的概念和相关管理命令',
                                key: '4.1 用户的概念和相关管理命令',
                                desc: '这一单元我们主要介绍用户的概念，以及useradd、usermod、passwd等用户相关的管理命令。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.1%20%E7%94%A8%E6%88%B7%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4/4.1%20%E7%94%A8%E6%88%B7%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4.mp4',

                            },
                            {
                                label: '4.2 用户的管理文件',
                                key: '4.2 用户的管理文件',
                                desc: '这一单元我们主要介绍用户组的概念，以及groupadd、groupmod等用户组管理命令。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.2%20%E7%94%A8%E6%88%B7%E7%BB%84%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%EF%BC%8C%E4%BB%A5%E5%8F%8A%E7%94%A8%E6%88%B7%E7%9A%84%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6/4.2%20%E7%94%A8%E6%88%B7%E7%BB%84%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%EF%BC%8C%E4%BB%A5%E5%8F%8A%E7%94%A8%E6%88%B7%E7%9A%84%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6.mp4',

                            },
                            {
                                label: '4.3 文件权限的概念及相关操作',
                                key: '4.3 文件权限的概念及相关操作',
                                desc: '这一单元我们主要介绍在openEuler系统中，用户和用户组的基础概念、它们的相关命令、相关文件等等，还将了解到常见的读写权限、执行权限，以及如何针对文件或者目录进行权限的修改。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.3%20%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E7%9A%84%E6%A6%82%E5%BF%B5%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C/4.3%20%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E7%9A%84%E6%A6%82%E5%BF%B5%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C.mp4',
                                
                            }
                        ]
                    },
                    {
                        label: '5 安装软件并管理服务',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction5',
                                introduction: [
                                    '本章我们将主要介绍如何在Linux中安装软件并管理服务，帮助大家了解安装软件的两种方式：RPM包安装和源代码安装。',
                                    '理论部分主要讲解两种安装方式的优缺点及特性，实验部分将辅助大家更深入的了解RPM和DNF的操作命令和systemd的管理服务命令。',
                                    '本章主要内容包括：',
                                    '1、RPM、DNF概念和操作命令',
                                    '1、RPM、DNF概念和操作命令',
                                    '3、systemd管理服务'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx'
                            },
                            {
                                label: '5.1 RPM的概念和操作命令',
                                key: '5.1 RPM的概念和操作命令',
                                desc: '这一单元我们主要介绍RPM的概念，以及如何使用RPM命令进行安装、卸载、升级和查询等操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.1%20RPM%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4/5.1%20RPM%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.mp4'
                            },
                            {
                                label: '5.2 DNF的概念和操作命令',
                                key: '5.2 DNF的概念和操作命令',
                                desc: '这一单元我们主要介绍DNF的概念，以及如何添加和启动软件源，如何配置DNF，如何使用DNF查询、安装、删除、升级软件包和软件包组。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.2%20DNF%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4/5.2%20DNF%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.mp4'
                            },
                            {
                                label: '5.3 RPM和DNF的操作实验',
                                key: '5.3 RPM和DNF的操作实验',
                                desc: '这一单元我们主要介绍配置软件源的实验，以及如何使用RPM命令和DNF命令管理软件。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.3%20RPM%E5%92%8CDNF%E7%9A%84%E6%93%8D%E4%BD%9C%E5%AE%9E%E9%AA%8C/5.3%20RPM%E5%92%8CDNF%E7%9A%84%E6%93%8D%E4%BD%9C%E5%AE%9E%E9%AA%8C.mp4',

                            },
                            {
                                label: '5.4 源代码软件及其安装方法',
                                key: '5.4 源代码软件及其安装方法',
                                desc: '这一单元我们主要介绍源代码软件的概念，以及使用源码安装软件的方法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.4%20%E6%BA%90%E4%BB%A3%E7%A0%81%E8%BD%AF%E4%BB%B6%E5%8F%8A%E5%85%B6%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95/5.4%20%E6%BA%90%E4%BB%A3%E7%A0%81%E8%BD%AF%E4%BB%B6%E5%8F%8A%E5%85%B6%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95.mp4',

                            },
                            {
                                label: '5.5 systemd管理服务',
                                key: '5.5 systemd管理服务',
                                desc: '这一单元我们主要介绍systemd管理服务的概念，以及systemd的主命令systemctl的用法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.5%20systemd%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1/5.5%20systemd%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.mp4',

                            }
                        ]
                    },
                    {
                        label: '6 管理文件系统及存储',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction6',
                                introduction: [
                                    '存储是IT领域中非常重要的一部分，它被用来保存各种各样的数据，本章的课程将会在理论部分介绍与存储相关的一些概念，包括文件系统、磁盘类型、逻辑卷等，同时也会在实验部分演示如何使用它们对数据进行保存。',
                                    '本章主要内容包括：',
                                    '1、文件系统简介',
                                    '2、openEuler文件系统及相关操作',
                                    '3、MBR操作演示',
                                    '4、GPT分区演示',
                                    '5、逻辑卷管理和操作演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx'
                            },
                            {
                                label: '6.1 文件系统简介',
                                key: '6.1 文件系统简介',
                                desc: '这一单元我们主要介绍文件系统的基本概念，以及分区的含义。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.1%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B/6.1%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B.mp4',

                            },
                            {
                                label: '6.2 openEuler文件系统及相关操作',
                                key: '6.2 openEuler文件系统及相关操作',
                                desc: '这一单元我们主要介绍文件系统和存储相关的知识，以及磁盘存储的挂载和使用方法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.2%20openEuler%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C/6.2%20openEuler%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C.mp4',

                            },
                            {
                                label: '6.3 MBR操作演示',
                                key: '6.3 MBR操作演示',
                                desc: '这一单元我们主要介绍如何进行MBR的分区的实验操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.3%20MBR%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA/6.3%20MBR%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4',

                            },
                            {
                                label: '6.4 GPT分区演示',
                                key: '6.4 GPT分区演示',
                                desc: '这一单元我们主要介绍如何进行GPT的分区模式。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.4%20GPT%E5%88%86%E5%8C%BA%E6%BC%94%E7%A4%BA/6.4%20GPT%E5%88%86%E5%8C%BA%E6%BC%94%E7%A4%BA.mp4',

                            },
                            {
                                label: '6.5 逻辑卷管理',
                                key: '6.5 逻辑卷管理',
                                desc: '这一单元我们主要介绍逻辑卷相关的一些概念，以及如何管理逻辑卷和动态调整逻辑卷。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.5%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86/6.5%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86.mp4',

                            },
                            {
                                label: '6.6 逻辑卷管理操作演示',
                                key: '6.6 逻辑卷管理操作演示',
                                desc: '这一单元我们主要介绍如何创建一个LV，也就是如何创建一个逻辑卷。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.6%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA/6.6%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4',

                            }
                        ]
                    },
                    {
                        label: '7 系统管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction7',
                                introduction: [
                                    '在Linux系统中你可能已经发现了为什么系统常常会自动地进行一些任务？这些任务到底是谁在支配他们工作的？本章的课程将简单介绍几个系统管理的操作，包括计划任务、网络管理及进程管理。',
                                    '我们同样会采用理论加实验的方式，帮助大家更直观地理解系统管理，并掌握它的操作。',
                                    '本章主要内容包括：',
                                    '1、计划任务管理',
                                    '2、at和crontab演示',
                                    '3、网络管理和演示',
                                    '4、进程管理和演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.1 计划任务管理',
                                key: '7.1 计划任务管理',
                                desc: '这一单元我们主要介绍计划任务管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.1%20%E8%AE%A1%E5%88%92%E4%BB%BB%E5%8A%A1%E7%AE%A1%E7%90%86/7.1%20%E8%AE%A1%E5%88%92%E4%BB%BB%E5%8A%A1%E7%AE%A1%E7%90%86.mp4'
                            },
                            {
                                label: '7.2 at和crontab演示',
                                key: '7.2 at和crontab演示',
                                desc: '这一单元我们主要介绍计划任务管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.2%20at%E5%92%8Ccrontab%E6%BC%94%E7%A4%BA/7.2%20at%E5%92%8Ccrontab%E6%BC%94%E7%A4%BA.mp4'
                            },
                            {
                                label: '7.3 网络管理',
                                key: '7.3 网络管理',
                                desc: '这一单元我们主要介绍网络管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.3%20%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86/7.3%20%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86.mp4'
                            },
                            {
                                label: '7.4 网络管理演示',
                                key: '7.4 网络管理演示',
                                desc: '这一单元我们主要介绍网络管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.4%20%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA/7.4%20%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA.mp4'
                            },
                            {
                                label: '7.5 进程管理',
                                key: '7.5 进程管理',
                                desc: '这一单元我们主要介绍进程管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.5%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86/7.5%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86.mp4'
                            },
                            {
                                label: '7.6 进程管理演示',
                                key: '7.6 进程管理演示',
                                desc: '这一单元我们主要介绍进程管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.6%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA/7.6%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA.mp4'
                            }
                        ]
                    },
                    {
                        label: '8 使用shell脚本',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction8',
                                introduction: [
                                    '在这一章课程中，我们将会学习如何使用shell脚本，首先是shell基础知识，包括shell脚本的定义，构成等等内容，其次我们会介绍一些shell编程基础，包括标准输入、标准输出，管道、运算、变量、字符等等内容 ，我们还将学习如何编写常用的shell脚本，包括如何调试shell脚本，以及shell脚本的编写风格等等内容。',
                                    '本章我们将同样按照之前的课程设计，分为理论和实验两个部分，理论部分我们将简单介绍shell脚本的作用，并基于基本架构，对其架构进行讲解，然后会对其工作原理和流程进行深入学习。实验部分主要锻炼学员对于shell编程的基本运用，帮助大家理论联系实际，真正掌握shell脚本知识。',
                                    '本章主要内容包括：',
                                    '1、shell编程的基础，包括shell脚本输入、输出、重定向和管道等等',
                                    '2、shell编程中的字符、变量和运算',
                                    '3、shell编程的语句，包括循环语句和条件语句等等'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx'
                            },
                            {
                                label: '8.1 Shell编程基础',
                                key: '8.1 Shell编程基础',
                                desc: '这一单元我们主要介绍shell编程的基础，包括shell脚本输入、输出、重定向和管道等等。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.1%20Shell%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/8.1%20Shell%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80.mp4',

                            },
                            {
                                label: '8.2 字符、变量和运算',
                                key: '8.2 字符、变量和运算',
                                desc: '这一单元我们主要介绍shell编程中的字符、变量和运算。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.2%20%E5%AD%97%E7%AC%A6%E3%80%81%E5%8F%98%E9%87%8F%E5%92%8C%E8%BF%90%E7%AE%97/8.2%20%E5%AD%97%E7%AC%A6%E3%80%81%E5%8F%98%E9%87%8F%E5%92%8C%E8%BF%90%E7%AE%97.mp4',

                            },
                            {
                                label: '8.3 Shell编程语句',
                                key: '8.3 Shell编程语句',
                                desc: '这一单元我们主要介绍shell编程的语句，包括循环语句和条件语句等等。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.3%20Shell%E7%BC%96%E7%A8%8B%E8%AF%AD%E5%8F%A5/8.3%20Shell%E7%BC%96%E7%A8%8B%E8%AF%AD%E5%8F%A5.mp4',

                            }
                        ]
                    },
                    {
                        label: '9 Samba文件共享服务器管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction9',
                                introduction: [
                                    '本章是整个课程的最后一章，将为大家演示整个综合实验。通过对前几章内容的综合运用，来完成Samba文件共享服务的搭建和使用。',
                                    '本章主要内容包括：',
                                    '1、综合实验背景介绍',
                                    '2、综合实验演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '9.1 综合实验背景介绍',
                                key: '9.1 综合实验背景介绍',
                                desc: '这一单元我们主要介绍Samba服务器的架构和工作原理，了解如何配置Samba对应的目录的一些用户以及权限，并使用前八章学习的知识做一些简单的运维工作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B9%9D%E7%AB%A0/9.1%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E8%83%8C%E6%99%AF%E4%BB%8B%E7%BB%8D/9.1%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E8%83%8C%E6%99%AF%E4%BB%8B%E7%BB%8D.mp4'
                            },
                            {
                                label: '9.2 综合实验演示',
                                key: '9.2 综合实验演示',
                                desc: '这一单元我们主要介绍如何搭建Samba文件共享服务器。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B9%9D%E7%AB%A0/9.2%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E6%BC%94%E7%A4%BA/9.2%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E6%BC%94%E7%A4%BA.mp4'
                            }
                        ]
                    },
                ]
            }
        ]
    },
    en: {
        COURSE_LIST: [
            {
                ID: 1,
                COURSE_H1: 'HCIA-openEuler 认证培训课程',
                NAV_DATA: [
                    {
                        label: '课程导读',
                        key: 'introduction0',
                        introduction: [
                            '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                            'OpenEuler是一个开源免费的Linux发行版系统，通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。openEuler同时是一个创新的系统，倡导客户在系统上提出创新想法、开拓新思路、实践新方案。',
                            'HCIA-openEuler华为认证openEuler工程师在线课程定位于培养和认证具备企业数据中心核心操作系统基础操作与管理能力的工程师。',
                            '通过HCIA-OpenEuler V1.0 认证，您将掌握openEuler操作系统基础命令，掌握openEuler用户管理、网络管理、权限管理，掌握shell基础知识；具备企业数据中心核心操作系统基础操作与管理能力；能够胜任Linux系统运维工程师等岗位。',
                            '本次课程我们首先需要系统地了解openEuler是什么，对openEuler进行初步的了解。',
                            '然后会依次学习并了解：',
                            '1、操作系统发展史',
                            '2、openEuler基础命令如目录操作、文件查看等',
                            '3、vi与vim文本编辑器',
                            '4、openEuler用户、用户组与权限管理',
                            '5、openEuler操作系统应用软件安装',
                            '6、openEuler存储空间管理',
                            '7、openEuler系统计划任务、网络与服务管理',
                            '8、shell脚本基础',
                            '9、Samba文件共享服务器'
                        ],
                        teacher: [
                            {
                                img: '/img/learn/hcia/yanglei.png',
                                position: '华为认证高级讲师',
                                name: '杨磊'
                            },
                            {
                                img: '/img/learn/hcia/zhongyunan.png',
                                position: '华为认证高级讲师',
                                name: '钟育楠'
                            }
                        ]
                    },
                    {
                        label: '1 openEuler操作系统入门',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction1',
                                introduction: [
                                    '本章《openEuler操作系统入门》作为课程的第一章，将帮助大家快速了解什么是openEuler。本章课程主要介绍了GNU自由软件基金会、Linux起源、openEuler操作系统以及它们之间的关系，并且演示了如何安装openEuler操作系统，以及如何登录使用openEuler操作系统。',
                                    '以理论加实验的方式，更加生动地引领大家进入openEuler之旅。',
                                    '本章主要内容包括：',
                                    '1、Linux介绍',
                                    '2、openEuler安装',
                                    '3、openEuler入门级操作'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx'
                            },
                            {
                                label: '1.1 Linux介绍',
                                key: '1.1 Linux介绍',
                                desc: '这一单元我们主要介绍Linux操作系统的入门知识。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.1%2Blinux%E4%BB%8B%E7%BB%8D.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            },
                            {
                                label: '1.2 openEuler安装',
                                key: '1.2 openEuler安装',
                                desc: '这一单元我们主要介绍如何安装openEuler。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.2%2BopenEuler%E5%AE%89%E8%A3%85.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            },
                            {
                                label: '1.3 openEuler入门级操作',
                                key: '1.3 openEuler入门级操作',
                                desc: '这一单元我们主要介绍如何使用openEuler操作系统。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.3%2BopenEuler%E5%85%A5%E9%97%A8%E7%BA%A7%E6%93%8D%E4%BD%9C.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            }
                        ]
                    },
                    {
                        label: '2 命令行操作基础',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction2',
                                introduction: [
                                    '本章我们主要介绍命令行的一些基础操作，包括入门级命令行代码，以及如何使用命令行管理文件。',
                                    '我们的课程分为理论和实验两部分，理论部分介绍命令行，实验部分加深印象。通过本章的学习，希望大家可以掌握Linux命令的基础知识、Linux系统登录命令、系统电源管理命令、系统帮助命令和文件管理命令。',
                                    '本章主要内容包括：',
                                    '1、Linux命令基础知识。',
                                    '2、Linux系统中的目录操作、文件操作和文件查看操作。',
                                    '3、文件的分页查看操作和查找操作。',
                                    '4、文件的压缩和打包操作。'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                            },
                            {
                                label: '2.1 Linux命令行基础',
                                key: '2.1 Linux命令行基础',
                                desc: '这一单元我们主要介绍Linux命令行操作基础，包括命令行入门和使用命令行管理文件。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.1%20Linux%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E7%A1%80%E3%80%81%E7%99%BB%E5%BD%95%E5%92%8C%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%E4%BB%A5%E5%8F%8A%E4%B8%BB%E8%A6%81%E7%9B%AE%E5%BD%95%E7%9A%84%E7%94%A8%E9%80%94/2.1%20Linux%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E7%A1%80%E3%80%81%E7%99%BB%E5%BD%95%E5%92%8C%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%E4%BB%A5%E5%8F%8A%E4%B8%BB%E8%A6%81%E7%9B%AE%E5%BD%95%E7%9A%84%E7%94%A8%E9%80%94.mp4'
                            },
                            {
                                label: '2.2 目录操作、文件操作和查看操作',
                                key: '2.2 目录操作、文件操作和查看操作',
                                desc: '这一单元我们主要介绍Linux系统中的目录操作、文件操作、和文件查看操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.2%20%E7%9B%AE%E5%BD%95%E6%93%8D%E4%BD%9C%E3%80%81%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C/2.2%20%E7%9B%AE%E5%BD%95%E6%93%8D%E4%BD%9C%E3%80%81%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C.mp4'
                            },
                            {
                                label: '2.3 分页查看操作和查找操作',
                                key: '2.3 分页查看操作和查找操作',
                                desc: '这一单元我们主要介绍文件的分页查看操作和查找操作。 ',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.3%20%E5%88%86%E9%A1%B5%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E6%89%BE%E6%93%8D%E4%BD%9C/2.3%20%E5%88%86%E9%A1%B5%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E6%89%BE%E6%93%8D%E4%BD%9C.mp4'
                            },
                            {
                                label: '2.4 压缩和打包操作',
                                key: '2.4 压缩和打包操作',
                                desc: '这一单元我们主要介绍文件的压缩和打包操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.4%20%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%89%93%E5%8C%85%E6%93%8D%E4%BD%9C/2.4%20%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%89%93%E5%8C%85%E6%93%8D%E4%BD%9C.mp4'
                            }
                        ]
                    },
                    {
                        label: '3 文本编辑器及文本处理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction3',
                                introduction: [
                                    '本章课程我们将了解Linux系统中常见的文本编辑器，以及对应的文本处理方式，常见的文本编辑器包括Emacs、nano、gedit、vi和vim等等，本章我们将重点介绍vi和vim编辑器，以及它们的三种主要模式。通过本章的学习，希望大家可以掌握vim文本编辑器的常用操作，包括如何使用vim打开文件、修改文件、保存文件，以及vim文本编辑器的常用快捷操作等等。',
                                    '本章我们依然分理论和实验两部分进行讲解。理论部分我们主要讲解Linux文本编辑器的作用、架构、原理和流程。实验部分主要锻炼大家理论联系实际的能力，真正地掌握和理解文本编辑器的日常运维操作。',
                                    '本章主要内容包括：',
                                    '1、常见文本编辑器，以及VIM打开文件和移动光标',
                                    '2、如何使用VIM编辑器',
                                    '3、如何在Linux中查看文件',
                                    '4、文件摘选和字段提取'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx'
                            },
                            {
                                label: '3.1 常见文本编辑器',
                                key: '3.1 常见文本编辑器',
                                desc: '这一单元我们主要介绍Linux系统中常用的文本编辑器，包括Emacs、nano、gedit、vi和vim，以及如何使用vim文本编辑器打开文件，如何在vim中移动光标等内容。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.1%20%E5%B8%B8%E8%A7%81%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%8C%E4%BB%A5%E5%8F%8AVIM%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6%E5%92%8C%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87/3.1%20%E5%B8%B8%E8%A7%81%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%8C%E4%BB%A5%E5%8F%8AVIM%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6%E5%92%8C%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87.mp4'
                            },
                            {
                                label: '3.2 如何使用VIM编辑器',
                                key: '3.2 如何使用VIM编辑器',
                                desc: '这一单元我们主要介绍如何使用vim文本编辑器，包括数据操作，行号的显示和取消，vim中的查找与替换，设置搜索高亮，修改文件撤销或重做，以及如何保存文件并退出等内容。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.2%20%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8VIM%E7%BC%96%E8%BE%91%E5%99%A8/3.2%20%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8VIM%E7%BC%96%E8%BE%91%E5%99%A8.mp4'
                            },
                            {
                                label: '3.3 在Linux查看文件-cat、more、less',
                                key: '3.3 在Linux查看文件-cat、more、less',
                                desc: '这一单元我们主要介绍文本处理的命令，包括如何查看文件，如何筛选文件，如何提取列或者字段，以及如何提取关键字。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.3%20%E5%9C%A8Linux%E6%9F%A5%E7%9C%8B%E6%96%87%E4%BB%B6-cat%E3%80%81more%E3%80%81less/3.3%20%E5%9C%A8Linux%E6%9F%A5%E7%9C%8B%E6%96%87%E4%BB%B6-cat%E3%80%81more%E3%80%81less.mp4'
                            },
                            {
                                label: '3.4 文件摘选和字段提取',
                                key: '3.4 文件摘选和字段提取',
                                desc: '这一单元我们主要介绍查看文件的命令：cat、more和less。Linux文件的摘选命令：head和tail。提取文件中列或者字段的命令：cut。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.4%20%E6%96%87%E4%BB%B6%E6%91%98%E9%80%89%E5%92%8C%E5%AD%97%E6%AE%B5%E6%8F%90%E5%8F%96/3.4%20%E6%96%87%E4%BB%B6%E6%91%98%E9%80%89%E5%92%8C%E5%AD%97%E6%AE%B5%E6%8F%90%E5%8F%96.mp4'
                            }
                        ]
                    },
                    {
                        label: '4 用户和权限管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction4',
                                introduction: [
                                    '本章我们将学习用户和权限管理，帮助大家了解用户和组的基础概念，掌握文件和目录的命令行和权限管理操作，以及文件的特殊访问权限管理。',
                                    '本章我们在介绍时仍然会分为两个部分，理论部分主要讲解用户、用户组和文件权限的基本概念，实验部分会重点锻炼大家对相关管理命令的操作，帮助大家理论联系实际，真正了解和掌握用户和权限管理。',
                                    '本章主要内容包括：',
                                    '1、用户的概念和用户相关的管理命令',
                                    '2、用户组的概念和相关的管理命令',
                                    '3、文件权限的基础概念'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '4.1 用户的概念和相关管理命令',
                                key: '4.1 用户的概念和相关管理命令',
                                desc: '这一单元我们主要介绍用户的概念，以及useradd、usermod、passwd等用户相关的管理命令。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.1%20%E7%94%A8%E6%88%B7%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4/4.1%20%E7%94%A8%E6%88%B7%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4.mp4',

                            },
                            {
                                label: '4.2 用户的管理文件',
                                key: '4.2 用户的管理文件',
                                desc: '这一单元我们主要介绍用户组的概念，以及groupadd、groupmod等用户组管理命令。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.2%20%E7%94%A8%E6%88%B7%E7%BB%84%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%EF%BC%8C%E4%BB%A5%E5%8F%8A%E7%94%A8%E6%88%B7%E7%9A%84%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6/4.2%20%E7%94%A8%E6%88%B7%E7%BB%84%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%EF%BC%8C%E4%BB%A5%E5%8F%8A%E7%94%A8%E6%88%B7%E7%9A%84%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6.mp4',

                            },
                            {
                                label: '4.3 文件权限的概念及相关操作',
                                key: '4.3 文件权限的概念及相关操作',
                                desc: '这一单元我们主要介绍在openEuler系统中，用户和用户组的基础概念、它们的相关命令、相关文件等等，还将了解到常见的读写权限、执行权限，以及如何针对文件或者目录进行权限的修改。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.3%20%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E7%9A%84%E6%A6%82%E5%BF%B5%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C/4.3%20%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E7%9A%84%E6%A6%82%E5%BF%B5%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C.mp4',
                                
                            }
                        ]
                    },
                    {
                        label: '5 安装软件并管理服务',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction5',
                                introduction: [
                                    '本章我们将主要介绍如何在Linux中安装软件并管理服务，帮助大家了解安装软件的两种方式：RPM包安装和源代码安装。',
                                    '理论部分主要讲解两种安装方式的优缺点及特性，实验部分将辅助大家更深入的了解RPM和DNF的操作命令和systemd的管理服务命令。',
                                    '本章主要内容包括：',
                                    '1、RPM、DNF概念和操作命令',
                                    '1、RPM、DNF概念和操作命令',
                                    '3、systemd管理服务'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx'
                            },
                            {
                                label: '5.1 RPM的概念和操作命令',
                                key: '5.1 RPM的概念和操作命令',
                                desc: '这一单元我们主要介绍RPM的概念，以及如何使用RPM命令进行安装、卸载、升级和查询等操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.1%20RPM%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4/5.1%20RPM%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.mp4'
                            },
                            {
                                label: '5.2 DNF的概念和操作命令',
                                key: '5.2 DNF的概念和操作命令',
                                desc: '这一单元我们主要介绍DNF的概念，以及如何添加和启动软件源，如何配置DNF，如何使用DNF查询、安装、删除、升级软件包和软件包组。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.2%20DNF%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4/5.2%20DNF%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.mp4'
                            },
                            {
                                label: '5.3 RPM和DNF的操作实验',
                                key: '5.3 RPM和DNF的操作实验',
                                desc: '这一单元我们主要介绍配置软件源的实验，以及如何使用RPM命令和DNF命令管理软件。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.3%20RPM%E5%92%8CDNF%E7%9A%84%E6%93%8D%E4%BD%9C%E5%AE%9E%E9%AA%8C/5.3%20RPM%E5%92%8CDNF%E7%9A%84%E6%93%8D%E4%BD%9C%E5%AE%9E%E9%AA%8C.mp4',

                            },
                            {
                                label: '5.4 源代码软件及其安装方法',
                                key: '5.4 源代码软件及其安装方法',
                                desc: '这一单元我们主要介绍源代码软件的概念，以及使用源码安装软件的方法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.4%20%E6%BA%90%E4%BB%A3%E7%A0%81%E8%BD%AF%E4%BB%B6%E5%8F%8A%E5%85%B6%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95/5.4%20%E6%BA%90%E4%BB%A3%E7%A0%81%E8%BD%AF%E4%BB%B6%E5%8F%8A%E5%85%B6%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95.mp4',

                            },
                            {
                                label: '5.5 systemd管理服务',
                                key: '5.5 systemd管理服务',
                                desc: '这一单元我们主要介绍systemd管理服务的概念，以及systemd的主命令systemctl的用法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.5%20systemd%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1/5.5%20systemd%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.mp4',

                            }
                        ]
                    },
                    {
                        label: '6 管理文件系统及存储',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction6',
                                introduction: [
                                    '存储是IT领域中非常重要的一部分，它被用来保存各种各样的数据，本章的课程将会在理论部分介绍与存储相关的一些概念，包括文件系统、磁盘类型、逻辑卷等，同时也会在实验部分演示如何使用它们对数据进行保存。',
                                    '本章主要内容包括：',
                                    '1、文件系统简介',
                                    '2、openEuler文件系统及相关操作',
                                    '3、MBR操作演示',
                                    '4、GPT分区演示',
                                    '5、逻辑卷管理和操作演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx'
                            },
                            {
                                label: '6.1 文件系统简介',
                                key: '6.1 文件系统简介',
                                desc: '这一单元我们主要介绍文件系统的基本概念，以及分区的含义。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.1%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B/6.1%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B.mp4',

                            },
                            {
                                label: '6.2 openEuler文件系统及相关操作',
                                key: '6.2 openEuler文件系统及相关操作',
                                desc: '这一单元我们主要介绍文件系统和存储相关的知识，以及磁盘存储的挂载和使用方法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.2%20openEuler%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C/6.2%20openEuler%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C.mp4',

                            },
                            {
                                label: '6.3 MBR操作演示',
                                key: '6.3 MBR操作演示',
                                desc: '这一单元我们主要介绍如何进行MBR的分区的实验操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.3%20MBR%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA/6.3%20MBR%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4',

                            },
                            {
                                label: '6.4 GPT分区演示',
                                key: '6.4 GPT分区演示',
                                desc: '这一单元我们主要介绍如何进行GPT的分区模式。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.4%20GPT%E5%88%86%E5%8C%BA%E6%BC%94%E7%A4%BA/6.4%20GPT%E5%88%86%E5%8C%BA%E6%BC%94%E7%A4%BA.mp4',

                            },
                            {
                                label: '6.5 逻辑卷管理',
                                key: '6.5 逻辑卷管理',
                                desc: '这一单元我们主要介绍逻辑卷相关的一些概念，以及如何管理逻辑卷和动态调整逻辑卷。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.5%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86/6.5%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86.mp4',

                            },
                            {
                                label: '6.6 逻辑卷管理操作演示',
                                key: '6.6 逻辑卷管理操作演示',
                                desc: '这一单元我们主要介绍如何创建一个LV，也就是如何创建一个逻辑卷。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.6%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA/6.6%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4',

                            }
                        ]
                    },
                    {
                        label: '7 系统管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction7',
                                introduction: [
                                    '在Linux系统中你可能已经发现了为什么系统常常会自动地进行一些任务？这些任务到底是谁在支配他们工作的？本章的课程将简单介绍几个系统管理的操作，包括计划任务、网络管理及进程管理。',
                                    '我们同样会采用理论加实验的方式，帮助大家更直观地理解系统管理，并掌握它的操作。',
                                    '本章主要内容包括：',
                                    '1、计划任务管理',
                                    '2、at和crontab演示',
                                    '3、网络管理和演示',
                                    '4、进程管理和演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.1 计划任务管理',
                                key: '7.1 计划任务管理',
                                desc: '这一单元我们主要介绍计划任务管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.2 at和crontab演示',
                                key: '7.2 at和crontab演示',
                                desc: '这一单元我们主要介绍计划任务管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.3 网络管理',
                                key: '7.3 网络管理',
                                desc: '这一单元我们主要介绍网络管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.4 网络管理演示',
                                key: '7.4 网络管理演示',
                                desc: '这一单元我们主要介绍网络管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.5 进程管理',
                                key: '7.5 进程管理',
                                desc: '这一单元我们主要介绍进程管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.5%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86/7.5%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86.mp4'
                            },
                            {
                                label: '7.6 进程管理演示',
                                key: '7.6 进程管理演示',
                                desc: '这一单元我们主要介绍进程管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.6%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA/7.6%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA.mp4'
                            }
                        ]
                    },
                    {
                        label: '8 使用shell脚本',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction8',
                                introduction: [
                                    '在这一章课程中，我们将会学习如何使用shell脚本，首先是shell基础知识，包括shell脚本的定义，构成等等内容，其次我们会介绍一些shell编程基础，包括标准输入、标准输出，管道、运算、变量、字符等等内容 ，我们还将学习如何编写常用的shell脚本，包括如何调试shell脚本，以及shell脚本的编写风格等等内容。',
                                    '本章我们将同样按照之前的课程设计，分为理论和实验两个部分，理论部分我们将简单介绍shell脚本的作用，并基于基本架构，对其架构进行讲解，然后会对其工作原理和流程进行深入学习。实验部分主要锻炼学员对于shell编程的基本运用，帮助大家理论联系实际，真正掌握shell脚本知识。',
                                    '本章主要内容包括：',
                                    '1、shell编程的基础，包括shell脚本输入、输出、重定向和管道等等',
                                    '2、shell编程中的字符、变量和运算',
                                    '3、shell编程的语句，包括循环语句和条件语句等等'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx'
                            },
                            {
                                label: '8.1 Shell编程基础',
                                key: '8.1 Shell编程基础',
                                desc: '这一单元我们主要介绍shell编程的基础，包括shell脚本输入、输出、重定向和管道等等。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.1%20Shell%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/8.1%20Shell%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80.mp4',

                            },
                            {
                                label: '8.2 字符、变量和运算',
                                key: '8.2 字符、变量和运算',
                                desc: '这一单元我们主要介绍shell编程中的字符、变量和运算。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.2%20%E5%AD%97%E7%AC%A6%E3%80%81%E5%8F%98%E9%87%8F%E5%92%8C%E8%BF%90%E7%AE%97/8.2%20%E5%AD%97%E7%AC%A6%E3%80%81%E5%8F%98%E9%87%8F%E5%92%8C%E8%BF%90%E7%AE%97.mp4',

                            },
                            {
                                label: '8.3 Shell编程语句',
                                key: '8.3 Shell编程语句',
                                desc: '这一单元我们主要介绍shell编程的语句，包括循环语句和条件语句等等。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.3%20Shell%E7%BC%96%E7%A8%8B%E8%AF%AD%E5%8F%A5/8.3%20Shell%E7%BC%96%E7%A8%8B%E8%AF%AD%E5%8F%A5.mp4',

                            }
                        ]
                    },
                    {
                        label: '9 Samba文件共享服务器管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction9',
                                introduction: [
                                    '本章是整个课程的最后一章，将为大家演示整个综合实验。通过对前几章内容的综合运用，来完成Samba文件共享服务的搭建和使用。',
                                    '本章主要内容包括：',
                                    '1、综合实验背景介绍',
                                    '2、综合实验演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '9.1 综合实验背景介绍',
                                key: '9.1 综合实验背景介绍',
                                desc: '这一单元我们主要介绍Samba服务器的架构和工作原理，了解如何配置Samba对应的目录的一些用户以及权限，并使用前八章学习的知识做一些简单的运维工作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B9%9D%E7%AB%A0/9.1%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E8%83%8C%E6%99%AF%E4%BB%8B%E7%BB%8D/9.1%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E8%83%8C%E6%99%AF%E4%BB%8B%E7%BB%8D.mp4'
                            },
                            {
                                label: '9.2 综合实验演示',
                                key: '9.2 综合实验演示',
                                desc: '这一单元我们主要介绍如何搭建Samba文件共享服务器。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B9%9D%E7%AB%A0/9.2%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E6%BC%94%E7%A4%BA/9.2%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E6%BC%94%E7%A4%BA.mp4'
                            }
                        ]
                    },
                ]
            }
        ]
    },
    ru: {
        COURSE_LIST: [
            {
                ID: 1,
                COURSE_H1: 'HCIA-openEuler 认证培训课程',
                NAV_DATA: [
                    {
                        label: '课程导读',
                        key: 'introduction0',
                        introduction: [
                            '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                            'OpenEuler是一个开源免费的Linux发行版系统，通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。openEuler同时是一个创新的系统，倡导客户在系统上提出创新想法、开拓新思路、实践新方案。',
                            'HCIA-openEuler华为认证openEuler工程师在线课程定位于培养和认证具备企业数据中心核心操作系统基础操作与管理能力的工程师。',
                            '通过HCIA-OpenEuler V1.0 认证，您将掌握openEuler操作系统基础命令，掌握openEuler用户管理、网络管理、权限管理，掌握shell基础知识；具备企业数据中心核心操作系统基础操作与管理能力；能够胜任Linux系统运维工程师等岗位。',
                            '本次课程我们首先需要系统地了解openEuler是什么，对openEuler进行初步的了解。',
                            '然后会依次学习并了解：',
                            '1、操作系统发展史',
                            '2、openEuler基础命令如目录操作、文件查看等',
                            '3、vi与vim文本编辑器',
                            '4、openEuler用户、用户组与权限管理',
                            '5、openEuler操作系统应用软件安装',
                            '6、openEuler存储空间管理',
                            '7、openEuler系统计划任务、网络与服务管理',
                            '8、shell脚本基础',
                            '9、Samba文件共享服务器'
                        ],
                        teacher: [
                            {
                                img: '/img/learn/hcia/yanglei.png',
                                position: '华为认证高级讲师',
                                name: '杨磊'
                            },
                            {
                                img: '/img/learn/hcia/zhongyunan.png',
                                position: '华为认证高级讲师',
                                name: '钟育楠'
                            }
                        ]
                    },
                    {
                        label: '1 openEuler操作系统入门',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction1',
                                introduction: [
                                    '本章《openEuler操作系统入门》作为课程的第一章，将帮助大家快速了解什么是openEuler。本章课程主要介绍了GNU自由软件基金会、Linux起源、openEuler操作系统以及它们之间的关系，并且演示了如何安装openEuler操作系统，以及如何登录使用openEuler操作系统。',
                                    '以理论加实验的方式，更加生动地引领大家进入openEuler之旅。',
                                    '本章主要内容包括：',
                                    '1、Linux介绍',
                                    '2、openEuler安装',
                                    '3、openEuler入门级操作'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx'
                            },
                            {
                                label: '1.1 Linux介绍',
                                key: '1.1 Linux介绍',
                                desc: '这一单元我们主要介绍Linux操作系统的入门知识。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.1%2Blinux%E4%BB%8B%E7%BB%8D.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            },
                            {
                                label: '1.2 openEuler安装',
                                key: '1.2 openEuler安装',
                                desc: '这一单元我们主要介绍如何安装openEuler。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.2%2BopenEuler%E5%AE%89%E8%A3%85.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            },
                            {
                                label: '1.3 openEuler入门级操作',
                                key: '1.3 openEuler入门级操作',
                                desc: '这一单元我们主要介绍如何使用openEuler操作系统。',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%80%E7%AB%A0/1.3%2BopenEuler%E5%85%A5%E9%97%A8%E7%BA%A7%E6%93%8D%E4%BD%9C.mp4',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/01%20openEuler%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pptx',
                            }
                        ]
                    },
                    {
                        label: '2 命令行操作基础',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction2',
                                introduction: [
                                    '本章我们主要介绍命令行的一些基础操作，包括入门级命令行代码，以及如何使用命令行管理文件。',
                                    '我们的课程分为理论和实验两部分，理论部分介绍命令行，实验部分加深印象。通过本章的学习，希望大家可以掌握Linux命令的基础知识、Linux系统登录命令、系统电源管理命令、系统帮助命令和文件管理命令。',
                                    '本章主要内容包括：',
                                    '1、Linux命令基础知识。',
                                    '2、Linux系统中的目录操作、文件操作和文件查看操作。',
                                    '3、文件的分页查看操作和查找操作。',
                                    '4、文件的压缩和打包操作。'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                            },
                            {
                                label: '2.1 Linux命令行基础',
                                key: '2.1 Linux命令行基础',
                                desc: '这一单元我们主要介绍Linux命令行操作基础，包括命令行入门和使用命令行管理文件。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.1%20Linux%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E7%A1%80%E3%80%81%E7%99%BB%E5%BD%95%E5%92%8C%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%E4%BB%A5%E5%8F%8A%E4%B8%BB%E8%A6%81%E7%9B%AE%E5%BD%95%E7%9A%84%E7%94%A8%E9%80%94/2.1%20Linux%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%9F%BA%E7%A1%80%E3%80%81%E7%99%BB%E5%BD%95%E5%92%8C%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%E4%BB%A5%E5%8F%8A%E4%B8%BB%E8%A6%81%E7%9B%AE%E5%BD%95%E7%9A%84%E7%94%A8%E9%80%94.mp4'
                            },
                            {
                                label: '2.2 目录操作、文件操作和查看操作',
                                key: '2.2 目录操作、文件操作和查看操作',
                                desc: '这一单元我们主要介绍Linux系统中的目录操作、文件操作、和文件查看操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.2%20%E7%9B%AE%E5%BD%95%E6%93%8D%E4%BD%9C%E3%80%81%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C/2.2%20%E7%9B%AE%E5%BD%95%E6%93%8D%E4%BD%9C%E3%80%81%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C.mp4'
                            },
                            {
                                label: '2.3 分页查看操作和查找操作',
                                key: '2.3 分页查看操作和查找操作',
                                desc: '这一单元我们主要介绍文件的分页查看操作和查找操作。 ',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.3%20%E5%88%86%E9%A1%B5%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E6%89%BE%E6%93%8D%E4%BD%9C/2.3%20%E5%88%86%E9%A1%B5%E6%9F%A5%E7%9C%8B%E6%93%8D%E4%BD%9C%E5%92%8C%E6%9F%A5%E6%89%BE%E6%93%8D%E4%BD%9C.mp4'
                            },
                            {
                                label: '2.4 压缩和打包操作',
                                key: '2.4 压缩和打包操作',
                                desc: '这一单元我们主要介绍文件的压缩和打包操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/02%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.4%20%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%89%93%E5%8C%85%E6%93%8D%E4%BD%9C/2.4%20%E5%8E%8B%E7%BC%A9%E5%92%8C%E6%89%93%E5%8C%85%E6%93%8D%E4%BD%9C.mp4'
                            }
                        ]
                    },
                    {
                        label: '3 文本编辑器及文本处理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction3',
                                introduction: [
                                    '本章课程我们将了解Linux系统中常见的文本编辑器，以及对应的文本处理方式，常见的文本编辑器包括Emacs、nano、gedit、vi和vim等等，本章我们将重点介绍vi和vim编辑器，以及它们的三种主要模式。通过本章的学习，希望大家可以掌握vim文本编辑器的常用操作，包括如何使用vim打开文件、修改文件、保存文件，以及vim文本编辑器的常用快捷操作等等。',
                                    '本章我们依然分理论和实验两部分进行讲解。理论部分我们主要讲解Linux文本编辑器的作用、架构、原理和流程。实验部分主要锻炼大家理论联系实际的能力，真正地掌握和理解文本编辑器的日常运维操作。',
                                    '本章主要内容包括：',
                                    '1、常见文本编辑器，以及VIM打开文件和移动光标',
                                    '2、如何使用VIM编辑器',
                                    '3、如何在Linux中查看文件',
                                    '4、文件摘选和字段提取'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx'
                            },
                            {
                                label: '3.1 常见文本编辑器',
                                key: '3.1 常见文本编辑器',
                                desc: '这一单元我们主要介绍Linux系统中常用的文本编辑器，包括Emacs、nano、gedit、vi和vim，以及如何使用vim文本编辑器打开文件，如何在vim中移动光标等内容。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.1%20%E5%B8%B8%E8%A7%81%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%8C%E4%BB%A5%E5%8F%8AVIM%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6%E5%92%8C%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87/3.1%20%E5%B8%B8%E8%A7%81%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%8C%E4%BB%A5%E5%8F%8AVIM%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6%E5%92%8C%E7%A7%BB%E5%8A%A8%E5%85%89%E6%A0%87.mp4'
                            },
                            {
                                label: '3.2 如何使用VIM编辑器',
                                key: '3.2 如何使用VIM编辑器',
                                desc: '这一单元我们主要介绍如何使用vim文本编辑器，包括数据操作，行号的显示和取消，vim中的查找与替换，设置搜索高亮，修改文件撤销或重做，以及如何保存文件并退出等内容。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.2%20%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8VIM%E7%BC%96%E8%BE%91%E5%99%A8/3.2%20%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8VIM%E7%BC%96%E8%BE%91%E5%99%A8.mp4'
                            },
                            {
                                label: '3.3 在Linux查看文件-cat、more、less',
                                key: '3.3 在Linux查看文件-cat、more、less',
                                desc: '这一单元我们主要介绍文本处理的命令，包括如何查看文件，如何筛选文件，如何提取列或者字段，以及如何提取关键字。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.3%20%E5%9C%A8Linux%E6%9F%A5%E7%9C%8B%E6%96%87%E4%BB%B6-cat%E3%80%81more%E3%80%81less/3.3%20%E5%9C%A8Linux%E6%9F%A5%E7%9C%8B%E6%96%87%E4%BB%B6-cat%E3%80%81more%E3%80%81less.mp4'
                            },
                            {
                                label: '3.4 文件摘选和字段提取',
                                key: '3.4 文件摘选和字段提取',
                                desc: '这一单元我们主要介绍查看文件的命令：cat、more和less。Linux文件的摘选命令：head和tail。提取文件中列或者字段的命令：cut。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/03%20%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%8F%8A%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%89%E7%AB%A0/3.4%20%E6%96%87%E4%BB%B6%E6%91%98%E9%80%89%E5%92%8C%E5%AD%97%E6%AE%B5%E6%8F%90%E5%8F%96/3.4%20%E6%96%87%E4%BB%B6%E6%91%98%E9%80%89%E5%92%8C%E5%AD%97%E6%AE%B5%E6%8F%90%E5%8F%96.mp4'
                            }
                        ]
                    },
                    {
                        label: '4 用户和权限管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction4',
                                introduction: [
                                    '本章我们将学习用户和权限管理，帮助大家了解用户和组的基础概念，掌握文件和目录的命令行和权限管理操作，以及文件的特殊访问权限管理。',
                                    '本章我们在介绍时仍然会分为两个部分，理论部分主要讲解用户、用户组和文件权限的基本概念，实验部分会重点锻炼大家对相关管理命令的操作，帮助大家理论联系实际，真正了解和掌握用户和权限管理。',
                                    '本章主要内容包括：',
                                    '1、用户的概念和用户相关的管理命令',
                                    '2、用户组的概念和相关的管理命令',
                                    '3、文件权限的基础概念'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '4.1 用户的概念和相关管理命令',
                                key: '4.1 用户的概念和相关管理命令',
                                desc: '这一单元我们主要介绍用户的概念，以及useradd、usermod、passwd等用户相关的管理命令。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.1%20%E7%94%A8%E6%88%B7%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4/4.1%20%E7%94%A8%E6%88%B7%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4.mp4',

                            },
                            {
                                label: '4.2 用户的管理文件',
                                key: '4.2 用户的管理文件',
                                desc: '这一单元我们主要介绍用户组的概念，以及groupadd、groupmod等用户组管理命令。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.2%20%E7%94%A8%E6%88%B7%E7%BB%84%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%EF%BC%8C%E4%BB%A5%E5%8F%8A%E7%94%A8%E6%88%B7%E7%9A%84%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6/4.2%20%E7%94%A8%E6%88%B7%E7%BB%84%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E7%9B%B8%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%BD%E4%BB%A4%EF%BC%8C%E4%BB%A5%E5%8F%8A%E7%94%A8%E6%88%B7%E7%9A%84%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6.mp4',

                            },
                            {
                                label: '4.3 文件权限的概念及相关操作',
                                key: '4.3 文件权限的概念及相关操作',
                                desc: '这一单元我们主要介绍在openEuler系统中，用户和用户组的基础概念、它们的相关命令、相关文件等等，还将了解到常见的读写权限、执行权限，以及如何针对文件或者目录进行权限的修改。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/04%20%E7%94%A8%E6%88%B7%E5%92%8C%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%9B%9B%E7%AB%A0/4.3%20%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E7%9A%84%E6%A6%82%E5%BF%B5%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C/4.3%20%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E7%9A%84%E6%A6%82%E5%BF%B5%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C.mp4',
                                
                            }
                        ]
                    },
                    {
                        label: '5 安装软件并管理服务',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction5',
                                introduction: [
                                    '本章我们将主要介绍如何在Linux中安装软件并管理服务，帮助大家了解安装软件的两种方式：RPM包安装和源代码安装。',
                                    '理论部分主要讲解两种安装方式的优缺点及特性，实验部分将辅助大家更深入的了解RPM和DNF的操作命令和systemd的管理服务命令。',
                                    '本章主要内容包括：',
                                    '1、RPM、DNF概念和操作命令',
                                    '1、RPM、DNF概念和操作命令',
                                    '3、systemd管理服务'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx'
                            },
                            {
                                label: '5.1 RPM的概念和操作命令',
                                key: '5.1 RPM的概念和操作命令',
                                desc: '这一单元我们主要介绍RPM的概念，以及如何使用RPM命令进行安装、卸载、升级和查询等操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.1%20RPM%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4/5.1%20RPM%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.mp4'
                            },
                            {
                                label: '5.2 DNF的概念和操作命令',
                                key: '5.2 DNF的概念和操作命令',
                                desc: '这一单元我们主要介绍DNF的概念，以及如何添加和启动软件源，如何配置DNF，如何使用DNF查询、安装、删除、升级软件包和软件包组。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.2%20DNF%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4/5.2%20DNF%E7%9A%84%E6%A6%82%E5%BF%B5%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.mp4'
                            },
                            {
                                label: '5.3 RPM和DNF的操作实验',
                                key: '5.3 RPM和DNF的操作实验',
                                desc: '这一单元我们主要介绍配置软件源的实验，以及如何使用RPM命令和DNF命令管理软件。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.3%20RPM%E5%92%8CDNF%E7%9A%84%E6%93%8D%E4%BD%9C%E5%AE%9E%E9%AA%8C/5.3%20RPM%E5%92%8CDNF%E7%9A%84%E6%93%8D%E4%BD%9C%E5%AE%9E%E9%AA%8C.mp4',

                            },
                            {
                                label: '5.4 源代码软件及其安装方法',
                                key: '5.4 源代码软件及其安装方法',
                                desc: '这一单元我们主要介绍源代码软件的概念，以及使用源码安装软件的方法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.4%20%E6%BA%90%E4%BB%A3%E7%A0%81%E8%BD%AF%E4%BB%B6%E5%8F%8A%E5%85%B6%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95/5.4%20%E6%BA%90%E4%BB%A3%E7%A0%81%E8%BD%AF%E4%BB%B6%E5%8F%8A%E5%85%B6%E5%AE%89%E8%A3%85%E6%96%B9%E6%B3%95.mp4',

                            },
                            {
                                label: '5.5 systemd管理服务',
                                key: '5.5 systemd管理服务',
                                desc: '这一单元我们主要介绍systemd管理服务的概念，以及systemd的主命令systemctl的用法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/05%20%E5%AE%89%E8%A3%85%E8%BD%AF%E4%BB%B6%E5%B9%B6%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.5%20systemd%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1/5.5%20systemd%E7%AE%A1%E7%90%86%E6%9C%8D%E5%8A%A1.mp4',

                            }
                        ]
                    },
                    {
                        label: '6 管理文件系统及存储',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction6',
                                introduction: [
                                    '存储是IT领域中非常重要的一部分，它被用来保存各种各样的数据，本章的课程将会在理论部分介绍与存储相关的一些概念，包括文件系统、磁盘类型、逻辑卷等，同时也会在实验部分演示如何使用它们对数据进行保存。',
                                    '本章主要内容包括：',
                                    '1、文件系统简介',
                                    '2、openEuler文件系统及相关操作',
                                    '3、MBR操作演示',
                                    '4、GPT分区演示',
                                    '5、逻辑卷管理和操作演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx'
                            },
                            {
                                label: '6.1 文件系统简介',
                                key: '6.1 文件系统简介',
                                desc: '这一单元我们主要介绍文件系统的基本概念，以及分区的含义。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.1%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B/6.1%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%AE%80%E4%BB%8B.mp4',

                            },
                            {
                                label: '6.2 openEuler文件系统及相关操作',
                                key: '6.2 openEuler文件系统及相关操作',
                                desc: '这一单元我们主要介绍文件系统和存储相关的知识，以及磁盘存储的挂载和使用方法。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.2%20openEuler%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C/6.2%20openEuler%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C.mp4',

                            },
                            {
                                label: '6.3 MBR操作演示',
                                key: '6.3 MBR操作演示',
                                desc: '这一单元我们主要介绍如何进行MBR的分区的实验操作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.3%20MBR%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA/6.3%20MBR%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4',

                            },
                            {
                                label: '6.4 GPT分区演示',
                                key: '6.4 GPT分区演示',
                                desc: '这一单元我们主要介绍如何进行GPT的分区模式。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.4%20GPT%E5%88%86%E5%8C%BA%E6%BC%94%E7%A4%BA/6.4%20GPT%E5%88%86%E5%8C%BA%E6%BC%94%E7%A4%BA.mp4',

                            },
                            {
                                label: '6.5 逻辑卷管理',
                                key: '6.5 逻辑卷管理',
                                desc: '这一单元我们主要介绍逻辑卷相关的一些概念，以及如何管理逻辑卷和动态调整逻辑卷。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.5%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86/6.5%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86.mp4',

                            },
                            {
                                label: '6.6 逻辑卷管理操作演示',
                                key: '6.6 逻辑卷管理操作演示',
                                desc: '这一单元我们主要介绍如何创建一个LV，也就是如何创建一个逻辑卷。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/06%20%E7%AE%A1%E7%90%86%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%8F%8A%E5%AD%98%E5%82%A8.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AD%E7%AB%A0/6.6%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA/6.6%20%E9%80%BB%E8%BE%91%E5%8D%B7%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4',

                            }
                        ]
                    },
                    {
                        label: '7 系统管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction7',
                                introduction: [
                                    '在Linux系统中你可能已经发现了为什么系统常常会自动地进行一些任务？这些任务到底是谁在支配他们工作的？本章的课程将简单介绍几个系统管理的操作，包括计划任务、网络管理及进程管理。',
                                    '我们同样会采用理论加实验的方式，帮助大家更直观地理解系统管理，并掌握它的操作。',
                                    '本章主要内容包括：',
                                    '1、计划任务管理',
                                    '2、at和crontab演示',
                                    '3、网络管理和演示',
                                    '4、进程管理和演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.1 计划任务管理',
                                key: '7.1 计划任务管理',
                                desc: '这一单元我们主要介绍计划任务管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.2 at和crontab演示',
                                key: '7.2 at和crontab演示',
                                desc: '这一单元我们主要介绍计划任务管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.3 网络管理',
                                key: '7.3 网络管理',
                                desc: '这一单元我们主要介绍网络管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.4 网络管理演示',
                                key: '7.4 网络管理演示',
                                desc: '这一单元我们主要介绍网络管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '7.5 进程管理',
                                key: '7.5 进程管理',
                                desc: '这一单元我们主要介绍进程管理的理论部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.5%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86/7.5%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86.mp4'
                            },
                            {
                                label: '7.6 进程管理演示',
                                key: '7.6 进程管理演示',
                                desc: '这一单元我们主要介绍进程管理的实验部分。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/07%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B8%83%E7%AB%A0/7.6%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA/7.6%20%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E6%BC%94%E7%A4%BA.mp4'
                            }
                        ]
                    },
                    {
                        label: '8 使用shell脚本',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction8',
                                introduction: [
                                    '在这一章课程中，我们将会学习如何使用shell脚本，首先是shell基础知识，包括shell脚本的定义，构成等等内容，其次我们会介绍一些shell编程基础，包括标准输入、标准输出，管道、运算、变量、字符等等内容 ，我们还将学习如何编写常用的shell脚本，包括如何调试shell脚本，以及shell脚本的编写风格等等内容。',
                                    '本章我们将同样按照之前的课程设计，分为理论和实验两个部分，理论部分我们将简单介绍shell脚本的作用，并基于基本架构，对其架构进行讲解，然后会对其工作原理和流程进行深入学习。实验部分主要锻炼学员对于shell编程的基本运用，帮助大家理论联系实际，真正掌握shell脚本知识。',
                                    '本章主要内容包括：',
                                    '1、shell编程的基础，包括shell脚本输入、输出、重定向和管道等等',
                                    '2、shell编程中的字符、变量和运算',
                                    '3、shell编程的语句，包括循环语句和条件语句等等'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx'
                            },
                            {
                                label: '8.1 Shell编程基础',
                                key: '8.1 Shell编程基础',
                                desc: '这一单元我们主要介绍shell编程的基础，包括shell脚本输入、输出、重定向和管道等等。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.1%20Shell%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/8.1%20Shell%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80.mp4',

                            },
                            {
                                label: '8.2 字符、变量和运算',
                                key: '8.2 字符、变量和运算',
                                desc: '这一单元我们主要介绍shell编程中的字符、变量和运算。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.2%20%E5%AD%97%E7%AC%A6%E3%80%81%E5%8F%98%E9%87%8F%E5%92%8C%E8%BF%90%E7%AE%97/8.2%20%E5%AD%97%E7%AC%A6%E3%80%81%E5%8F%98%E9%87%8F%E5%92%8C%E8%BF%90%E7%AE%97.mp4',

                            },
                            {
                                label: '8.3 Shell编程语句',
                                key: '8.3 Shell编程语句',
                                desc: '这一单元我们主要介绍shell编程的语句，包括循环语句和条件语句等等。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/08%20%E4%BD%BF%E7%94%A8shell%E8%84%9A%E6%9C%AC.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E5%85%AB%E7%AB%A0/8.3%20Shell%E7%BC%96%E7%A8%8B%E8%AF%AD%E5%8F%A5/8.3%20Shell%E7%BC%96%E7%A8%8B%E8%AF%AD%E5%8F%A5.mp4',

                            }
                        ]
                    },
                    {
                        label: '9 Samba文件共享服务器管理',
                        children: [
                            {
                                label: '本章导读',
                                key: 'introduction9',
                                introduction: [
                                    '本章是整个课程的最后一章，将为大家演示整个综合实验。通过对前几章内容的综合运用，来完成Samba文件共享服务的搭建和使用。',
                                    '本章主要内容包括：',
                                    '1、综合实验背景介绍',
                                    '2、综合实验演示'
                                ],
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx'
                            },
                            {
                                label: '9.1 综合实验背景介绍',
                                key: '9.1 综合实验背景介绍',
                                desc: '这一单元我们主要介绍Samba服务器的架构和工作原理，了解如何配置Samba对应的目录的一些用户以及权限，并使用前八章学习的知识做一些简单的运维工作。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B9%9D%E7%AB%A0/9.1%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E8%83%8C%E6%99%AF%E4%BB%8B%E7%BB%8D/9.1%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E8%83%8C%E6%99%AF%E4%BB%8B%E7%BB%8D.mp4'
                            },
                            {
                                label: '9.2 综合实验演示',
                                key: '9.2 综合实验演示',
                                desc: '这一单元我们主要介绍如何搭建Samba文件共享服务器。',
                                ppt_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/PPT/09%20Samba%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AE%A1%E7%90%86.pptx',
                                video_link: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E8%A7%86%E9%A2%91%E5%8F%8A%E5%AD%97%E5%B9%95%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89/%E7%AC%AC%E4%B9%9D%E7%AB%A0/9.2%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E6%BC%94%E7%A4%BA/9.2%20%E7%BB%BC%E5%90%88%E5%AE%9E%E9%AA%8C%E6%BC%94%E7%A4%BA.mp4'
                            }
                        ]
                    },
                ]
            }
        ]
    }
 }