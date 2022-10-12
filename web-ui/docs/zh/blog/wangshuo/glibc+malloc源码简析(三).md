---
title: glibc malloc源码简析（三）
date: 2021-03-01
tags: 
    - glibc
    - malloc
archives: 2021-03
author: wangshuo
summary: 结合源码进一步分析glibc malloc原理，本文对free的代码流程进行分析。
---
# 1 前言
在上一篇文章中我们了解了glibc malloc执行流程，本文将结合glibc源码介绍free的执行流程。

软件信息如下：
| <div style="width: 30pt">软件项</div>  | <div style="width: 150pt">版本信息</div>                 | 
| :------------------------------------:| :------------------------------------------------------: | 
| <div style="width: 30pt">OS</div>     | <div style="width: 150pt">openEuler 20.03 (LTS)</div>    | 
| <div style="width: 30pt">kernel</div> | <div style="width: 150pt">4.19.90-2003.4.0.0036.oe1</div>| 
| <div style="width: 30pt">glibc</div>  | <div style="width: 150pt">2.28</div>                     | 
| <div style="width: 30pt">gcc</div>    | <div style="width: 150pt">7.3.0</div>                    | 
<br>

# 2 free执行流程分析
## 2.1 整体流程
glibc free的整体流程如下：
```
void
__libc_free (void *mem)
{
  mstate ar_ptr;
  mchunkptr p;                          /* chunk corresponding to mem */

  void (*hook) (void *, const void *)
    = atomic_forced_read (__free_hook);
  if (__builtin_expect (hook != NULL, 0))
    {    
      (*hook)(mem, RETURN_ADDRESS (0));
      return;
    }    

  if (mem == 0)                              /* free(0) has no effect */
    return;

  p = mem2chunk (mem);

  if (chunk_is_mmapped (p))                       /* release mmapped memory. */
    {    
      /* See if the dynamic brk/mmap threshold needs adjusting.
     Dumped fake mmapped chunks do not affect the threshold.  */
      if (!mp_.no_dyn_threshold
          && chunksize_nomask (p) > mp_.mmap_threshold
          && chunksize_nomask (p) <= DEFAULT_MMAP_THRESHOLD_MAX
      && !DUMPED_MAIN_ARENA_CHUNK (p)) 
        {    
          mp_.mmap_threshold = chunksize (p); 
          mp_.trim_threshold = 2 * mp_.mmap_threshold;
          LIBC_PROBE (memory_mallopt_free_dyn_thresholds, 2,
                      mp_.mmap_threshold, mp_.trim_threshold);
        }    
      munmap_chunk (p); 
      return;
    }    

  MAYBE_INIT_TCACHE ();

  ar_ptr = arena_for_chunk (p); 
  _int_free (ar_ptr, p, 0);
}
libc_hidden_def (__libc_free)
```
<br>

首先查看是否有__free_hook函数，如果有就直接调用，这个钩子与《glibc malloc源码分析（二）》中的__malloc_hook是成对出现的，目的同样是实现mtrace调测功能。接下来通过mem2chunk将虚拟内存的指针mem转换为对应的chunk指针p。
```
#define mem2chunk(mem) ((mchunkptr)((char*)(mem) - 2*SIZE_SZ))
```
<br>
接下来，chunk_is_mmapped用来检查size最低三位中的标志位，判断该chunk是否是由mmap分配的，如果是，就调用munmap_chunk释放该chunk并返回，在调用munmap_chunk之前，需要更新全局的mmap阀值和收缩阀值。<br>
接下来又碰到MAYBE_INIT_TCACHE这个宏，其定义如下，可以看出，在开启了tcache的情况下，这部分代码是基本上不会执行到的。增加这个的目的也是为后续内存优先放入tcache做铺垫。

```
# define MAYBE_INIT_TCACHE() \
  if (__glibc_unlikely (tcache == NULL)) \
    tcache_init();
  
#else  /* !USE_TCACHE */
# define MAYBE_INIT_TCACHE()
```
<br>

