---
title: glibc问题定位--malloc调用栈问题分析
date: 2021-03-13
tags: 
    - glibc
archives: 2021-03
author: wangshuo
summary: 通过一个案例介绍glibc的社区bug以及修复策略，同时介绍aarch64架构下推栈相关的知识
---

# 1 概述
在某业务场景通过gdb调试进入malloc函数获取调用栈时，发现调用栈信息无法显示，后经过定位发现是社区bug，因此向社区推送了修改方案，并在2.28-50版本将该补丁回合，本文将介绍这一bug的原因及解决方案。<br>
软件信息如下：
| <div style="width: 50pt">软件项</div>  | <div style="width: 160pt">版本信息</div>                         | 
| :------------------------------------:| :--------------------------------------------------------------: |
| <div style="width: 50pt">OS</div>     | <div style="width: 160pt">openEuler 20.03 (LTS)</div>            | 
| <div style="width: 50pt">kernel</div> | <div style="width: 160pt">4.19.90-2003.4.0.0036.oe1.aarch64</div>| 
| <div style="width: 50pt">glibc</div>  | <div style="width: 160pt">2.28</div>                             | 
| <div style="width: 50pt">gcc</div>    | <div style="width: 160pt">7.3.0</div>                            |
<br><br>

# 2 问题背景
在某业务场景中，当malloc函数中打调用栈时，应用层的栈信息丢失，如下所示。已确认安装了debuginfo包，且由于已经使用了unwind推栈算法，因此也不是-fomit-frame-pointer选项的问题。
```
(gdb) b malloc
Breakpoint 2 at 0xfffff7e0d198: malloc. (2 locations)
(gdb) c
Continuing.

Thread 2 "xxxxxxx" hit Breakpoint 2, __GI___libc_malloc (bytes=10532) at malloc.c:3039
3039	    = atomic_forced_read (__malloc_hook);
(gdb) bt
#0  __GI___libc_malloc (bytes=10532) at malloc.c:3039
#1  0x0000fffff7fce484 in allocate_dtv_entry (size=<optimized out>, alignment=64)
    at dl-tls.c:594
#2  allocate_and_init (map=0x4212c0) at dl-tls.c:607
#3  tls_get_addr_tail (ti=0x424050, dtv=0x425200, the_map=0x4212c0) at dl-tls.c:787
#4  0x0000fffff7fd2e90 in _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:214
#5  0x0000fffff6dfab44 in OurFunction (threadId=10532)
    at /home/test/test_function.c:30
#6  0x0000000000000000 in ?? ()
Backtrace stopped: previous frame identical to this frame (corrupt stack?)
```
<br>

从现有的信息可以发现此次malloc并非业务直接调用，而是_dl_tlsdesc_dynamic这个glibc提供的函数间接调用。对比业务得知该语句发生在给线程变量赋值时。查阅资料，结合业务了解到这部分涉及线程局部存储（Thread Local Storage，TLS）的初始化操作，因此malloc函数本身的嫌疑下降，问题更有可能出现在_dl_tlsdesc_dynamic。<br>
而后我们将该业务场景抽象成一个demo，复现了该问题，精确定位到问题发生在位于sysdeps/aarch64/dl-tlsdesc.S的_dl_tlsdesc_dynamic函数，具体来说，在进入该函数后才发生了推栈失败现象。同时，异常点有两处，第一处如下：

