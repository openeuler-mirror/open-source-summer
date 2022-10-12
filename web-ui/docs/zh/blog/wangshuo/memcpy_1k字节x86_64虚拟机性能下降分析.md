---
title: memcpy 1k字节x86_64虚拟机性能下降分析
date: 2021-01-14
tags: 
    - glibc
    - 性能
archives: 2021-01
author: wangshuo
summary: 从memcpy 1k字节虚拟机性能下降入手介绍glibc x86_64 memcpy相关逻辑
---

# 1 问题背景
## 1.1 问题现象
x86_64环境上运行memcpy 1k字节时虚拟机的性能比物理机下降了40倍。

## 1.2 软件信息
| 软件项 | 版本信息 | 
| :----:| :----: | 
| OS | openEuler 20.03 (LTS) | 
| kernel| 4.19.90-2003.4.0.0036.oe1.x86_64| 
| glibc| 2.28 | 
| gcc| 7.3.0 | 

# 2 结论与解决方法
## 2.1 结论
起虚拟机的xml文件没有开超线程导致memcpy L3 cache水线在物理机和虚拟机中存在差异，从而引起性能差异。

## 2.2 解决方法
### 方法一 虚拟机开超线程
```
<cpu mode='host-passthrough' check='none'>
   ...
  <topology sockets='2' cores='4' threads='2'/>
  <feature policy='require' name='topoext'/>
</cpu>
```
### 方法二 调整memcpy水线
以下为glibc社区推荐配置
```
# export GLIBC_TUNABLES=glibc.tune.x86_non_temporal_threshold=$(($(getconf LEVEL3_CACHE_SIZE) * 3 / 4))
```

# 3 memcpy算法综述
在glibc-2.28中，memcpy和memove共享一套逻辑，其实现算法在glibc的源码中有简要介绍：
```
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

/* memmove/memcpy/mempcpy is implemented as:
   1. Use overlapping load and store to avoid branch.
   2. Load all sources into registers and store them together to avoid
      possible address overlap between source and destination.
   3. If size is 8 * VEC_SIZE or less, load all sources into registers
      and store them together.
   4. If address of destination > address of source, backward copy
      4 * VEC_SIZE at a time with unaligned load and aligned store.
      Load the first 4 * VEC and last VEC before the loop and store
      them after the loop to support overlapping addresses.
   5. Otherwise, forward copy 4 * VEC_SIZE at a time with unaligned
      load and aligned store.  Load the last 4 * VEC and first VEC
      before the loop and store them after the loop to support
      overlapping addresses.
   6. If size >= __x86_shared_non_temporal_threshold and there is no
      overlap between destination and source, use non-temporal store
      instead of aligned store.  */
```

其中，如第6条所述，如果超过__x86_shared_non_temporal_threshold水线，将使用non-temporal store代替aligned store，本次性能下降问题就属于该场景。

# 4 执行逻辑
x86环境上进程启动之前，会对水线进行一系列的初始化操作，本次涉及的水线初始化动作如下：
```
sysdeps/x86/cacheinfo.c

533       /* A value of 0 for the HTT bit indicates there is only a single
534      logical processor.  */
535       if (HAS_CPU_FEATURE (HTT))
536     {
          ...
          计算threads
          ...
693     }

        ...

781   /* The large memcpy micro benchmark in glibc shows that 6 times of
782      shared cache size is the approximate value above which non-temporal
783      store becomes faster on a 8-core processor.  This is the 3/4 of the
784      total shared cache size.  */
785   __x86_shared_non_temporal_threshold
786     = (cpu_features->non_temporal_threshold != 0
787        ? cpu_features->non_temporal_threshold
788        : __x86_shared_cache_size * threads * 3 / 4);
```
可以看出，虚拟机在没有开超线程的情况下__x86_shared_non_temporal_threshold为0，而物理机为__x86_shared_cache_size * threads * 3 / 4. 当执行memcpy 1k操作时，会按照如下逻辑判断具体需要执行的分支，虚拟机和物理机的逻辑在此之后产生差别。
```
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

455 #if (defined USE_MULTIARCH || VEC_SIZE == 16) && IS_IN (libc)
456     /* Check non-temporal store threshold.  */
457     cmpq    __x86_shared_non_temporal_threshold(%rip), %rdx
458     ja  L(large_backward)
459 #endif
```
具体逻辑如下：
```
物理机逻辑
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

460 L(loop_4x_vec_backward):
461     /* Copy 4 * VEC a time backward.  */
462     VMOVU   (%rcx), %VEC(0)
463     VMOVU   -VEC_SIZE(%rcx), %VEC(1)
464     VMOVU   -(VEC_SIZE * 2)(%rcx), %VEC(2)
465     VMOVU   -(VEC_SIZE * 3)(%rcx), %VEC(3)
466     subq    $(VEC_SIZE * 4), %rcx
467     subq    $(VEC_SIZE * 4), %rdx
468     VMOVA   %VEC(0), (%r9)
469     VMOVA   %VEC(1), -VEC_SIZE(%r9)
470     VMOVA   %VEC(2), -(VEC_SIZE * 2)(%r9)
471     VMOVA   %VEC(3), -(VEC_SIZE * 3)(%r9)
472     subq    $(VEC_SIZE * 4), %r9
473     cmpq    $(VEC_SIZE * 4), %rdx
474     ja  L(loop_4x_vec_backward)
475     /* Store the first 4 * VEC.  */
476     VMOVU   %VEC(4), (%rdi)
477     VMOVU   %VEC(5), VEC_SIZE(%rdi)
478     VMOVU   %VEC(6), (VEC_SIZE * 2)(%rdi)
479     VMOVU   %VEC(7), (VEC_SIZE * 3)(%rdi)
480     /* Store the last VEC.  */
481     VMOVU   %VEC(8), (%r11)
482     VZEROUPPER
483     ret
```