再往下，如果该chunk不是由mmap分配的，就通过arena_for_chunk获得分配区指针ar_ptr，其定义如下：
```
#define arena_for_chunk(ptr) \
  (chunk_main_arena (ptr) ? &main_arena : heap_for_ptr (ptr)->ar_ptr)
```
<br>

获得了分配区的指针后便调用_int_free释放内存。_int_free将在下文详细分析，这里先分析一下munmap_chunk函数，源码如下：
```
static void
munmap_chunk (mchunkptr p)
{
  INTERNAL_SIZE_T size = chunksize (p);

  assert (chunk_is_mmapped (p));

  /* Do nothing if the chunk is a faked mmapped chunk in the dumped
     main arena.  We never free this memory.  */
  if (DUMPED_MAIN_ARENA_CHUNK (p))
    return;

  uintptr_t block = (uintptr_t) p - prev_size (p);
  size_t total_size = prev_size (p) + size;
  /* Unfortunately we have to do the compilers job by hand here.  Normally
     we would test BLOCK and TOTAL-SIZE separately for compliance with the
     page size.  But gcc does not recognize the optimization possibility
     (in the moment at least) so we combine the two values into one before
     the bit test.  */
  if (__builtin_expect (((block | total_size) & (GLRO (dl_pagesize) - 1)) != 0, 0))
    malloc_printerr ("munmap_chunk(): invalid pointer");

  atomic_decrement (&mp_.n_mmaps);
  atomic_add (&mp_.mmapped_mem, -total_size);

  /* If munmap failed the process virtual memory address space is in a
     bad shape.  Just leave the block hanging around, the process will
     terminate shortly anyway since not much can be done.  */
  __munmap ((char *) block, total_size);
}
```
<br>

munmap_chunk函数首先获得前一个chunk的指针block，计算这两个chunk的size之和至total_size，接着对全局结构mp_进行相应的设置后，就通过__munmap释放这两个chunk。根据malloc的源码可知，由mmap分配的chunk是独立的，大部分情况下，p->prev_size为0，因此这里还是释放一个chunk，特殊情况下需要释放两个chunk，特殊情况请参考_int_malloc中的代码。__munmap再往下就是系统调用了，这里不多赘述。
<br><br>

## 2.2 _int_free
_int_free是glibc free的核心函数，这里依旧分步来分析其源码。<br>
第一部分源码如下，我们仍然先忽略掉tcache进行分析。
```
static void
_int_free (mstate av, mchunkptr p, int have_lock)
{

  ...

  size = chunksize (p);

  /* Little security check which won't hurt performance: the
     allocator never wrapps around at the end of the address space.
     Therefore we can exclude some size values which might appear
     here by accident or by "design" from some intruder.  */
  if (__builtin_expect ((uintptr_t) p > (uintptr_t) -size, 0)
      || __builtin_expect (misaligned_chunk (p), 0))
    malloc_printerr ("free(): invalid pointer");
  /* We know that each chunk is at least MINSIZE bytes in size or a
     multiple of MALLOC_ALIGNMENT.  */
  if (__glibc_unlikely (size < MINSIZE || !aligned_OK (size)))
    malloc_printerr ("free(): invalid size");

  check_inuse_chunk(av, p);

#if USE_TCACHE

  ...

#endif

  /*
    If eligible, place chunk on a fastbin so it can be found
    and used quickly in malloc.
  */

  if ((unsigned long)(size) <= (unsigned long)(get_max_fast ())

#if TRIM_FASTBINS
      /*
    If TRIM_FASTBINS set, don't place chunks
    bordering top into fastbins
      */
      && (chunk_at_offset(p, size) != av->top)
#endif
      ) {

    if (__builtin_expect (chunksize_nomask (chunk_at_offset (p, size))
              <= 2 * SIZE_SZ, 0)
    || __builtin_expect (chunksize (chunk_at_offset (p, size))
                 >= av->system_mem, 0))
      {
    bool fail = true;
    /* We might not have a lock at this point and concurrent modifications
       of system_mem might result in a false positive.  Redo the test after
       getting the lock.  */
    if (!have_lock)
      {
        __libc_lock_lock (av->mutex);
        fail = (chunksize_nomask (chunk_at_offset (p, size)) <= 2 * SIZE_SZ
            || chunksize (chunk_at_offset (p, size)) >= av->system_mem);
        __libc_lock_unlock (av->mutex);
      }

    if (fail)
      malloc_printerr ("free(): invalid next size (fast)");
      }

    free_perturb (chunk2mem(p), size - 2 * SIZE_SZ);

    atomic_store_relaxed (&av->have_fastchunks, true);
    unsigned int idx = fastbin_index(size);
    fb = &fastbin (av, idx);

    /* Atomically link P to its fastbin: P->FD = *FB; *FB = P;  */
    mchunkptr old = *fb, old2;

    if (SINGLE_THREAD_P)
      {
    /* Check that the top of the bin is not the record we are going to
       add (i.e., double free).  */
    if (__builtin_expect (old == p, 0))
      malloc_printerr ("double free or corruption (fasttop)");
    p->fd = old;
    *fb = p;
      }
    else
      do
    {
      /* Check that the top of the bin is not the record we are going to
         add (i.e., double free).  */
      if (__builtin_expect (old == p, 0))
        malloc_printerr ("double free or corruption (fasttop)");
      p->fd = old2 = old;
    }
      while ((old = catomic_compare_and_exchange_val_rel (fb, p, old2))
         != old2);

    ...

  }

  ...

}         
```
<br>