```
Thread 2 "xxxxxxx" hit Breakpoint 1, _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:149
149		stp	x1,  x2, [sp, #-32]!
Missing separate debuginfos, use: dnf debuginfo-install libgcc-7.3.0-20190804.h24.aarch64
(gdb) bt
#0  _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:149
#1  0x0000ffffbe4fbb44 in OurFunction (threadId=3194870184)
    at /home/test/test_function.c:30
#2  0x0000000000400c08 in initaaa () at thread.c:58
#3  0x0000000000400c50 in thread_proc (param=0x0) at thread.c:71
#4  0x0000ffffbf6918bc in start_thread (arg=0xfffffffff29f) at pthread_create.c:486
#5  0x0000ffffbf5669ec in thread_start () at ../sysdeps/unix/sysv/linux/aarch64/clone.S:78
(gdb) ni
_dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:150
150		stp	x3,  x4, [sp, #16]
(gdb) bt
#0  _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:150
#1  0x0000ffffbe4fbb44 in OurFunction (threadId=3194870184)
    at /home/test/test_function.c:30
#2  0x0000000000000000 in ?? ()
Backtrace stopped: previous frame identical to this frame (corrupt stack?)
(gdb) ni
_dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:157
157		mrs	x4, tpidr_el0
(gdb) bt
#0  _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:157
#1  0x0000ffffbe4fbb44 in OurFunction (threadId=3194870184)
    at /home/test/test_function.c:30
#2  0x0000000000400c08 in initaaa () at thread.c:58
#3  0x0000000000400c50 in thread_proc (param=0x0) at thread.c:71
#4  0x0000ffffbf6918bc in start_thread (arg=0xfffffffff29f) at pthread_create.c:486
#5  0x0000ffffbf5669ec in thread_start () at ../sysdeps/unix/sysv/linux/aarch64/clone.S:78
```
同时，当离开150行的语句后，调用栈信息恢复。第二处异常如下：
```
Thread 2 "xxxxxxx" hit Breakpoint 1, _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:149
149		stp	x1,  x2, [sp, #-32]!
Missing separate debuginfos, use: dnf debuginfo-install libgcc-7.3.0-20190804.h24.aarch64
(gdb) ni
_dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:150
150		stp	x3,  x4, [sp, #16]
(gdb) 
_dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:157
157		mrs	x4, tpidr_el0
(gdb) 
158		ldr	PTR_REG (1), [x0,#TLSDESC_ARG]
(gdb) 
159		ldr	PTR_REG (0), [x4,#TCBHEAD_DTV]
(gdb) 
160		ldr	PTR_REG (3), [x1,#TLSDESC_GEN_COUNT]
(gdb) 
161		ldr	PTR_REG (2), [x0,#DTV_COUNTER]
(gdb) 
162		cmp	PTR_REG (3), PTR_REG (2)
(gdb) 
163		b.hi	2f
(gdb) 
165		ldp	PTR_REG (2), PTR_REG (3), [x1,#TLSDESC_MODID]
(gdb) 
166		add	PTR_REG (0), PTR_REG (0), PTR_REG (2), lsl #(PTR_LOG_SIZE + 1)
(gdb) 
167		ldr	PTR_REG (0), [x0] /* Load val member of DTV entry.  */
(gdb) 
168		cmp	PTR_REG (0), #TLS_DTV_UNALLOCATED
(gdb) 
169		b.eq	2f
(gdb) bt
#0  _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:169
#1  0x0000ffffbe4fbb44 in OurFunction (threadId=4294967295)
    at /home/test/test_function.c:30
#2  0x0000000000400c08 in initaaa () at thread.c:58
#3  0x0000000000400c50 in thread_proc (param=0x0) at thread.c:71
#4  0x0000ffffbf6918bc in start_thread (arg=0xfffffffff29f) at pthread_create.c:486
#5  0x0000ffffbf5669ec in thread_start () at ../sysdeps/unix/sysv/linux/aarch64/clone.S:78
(gdb) ni
_dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:184
184		stp	x29, x30, [sp,#-16*NSAVEXREGPAIRS]!
(gdb) bt
#0  _dl_tlsdesc_dynamic () at ../sysdeps/aarch64/dl-tlsdesc.S:184
#1  0x0000ffffbe4fbb44 in OurFunction (threadId=4294967295)
    at /home/test/test_function.c:30
#2  0x0000000000000000 in ?? ()
Backtrace stopped: previous frame identical to this frame (corrupt stack?)
```
从184行开始，调用栈信息无法打出，直到离开_dl_tlsdesc_dynamic函数。<br><br>


# 3 流程梳理
这里我们简单梳理一下_dl_tlsdesc_dynamic函数的流程。_dl_tlsdesc_dynamic函数架构相关，此次异常实现位于sysdeps/aarch64/dl-tlsdesc.S目录下，该函数由汇编实现，但是代码编写人员很贴心地以注释形式提供了该函数的C语言实现，具体如下：
```
    /* Handler for dynamic TLS symbols.
       Prototype:
       _dl_tlsdesc_dynamic (tlsdesc *) ;

       The second word of the descriptor points to a
       tlsdesc_dynamic_arg structure.

       Returns the offset between the thread pointer and the
       object referenced by the argument.

       ptrdiff_t
       __attribute__ ((__regparm__ (1)))
       _dl_tlsdesc_dynamic (struct tlsdesc *tdp)
       {
         struct tlsdesc_dynamic_arg *td = tdp->arg;
         dtv_t *dtv = *(dtv_t **)((char *)__thread_pointer + TCBHEAD_DTV);
         if (__builtin_expect (td->gen_count <= dtv[0].counter
        && (dtv[td->tlsinfo.ti_module].pointer.val
            != TLS_DTV_UNALLOCATED),
        1))
           return dtv[td->tlsinfo.ti_module].pointer.val
        + td->tlsinfo.ti_offset
        - __thread_pointer;

         return ___tls_get_addr (&td->tlsinfo) - __thread_pointer;
       }
     */
```
<br>

