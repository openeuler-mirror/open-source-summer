---
title: SIG Member Management Solution for the openEuler Community
date: 2022-04-26
tags:
    - openEuler
    - SIG Member Management
archives: 2022-04
author: georgecao
summary: Details about the SIG member management solution for the openEuler community.
---

# SIG Member Management Solution for the openEuler Community
## Roles of Community SIG Members
Following discussion with multiple SIGs and the Technical Committee, the roles of openEuler community SIG members are divided as follows:
| Role| Responsibility |
|--|--|
| Maintainer | SIG planner who is responsible for driving the vision of the SIG, regularly organizing SIG meetings, and presenting the SIG status to the community on behalf of the SIG.|
| Committer| Principal owner of a SIG repository. Committers are also reserve forces for maintainers in the SIG.|
|Contributor|Contributor to a SIG repository, who is responsible for fixing repository issues and developing code and is a backup for committers.|
|Developer|Contributor to the community. Those who have made long-term contributions to the community can recommend themselves or be recommended as repository contributors or even committers.|
|RepoAdmin|Some self-developed code repositories of the community require the git push permission, and therefore the Admin permission is set for these repositories. In most cases, the SIG maintainer assumes this role and is responsible for the full code incorporation of these repositories.|

## Division of Rights and Responsibilities of SIG Members
Different roles have different rights and responsibilities in the community (especially on the Gitee platform).
|SIG Member Role|Record sig_info.yaml| Submit Code|Comment "/approve" to Merge PRs|Merge git push|
|--|--|--|--|--|
| Maintainer | ✔️ | ✔️ [All repositories] | ✔️ |❌|
| Committer| ✔️ |✔️  | ✔️ [Some repositories]| ❌ |
| Contributor| ✔️ |✔️ |❌ |❌  |
| Developer| ❌ | ✔️ | ❌ |  ❌|
| RepoAdmin | ✔️ | ✔️ | ✔️ [Some repositories]| ✔️ [Some repositories]  |

## Member Management Solution

 1. A **sig_info.yaml** file is added to each SIG for managing community members.  
    
 2. The **sig_info.yaml** file takes effect only after the OWNER file in the current SIG directory is deleted. If the OWNER file exists, the original member relationship and permission control functions are retained.  
 3. (Mandatory) The **sig_info.yaml** file must be assigned with a global maintainer who has the merge permission on all repositories in the SIG (inheriting the original maintainer logic).  
 4. (Optional) Specific committers can be added to some repositories. These committers only have merge permission on these repositories.  
 5. (Optional) Contributors without merge permission can be added to some repositories.  
 6. (Optional) Admins with administrator permission can be added to some repositories. These users can use the git push function to merge code.  
 7. The access control group creates **sig_info.yam**l for each SIG based on the OWNER file and repository information.  


## How to Compile the sig_info.yaml File
###  Manually Compiling the sig_info.yaml File

The **sig_info.yaml** file contains the following basic elements:
| **Field**| Type| Description|
|--|--|--|
| name | String| (Mandatory) SIG name|
| description | String| (Mandatory) SIG description|
| created_on| String| (Mandatory) SIG creation time|
| mailing_list | String| (Optional) Email list address for the SIG discussion|
| meeting_url | String| (Optional) URL of SIG regular meeting minutes|
| mentors | List| (Optional) List of current SIG mentors |
| maintainers | List| List of all maintainers in the SIG|
| repositories| List| Information about the Gitee repositories managed by the SIG|

Each record in the **mentors** list and **maintainers** list represents the personal information of a mentor and a maintainer, respectively. Each record contains the following elements:  
| **Field**| Type| Description|
|--|--|--|
| gitee_id | String| (Mandatory) Gitee ID|
| name | String| (Mandatory) Name (or nickname)|
| organization| String| (Optional) Organization|
| email| String| (Optional) Personal email address|

The **repositories** field is a list. Each element in the list represents the information about a group of repositories managed by the SIG, including the following four fields:  
| **Field**| Type|  Description|
|--|--|--|
| repo | List| (Mandatory) Array consisting of names of repositories managed by the SIG |
| committers| List| (Optional) Common committers of the repositories |
| contributors| List| (Optional) Common contributors of the repositories |
| repo_admin| List| (Optional) Common repo admins of the repositories |

**repo** is an array of repository names, and **committers**/**contributors**/**repo_admin** are member arrays. Each element indicates a piece of personal information, which is the same as the maintainer information.  

| **Field**| Type| Description|
|--|--|--|
| gitee_id | String| (Mandatory) Gitee ID|
| name | String| (Mandatory) Name (or nickname)|
| organization| String| (Optional) Organization|
| email| String| (Optional) Personal email address|

Committers have the permission to review the code of all repositories in the corresponding repo group, while contributors are the main contributors of all repositories in the repo group.  

#### sig_info.yaml example:
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
### Filling Out the **sig_info.yaml** Template
The infrastructure provides an automation script to quickly generate the configuration management file **sig_info.yaml** of the related SIG.  
The gitee_id of the maintainer comes from the OWNER file, and the repository information in repositories comes from all repository configurations in the **sig** directory. Other information exists on a formatted template and needs to be completed manually.  

#### Using Commands to Submit the sig_info.yaml Template  
 - Obtain the community repository code.

**git clone https://gitee.com/openeuler/community.git**

 - Go to the SIG management directory.
   
**cd community/sig/**
   
 - Create a **sig_info.yaml** file template in the corresponding SIG folder.
   
**python3 create_sig_info_template.py** *xxx* (*xxx* indicates the SIG name, such as Infrastructure or A-Tune)
   
 - Go to the corresponding SIG folder and modify the **sig_info.yaml** template.  

 - Submit the modified **sig_info.yaml** file.  
