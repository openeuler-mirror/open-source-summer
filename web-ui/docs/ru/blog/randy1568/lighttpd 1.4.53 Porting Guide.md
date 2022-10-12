---
title: Руководство по портированию lighttpd 1.4.53 (openEuler 20.03 LTS SP1)  
date: 2021-12-29  
tags:  
    - Lighttpd  
    - Руководство по портированию  
sig: sig-Compatibility-Infra  
archives: 2021-12  
author: randy1568  
summary: Принципы портирования lighttpd 1.4.53.
---

# Руководство по портированию lighttpd 1.4.53 (openEuler 20.03 LTS SP1)

# Введение

## Обзор

lighttpd — это отлично зарекомендовавшее себя облегченное программное обеспечение с открытым исходным кодом, основной целью которого является предоставление безопасной, быстродействующей, совместимой гибкой среды веб-сервера для обеспечения работы высокопроизводительных веб-сайтов. lighttpd занимает мало ресурсов памяти, для его загрузки требуется процессор небольшой мощности, но при этом он отличается хорошей производительностью и многообразием модулей.

Язык программирования: C.

Краткое описание: веб-сервер.

## Рекомендуемая версия

lighttpd 1.4.53

# Требования к среде

## Аппаратное обеспечение

В следующей таблице перечислены требования к аппаратному обеспечению.  

| Параметр              | Описание                         |
| --------------------- | -------------------------------- |
| Сервер                | Сервер TaiShan 200 (модель 2280) |
| Центральный процессор | Процессор Kunpeng 920 5250       |
| Раздел диска          | Нет требований                   |

## Операционная система

В следующей таблице перечислены требования к операционной системе.  

| Параметр  | Версия            |
| --------- | ----------------- |
| openEuler | 20.03 SP1 AArch64 |
| Ядро      | 4.19              |

Примечание:  

Если операционная система устанавливается впервые, выберите режим установки «Server with GUI» вместо «Minimal Install». Иначе придется вручную устанавливать много программных пакетов.  

# Конфигурирование среды компиляции

1. Установите зависимости.  

`yum -y install gcc gcc-c++ glib2-devel pcre-devel bzip2-devel zlib-devel gamin-devel`

2. Получите исходный код.  

URL: https://download.lighttpd.net/lighttpd/releases-1.4.x/lighttpd-1.4.53.tar.gz

## Подготовка инсталляционного пакета

```
cp lighttpd-1.4.53.tar.gz $HOME &amp;&amp; cd $HOME
tar xzvf lighttpd-1.4.53.tar.gz
```

## Компиляция и установка lighttpd

```
cd lighttpd-1.4.53
./configure  --prefix=/usr/local/lighttpd  --with-fam
make -j60 &amp;&amp; make install
```

Примечание:  

\-**-prefix=PATH** — это каталог для установки lighttpd. 

**--with-fam** уменьшает количество вызовов **stat()**.

# Настройка параметров

## Создание каталога хранения программных файлов

```
cd /usr/local/lighttpd/
mkdir log webpages cache config
```

## Копирование конфигурационного файла или каталога

```
cp $HOME/lighttpd-1.4.53/doc/config/lighttpd.conf  /usr/local/lighttpd/config/
cp $HOME/lighttpd-1.4.53/doc/config/modules.conf   /usr/local/lighttpd/config/
cp $HOME/lighttpd-1.4.53/doc/config/conf.d         /usr/local/lighttpd/config/ -r
```

Примечание:

При установке lighttpd в инсталляционном каталоге создаются только три папки: **lib**, **sbin**, **share**. Остальные файлы необходимо скопировать и создать.  

## Изменение файла lighttpd.conf

```
vi /usr/local/lighttpd/config/lighttpd.conf

```

Измените строки 16–20 следующим образом:  

```
var.log_root       =   &quot;/usr/local/lighttpd/log&quot;
var.server_root    =   &quot;/usr/local/lighttpd&quot;
var.state_dir      =   &quot;/usr/local/lighttpd&quot;
var.home_dir       =   &quot;/usr/local/lighttpd&quot;
var.conf_dir       =   &quot;/usr/local/lighttpd/config&quot;
```

Измените строку 61 следующим образом:  

```
var.cache_dir      =   &quot;/usr/local/lighttpd/cache&quot;
```

Добавьте следующий комментарий к строке 93:

```
#server.use-ipv6 = &quot;enable&quot;
```

Измените строки 104–105 следующим образом (данная команда связана с правами на выполнение операций, поэтому не рекомендуется использовать пользователя **root)**:  

```
server.username  =  &quot;lighttpd1&quot;
server.groupname  =  &quot;lighttpd&quot;
```

Измените строку 115 (путь для сохранения страницы доступа) следующим образом:  

```
server.document-root  =  server_root + &quot;webpages&quot;
```

Измените строку 246 (режим кэширования) следующим образом (значение по умолчанию — **simple**, и согласно официальному описанию режим **fam** лучше, чем **simple**):  

```
server.stat-cache-engine = &quot;fam&quot;
```

Добавьте следующую информацию к строке 182. (Данный элемент конфигурации используется для настройки многопроцессного режима. Процесс lighttpd по умолчанию используется в однопроцессном режиме. Изменить значение можно в соответствии с требованиями к площадке.)  

```
server.max-worker = 4
```

## Создание группы пользователей

```
groupadd  lighttpd
useradd -g lighttpd  lighttpd1
```

## Изменение прав

```
chown lighttpd1  /usr/local/lighttpd/log
```

## Добавление тестовой страницы

cd /usr/local/lighttpd/webpages 
vi index.html  

```
	&lt;html&gt;
	&lt;head&gt;
	&lt;title&gt;lighttpd test&lt;/title&gt;
	&lt;/head&gt;
	&lt;body&gt;
	&lt;p&gt;this is a testing&lt;/p&gt;
	&lt;/body&gt;
	&lt;/html&gt;
```

# Тестирование службы

Запустите lighttpd.  

```
/usr/local/lighttpd/sbin/lighttpd -f /usr/local/lighttpd/config/lighttpd.conf
```

Проверьте процесс программы.   

```
ps -ef |grep lighttpd
```

Остановите lighttpd.  

```
pkill lighttpd
```

Тестовая веб-страница:  

http://{{ server\_ip }}:80/index.html