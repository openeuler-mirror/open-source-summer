---
title: glibc malloc源码简析（一）
date: 2021-01-29
tags: 
    - glibc
    - malloc
archives: 2021-01
author: wangshuo
summary: 结合源码进一步分析glibc malloc原理，本文先对malloc的基本数据结构进行详细说明。
---
# 1 前言
在上一篇文章中我们了解了glibc内存管理的基本原理，从本章开始，我们将在这一基础上深入代码细节对glibc的malloc/free操作作进一步分析。本文将结合glibc源码介绍malloc相关的数据结构。

软件信息如下：
| <div style="width: 30pt">软件项</div> | <div style="width: 150pt">版本信息</div> | 
| :----:| :----: | 
| <div style="width: 30pt">OS</div> | <div style="width: 150pt">openEuler 20.03 (LTS)</div> | 
| <div style="width: 30pt">kernel</div>| <div style="width: 150pt">4.19.90-2003.4.0.0036.oe1</div>| 
| <div style="width: 30pt">glibc</div>| <div style="width: 150pt">2.28</div> | 
| <div style="width: 30pt">gcc</div>| <div style="width: 150pt">7.3.0</div> | 
<br>

# 2 chunk
chunk原意是块，用在内存中表示的意思就是一块内存，chunk是glibc内存管理的最小单位，其定义如下：
```
/*
  This struct declaration is misleading (but accurate and necessary).
  It declares a "view" into memory allowing access to necessary
  fields at known offsets from a given base. See explanation below.
*/

struct malloc_chunk {

  INTERNAL_SIZE_T      mchunk_prev_size;  /* Size of previous chunk (if free).  */
  INTERNAL_SIZE_T      mchunk_size;       /* Size in bytes, including overhead. */

  struct malloc_chunk* fd;         /* double links -- used only if free. */
  struct malloc_chunk* bk;

  /* Only used for large blocks: pointer to next larger size.  */
  struct malloc_chunk* fd_nextsize; /* double links -- used only if free. */
  struct malloc_chunk* bk_nextsize;
};
```
chunk的的结构十分巧妙，通过空间复用，能在占用最少的空间的情况下实现malloc的内存管理算法。空闲时，一个 chunk 中至少需要 4个size_t大小的空间，用来存储mchunk_prev_size，mchunk_size，fd和bk。当一个 chunk 处于使用状态时，它的下一个chunk的prev_size域肯定是无效的。所以实际上，这个空间也可以被当前chunk使用。

上文提到mchunk_size后三位作为标志位分别用于表示前一个chunk的使用情况、chunk的申请方式（brk或mmap）和分配区归属情况，glibc给出了如下宏定义用于确定标志位的信息。
```
/* size field is or'ed with PREV_INUSE when previous adjacent chunk in use */
#define PREV_INUSE 0x1

/* extract inuse bit of previous chunk */
#define prev_inuse(p)       ((p)->mchunk_size & PREV_INUSE)


/* size field is or'ed with IS_MMAPPED if the chunk was obtained with mmap() */
#define IS_MMAPPED 0x2

/* check for mmap()'ed chunk */
#define chunk_is_mmapped(p) ((p)->mchunk_size & IS_MMAPPED)


/* size field is or'ed with NON_MAIN_ARENA if the chunk was obtained
   from a non-main arena.  This is only set immediately before handing
   the chunk to the user, if necessary.  */
#define NON_MAIN_ARENA 0x4
```
<br>

# 3 bin
为了提高堆内存分配和释放的效率，glibc的malloc引入了显示链表技术来管理chunk。所谓的显示链表就是我们在数据结构中常用的链表，而链表本质上就是将一些属性相同的结点串联起来，方便管理。在glibc的malloc中这些链表统称为bin，链表中的结点就是各个 free的chunk，系统针对不同大小的free chunk，将bin分为了4类：
<br>&nbsp;&nbsp;&nbsp;&nbsp;fast bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;unsorted bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;small bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;large bin

按照bin的管理方式，又可以分别为以下两类：
<br>&nbsp;&nbsp;&nbsp;&nbsp;fastbinsY: 这是一个数组，用于记录所有小块chunk，大小无规律
<br>&nbsp;&nbsp;&nbsp;&nbsp;bin 数组: 这也是一个数组，用于记录颗粒相对较大的chunk。默认有126个元素（bin[0]和bin[127]未使用），分别是：
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1] 为 unsorted bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2~63] 为 small bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[64~126] 为 large bin

