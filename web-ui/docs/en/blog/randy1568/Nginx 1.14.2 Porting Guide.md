---
title: Nginx 1.14.2 Porting Guide (openEuler 20.03 LTS SP1)
date: 2021-12-29
tags: 
    - Nginx
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you need to port Nginx 1.14.2
---

# Nginx 1.14.2 Porting Guide (openEuler 20.03 LTS SP1)

# Introduction

## Nginx Overview
Nginx is a lightweight web server that can act as a reverse proxy or mail (IMAP/POP3) proxy. It provides high concurrency with a low memory footprint, and supports FastCGI, SSL, virtual hosts, URL rewriting, gzip, and extension of many third-party modules.

Programming language: C

Brief description: a web server, reverse proxy server, or mail (IMAP/POP3) proxy server
## Recommended Version
Nginx 1.14.2  
  >NOTE:
  >This document applies to Nginx 1.14.2. However, you can refer to this document when porting other Nginx versions.


# Environment Requirements  
## Hardware
Table 1 lists the hardware requirements.  
Table 1 Hardware requirements

|Item     |Description                      |
|---------|--------------------------|
|Server   |TaiShan 200 server (model 2280)|
|CPU      |Kunpeng 920 5250 processor         |
|Drive partition |No requirements             |

## Operating Systems
Table 2 lists the OS requirements.  
Table 2 OS requirements

|Item        |Version     |Command Used to Query the Version                       |
|------------|---------|---------------------------------|
|openEuler   |20.03 LTS SP1   |```cat /etc/openEuler-release``` |
|Kernel      |4.19.90  |``` uname -r```                   |

# Configuring the Compilation Environment  
## Configuring the Yum Repository
NOTE:
Configure the local source if the server cannot obtain dependencies from the Internet using **yum** commands.

1. Copy the OS image file **openEuler-20.03-LTS-everything-aarch64-dvd.iso** to the **/root** directory on each server.
2. Mount the image file. Mount the openEuler .iso file in the **/root** directory to the **/mnt** directory.

    ```mount /root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt```

    NOTE:
    This operation takes effect only once and becomes invalid after the OS is restarted. (Optional) To configure automatic image mounting on boot, perform the following steps:

    (1) Open the **fstab** file.  
    ```vi /etc/fstab```

    (2) Add the following content to the end of the **fstab** file:  
    ```/root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt iso9660 loop 0 0```

    (3) Save and then exit the **fstab** file.
3. Add a local source file.

    (1) Go to the **/etc/yum.repos.d** directory. 
 
    ```cd /etc/yum.repos.d```

    NOTE:
    It is recommended that you move the *.repo file in this directory to any other backup directory.

    (2) Create a **local.repo** file.

    ​	a. Open the **local.repo** file.  
    ```vi local.repo```

    ​	b. Add the following content to the **local.repo** file:  

    ```
    [local]
    name=local.repo
    baseurl=file:///mnt
    enabled=1
    gpgcheck=0
    ```
    NOTE:
    The file path in **baseurl** is the image-mounting path, which corresponds to image file mounting directory **/mnt**.

    ​	c. Save and exit the **local.repo** file.

    ​	d. Make sure the local source is used.

    ```
    yum clean all
    yum makecache
    yum list
    ```

## Installing Dependencies
Download and install dependencies.

```
yum -y install gcc gcc-c++ make libtool zlib zlib-devel pcre pcre-devel pcre2-devel perl-devel perl-ExtUtils-Embed openssl openssl-devel
```

# Obtaining the Source Code
This document uses the source code for compilation and installation. You will also need to obtain the Nginx source code.

Run the following commands to download the Nginx source code:

``` cd /home```

```wget https://nginx.org/download/nginx-1.14.2.tar.gz --no-check-certificate```