首先是检查size变量的合法性，然后比较get_max_fast()判断size是否在fastbin的范围内，如果在fastbin的管理范围内，就通过set_fastchunks设置分配区的标志位表示fastbin有空闲chunk，接下来根据size获得即将添加的chunk在fastbin中的索引idx，并通过该索引获得头指针fb，最后通过CAS操作将该chunk添加到fastbin中。这里需要注意fastbin中存放的chunk是按照单向链表组织的。<br>
tcache宏中的内容如下，读过上文的话应该一下子就能大致猜出这段的逻辑，即：将符合条件的内存放入tcache。因此不多赘述。
```
#if USE_TCACHE
  {
    size_t tc_idx = csize2tidx (size);
    if (tcache != NULL && tc_idx < mp_.tcache_bins)
      {    
    /* Check to see if it's already in the tcache.  */
    tcache_entry *e = (tcache_entry *) chunk2mem (p); 

    /* This test succeeds on double free.  However, we don't 100%
       trust it (it also matches random payload data at a 1 in
       2^<size_t> chance), so verify it's not an unlikely
       coincidence before aborting.  */
    if (__glibc_unlikely (e->key == tcache))
      {    
        tcache_entry *tmp;
        LIBC_PROBE (memory_tcache_double_free, 2, e, tc_idx);
        for (tmp = tcache->entries[tc_idx];
         tmp;
         tmp = tmp->next)
          if (tmp == e)
        malloc_printerr ("free(): double free detected in tcache 2");
        /* If we get here, it was a coincidence.  We've wasted a
           few cycles, but don't abort.  */
      }

    if (tcache->counts[tc_idx] < mp_.tcache_count)
      {
        tcache_put (p, tc_idx);
        return;
      }
      }
  }
#endif
```
<br>