从上文可知，free chunk中存在fd和bk指针，因此bin得以通过这一结构成为双向链表。bin的初始化操作如下：
```
/*
   Initialize a malloc_state struct.

   This is called from ptmalloc_init () or from _int_new_arena ()
   when creating a new arena.
 */

static void 
malloc_init_state (mstate av)
{
  int i;
  mbinptr bin; 

  /* Establish circular links for normal bins */
  for (i = 1; i < NBINS; ++i) 
    {    
      bin = bin_at (av, i);
      bin->fd = bin->bk = bin; 
    }    

    ...

}
```
从上面代码可以看出在初始化的时候glibc的malloc将所有bin的指针都指向了自己——这就代表这些bin都是空的。需要注意的是，在初始化时，将bin数组中的第一个成员索引值设置为了1，而不是0，这个从下面访问unsorted bin的定义可以进一步证实。
```
...

/*
   Unsorted chunks

    All remainders from chunk splits, as well as all returned chunks,
    are first placed in the "unsorted" bin. They are then placed
    in regular bins after malloc gives them ONE chance to be used before
    binning. So, basically, the unsorted_chunks list acts as a queue,
    with chunks being placed on it in free (and malloc_consolidate),
    and taken off (to be either used or placed in bins) in malloc.

    The NON_MAIN_ARENA flag is never set for unsorted chunks, so it
    does not have to be taken into account in size comparisons.
 */

/* The otherwise unindexable 1-bin is used to hold unsorted chunks. */
#define unsorted_chunks(M)          (bin_at (M, 1))

...

/* addressing -- note that bin_at(0) does not exist */
#define bin_at(m, i) \
  (mbinptr) (((char *) &((m)->bins[((i) - 1) * 2]))               \
             - offsetof (struct malloc_chunk, fd))

...

```
<br>

## 3.1 fastbin
fastbin主要是用于提高小内存的分配效率，在引入tcache之前，fastbin是内存申请和释放时首要访问的结构。fastbin的规格定义如下：
```
/* offset 2 to use otherwise unindexable first 2 bins */
#define fastbin_index(sz) \   
  ((((unsigned int) (sz)) >> (SIZE_SZ == 8 ? 4 : 3)) - 2)


/* The maximum fastbin request size we support */
#define MAX_FAST_SIZE     (80 * SIZE_SZ / 4)

#define NFASTBINS  (fastbin_index (request2size (MAX_FAST_SIZE)) + 1)
```
以64位平台为例，fastbin链表数目为10，所能放置的最大chunk为160字节，glibc默认通过global_max_fast全局变量将最大chunk值限制到128字节。因此，默认情况下大小为16到128字节，公差为16的chunk将被分类到fast chunk。
  
每个fast bin都是一个单链表，内存申请释放时按照LIFO（后入先出）算法进行操作，添加操作（free 内存）就是将新的fast chunk加入链表尾，删除操作（malloc 内存）就是将链表尾部的fast chunk删除。为了实现LIFO算法，fastbinsY数组中每个fastbin元素均指向了该链表的尾结点，而尾结点通过其fd指针指向前一个结点，依次类推。
  
另外，为了保证小块内存申请释放的性能，fast bin不会对free chunk进行合并操作（chunk的合并操作将在后续详细分析），因此当free chunk被放入fastbin时， 系统会保留其使用标志位以避免自动合并操作。
<br>

## 3.2 smallbin
smallbin用于管理相对小块的chunk，以64位平台为例，smallbin管理的chunk大小小于1024字节。smallbin的特点如下：
<br>&nbsp;&nbsp;&nbsp;&nbsp;1、smallbin共有62个。每个smallbin为循环双链表，采用FIFO（先入先出）算法：内存释放操作就将新释放的chunk添加到链表的前端，分配操作就从链表的尾端中获取chunk。
<br>&nbsp;&nbsp;&nbsp;&nbsp;2、同一个smallbin中所有chunk大小是一样的。
<br>&nbsp;&nbsp;&nbsp;&nbsp;3、相邻的freechunk需要进行合并操作，即合并成一个大的freechunk。