```
虚拟机逻辑
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

528 L(loop_large_backward):
529     /* Copy 4 * VEC a time backward with non-temporal stores.  */
530     PREFETCH_ONE_SET (-1, (%rcx), -PREFETCHED_LOAD_SIZE * 2)
531     PREFETCH_ONE_SET (-1, (%rcx), -PREFETCHED_LOAD_SIZE * 3)
532     VMOVU   (%rcx), %VEC(0)
533     VMOVU   -VEC_SIZE(%rcx), %VEC(1)
534     VMOVU   -(VEC_SIZE * 2)(%rcx), %VEC(2)
535     VMOVU   -(VEC_SIZE * 3)(%rcx), %VEC(3)
536     subq    $PREFETCHED_LOAD_SIZE, %rcx
537     subq    $PREFETCHED_LOAD_SIZE, %rdx
538     VMOVNT  %VEC(0), (%r9)
539     VMOVNT  %VEC(1), -VEC_SIZE(%r9)
540     VMOVNT  %VEC(2), -(VEC_SIZE * 2)(%r9)
541     VMOVNT  %VEC(3), -(VEC_SIZE * 3)(%r9)
542     subq    $PREFETCHED_LOAD_SIZE, %r9
543     cmpq    $PREFETCHED_LOAD_SIZE, %rdx
544     ja  L(loop_large_backward)
545     sfence
546     /* Store the first 4 * VEC.  */
547     VMOVU   %VEC(4), (%rdi)
548     VMOVU   %VEC(5), VEC_SIZE(%rdi)
549     VMOVU   %VEC(6), (VEC_SIZE * 2)(%rdi)
550     VMOVU   %VEC(7), (VEC_SIZE * 3)(%rdi)
551     /* Store the last VEC.  */
552     VMOVU   %VEC(8), (%r11)
553     VZEROUPPER
554     ret
```

# 5 指令差异分析
从上文可知，物理机和虚拟机执行逻辑的最大区别在于mov指令，指令的定义如下：
```
sysdeps/x86_64/memmove.S

 23 #define PREFETCHNT  prefetchnta
 24 #define VMOVNT      movntdq
 25 /* Use movups and movaps for smaller code sizes.  */
 26 #define VMOVU       movups
 27 #define VMOVA       movaps
```
可知，物理机逻辑使用的是movaps指令，特点是16字节对齐，而虚拟机逻辑使用的是movntdq指令，该指令是bypass main cache的，这里附上相关介绍。
>https://stackoverflow.com/questions/14106477/how-do-non-temporal-instructions-work
>The streaming read/write with non-temporal hints are typically used to reduce cache pollution (often with WC memory). The idea is that a small set of cache lines are reserved on the CPU for these instructions to use. Instead of loading a cache line into the main caches, it is loaded into this smaller cache.
>
>The comment supposes the following behavior (but I cannot find any references that the hardware actually does this, one would need to measure or a solid source and it could vary from hardware to hardware): - Once the CPU sees that the store buffer is full and that it is aligned to a cache line, it will flush it directly to memory since the non-temporal write bypasses the main cache.

通过分析上文的代码可知，movntdq以bypass main cache的方式将数据放入内存，因此性能自然不如movaps指令。

在与社区沟通后我们得知，社区采取的是一种折中策略。对于大块数据的memcpy操作，如果都走L3 cache，虽然能提升memcpy的性能，但是却会对整个系统的性能造成影响，因此制定了水线。
>https://sourceware.org/pipermail/libc-alpha/2021-January/121510.html
>\> The performance of memcpy 1024 has recovered. However, there is performance
>\> reduce in host. This is test result (cycle):
>\>
>\> 	                      memcpy_10	 memcpy_1k	 memcpy_10k	  memcpy_1m	  memcpy_10m
>\> before backport	             8	         34	        187	        130848	   2325409
>\> after backport	             8	         34	        182	        515156	   5282603
>\> Performance improvement	   0.00%	    0.00%	    2.67%	    -293.71%   -127.17%
>
>I think this is expected because the large copies no longer stay within
>the cache.  This is required to avoid blowing away the entire cache
>contents for such large copies, negatively impacting whole system
>performance.  This will of course not show up in a micro-benchmark.


# 6 修改水线后
通过之前的分析可知，虚拟机默认的水线为0，在此参考社区的推荐配置在虚拟机和物理机上进行验证，结果如下（单位cycle数）：

| 物理机 | memcpy_10 | memcpy_1k | memcpy_10k | memcpy_1M | memcpy_10M |
| :----:| :----: | :----: | :----: | :----: | :----: |
| 配置前 | 8 | 34 | 187| 130848| 2325409|
| 配置后 | 8 | 34 | 182| 515156| 5282603|
| 性能提升 | 0.00% | 0.00% |2.67% | -293.71% | -127.17% |

| 虚拟机 | memcpy_10 | memcpy_1k | memcpy_10k | memcpy_1M | memcpy_10M |
| :----:| :----: | :----: | :----: | :----: | :----: |
| 配置前 | 8 | 1269| 4555| 523740| 5304273|
| 配置后 | 8 | 35| 183| 509297| 5260913|
| 性能提升 | 0.00% | 97.24% |95.98% | 2.76% | 0.82% |
对比虚拟机和物理机配置前后的数据可以发现，调整了水线后虚拟机和物理机的性能是一致的。同时，对于物理机，之前水线为__x86_shared_cache_size * threads * 3 / 4，修改后为__x86_shared_cache_size * 3 / 4，水线降低，更容易进入movntdq指令，因此会在1M以后有下降。