第二部分代码如下，如果将要释放的chunk不属于fastbin，且不是由mmap分配的，就首先获得下一个chunk的指针nextchunk和大小nextsize，如果前一个chunk空闲，就和前一个chunk合并，并通过unlink将该chunk从空闲链表中脱离。接下来，如果刚才前面取出的下一个chunk也为空闲，并且该chunk不是top chunk，则继续合并，否则将其设为空闲。再往下，就是取出unsortedbin的头指针，将合并后的chunk插入unsortedbin链表头部，并进行相应的设置。如果下一个chunk为top chunk，就将要释放的chunk合并到top chunk中。
```
static void
_int_free (mstate av, mchunkptr p, int have_lock)
{

  ...

  if ((unsigned long)(size) <= (unsigned long)(get_max_fast ()) {
    ...
  }
  else if (!chunk_is_mmapped(p)) {

    /* If we're single-threaded, don't lock the arena.  */
    if (SINGLE_THREAD_P)
      have_lock = true;

    if (!have_lock)
      __libc_lock_lock (av->mutex);

    nextchunk = chunk_at_offset(p, size);

    /* Lightweight tests: check whether the block is already the
       top block.  */
    if (__glibc_unlikely (p == av->top))
      malloc_printerr ("double free or corruption (top)");
    /* Or whether the next chunk is beyond the boundaries of the arena.  */
    if (__builtin_expect (contiguous (av)
              && (char *) nextchunk
              >= ((char *) av->top + chunksize(av->top)), 0))
    malloc_printerr ("double free or corruption (out)");
    /* Or whether the block is actually not marked used.  */
    if (__glibc_unlikely (!prev_inuse(nextchunk)))
      malloc_printerr ("double free or corruption (!prev)");

    nextsize = chunksize(nextchunk);
    if (__builtin_expect (chunksize_nomask (nextchunk) <= 2 * SIZE_SZ, 0)
    || __builtin_expect (nextsize >= av->system_mem, 0))
      malloc_printerr ("free(): invalid next size (normal)");

    free_perturb (chunk2mem(p), size - 2 * SIZE_SZ);

    /* consolidate backward */
    if (!prev_inuse(p)) {
      prevsize = prev_size (p); 
      size += prevsize;
      p = chunk_at_offset(p, -((long) prevsize));
      if (__glibc_unlikely (chunksize(p) != prevsize))
        malloc_printerr ("corrupted size vs. prev_size while consolidating");
      unlink(av, p, bck, fwd);
    }    

    if (nextchunk != av->top) {
      /* get and clear inuse bit */
      nextinuse = inuse_bit_at_offset(nextchunk, nextsize);

      /* consolidate forward */
      if (!nextinuse) {
    unlink(av, nextchunk, bck, fwd);
    size += nextsize;
      } else 
    clear_inuse_bit_at_offset(nextchunk, 0);

      /*   
    Place the chunk in unsorted chunk list. Chunks are
    not placed into regular bins until after they have
    been given one chance to be used in malloc.
      */

      bck = unsorted_chunks(av);
      fwd = bck->fd;
      if (__glibc_unlikely (fwd->bk != bck))
    malloc_printerr ("free(): corrupted unsorted chunks");
      p->fd = fwd; 
      p->bk = bck; 
      if (!in_smallbin_range(size))
    {    
      p->fd_nextsize = NULL;
      p->bk_nextsize = NULL;
    }    
      bck->fd = p;
      fwd->bk = p;

      set_head(p, size | PREV_INUSE);
      set_foot(p, size);

      check_free_chunk(av, p);
    }

    /*
      If the chunk borders the current high end of memory,
      consolidate into top
    */

    else {
      size += nextsize;
      set_head(p, size | PREV_INUSE);
      av->top = p;
      check_chunk(av, p);
    }
  
    ...

    }
    ...
}
```
<br>