可以看出，该函数用于返回线程指针与参数引用的对象之间的偏移量。具体采用了两个分支来实现，官方称之为“fast path”和“slow path”，判断条件为gen计数变量为超过限值以及TLS已完成初始化，满足即可走fast path，反之走slow path，本次问题就发生在后者，具体来说，第一处异常发生在进入_dl_tlsdesc_dynamic，第二处异常发生在判断需要执行slow path，发生跳转的地方。另外，我们曾尝试不依赖业务场景编写demo复现走slow path的逻辑，但是没有成功，这部分如果有专业人士明白如何执行到也希望能不吝赐教。<br><br>


# 4 调用栈背景知识
由于此次问题设计arm架构下的推栈操作，这里有必要对推栈原理进行简单介绍。<br><br>
## 4.1 寄存器与汇编指令
以aarch64为例，aarch拥有31个通用寄存器，系统运行在64位状态下的时候名字叫Xn，运行在32位的时候就叫Wn。按照功能又分为：参数寄存器（X0-X7）、来电保存的临时寄存器（X9-X15）、被调用者保存的寄存器（X19-X29）和特殊用途寄存器（X8，X16-X18，X29，X30），此次我们重点关注特殊用途寄存器：<br>
&nbsp;&nbsp;&nbsp;&nbsp;X8： 是间接结果寄存器，用于保存子程序返回地址 <br>
&nbsp;&nbsp;&nbsp;&nbsp;X16和X17： 程序内调用临时寄存器 <br>
&nbsp;&nbsp;&nbsp;&nbsp;X18： 平台寄存器，保留用于平台 <br>
&nbsp;&nbsp;&nbsp;&nbsp;X29： 帧指针寄存器（FP）<br>
&nbsp;&nbsp;&nbsp;&nbsp;X30： 链接寄存器（LR）<br>
&nbsp;&nbsp;&nbsp;&nbsp;X31： 堆栈指针寄存器SP或零寄存器ZXR <br>
<br>

## 4.2 推栈原理
这里以一个main函数调用func1为例，其调用栈如下图所示，每个函数都有自己的栈空间，这一部分我们称为栈帧，在函数被调用的时候创建，在函数返回后销毁。其中我们看到这其中涉及到四个比较关键的寄存器：PC、LR、SP、FP。需要注意的是，每个栈帧中的PC、LR、SP、FP都是寄存器的历史值，而不是当前值。
```
                     ________________  /_________________
                    |                | \                 |
  memory:           |       PC       |                   |
high address        |________________|                   |
    /|\             |                |                   |
     |              |       LR       |                   |
     |              |________________|                   |
     |              |                |                   |
     |              |       SP       |                   |
     |              |________________|                   |
     |              |                |                   |
     |              |       FP       |                   |
     |              |________________|                   |
     |              |                |                   |
     |    main      |    main:argc   |                   |
     |              |________________|                   |
     |              |                |                   |
     |              |    main:argv   |                   |
     |              |________________|                   |
     |              |                |                   |
     |              |   main:val:i   |                   |
     |              |________________|                   |
     |              |                |                   |
     |              |   main:val:j   |                   |
     |              |________________|                   |
     |              |                |                   |
     |              |  func1 param   |                   |
     |   ________\  |________________| /________         |
     |           /  |                | \        |        |
     |              |       PC       |          |        |
     |              |________________|          |        |
     |              |                |          |        |
     |              |       LR       |          |        |
     |              |________________|          |        |
     |     func1    |                | _________|        |
     |              |       SP       |                   |
     |              |________________|                   |
     |              |                |  _________________|
     |              |       FP       | 
     |              |________________|
     |              |                |
     |              |  func1 val:p1  |
     |              |________________|
     |              |                |
  memory:           |  func1 val:p2  |
low address         |________________|
                    |                |
                    |  func1 val:p3  |
                    |________________|
                           栈顶
```
<br>
PC寄存器和LR寄存器均指向代码段，PC表示当前的代码指向到何处，LR表示当前函数返回后要到哪里去继续执行。SP和FP用于维护函数的栈空间，其中SP指向栈顶，FP指向上一个函数栈帧的栈顶。如果函数准备调用另一个函数，跳转之前临时变量区先要保存另一个函数的参数。在栈回溯的过程中，我们主要是利用的是这个FP寄存器进行回溯，因为根据FP寄存器就可以找到下一个FP寄存器的栈底，获得PC指针，然后固定偏移，又可以回溯到上个PC指针，这样回溯下去，然后就可以完全的跟踪到函数的运行过程了。<br><br>


