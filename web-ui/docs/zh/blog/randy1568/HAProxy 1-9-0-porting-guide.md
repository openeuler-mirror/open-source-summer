---
title: HAProxy 1.9.0 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - HAProxy
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the HAProxy 1.9.0  
---

# HAProxy 1.9.0 移植指南（openEuler 20.03 LTS SP1）

## 介绍

#### 简要介绍

HAProxy是一个使用C语言编写的自由及开放源代码软件，其提供高可用性、负载均衡，以及基于TCP和HTTP的应用程序代理，支持虚拟主机，它是免费、快速并且可靠的一种解决方案。
开发语言：C

一句话描述：Web负载均衡

#### 建议的版本

建议使用版本为“HAProxy 1.9.0”。

说明：

本文档适用于HAProxy 1.9.0，其他版本的HAProxy移植步骤也可参考本文档。

## 环境要求

#### 硬件要求

| 项目     | 说明                          |
| -------- | ----------------------------- |
| 服务器   | TaiShan 200服务器（型号2280） |
| CPU      | 鲲鹏920 5250处理器            |
| 磁盘分区 | 对磁盘分区无要求              |

#### 操作系统要求

| 项目      | 版本                  |
| --------- | --------------------- |
| openEuler | 20.03 LTS SP1 aarch64 |
| Kernel    | 4.19                  |

检查当前系统版本信息

```bash
cat /etc/os-release
```

<img src="./image/HAProxy-1.jpeg">

安装openEuler操作系统，请参考https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html     
说明：
安装方式建议选择“Server with GUI”安装方式。

## 镜像站RPM方式安装

若您的服务器可以访问网络，执行 wget https://mirrors.huaweicloud.com/kunpeng/yum/el/7/aarch64/Packages/web/haproxy-1.9.0-1.el7.aarch64.rpm 命令下载RPM包。否则，请访问 https://mirrors.huaweicloud.com/kunpeng/yum/el/7/aarch64/Packages/web/haproxy-1.9.0-1.el7.aarch64.rpm 下载RPM包并复制到服务器“/home”目录。

说明：
镜像站中的RPM包都是通过开源代码编译打包而成，然后将其上传到镜像站。

以本地下载RPM包并上传到服务器为例说明安装操作

2. 安装HAProxy

   ```bash
   rpm -ivh haproxy-1.9.0-1.el7.aarch64.rpm
   ```

   <img src="./image/HAProxy-2.png">

3. 查看安装目录

   ```bash
   ls /usr/local/haproxy
   ```

   <img src="./image/HAProxy-3.png">

## 运行和验证

- 配置参数

  a. 打开option-http_proxy.cfg文件

    ```bash
    vi  /usr/local/haproxy/conf/option-http_proxy.cfg
    ```

  b. 修改option-http_proxy.cfg为如下内容后，保存并退出文件

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

  配置文件示例参数说明见[下表](https://support.huaweicloud.com/prtg-kunpengwebs/kunpenghaproxy_02_0011.html#kunpenghaproxy_02_0011__table177828478439)。  

| 参数                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| global                                                       | -                                                            |
| maxconn 20000                                                | 默认最大连接数。                                             |
| log 127.0.0.1 local0 info                                    | 定义日志输出设备，info表示日志级别。                         |
| uid 0                                                        | 运行HAProxy的用户id。                                        |
| gid 0                                                        | 运行HAProxy的用户组id。                                      |
| chroot /usr/local/haproxy                                    | chroot运行路径。                                             |
| nbproc 4                                                     | 设置进程数量。                                               |
| daemon                                                       | 以后台形式运行HAProxy。                                      |
| defaults                                                     | -                                                            |
| mode http                                                    | 所处理的类别（7层代理http，4层代理tcp）。                    |
| retries 3                                                    | 设置连接后端服务器的失败重试次数，超过此值标记后端服务器为不可用。 |
| timeout connect 10s                                          | HAProxy与后端服务器建立连接的最长等待时间。                  |
| timeout client 20s                                           | 和客户端保持空闲连接的超时时间。                             |
| timeout server 30s                                           | 和服务端保持空闲连接的超时时间。                             |
| timeout check 2s                                             | 对服务端的检测超时时间。                                     |
| frontend test-proxy                                          | -                                                            |
| bind *:80                                                    | 定义一个或几个监测的套接字，*表示当前所有的ipv4地址。        |
| mode http                                                    | 所处理的类别（7层代理http，4层代理tcp）。                    |
| log global                                                   | 继承global中log的定义。                                      |
| default_backend test-proxy-srv                               | 指定默认的后端服务器池。                                     |
| backend test-proxy-srv                                       | -                                                            |
| balance roundrobin                                           | 指定负载均衡算法 roundrobin是基于权重进行轮询的算法，适用于服务器性能均匀时。 |
| option http-server-                                          | 当开启长连接时，应该开启此项。                               |
| option httpchk GET /index.htmlhttp-check expect status 200   | 启用HTTP的服务状态检测（健康检查）。检查返回的状态码，接受不到200就不给后端server调度。 |
| server web1IP1:PORT1 weight 3 server web2 IP2:PORT2 weight 3 | 定义多个后端真实服务器。格式：server  :[port] [param*]**说明：**IP1:PORT1和IP2:PORT2为后端服务器IP及端口号。weight表示权重。 |

- 启动HAProxy

  ```bash
  taskset -c 0-3 /usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/conf/option-http_proxy.cfg
  ```

- 验证HAProxy

  ```bash
  ps -ef | grep haproxy
  ```

  可以看到HAProxy进程。

  打开浏览器在url处输入：http://IP:80，（IP为HAproxy所在服务器IP）可以看到后端服务器的页面，则说明HAProxy运行成功。刷新页面，显示页面在后端服务器间来回切换。

  说明：

  - （可选）停止HAProxy命令如下，业务运行中不需要执行该命令。

    ```bash
    pkill haproxy
    ```

  - （可选）卸载HAProxy，并查询。

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