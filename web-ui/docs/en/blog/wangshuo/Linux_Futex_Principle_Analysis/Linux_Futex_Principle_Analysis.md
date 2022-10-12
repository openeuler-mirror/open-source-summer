---
title: Linux Futex Principle Analysis
date: 2021-06-1
tags: 
    - linux
    - kernel
    - futex
archives: 2021-06
author: wangshuo
Summary: Introduction to the basic functions of futex based on the source code.
---
# Overview
Fast userspace mutexes, or futex, is a concept that adds atomic check in user mode to determine whether to enter the kernel for waiting. This document describes the basic functions of the futex based on the Linux source code.  
<br>

The software information is as follows:
| Item  | Version                        |
| :------------------------------------:| :--------------------------------------------------------------: |
| OS     | openEuler 20.03 (LTS)            |
| Kernel | 4.19.90-2003.4.0.0036.oe1.aarch64 |
| glibc | 2.28                             |
| gcc | 7.3.0                            |
<br><br>


# Principles
Futex is a synchronization mechanism that combines user and kernel modes to  synchronize lock operations between threads in a process and between processes. Threads share virtual memory space so the virtual address can uniquely identify the futex variable, that is, threads use the same virtual address to access the futex variable. Because processes have independent virtual memory space, the futex variable is used only when MMAP () allows processes to share an address space.  

During process synchronization, a piece of memory is shared between synchronized processes through mmap. The futex variable is located in this shared memory and the operation is atomic. When the process tries to enter or exit the mutex area, it checks the futex variable in the shared memory. If there is no competition, only the futex is modified, and no system calls are executed; otherwise, you must execute a system call to complete the corresponding processing.  

futex_wait is called when a task is made to wait, while futex_wake is called when the task needs to wake up. The two functions implement the basic futex mechanism. The simplified definition is as follows:  

```
//Uaddr points to an address, and val represents the expected value of the address. When *uaddr==val, wait occurs.  
int futex_wait(int *uaddr, int val);

//Wake up n pending processes on lock variables pointed to by uaddr
int futex_wake(int *uaddr, int n);
```
<br>

# Data Structures
As mentioned above, the futex variable is created in the user space and shared between processes or threads. When a process or thread wants to enter the critical section, the futex variable is checked. If the futex variable meets the required conditions, the process or thread enters the critical section; otherwise,  the process or thread is blocked on the futex variable. When the process or thread is about to exit the critical section, other processes or threads that are blocked on the futex variable are woken up. In the kernel, a futex variable is associated with a suspended process (thread) by using the struct futex_q structure. The definition and functions of key members are as follows:  
```
struct futex_q {
    struct plist_node list;        // Linked list node
    struct task_struct *task;      // Suspended process (thread) associated with the futex variable
    spinlock_t *lock_ptr;          // Spin lock, which controls the access to the linked list
    union futex_key key;           // Flag of the futex variable address

    //The following three items are related to priority inheritance and are not described here.
    struct futex_pi_state *pi_state;
    struct rt_mutex_waiter *rt_waiter;
    union futex_key *requeue_pi_key;
     
    u32 bitset;                    // Mask matching
};
```
<br>

In the kernel, a global hash table is used to maintain all processes (threads) that are suspended on the futex variable. A futex variable calculates a hash key based on the address identifier and locates a bucket, and all suspended/blocked processes and threads that are on the same futex variable correspond to the same bucket. The data structure is as follows:  
```
//bucket
struct futex_hash_bucket {
    // Number of waiters in the current spin waiting hash bucket
	atomic_t waiters;

    // Spin lock, which is used to control chain access,
    // lock_ptr in struct futex_q is the spin lock that references the bucket where the lock is located.
	spinlock_t lock;

	// Priority chain. Different from the traditional waiting queue, the futex uses the priority linked list to implement the waiting queue.
    //The purpose is to implement priority inheritance and solve the priority inversion problem.
	struct plist_head chain;
} ____cacheline_aligned_in_smp;

// Global hash table
static struct {
	struct futex_hash_bucket *queues;
	unsigned long            hashsize;
} __futex_data __read_mostly __aligned(2*sizeof(long));
#define futex_queues   (__futex_data.queues)
#define futex_hashsize (__futex_data.hashsize)
```
<br>