# 5 解决方案简析
## 5.1 结论
进过定位分析，该问题系社区缺陷，我们已向社区提交了补丁（commit ID：cd62740 和 f5082c7），与社区沟通情况见下链接：<br>
https://sourceware.org/pipermail/libc-alpha/2021-January/121272.html <br>
https://sourceware.org/pipermail/libc-alpha/2021-January/121330.html <br><br>

## 5.2 分析
上文提过，此次问题涉及两处异常点，后经过定位证明确实是两处bug，这里分别这两处进行介绍。<br>
第一处异常点是刚跳转到_dl_tlsdesc_dynamic函数时产生的，涉及的代码如下：
```
144 _dl_tlsdesc_dynamic:
145     DELOUSE (0)
146 
147     /* Save just enough registers to support fast path, if we fall
148        into slow path we will save additional registers.  */
149     stp x1,  x2, [sp, #-32]!
150     stp x3,  x4, [sp, #16]
151     cfi_adjust_cfa_offset (32)
152     cfi_rel_offset (x1, 0)
153     cfi_rel_offset (x2, 8)
```
具体来说，是执行到第150行时推栈失败，执行完了之后又可以正常推栈。这里我们注意一下第151行，这是一个cfi宏，实际运行时并不会执行到，其作用是知会调试器当前CFA与刚进入此函数时的基CFA的编译，至于CFA (Canonical Frame Address)，我们可以简单地将其理解为上一级调用者的堆栈指针。<br><br>
在151行之前，是两个stp操作，149行表示将x1和x2寄存器的值存入sp偏移32个字节的位置，同时sp也做出相应偏移，由于栈是从高地址向低地址生长，因此是-32。第150行将x3和x4寄存器的值入栈，并且没有更新sp。结合刚才关于cfi的介绍可知，在149行时sp被更新，但是原来的代码没有及时向调试器知会这一变动从而导致了150行推栈失败，又由于在执行完150行之后进行了申明，因此后面又可以正常推栈，我们调整了cfi宏的位置，第一个异常解决。<br><br>

在定位第二处异常时我们发现其发生在跳转结束之后，对应代码如下：
```
169     b.eq    2f
170     sub PTR_REG (3), PTR_REG (3), PTR_REG (4)
171     add PTR_REG (0), PTR_REG (0), PTR_REG (3)
172 1:
173     ldp  x3,  x4, [sp, #16]
174     ldp  x1,  x2, [sp], #32
175     cfi_adjust_cfa_offset (-32)
176     RET
177 2:
178     /* This is the slow path. We need to call __tls_get_addr() which
179        means we need to save and restore all the register that the
180        callee will trash.  */
181 
182     /* Save the remaining registers that we must treat as caller save.  */
183 # define NSAVEXREGPAIRS 8
184     stp x29, x30, [sp,#-16*NSAVEXREGPAIRS]!
185     cfi_adjust_cfa_offset (16*NSAVEXREGPAIRS)
186     cfi_rel_offset (x29, 0)
187     cfi_rel_offset (x30, 8)
```
具体为第169行跳转到184行时，一直到此函数运行结束之前都再也无法正常推栈。我们在同目录下找到了另一个功能类似的文件，其源码如下：
```
sysdeps/aarch64/dl-trampoline.S

219     bge 1f
220     cfi_remember_state
221 
222     /* Save the return.  */
223     mov ip0, x0
224 
225     /* Get arguments and return address back.  */
226     ldp x0, x1, [x29, #OFFSET_RG + DL_OFFSET_RG_X0 + 16*0]
227     ldp x2, x3, [x29, #OFFSET_RG + DL_OFFSET_RG_X0 + 16*1]
228     ldp x4, x5, [x29, #OFFSET_RG + DL_OFFSET_RG_X0 + 16*2]
229     ldp x6, x7, [x29, #OFFSET_RG + DL_OFFSET_RG_X0 + 16*3]
230     ldp d0, d1, [x29, #OFFSET_RG + DL_OFFSET_RG_D0 + 16*0]
231     ldp d2, d3, [x29, #OFFSET_RG + DL_OFFSET_RG_D0 + 16*1]
232     ldp d4, d5, [x29, #OFFSET_RG + DL_OFFSET_RG_D0 + 16*2]
233     ldp d6, d7, [x29, #OFFSET_RG + DL_OFFSET_RG_D0 + 16*3]
234 
235     cfi_def_cfa_register (sp)
236     ldp x29, x30, [x29, #0]
237     cfi_restore(x29)
238     cfi_restore(x30)
239 
240     add sp, sp, SF_SIZE + 16
241     cfi_adjust_cfa_offset (- SF_SIZE - 16)
242 
243     /* Jump to the newly found address.  */
244     br  ip0
245 
246     cfi_restore_state
247 1:
248     /* The new frame size is in ip0.  */
```
<br>

