---
title: iSula与JSON的斗争
date: 2020-09-09
tags:
    - iSulad
    - JSON
archives: 2020-09
author: haozi007
summary: iSulad是如何处理JSON的呢？
---

对于各位习惯各种高级语言的伙伴们来说，JSON的解析和生成是如呼吸般简单自然的事情。但是对于C语言，JSON的解析和生成就麻烦了。根本原因是由于C语言不支持反射，没办法对JSON作动态解析和生成。但是，容器引擎中涉及大量的JSON解析和生成。那么，我们为了更好的和JSON进行和谐相处，做了那些努力呢？

大体上，iSula经历了几个阶段，为了更好的感受这几个阶段的差距；我觉得通过武器的不同时代来感受一下。

## 冷兵器时代

C语言还是有一些JSON解析的库的，例如`yajl`，`cjson`等等；这些库提供了把JSON字符串解析为tree结构的元素集合，然后通过遍历书可以快速的找到JSON的`key/value`的对应关系和值。而且也能自己构建对应的元素结合tree，然后生成JSON字符串。那么，如何通过这些库来做JSON和C结构体直接的相互转换呢？

### 用法

以`yajl`为例，实现一个`isula_version`结构体的marshal和unmarshal.

```c
#include <yajl/yajl_tree.h>
#include <yajl/yajl_gen.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

struct isula_version {
    int large;
    int middle;
    int small;
    char *version;
};

void free_isula_version(struct isula_version *ptr)
{
    if (ptr == NULL) {
        return;
    }
    free(ptr->version);
    ptr->version = NULL;
    free(ptr);
}

static inline yajl_val get_val(yajl_val tree, const char *name, yajl_type type) {                                                                                     
    const char *path[] = { name, NULL };
    return yajl_tree_get(tree, path, type);
}

struct isula_version *unmarshal(const char *json_str)
{
    char buf[1024];
    yajl_val tree;
    struct isula_version *result = NULL;

    if (json_str == NULL) {
        return NULL;
    }
    result = calloc(1, sizeof(struct isula_version));
    if (result == NULL) {
        return NULL;
    }
    tree = yajl_tree_parse(json_str, buf, sizeof(buf));
    if (tree == NULL) {
        printf("Invalid json string: %s\n", json_str);
        goto err_out;
    }
    {
        yajl_val val = get_val(tree, "Large", yajl_t_number);
        if (val != NULL) {
            result->large = YAJL_GET_INTEGER(val);
        }
    }
    {
        yajl_val val = get_val(tree, "Small", yajl_t_number);
        if (val != NULL) {
            result->small = YAJL_GET_INTEGER(val);
        }
    }
    {
        yajl_val val = get_val(tree, "Middle", yajl_t_number);
        if (val != NULL) {
            result->middle = YAJL_GET_INTEGER(val);
        }
    }
    {
        yajl_val val = get_val(tree, "Version", yajl_t_string);
        if (val != NULL) {
            char *str = YAJL_GET_STRING(val);
            result->version = strdup(str);
        }
    }

    goto out;
err_out:
    free_isula_version(result);
    result = NULL;
out:
    yajl_tree_free(tree);
    return result;
}

char *marshal(struct isula_version *ptr)
{
    char *result = NULL;
    const unsigned char *gen_buf = NULL;
    size_t gen_len = 0;

    if (ptr == NULL) {
        return NULL;
    }

    yajl_gen g = yajl_gen_alloc(NULL);
    yajl_gen_status stat = yajl_gen_status_ok;

    stat = yajl_gen_map_open((yajl_gen)g);
    if (stat != yajl_gen_status_ok) {
        goto free_out;
    }
    /* gen struct items */
    if (ptr->version != NULL) {
        stat = yajl_gen_string((yajl_gen)g, (const unsigned char *)("Version"), strlen("Version"));
        if (yajl_gen_status_ok != stat) {
            goto free_out;
        }
        stat = yajl_gen_string((yajl_gen)g, (const unsigned char *)ptr->version, strlen(ptr->version));
        if (yajl_gen_status_ok != stat) {
            goto free_out;
        }
    }

    stat = yajl_gen_string((yajl_gen)g, (const unsigned char *)("Large"), strlen("Large"));
    if (yajl_gen_status_ok != stat) {
        goto free_out;
    }

    stat = yajl_gen_integer((yajl_gen)g, (long long int)ptr->large);
    if (yajl_gen_status_ok != stat) {
        goto free_out;
    }

    stat = yajl_gen_string((yajl_gen)g, (const unsigned char *)("Middle"), strlen("Middle"));
    if (yajl_gen_status_ok != stat) {
        goto free_out;
    }

    stat = yajl_gen_integer((yajl_gen)g, (long long int)ptr->middle);
    if (yajl_gen_status_ok != stat) {
        goto free_out;
    }

    stat = yajl_gen_string((yajl_gen)g, (const unsigned char *)("Small"), strlen("Small"));
    if (yajl_gen_status_ok != stat) {
        goto free_out;
    }

    stat = yajl_gen_integer((yajl_gen)g, (long long int)ptr->small);
    if (yajl_gen_status_ok != stat) {
        goto free_out;
    }

    stat = yajl_gen_map_close((yajl_gen)g);
    if (stat != yajl_gen_status_ok) {
        goto free_out;
    }

    yajl_gen_get_buf(g, &gen_buf, &gen_len);
    if (gen_buf == NULL) {
        printf("gen buf failed\n");
        goto free_out;
    }

    result = calloc(gen_len + 1, sizeof(char));
    if (result == NULL) {
        printf("out of memory\n");
        goto free_out;
    }
    (void)memcpy(result, gen_buf, gen_len);

free_out:
    yajl_gen_clear(g);
    yajl_gen_free(g);
    return result;
}

void show_isula_version(const struct isula_version *ptr)
{
    printf("iSula version: \n");
    if (ptr == NULL) {
        return;
    }
    printf("large: %d\nmiddle: %d\nsmall: %d\n", ptr->large, ptr->middle, ptr->small);
    printf("version: %s\n", ptr->version);
}

int main()
{
    const char *json_str = "{\"Version\":\"1.0.0\", \"Large\": 1, \"Middle\": 0, \"Small\": 0}";
    struct isula_version *ptr = NULL;
    char *marshaled = NULL;

    // step 1: unmarshal json string
    ptr = unmarshal(json_str);
    if (ptr == NULL) {
        printf("unmarshal failed\n");
        return -1;
    }
    show_isula_version(ptr);

    // step 2: marshal isula version
    free(ptr->version);
    ptr->version = strdup("2.0.0");
    ptr->large = 2;
    ptr->middle = 1;
    ptr->small = 1;
    marshaled = marshal(ptr);
    printf("marshal isula version:\n\t%s\n", marshaled);

    free(marshaled);
    free_isula_version(ptr);
}
```

