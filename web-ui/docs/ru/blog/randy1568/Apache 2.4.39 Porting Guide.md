---
title: Руководство по портированию Apache 2.4.39 (openEuler 20.03 LTS SP1)  
date: 2021-12-29  
tags:  
    - Apache  
    - Руководство по портированию  
sig: sig-Compatibility-Infra  
archives: 2021-12  
author: randy1568  
summary: Принципы портирования Apache 2.4.39.
---

# Руководство по портированию Apache 2.4.39 (openEuler 20.03 LTS SP1)  

# Введение  

## Обзорная информация об Apache  

Apache HTTP Server (сокращенно Apache) — это веб-сервер с открытым исходным кодом, разработанный при поддержке фонда разработчиков Apache Software Foundation. Сервер, работающий на разных операционных системах, широко используется благодаря высокой безопасности и совместимости с различными платформами. Это надежное и быстродействующее программное обеспечение можно расширять с помощью простых API-интерфейсов, которые позволяют компилировать на сервер интерпретаторы таких языков, как Perl и Python.

Язык программирования: C.

Краткое описание: веб-сервер.

## Рекомендуемая версия

Apache httpd 2.4.39 или более поздние версии.

# Требования к среде

## Аппаратное обеспечение

В следующей таблице приведены требования к аппаратному обеспечению.  

| Параметр              | Описание                         |
| --------------------- | -------------------------------- |
| Сервер                | Сервер TaiShan 200 (модель 2280) |
| Центральный процессор | Процессор Kunpeng 920 5250       |
| Раздел диска          | Нет требований                   |

## Операционная система  

В следующей таблице приведены требования к операционной системе.  

| Параметр  | Версия            |
| --------- | ----------------- |
| openEuler | 20.03 SP1 AArch64 |
| Ядро      | 4.19              |

ПРИМЕЧАНИЕ:

Если операционная система устанавливается впервые, выберите режим установки «Server with GUI» вместо «Minimal Install». Иначе придется вручную устанавливать много программных пакетов.

# Конфигурирование среды компиляции

1. Установите пакет для разработки.  

```
yum update
yum install gcc gcc-c++
```

2. Установите зависимости.  

```
yum install apr-devel.aarch64 apr-util-devel.aarch64 pcre-devel.aarch64 -y
```

3. Получите исходный код.  
   
   Адрес загрузки: http://archive.apache.org/dist/httpd/httpd-2.4.39.tar.gz.

## Подготовка инсталляционного пакета

    tar xzvf httpd-2.4.39.tar.gz

## Изменение исходного кода

    cd httpd-2.4.39
    vi ./build/config.sub
    
    In the following two lines, add aarch64:
    
    | x86 | xc16x | xstormy16 | xtensa \
    =>
    | x86 | aarch64 | xc16x | xstormy16 | xtensa \

    
    | x86-* | x86_64-* | xc16x-* | xps100-* \
    =>
    | x86-* | aarch64-* | x86_64-* | xc16x-* | xps100-* \


## Компиляция и установка Apache

    ./configure --host=aarch64 --build=aarch64
    make -j4
    make install

# Настройка параметров

## Изменение httpd.conf

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

## Изменение httpd-default.conf

    vi /usr/local/apache2/conf/extra/httpd-default.conf
    
    Change the value in line 23 to 0.
      MaxKeepAliveRequests 0

# Верификация Apache

    Run the following command to start Apache:
      /usr/local/apache2/bin/httpd -f /usr/local/apache2/conf/httpd.conf -k start
    
    Run the following command to stop Apache:
      /usr/local/apache2/bin/httpd -f /usr/local/apache2/conf/httpd.conf -k stop
    
    Run the following command to check the service process:
      ps -ef |grep httpd