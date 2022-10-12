---
title: HAProxy 1.9.0 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - HAProxy
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port HAProxy 1.9.0  
---

# HAProxy 1.9.0 Porting Guide (openEuler 20.03 LTS SP1)

## Introduction

#### Overview

HAProxy is a free and open-source software program written in C. It provides a high availability load balancer and proxy server for TCP and HTTP-based applications, supports virtual hosts, and has a reputation for being fast and reliable.
Programming language: C

Brief description: web load balancer

#### Recommended Software Version

HAProxy 1.9.0

Notes:

This document applies to HAProxy 1.9.0. However, you can refer to this document when porting other HAProxy versions.

## Environment Requirements

#### Hardware

| Item    | Description                         |
| -------- | ----------------------------- |
| Server  | TaiShan 200 server (model 2280)|
| CPU      | Kunpeng 920 5250 processor           |
| Drive partition| No requirements             |

#### OS

| Item     | Version                 |
| --------- | --------------------- |
| openEuler | 20.03 LTS SP1 AArch64|
| Kernel    | 4.19                  |

Check the current system information.

```bash
cat /etc/os-release
```

<img src="./image/HAProxy-1.jpeg">

For details about how to install the openEuler OS, see https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/Installation/Installation.html.    
Notes:
You are advised to select the "Server with GUI" installation mode.

## Installing HAProxy Using the RPM Package Obtained from a Mirror Site

If your server can access the network, run the "wget https://mirrors.huaweicloud.com/kunpeng/yum/el/7/aarch64/Packages/web/haproxy-1.9.0-1.el7.aarch64.rpm" command to download the RPM package. Otherwise, visit https://mirrors.huaweicloud.com/kunpeng/yum/el/7/aarch64/Packages/web/haproxy-1.9.0-1.el7.aarch64.rpm to download the package and copy it to the **/home** directory on the server.

Notes:
The RPM packages in the mirror site are compiled and packaged using open-source code, and then uploaded to the mirror site.

The following describes how to download the RPM package to the local PC and then upload it to the server.

1. Install HAProxy.

   ```bash
   rpm -ivh haproxy-1.9.0-1.el7.aarch64.rpm
   ```

   <img src="./image/HAProxy-2.png">

2. View the installation directory.

   ```bash
   ls /usr/local/haproxy
   ```

   <img src="./image/HAProxy-3.png">

## Operation and Verification

- Configure parameters.

  a. Open the **option-http_proxy.cfg** file.

    ```bash
    vi  /usr/local/haproxy/conf/option-http_proxy.cfg
    ```

  b. Modify the file as follows, and save and close the file:

    ```bash
    global
    maxconn      20000
    log               127.0.0.1 local0  info
    uid               0
    gid               0
    chroot          /usr/local/haproxy
    nbproc          4
    daemon
    defaults
    mode                       http
    retries                      3
    timeout connect      10s
    timeout client          20s
    timeout server         30s
    timeout check          2s
    frontend test-proxy
    bind            *:80
    mode            http
    log             global
    default_backend test-proxy-srv
    backend test-proxy-srv
    balance        roundrobin
    option http-server-close
    option httpchk   GET /index.html
    http-check expect       status 200
    server          web1    IP1:PORT1 weight 3
    server          web2    IP2:PORT2 weight 3
    ```

  For details about the parameters in the configuration file, see the [following table](https://support.huaweicloud.com/prtg-kunpengwebs/kunpenghaproxy_02_0011.html#kunpenghaproxy_02_0011__table177828478439). 



| Parameter                                                        | Description                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| global                                                       | -                                                            |
| maxconn 20000                                                | Specifies the maximum number of connections.                                            |
| log 127.0.0.1 local0 info                                    | Specifies the log output device. info indicates the log severity level.                        |
| uid 0                                                        | Specifies the ID of the user who runs HAProxy.                                       |
| gid 0                                                        | Specifies the ID of the user group to which the user running HAProxy belongs.                                     |
| chroot /usr/local/haproxy                                    | Specifies the chroot running path.                                            |
| nbproc 4                                                     | Specifies the number of processes.                                              |
| daemon                                                       | Runs HAProxy in the background.                                     |
| defaults                                                     | -                                                            |
| mode http                                                    | Specifies the processed type (layer 7 uses HTTP, and layer 4 uses TCP).                   |
| retries 3                                                    | Specifies the maximum number of retries for connecting to the backend server. If the number of retries exceeds the specified value, the backend server is unavailable.|
| timeout connect 10s                                          | Specifies the maximum time allowed before the connection between HAProxy and the backend server is set up.                 |
| timeout client 20s                                           | Specifies the timeout period for keeping an idle connection with the client.                            |
| timeout server 30s                                           | Specifies the timeout period for keeping an idle connection with the server.                            |
| timeout check 2s                                             | Specifies the timeout period for checking the server.                                    |
| frontend test-proxy                                          | -                                                            |
| bind *:80                                                    | Specifies one or more listening sockets. The asterisk (*) indicates all IPv4 addresses.       |
| mode http                                                    | Specifies the processed type (layer 7 uses HTTP, and layer 4 uses TCP).                   |
| log global                                                   | Inherits the definition of log in the global section.                                     |
| default_backend test-proxy-srv                               | Specifies the default backend server pool.                                    |
| backend test-proxy-srv                                       | -                                                            |
| balance roundrobin                                           | Specifies the load balancing algorithm round robin, which is a weight-based polling algorithm and applies to scenarios where servers have roughly identical performance.|
| option http-server-                                          | This parameter must be enabled when the persistent connection is enabled.                              |
| option httpchk GET /index.htmlhttp-check expect status 200   | Enables HTTP service status check (health check) and checks the returned status code. If "200" is not returned, no request is sent to backend servers.|
| server web1IP1:PORT1 weight 3 server web2 IP2:PORT2 weight 3 | Defines multiple backend servers. Format: server  :[port] [param*]** (Note: **IP1:PORT1 and IP2:PORT2 indicate the IP address and port number of a backend server.)|

- Start HAProxy.

  ```bash
  taskset -c 0-3 /usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/conf/option-http_proxy.cfg
  ```

- Verify HAProxy.

  ```bash
  ps -ef | grep haproxy
  ```

  The HAProxy process is displayed.

  Open the browser, enter http://*HAProxy IP address*:80 in the address box, and press **Enter**. The WebUI page of the backend server is displayed, indicating that HAProxy is running properly. Refresh the page. The page switches between backend servers.

  Notes:

  - (Optional) Stop HAProxy. Do not run this command when services are running.

    ```bash
    pkill haproxy
    ```

  - (Optional) Uninstall HAProxy and query the result.

    ```bash
    rpm -qa | grep haproxy
    ```

    ```bash
    rpm -e --nodeps haproxy-1.9.0
    ```

    ```bash
    rpm -qa | grep haproxy
    ```

    ```bash
    rm -rf /usr/local/haproxy
    ```
