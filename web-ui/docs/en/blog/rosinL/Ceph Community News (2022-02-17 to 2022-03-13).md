---
title: Ceph Community News (2022-02-17 to 2022-03-13)
date: 2022-3-31
tags:
    - Ceph
    - News
    - Pacific
sig: ceph-sig
archives: 2022-3
author: rosinL
summary: Ceph Community News
---
# Ceph Community News (2022-02-17 to 2022-03-13)
## Cephalocon 2022 Postponed to July 11-13
Cephalocon 2022 has been rescheduled to July 11-13. The schedule is now available at [Cephalocon 2022 sched](https://ceph2022.sched.com/).
## [Ceph Octopus v15.2.16](https://ceph.com/en/news/blog/2022/v15-2-16-octopus-released/) Released
Notable Changes
- Fix in the read lease logic to prevent PGs from going into WAIT state after OSD restart.
- Several bug fixes in BlueStore, including a fix for object listing bug, which could cause stat mismatch scrub errors.

## Recently Merged PRs
Recently, the PR mainly focuses on bug fixing. The following describes notable changes:
- cephfs-top: Added average read/write/metadata latency. [pr#41397](https://github.com/ceph/ceph/pull/41397)
- rbd: Added rbd_default_map_options to be set and used at the image and pool level. [pr#44904](https://github.com/ceph/ceph/pull/44904)
- common: Used thread-local pointer variables to save the shard location required. [pr#44479](https://github.com/ceph/ceph/pull/44479)
## Recent Ceph Developer News
Each module of the Ceph community holds regular meetings to discuss and align the development progress. Meeting videos are uploaded to [YouTube](https://www.youtube.com/channel/UCno-Fry25FJ7B4RycCxOtfw/videos). The major meetings are as follows:
|Meeting|Description|Frequency|
|-------|----|----|
|Crimson SeaStore OSD Weekly Meeting |Crimson & SeaStore development|Weekly|
|Ceph Orchestration Meeting|Ceph management module (mgr)|Weekly|
|Ceph DocUBetter Meeting |Document optimization|Biweekly|
|Ceph Performance Meeting|Ceph performance optimization|Biweekly|
|Ceph Developer Monthly|Ceph developer|Monthly|
|Ceph Testing Meeting|Version verification and release|Monthly|
|Ceph Science User Group Meeting|Ceph scientific computing|Irregularly|
|Ceph Leadership Team Meeting|Ceph leadership team|Weekly|
|Ceph Tech talks|Discussion on Ceph community technologies|Monthly|

### Performance Meeting
- At [performance weekly](https://www.youtube.com/watch?v=syq_LTg25T4) on March 3, Intel's Michal Wysoczanski introduced openCAS versions and applications, as well as features of Ceph-based application deployment. However, he did not mention Ceph-based performance optimization. It is expected that the information can be provided in the future.
- At [performance weekly](https://www.youtube.com/watch?v=RFYA-0k6QEk) on March 15, the following performance-related issues were discussed:
   - PGLog optimization
   - Crimson cyanstore performance testing
   - rocksdb iterator performance
### [Ceph Talks](https://ceph.io/en/community/tech-talks/)
The Ceph community discusses technology-related topics monthly. The topic discussed in March is as follows:
- 2022-3-24, Ceph Tech Talk: How Teuthology Works with Kamoltat (Junior) Sirivadhna
## Ceph Community Newsletter
[Ceph Community Newsletter March 2022 Edition](https://ceph.com/en/news/blog/2022/newsletter-march/) is published.
This edition covers the following contents:

- The Ceph Quincy Release Canadidate v17.1.0 is available.