NOTE:
You can also download the source code using a local browser and upload it to the **/home** directory on the server.
Download address: [https://nginx.org/download/nginx-1.14.2.tar.gz](https://nginx.org/download/nginx-1.14.2.tar.gz)

NOTE:
If you need to configure a proxy to access the Internet, perform the following operations.
1. Open the **profile** file.  
```vi /etc/profile```
2. Add the following code, and then save the file and exit.
The user name, password, IP address, and port number of the proxy server must be configured based on the site requirements.
```
export http_proxy="http://Proxy server user name:password@IP address:port"
export http_proxy=$http_proxy
export no_proxy=127.0.0.1,.huawei.com,localhost,local,.local
```
3. Ensure the proxy is used.  
```source /etc/profile```
4. View the proxy information in the environment variables.  
```env```
5. Verify whether the proxy function is configured successfully.  
```curl www.baidu.com```

If Baidu, for example, can be parsed, the configuration is successful.

# Compiling and Installing Nginx
1. Decompress the Nginx installation package.  
```tar -xvf nginx-1.14.2.tar.gz```

2. Go to the **nginx-1.14.2** directory.  
```cd /home/nginx-1.14.2/```

3. Configure Nginx.  
```./configure --prefix=/usr/local/nginx --with-http_ssl_module```
NOTE:
- **--prefix=*PATH*** specifies the Nginx installation directory. The default installation directory is **/usr/local/nginx**.
- **with-http_stub_status_module** does not need to be configured because this module affects the performance of Nginx.
4. Compile and install Nginx.  

```make -j96 &amp;&amp; make -j96 install```

   NOTE:
   In the command, -j96 leverages the multi-core feature of the CPUs to accelerate compilation.
   You can run the **lscpu** command to query the number of CPU cores.

5. Check the installation directory.  

```ls /usr/local/nginx```


# Running and Verifying Nginx  
## Generating a Certificate
1. Go to the **/usr/local/nginx directory** and generate a key in the directory.  
```cd /usr/local/nginx```
```openssl genrsa -des3 -out server_2048.key 2048```

Enter a password twice. The **server_2048.key** file is generated.
```
[root@localhost nginx]# openssl genrsa -des3 -out server_2048.key 2048
Generating RSA private key, 2048 bit long modulus (2 primes)
..................................................................................+++++
................+++++
e is 65537 (0x010001)
Enter pass phrase for server_2048.key:
Verifying - Enter pass phrase for server_2048.key:
```

   NOTE:
   You can run the following command to use the file without needing a password:  
   ```openssl rsa -in server_2048.key -out -server_2048.key```

   ```
   [root@localhost nginx]# openssl rsa -in server_2048.key -out -server_2048.key
   Enter pass phrase for server_2048.key
   writing RSA key
   ```

2. Create a certificate signing request (CSR).
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

Enter the password set in 1. Set **Country Name** to **CN**, for example, and leave other parameters blank.  
3. Rewrite the key.  
```openssl rsa -in server_2048.key -out server_2048.key```
```
[root@localhost nginx]# openssl rsa -in server_2048.key -out server_2048.key
writing RSA key
```
4. Generate a certificate.  
```openssl x509 -req -days 365 -in server_2048.csr -signkey server_2048.key -out server_2048.crt```
```
[root@localhost nginx]# openssl x509 -req -days 365 -in server_2048.csr -signkey server_2048.key -out server_2048.crt
Signature ok
subject=C = CN, ST = Some-State, O = Internet Widgits Pty Ltd
Getting Private key
```
Enter the password set in 1. If password-free access is set for the file, you do not need to enter the password.

## Configuring Functions
### Configuring Nginx HTTPS
1. Open the **nginx.conf** file.  
```vi /usr/local/nginx/conf/nginx.conf```
2. Modify the following configurations in the **nginx.conf** file, save the file, and exit (by pressing **Esc** + **:wq**).
   - Set the user permission for running Nginx to **root**.
   - Change the listen port number to **20000**. You can also use the default port number.
   - Specify the **ssl_certificate** and **ssl_certificate_key** files.

#### Default content:
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

#### Content after the modification:
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


### Configuring Nginx HTTP

1. Open the **nginx.conf** file.  
```vi /usr/local/nginx/conf/nginx.conf```
2. Modify the following configurations in the **nginx.conf** file, save the file, and exit (by pressing **Esc** + **:wq**).
   - Set the user permission for running Nginx to **root**.
   - Change the listen port number to **10000**. You can also use the default port number.

#### Default content:
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

#### Content after the modification:
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

## Running Nginx
1. Start Nginx in either of the following ways:

   - Start the Nginx service. You need to add Nginx to the service list, and then start the service using a command.

     (1) Modify the **/etc/init.d/nginx** file.

     	a. Delete the original **nginx** file.  
     ```rm -rf /etc/init.d/nginx```

     	b. Create a new **nginx** file.  
      ```vi /etc/init.d/nginx```

     	c. Add the following content to the file, and then save the file and exit.
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

(2) Modify the permission on the **/etc/init.d/nginx** file.  

​				```	chmod 777 /etc/init.d/nginx```

​				(3) Add Nginx to the **chkconfig** management list.  
​				```	chkconfig --add /etc/init.d/nginx```

​				(4) Enable Nginx to automatically start upon OS startup.  
​				```chkconfig nginx on```

​				(5) Start Nginx.  
​				```service nginx start```

   - Start Nginx by running a script.  

```/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf```

2. Check the Nginx process.  
```ps -ef | grep nginx```
```
[root@localhost nginx]# ps -ef | grep nginx
root        9463       1  0 18:22 ?        00:00:00 nginx: master process /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
root        9464    9463  0 18:22 ?        00:00:00 nginx: worker process
root        9466    1352  0 18:23 ttyAMA0  00:00:00 grep --color=auto nginx
```
   NOTE:
   You can run any of the following commands to disable Nginx. Do not run the commands when the service is running.
   - Stop the Nginx service.

      ```service nginx stop```
   - Stop Nginx by running a script.

      ```/usr/local/nginx/sbin/nginx -s quit```
   - Stop the Nginx process.

    ```pkill nginx```

```
[root@localhost nginx]# pkill nginx
[root@localhost nginx]# ps -ef | grep nginx
root        9469    1352  0 18:27 ttyAMA0  00:00:00 grep --color=auto nginx
```

## Verifying Nginx
1. Check the Nginx monitoring port (10000 for the HTTP monitoring port and 20000 for the HTTPS monitoring port).  
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
2. Query the directory where the HTML files of the Nginx are located.  
```ll -h /usr/local/nginx/html/```
```
[root@localhost nginx]# ll -h /usr/local/nginx/html/
total 8.0K
-rw-r--r--. 1 root root 537 Mar 20 16:46 50x.html
-rw-r--r--. 1 root root 612 Mar 20 16:46 index.html
```
3. Verify the HTTPS function.
Access the Nginx HTML page using cURL.  
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
4. Verify the HTTP function.
Access the Nginx HTML page using cURL.  
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

# Uninstalling Nginx
1. Delete the installation directory.  
```rm -rf /usr/local/nginx```