第三部分源码如下。如果前面释放的chunk比较大，就需要做一些处理了。首先对fastbin中的chunk进行合并并添加到unsortedbin中。然后，如果是主分配区，并且主分配区的top chunk大于一定的值，就通过systrim缩小top chunk。如果是thread分配区，就获得top chunk对应的非主分配区的heap_info指针，调用heap_trim尝试缩小该heap（systrim和heap_trim这两个函数将在下文分析）。最后，如果chunk还是通过mmap分配的，就调用munmap_chunk释放它。
```
static void
_int_free (mstate av, mchunkptr p, int have_lock)
{

    ...

    if ((unsigned long) (size) <= (unsigned long) (get_max_fast ())) {
        ...
    }
    else if (!chunk_is_mmapped(p)) {

        ...

    /*   
      If freeing a large space, consolidate possibly-surrounding
      chunks. Then, if the total unused topmost memory exceeds trim
      threshold, ask malloc_trim to reduce top.

      Unless max_fast is 0, we don't know if there are fastbins
      bordering top, so we cannot tell for sure whether threshold
      has been reached unless fastbins are consolidated.  But we
      don't want to consolidate on each free.  As a compromise,
      consolidation is performed if FASTBIN_CONSOLIDATION_THRESHOLD
      is reached.
    */

    if ((unsigned long)(size) >= FASTBIN_CONSOLIDATION_THRESHOLD) {
      if (atomic_load_relaxed (&av->have_fastchunks))
    malloc_consolidate(av);

      if (av == &main_arena) {
#ifndef MORECORE_CANNOT_TRIM
    if ((unsigned long)(chunksize(av->top)) >=
        (unsigned long)(mp_.trim_threshold))
      systrim(mp_.top_pad, av); 
#endif
      } else {
    /* Always try heap_trim(), even if the top chunk is not
       large, because the corresponding heap might go away.  */
    heap_info *heap = heap_for_ptr(top(av));

    assert(heap->ar_ptr == av);
    heap_trim(heap, mp_.top_pad);
      }
    }

    if (!have_lock)
      __libc_lock_unlock (av->mutex);
  }
  /*
    If the chunk was allocated via mmap, release via munmap().
  */

  else {
    munmap_chunk (p);
  }
}
```
<br>

## 2.3 systrim
systrim函数用于缩小主分配区top chunk的大小，其源码如下：
```
/*
   systrim is an inverse of sorts to sysmalloc.  It gives memory back
   to the system (via negative arguments to sbrk) if there is unused
   memory at the `high' end of the malloc pool. It is called
   automatically by free() when top space exceeds the trim
   threshold. It is also called by the public malloc_trim routine.  It
   returns 1 if it actually released any memory, else 0.
 */

