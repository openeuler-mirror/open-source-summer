---
title: Nginx 1.14.2 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - Nginx
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the Nginx 1.14.2 
---

# Nginx 1.14.2 移植指南（openEuler 20.03 LTS SP1）

# 介绍

## 简要介绍
Nginx是一款轻量级的Web服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，其特点是占有内存少，并发能力强，支持FastCGI、SSL、Virtual Host、URL Rewrite、gzip等功能，并且支持很多第三方的模块扩展。

开发语言：C

一句话描述：Web服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器
## 建议的版本
建议使用版本为“Nginx 1.14.2”。
  说明：
  本文档适用于Nginx 1.14.2版本，其他版本的Nginx移植步骤也可参考本文档。


# 环境要求
## 硬件要求
硬件要求如表1所示。
表1 硬件要求

|项目      |说明                       |
|---------|--------------------------|
|服务器    |TaiShan 200服务器（型号2280）|
|CPU      |鲲鹏920 5250处理器          |
|磁盘分区  |对磁盘分区无要求              |

## 操作系统要求
操作系统要求如表2所示。
表2 操作系统要求

|项目         |版本      |版本查看命令                        |
|------------|---------|---------------------------------|
|openEuler   |20.03 LTS SP1   |```cat /etc/openEuler-release``` |
|Kernel      |4.19.90  |``` uname -r```                   |

# 配置编译环境
## 配置Yum源
说明：
如果组网环境处于外网受限情况下，服务器yum命令无法通过外界获取依赖包时，可参考本节内容进行本地源配置。
1. 将操作系统镜像文件openEuler-20.03-LTS-everything-aarch64-dvd.iso文件拷贝到每台服务器的“/root”目录下。
2. 镜像文件挂载。
    a. 将“/root”目录下的openEuler操作系统对应iso文件挂载到“/mnt”目录下。
    ```mount /root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt```
    说明：
    该操作单次生效，重启后失效。若需要配置开机启动自动挂载镜像（可选），可参考下面步骤。
    1. 打开fstab文件。
        ```vi /etc/fstab```
    2. 编辑fstab文件，在文件末尾添加如下信息：
        ```/root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt iso9660 loop 0 0```
    3. 保存并退出fstab文件。
3. 添加本地源文件。
    a. 进入“/etc/yum.repos.d”目录。
    ```cd /etc/yum.repos.d```
    说明：
    此时，建议将此目录下的*.repo文件移到任意其他备份目录下。
    b. 创建local.repo文件。
    1. 打开local.repo文件。
    ```vi local.repo```
    2. 编辑local.repo文件，在local.repo文件中添加如下内容：
    ```
    [local]
    name=local.repo
    baseurl=file:///mnt
    enabled=1
    gpgcheck=0
    ```
    说明：
    其中，baseurl中file路径为镜像挂载路径，与镜像文件挂载中的目录“/mnt” 对应。
    3. 保存并退出local.repo文件。
    4. 生效本地源。
    ```
    yum clean all
    yum makecache
    yum list
    ```

## 安装依赖包
下载并安装依赖包

```
yum -y install gcc gcc-c++ make libtool zlib zlib-devel pcre pcre-devel pcre2-devel perl-devel perl-ExtUtils-Embed openssl openssl-devel
```

# 获取源码
本文使用源码编译安装，因此需要获取到Nginx。

1. 下载Nginx源码
``` cd /home```
```wget https://nginx.org/download/nginx-1.14.2.tar.gz --no-check-certificate```

说明：
也可以通过本地浏览器下载源码之后上传到服务器&quot;/home&quot;目录下。
源码地址：https://nginx.org/download/nginx-1.14.2.tar.gz

注意：
若及其需要配置代理才可以访问外网，请参考下面操作配置网络代理。
1. 打开profile文件
```vi /etc/profile```
2. 添加如下代码后，保存并退出文件。
其中，代理服务用户名、代理服务器密码、代理服务器IP和代理服务端口需要根据当前环境配置
```
export http_proxy="http://代理服务器名:代理服务器密码@代理服务器IP：代理服务器端口"
export http_proxy=$http_proxy
export no_proxy=127.0.0.1,.huawei.com,localhost,local,.local
```
3. 使用代理效。
```source /etc/profile```
4. 查看环境变量中的代理信息。
```env```
5. 验证代理是否配置成功。
```curl www.baidu.com```
可以正常解析百度即为配置成功。

