---
title: openEuler社区SIG组成员管理方案
date: 2022-04-26
tags:
    - openEuler
    - SIG组成员管理
archives: 2022-04
author: georgecao
summary: openEuler 社区SIG组成员管理方案细节。
---

# openEuler社区SIG组成员管理方案
## 社区SIG成员角色划分
通过和多个sig组讨论，并报TC确认，openEuler社区SIG组成员角色做如下划分：
| 角色 | 定位 |
|--|--|
| Maintainer | 定位是SIG组的牵引者、规划者，努力做好SIG组的发展和演进；负责定期组织SIG组会议、并代表SIG组向社区展示SIG组情况；|
| Committer| SIG组部分仓库的看护者；作为这部分仓库的第一责任人；	Committer也是SIG组Maintainer的后备力量；|
|Contributor|SIG组部分仓库的重要贡献者，也是这部分仓库Committer的后备力量；通常也是这部分代码仓库问题主要修复者和代码开发者；|
|Developer|社区最广泛的代码贡献者；在社区长期贡献可自荐或被推荐为仓库Contributor，甚至Committer；|
|RepoAdmin|1.社区部分自研代码仓库需要git push权限，会对这些仓库设置Admin权限；通常是SIG组maintainer兼任，对这部分仓库的代码合入全量负责；|

## SIG组成员权责划分
根据不同角色，在社区（特别是在gitee代码托管平台）承担不同的权责：
|SIG成员角色|sig_info.yaml记录| 代码提交 |评论/approve合入|git push合入 |
|--|--|--|--|--|
| Maintainer | ✔️ | ✔️ [全部仓库] | ✔️ |❌|
| Committer| ✔️ |✔️  | ✔️ [部分仓库] | ❌ |
| Contributor| ✔️ |✔️ |❌ |❌  |
| Developer| ❌ | ✔️ | ❌ |  ❌|
| Repo_Admin| ✔️ | ✔️ | ✔️ [部分仓库] | ✔️[部分仓库]  |

## 成员管理方案

 1. 每个SIG组新增sig_info.yaml文件作为社区成员管理载体；
    
 2. 只有当前SIG目录下OWNER文件被删除后，sig_info.yaml信息才会生效；OWNER文件存在时继续保持原成员关系和权限管控功能；
 3. sig_info.yaml中需要有全局的Maintainer，对sig组所有仓库都有合入权限（继承原Maintainer逻辑）；——必选项
 4. 可以在部分仓库下添加这些仓库特有的Committer，仅有这一部分仓库的合入权限；——可选项
 5. 部分仓库下可新增Contributor字段，无代码合入权限；作为仓库的主要贡献者列出；——可选项
 6. 部分仓库下新增Admin字段, 对这部分仓库具有管理员权限，可通过git push合入代码；——可选项；
 7. 为缓解各sig组提交sig_info.yaml的困难，门禁组会按照当前OWNER文件信息和仓库信息，自动为  sig组创建sig_info.yaml


## 如何编写sig_info.yaml文件
###  手动编写sig-info.yaml 文件

sig-info.yaml 文件为yaml格式承载，包含如下基本元素：
| 字段 | 类型 | 说明 |
|--|--|--|
| name | 字符串 | SIG组名称 ,必填|
| description | 字符串 | SIG组描述信息，必填 |
| created_on| 字符串 | SIG组创建时间，选填 |
| mailing_list | 字符串 | SIG组讨论邮件列表地址，选填 |
| meeting_url | 字符串 | SIG例会纪要URL，选填 |
| mentors | 列表 | SIG组当前导师名单，选填 |
| maintainers | 列表 | SIG组所有maintainer名单 |
| repositories| 列表 | SIG组所管辖的码云仓库信息 |

其中 mentors 列表中每一条记录代表一位 mentor 的个人信息，maintainers 列表中每一条记录代表一位 maintainer 的个人信息。每一条个人信息记录包含如下元素：
| 字段 | 类型 | 说明 |
|--|--|--|
| gitee_id | 字符串 | gitee ID, 必填 |
| name | 字符串 | 姓名(或者网名), 必填 |
| organization| 字符串 | 所在组织或单位, 选填 |
| email| 字符串 | 个人邮箱地址, 选填 |

其中 repositories 字段为列表，其中每一个列表元素为SIG所管理的一组仓库信息，包括以下四个字段：
| 字段 | 类型 |  说明 |
|--|--|--|
| repo | 列表 | 该SIG管理的一组仓库名称组成的数组，必填 |
| committers| 列表 | 这一组仓库共同的committer成员们，选填 |
| contributors| 列表 | 这一组仓库共同的contributors成员们，选填  |
| repo_admin| 列表 | 这一组仓库共同的repo admin成员们，选填  |

以上信息中repo为仓库名称数组，其余committers/contributors/repo_admin都是成员数组，其中单个元素表示一条个人信息，同上文maintainer信息：
| 字段 | 类型 | 说明 |
|--|--|--|
| gitee_id | 字符串 | gitee ID, 必填 |
| name | 字符串 | 姓名(或者网名), 必填 |
| organization| 字符串 | 所在组织或单位, 选填 |
| email| 字符串 | 个人邮箱地址, 选填 |

其中committers拥有对应repo组下所有仓库的代码审核权限，contributors是该repo组下所有仓库的主要贡献者。

#### sig-info.yaml 样例：
```
name: Infrastructure
description: This is a sample sig. Please copy it over and modify it accordingly.
created_on: '1970-01-01'
mailing_list: infra@openeuler.org
meeting_url: NA
mature_level: startup
mentors:
- gitee_id: batMan
  name: Wayne
  email: aaaaaaa@openeuler.org
maintainers:
- gitee_id: Joe
  name: JoeDou
  organization: RealT
  email: yyyyyyy@qq.com
- gitee_id: Jane
  name: JaneDou
  email: xxxxxxx@gmail.com
repositories:
- repo: 
  - openeuler/infrastructure
  - openeuler/website
  - openeuler/website-v2
  committers:
  - gitee_id: Bob
    name: BobMa
    email: zzzzzzz@yahoo.com
  contributors:
  - gitee_id: infra_superman
    name: Clark_Ken
    orgnization: Justice_L
    email: zzzzzzz@openeuler.org
- repo: 
  - openeuler/cve-manager
  - openeuler/tool-collections
  - openeuler/go-gitee
  - openeuler/gitbook-theme-hugo
  - cve-manager
  committers:
  - gitee_id: tommyliu
    name: Tommy
    email: zzzzzzzhh@163.com
  repo_admin:
  - gitee_id: lisa993
    name: LisaLi
    email: lililisa@qq.com
```
### 自动生成sig_info.yaml样板后手动补充
基础设施提供自动化脚本可以快速生成相关SIG组的配置管理文件sig_info.yaml。
其中maintainer信息的gitee_id来源与owner文件，repositories中仓库信息来源于sig目录下所有仓库配置信息。其余信息只是格式化模板，需要用户自行完善；
#### 命令使用方法：
 - git clone https://gitee.com/openeuler/community.git  获取community仓库代码
 - cd community/sig/ 跳转到sig管理目录
 - python3 create_sig_info_template.py xxx  在对应SIG组文件夹内创建sig_info.yaml文件模板，其中 xxx 为SIG组名称，如Infrastructure，A-Tune等
 - 进入对应SIG组文件夹，修改sig_info.yaml模板中相关内容
 - 提交sig_info.yaml修改