The bucket corresponding to the process (thread) is the value of the global hash table. The key of the hash table is as follows:  
```
union futex_key {
	struct {
		u64 i_seq;
		unsigned long pgoff;
		unsigned int offset;
	} shared;  // Different processes share the futex variable through file sharing, indicating the location of the variable in the file.

	struct {
		union {
			struct mm_struct *mm;
			u64 __tmp;
		};
		unsigned long address;
		unsigned int offset;
	} private;  // Different threads of the same process share the futex variable, indicating the position of the variable in the process address space.

	struct {
		u64 ptr;
		unsigned long word;
		unsigned int offset;
	} both;
};
```
<br>
futex_key is a structure of the union type and can be used by processes and threads. The futex fills in the futex_key based on the user-mode uaddr and process (thread) information, calculates a global hash table index using the jhash, and maps the index to a bucket. Processes/threads that attempt to obtain the same futex are mapped to the same bucket, and other processes/threads in the bucket linked list are found based on the value of futex_key.  

The following figure shows the relationships between the structures.  

<center><img src="./futex.jpg" style="zoom:50%"></center>
<br><br>

# Source Code Analysis
## Pre-Futex Operations
The source code for futex initialization is as follows. Initialization is complete upon kernel startup. The initialization content is simple. A fixed number of buckets are applied for and managed by the global hash table__futex_data, and then the spin lock of the linked list of each bucket is initialized.  
```
static int __init futex_init(void)
{

    ...

#if CONFIG_BASE_SMALL
	futex_hashsize = 16;
#else
	futex_hashsize = roundup_pow_of_two(256 * num_possible_cpus());
#endif

	futex_queues = alloc_large_system_hash("futex", sizeof(*futex_queues),
					       futex_hashsize, 0,
					       futex_hashsize < 256 ? HASH_SMALL : 0,
					       &futex_shift, NULL,
					       futex_hashsize, futex_hashsize);
	futex_hashsize = 1UL << futex_shift;

	futex_detect_cmpxchg();

	for (i = 0; i < futex_hashsize; i++) {
		atomic_set(&futex_queues[i].waiters, 0);
		plist_head_init(&futex_queues[i].chain);
		spin_lock_init(&futex_queues[i].lock);
	}

	return 0;
}
core_initcall(futex_init);
```
<br>

After the futex system call enters the kernel, it calls do_futex first. The source code is as follows: in user mode, input parameters (such as the number of input parameters and specific operations) need to be determined. The kernel determines operations to be performed based on the input parameters. This document is an introductory post of futex and only introduces futex_wait and futex_wake.  
```
long do_futex(u32 __user *uaddr, int op, u32 val, ktime_t *timeout,
		u32 __user *uaddr2, u32 val2, u32 val3)
{
	int cmd = op & FUTEX_CMD_MASK;
	unsigned int flags = 0;

    ...

	switch (cmd) {
	case FUTEX_WAIT:
		val3 = FUTEX_BITSET_MATCH_ANY;
		fallthrough;
	case FUTEX_WAIT_BITSET:
		return futex_wait(uaddr, flags, val, timeout, val3);
	case FUTEX_WAKE:
		val3 = FUTEX_BITSET_MATCH_ANY;
		fallthrough;
	case FUTEX_WAKE_BITSET:
		return futex_wake(uaddr, flags, val, val3);
	case FUTEX_REQUEUE:
		return futex_requeue(uaddr, flags, uaddr2, val, val2, NULL, 0);
	case FUTEX_CMP_REQUEUE:
		return futex_requeue(uaddr, flags, uaddr2, val, val2, &val3, 0);
	case FUTEX_WAKE_OP:
		return futex_wake_op(uaddr, flags, uaddr2, val, val2, val3);
	case FUTEX_LOCK_PI:
		return futex_lock_pi(uaddr, flags, timeout, 0);
	case FUTEX_UNLOCK_PI:
		return futex_unlock_pi(uaddr, flags);
	case FUTEX_TRYLOCK_PI:
		return futex_lock_pi(uaddr, flags, NULL, 1);
	case FUTEX_WAIT_REQUEUE_PI:
		val3 = FUTEX_BITSET_MATCH_ANY;
		return futex_wait_requeue_pi(uaddr, flags, val, timeout, val3,
					     uaddr2);
	case FUTEX_CMP_REQUEUE_PI:
		return futex_requeue(uaddr, flags, uaddr2, val, val2, &val3, 1);
	}
	return -ENOSYS;
}
```
<br><br>