通过如下宏可以确定当前chunk是否属于smallbin以及在smallbin中的索引：
```
#define NSMALLBINS         64
#define SMALLBIN_WIDTH    MALLOC_ALIGNMENT
#define SMALLBIN_CORRECTION (MALLOC_ALIGNMENT > 2 * SIZE_SZ)
#define MIN_LARGE_SIZE    ((NSMALLBINS - SMALLBIN_CORRECTION) * SMALLBIN_WIDTH)

#define in_smallbin_range(sz)  \
  ((unsigned long) (sz) < (unsigned long) MIN_LARGE_SIZE)

...

#define smallbin_index(sz) \
  ((SMALLBIN_WIDTH == 16 ? (((unsigned) (sz)) >> 4) : (((unsigned) (sz)) >> 3))\
   + SMALLBIN_CORRECTION)
```
以64位平台为例，第一个smallbin中chunk大小为 32 ~ 47 字节，后续每个smallbin中chunk的大小依次增加16字节，即最后一个smallbin的chunk最小值为 32+62*16=1008 字节。
<br>

## 3.3 largebin
largebin用于管理相对大块的chunk，以64位平台为例，largebin管理的chunk大小大于等于1024字节的chunk，largebin的特点如下：
<br>&nbsp;&nbsp;&nbsp;&nbsp;1、large bin 总共有63个。largebin类似于smallbin，只是需要注意两点：一是同一个largebin中每个chunk的大小可以不一样，但必须处于某个给定的范围；二是largechunk可以添加、删除在largebin的任何一个位置。
<br>&nbsp;&nbsp;&nbsp;&nbsp;2、largebin的合并操作类似于smallbin。
  
通过如下宏可以确定当前chunk是否属于largebin以及在largebin中的索引：
```
#define largebin_index_32(sz)                                                \
  (((((unsigned long) (sz)) >> 6) <= 38) ?  56 + (((unsigned long) (sz)) >> 6) :\
   ((((unsigned long) (sz)) >> 9) <= 20) ?  91 + (((unsigned long) (sz)) >> 9) :\
   ((((unsigned long) (sz)) >> 12) <= 10) ? 110 + (((unsigned long) (sz)) >> 12) :\
   ((((unsigned long) (sz)) >> 15) <= 4) ? 119 + (((unsigned long) (sz)) >> 15) :\
   ((((unsigned long) (sz)) >> 18) <= 2) ? 124 + (((unsigned long) (sz)) >> 18) :\
   126)

#define largebin_index_32_big(sz)                                            \
  (((((unsigned long) (sz)) >> 6) <= 45) ?  49 + (((unsigned long) (sz)) >> 6) :\
   ((((unsigned long) (sz)) >> 9) <= 20) ?  91 + (((unsigned long) (sz)) >> 9) :\
   ((((unsigned long) (sz)) >> 12) <= 10) ? 110 + (((unsigned long) (sz)) >> 12) :\
   ((((unsigned long) (sz)) >> 15) <= 4) ? 119 + (((unsigned long) (sz)) >> 15) :\
   ((((unsigned long) (sz)) >> 18) <= 2) ? 124 + (((unsigned long) (sz)) >> 18) :\
   126)

// XXX It remains to be seen whether it is good to keep the widths of
// XXX the buckets the same or whether it should be scaled by a factor
// XXX of two as well.
#define largebin_index_64(sz)                                                \
  (((((unsigned long) (sz)) >> 6) <= 48) ?  48 + (((unsigned long) (sz)) >> 6) :\
   ((((unsigned long) (sz)) >> 9) <= 20) ?  91 + (((unsigned long) (sz)) >> 9) :\
   ((((unsigned long) (sz)) >> 12) <= 10) ? 110 + (((unsigned long) (sz)) >> 12) :\
   ((((unsigned long) (sz)) >> 15) <= 4) ? 119 + (((unsigned long) (sz)) >> 15) :\
   ((((unsigned long) (sz)) >> 18) <= 2) ? 124 + (((unsigned long) (sz)) >> 18) :\
   126)

#define largebin_index(sz) \
  (SIZE_SZ == 8 ? largebin_index_64 (sz)                                     \
   : MALLOC_ALIGNMENT == 16 ? largebin_index_32_big (sz)                     \
   : largebin_index_32 (sz))
```
从以上定义可以看出，largebin中chunk链表的大小不是单纯的递增关系。以64位平台为例，前32个largebin依次以64字节步长为间隔，即第一个largebin中chunksize为 1024 ~ 1087 字节。。。第二个largebin中chunksize为 1088 ~ 1151 字节。紧随其后的16个largebin依次以512字节步长为间隔；之后的8个bin以步长4096为间隔；再之后的4个bin以32768字节为间隔；之后的2个bin以262144字节为间隔；剩下的chunk就放在最后一个largebin中。鉴于同一个largebin中每个chunk的大小不一定相同，因此为了加快内存分配和释放的速度，就将同一个largebin中的所有chunk按照chunksize进行从大到小的排列：最大的chunk放在链表的前端，最小的chunk放在尾端。
  
