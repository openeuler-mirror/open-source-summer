---
title: "[Open Source Promotion Plan] Learning About libFuzzer"
date: 2021-08-14
tags: 
    - Fuzzing
    - Peng Cheng Laboratory
    - summer2021
archives: 2021-08
author: cascades
summary: libFuzzer is an in-process, coverage-guided, evolutionary fuzzing engine for library functions. It is included in the LLVM project.
---

# Learning About libFuzzer

This article was first published in the openEuler community [Open Source Promotion Plan](https://summer.iscas.ac.cn/).  
Project Name: [No. 112 Improving QEMU Fuzzing](https://gitee.com/openeuler-competition/summer2021-112)  

## About This Document

libFuzzer is an `in-process`, `coverage-guided`, and `evolutionary` fuzzing engine that is a part of the LLVM project. It provides the fuzzing input for the to-be-tested library and related functions through a specific entry point. During the test, libFuzzer constantly mutates the input and measures code coverage and crashes.  

* [Project location](https://www.llvm.org/docs/LibFuzzer.html)
* [Code path](https://github.com/llvm/llvm-project/tree/main/compiler-rt/lib/fuzzer)

## Using libFuzzer

### Experiment Environment

The cloud host of the Peng Cheng Laboratory running openEuler is used.  

```bash=
[root@host-10-0-0-94 libFuzzer]# lscpu
Architecture:                    aarch64
CPU op-mode(s):                  64-bit
Byte Order:                      Little Endian
CPU(s):                          4

[root@host-10-0-0-94 libFuzzer]# cat /etc/os-release
NAME="openEuler"
VERSION="20.03 (LTS-SP1)"
```

### Using libFuzzer in Simple Mode

[libFuzzer tutorial](https://github.com/google/fuzzing/blob/master/tutorial/libFuzzerTutorial.md)

1. Install LLVM and Clang.
    * [Source code build](https://clang.llvm.org/get_started.html#build): The requirements on the host are strict (8 GB memory and 15 GB to 20 GB drives), and the build commands need to be optimized. In addition, install [`compile-rt`](https://compiler-rt.llvm.org) on which libFuzzer depends.  
     ```bash=
    git clone https://gitee.com/mirrors/LLVM.git
    cd LLVM ; mkdir build ; cd build
    cmake -DLLVM_ENABLE_PROJECTS="clang;clang-tools-extra;compiler-rt" -DCMAKE_BUILD_TYPE="Release" -DLLVM_TARGETS_TO_BUILD="host" -G "Unix Makefiles" ../llvm
    make -j4
     ```

    * [Binary installation](https://github.com/llvm/llvm-project/releases): Download the binary files of various versions to facilitate version switching. Add soft links to environment variables for ease of use.  
    * [Package manager installation](https://www.rootusers.com/how-to-install-dnf-package-manager-in-centosrhel/): The package manager version is old and contains libFuzzer.  
    ```bash=
    # Run the sudo apt/dnf search xxx command to view the software contained in the package manager and the version.
    sudo apt/dnf install clang llvm compiler-rt
    ```

2. Build the binary file to be tested and add the libFuzzer build option.  

    ```cpp=
    // The function interface provided by libFuzzer is implemented in the source code fuzz_me.cc to be tested.
    extern "C" int LLVMFuzzerTestOneInput(const uint8_t *Data, size_t Size) {
      DoSomethingInterestingWithMyAPI(Data, Size);
      return 0;  // Non-zero return values are reserved for future use.
    }
    ```

    ```bash=
    # Clang searches for the static link libraries of libclang_rt.xxx.a, that is, sanitizers.
    # In addition to ASAN, other sanitizers such as UBSAN and TSAN can be added.
    clang -fsantize=address,fuzzer -g fuzz_me.c -o fuzz_me
    ```

If the build command fails to be executed, the installation in the previous step fails. In this case, check the location of the compile-rt library or reinstall the library.  

3. Run the binary file and check the output.  
    ```bash=
    ./fuzz_me 
    grep ERROR ./*.log | sort -k 3
    ```
If a sanitizer detects an abnormal behavior of the program, fuzzing output (a crash) is generated. In addition to the crash, the fuzzer also records parameters during fuzzing, such as code coverage (in the unit of basic block) and seed mutation.  

4. Reproduce the input to locate the vulnerability.  
    ```bash=
    ./fuzz_me crash-xxx
    ./fuzz_me -seed=xxx # xxx is the SHA-1 hash value of the crash.
    gdb fuzz_me
    ```
The sanitizer provides the vulnerability type and the environment where the vulnerability is triggered. Check the crash details, then reproduce the vulnerability, or use the GDB for debugging.  

![](https://img-blog.csdnimg.cn/img_convert/585afb1d9b9b3892943e01d85abc25de.png)


### Helpful Utilities
For large-scale software, some build options need to be enabled to improve fuzzing efficiency.  
* `-jobs`: number of jobs. Each job triggers a crash. Jobs run in the worker processes. One worker can manage multiple jobs. If **-jobs** is set to **1000**, simple bugs of the program can be bypassed.  
* `-workers`: number of processes. A maximum of half of the CPU cores can be used.  
* `-forks`: Replace `-jobs = N` and `-workers = N` with `-fork = N`.
* `-dict`: dictionary, which is necessary for fuzzing files in a specific format.  
* `CORPUS`: corpus, which is used to save the input for triggering new paths in fuzzing.  
* `-max-len`: maximum input length, which is defined based on the size of the corpus file.  
* `-run`: Reduce the crash producer. The unit is the number of mutations in each iteration.  
* `-shrink`: Reduce the corpus size to improve code coverage.  


### Project Practice
* Course: The [`libFuzzer workshop`](https://github.com/Dor1s/libfuzzer-workshop/) includes common methods for using libFuzzer.  
* Open source project CVE practice: libFuzzer has discovered [many vulnerabilities](https://www.llvm.org/docs/LibFuzzer.html#trophies) in open source software, including the Heartbleed vulnerability in OpenSSL. Find a piece of open source software with vulnerabilities in Google [`fuzzer-test-suite`](https://github.com/google/fuzzer-test-suite) and reproduce the vulnerabilities using libFuzzer.  
* Comparison with other tools: see [Related links](https://github.com/google/fuzzing/blob/master/tutorial/libFuzzerTutorial.md#related-links) in the libFuzzer tutorial.  

## libFuzzer Principles

### Mutation Algorithms
Mutation is a key step in modern fuzzers because it generates new inputs that can cover more basic blocks. libFuzzer contains a series of built-in simple mutation algorithms, most of which are bit-level inversion. It also supports user-defined mutation algorithms for targeted fuzzing.  

#### Existing Mutation Algorithms
By observing the [`Stderr Output`](https://www.llvm.org/docs/LibFuzzer.html#output) of libFuzzer, you can find the mutation algorithms used by the current input in the MS field. See the following figure:  

![](https://img-blog.csdnimg.cn/img_convert/cac0122be891840a29113c2a1136c681.png)

libFuzzer has 12 built-in mutation algorithms, which are member functions of the `MutationDispatcher` class. The class definition code is as follows:  

```cpp=
// Code path: LLVM/compiler-rt/lib/fuzzer/FuzzerMutate.cpp

MutationDispatcher::MutationDispatcher(Random &Rand, const FuzzingOptions &Options) : Rand(Rand), Options(Options) {
    DefaultMutators.insert(
        DefaultMutators.begin(),
        {
            {&MutationDispatcher::Mutate_EraseBytes, "EraseBytes"},
            {&MutationDispatcher::Mutate_InsertByte, "InsertByte"},
            {&MutationDispatcher::Mutate_InsertRepeatedBytes, "InsertRepeatedBytes"},
            {&MutationDispatcher::Mutate_ChangeByte, "ChangeByte"},
            {&MutationDispatcher::Mutate_ChangeBit, "ChangeBit"},
            {&MutationDispatcher::Mutate_ShuffleBytes, "ShuffleBytes"},
            {&MutationDispatcher::Mutate_ChangeASCIIInteger, "ChangeASCIIInt"},
            {&MutationDispatcher::Mutate_ChangeBinaryInteger, "ChangeBinInt"},
            {&MutationDispatcher::Mutate_CopyPart, "CopyPart"},
            {&MutationDispatcher::Mutate_CrossOver, "CrossOver"},
            {&MutationDispatcher::Mutate_AddWordFromManualDictionary, "ManualDict"},
            {&MutationDispatcher::Mutate_AddWordFromPersistentAutoDictionary, "PersAutoDict"},
        });
        // Implementation of the preceding functions
    }
```

The names of most mutation algorithms reflect their implementation methods. For example, `EraseBytes` calls the `memmove` function to overwrite some bits, and `InsertBytes` calls the `memmove` function to add a bit. It should be noted that in these built-in mutation algorithms, the mutation point and the mutation value are generated using a random function of the `Rand` series.


#### Adding a Mutation Algorithm

libFuzzer and AFL are `coverage-guided` fuzzing tools. When fuzzing specific objects, they may be filtered out at the early stage of program running because the mutation algorithms do not contain semantic information. Compared with generation-based fuzzing tools, libFuzzer and AFL are inefficient. Therefore, Google proposed [`structure-aware fuzzing`](https://github.com/google/fuzzing/blob/master/docs/structure-aware-fuzzing.md), a `libFuzzer plugin` that allows users to add mutation algorithms. This section describes how to add a plugin and lists some officially implemented plugins.  

The following code shows how to add a plugin. Implement a user-defined `LLVMFuzzerCustomMutator` function, add a specific mutation algorithm, and call `LLVMFuzzerMutate` in the function to implement common mutation.  

When implementing code, use the conditional compilation instructions `ifdef CUSTOM_MUTATOR` and `clang -DCUSTOM_MUTATOR` to enable or disable the user-defined plugin.  

```cpp=
// Optional user-provided custom mutator. 
// Mutates raw data in [Data, Data+Size) inplace. 
// Returns the new size, which is not greater than MaxSize. 
// Given the same Seed produces the same mutation. 
size_t LLVMFuzzerCustomMutator(uint8_t *Data, size_t Size, size_t MaxSize, unsigned int Seed); 

// libFuzzer-provided function to be used inside LLVMFuzzerCustomMutator.
// Mutates raw data in [Data, Data+Size) inplace.
// Returns the new size, which is not greater than MaxSize.
size_t LLVMFuzzerMutate(uint8_t *Data, size_t Size, size_t MaxSize);
```

To add your own plugins, refer to the [related links](https://github.com/google/fuzzing/blob/master/docs/structure-aware-fuzzing.md#related-links) or the topic [`"Structure-aware fuzzing for Clang and LLVM with libprotobuf-mutator"`](https://www.youtube.com/watch?v=U60hC16HEDY) at the 2017 LLVM Developers' Meeting.  

### Coverage Statistics

Analyze code coverage from the following two perspectives:  

* **Statistical precision**: From rough to precise, code coverage are classified into three levels:  
    * `Function level`: Collects statistics on called functions. Statistics on the internal code of the functions are ignored.  
    * `Basic block level`: Collects statistics on basic blocks, which can be queried in the **cov** field of [`Stderr Output`](https://www.llvm.org/docs/LibFuzzer.html#output) in libFuzzer.  
    * `Edge level`: Collects statistics on not only basic blocks, but also virtual blocks created between basic blocks and the execution information.  

![](https://img-blog.csdnimg.cn/img_convert/f3d19dfa66d44924b3386cd6860505c5.png)

* **Analysis object**: The basic statistics method is instrumentation by adding count variables. There are three levels:  
    * `Source code`: Provides coverage statistics modes in build options.
    * `Intermediate representation`: Specifies statistics collection mode, for example, `llvm pass`.
    * `Binary`: Use binary instrumentation tools such as `Pin` and `DynamoRIO` to collect statistics on hooks.

In short, libFuzzer uses [`SanitizerCoverage`](https://clang.llvm.org/docs/SanitizerCoverage.html) in the LLVM framework to collect source code–level coverage statistics. You can run the following command to specify the level. By default, the `edge` level is used.  

```bash=
# xxx=edge,bb,func,trace-pc-guard,inline-8bit-counters,inline-bool-flag,pc-table,trace-pc
clang -fsanitize-coverage=xxx fuzz_me.c
```

In addition, you can develop analysis tools using `SanitizerCoverage`. The sanitizer provides a coverage callback interface that allows you to dump the coverage statistics result to a `.sancov` file when the fuzzing process is stopped. The LLVM framework provides the `Sancov Tool` to generate source code–level coverage reports.  

### Error Check

#### Common Errors

As mentioned, the mission of each `job` in the libFuzzer process is to complete the check task. It does not stop until a crash occurs or it times out. In this case, the libFuzzer daemon process captures the error code. If the error code is **77**, a timeout occurs (the default timeout interval is 1,200 seconds) or the libFuzzer program is abnormal. If the error code is **crash**, the result and the input that causes the crash are recorded.  

#### Sanitizers

Crash detection does not cover all fuzzing error check scenarios. For example, memory leakage and data races may not cause crashes, but they are serious errors. In such cases, memory detection tools such as `Valgrind` can be used. libFuzzer uses a series of [`sanitizers`](https://github.com/google/sanitizers) in the LLVM framework. These tools are provided by Google and can be used to detect runtime exceptions of C/C++. Common sanitizers are as follows:  
* `AddressSanitizer (ASAN)`: Captures stack overflow and UAF vulnerabilities.  
* `ThreadSanitizer (TSAN)`: Captures data races and supports C/C++ and Go.  
* `UndefinedBehaviorSanitizer (UBSAN)`: Captures abnormal behaviors such as integer overflow and null pointer dereference.  

ASAN is used as an example to analyze the principles of these error check tools. For details, see [`USENIX ATC 2021`](http://research.google.com/pubs/pub37752.html).  

1. During compilation, ASAN performs instrumentation before and after LLVM IR-level memory access operations (load, store, and alloca). Due to the 8-byte alignment requirement of memory, some memory is in unused status. Set it to `shadow memory` in memory mapping mode to show the read and write status.  
2. Hook the malloc function during running and set the `Redzone` area before and after the function, which is similar to the stack canary method. Set the shadow memory in the Redzone to unwritable to avoid overflow.  
3. Perform hook operations on the free function during running. Instead of releasing memory immediately, set the shadow memory to a negative value. That is, the shadow memory cannot be read or written, and is placed in the isolation area for observation. If UAF or wild pointer dereference occurs, it will be captured.  

![](https://img-blog.csdnimg.cn/img_convert/e70c15eb1734af0179d9745801a3e88d.png)


## Other Fuzzers

* Academia: As a hot academic topic in recent years, fuzzing-related papers were presented at top international conferences for fields such as system security, network security, software analysis, and programming language. For details, see the [`FuzzingPaper`](https://github.com/wcventure/FuzzingPaper) project. Most of these papers propose a fuzzer for a specific object (software, hardware, OS kernel, programming language, etc.) or a specific vulnerability type (race condition, buffer overflow, etc.), and use methods such as concolic fuzzing and deep learning to improve fuzzing efficiency.  

* Industry: Many tools are developed on GitHub based on AFL and libFuzzer, and subsequently many companies developing fuzzing technologies have emerged. Google developed a series of fuzzing tools and the `FuzzBench` platform to evaluate fuzzer performance in a unified manner.  

In short, the research on fuzzing in academia and industry is closely related. Most fuzzing technologies are implemented based on the LLVM framework and are highly scalable. The academic research is conducted based on the existing tools in the industry, and the achievements with good performance are released on GitHub. The following lists some fuzzers. For more fuzzers, visit [`Awesome-Fuzzing`](https://github.com/secfigo/Awesome-Fuzzing).  
* Generic fuzzers
    * [`libFuzzer-gv`](https://github.com/guidovranken/libfuzzer-gv): enhanced edition of libFuzzer

    * [`AFL++`](https://aflplus.plus/): enhanced edition of AFL

    * [`OSS-Fuzz`](https://google.github.io/oss-fuzz/) + [ClusterFuzz](https://google.github.io/clusterfuzz): large-scale distributed fuzzer implemented through cooperation between the frontend and backend

    * [`boofuzz`](https://boofuzz.readthedocs.io/en/stable/): enhanced edition of the Sulley framework

    * [`phuzzer`](https://github.com/angr/phuzzer): Python framework for interacting with AFL

* Safety
     * [`Honggfuzz`](https://honggfuzz.dev/): fuzzer targeting at software security vulnerabilities


* Network protocol
    * [`AFLNet`](https://github.com/aflnet/aflnet): gray-box fuzzer for network protocols

* Kernel
    * [`Syzkaller`](https://github.com/google/syzkaller): unsupervised Linux kernel fuzzer

* Programming language
    * [Fuzzers implemented using Rust](https://github.com/rust-fuzz): AFL, libFuzzer, and Honggfuzz
    * [`PolyGlot`](https://github.com/s3team/Polyglot): fuzzer for programming language interpreters

* IoT
    * [`FirmAFL`](https://github.com/zyw-200/FirmAFL): gray-box fuzzer for IoT firmware
    * [`DIANE`](https://github.com/ucsb-seclab/diane): fuzzer for IoT applications on mobile phones
    * [`Frankenstein`](https://github.com/seemoo-lab/frankenstein): fuzzer for wireless IoT devices

If there are any errors, please contact [cascades-sjtu](https://cascadeschen.cn).
