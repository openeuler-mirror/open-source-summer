---
title: Руководство по портированию Dubbo 2.6.8 (openEuler 20.03 LTS SP1)  
date: 2021-12-29  
tags:  
    - Dubbo  
    - Руководство по портированию  
sig: sig-Compatibility-Infra  
archives: 2021-12  
author: randy1568  
summary: Принципы портирования Dubbo 2.6.8.
---

# Руководство по портированию Dubbo 2.6.8 (openEuler 20.03 LTS SP1)

## Введение

### Обзор

Dubbo — это высокопроизводительный сервисный фреймворк с открытым исходным кодом, предоставляемый компанией Alibaba, с помощью которого приложения выполняют ввод и вывод сервисных запросов через удаленный вызов процедур (RPC). Данный фреймворк легко интегрируется с фреймворком Spring. Фактически Dubbo представляет собой фреймворк RPC, основанный на Spring, который реализует удаленный вызов и управление сервисами.



### Рекомендуемая версия

Dubbo 2.6.8



## Требования к среде

### Аппаратное обеспечение

Требования к аппаратному обеспечению перечислены в [Табл. 1](https://support.huaweicloud.com/intl/en-us/prtg-dubbo-kunpengwebs/kunpengdubbo268_02_0002.html).

| Параметр              | Описание                   |
| --------------------- | -------------------------- |
| Центральный процессор | Процессор Kunpeng 920      |
| Сеть                  | Наличие доступа к Интернет |
| СХД                   | Нет требований             |
| Память                | Нет требований             |

### Операционная система

Требования к операционной системе перечислены в [Табл. 2](https://support.huaweicloud.com/intl/en-us/prtg-dubbo-kunpengwebs/kunpengdubbo268_02_0002.html).

| Параметр  | Версия                |
| --------- | --------------------- |
| openEuler | 20.03 LTS SP1 AArch64 |
| Ядро      | 4.19.90               |



## Конфигурирование среды компиляции

### Конфигурирование сервера DNS

```
# cat /etc/resolv.conf 
nameserver 114.114.114.114
nameserver 8.8.8.8
```

### Установка зависимостей

1. Загрузите и установите зависимости.

```
yum install java-1.8.0* tcl git gcc gcc-c++ make cmake libtool autoconf automake -y
```

2. Запросите версию Java.

```
[root@localhost ~]# java -version
openjdk version "1.8.0_272"
OpenJDK Runtime Environment Bisheng (build 1.8.0_272-b10)
OpenJDK 64-Bit Server VM Bisheng (build 25.272-b10, mixed mode)

```

### Установка Maven

1. Загрузите инсталляционный пакет Maven.

```
wget https://archive.apache.org/dist/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
```

2. Разархивируйте инсталляционный пакет в указанный каталог.

```
tar -zxvf apache-maven-3.6.3-bin.tar.gz -C /opt/
```

3. Сконфигурируйте переменные среды Maven.

a. Добавьте путь к Maven в конце файла **/etc/profile**.

```
echo "MAVEN_HOME=/opt/apache-maven-3.6.3/" >> /etc/profile
echo "export PATH=$MAVEN_HOME/bin:$PATH" >> /etc/profile
```

b. Выполните операцию, чтобы измененные переменные среды вступили в силу.

```
source /etc/profile
```

4. Убедитесь, что конфигурация вступила в силу.

```
[root@localhost ~]# mvn -v
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /opt/apache-maven-3.6.3
Java version: 1.8.0_272, vendor: Bisheng, runtime: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.272.b10-7.oe1.aarch64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "4.19.90-2012.4.0.0053.oe1.aarch64", arch: "aarch64", family: "unix"

```

5. В конфигурационном файле Maven измените локальный репозиторий, удаленный репозиторий и прокси.

Путь к конфигурационному файлу: **/opt/apache-maven-3.6.3/conf/settings.xml**.

Сконфигурируйте сетевой прокси. Введите желаемые значения параметров **host**, **port**, **username** и **password**.

```
<proxies>
   <proxy>
     <id>my-proxy</id>
     <active>true</active>
     <protocol>https</protocol>
     <host>Proxy server URL</host>
     <port>Proxy server port</port>
     <username>User name</username>
     <password>Password</password>
     <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
   </proxy>
   <proxy>
     <id>my-proxy1</id>
     <active>true</active>
     <protocol>http</protocol>
     <host>Proxy server URL</host>
     <port>Proxy server port</port>
     <username>User name</username>
     <password>Password</password>
     <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
   </proxy>
</proxies>
```

Сконфигурируйте удаленный репозиторий.

```
<mirrors>
         <mirror>
                <id>huaweicloud</id>
                <mirrorOf>*</mirrorOf>
                <url>https://mirrors.huaweicloud.com/repository/maven/</url>
         </mirror>
</mirrors>
```

## Компиляция Dubbo 2.6.8

### Получение исходного кода

```
mkdir /home/Dubbo && cd /home/Dubbo && wget https://github.com/apache/dubbo/archive/dubbo-2.6.8.tar.gz
&& tar -xvf dubbo-2.6.8.tar.gz
```

### Компиляция модуля dubbo-rpc-redis

```
mvn install
```

Если на экране появится сообщение **BUILD SUCCESS**, значит модуль dubbo-rpc-redis скомпилирован.

### Компиляция Dubbo 2.6.8

В конец строки 552 файла **/home/Dubbo/dubbo-dubbo-2.6.8/pom.xml** добавьте следующее содержание:  

<img src="./image/Dubbo-1.png">  

Если на экране появится сообщение **BUILD SUCCESS**, значит Dubbo 2.6.8 скомпилирован.

<img src="./image/Dubbo-2.png">  

Созданный после компиляции пакет **dubbo-2.6.8.jar** сохраняется в каталоге **all/target**.