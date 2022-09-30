---

title: Руководство по портированию Nginx 1.14.2 (openEuler 20.03 LTS SP1)  
date: 2021-12-29  
tags:  
    - Nginx  
    - Руководство по портированию  
sig: sig-Compatibility-Infra  
archives: 2021-12  
author: randy1568  
summary: Принципы портирования Nginx 1.14.2.
---

# Руководство по портированию Nginx 1.14.2 (openEuler 20.03 LTS SP1)

# Введение

## Сведения о Nginx

Nginx — это облегченная версия веб-сервера, который выполняет роль обратного прокси-сервера и прокси-сервера электронной почты (IMAP/POP3). Сервер выделяется высокой степенью параллелизма, занимает мало ресурсов памяти и поддерживает FastCGI, SSL, виртуальные хосты, перезапись URL, сжатие в формате gzip и расширение многих сторонних модулей.

Язык программирования: C.

Краткое описание: веб-сервер, обратный прокси-сервер или прокси-сервер электронной почты (IMAP/POP3).

## Рекомендуемая версия

Nginx 1.14.2

ПРИМЕЧАНИЕ:

Данный документ адресован версии Nginx 1.14.2. Также этот документ можно использовать для справки при портировании других версий Nginx.

# Требования к среде

## Аппаратное обеспечение

Требования к аппаратному обеспечению перечислены в Табл. 1.  

Табл. 1 Требования к аппаратному обеспечению  

| Параметр              | Описание                         |
| --------------------- | -------------------------------- |
| Сервер                | Сервер TaiShan 200 (модель 2280) |
| Центральный процессор | Процессор Kunpeng 920 5250       |
| Раздел диска          | Нет требований                   |

## Операционная система

Требования к операционной системе перечислены в Табл. 2.  

Табл. 2 Требования к операционной системе  

| Параметр  | Версия        | Команда, используемая для запроса версии |
| --------- | ------------- | ---------------------------------------- |
| openEuler | 20.03 LTS SP1 | `cat /etc/openEuler-release`             |
| Ядро      | 4.19.90       | `uname -r`                               |

# Конфигурирование среды компиляции

## Конфигурирование репозитория Yum

ПРИМЕЧАНИЕ:

Если сервер не может получить зависимости из сети Интернет командой **yum**, сконфигурируйте локальный источник.

1. Скопируйте файл с образом **openEuler-20.03-LTS-everything-aarch64-dvd.iso** в каталог **/root** на каждом сервере.

2. Смонтируйте файл с образом. Файл openEuler.iso из каталога **/root** монтируется в каталог **/mnt**.  
 ```mount /root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt```
   
   ПРИМЕЧАНИЕ: 
   
   Данная операция будет действительна только до перезапуска операционной системы. (Опционально) Для настройки автоматического монтирования образа при загрузке, выполните следующие операции:
   
   (1) Откройте файл **fstab**.   

   `vi /etc/fstab`
   
   (2) В конце файла **fstab** добавьте следующее содержание:   
   
   `/root/openEuler-20.03-LTS-SP1-everything-aarch64-dvd.iso /mnt iso9660 loop 0 0`
   
   (3) Сохраните файл **fstab** и выйдите.
   
3. Добавьте файл локального источника. 

   (1) Перейдите в каталог **/etc/yum.repos.d**.   

   `cd /etc/yum.repos.d` 

   ПРИМЕЧАНИЕ: 

   Рекомендуется перенести расположенный в данном каталоге файл \*.repo в любой другой резервный каталог. 

   (2) Создайте файл **local.repo**.

   ​	a. Откройте файл **local.repo**. 

   ​       `vi local.repo`

   ​	b. Добавьте следующую информацию в файл **local.repo**:

   ```
   [local]
   name=local.repo
   baseurl=file:///mnt
   enabled=1
   gpgcheck=0
   ```

   ПРИМЕЧАНИЕ: 

   Путем к файлу в **baseurl** является путь, по которому смонтирован образ, то есть это каталог, в который смонтирован файл с образом – **/mnt**.

   ​	c. Сохраните файл **local.repo** и выйдите.

   ​	d. Убедитесь, что используется локальный источник.

   ```
   yum clean all
   yum makecache
   yum list
   ```

## Установка зависимостей

Загрузите и установите зависимости.

```
yum -y install gcc gcc-c++ make libtool zlib zlib-devel pcre pcre-devel pcre2-devel perl-devel perl-ExtUtils-Embed openssl openssl-devel
```