static int
systrim (size_t pad, mstate av)
{

  ...

  pagesize = GLRO (dl_pagesize);
  top_size = chunksize (av->top);

  top_area = top_size - MINSIZE - 1;
  if (top_area <= pad)
    return 0;

  /* Release in pagesize units and round down to the nearest page.  */
  extra = ALIGN_DOWN(top_area - pad, pagesize);

  if (extra == 0)
    return 0;

  /*
     Only proceed if end of memory is where we last set it.
     This avoids problems if there were foreign sbrk calls.
   */
  current_brk = (char *) (MORECORE (0));
  if (current_brk == (char *) (av->top) + top_size)
    {
      /*
         Attempt to release memory. We ignore MORECORE return value,
         and instead call again to find out where new end of memory is.
         This avoids problems if first call releases less than we asked,
         of if failure somehow altered brk value. (We could still
         encounter problems if it altered brk in some very bad way,
         but the only thing we can do is adjust anyway, which will cause
         some downstream failure.)
       */

      MORECORE (-extra);
      /* Call the `morecore' hook if necessary.  */
      void (*hook) (void) = atomic_forced_read (__after_morecore_hook);
      if (__builtin_expect (hook != NULL, 0))
        (*hook)();
      new_brk = (char *) (MORECORE (0));

      LIBC_PROBE (memory_sbrk_less, 2, new_brk, extra);

      if (new_brk != (char *) MORECORE_FAILURE)
        {
          released = (long) (current_brk - new_brk);

          if (released != 0)
            {
              /* Success. Adjust top. */
              av->system_mem -= released;
              set_head (av->top, (top_size - released) | PREV_INUSE);
              check_malloc_state (av);
              return 1;
            }
        }
    }
  return 0;
}
```
<br>

首先，如果主分配区的top chunk本来就没什么空间，就直接返回，否则就将主分配区中可以缩小的大小保存在extra中。下面检查当前堆的brk指针是否和top chunk的结束地址相等，如果相等就可以通过MORECORE降低堆的大小，MORECORE是brk的系统调用，最后也是通过do_munmap释放虚拟内存的。__after_morecore_hook函数指针为空，不管它。再下来，获得释放后的堆指针保存在new_brk中，计算释放的虚拟内存的大小released，并将该信息更新到主分配区中，然后设置新top chunk的size。
<br>

## 2.4 heap_trim
heap_trim用来缩小thread分配区的heap大小，其源码如下
```
static int
heap_trim (heap_info *heap, size_t pad)
{
  
  ...

  /* Can this heap go away completely? *
  while (top_chunk == chunk_at_offset (heap, sizeof (*heap)))
    {   
      prev_heap = heap->prev;
      prev_size = prev_heap->size - (MINSIZE - 2 * SIZE_SZ);
      p = chunk_at_offset (prev_heap, prev_size);
      /* fencepost must be properly aligned.  */
      misalign = ((long) p) & MALLOC_ALIGN_MASK;
      p = chunk_at_offset (prev_heap, prev_size - misalign);
      assert (chunksize_nomask (p) == (0 | PREV_INUSE)); /* must be fencepost */
      p = prev_chunk (p);
      new_size = chunksize (p) + (MINSIZE - 2 * SIZE_SZ) + misalign;
      assert (new_size > 0 && new_size < (long) (2 * MINSIZE));
      if (!prev_inuse (p))
        new_size += prev_size (p);
      assert (new_size > 0 && new_size < HEAP_MAX_SIZE);
      if (new_size + (HEAP_MAX_SIZE - prev_heap->size) < pad + MINSIZE + pagesz)
        break;
      ar_ptr->system_mem -= heap->size;
      LIBC_PROBE (memory_heap_free, 2, heap, heap->size);
      delete_heap (heap);
      heap = prev_heap;
      if (!prev_inuse (p)) /* consolidate backward */
        {
          p = prev_chunk (p);
          unlink (ar_ptr, p, bck, fwd);
        }
      assert (((unsigned long) ((char *) p + new_size) & (pagesz - 1)) == 0);
      assert (((char *) p + new_size) == ((char *) heap + heap->size));
      top (ar_ptr) = top_chunk = p;
      set_head (top_chunk, new_size | PREV_INUSE);
      /*check_chunk(ar_ptr, top_chunk);*/
    }

  /* Uses similar logic for per-thread arenas as the main arena with systrim
     and _int_free by preserving the top pad and rounding down to the nearest
     page.  */
  top_size = chunksize (top_chunk);
  if ((unsigned long)(top_size) <
      (unsigned long)(mp_.trim_threshold))
    return 0;

  top_area = top_size - MINSIZE - 1;
  if (top_area < 0 || (size_t) top_area <= pad)
    return 0;

  /* Release in pagesize units and round down to the nearest page.  */
  extra = ALIGN_DOWN(top_area - pad, pagesz);
  if (extra == 0)
    return 0;

  /* Try to shrink. */
  if (shrink_heap (heap, extra) != 0)
    return 0;

  ar_ptr->system_mem -= extra;

  /* Success. Adjust top accordingly. */
  set_head (top_chunk, (top_size - extra) | PREV_INUSE);
  /*check_chunk(ar_ptr, top_chunk);*/
  return 1;
}
```
<br>

第一个while表示，如果top chunk指针正好在heap_info上，则考虑删掉整个heap。这是因为此时，该heap只有一个top chunk。再删掉该heap之前，需要检查该heap的前一个heap是否有足够的空间，否则删掉该heap后，剩余的空间太小。<br>
经过计算后，newsize保存了前一个heap高地址处的fencepost和前一个空闲chunk（如果存在）的总大小组成，如果newsize加上该heap还未使用的内存（HEAP_MAX_SIZE - prev_heap->size）太小，就break退出循环，取消对整个heap的释放。否则，在更新了相应的信息后，调用delete_heap删除整个heap，delete_heap是一个宏，定义如下，delete_heap其最终通过__munmap释放整个heap，大小为HEAP_MAX_SIZE，以64位平台为例，默认为64M。
```
#define delete_heap(heap) \
  do {                                        \
      if ((char *) (heap) + HEAP_MAX_SIZE == aligned_heap_area)           \
        aligned_heap_area = NULL;                         \
      __munmap ((char *) (heap), HEAP_MAX_SIZE);                  \
    } while (0)
