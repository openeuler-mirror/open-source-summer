---
title: Open Source Community Internship—Porting openEuler to Windows WSL
date: 2021-07-28
tags: 
    - WSL
    - Porting
archives: 2021-07
author: ouyanghaitao
summary: Porting openEuler to Windows Subsystem for Linux (WSL)
---

# Open Source Internship Report—Porting openEuler to Windows WSL


## Joining Huawei and Determining My Objective  

My name is Wang Haitao, a third-year student in computer science of Harbin Institute of Technology (Shenzhen).  

To prepare for the Computer System Capability Challenge 2021, my supervisor suggested I first participate in RISC-V contests to gain experience writing a kernel from scratch. So, during the 2020 winter vacation, I participated in the openEuler 2020 College Developer Competition with the topic "Add the Grub boot mode for openEuler-RISC-V". This task required me to install openEuler, register a Gitee account, use QEMU to emulate RISC-V, and understand the ins and outs of Grub, giving me invaluable knowledge of the OS boot process. More importantly, I met contributors of the openEuler open source community, which helped me integrate myself with core members.  

With curiosity about the openEuler community and longing for an internship in Huawei, I sent my resume to Huawei's Open Source Development & Operations Dept., the branch responsible for running Huawei's four open source communities. After three months of waiting, I finally received an internship offer from Huawei with an opportunity to work on the back-end of the openEuler community.  

After just a few days, I discovered that the Windows Subsystem for Linux (WSL), a native virtualization solution of Microsoft commonly used in schools, did not support openEuler. WSL can run different mainstream Linux distros with faster speed and fewer drives on Windows, so I was surprised to see the lack of compatibility.  


The thought came to me—I can solve this problem. I told my supervisors, and they were very encouraging. This conversation signaled the start of my first internship task—porting an openEuler distro to WSL.  

## Creating the Installation Package

After reading the WSL documentation, I was confident that any Linux distro can be imported into WSL, meaning there are no restrictions on openEuler.  

First, I needed to import the root file system of the Linux distro using the WSL commands. Microsoft recommends that users use the official Docker image of the Linux distro and run the docker export command after starting the container to export the snapshot of the container image as the required root file system.  