# Получение исходного кода

В описанной в данном документе процедуре компиляции и установки использован исходный код. Вам также необходимо получить исходный код Nginx.

Чтобы загрузить исходный код Nginx, выполните следующие команды:  

``` cd /home```
```wget https://nginx.org/download/nginx-1.14.2.tar.gz --no-check-certificate```

ПРИМЕЧАНИЕ: 

Исходный код также можно загрузить через локальный браузер и выгрузить его в каталог **/home** на сервер. Адрес загрузки: https://nginx.org/download/nginx-1.14.2.tar.gz.

ПРИМЕЧАНИЕ: 

Чтобы сконфигурировать прокси для доступа к Интернет, выполните следующие операции:

1. Откройте файл **profile**.  

   `vi /etc/profile`

2. Добавьте следующий код, сохраните файл и выйдите. Необходимо настроить имя пользователя, пароль, IP-адрес и номер порта прокси-сервера в соответствии с требованиями сайта.

```
export http_proxy="http://Proxy server user name:password@IP address:port"
export http_proxy=$http_proxy
export no_proxy=127.0.0.1,.huawei.com,localhost,local,.local
```

3. Убедитесь, что используется прокси.   

   `source /etc/profile`

4. Проверьте информацию о прокси в переменных среды.   

   `env`

5. Убедитесь в успешном завершении настройки функции прокси.  

   `curl www.baidu.com` 

   Например, можно проверить следующим образом: если Baidu анализируется, значит настройка завершена.

# Компиляция и установка Nginx

1. Разархивируйте инсталляционный пакет Nginx.   

   `tar -xvf nginx-1.14.2.tar.gz`

2. Перейдите в каталог **nginx-1.14.2**.   

   `cd /home/nginx-1.14.2/`

3. Сконфигурируйте Nginx.  

   `./configure --prefix=/usr/local/nginx --with-http_ssl_module` 

   ПРИМЕЧАНИЕ:

- **--prefix=*PATH*** — это каталог для установки Nginx. Каталогом для установки по умолчанию является **/usr/local/nginx**.
- Модуль **with-http\_stub\_status\_module** конфигурировать не требуется, поскольку он влияет на производительность Nginx.

4. Скомпилируйте и установите Nginx. 

   `make -j96 &amp;&amp; make -j96 install` 

   ПРИМЕЧАНИЕ: 

   В данной команде для ускорения процесса компиляции -j96 использует преимущества многоядерных процессоров. Запрос количества ядер осуществляется командой **lscpu**.

5. Проверьте каталог установки.  

   `ls /usr/local/nginx`

# Запуск и верификация Nginx

## Создание сертификата

1. Перейдите в каталог **/usr/local/nginx directory** и сгенерируйте в каталоге ключ.   

   `cd /usr/local/nginx` `openssl genrsa -des3 -out server_2048.key 2048` 

   Дважды введите пароль. Сгенерируется файл **server\_2048.key**.

```
[root@localhost nginx]# openssl genrsa -des3 -out server_2048.key 2048
Generating RSA private key, 2048 bit long modulus (2 primes)
..................................................................................+++++
................+++++
e is 65537 (0x010001)
Enter pass phrase for server_2048.key:
Verifying - Enter pass phrase for server_2048.key:
```

ПРИМЕЧАНИЕ: 

Для использования файла без пароля выполните следующую команду:  

   ```openssl rsa -in server_2048.key -out -server_2048.key```

```
[root@localhost nginx]# openssl rsa -in server_2048.key -out -server_2048.key
Enter pass phrase for server_2048.key
writing RSA key
```

2. Создайте запрос на подпись сертификата (CSR).

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

Введите пароль, установленный на шаге 1. Задайте параметру **Country Name** значение **CN**, остальные параметры не настраивайте.  

  3\. Перезапишите ключ. 

`openssl rsa -in server_2048.key -out server_2048.key`

```
[root@localhost nginx]# openssl rsa -in server_2048.key -out server_2048.key
writing RSA key
```

4. Сгенерируйте сертификат. 

   `openssl x509 -req -days 365 -in server_2048.csr -signkey server_2048.key -out server_2048.crt`

```
[root@localhost nginx]# openssl x509 -req -days 365 -in server_2048.csr -signkey server_2048.key -out server_2048.crt
Signature ok
subject=C = CN, ST = Some-State, O = Internet Widgits Pty Ltd
Getting Private key
```

Введите пароль, установленный на шаге 1. Если для этого файла настроен доступ без пароля, вводить пароль не требуется.