# 编译和安装
1. 解压Nginx安装包。
```tar -xvf nginx-1.14.2.tar.gz```

2. 进入&quot;nginx-1.14.2&quot;目录。
```cd /home/nginx-1.14.2/```

3. 配置Nginx。
```./configure --prefix=/usr/local/nginx --with-http_ssl_module```
说明：
- --prefix=PATH:用来制定Nginx的安装目录，默认安装目录为"/usr/local/nginx"。
- 不需要配置with-http_stub_status_module模块，该统计模块会影响Nginx性能。
4. 编译并安装Nginx
```make -j96 &amp;&amp; make -j96 install```
   说明：
   -j96: 充分利用CPU多核优势，加快编译安装速度。
   CPU 的核数可以通过lscpu查看。
5.查看安装目录。
```ls /usr/local/nginx```


# 运行和验证
## 生成证书
1. 进入&quot;/usr/local/nginx&quot;目录，在该目录下生成密钥key。
```cd /usr/local/nginx```
```openssl genrsa -des3 -out server_2048.key 2048```
会有两次要求输入密码，输入同一个即可，此时会生成server_2048.key文件。
```
[root@localhost nginx]# openssl genrsa -des3 -out server_2048.key 2048
Generating RSA private key, 2048 bit long modulus (2 primes)
..................................................................................+++++
................+++++
e is 65537 (0x010001)
Enter pass phrase for server_2048.key:
Verifying - Enter pass phrase for server_2048.key:
```

   说明：
   可通过如下命令实现免密码使用此文件：
   ```openssl rsa -in server_2048.key -out -server_2048.key```

   ```
   [root@localhost nginx]# openssl rsa -in server_2048.key -out -server_2048.key
   Enter pass phrase for server_2048.key
   writing RSA key
   ```

2. 创建服务器证书的申请文件。
```
openssl req -new -key server_2048.key -out server_2048.csr
```

```
[root@localhost nginx]# openssl req -new -key server_2048.key -out server_2048.csr
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

输入1中设置的密码，其中Country Name 选项输入CN，其他选项可以不填。
3. 重写密钥key。
```openssl rsa -in server_2048.key -out server_2048.key```
```
[root@localhost nginx]# openssl rsa -in server_2048.key -out server_2048.key
writing RSA key
```
4. 生成证书。
```openssl x509 -req -days 365 -in server_2048.csr -signkey server_2048.key -out server_2048.crt```
```
[root@localhost nginx]# openssl x509 -req -days 365 -in server_2048.csr -signkey server_2048.key -out server_2048.crt
Signature ok
subject=C = CN, ST = Some-State, O = Internet Widgits Pty Ltd
Getting Private key
```
输入1中设置的密码。若已经设置免密码使用该文件，则无需输入密码。

## 配置功能
### 配置Nginx的HTTPS功能
1. 打开nginx.conf配置文件。
```vi /usr/local/nginx/conf/nginx.conf```
2. 修改nginx.conf配置文件以下三处配置后，保存并退出（Esc+ :wq）。
   - 定义Nginx运行的用户权限user为root。
   - 修改listen监测端口，可以使用默认端口，本文修改为20000。
   - 指定ssl_certificate和ssl_certificate_key文件。

#### 原文默认内容：
```
#user  nobody;
...
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
```

#### 修改后内容：
```
user  root;
 ...
     HTTPS server
    
    server {
        listen       20000 ssl;
        server_name  localhost;

        ssl_certificate      /usr/local/nginx/server_2048.crt;
        ssl_certificate_key  /usr/local/nginx/server_2048.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            root   html;
            index  index.html index.htm;
        }
    }