当用户请求的大小超过smallbin的最大值时将进入largebin的判断逻辑，具体来说就是找到用户请求的大小落在哪个largebin的区间，然后判断该largebin中最大的chunk的size是否大于用户请求的大小。如果大于，就从尾部开始遍历该largebin，找到第一个大小相等或接近的chunk，分配给用户；如果尾端最小的chunk大于用户请求的大小的话，就将该chunk拆分为两个chunk：前者返回给用户，大小等同于用户请求的大小，剩余的部分做为一个新的chunk添加到unsortedbin中；如果该largebin中最大的chunk的大小小于用户请求的大小的话，那么就依次查看后续的largebin中是否有满足需求的chunk。
  
另外，为了提高检索速度，glibc malloc引入了binmap，其定义和使用方式如下：
```
  /* Bitmap of bins */
  unsigned int binmap[BINMAPSIZE];

...

#define mark_bin(m, i)    ((m)->binmap[idx2block (i)] |= idx2bit (i))
#define unmark_bin(m, i)  ((m)->binmap[idx2block (i)] &= ~(idx2bit (i)))
#define get_binmap(m, i)  ((m)->binmap[idx2block (i)] & idx2bit (i))
```
binmap记录了各个bin中是否为空，通过位图算法可以避免检索一些空的bin。如果通过binmap找到了下一个非空的largebin的话，就按照上一段中的方法分配chunk，否则就使用topchunk来分配合适的内存，后者的分配方式将在后续详细讲解。
<br>

## 3.4 unsortedbin
unsortedbin顾名思义，为大小无规律的bin链表。当释放较小或较大的chunk的时候，如果系统没有将它们添加到对应的bin中系统就将这些chunk添加到unsortedbin中。利用unsortedbin，可以加快内存的分配和释放操作，因为整个操作都不再需要花费额外的时间去查找合适的bin了。unsortedbin的特性如下：
<br>&nbsp;&nbsp;&nbsp;&nbsp;1、unsortedbin只有1个，unsortedbin是一个由freechunk组成的循环双链表。
<br>&nbsp;&nbsp;&nbsp;&nbsp;2、不同于其他的bin，在unsortedbin中，对chunk的大小并没有限制，任何大小的chunk都可以归属到unsortedbin中。

unsorted chunks的访问方式如下，为了便于管理，glibc malloc将bin链表中的bin[1]设置为了unsorted chunk的链表头。
```
/*
   Unsorted chunks

    All remainders from chunk splits, as well as all returned chunks,
    are first placed in the "unsorted" bin. They are then placed
    in regular bins after malloc gives them ONE chance to be used before
    binning. So, basically, the unsorted_chunks list acts as a queue,
    with chunks being placed on it in free (and malloc_consolidate),
    and taken off (to be either used or placed in bins) in malloc.

    The NON_MAIN_ARENA flag is never set for unsorted chunks, so it
    does not have to be taken into account in size comparisons.
 */

/* The otherwise unindexable 1-bin is used to hold unsorted chunks. */
#define unsorted_chunks(M)          (bin_at (M, 1))
```
<br>



