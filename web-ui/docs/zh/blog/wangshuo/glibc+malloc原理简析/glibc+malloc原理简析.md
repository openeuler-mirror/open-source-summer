---
title: glibc malloc原理简析
date: 2021-01-27
tags: 
    - glibc
    - malloc
archives: 2021-01
author: wangshuo
summary: 介绍glibc malloc原理
---

# 1 概述
内存分配器ptmalloc，即glibc中的malloc，实现了 malloc()，free()以及一组其它的函数，以提供动态内存管理的支持。分配器处在用户程序和内核之间，它响应用户的分配请求，向操作系统申请内存，然后将其返回给用户程序。
为了保持高效的分配，分配器一般都会预先分配一块大于用户请求的内存，并通过某种算法管理这块内存。来满足用户的内存分配要求，用户释放掉的内存也并不是立即就返回给操作系统，相反，分配器会管理这些被释放掉的空闲空间，以应对用户以后的内存分配要求。也就是说，分配器不但要管理已分配的内存块，还需要管理空闲的内存块，当响应用户分配要求时，分配器会首先在空闲空间中寻找一块合适的内存给用户，在空闲空间中找不到的情况下才分配一块新的内存。
<br><br>

# 2 malloc数据结构
## 2.1 内存管理结构
### 2.1.1 chunk
chunk原意是块，用在内存中表示的意思就是一块内存，chunk是glibc内存管理的最小单位，其数据结构如下图所示
<center><img src="./free-chunk.png" style="zoom:50%" > <img src="./allocated-chunk.png" style="zoom:50%"></center>

chunk中几个关键的成员有prev_size、mchunk_size、fd和bk，其作用分别为：<br>
<br>prev_size：<br>如果前一个chunk是free chunk，则这个内容保存的是前一个chunk的大小。 如果前一个chunk是allocated chunk，则这个区域保存的是前一个chunk的用户数据；

<br>mchunk_size：<br>
当前chunk的大小。最后的 3 位作为标志位，具体为：<br>第0比特位用于表示前一个chunk是否为allocated chunk，而当前是不是chunk allocated可以通过查询下一个chunk的这个标志位来得知；<br>第1比特位用于标记该chunk是否是通过系统调用申请的（子线程是mmap，主线程则是通过 brk）。如果是，则该chunk不再由后续将会介绍的内存管理数据结构来标记，申请释放流程将简化；<br>第2比特位用于标记该chunk是否属于主分配区，关于分配区将在下文详细介绍。

<br>fd:<br> 前向指针，即指向当前chunk在同一个bin的下一个chunk的指针，仅chunk未使用的时候存在。

<br>bk: <br>后向指针，即指向当前chunk在同一个bin的上一个chunk的指针，仅chunk未使用的时候存在。

### 2.1.2 arena
arena一般称为分配区，是一个结构体，内含指向各自类型内存块的指针等元素，每个线程在申请内存时会获取一个。分配区分为主分配区和thread分配区，前者仅有一个，其余均为thread分配区。当新创建的线程需要申请内存时，将从一个全局的链表中获取一个空闲的分配区，如果没有得到且分配区数量没有超过最大值（M_ARENA_MAX），malloc将会新建一个。
<br><br>

### 2.2.3 heap
heap包括帧头和内存块， glibc以heap为单位从操作系统批量申请和释放内存。
主分配区有一个heap，thread分配区在刚创建时也只有一个，当超过一定大小时会新增heap，heap直接以链表形式相连，数量没有限制，单个heap最大默认64M。新建heap时里面只有一个chunk，称为top chunk，每次申请内存时都会从top chunk中分裂出一块chunk，而top chunk本身则始终位于heap的末端。