```


### 配置Nginx的HTTP功能

1. 打开nginx.conf配置文件。
```vi /usr/local/nginx/conf/nginx.conf```
2. 修改nginx.conf配置文件以下三处配置后，保存并退出（Esc+ :wq）。
   - 定义Nginx运行的用户权限user为root。
   - 修改listen监测端口，可以使用默认端口，本文修改为10000。

#### 原文件默认内容：
```
user  root;
...
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
   }
}
```

#### 修改后内容：
```
user  root;
...
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on

    server {
        listen       10000;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
   }
}
```

## 运行Nginx
1. 启动Nginx（两种方式）。

   - 通过Service服务启动（使用该方法需要先将Nginx加入Service服务再执行启动命令）。
     1. 修改“/etc/init.d/nginx”文件。
           a. 删除原文件nginx。
           ```rm -rf /etc/init.d/nginx```
           b. 新建nginx文件。
	         ```vi /etc/init.d/nginx```
	         c. 添加如下内容后，保存并退
```
	   #!/bin/bash
	   # chkconfig: 2345 10 90
	   # description: nginx
	   case "$1" in
	     'start')
	       /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
	       echo "$0_start";
	      ;;
	    'stop')
	     /usr/local/nginx/sbin/nginx -s quit
	     echo "$0_stop";
	     ;;
	   esac
```

     2. 修改“/etc/init.d/nginx”文件权限。
```chmod 777 /etc/init.d/nginx```
       3. 将Nginx加入chkconfig管理列表。
```chkconfig --add /etc/init.d/nginx```
       4. 设置Nginx开机自动启动。
```chkconfig nginx on```
       5. 启动Nginx。
```service nginx start```
    - 通过脚本命令启动。
```/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf```
2. 查看Nginx的进程。
```ps -ef | grep nginx```
```
[root@localhost nginx]# ps -ef | grep nginx
root        9463       1  0 18:22 ?        00:00:00 nginx: master process /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
root        9464    9463  0 18:22 ?        00:00:00 nginx: worker process
root        9466    1352  0 18:23 ttyAMA0  00:00:00 grep --color=auto nginx
```
   说明：
   关闭Nginx命令如下（3种方式，可选）。业务运行中不要执行该命令。
   - 通过Service服务关闭。
      ```service nginx stop```
   - 通过脚本命令关闭。
      ```/usr/local/nginx/sbin/nginx -s quit```
   - 使用结束进程命令。

    ```pkill nginx```

```
[root@localhost nginx]# pkill nginx
[root@localhost nginx]# ps -ef | grep nginx
root        9469    1352  0 18:27 ttyAMA0  00:00:00 grep --color=auto nginx
```

## 验证Nginx
1. 查看Nginx的监测端口（10000是HTTP监测端口，20000是HTTPS监测端口）。
```netstat -anp | grep 10000```
```netstat -anp | grep 20000```
```netstat -anpt```

```
[root@localhost nginx]# netstat -anp | grep 10000
tcp        0      0 0.0.0.0:10000           0.0.0.0:*               LISTEN      9535/nginx: master  
[root@localhost nginx]# netstat -anp | grep 20000
tcp        0      0 0.0.0.0:20000           0.0.0.0:*               LISTEN      9535/nginx: master  
[root@localhost nginx]# netstat -anpt
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:10000           0.0.0.0:*               LISTEN      9535/nginx: master  
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      775/sshd: /usr/sbin 
```
2. 查看Nginx的HTML文件所在目录。
```ll -h /usr/local/nginx/html/```
```
[root@localhost nginx]# ll -h /usr/local/nginx/html/
total 8.0K
-rw-r--r--. 1 root root 537 Mar 20 16:46 50x.html
-rw-r--r--. 1 root root 612 Mar 20 16:46 index.html
```
3. 验证HTTPS功能。
通过curl本地访问Nginx的HTML页面。
```curl -k  https://127.0.0.1:20000/index.html```

```
[root@localhost nginx]# curl -k  https://127.0.0.1:20000/index.html



Welcome to nginx!

    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }



<h1>Welcome to nginx!</h1>
If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.

For online ation and support please refer to
<a href="#" class="white">nginx.org</a>.<br>
Commercial support is available at
<a href="#" class="white">nginx.com</a>.

<em>Thank you for using nginx.</em>


```
4. 验证HTTP功能。
通过curl本地访问Nginx的HTML页面。
```curl http://127.0.0.1:10000/index.html```

```
[root@localhost nginx]# curl http://127.0.0.1:10000/index.html



Welcome to nginx!

    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }



<h1>Welcome to nginx!</h1>
If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.

For online ation and support please refer to
<a href="#" class="white">nginx.org</a>.<br>
Commercial support is available at
<a href="#" class="white">nginx.com</a>.

<em>Thank you for using nginx.</em>


```

# 卸载Nginx
1. 编译安装只是生成对应的文件，不涉及卸载，直接删除对应的安装目录即可。
```rm -rf /usr/local/nginx```