# 4 arena
arena原本的翻译是竞技场，网上一般都将glibc中的arena翻译成分配区。arena被用于降低SMP多线程环境下锁竞争激烈的问题。分配区分为主分配区和thread分配区，前者每个进程仅有一个，其余均为thread分配区。glibc malloc根据系统对分配区的争用情况动态增加thread分配区的数量，分配区的数量一旦增加，就不会再减少了。主分配区可以访问进程的heap区域和mmap映射区域，也就是说主分配区可以使用sbrk和mmap向操作系统申请虚拟内存。而thread分配区只能访问进程的mmap映射区域，thread分配区每次使用mmap()向操作系统“批发”HEAP_MAX_SIZE（64位系统默认为64MB）大小的虚拟内存，当用户向thread分配区请求分配内存时再切割成小块“零售”出去以减少系统调用开销。
```
/*
   have_fastchunks indicates that there are probably some fastbin chunks.
   It is set true on entering a chunk into any fastbin, and cleared early in
   malloc_consolidate.  The value is approximate since it may be set when there
   are no fastbin chunks, or it may be clear even if there are fastbin chunks
   available.  Given it's sole purpose is to reduce number of redundant calls to
   malloc_consolidate, it does not affect correctness.  As a result we can safely
   use relaxed atomic accesses.
 */


struct malloc_state
{
  /* Serialize access.  */
  __libc_lock_define (, mutex);

  /* Flags (formerly in max_fast).  */
  int flags;

  /* Set if the fastbin chunks contain recently inserted free blocks.  */
  /* Note this is a bool but not all targets support atomics on booleans.  */
  int have_fastchunks;

  /* Fastbins */
  mfastbinptr fastbinsY[NFASTBINS];

  /* Base of the topmost chunk -- not otherwise kept in a bin */
  mchunkptr top;

  /* The remainder from the most recent split of a small request */
  mchunkptr last_remainder;

  /* Normal bins packed as described above */
  mchunkptr bins[NBINS * 2 - 2];

  /* Bitmap of bins */
  unsigned int binmap[BINMAPSIZE];

  /* Linked list */
  struct malloc_state *next;

  /* Linked list for free arenas.  Access to this field is serialized
     by free_list_lock in arena.c.  */
  struct malloc_state *next_free;

  /* Number of threads attached to this arena.  0 if the arena is on
     the free list.  Access to this field is serialized by
     free_list_lock in arena.c.  */
  INTERNAL_SIZE_T attached_threads;

  /* Memory allocated from the system in this arena.  */
  INTERNAL_SIZE_T system_mem;
  INTERNAL_SIZE_T max_system_mem;
};
```
分配区的定义如上所示，从定义中我们可看到上文提到的fastbinsY、bins等结构。可以看出，分配区实际上可以理解为glibc malloc数据的根管理结构，从分配区出发，不同大小的内存块被保存在不同类型的链表中，从而应对用户不同的内存需求，并实现内存碎片和性能的折中。

需要注意的是分配区中的top成员，我们称其为top chunk，top chunk处于一个arena的最顶部（即最高内存地址处）。该chunk并不属于任何bin，而是在当前的heap所有的freechunk都无法满足用户请求的内存大小的时候，将此chunk当做一个应急消防员，分配给用户使用。如果top chunk的大小比用户请求的大小要大的话，就仅从top chunk中切分出一部分给用户，剩余的部分仍做top chunk。否则，就需要扩展heap或分配新的heap了，在主分配区中通过sbrk扩展heap，而在thread分配区中通过mmap分配新的heap。

```
/*
   Top

    The top-most available chunk (i.e., the one bordering the end of
    available memory) is treated specially. It is never included in
    any bin, is used only if no other chunk is available, and is
    released back to the system if it is very large (see
    M_TRIM_THRESHOLD).  Because top initially
    points to its own bin with initial zero size, thus forcing
    extension on the first malloc request, we avoid having any special
    code in malloc to check whether it even exists yet. But we still
    need to do so when getting memory from system, so we make
    initial_top treat the bin as a legal but unusable chunk during the
    interval between initialization and the first call to
    sysmalloc. (This is somewhat delicate, since it relies on
    the 2 preceding words to be zero during this interval as well.)
 */

/* Conveniently, the unsorted bin can be used as dummy top on first call */
#define initial_top(M)              (unsorted_chunks (M))
```
top chunk的初始化定义如上，可以看出glibc暂时把top chunk看做一个unsorted chunk来初始化，当然，后续使用的时候还是认为top chunk不属于任何bin。
<br>