On the download section of the official openEuler website, each openEuler distro has a corresponding Docker image. I downloaded the Docker image of [openEuler 20.03 LTS SP1](https://repo.openeuler.org/openEuler-20.03-LTS-SP1/docker_img/x86_64/) and performed operations recorded in the WSL document. The next day, I started openEuler on WSL.  

It took me a few days to successfully compile the installation package. Normally, I just need to double-click the installation package to install the WSL version of openEuler in Windows.  

But when I tried to upload the project code to the openEuler community for archiving, I found the code needed to be mounted to a SIG.  

That brings us to the first problem—there was no SIG related to WSL. To set up a SIG on openEuler, I needed to submit an application through the email list of the technical committee (TC). So I sent an email to the open source TC and asked how to create a WSL SIG, who replied there was no need to create a WSL SIG, and suggested I join the OS-builder SIG. Later, I attended the OS-builder SIG's biweekly meeting, presented the porting work and problems, and with help from other members, successfully created the WSL repository under OS-builder.  

There was an interesting episode. After I sent the application email, I received an email from Mr. Yuan, the maintainer of SIG-minzuchess and contributor to the popularization of Raspberry Pi for middle schools. He asked me if I could accept an interview about the WSL project. I was flattered at that time and excited. In the interview, I first introduced the progress of porting openEuler to WSL and some basic Linux knowledge. Then, I shared my experience and lessons learned from the college entrance examination to Harbin Institute of Technology (Shenzhen) and colorful college life ([Interview link](https://gitee.com/yuandj/siger/blob/master/%E7%AC%AC10%E6%9C%9F%20%E5%8D%97%E5%BE%81%E5%8C%97%E6%88%98%EF%BC%88%E4%B8%8A12%EF%BC%89.md#%E4%B8%80%E5%B0%81%E9%9D%A2%E6%95%85%E4%BA%8B%E9%98%B3%E5%85%89%E6%B5%B7%E6%B6%9B)).  

My code needed to be tested before being submitted. But I was unsure how to do it. To address this, I participated in the regular meetings of the Quality Assurance (QA) and release-management SIGs, who suggested I use the latest mugen test framework and integration-test scripts to test the system. This helped me find another issue – a bug in the script. The test allowed me to fix a bug in the test script by adding a space between the grep command and the file name, before I submitted a PR. It was not a major bug, but still, I was excited about this small achievement.  

The test result shows that all test cases in the os-basic folder pass the test, but half of the overall test cases fail. The error logs show that WSL does not have certain native Linux functions, preventing many functions from being enabled and causing related tests to fail. For example, WSL does not support systemctl, and most test scripts need to use systemctl to enable system functions before testing, meaning WSL cannot pass these tests. Despite the failed tests, no problems were found after the ported openEuler is used for a while, indicating that the normal use of the openEuler is not affected.  

When I waited for the PR of my tested code, submitted to the WSL repository, to be incorporated, I considered submitting the installation package to the Microsoft Store.  

## Seeking Help

Before releasing the openEuler installation package on Microsoft Store, I needed to solve some non-technical problems. The community is the best place to seek help.  

Although the installation package is complete, the logo displayed on the start menu is not as good as that of Ubuntu. The openEuler logo consists of the blue letter E and the black character openEuler at the bottom. Two problems: one, the icon with text is small in the Microsoft start menu; and two, the black text is not clear in the background when the Windows dark mode is enabled.  

A simple solution was to delete the text on the logo and then zoom in on the logo. But a colleague reminded me that the logo without the text may be illegal. I confirmed this with a lawyer from Huawei's legal affairs department, who said it was not a violation of the official standard and gave me a screenshot of the trademark search report. Every time I think of this logo, it reminds me that I must consider compliance when developing anything for the open source community.  

After the logo problem was solved, my project was ready for release. It was mentioned in the WSL document that I had to send an email to the WSL team for testing before releasing the project on the Microsoft Store, which I did.  

After two weeks of not hearing from the WSL, I sent another email. When the WSL team finally replied to me, they told me Microsoft was very busy holding meetings recently and they did not have the time to see the email. More importantly, they informed me WSL can be directly submitted after being ported without testing.  

The document says that to release the software package on Microsoft Store, one must first register a company or a personal account at Microsoft Partner Center. The former needs official certificates of the company and will be verified by Microsoft, while the latter is not verified by Microsoft. I intended to create a company account that allows more users to log in and release apps with specific functions, even though openEuler is not a company. To do so, I found the maintainer of the community infrastructure SIG, who helped me set up an openEuler email address to register a Microsoft account. Once this was verified, the Microsoft Partner Center displays a verification error message. I needed to provide the related certificates to show the domain name openeuler.io is registered by the community. So, I asked for proof materials from the community infrastructure SIG, who sent me screenshots of the administrator interface, which were submitted to Microsoft.  

Microsoft did not reply for two weeks. In the forum of the Microsoft Partner Center, I found that, like me, several people were also stuck in the same verification phase, but with a key difference - after they posted their issues, Microsoft administrators followed up to help solve the verification problem. So I posted a support request in the discussion section, hoping that the customer service personnel can help me with the verification.  

A few days later, I received a call from the United States. Although we talked about it all afternoon, the staff member was unable to solve my problem. Later, I found that my question category was incorrect. The reason was that there were several account-related questions, which were similar to each other.  

This taught me a key lesson. I learned that if partners do not reply, I should proactively communicate with them, such as posting on forums, contacting customer service personnel, and sending emails to related teams.  

## Releasing openEuler on Microsoft Store

Because customer service could not solve my problem, I had to wait for my proof materials to be verified by Microsoft. Fortunately, about a week later, Microsoft sent me an email, asking me to provide the official PDF certificate of the company in addition to screenshots. This was problematic as openEuler is an open source community, rather than a commercial company, so there is no official certificate. Community members suggested I register a personal account instead to release the version.  

So I used another openEuler email address to create a Microsoft personal account, bypassing verification, allowing me to successfully submit the required application information. During the release, I cannot submit the installation package and the system displayed a message indicating that the signature is incorrect. When I checked the introduction to the Microsoft software release on YouTube and the related question on Stack Overflow, I found that the Windows publisher ID of the developer account, that is, a string of numbers starting with CN, must be provided. This number is used as the Publisher common name of the Visual Studio–signed installation package, and the signed installation package can be successfully identified by the Microsoft Partner Center. I did not find any relevant content about this release tip in Microsoft development documentation.  

Surprisingly, three days later, I received a suggestion from Microsoft, who told me to change the privacy link, add the statement that openEuler does not support Windows 10 S, and submit the upload request again. I thought it would take a long time to release the application, but I was wrong. Never in my wildest dreams did I expect that openEuler would be released on the Microsoft Store within just a few days.  

The preceding figure is a screenshot of openEuler in the Microsoft Store. You can get it at [Link 1](https://www.microsoft.com/zh-cn/p/openeuler/9ngf0q0xp03d?rtc=1&activetab=pivot:overviewtab). Note: you need to enable the WSL function before installing any release of the WSL. For details, see [Link 2](https://gitee.com/openeuler/wsl).  

During the three-month internship, I conversed with Microsoft and with the open source community. It was the first time I communicated with community members about openEuler, and it made me feel that I part of the openEuler family.  

This experience made me realize how Huawei provides a positive working environment for its colleagues, who are willing to help each other. So I decided to extend my internship from July to the end of September. I hope that I can learn more and contribute more to openEuler in the next three months.  

I attached the technical document about porting openEuler to WSL at https://gitee.com/openeuler/wsl. This document describes how to install openEuler on WSL.  
If you have any questions, please create an issue in the WSL repository of the openEuler community at https://gitee.com/openeuler/wsl/issues.  

If you want to participate in openEuler development, search for the mini-program "openEuler" in WeChat. The program contains more than 80 SIG‘s meeting schedules, topics, and online and offline meetups of openEuler. You can select topics that you are interested in to participate in regular meetings, communicate with community members in detail during meetings, or participate in Meetup activities on site.  

We hope to see you soon in the openEuler community.  
