---
title: Apache 2.4.39 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - Apache
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port Apache 2.4.39
---

# Apache 2.4.39 Porting Guide (openEuler 20.03 LTS SP1)

# Introduction  

## Apache Overview

Apache HTTP Server (Apache for short) is an open-source web server of the Apache Software Foundation. It can run on numerous operating systems (OSs) and is widely used due to its high security and compatibility with multiple platforms. It is fast and reliable, and can be extended using simple APIs to compile interpreters such as Perl and Python to the server.

Programming language: C

Brief description: web server

## Recommended Version

Apache httpd 2.4.39 or later

# Environment Requirements    

## Hardware

The following table lists hardware requirements.

Item| Description
----- | -----
Server| TaiShan 200 server (model 2280)
CPU | Kunpeng 920 5250
Drive partition| No requirements

## Operating Systems

The following table lists OS requirements.

Item| Version
----- | -----
openEuler | 20.03 SP1 AArch64
Kernel | 4.19

NOTE:

When installing the OS for the first time, select "Server with GUI" instead of "Minimal Install". Otherwise, lots of software packages need to be installed manually.

# Configuring the Compilation Environment

1. Install the development package.

  ```
  yum update  
  yum install gcc gcc-c++
  ```

2. Install dependencies.

  ```
  yum install apr-devel.aarch64 apr-util-devel.aarch64 pcre-devel.aarch64 -y
  ```

3. Obtain the source code.

	Download address: http://archive.apache.org/dist/httpd/httpd-2.4.39.tar.gz

## Preparing the Installation Package

	tar xzvf httpd-2.4.39.tar.gz

## Modifying the Source Code

	cd httpd-2.4.39
	vi ./build/config.sub
	
	In the following two lines, add aarch64:
	
	| x86 | xc16x | xstormy16 | xtensa \
	=>
	| x86 | aarch64 | xc16x | xstormy16 | xtensa \


	| x86-* | x86_64-* | xc16x-* | xps100-* \
	=>
	| x86-* | aarch64-* | x86_64-* | xc16x-* | xps100-* \

## Compiling and Installing Apache

	./configure --host=aarch64 --build=aarch64
	make -j4
	make install

# Configuring Parameters

## Modifying httpd.conf

	vi /usr/local/apache2/conf/httpd.conf
	
	Delete the comment tag in line 89.
	  LoadModule socache_shmcb_module modules/mod_socache_shmcb.so
	
	Delete the comment tag in line 196 and change the value to the IP address of the current server.
	  #ServerName www.example.com:80
	  =>
	  ServerName local_server_ip:80
	
	Delete the comment tag in line 461.
	  Include conf/extra/httpd-mpm.conf
	
	Delete the comment tag in line 488.
	  Include conf/extra/httpd-default.conf

## Modifying httpd-default.conf

	vi /usr/local/apache2/conf/extra/httpd-default.conf
	
	Change the value in line 23 to 0.
	  MaxKeepAliveRequests 0

# Verifying Apache

	Run the following command to start Apache:
	  /usr/local/apache2/bin/httpd -f /usr/local/apache2/conf/httpd.conf -k start
	
	Run the following command to stop Apache:
	  /usr/local/apache2/bin/httpd -f /usr/local/apache2/conf/httpd.conf -k stop
	
	Run the following command to check the service process:
	  ps -ef |grep httpd
