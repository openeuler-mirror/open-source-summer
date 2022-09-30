---
title: "Contribution"
---
<ClientOnly>
  <community-contributionDetail />
</ClientOnly>

<div class="markdown">

Welcome to openEuler!

## 1. Experience openEuler
### 1.1 Experience the openEuler OS

Experience the openEuler OS in any of the following ways:

- [Public cloud](https://huaweicloud.com/intl/en-us/product/ecs.html)
- [Virtual machine](https://docs.openeuler.org/en/docs/20.03_LTS/docs/Virtualization/virtualization.html)
- [Hardware](https://docs.openeuler.org/en/docs/20.03_LTS/docs/Installation/Installation.html)
- [Raspberry Pi](https://gitee.com/openeuler/raspberrypi/blob/master/README.en.md)

### 1.2 Experience Original Open Source Projects

Experience a range of original open source projects in the openEuler community.

- [StratoVirt](https://www.openeuler.org/en/other/projects/stratovirt/)：An enterprise-grade virtualization platform intended for cloud data centers.
- [A-Tune](https://www.openeuler.org/en/other/projects/atune/)：An AI-based intelligent tuning engine.
- [iSula](https://www.openeuler.org/en/other/projects/isula/)： A lightweight container solution.
- [secGear](https://www.openeuler.org/en/other/projects/secgear/)：A confidential computing security application development suite for the computing industry.
- [pkgship](https://pkgmanage.openeuler.org/)：A query tool that manages OS software package dependencies and provides detailed dependency graphs.
- [BiSheng JDK](https://www.openeuler.org/en/other/projects/bishengjdk/):The open source version of Huawei JDK that is developed on the OpenJDK framework. It is a high-performance OpenJDK release that can be used in production environments.
- [Compass-CI](https://compass-ci.openeuler.org/): An open source software platform for sustainable integration, building an open and complete test system.

## 2. Sign the CLA

Sign the openEuler community Contributor License Agreement (CLA) before starting community contributions.
Choose an individual CLA, employee CLA, or corporation CLA based on your participation status (click [here](https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=))

- Individual CLA: Join the community as an individual.
- Corporation CLA: Join the community as a corporation.
- Employee CLA: Join the community as an enterprise employee.

## 3. Join the openEuler Community
### 3.1 Participate in Community Activities

Learn about and participate in a variety of community activities.

- [Meeting](https://www.openeuler.org/en/#meeting)：View the public meeting schedule of Special Interest Groups (SIGs) on the openEuler homepage and join the meetings you are interested in.
- [Meetups](https://www.openeuler.org/en/interaction/salon-list/)
- [Live](https://www.openeuler.org/en/interaction/live-list/)
- [Summit](https://www.openeuler.org/en/interaction/summit-list/summit2021/)

### 3.2 Find the SIGs to Participate In
#### 3.2.1 Learn About SIGs and Find the SIGs You Are Interested In
The openEuler community is organized into SIGs to better manage the work processes. SIGs are open to anyone, and finding your perfect SIG is the first step to contributing to community affairs.
Currently, the openEuler community has more than 70 SIGs. View the openEuler [SIG list](https://www.openeuler.org/en/sig/sig-list/) to find the SIG you want to join.
If you cannot find the SIG that you are interested in, send an email to [community@openeuler.org](mailto:community@openeuler.org) It is recommended that you use "[Development Process Issue]" as the heading of the mail and describe the SIGs or projects you are looking for.

#### 3.2.2 Start a New SIG

If you fail to find the SIGs you are interested in and want to start a new SIG for maintenance and development in the openEuler community, refer to [Application Process](https://www.openeuler.org/en/sig/sig-guidance/).

### 3.3 Engage in Community Contributions

Once you sign the [CLA](https://clasign.osinfra.cn/sign/Z2l0ZWUlMkZvcGVuZXVsZXI=) and join a [SIG](https://www.openeuler.org/en/sig/sig-list/) you can start your contribution journey. Any contribution, big or small, are welcomed and valued by the community.
##### 1.Submit and Address Issues

- Find the issue list.
  On the Gitee homepage of the SIG project you are interested in, click Issues（for example, the issues of the [Community](https://gitee.com/openeuler/community/issues)) project.
- Submit an issue.  
  If you want to report bugs, submit requests, or contribute your comments or suggestions to the openEuler community, submit an issue in the corresponding repository of the openEuler community.  
  For details about how to submit an issue, see the [Issue Submission Guide](https://gitee.com/openeuler/community/blob/master/en/contributors/issue-submit.md). To attract more attention, you can also attach the issue link in an email and send it to everyone through the [Mailing Lists](https://www.openeuler.org/en/community/mailing-list/).
- Participate in the discussion on an issue.  
  There are discussions among participants under each issue. If you are interested in an issue, you can also post your comments in the comment box.
- Find the issues that you want to address.  
  If you want to work on one of those issues, you can assign it to yourself. Type /assign or /assign @your_account_name in the comment box. The system will assign the issue to you and your name will appear in the owner list.

##### 2.Contribute Code  

- Prepare the openEuler development environment.  
  Prepare an openEuler development environment before contributing code. For details, see [Preparing the Development Environment](https://gitee.com/openeuler/community/blob/master/en/contributors/prepare-environment.md).
- Understand the development precautions of the SIG and the project.  
  The coding languages, development environments, and coding conventions used by projects of each SIG may vary. If you want to learn about and contribute code, find the project's contributor guide for developers – which is generally available as a CONTRIBUTING.md file on the SIG's homepage, or just in README.md of the project.
- Download code and pull a branch.  
  Before contributing code, learn how to download code from Gitee and merge code through pull requests (PRs). openEuler code is hosted on the Gitee platform. For details, see [Gitee Workflow](https://gitee.com/openeuler/community/blob/master/en/contributors/Gitee-workflow.md). Gitee is similar to GitHub. If you have used GitHub before, skip this section.
- Perform modification, building, and local validation. 
  After the modification is complete on the local branch, build and verify the local branch by referring to [Software Package Building](https://gitee.com/openeuler/community/blob/master/en/contributors/package-install.md).
- Create a PR.  
  Creating a PR means that you are contributing code to the community. For details, see [Creating a Pull Request.](https://gitee.com/openeuler/community/blob/master/en/contributors/pull-requests.md) 
  To make your PR easier to be accepted, you need to:  
	- Follow the coding conventions (if any) of the SIG.  
	- Write good commit messages.  
	- If you want to commit a large amount of code at a time, it is recommended that you divide the code into a series of smaller pieces, which will make it easier for reviewers to understand your ideas. 
	- Mark the PR with appropriate SIG and monitor tags. The CI Bot will walk you through the PR process.  

   Note: If your PR does not attract enough attention, you can ask for help through the SIG mailing list or 
     [dev@openeuler.org](mailto:dev@openeuler.org).

##### 3.Contribute a Package  
If you find that openEuler is missing any software package, you can contribute the software package to the openEuler community. Contributing software packages enhances openEuler functionalities, making openEuler a software ecosystem with anything you need. When a software package is added to openEuler on Gitee, a repository with the same name will be created in openEuler:Factory of OBS. When code is committed to the created Gitee repository, the code compilation is automatically checked. For details, see [Adding a New Software Package](https://gitee.com/openeuler/community/blob/master/en/contributors/create-package.md).  
##### 4.Contribute Original Open Source Projects  
If you want to contribute your original open source project to the openEuler community and make it a part of the openEuler release, you can use either of the following methods:  
- Method 1: Develop a project in another community and integrate it into openEuler. 
  Assuming that you already have your own projects on GitHub, GitLab, or Gitee, simply add the software to the src-openeuler repository by referring to [Adding a New Software Package](https://gitee.com/openeuler/community/blob/master/en/contributors/create-package.md).
- Method 2: Develop and integrate a project in openEuler.  
  Creating original projects directly at [https://gitee.com/openeuler](https://gitee.com/openeuler) is similar to "hosting" projects to the openEuler community, such as iSula and A-Tune.
  If you have a great idea that you want to implement in the openEuler community, follow the procedure below to get deeply involved in the openEuler community.  
  1.Apply for an open source project in [regular meetings of the Technical Committee (TC)](https://www.openeuler.org/en/sig/sig-list/sig-detail.html?id=21&name=TC&mail=dev%40openeuler.org).  
  2.If the TC evaluates that it is a good idea and deserves to be promoted, you can set up a repository at [https://gitee.com/openeuler](https://gitee.com/openeuler).  
  3.The project will be continuously developed and incubated in openEuler until it matures. Then create a repository in src-openeuler to provide relevant spec files for the project and create an RPM file.  
  4.Eventually, your original open source project will be used by people around the world with openEuler releases.

##### 5.Review Code
openEuler is an open community and everyone involved is expected to be active reviewers. When you are a committer or maintainer of a SIG, you have the responsibility and permission to review code. 
Everyone in the community is encouraged to pursue excellence and promote collaboration on the ground of the [Code of Conduct](https://gitee.com/openeuler/community/blob/master/code-of-conduct.md) and mutual respect.[ The Gentle Art Of Patch Review ](https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/) lists a series of review highlights. Code review activities are expected to promote the active participation of new contributors without causing the contributors to be overwhelmed by minor errors at the beginning. Therefore, during the review, focus on the following:

&nbsp;&nbsp;1.Whether the idea behind the contribution is reasonable. 

&nbsp;&nbsp;2.Whether the contribution architecture is correct.

&nbsp;&nbsp;3.Whether the contribution is complete.  

##### 6.Test 
Testing is the responsibility of all contributors. For the community version, [sig-qa group](https://gitee.com/openeuler/QA) is the official community organization responsible for testing activities. If you want to test on your own infrastructure, refer to [Introduction to the Community Test System](https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E6%B5%8B%E8%AF%95%E4%BD%93%E7%B3%BB%E4%BB%8B%E7%BB%8D.md) . 
To successfully release a community version, you need to complete multiple test activities. The location of the test code varies according to the test activity, so do the details of the environment required for successful test running. For details, see [Test Contribution Guide for Community Developers](https://gitee.com/openeuler/QA/blob/master/%E7%A4%BE%E5%8C%BA%E5%BC%80%E5%8F%91%E8%80%85%E6%B5%8B%E8%AF%95%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.md).  
##### 7.Package Community Components 
You can also participate in community component packaging. For details, see [openEuler Packaging Guide](https://gitee.com/openeuler/community/blob/master/en/contributors/packaging.md).
##### 8.Participate in Non-Code Contributions
If your interest is not in writing code, you can find work of interest in the [ Non-Code Contributions](https://gitee.com/openeuler/community/blob/master/en/contributors/non-code-contributions.md).  
##### 9.Community Security Issues  
[Security Issue Handling Process](https://gitee.com/openeuler/security-committee/blob/master/%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B.jpg) briefly describes the process of handling security issues.  
[Security Disclosure](https://gitee.com/openeuler/security-committee/blob/master/security-disclosure.md) describes how to report a security vulnerability. 

## 4. Grow with the Community
### 4.1 Community Roles

Everyone in the community plays an important part. Roles differ in terms of responsibilities and permissions. Grow, accumulate experience, and gain influence by contributing to the community. For details about roles, responsibilities, and permissions, see [Community Membership](https://gitee.com/openeuler/community/blob/master/community-membership.md).

### 4.2 Technical Committee

The openEuler Technical Committee (TC) is the technical decision-making body of the openEuler community. It is responsible for technical decision-making and coordination of technical resources in the openEuler community.  
<br/>
For details, see the introduction to the [openEuler Technical Committee](https://www.openeuler.org/en/sig/sig-list/sig-detail.html?id=21&name=TC&mail=dev%40openeuler.org).

</div>