## Настройка функций

### Настройка Nginx HTTPS

1. Откройте файл **nginx.conf**. 

   `vi /usr/local/nginx/conf/nginx.conf`

2. В файле **nginx.conf** измените следующие настройки, затем сохраните файл и выйдите (нажав комбинацию **Esc** + **:wq**).
   - Для запуска Nginx необходимо установить права пользователя **root**.
   - Задайте номер порта прослушивания — **20000**. Можно также использовать номер порта по умолчанию.
   - Укажите файлы **ssl\_certificate** и **ssl\_certificate\_key**.

#### Настройки по умолчанию:

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

#### Настройки после изменения:

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

### Настройка Nginx HTTP

1. Откройте файл **nginx.conf**.  

   `vi /usr/local/nginx/conf/nginx.conf` 

2. В файле **nginx.conf** измените следующие настройки, затем сохраните файл и выйдите (нажав комбинацию **Esc** + **:wq**). 
   - Для запуска Nginx необходимо установить права пользователя **root**.
   - Задайте номер порта прослушивания — **10000**. Можно также использовать номер порта по умолчанию.

#### Настройки по умолчанию:

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

#### Настройки после изменения:

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

## Запуск Nginx

1. Запустите Nginx любым из приведенных способов:
   
   - Запустите службу Nginx. Необходимо добавить Nginx в список служб и затем запустить службу командой.
     
     (1) Измените файл **/etc/init.d/nginx**. 
     
     ​     a. Удалите исходный файл **nginx**. 
     
     `rm -rf /etc/init.d/nginx` 
     
     ​     b. Создайте новый файл **nginx**. 
     
     `vi /etc/init.d/nginx` 
     
     ​     c. Добавьте в файл следующую информацию, сохраните файл и выйдите.

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

​               (2) Измените права в файле **/etc/init.d/nginx**.

​    			```	chmod 777 /etc/init.d/nginx```

​			   (3) Добавьте Nginx в список администрирования **chkconfig**.

 ​				`	chkconfig --add /etc/init.d/nginx`

​			   (4) Включите опцию автоматического запуска службы Nginx во время запуска ОС. ​				

​				```chkconfig nginx on```

​				(5) Запустите Nginx. ​				

​				```service nginx start```

- Запустите Nginx методом выполнения скрипта.

`/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf`

2. Проверьте состояние процесса Nginx. 

   `ps -ef | grep nginx`

```
[root@localhost nginx]# ps -ef | grep nginx
root        9463       1  0 18:22 ?        00:00:00 nginx: master process /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
root        9464    9463  0 18:22 ?        00:00:00 nginx: worker process
root        9466    1352  0 18:23 ttyAMA0  00:00:00 grep --color=auto nginx
```

ПРИМЕЧАНИЕ: 

Отключить Nginx можно любой из следующих команд. Не выполняйте данные команды, если в данный момент работает какая-либо служба.

- Остановите службу Nginx. 

    `service nginx stop`

- Остановите службу Nginx методом выполнения скрипта.

    `/usr/local/nginx/sbin/nginx -s quit`

- Остановите процесс Nginx. 

    ```pkill nginx```

```
[root@localhost nginx]# pkill nginx
[root@localhost nginx]# ps -ef | grep nginx
root        9469    1352  0 18:27 ttyAMA0  00:00:00 grep --color=auto nginx
```

## Верификация Nginx

1. Проверьте порт мониторинга Nginx (10000 — номер порта мониторинга службы HTTP, а 20000 — службы HTTPS). 

   `netstat -anp | grep 10000` 
   `netstat -anp | grep 20000`
   `netstat -anpt`

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

2. Запросите каталог, в котором размещены файлы HTML службы Nginx. 

   `ll -h /usr/local/nginx/html/`

```
[root@localhost nginx]# ll -h /usr/local/nginx/html/
total 8.0K
-rw-r--r--. 1 root root 537 Mar 20 16:46 50x.html
-rw-r--r--. 1 root root 612 Mar 20 16:46 index.html
```

3. Проверьте функцию HTTPS. Войдите на HTML-страницу Nginx с помощью cURL. 

   `curl -k https://127.0.0.1:20000/index.html`

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

4. Проверьте функцию HTTP. Войдите на HTML-страницу Nginx с помощью cURL.

    `curl http://127.0.0.1:10000/index.html`

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

# Удаление Nginx

1. Удалите каталог установки. 

   `rm -rf /usr/local/nginx`