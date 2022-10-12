---
title: Varnish 6.2.0 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - Varnish
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port Varnish 6.2.0
---

# Varnish 6.2.0 Porting Guide (openEuler 20.03 LTS SP1)

# Introduction

## Varnish Overview
Varnish is a high-performance and open-source reverse proxy server and HTTP accelerator. Compared with traditional cache servers, Varnish offers higher performance, faster speeds, and easier management. Many large-scale websites have adopted Varnish to replace Squid, contributing to the rapid development of Varnish.

Programming language: C++

Brief description: reverse proxy server and HTTP accelerator

## Recommended Version
Varnish 6.2.0

# Environment Requirements
## Hardware Requirements
Table 1 lists the hardware requirements.
Table 1 Hardware requirements

|Item| Description |
|------|----------------------------|
|Server| TaiShan 200 server (model 2280)|
|CPU| Kunpeng 920 5250 processor|
|Drive partition|No requirements|

## OS Requirements
Table 2 lists the OS requirements.
Table 2 OS requirements

|Item| Version| Command Used to Query the Version|
|----------|--------|-------|
|openEuler| 20.03 LTS SP1| `cat /etc/openEuler-release`|
|Kernel| 4.19.90| uname -r|

# Configuring the Compilation Environment
## Configuring the Yum Repository
  Note:
  Configure the local source if the server cannot obtain dependencies from the Internet using **yum** commands.  
1. Copy the OS image file **openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso** to the **/root** directory on each server.  

2. Mount the image file.  
    (1) Mount the openEuler image file in the **/root** directory to the **/mnt** directory.  
    `mount /root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt`
    Note: This operation takes effect only once and becomes invalid after the OS restarts. (Optional) To configure automatic image mounting upon boot, perform the following steps:  

       a. Open the **fstab** file.  
           `   vi /etc/fstab`

       b. Add the following content to the end of the **fstab** file:  
           `/root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt iso9660 loop 0 0`

       c. Save and exit the **fstab** file.  

3. Add a local source file.  
    (1) Go to the **/etc/yum.repos.d** directory.  
    `cd /etc/yum.repos.d`
    Note: It is recommended that you move the *.repo file in this directory to any other backup directory.  
    (2) Create a **local.repo** file.  

       a. Open the **local.repo** file.  
           `vi local.repo`

       b. Add the following content to the **local.repo** file:  

    ```
    [local]
    name=local.repo
    baseurl=file:///mnt
    enabled=1
    gpgcheck=0
    ```
    Note:
    The file path in **baseurl** is the image mounting path, which corresponds to image file mounting directory **/mnt**.  

       c. Save and exit the **local.repo** file.

4. Make the local source take effect.  
```
yum clean all
yum makecache
yum list
```

## Installing Dependencies
Download and install dependencies.  
1. Install the required dependencies.  
```
yum install -y autoconf automake jemalloc-devel libedit-devel libtool ncurses-devel pcre-devel pkgconfig python-docutils python-sphinx graphviz httpd
```
2. View the Python3 version.  
   ```
   [root@localhost]# python3 --version
   Python 3.7.9
   ```

# Installation
## Installation Mode
This document describes how to install Varnish by compiling source code.  