下图是只有一个heap的main arena和thread arena的内存分布图：
<center><img src="./arena-single-segment.png" style="zoom:40%"></center>
下图是一个thread arena中含有多个heap的情况：
<center><img src="./arena-multi-segments.png" style="zoom:50%"></center>
从以上两图可以看出，thread arena只含有一个arena，却有两个heap_info（即 heap header）。由于两个heap是通过mmap从操作系统申请的内存，两者在内存布局上并不相邻而是分属于不同的内存区间，所以为了便于管理，glibc的malloc将第二个heap_info结构体的prev成员指向了第一个heap_info结构体的起始位置（即ar_ptr成员），而第一个heap_info结构体的ar_ptr成员指向了arena，这样就构成了一个单链表，方便后续管理。
<br><br>

## 2.2 内存管理链表
glibc提供了几种链表来管理不同大小的chunk。其中，除tcache外，其余均为arena结构体中的成员变量。
<br><br>

### 2.2.1 tcache
tcache是glibc为了提升小块内存申请释放性能引入的缓存机制。单个tcache有64个链表项，每一项里面最多可保存7块大小相同的chunk，tcache链表本身的数据结构从分配区管理的heap中申请，线程退出时释放回原heap，由于tcache是线程变量，每个线程都会有一个自己的tcache，因此理论上数量无上限。
<br><br>

### 2.2.2 fastbin
fastbin为管理小块chunk（64位为160字节）的链表，应对频繁申请小块内存的场景。链表项管理的chunk值按一定规律递增，可通过一定的算法算出指定大小的chunk所在的链表项索引，从而找到对应大小的chunk。
<center><img src="./fast-bin.png" style="zoom:50%"></center>
<br><br>

### 2.2.3 unsortedbin
fastbin中整合的chunk和small chunk、 large chunk free之后的chunk被放入unsortedbin，加速内存申请释放，unsortedbin管理的chunk值无规律。
<center><img src="./unsorte small large.png" style="zoom:60%"></center>
<br><br>

### 2.2.4 smallbin、largebin
smallbin和largebin管理的chunk值按一定规律递增，可通过一定的算法算出指定大小的chunk所在的链表项索引，从而找到对应大小的chunk。
<br><br>
# 3 malloc原理分析
## 3.1 malloc缓存模型
为了兼顾性能和内存占用，glibc的malloc通过一系列的内存管理链表实现了一套复杂的内存缓存机制，其基本思想可以由如下两图概括。
<center><img src="./main arena.png" style="zoom:40%"> <img src="./thread arena.png" style="zoom:40%"></center>
可以看出，当用户需要申请内存时，malloc会先向操作系统申请一个heap，然后对该heap进行切分，根据切分后的内存块的大小交由不同的链表管理。在后续内存申请时，会按照tcache→fastbin→unsortedbin→smallbin/largebin的顺序来获取内存。内存释放过程则与此相反。
<br><br>

## 3.2 malloc工作流程
### 3.2.1 内存申请流程

<center><img src="./申请流程.png" style="zoom:50%"></center>
<br><br>

### 3.2.2 内存释放流程
<center><img src="./释放流程.png" style="zoom:50%"></center>
<br><br>

# 4 参数配置
## 4.1 参数列表
glibc提供了一系列的可调参数，用户可以通过设置环境变量的方式调节这些参数从而改变malloc的一些行为。

