---
title: glibc Bugs - Fault Analysis of malloc Call Stack
date: 2021-03-13
tags: 
    - glibc
archives: 2021-03
author: wangshuo
summary: Uses a case to describe the glibc community bugs and fixing policy, and introduces the push-to-stack functionality in the AArch64 architecture.
---

# 1 Overview
Assume the malloc function is used by GDB to obtain the call stack, but the call stack information is not displayed due to a community bug. A modification solution is submitted to the community, and the bug is fixed in version 2.28-50. The following describes the cause and solution of this bug.
The software information is as follows:
| <div style="width: 50pt">Software</div> | <div style="width: 160pt">Version</div>                        |
| :------------------------------------:| :--------------------------------------------------------------: |
| <div style="width: 50pt">OS</div>     | <div style="width: 160pt">openEuler 20.03 (LTS)</div>            |
| <div style="width: 50pt">kernel</div> | <div style="width: 160pt">4.19.90-2003.4.0.0036.oe1.aarch64</div>|
| <div style="width: 50pt">glibc</div>  | <div style="width: 160pt">2.28</div>                             |
| <div style="width: 50pt">GCC</div>   | <div style="width: 160pt">7.3.0</div>                            |
<br><br>

# 2. Issue Description
In a service scenario, when the malloc function runs in the call stack, the stack information at the application layer is lost. However, this is not caused by the **-fomit-frame-pointer** option because the debuginfo package is installed and the unwinding algorithms are used.
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

According to the preceding information, the malloc function is not directly invoked, but indirectly invoked by **dltlsdesc_dynamic** provided by glibc when a value is assigned to the thread variable. After referring to some documentation and service requirements, we found that the initialization of thread local storage (TLS) is involved during the process. The probable cause is **dltlsdesc_dynamic** instead of the malloc function.
We then ran this specific scenario as a demo and reproduced the problem, and confirmed that the problem is caused by **_dl_tlsdesc_dynamic** under **sysdeps/aarch64/dl-tlsdesc.S.** Specifically, the push-to-stack fails after **_dl_tlsdesc_dynamic** is invoked. But there are two exceptions. The first exception is as follows:

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
But the call stack information is restored after line 150 is executed. The second exception is as follows:
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
From line 184, the call stack information cannot be printed until **_dl_tlsdesc_dynamic** exits.


# 3. Function Calling Process
The following describes the calling process of **_dl_tlsdesc_dynamic**. The exceptions occur in the **sysdeps/aarch64/dl-tlsdesc.S** directory, and are related to the **_dl_tlsdesc_dynamic** architecture and subsequent assembly language. And the developers related comments of C++ language during code writing. See the following:
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

From the preceding information, this function is used to return the offset between the thread pointer and the referenced parameter object through the **fast path** or **slow path**. If the generated count variable exceeds the maximum and TLS initialization is complete, the **fast path** is used. Otherwise, **slow path** is used, which leads to the aforementioned issues. Specifically, the first exception occurs when **_dl_tlsdesc_dynamic** is invoked, and the second exception occurs when the script attempts to run **slow path**. In addition, we tried to compile demos that do not depend on the service scenario to reproduce the slow path logic, but failed. We would be grateful if you could provide any suggestions or feedback.


# 4 Introduction to the Call Stack
This problem is related to the push-to-stack operation in the ARM architecture, which is why we briefly introduce the basic principles in the following section.
## 4.1 Register and Assembly Instruction
Take AArch64 as an example. AArch64 has 31 general-purpose registers, which are named **X*n*** in 64-bit system and **W*n*** in 32-bit system. The registers are classified into parameter (X0 to X7), temporary (X9 to X15), callee-saved (X19 to X29), and special-purpose registers (X8, X16 to X18, X29, and X30), based on the subsequent functions. The following uses special-purpose registers as examples:
&nbsp;&nbsp;&nbsp;&nbsp;X8: indirect result register, which is used to store the return address of the subprogram.
&nbsp;&nbsp;&nbsp;&nbsp;X16 and X17: temporary registers invoked in the program
&nbsp;&nbsp;&nbsp;&nbsp;X18: platform register, which is reserved for the platform
&nbsp;&nbsp;&nbsp;&nbsp;X29: frame pointer register (FP)
&nbsp;&nbsp;&nbsp;&nbsp;X30: link register (LR)
&nbsp;&nbsp;&nbsp;&nbsp;X31: stack pointer register (SP) or zero register (ZXR)
<br>

## 4.2 Push-to-Stack Principle
The following shows the call stack when the main function calls **func1**. Each function has its own stack space called a stack frame. It is created when the function is called and destroyed after the function is returned. During the process, four registers (PC, LR, SP, and FP) are involved. Note that the values of PC, LR, SP, and FP registers in each stack frame are historical values, not the current ones.
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
                           Top of Stack