## Installing Varnish by Compiling Source Code
### Obtaining Source Code
1. Download the Varnish source package using a local browser.  
URL: [https://varnish-cache.org/_downloads/varnish-6.2.0.tgz](https://varnish-cache.org/_downloads/varnish-6.2.0.tgz)
2. Copy the source package to the **/home** directory on the server.  
Note: If the server is connected to the Internet, run the **wget** command on the server to download the source code.  

### Performing Compilation and Installation
1. Go to the **/home** directory.  
`cd /home/`
2. Decompress the source package.  
`tar -zxvf varnish-6.2.0.tgz`
3. Go to the **varnish-6.2.0** directory.  
`cd /home/varnish-6.2.0/`
4. Perform automatic compilation.  
`sh autogen.sh`
5. Check dependencies.  
`./configure --prefix=/usr/local/varnish`
```
[root@localhost varnish-6.2.0]# ./configure --prefix=/usr/local/varnish
checking for gcc... gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables... 
checking whether we are cross compiling... no
checking for suffix of  files... o
checking whether we are using the GNU C compiler... yes
checking whether gcc accepts -g... yes
```
Note: **--prefix=PATH** specifies the Varnish installation directory.  

6. Compile and install Varnish.  
`make  &amp;&amp; make install`
```
[root@localhost varnish-6.2.0]# make  && make install
make  all-recursive
make[1]: Entering directory '/home/varnish-6.2.0'
Making all in include
make[2]: Entering directory '/home/varnish-6.2.0/include'
make  all-am
make[3]: Entering directory '/home/varnish-6.2.0/include'
```

### Configuration Files
1. Create a folder in the Varnish installation path for storing configuration files.  
`cd /usr/local/varnish &amp;&amp;  mkdir config`
2. Copy the configuration files to the **config** directory.  
`cp /usr/local/varnish/share/doc/varnish/example.vcl   /usr/local/varnish/config/default.vcl`

# Running and Verifying Varnish
The following describes how to run and verify Varnish when the local host is used as a backend object.  
1. Modify the backend IP address and port number for the reverse proxy test.  
If the cache policy needs to be configured, obtain the latest Varnish Book from the official website. In this example, the local host is configured as the backend object. The default port number is 80.  

   a. Open the configuration file.  
   `vi /usr/local/varnish/config/default.vcl`  

   b. Modify the file as follows, and save the change and exit.  
   ```
   vcl 4.0;
   # Default backend definition. Set this to point to your content server.
   backend default {
   .host = &quot;127.0.0.1&quot;;
   .port = &quot;80&quot;;
   }

   sub vcl_recv {
   }
   sub vcl_backend_response {
   }
   sub vcl_deliver {
   }
   ```

2. Start the HTTP service of the backend object.  
`systemctl start httpd`
3. Start Varnish.  
`/usr/local/varnish/sbin/varnishd  -a :12345 -T 127.0.0.1:6082 -s malloc,10GB -f /usr/local/varnish/config/default.vcl`
```
[root@localhost ~]# /usr/local/varnish/sbin/varnishd  -a :12345 -T 127.0.0.1:6082 -s malloc,10GB -f /usr/local/varnish/config/default.vcl
Debug: Version: varnish-6.2.0 revision b14a3d38dbe918ad50d3838b11aa596f42179b54
Debug: Platform: Linux,4.19.90-2012.4.0.0053.oe1.aarch64,aarch64,-jnone,-smalloc,-sdefault,-hcritbit
Debug: Child (30634) Started
```
The following describes the Varnish startup parameters.  
Parameter description  

    -a address:port: IP address and port number for Varnish to monitor the HTTP service. The IP address is the IP address of the local host by default.
    
    -T address:port: IP address and port number for Varnish to manage Telnet.
    
    -s: specifies the cache storage mode for Varnish. In this example, malloc is used. A total of 10 GB memory space is allocated.
    
    -f: specifies the location of the Varnish configuration file.

4. Access the local host to view the test page on the backend.  
   `curl http://localhost:80`
   
   ```
   ...
      
       This page is used to test the proper operation of the Apache HTTP server after it has been installed. If you can read this page, it means that the Apache HTTP server installed at this site is working properly.
      
      
   
      
       
        <h2>If you are a member of the general public:</h2>
   
        The fact that you are seeing this page indicates that the website you just visited is either experiencing problems, or is undergoing routine maintenance.
   
        If you would like to let the administrators of this website know that you've seen this page instead of the page you expected, you should send them e-mail. In general, mail sent to the name "webmaster" and directed to the website's domain should reach the appropriate person.
   
        For example, if you experienced problems while visiting www.example.com, you should send e-mail to "webmaster@example.com".
   
        For information on openEuler Linux, please visit the <a href="#" class="white">openEuler, Inc. website</a>. The ation for openEuler Linux is <a href="#" class="white">available on the openEuler, Inc. website</a>.
    
   ...
   ```
    Note:  
  - To stop Varnish, run the following command (do not run this command during service running):  
    `pkill varnish`
  - To uninstall Varnish and query the result:  
    Uninstall Varnish that is installed by compiling source code.
    `rm -rf /usr/local/varnish/`
