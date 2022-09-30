---
title: Using A-Tune on openEuler
date: 2021-04-18
tags: 
    - A-Tune
    - Tuning
    - Intelligence
archives: 2021-04
author: lingff PKU
summary: This document describes how to install and use A-Tune on openEuler and the offline dynamic tuning process of A-Tune.
---
# What Is A-Tune
A-Tune is an AI-based OS performance tuning engine. It leverages AI technologies to enable the OS to understand services, simplify IT system tuning, and deliver excellent performance for applications.
This project helps developers get familiar with the A-Tune offline dynamic tuning process to tune an application.

# Installing A-Tune
openEuler 20.03 LTS SP1 is used to install A-Tune from source code as follows:  
1. Install the dependent system software packages.  

```bash
yum install -y golang-bin python3 perf sysstat hwloc-gui
```
2. Install the Python dependencies.  

```bash
# Dependencies of the A-Tune service  
yum install -y python3-dict2xml python3-flask-restful python3-pandas python3-scikit-optimize python3-xgboost python3-pyyaml
# Database dependencies  
yum install -y python3-sqlalchemy python3-cryptography
yum install -y python3-psycopg2
```
3. Download and compile the A-Tune source code, and then install A-Tune.  

```bash
git clone https://gitee.com/openeuler/A-Tune.git
cd A-Tune
make models
make
make collector-install
make install
```
# Using A-Tune
## Configuring the A-Tune Service
Change the values of **network** and **disk** in the **/etc/atuned/atuned.cnf** file to the specified network adapter and disk.  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210417193945263.png)  
## Managing the A-Tune Service
Load and start the atuned and atune-engine services.  

```bash
systemctl daemon-reload
systemctl start atuned
systemctl start atune-engine
```
> NOTE: It takes some time to run the three commands, and no output is displayed. If the system is restarted, restart the services.  

Check the status of the atuned and atune-engine services.

```bash
systemctl status atuned
systemctl status atune-engine
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210417194614472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20210417194522940.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)  
## Using the atune-adm CLI
1. The **list** command is used to list the profiles supported by the system and the profiles in the active status.  
For example:  
```bash
atune-adm list
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210417194836656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)  

2.  The **profile** command is used to activate a profile.  
For example:  

```bash
atune-adm profile web-nginx-http-long-connection
```
The preceding command activates the profile configuration of web-nginx-http-long-connection.

3. The **analysis** command is used for online static tuning. It collects system information in real time, identifies load types, and automatically optimizes them.  
Interface syntax:  

```bash
atune-adm analysis [OPTIONS]
```

4. The **tuning** command is used for offline dynamic tuning. It uses the specified project file to search the dynamic space for the selected parameters to find the optimal solution under the current environment configuration.  
Interface syntax:  

```bash
atune-adm tuning [OPTIONS] <PROJECT_YAML>
```
Offline dynamic tuning is the focus of this project.  

# A-Tune Offline Tuning Case  
The following describes how to optimize the GCC compiler. This case can be found in the **A-Tune/examples/tuning** directory.  

```bash
cd  <PATH-TO-A-Tune>/examples/tuning/gcc_compile
```
1. Set up the environment.

```bash
sh prepare.sh
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418133402328.png)  

2. Download stream.c, a memory bandwidth test program.  

```bash
wget http://www.cs.virginia.edu/stream/FTP/Code/stream.c
```
3. Tune the GCC compiler.  

```bash
atune-adm tuning --project gcc_compile --detail gcc_compile_client.yaml
```
Tuning result:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418133945119.png)  

The memory bandwidth is increased by 121%, and the size of the executable file after compilation is reduced by 17%.  

4. Save the result.  

```bash
atune-adm tuning --restore --project gcc_compile
```
There is no output.
# Performing A-Tune Offline Tuning
Offline dynamic tuning involves three input files: **client.yaml**, **server.yaml**, and **benchmark**.  
 - **client.yaml**: file stored on the client, including tuning evaluation indicators.  
 - **server.yaml**: file stored on the server, including adjustable parameters for tuning.  
 - **benchmark**: file stored on the client. You can run this file to obtain the benchmark values of the evaluation indicators.  

The following uses GCC offline dynamic tuning as an example to describe the three files.  
## client.yaml  

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418211719224.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)  

The parameters in the preceding picture are as follows:
- Tuning algorithm (line 2)  
- Number of iterations (line 3)  
- Number of random iterations (line 4)  
- Benchmark execution command (line 6)  
- Information about evaluation indicator 1 (lines 8 to 13)  
- Information about evaluation indicator 2 (lines 14 - end)  

In addition, you can add **parameter selection** to the **client.yaml** file.  

Parameter selection is performed before offline dynamic tuning to reduce the parameter space. It selects the parameters that have the greatest impact on performance from the provided parameter space for tuning.  

To implement parameter selection, add the following parameters to the **client.yaml** file:  

- **feature_filter_engine**: parameter selection algorithm  
- **feature_filter_cycle**: number of parameter selection cycles  
- **feature_filter_iters**: number of parameter selection iterations  
- **feature_filter_count**: parameter(s) selected in each cycle  
- **split_count**: number of parameters evenly selected from the value range of tuning parameters  


## server.yaml
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418212213431.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)  
- Application startup command (line 3)  
- Command for stopping the application (line 4)  
- Adjustable parameters (lines 5 - end)  
## Benchmark File
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418212600100.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIxNDQwOA==,size_16,color_FFFFFF,t_70)  

The benchmark file is used to execute the commands provided in the **client.yaml** file during performance tuning.  

## Tuning and Result Saving
Perform tuning:
```bash
atune-adm tuning --project <PROJECT_NAME> --detail <client.yaml>
```
Save the result:
```bash
atune-adm tuning --restore --project <PROJECT_NAME>
```