```
<br>
Both the PC and LR registers point to a code segment. PC indicates where the current code points, and LR indicates indicates the location to be executed after the function is returned. The SP and FP registers are used to maintain the stack space of the function, where SP points to the stack top, and FP points to the stack top of a previous function stack frame. If the function is ready to invoke another function, the parameters of the function to be invoked must be saved in the temporary variable area beforehand. The FP register, mainly used for stack trace, is used to locate the stack bottom of the next FP register to obtain the PC pointer for offset fixing, helping to trace an early PC pointer. In this way, the entire running process of the function can be traced.


# 5 Solution Overview
## 5.1 Conclusion
After fault locating and analysis, we determined that this problem is a community defect. We have submitted patches (commit IDs: cd62740 and f5082c7) to the community. For details, see the following links:
https://sourceware.org/pipermail/libc-alpha/2021-January/121272.html <br>
https://sourceware.org/pipermail/libc-alpha/2021-January/121330.html <br><br>

## 5.2 Analysis
The aforementioned exceptions are caused by two bugs after fault locating. The following describes the two bugs.
The first exception occurs when the script calls **_dl_tlsdesc_dynamic**. The involved code is as follows:
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
Specifically, when line 150 is executed, the push-to-stack operation fails. After the execution is complete, the push-to-stack can be performed normally. Note that line 151 is actually a CFI macro, which is not executed. It is used to notify the debugger of the compilation of the current canonical frame address (CFA) and the base CFA of the invoked function. (CFA can be also referred to the stack pointer of the upper-level caller.)
Before line 151 is executed, the STP operations are performed twice. Line 149 indicates that the values of the X1 and X2 registers are saved to the SP with a 32-bit offset. Equally, the SP is also offset. Because the stack is expanded from a high to a low address, the value of SP is **–32**. In line 150, the values of the X3 and X4 registers are added to the stack, but SP is not updated. SP is updated at line 149, but the original code does not notify the debugger of the change as needed. As a result, the push-to-stack at line 150 fails. To solve the first exception, declarations are made after line 150 is executed, ensuring the subsequent push-to-stack can be performed normally by adjusting the position of the CFI macro.

When locating the second exception, we found that it occurred after the jump ends. The corresponding code is as follows:
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
Specifically, when line 169 jumps to line 184, the push-to-stack cannot be normally performed until the function exists. Another file with similar functions is found in the same directory. Its source code is as follows:
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

In the code, the **cfi_remember_state** and **cfi_restore_state** macros are used in lines 220 and 246. According to the descriptions of the two macros provided at the binutils official website, if push-to-stack is required in the AArch64 architecture, **cfi_remember_state** is used to save the status of the registers to be used before the jump, and then **cfi_restore_state** is used to restore status after the jump. The second exception can be resolved after adding these two macros.
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
Here, we want the .cfi directives to affect only the rows corresponding to the instructions before label. This means we'd have to add multiple .cfi directives after label to recreate the original save locations of the registers, as well as setting the CFA back to the value of rbp. This would be clumsy, and result in a larger binary size. Instead, we can write:

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

# 6. Summary
This problem is unprecedented as the bugs are found in the code submitted to the community. With this cause, we were able to solve problems by referring to the logic of the normal code and related materials. This method is also applicable to other uncommon problems.

# References
binutils official description: https://sourceware.org/binutils/docs/as/CFI-directives.html
ARMv8-AArch64 registers and instruction sets: https://winddoing.github.io/post/7190.html
Analysis and implementation of backtrace on ARM: https://cloud.tencent.com/developer/article/1599605
Unwinding stack trace: https://blog.csdn.net/pwl999/article/details/107569603
<br>

# Recommended Articles Related to glibc
**glibc malloc series articles**:
&nbsp;&nbsp;&nbsp;&nbsp; Principle Description: https://cutt.ly/NzcDUEd
&nbsp;&nbsp;&nbsp;&nbsp;Data Structure: https://cutt.ly/JzcSBfB.
&nbsp;&nbsp;&nbsp;&nbsp;malloc: https://cutt.ly/TzcSjUX
&nbsp;&nbsp;&nbsp;&nbsp;free: https://cutt.ly/QzcSy5G
<br>

**Articles about glibc fault locating and analysis**:
&nbsp;&nbsp;&nbsp;&nbsp;Analysis of the VM performance deterioration when running memcpy to copy 1,000 bytes in the x86_64 environment: https://cutt.ly/8zcDyPi
<br>

Usage of glibc locale: https://cutt.ly/wxoH9OG
<br>