执行效果如下：

```bash
$ ./a.out 
iSula version: 
large: 1
middle: 0
small: 0
version: 1.0.0
marshal isula version:
	{"Version":"2.0.0","Large":2,"Middle":1,"Small":1}
```

这种方式虽然没法和支持动态解析的语言一样高效简单，但是也算完成了任务。如果动态解析是热兵器，这个勉强能算是长矛了。

### 缺陷

从示例来看，完成一个结构体和JSON的映射大概需要160行左右的代码。而上面只是一个简单的结构体，而且有的项目有很多这种结构体需要做映射。这种原始的方式在大型项目中很难保证参与人员代码质量可控；而且效率低下。主要的缺陷总结如下：

- 映射工作量较大；
- 对每种结构体需要单独适配代码，无法实现自动化；
- 效率低下；
- 代码质量不可控；

## 伪热兵器时代

由于C不支持反射，没法做到动态解析。但是可以通过其他途径简化解析流程、提高效率、实现自动化以及实现代码质量可控。为了避免重复造论子，17年的时候发现了[libocispec项目](https://github.com/containers/libocispec)，提供了一个解决C语言JSON映射的思路：

- 通过[json schema](http://json-schema.org/)描述JSON字符串的结构信息；
- 通过python解析`json schema`信息；
- 根据`json schema`信息自动生成C结构体和JSON的映射代码；

这种方式，可以解决上面的上一章节的几个缺陷：

- 工作量大大减小，这需要写好`json schema`文件即可；
- 自动化解析代码工作；
- 效率很高；
- 代码质量可控，取决于于生成框架的质量；

**注：libocispec早期只能用于解析oci spec的json，在我们发现之后，多个开发人员参与社区，提供了大量的功能升级，才有了今天的强大能力。**

### iSula集成libocispec结构

iSula当前把JSON映射相关的代码，统一放到`lcr`项目中进行管理，通过一个动态库和头文件提供相应功能。

生成代码的开源python框架结构如下：

```bash
$ tree third_party/libocispec/
third_party/libocispec/
├── CMakeLists.txt
├── common_c.py
├── common_h.py
├── generate.py
├── headers.py
├── helpers.py
├── read_file.c
├── read_file.h
└── sources.py
```

`json schema`文件存放结构（由于iSula涉及的所有JSON结构都在该目录下，所以存在大量的schema文件）如下：

```bash
$ tree -d 1 src/json/schema/
src/json/schema/
├── cni
│   └── network
├── container
├── cri
├── docker
│   ├── image
│   └── types
├── embedded
├── host
├── image
├── imagetool
├── logger
├── oci
│   ├── image
│   └── runtime
├── plugin
├── registry
├── shim
│   └── client
└── storage
```

然后在`cmake`的时候，会触发python框架，根据schema目录下面所有的schema来生成对应的映射代码。会看到如下提示信息：

```bash
$ mkdir build
$ cd build
$ cmake ../
......
Reflection:	isulad-daemon-configs.json                                   Success
Reflection:	timestamp.json                                               Success
Reflection:	web-signature.json                                           Success
Reflection:	host-config.json                                             Success
Reflection:	defs.json                                                    Success
Reflection:	config.json                                                  Success
Reflection:	manifest.json                                                Success
Reflection:	layers.json                                                  Success
......
```

### 用法

那么，现在我们如果需要对一个新的结构体和JSON进行映射，需要做的事情就是在`json schema`目录下面新增一个对应的schema文件即可。这里以上一章节的`isula_version`为例。

新增schema文件`isula_version.json`：

```bash
$ cat ../src/json/schema/isula_version.json
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"type": "object",
	"properties": {
		"Version": {
			"type": "string"
		},
        "Large": {
			"type": "int32"
        },
        "Middle": {
			"type": "int32"
        },
        "Small": {
			"type": "int32"
        }
    }
}
```

重新`cmake`，可以看到新生成了两个文件：

```bash
$ ls build/json/isula_version.*
build/json/isula_version.c  build/json/isula_version.h
```

生成的代码对外的接口如下：

```c
$ cat build/json/isula_version.h 
// Generated from isula_version.json. Do not edit!
#ifndef ISULA_VERSION_SCHEMA_H
#define ISULA_VERSION_SCHEMA_H

#include <sys/types.h>
#include <stdint.h>
#include "json_common.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    char *version;

    int32_t large;

    int32_t middle;

    int32_t small;
}
isula_version;

void free_isula_version(isula_version *ptr);

isula_version *make_isula_version(yajl_val tree, const struct parser_context *ctx, parser_error *err);

yajl_gen_status gen_isula_version(yajl_gen g, const isula_version *ptr, const struct parser_context *ctx, parser_error *err);

isula_version *isula_version_parse_file(const char *filename, const struct parser_context *ctx, parser_error *err);

isula_version *isula_version_parse_file_stream(FILE *stream, const struct parser_context *ctx, parser_error *err);

isula_version *isula_version_parse_data(const char *jsondata, const struct parser_context *ctx, parser_error *err);

char *isula_version_generate_json(const isula_version *ptr, const struct parser_context *ctx, parser_error *err);

#ifdef __cplusplus
}
#endif

#endif

```

测试用例：

```c
$ cat test.c 
#include "isula_version.h"
#include <stdio.h>

void show_isula_version(const isula_version *ptr)
{
    printf("iSula version: \n");
    if (ptr == NULL) {
        return;
    }
    printf("large: %d\nmiddle: %d\nsmall: %d\n", ptr->large, ptr->middle, ptr->small);
    printf("version: %s\n", ptr->version);
}

int main()
{
    const char *json_str = "{\"Version\":\"1.0.0\", \"Large\": 1, \"Middle\": 0, \"Small\": 0}";
    isula_version *ptr = NULL;
    parser_error err = NULL;
    char *marshaled = NULL;

    // step 1: unmarshal
    ptr = isula_version_parse_data(json_str, NULL, &err);
    if (ptr == NULL) {
        return -1;
    }
    show_isula_version(ptr);

    // step 2: marshal
    free(ptr->version);
    ptr->version = strdup("2.0.0");
    ptr->large = 2;
    ptr->middle = 1;
    ptr->small = 1;
    marshaled = isula_version_generate_json(ptr, NULL, &err);
    if (ptr == NULL) {
        goto out;
    }
    printf("marshal isula version:\n\t%s\n", marshaled);

out:
    free(marshaled);
    free_isula_version(ptr);
    return 0;
}
```

执行结果如下：

```bash
$ ./a.out 
iSula version: 
large: 1
middle: 0
small: 0
version: 1.0.0
marshal isula version:
	{
    "Version": "2.0.0",
    "Large": 2,
    "Middle": 1,
    "Small": 1
}
```

### 缺陷

通过libocispec可以实现接近于高级语言的`marshal`和`unmarshal`了，只需要简单编写schema文件即可，极大的提高了效率，并且依托开源社区可以提高代码质量。但是，还是存在一些缺陷。

例如`golang`中，marshal之后的结构体可以通过map[string]interface保存，可以完整的记录JSON字符串中的信息。而我们当前的实现，只能根据schema来解析JSON字符串，因此，存在信息丢失的情况。有些场景，规范只规定了主体的JSON结构，并且支持拓展配置，例如CNI规范。

## 近乎热兵器时代

为了解决信息丢失的问题，我们通过在结构体中记录原始的元素集合tree的方案，unmarshal的时候不会丢失原始信息，marshal的时候解析记录的元素信息，从而实现原始数据完整的传递。

具体解决方案见官方PR：https://github.com/containers/libocispec/pull/56

### 用法

使用方式和上面的基本一致，差异主要包括以下几部分：

1. 生成的代码有部分差异（_residual）；

    ```c
    $ cat isula_version.h 
    ... ....
    typedef struct {
        char *version;
    
        int32_t large;
    
        int32_t middle;
    
        int32_t small;
    
        yajl_val _residual;
    }
    isula_version;
    ... ....
    ```

2. 解析是需要指定`struct parser_context`参数为`OPT_PARSE_FULLKEY`；

    ```c
    $ cat test.c 
    #include "isula_version.h"
    #include <stdio.h>
    
    void show_isula_version(const isula_version *ptr)
    {
        printf("iSula version: \n");
        if (ptr == NULL) {
            return;
        }
        printf("large: %d\nmiddle: %d\nsmall: %d\n", ptr->large, ptr->middle, ptr->small);
        printf("version: %s\n", ptr->version);
    }
    
    int main()
    {
        const char *json_str = "{\"Version\":\"1.0.0\", \"Large\": 1, \"Middle\": 0, \"Small\": 0, \"resi_int\": 1, \"resi_str\": \"test\"}";
        isula_version *ptr = NULL;
        parser_error err = NULL;
        char *marshaled = NULL;
        struct parser_context ctx;
        ctx.options = OPT_PARSE_FULLKEY;
    
        // step 1: unmarshal
        ptr = isula_version_parse_data(json_str, &ctx, &err);
        if (ptr == NULL) {
            return -1;
        }
        show_isula_version(ptr);
    
        // step 2: marshal
        free(ptr->version);
        ptr->version = strdup("2.0.0");
        ptr->large = 2;
        ptr->middle = 1;
        ptr->small = 1;
        marshaled = isula_version_generate_json(ptr, &ctx, &err);
        if (ptr == NULL) {
            goto out;
        }
        printf("marshal isula version:\n\t%s\n", marshaled);
    
    out:
        free(marshaled);
        free_isula_version(ptr);
        return 0;
    }
    ```

3. 效果如下

    ```bash
    $ ./a.out 
    iSula version: 
    large: 1
    middle: 0
    small: 0
    version: 1.0.0
    marshal isula version:
    	{
        "Version": "2.0.0",
        "Large": 2,
        "Middle": 1,
        "Small": 1,
        "resi_int": 1,
        "resi_str": "test"
    }
    ```

可以看到拓展的信息，完整的传递下去了。**通过这种方式完美的解决了CNI的拓展配置的支持，从而解决了iSulad动态支持多种插件的技术瓶颈。**

### 缺陷

上面的方案已经基本和支持反射的语言实现的功能相近了，但是，还是存在部分缺陷的。例如，动态修改JSON结构的数据会比较麻烦，需要对底层的解析库比较了解，而且比较麻烦。

## 总结

虽然当前的框架还有一些缺陷，但是，我们的目标并不是实现一个完美的JSON和C结构体的映射框架，而是解决容器引擎使用JSON的问题。而上面的方案，已经完全满足iSula当前的需求。

因此，目前没有进一步优化的需求。如果后续使用场景或者其他用户有需求，可以到[libocispec的社区](https://github.com/containers/libocispec)进行进一步的优化。

# 参考文章

- https://github.com/containers/libocispec
- http://json-schema.org/
- https://github.com/lloyd/yajl/tree/master/example