## futex_wait Analysis
The following figure shows the execution process of the futex.  
<center><img src="./futex_wait.jpg" style="zoom:70%"></center>  
<br><br>
Below shows the futex source code, which we can analyze based on the preceding flowchart. In timeout scenarios, futex_wait sets the timer using futex_setup_timer, and then invokes the futex_wait_setup function, which obtains the key of the global hash table based on the input parameter to find the related bucket and obtain the spin lock. It also checks whether the uaddr value is the expected value before the task enters the queue. If uaddr is updated to an unexpected value, futex _wait returns to the user mode to obtain the lock. Otherwise, futex_wait invokes futex_wait_queue_me to insert the current task into the waiting queue, start the scheduled task, and trigger rescheduling. When the task can be executed, the task determines how it is woken up and releases the hrtimer to exit.  

```
static int futex_wait(u32 __user *uaddr, unsigned int flags, u32 val,
		      ktime_t *abs_time, u32 bitset)
{

    ...

	to = futex_setup_timer(abs_time, &timeout, flags,
			       current->timer_slack_ns);
retry:
	/*
	 * Prepare to wait on uaddr. On success, holds hb lock and increments
	 * q.key refs.
	 */
	ret = futex_wait_setup(uaddr, val, flags, &q, &hb);
	if (ret)
		goto out;

	/* queue_me and wait for wakeup, timeout, or a signal. */
	futex_wait_queue_me(hb, &q, to);

	/* If we were woken (and unqueued), we succeeded, whatever. */
	ret = 0;
	/* unqueue_me() drops q.key ref */
	if (!unqueue_me(&q))
		goto out;
	ret = -ETIMEDOUT;
	if (to && !to->task)
		goto out;

	/*
	 * We expect signal_pending(current), but we might be the
	 * victim of a spurious wakeup as well.
	 */
	if (!signal_pending(current))
		goto retry;

	ret = -ERESTARTSYS;
	if (!abs_time)
		goto out;

    ...

out:
	if (to) {
		hrtimer_cancel(&to->timer);
		destroy_hrtimer_on_stack(&to->timer);
	}
	return ret;
}
```
<br><br>

## futex_wake Analysis
The futex_wake process is as follows:  
<center><img src="./futex_wake.jpg" style="zoom:70%"></center>
<br><br>

The futex_wake source code is as follows. It uses get_futex_key to generate the key of the global hash table and uses hash_futex to find the corresponding bucket (same as futex_wait_setup). Then, futex_wake traverses the bucket, finds the task waiting in the current futex based on the key, and obtains the task from the bucket and places it in the temporary queue wake_q. Then, it releases the spin lock of the bucket and wakes up tasks in wake_q one by one.  
```
static int
futex_wake(u32 __user *uaddr, unsigned int flags, int nr_wake, u32 bitset)
{

    ...

	ret = get_futex_key(uaddr, flags & FLAGS_SHARED, &key, FUTEX_READ);
	if (unlikely(ret != 0))
		return ret;

	hb = hash_futex(&key);

	/* Make sure we really have tasks to wakeup */
	if (!hb_waiters_pending(hb))
		return ret;

	spin_lock(&hb->lock);

	plist_for_each_entry_safe(this, next, &hb->chain, list) {
		if (match_futex (&this->key, &key)) {
			if (this->pi_state || this->rt_waiter) {
				ret = -EINVAL;
				break;
			}

			/* Check if one of the bits is set in both bitsets */
			if (!(this->bitset & bitset))
				continue;

			mark_wake_futex(&wake_q, this);
			if (++ret >= nr_wake)
				break;
		}
	}

	spin_unlock(&hb->lock);
	wake_up_q(&wake_q);
	return ret;
}
```
<br><br>

# Summary
Based on the source code of futex in Linux, this document briefly describes two basic functions of futex: futex_wait and futex_wake. Other implementations related to futex will be introduced later.
<br><br>