# 5 heap
上文提到thread分配区每次使用mmap()向操作系统“批发”HEAP_MAX_SIZE（64位系统默认为64MB）大小的虚拟内存，这部分内存在glibc中被称为heap。需要注意的是，此处的heap并非广义上的进程的虚拟内存空间中的堆，而是子线程通过系统调用mmap从操作系统申请的一块内存空间。一块heap由heap_info来管理，其定义如下：
```
/* A heap is a single contiguous memory region holding (coalesceable)
   malloc_chunks.  It is allocated with mmap() and always starts at an
   address aligned to HEAP_MAX_SIZE.  */
        
typedef struct _heap_info
{         
  mstate ar_ptr; /* Arena for this heap. */
  struct _heap_info *prev; /* Previous heap. */
  size_t size;   /* Current size in bytes. */
  size_t mprotect_size; /* Size in bytes that has been mprotected
                           PROT_READ|PROT_WRITE.  */
  /* Make sure the following data is properly aligned, particularly
     that sizeof (heap_info) + 2 * SIZE_SZ is a multiple of
     MALLOC_ALIGNMENT. */
  char pad[-6 * SIZE_SZ & MALLOC_ALIGN_MASK];
} heap_info;
```
在当前heap不够用的时候，malloc会通过系统调用mmap申请新的heap，同一个thread分配区至少有一个heap，heap与heap直接也通过链表的形式穿起来，当出现空heap时glibc又可以将其回收。
<br>


# 6 tcache
tcache全名thread local caching，2.26版本正式引入，具体commitd5c3fafc4307c9b7a4c7d5cb381fcdbfad340bcc。该机制通过给每个线程创建一个缓存，实现无锁的分配算法，用于提升性能，目前openEuler的glibc默认开启，用户可以在编译时通过USE_TCACHE条件来设置tcache机制开启或关闭。
  
tcache引入了两个新的数据结构：tcache_entry和tcache_perthread_struct，具体定义如下：
```
#if USE_TCACHE

/* We overlay this structure on the user-data portion of a chunk when
   the chunk is stored in the per-thread cache.  */
typedef struct tcache_entry
{
  struct tcache_entry *next;
  /* This field exists to detect double frees.  */
  struct tcache_perthread_struct *key;
} tcache_entry;

/* There is one of these for each thread, which contains the
   per-thread cache (hence "tcache_perthread_struct").  Keeping
   overall size low is mildly important.  Note that COUNTS and ENTRIES
   are redundant (we could have just counted the linked list each
   time), this is for performance reasons.  */
typedef struct tcache_perthread_struct
{
  char counts[TCACHE_MAX_BINS];
  tcache_entry *entries[TCACHE_MAX_BINS];
} tcache_perthread_struct;

static __thread bool tcache_shutting_down = false;
static __thread tcache_perthread_struct *tcache = NULL;

...

#endif
```
  
tcache_perthread_struct包含一个数组entries，用于放置bins，bins的数目定义如下，可知默认可存放64个bins，数组 counts存放每个bins中的chunk数量。每个被放入相应bins中的chunk都会在其用户数据中包含一个tcache_entry（FD指针），指向同 bins 中的下一个 chunk，构成单链表。
  
值得注意的比如每个线程默认使用64个单链表结构的bins，每个bins最多存放7个chunk。chunk的大小在64位机器上以16字节递增，从24到1032 字节。32位机器上则是以8字节递增，从12到512字节。所以tcache bin只用于存放non-large的chunk。
```
#if USE_TCACHE
/* We want 64 entries.  This is an arbitrary limit, which tunables can reduce.  */
# define TCACHE_MAX_BINS        64
# define MAX_TCACHE_SIZE    tidx2usize (TCACHE_MAX_BINS-1)

/* Only used to pre-fill the tunables.  */
# define tidx2usize(idx)    (((size_t) idx) * MALLOC_ALIGNMENT + MINSIZE - SIZE_SZ)

/* When "x" is from chunksize().  */
# define csize2tidx(x) (((x) - MINSIZE + MALLOC_ALIGNMENT - 1) / MALLOC_ALIGNMENT)
/* When "x" is a user-provided size.  */
# define usize2tidx(x) csize2tidx (request2size (x))

/* With rounding and alignment, the bins are...
   idx 0   bytes 0..24 (64-bit) or 0..12 (32-bit)
   idx 1   bytes 25..40 or 13..20
   idx 2   bytes 41..56 or 21..28
   etc.  */

/* This is another arbitrary limit, which tunables can change.  Each
   tcache bin will hold at most this number of chunks.  */
# define TCACHE_FILL_COUNT 7
#endif
```
<br>

# 参考资料
Ptmalloc2 源代码分析 华庭（庄明强）

Linux 堆内存管理深入分析：https://murphypei.github.io/blog/2019/01/linux-heap

glibc tcache 机制： https://firmianay.gitbooks.io/ctf-all-in-one/content/doc/4.14_glibc_tcache.html