```
<br>

删除掉整个heap后，如果前一个heap的fencepost的前面有一个空闲chunk，就将该空闲chunk从空闲链表中脱离，然后设置fencepost或者该空闲chunk（如果存在）的地址为新的top chunk，该top chunk的大小为前面计算的new_size。
然后返回while继续检查，如果新的top chunk指针又正好在heap_info上，就表示该heap也就只有一个chunk即top chunk，就继续释放该heap。<br>
再往下，如果新的top chunk剩余空间top_area太小，就直接返回了。如果还有足够的空间，且top_area大于收缩阀值，就调用shrink_heap进一步将新的top chunk的大小减少extra。最后设置一些分配区的信息，并设置减少后的top chunk的大小为top_size - extra，这里其实就是减小heap_info的size变量。
```
/* Shrink a heap.  */

static int
shrink_heap (heap_info *h, long diff)
{
  long new_size;

  new_size = (long) h->size - diff;
  if (new_size < (long) sizeof (*h))
    return -1;

  /* Try to re-map the extra heap space freshly to save memory, and make it
     inaccessible.  See malloc-sysdep.h to know when this is true.  */
  if (__glibc_unlikely (check_may_shrink_heap ()))
    {
      if ((char *) MMAP ((char *) h + new_size, diff, PROT_NONE,
                         MAP_FIXED) == (char *) MAP_FAILED)
        return -2;

      h->mprotect_size = new_size;
    }
  else
    __madvise ((char *) h + new_size, diff, MADV_DONTNEED);
  /*fprintf(stderr, "shrink %p %08lx\n", h, new_size);*/

  h->size = new_size;
  LIBC_PROBE (memory_heap_less, 2, h, h->size);
  return 0;
}
```
<br>

关于heap_trim函数，其实是有不合理的地方的，从上面的流程可以看出，假设一个分配区有多个heap时，如果最新的heap（即top chunk所在的heap）还有被占用的chunk，则会直接break，但是如果中间的heap都已经空闲了，比如下图这种情况，此时显然会存在内存空洞。
```
|---------------------|       |---------------------|
|       top chunk     |       |                     |
|---------------------|       |                     |
|   allocated chunk   |       |                     |
|---------------------|       |                     |
|         ...         |       |      free chunk     |
|---------------------|       |                     |
|     free chunk      |       |                     |
|---------------------|       |                     |
|   allocated chunk   |       |                     |
|---------------------|       |---------------------|
|                     |       |                     |
|      heap info      |  ---> |      heap info      |
|                     |       |                     |
|---------------------|       |---------------------|
```
<br>
这个问题我曾向社区发过邮件，链接如下，但未得到答复。<br>
https://sourceware.org/pipermail/libc-alpha/2021-January/122001.html
<br><br>

实际上我们自己也可以解释，假设我们把中间的heap释放掉，那么下次如果又有大颗粒的内存需求，还需要走系统调用向内核申请内存，这个的性能开销显然是较大的；如果我们保留了这块chunk，显然它还是会被之前介绍的各种bin来管理的（具体来说应该是unsorted bin来管理），那么下次如果有内存申请时，从这块大的chunk中挖下来一块就好了。说白了，还是性能和空间占用的折中。
<br><br>

# 参考资料
Ptmalloc2 源代码分析 华庭（庄明强）

Linux 堆内存管理深入分析：https://murphypei.github.io/blog/2019/01/linux-heap

glibc tcache 机制： https://firmianay.gitbooks.io/ctf-all-in-one/content/doc/4.14_glibc_tcache.html

malloc源码分析： https://introspelliam.github.io/2018/05/21/malloc%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E2%80%94%E2%80%941/
