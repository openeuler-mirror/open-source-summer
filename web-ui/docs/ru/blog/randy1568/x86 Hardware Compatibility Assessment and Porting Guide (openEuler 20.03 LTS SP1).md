---
title: Руководство по оценке совместимости аппаратного обеспечения x86 и портированию (openEuler 20.03 LTS SP1)  
date: 2022.01.07  
tags:  
    - оценка совместимости аппаратного обеспечения x86  
    - CX5 и 3108 RAID  
    - Руководство по портированию  
sig: sig-Compatibility-Infra  
archives: 2022.01 
author: randy1568  
summary: принципы оценки аппаратного обеспечения x86 (Hi1822 NIC и карта RAID-контроллера 3108)
---

# Руководство по оценке совместимости аппаратного обеспечения x86 и портированию (openEuler 20.03 LTS SP1)


# Среда

## Аппаратное обеспечение

В следующей таблице приведено описание аппаратного обеспечения.

| Аппаратное обеспечение | Описание                                        |
| ---------------------- | ----------------------------------------------- |
| Сервер                 | 2288H V5                                        |
| Центральный процессор  | Процессор Intel(R) Xeon(R) Gold 6266C, 3,00 ГГц |
| NIC                    | Mellanox ConnectX-5                             |
| Карта RAID-контроллера | Huawei LSI SAS3108                              |

## Операционная система

В следующей таблице приведено описание операционных систем.

| ОС           | Описание        |
| ------------ | --------------- |
| CentOS Linux | 7.9.2009 (Core) |
| Kernel       | 3.10.0  x86_64  |

Проверьте информацию о текущей системе.
cat /etc/os-release

<img src="./image/hardware-1.png">

# Запуск инструмента x2openEuler и оценка совместимости аппаратного обеспечения

Для оценки аппаратного и программного обеспечения, а также конфигурации системы сообщество openEuler предлагает использовать инструмент [x2openEuler](https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/stable/contrib/x2openEuler/noarch/Packages/). При оценке аппаратного обеспечения проверяется совместимость плат, корректно работающих на ОС CentOS, с операционной системой openEuler. Инструмент собирает информацию о платах и создает отчеты в формате HTML, в которых выводятся данные о совместимости аппаратного обеспечения.

## Загрузка x2openEuler

```
cd /opt/
wget https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/stable/contrib/x2openEuler/noarch/Packages/x2openEuler-1.0-1.noarch.rpm
```

## Установка x2openEuler

```
cd /opt/
rpm -ivh x2openEuler-1.0-1.noarch.rpm
```

> Примечание. Пакет RPM может установить пользователь с правами администратора (**root)**. Для загрузки и установки зависимостей необходимо сетевое соединение. 
>
> Примечание. Установите зависимости, например **bzip2-devel,** следуя инструкциям.

```
su x2openEuler
x2openEuler redis-db -init
```

Последовательно введите следующую информацию о базе данных Redis. 

IP-адрес: 127.0.0.1
Порт: 6379
Индекс базы данных (0-16): 0
Пароль (шифруется инструментом): если пароль Redis не установлен или не заполнен, нажмите **Enter**.

```
x2openEuler init source_centos7.6-openEuler20.03-LTS-SP1.tar.gz
```

> Примечание. После установки x2openEuler с помощью пакета RPM в каталоге **/opt/x2openEuler** создается пакет с ресурсами по умолчанию (source\_centos7.6-openEuler20.03-LTS-SP1.tar.gz). Для поддержки оценки совместимости аппаратного обеспечения с операционными системами CentOS 8.2 и openEuler 20.03 LTS SP1 необходимо получить и импортировать соответствующий пакет со статическими ресурсами. Например, если пакетом ресурсов является **source\_centos8.2-openEuler20.03-LTS-SP1.tar.gz**, выполните команду **x2openEuler init source\_centos8.2-openEuler20.03-LTS-SP1.tar.gz**, чтобы импортировать пакет.

## Анализ совместимости аппаратных средств

    x2openEuler hardware-analyse 
    ‏The command output is as follows:
    2021-11-30 09:41:20,865 - INFO - Log save directory: /var/log/x2openEuler
    2021-11-30 09:41:20,887 - INFO - x2openEuler hardware-analyse
    2021-11-30 09:41:20,888 INFO manager/get_param_config/179: Parameter configuration file loaded.
    2021-11-30 09:41:20,905 INFO manager/get_regex_config/218: Regex pattern compiled.
    2021-11-30 09:41:20,905 INFO manager/load_parsers/233: All builtin parsers loaded.
    2021-11-30 09:41:20,905 INFO manager/load_parsers/236: All custom parsers loaded.
    2021-11-30 09:41:21,254 INFO time_utils/wrapper/21: 0.35s taken for running function [get_data]
    2021-11-30 09:41:21,269 WARNING list/parse_content/47: no data in ls_dev
    2021-11-30 09:41:21,377 INFO time_utils/wrapper/21: 0.12s taken for running function [get_parsed_content]
    2021-11-30 09:41:21,377 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/kernel_startup_param.json.
    2021-11-30 09:41:21,378 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/syscall_interface.json.
    2021-11-30 09:41:21,378 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/path.json.
    2021-11-30 09:41:21,379 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/port.json.
    2021-11-30 09:41:21,379 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/device_interface.json.
    2021-11-30 09:41:21,380 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/linux_command.json.
    2021-11-30 09:41:21,387 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/hardware_configure.json.
    2021-11-30 09:41:21,396 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/proc.json.
    2021-11-30 09:41:21,404 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/system_configure.json.
    2021-11-30 09:41:21,408 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/system_service.json.
    2021-11-30 09:41:21,412 INFO manager/write_res/135: write to /opt/x2openEuler/_tmp_18ambppj_/run/9e81f536-517e-11ec-ae65-a01c8dfeddfa/sysconf/kernel_configure.json.
    2021-11-30 09:41:21,426 - INFO - Producing report...
    2021-11-30 09:41:21,427 - INFO - Generate Success! The results are saved: /opt/x2openEuler/output/hw_compat_report-20211130094121.html
    In the command output, /opt/x2openEuler/output/hw_compat_report-20211130094121.html is the evaluation report.

# Анализ результатов оценки аппаратных средств

В отчете с результатами оценки аппаратных средств выводится информация о том, насколько каждая плата и устройство в целом совместимы с ОС openEuler. Если какого-либо компонента нет в списке совместимых компонентов, требуется адаптация.

<img src="./image/hardware-5.png">
Каждая плата уникально определяется посредством четырех кортежей (VID, DID, SVID и SSID). Как видно из приведенного рисунка, по каждой плате можно сделать запрос по списку совместимых нижестоящих компонентов. Таким образом, в данном примере аппаратный сервер можно портировать с ОС CentOS на ОС openEuler 20.03 LTS SP1.