|  参数名   | 默认值  | 取值范围  | 作用  |
|  :----:  | :----:  | :----:  | :----  |
| <div style="width: 120pt">M_MMAP_MAX</div>  | <div style="width: 120pt">65536</div>  | <div style="width: 60pt">>= 0</div> | <div style="width: 350pt">使用mmap分配的最大chunk数，取0时，相当于不使用mmap功能</div> |
| <div style="width: 120pt">M_MMAP_THRESHOLD</div>  | <div style="width: 120pt">128 * 1024（字节）</div>  | <div style="width: 60pt">0 ~ 32M</div> | <div style="width: 350pt">所有大于该值的chunk都使用mmap分配内存。如果未设置此参数且未禁用动态调整时，该值将会被动态调整，具体表现为如果上次申请的内存大于该值，则该值将随之增大；如果用户手动设置了这一参数，则将同时禁用动态调整，该值始终保持不变。</div> |
| <div style="width: 120pt">M_TOP_PAD</div>  | <div style="width: 120pt">0 | <div style="width: 60pt">-</div> | <div style="width: 350pt">内存申请和释放时额外保留的内存量，避免过多的系统调用</div> |
| <div style="width: 120pt">M_TRIM_THRESHOLD</div>  | <div style="width: 120pt">128 * 1024（字节）</div>  | <div style="width: 60pt">-</div> | <div style="width: 350pt">收缩阈值，当arena的top值超过收缩阈值将触发收缩操作把多余的内存还给操作系统。如果未设置此参数且未禁用动态调整时，该值将会被动态调整，具体表现为当M_MMAP_THRESHOLD更新时，该值随之更新为前者的两倍；如果用户手动设置了这一参数，则将同时禁用动态调整，该值始终保持不变。</div> |
| <div style="width: 120pt">M_ARENA_MAX</div>  | <div style="width: 120pt">CPU核数 * 8</div>  | <div style="width: 60pt">-</div> | <div style="width: 350pt">arena最大数量</div> |
| <div style="width: 120pt">M_ARENA_TEST</div>  | <div style="width: 120pt">8</div>  | <div style="width: 60pt">-</div> | <div style="width: 350pt">限制arena数量，只有当进程现有的arena不足且需求量超过M_ARENA_TEST时才会触发修改arena数量上限的动作。如果设置了M_ARENA_MAX，将忽略M_ARENA_TEST</div> |
| <div style="width: 120pt">tcache_count</div>  | <div style="width: 120pt">7</div>  | <div style="width: 60pt">>= 0</div> | <div style="width: 350pt">设置tcache的链表bin数量，当取0时，多余的chunk不会放到tcache里面，相当于关闭了tcache，如：<br>```export GLIBC_TUNABLES=glibc.malloc.tcache_count=0```</div>|
| <div style="width: 120pt">tcache_unsorted_limit</div>  | <div style="width: 120pt">0</div>  | <div style="width: 60pt">>= 0</div> | <div style="width: 350pt">限制tcache从unsorted bin中获取chunk的数量，当取0时，不做限制</div> |
||

<br><br>
## 4.2 使用环境变量设置参数
### 4.2.1 兼容模式环境变量
这一方式与低于2.26版本的glibc兼容，但是没有tcache相关的设置。
示例：
```
# export MALLOC_ARENA_MAX=1  
```

<br><br>
### 4.2.2 tunables模式环境变量
这一方式适用于2.26及以上的glibc版本，默认使用

示例：
```
# GLIBC_TUNABLES=glibc.malloc.mmap_max=1:glibc.malloc.top_pad=1
```
<br><br>
# 5 调测工具
malloc_stats是glibc提供的一个可用统计本进程具体的内存使用情况的接口，精确到字节， malloc_stats()函数声明如下：
```
#include<stdlib.h>  
#include<malloc.h>  
void malloc_stats(void);  
```

malloc_stats()可以在编写代码时加入编译宏来使用，也可以在gdb中直接调用。malloc_stats()执行结果如下：

```
Arena 0:                      //分配区编号，这里只有一个线程
system bytes     =     135168 //本线程从操作系统获得的动态内存，这里是132KB  
in use bytes     =       1152 //本线程在使用的动态内存，1152字节  
Total (incl. mmap):           //总的使用情况，各个线程使用动态内存的累加值  
system bytes     =     135168 //本进程从操作系统获得的动态内存，这里是132KB  
in use bytes     =       1152 //本进程在使用的动态内存，1152字节  
max mmap regions =          0 //使用mmap区域的个数  
max mmap bytes   =          0 //mmap区域对应内存大小  
```