可以发现，同样是跳转，在第220行和246行，该逻辑分别使用了cfi_remember_state和cfi_restore_state宏。binutils的官网给出了这两个宏的使用场景，具体表述如下。简单来说就是aarch64如果需要推栈，则在跳转前应通过cfi_remember_state保存推栈相关寄存器的状态，跳转后通过cfi_restore_state宏恢复这个状态，加上这对宏之后，问题解决。
```
7.11.20 .cfi_remember_state and .cfi_restore_state
.cfi_remember_state pushes the set of rules for every register onto an implicit stack, while .cfi_restore_state pops them off the stack and places them in the current row. This is useful for situations where you have multiple .cfi_* directives that need to be undone due to the control flow of the program. For example, we could have something like this (assuming the CFA is the value of rbp):

        je label
        popq %rbx
        .cfi_restore %rbx
        popq %r12
        .cfi_restore %r12
        popq %rbp
        .cfi_restore %rbp
        .cfi_def_cfa %rsp, 8
        ret
label:
        /* Do something else */
Here, we want the .cfi directives to affect only the rows corresponding to the instructions before label. This means we’d have to add multiple .cfi directives after label to recreate the original save locations of the registers, as well as setting the CFA back to the value of rbp. This would be clumsy, and result in a larger binary size. Instead, we can write:

        je label
        popq %rbx
        .cfi_remember_state
        .cfi_restore %rbx
        popq %r12
        .cfi_restore %r12
        popq %rbp
        .cfi_restore %rbp
        .cfi_def_cfa %rsp, 8
        ret
label:
        .cfi_restore_state
        /* Do something else */
That way, the rules for the instructions after label will be the same as before the first .cfi_restore without having to use multiple .cfi directives.
```
<br>

# 6 小结
此次碰到的问题属于社区代码的疏漏，由于之前也没有碰到类似问题，因此主要还是依靠参考正常代码的逻辑，配合收集现有的相关资料来解决。对于比较生冷的问题场景，这种思路都适用。<br><br>

# 参考资料
binutils官方说明：https://sourceware.org/binutils/docs/as/CFI-directives.html <br>
ARMv8-aarch64 寄存器和指令集：https://winddoing.github.io/post/7190.html <br>
arm上backtrace的分析与实现原理：https://cloud.tencent.com/developer/article/1599605 <br>
Unwind 栈回溯详解：https://blog.csdn.net/pwl999/article/details/107569603 <br>
<br>

# glibc相关文章推荐
glibc malloc系列文章：<br>
&nbsp;&nbsp;&nbsp;&nbsp;原理简析：https://cutt.ly/NzcDUEd <br>
&nbsp;&nbsp;&nbsp;&nbsp;数据结构：https://cutt.ly/JzcSBfB <br>
&nbsp;&nbsp;&nbsp;&nbsp;malloc：https://cutt.ly/TzcSjUX <br>
&nbsp;&nbsp;&nbsp;&nbsp;free：https://cutt.ly/QzcSy5G <br>
<br>

glibc问题定位与分析系列文章：<br>
&nbsp;&nbsp;&nbsp;&nbsp;memcpy 1k字节x86_64虚拟机性能下降分析：https://cutt.ly/8zcDyPi <br>
<br>

glibc locale使用简析：https://cutt.ly/wxoH9OG <br>
<br>