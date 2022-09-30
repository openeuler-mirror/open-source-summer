---
title: OpenEuler上A-Tune的简单使用
date: 2021-04-18
tags: 
    - A-Tune
    - 调优
    - 智能
archives: 2021-04
author: lingff PKU
summary: OpenEuler上A-Tune的安装和简单使用，介绍A-Tune离线动态调优的流程。
---
# A-Tune是什么？
A-Tune是一款基于AI的操作系统性能调优引擎。A-Tune利用AI技术，使操作系统“懂”业务，简化IT系统调优工作的同时，让应用程序发挥出色性能。
本次项目，主要尝试熟悉A-Tune离线动态调优的流程，目的是为一款应用实现调优。
# 一、安装A-Tune
OS: openEuler 20.03 LTS SP1，从仓库源码安装：
1. 安装依赖系统软件包

```bash
yum install -y golang-bin python3 perf sysstat hwloc-gui
```
2. 安装python依赖包

```bash
# A-Tune服务的依赖包
yum install -y python3-dict2xml python3-flask-restful python3-pandas python3-scikit-optimize python3-xgboost python3-pyyaml
# 数据库依赖包
yum install -y python3-sqlalchemy python3-cryptography
yum install -y python3-psycopg2
```
3. 下载源码、编译、安装

```bash
git clone https://gitee.com/openeuler/A-Tune.git
cd A-Tune
make models
make
make collector-install
make install
```
# 二、开始使用
## 配置A-Tune服务
修改/etc/atuned/atuned.cnf中的network和disk配置选项为对应的指定网卡和磁盘。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210417193945263.png)
## 管理A-Tune服务
加载并启动atuned和atune-engine服务：

```bash
systemctl daemon-reload
systemctl start atuned
systemctl start atune-engine
```
> 注意：这三条命令执行需要一定时间，且不会有任何输出显示。重启后需要重新启动服务。

查看atuned或atune-engine服务状态：

```bash
systemctl status atuned
systemctl status atune-engine
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210417194614472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20210417194522940.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)
## atune-adm命令行工具
1. list命令 - 列出系统当前支持的profile，以及当前处于active状态的profile。
例：
```bash
atune-adm list
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210417194836656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)

2.  profile命令 - 激活profile，使其处于active状态。
例：

```bash
atune-adm profile web-nginx-http-long-connection
```
激活web-nginx-http-long-connection对应的profile配置。

3. analysis命令 - 在线静态调优。实时采集系统的信息进行负载类型的识别，并自动执行对应的优化。
接口语法：

```bash
atune-adm analysis [OPTIONS]
```

4. tuning命令 - 离线动态调优。使用指定的项目文件对所选参数进行动态空间的搜索，找到当前环境配置下的最优解。
接口语法：

```bash
atune-adm tuning [OPTIONS] <PROJECT_YAML>
```
离线动态调优是本次任务的重点。

# 三、A-Tune离线调优示例
示例位于A-Tune/examples/tuning目录，这里以对gcc编译器的优化为例。

```bash
cd  <PATH-TO-A-Tune>/examples/tuning/gcc_compile
```
1. 准备环境

```bash
sh prepare.sh
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418133402328.png)

2. 下载stream.c（内存带宽测试程序）

```bash
wget http://www.cs.virginia.edu/stream/FTP/Code/stream.c
```
3. 开始调优

```bash
atune-adm tuning --project gcc_compile --detail gcc_compile_client.yaml
```
调优结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418133945119.png)
内存带宽提升121%，编译后的可以执行文件大小减小17%。

4. 保存结果

```bash
atune-adm tuning --restore --project gcc_compile
```
无输出。
# 四、A-Tune离线调优应用
离线动态调优包含三个输入文件：client.yaml、server.yaml和benchmark。
 - client.yaml: 存放在客户端的文件，包含调优的评价指标等信息。
 - server.yaml: 存放在服务端的文件，包含调优的可调节参数等信息。 
 - benchmark: 存放在客户端的文件，通过运行该文件以获取评价指标的具体数值。

这里以gcc离线动态调优为例，说明这三个文件。
## client.yaml
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418211719224.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)
其中包含：
- 调优算法选择(line 2)
- 迭代次数(line 3)
- 随机迭代次数(line 4)
- benchmark执行命令(line 6)
- 评价指标1相关信息(line 8 - 13)
- 评价指标2相关信息(line 14 - end)

另外，还可以在client.yaml中添加**参数选择**：

参数选择是在进行离线动态调优前执行的步骤，其目的是在进行离线动态调优前缩减参数空间，在给出的参数空间中选择出对性能影响最大的参数并进行调优。

实现方法是在client.yaml中添加如下参数：

- feature_filter_engine: 参数选择算法
- feature_filter_cycle: 参数选择轮数
- feature_filter_iters: 参数选择的迭代次数
- feature_filter_count: 每轮选择出的参数
- split_count: 调优参数取值范围中均匀选取的参数个数


## server.yaml
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418212213431.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)
- 应用启动命令(line 3)
- 应用停止命令(line 4)
- 可调参数等内容(line 5 - end)
## benchmark文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418212600100.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)

benchmark文件用于在调优执行时，会根据client.yaml中提供的命令执行此文件。

## 执行优化并保存结果
执行优化：
```bash
atune-adm tuning --project <PROJECT_NAME> --detail <client.yaml>
```
保存结果：
```bash
atune-adm tuning --restore --project <PROJECT_NAME>
```

