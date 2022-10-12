---
title: Memcached 1.5.12 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - Memcached
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port Memcached 1.5.12
---

# Memcached 1.5.12 Porting Guide

## Introduction

#### Overview

Memcached is a high-performance, distributed memory object caching server, developed by Brad Fitzpatric from Danga Interactive, a subsidiary of LiveJournal. It is used to cache database query results and reduce database access times to improve the speed and scalability of dynamic web applications.

Official Memcached website: https://memcached.org/

Programming language: C

Brief description: distributed memory object caching system

## Environmental Requirements  

### Hardware

The following table lists the hardware requirements.

| Item    | Description                         |
| -------- | ----------------------------- |
| Server  | TaiShan 200 server (model 2280)|
| CPU      | Kunpeng 920 5250 processor           |
| Drive partition| No requirements             |

### Operating Systems

The following table lists the requirements for the operating system.

| Item     | Version                 |
| --------- | --------------------- |
| openEuler | 20.03 LTS SP1 AArch64|
| Kernel    | 4.19                  |

Check the current OS version.

```
cat /etc/os-release
```


  
<img src="./image/Memcached-1.jpeg">

For details about installing the openEuler OS, see https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/Installation/Installation.html.    
Note:
You are advised to select the "Server with GUI" installation mode.

## Configuring the Compilation Environment

To compile Memcached, you need to prepare the C compiler, GNU, make, automake, libevent, and libevent-devel.

1. Install the GNU Compiler Collection (GCC). If GCC has been installed, skip this step.

   ```bash
   yum -y install gcc gcc-c++ kernel-devel 
   ```

2. Install GNU make, Automake, unzip, and Telnet. If they have been installed, skip this step.

   ```bash
   yum -y install make automake unzip telnet
   ```

3. Install libevent and libevent-devel.

   ```bash
   yum -y install libevent libevent-devel
   ```

## Obtaining Source Code

If your server can access the network, run the "wget https://github.com/memcached/memcached/archive/1.5.12.zip" command to download the source code. Otherwise, visit https://github.com/memcached/memcached/archive/1.5.12.zip to download the source code and copy it to the /home directory on the server.

## Compiling and Installing Memcached

The following uses the source code downloaded to the local PC and then uploaded to the server as an example for describing compilation and installation operations.

1. Decompress the source package.

   ```bash
   cd /home
   ```

   ```bash
   unzip 1.5.12.zip
   ```

2. Go to the **memcached-1.5.12** directory.

   ```bash
   cd memcached-1.5.12
   ```

3. Configure Memcached.

   ```bash
   sh autogen.sh
   ```

   ```bash
   ./configure --prefix=/opt/memcached
   ```

   You can specify the Memcached installation directory, for example, **/opt/memcached**, in this step.

4. Perform compilation.

   ```bash
   make -j60
   ```

   **-j60** leverages the multi-core CPUs to speed up compilation. 

5. Perform installation.

   ```bash
   make install
   ```

6. Switch to the Memcached installation directory **/opt/memcached**. If the generated bin directory contains the Memcached executable file, installation is successful.

7. Set environment variables.

   a. Add the following command to the **/etc/profile** file: 

   ```bash
   export PATH=/opt/memcached/bin/:$PATH
   ```

   b. Make the environment variable effective. 

   ```bash
   source /etc/profile
   ```

## Running and Verifying Memcached

- Start Memcached.

  ```bash
  memcached -t 24 -p 11211 -u root -m 49152 -c 10240
  ```

  The following table describes the parameters in the startup command.

| Parameter| Description                                 | Default Value                    |
| -------- | ------------------------------------- | -------------------------- |
| -t       | Thread count                             | 4                          |
| -p       | TCP listening port                      | 11211                      |
| -u       | User who starts the process                       | The default user cannot be root.|
| -m       | Memory size (in MB) allocated to Memcached | 64M                        |
| -c       | Maximum number of concurrent connections                     | 1024                       |
| -d       | Starts a daemon in the background.               | -                          |

- Start another shell window to connect to Memcached.

  ```bash
  telnet 127.0.0.1 11211
  ```

- After creating a connection, run the stats command to obtain the statistics of the Memcached server.

  ```bash
  stats
  ```

  
  <img src="./image/Memcached-2.jpeg">

The [following table](https://support.huaweicloud.com/intl/en-us/prtg-kunpengwebs/kunpengmemcached_02_0006.html#kunpengmemcached_02_0006__table1896316817714) lists the common stats commands.

   

| Command           | Description                                                        |
| --------------- | ------------------------------------------------------------ |
| stats           | Displays the overall status of Memcached, including the startup time, amount of data stored, cache hit ratio, and number of current connections.|
| stats items     | Outputs the item information of each slab.                                  |
| stats slabs     | Outputs more details about slabs.                              |
| stats sizes     | Displays the size and number of all items.                                  |
| stats cachedump | Outputs certain pieces of data in a slab. If the input is 0, all data in the slab is output.   |
| stats detail    | Sets (on/off) or displays (dump) detailed operation records, such as the get/set operation.   |
| flush_all       | Invalidates all items in the memory. This operation does not suspend the server because no free memory is released and the existing items are marked as invalid. |

   Note:
   To exit the Telnet connection, run the **quit** command.

   ```bash
   quit
   ```

In addition to connecting to the Memcached service using Telnet to obtain data, the source code provides some tool scripts, such as memcached-tool, in the scripts directory of the source code.

For details about how to use the memcached-tool, see the [following table](https://support.huaweicloud.com/intl/en-us/prtg-kunpengwebs/kunpengmemcached_02_0006.html#kunpengmemcached_02_0006__table15821759181818).



| Command                                        | Description                    |
| -------------------------------------------- | ------------------------ |
| ./memcached-tool localhost display           | Displays slabs information.           |
| ./memcached-tool 10.0.0.5:11211 display      | Displays slabs information.           |
| ./memcached-tool 10.0.0.5:11211 stats        | Displays memcached statistics.   |
| ./memcached-tool 10.0.0.5:11211 settings     | Displays memcached settings.   |
| ./memcached-tool 10.0.0.5:11211 sizes        | Displays the size and number of all items.   |
| ./memcached-tool 10.0.0.5:11211 dump [limit] | Outputs keys and values from the cache.|
