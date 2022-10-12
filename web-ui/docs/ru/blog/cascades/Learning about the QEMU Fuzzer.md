---
title: \[Open Source Promotion Plan] Инструмент фаззинга QEMU Fuzzer  
date: 2021-08-15  
tags:  
    - Qemu  
    - Virtio  
    - summer2021  
archives: 2021-08  
author: cascades  
summary: QEMU Fuzzer — это фреймворк, который тестирует запускаемые в гостевой ОС процессы чтения и записи на устройствах методом фаззинга, используя для этого инструменты libqtest и libFuzzer. QEMU Fuzzer включен в эмулятор QEMU, начиная с версии 5.0 и выше.
---
# Инструмент фаззинга QEMU Fuzzer

Данная статья впервые опубликована сообществом openEuler в рамках программы продвижения программного обеспечения с открытым исходным кодом [Open Source Promotion Plan](https://summer.iscas.ac.cn/). Название проекта: [No. 112 Improving QEMU Fuzzing](https://gitee.com/openeuler-competition/summer2021-112).

## О документе

В общих реализациях QEMU + Fuzzing применены режим qemu-afl и различные инструменты, которые тестируют устройства Интернета вещей методом фаззинга с использованием технологий виртуализации.  

В данной статье описывается фреймворк фаззинга для эмулятора QEMU, выполняющий фаззинг-тестирование в гипервизоре. Для эмуляции операций чтения и записи, выполняемых на устройствах с гостевой ОС, применяется фреймворк Qtest, а для сбора большого объема данных применяются эвристические алгоритмы libFuzzer. Данный фреймворк, созданный в рамках проекта [`Google Summer of Code 2019`](https://summerofcode.withgoogle.com/archive/2019/projects/6200259867312128/), добавлен к основной ветке эмулятора QEMU 5.0.0 и более поздних версий.  

## Принципы эмуляции QEMU

[`QEMU`](https://www.qemu.org/) — это инструмент эмуляции и виртуализации с открытым исходным кодом, реализованный силами [`Fabrice Bellard`](https://bellard.org/). Инструмент поддерживает два режима эмуляции:  

* `Full-system`: обеспечивает ускорение центрального процессора (ЦП), памяти и периферийных устройств с помощью KVM и Hyper-V.
* `User-mode`: запускает бинарный код в другой архитектуре ЦП посредством трансляции инструкций.  

Виртуализация позволяет обрабатывать операции доступа к памяти и другому специальному оборудованию с эмулятора устройств с использованием программы в пользовательском режиме при условии, что память используется только в пользовательском режиме. Устройства с другими архитектурами и наборами инструкций в QEMU эмулируются с помощью объектно-ориентированного программирования. Для описания моделей устройств в эмуляторе реализована объектная модель `QEMU Object Model`.  

* Модель устройства: каждое эмулируемое устройство соответствует объекту TypeInfo, который однозначно определяется по имени устройства и хранится в хэш-таблице.  
* Запуск устройства: перед запуском необходимо зарегистрировать устройство, инициализировать его модель и создать его экземпляр.  
* Трансляция инструкций: для получения инструкций от эмулятора устройств и перевода их на физические устройства в QEMU используется компонент Tiny Code Generator (TCG) или Kernel-based Virtual Machine (KVM). Несмотря на некоторые потери в производительности, ресурсов на аппаратную виртуализацию затрачивается относительно меньше, чем на программную виртуализацию.  
* Эмуляция памяти: QEMU обеспечивает для клиента возможность размещать объект в оперативной памяти. Когда клиент пытается получить доступ к памяти для записи данных на диск, QEMU перехватывает запрос на доступ и посылает его в модель устройства контроллера IDE. Данная модель выполняет синтаксический анализ запроса на операцию ввода-вывода и эмулирует инструкцию посредством вызова хост-системы. Далее память клиента копируется на диск хоста.  

То есть в хост-ОС гостевая ОС считает, что напрямую взаимодействует с физическими устройствами. Фактически QEMU выполняет роль посредника и выглядит это следующим образом:  

```asciidoc=
+----------+ +----------+ +----------+ +----------+ +----------+
|Польз.прос| |Польз.прос| |Польз.прос| |Польз.прос| |Польз.прос|
+----------+ +----------+ +----------+ +----------+ +----------+
|  Linux   | | Mac OS   | | Windows  | | Linux    | | Solaris  |
+----------+ +----------+ +----------+ +----------+ +----------+
|  Драйверы| | Драйверы | | Драйверы | |Драйверы  | | Драйверы |
+----------+ +----------+ +----------+ +----------+ +----------+
+----------+ +----------+ +----------+ +----------+ +----------+
| QEMU x86 | | QEMU x86 | | QEMU ARM | | QEMU PPC | | QEMU MIPS|
+----------+ +----------+ +----------+ +----------+ +----------+
+----------+-+----------+-+----------+-+----------+-+----------+
|               Хост-система:Linux,Mac OS,Windows              |
+--------------------------------------------------------------+
+--------------------------------------------------------------+
|Аппаратное обеспеч:ЦП,память,диск,сетевое устройство,USB и др.|
+--------------------------------------------------------------+
```

Подробнее об эмуляции QEMU см. [`Документация для пользователей`](LLVMFuzzerTestOneInput).   
Подробнее об устройствах QEMU см. [`Об устройствах QEMU`](https://www.qemu.org/2018/02/09/understanding-qemu-devices/).   
Подробнее о QEMU см. [`QEMU: быстрый и легкий динамический транслятор`](https://www.usenix.org/legacy/event/usenix05/tech/freenix/full_papers/bellard/bellard.pdf#:~:text=We%20present%20the%20internals%20of%20QEMU%2C%20a%20fast,one%20target%20CPU%20can%20be%20runon%20another%20CPU.).  

## Использование QEMU Fuzzer

См. описание в [официальной документации](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html).  

### Среда тестирования

Для данного эксперимента использована среда Docker в локальной подсистеме Windows Subsystem for Linux (WSL).  

```bash=
root@31b23c4c00b7:~/qemu# lscpu
Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Byte Order:                      Little Endian
CPU(s):                          16
root@31b23c4c00b7:~/qemu# cat /etc/os-release
NAME="Ubuntu"
VERSION="20.04.2 LTS (Focal Fossa)"
```

#### Проблема при работе в данной среде  

* Описание. Инструмент QEMU Fuzzer не адаптирован к архитектуре AArch64. Несмотря на успешное завершение компиляции, во время прогона возникает ошибка.  

![](https://img-blog.csdnimg.cn/img_convert/2161923b370fbd9f89318104b70fad11.png)  

* Решение. Цель данного проекта заключается в адаптации QEMU Fuzzer к архитектуре AArch64. В настоящее время используется среда x86.  

#### Неверная версия

* Описание. В примере на официальном веб-сайте использована версия Clang 8. Но есть уже версия Clang 14. При использовании версий, более поздних, чем Clang 8, на этапе компиляции появляется ошибка, что связано с включением **-Werror**.  

* Решение  
  
  * (Рекомендуется) Установите Clang, используя менеджер пакетов (apt/dnf).  
  * Выполните команду **git checkout**, которая переключает между ветками LLVM — с 8 на 10.  
  * Перейдите на [официальную страницу релизов](https://releases.llvm.org/) и загрузите исходный код LLVM версии с 8 по 10.  
  * Выполните команду sudo apt/dnf search xxx, чтобы проверить программное обеспечение, включенное в менеджер пакетов, и соответствующую версию. Версией по умолчанию является Clang 10.  

```bash=
# sudo apt/dnf install clang llvm compiler-rt
```

#### Упаковка с помощью Docker

Для развертывания используется Docker, который конфигурирует экспериментальную среду: [путь к образу.](https://hub.docker.com/repository/docker/cascadessjtu/qemu_fuzz)  

### Использование инструмента фаззинга в простом режиме  

Настроив среду, скомпилируйте и запустите программу фаззинга следующими командами. Появится результат выполнения libFuzzer.  

```bash=
CC=clang-10 CXX=clang++-10 ./configure --enable-sanitizers --enable-fuzzing
# qemu-fuzz-isa     isa indicates the architecture of the device emulator.
make qemu-fuzz-i386 qemu-fuzz-aarch64
# View available fuzzing objects.
build/qemu-fuzz-i386 --fuzz-target=FUZZ_NAME
```

QEMU Fuzzer также поддерживает инструкции по компиляции libFuzzer, которые можно просмотреть, выполнив команду `-help=1`.  

Для просмотра результатов фаззинга запустите инструмент [`Clang Sanitizer`](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html#generating-coverage-reports), который использует параметр CORPUS и изменяет инструкции компиляции. По завершении фаззинга выполните команду `llvm-cov` для конвертации сгенерированного файла `default.profraw` в файл `.html`.  

### Добавление пользовательского инструмента фаззинга  

Для добавления нового инструмента фаззинга выполните следующие действия:  

1. Скомпилируйте файл исходного кода `foo-device-fuzz.c` инструмента и сохраните его в каталоге `tests/qtest/fuzz`.  
2. Для взаимодействия с эмулятором устройств используйте существующий инструмент фаззинга и API в libqos и libqtest.  
3. Зарегистрируйте инструмент фаззинга в файле `tests/qtest/fuzz/meson.build`.  

### Использование инструмента фаззинга в универсальном режиме

Написание инструментов для фаззинга, ориентированных на определенные модели устройств, занимает много времени и ресурсов, особенно если драйверы устройств не включены в libqos. В QEMU предусмотрена опция `generic-fuzz`, которая запускает подготовительное фаззинг-тестирование на всех устройствах, в том числе PIO, MMIO и DMA. Для включения опции generic-fuzz установите следующие переменные среды:  

* `QEMU_FUZZ_ARGS=`: параметры, которые необходимы для настройки устройства, например NIC и имя пользователя.  
* `QEMU_FUZZ_OBJECTS`=: строки символов, которые задают область памяти, выделенную под фаззинг. Для определения подходящей области памяти используйте `./qemu-fuzz-i386 --fuzz-target=generic-fuzz -runs=0`. Чем больше областей памяти, тем больше пространство для ввода данных (`input-space`) для проведения фаззинг-тестирования. Однако в этом случае сложнее выявить, какие введенные данные привели к сбою устройства. Поэтому параметру `MemoryRegion` необходимо задать корректное значение.  

### Интеграция OSS-Fuzz

OSS-Fuzz — это интегрированный инструмент фаззинга, который выполняет фаззинг-тест по умолчанию на всех объектах. Для настройки среды доступен официальный файл [`Dockerfile`](https://github.com/google/oss-fuzz/blob/master/projects/qemu/Dockerfile), а для запуска фаззинга в универсальном режиме (generic fuzzer) требуется сделать дополнительные настройки переменных среды. В эмуляторе QEMU в файле `tests/qtest/fuzz/generic_fuzz_configs.h` для OSS-Fuzz определен ряд моделей устройств. Также в данный файл разработчики могут добавлять новые модели устройств.  

### Инструмент воспроизведения сбоя

При моделировании сбоя необходимо добиться, чтобы эмулятор QEMU, не имеющий компонента для фаззинга, отфильтровывал ложные ошибки и улучшил функцию отладки. Для создания инструмента воспроизведения `one-line reproducer` можно воспользоваться скриптом OSS-Fuzz.  

### Продолжительность процесса фаззинга

Во фреймворке QEMU Fuzzer доступны две точки входа для libFuzzer, вызов которых осуществляется после вызова главной функции libFuzzer.  

* `LLVMFuzzerInitialize`: вызов осуществляется до того, как фаззинг-инструмент запустит процесс инициализации среды.  
* `LLVMFuzzerTestOneInput`: вызов осуществляется для ввода данных во время выполнения задачи фаззинга и сброса статуса после завершения фаззинга.  

Процесс Fuzzer сбрасывается после каждой операции фаззинга. Также требуется сброс статуса самого эмулятора QEMU. Сбросить статус QEMU можно двумя способами.  

* `Reboot`: гостевая ОС перезапускается после завершения выполнения каждой операции фаззинга.   
* `Fork`: выполняется **test case** в подпроцессах. Эта операция схожа с режимом `fork-server` AFL.  

## Зависимости QEMU Fuzzer

Реализация QEMU Fuzzer зависит от библиотек libqtest и libqos. Подробнее см. [`Тестирование устройств, эмулированных в QEMU с помощью qtest`](https://www.linux-kvm.org/images/4/43/03x09-TestingQEMU.pdf). В данном документе описаны основные принципы Qtest, API и методы добавления сценариев тестирования.

### libqtest

* [Путь к исходному коду](https://github.com/qemu/qemu/tree/master/tests/qtest/libqtest.c)
* [Документация](https://qemu.readthedocs.io/en/latest/devel/qtest.html)

Qtest — это фреймворк, используемый для выполнения модульных тестов на физических устройствах, эмулированных с помощью QEMU. В состав фреймворка входят компоненты `Qtest Client` и `Qtest Server`. Компоненты взаимодействуют друг с другом через UNIX Socket и поддерживают следующие инструкции: PIO, MMIO, interrupt, QMP.  

* `Qtest Client`: драйвер, компилируемый для устройства. Драйвер инкапсулируется снизу вверх и зависит от фреймворка модульных тестов glib, libqtest, libqos и qgraph. Для добавления нового теста выполните следующие действия:
  
  1. Скомпилируйте код нового теста `tests/qtest/foo-test.c` в каталоге Qtest.  
  2. Добавьте инструкции по компиляции в **Makefile.include**.  
  3. Выполните операцию компиляции: `make tests/qtest/foo-test.c`  
  4. Запустите тест.
  
  ```bash=
  QTEST_LOG=1 QTEST_QEMU_BINARY=i386-softmmu/qemu-system-i386 tests/qtest/foo-test`
  ```

* `Qtest Server`: подобно TCG и KVM, компонент `Qtest Server` выполняет роль ускорителя и регистрируется запуском `-machine accel=qtest`. В стандартных сценариях vCPU напрямую взаимодействует с виртуальным устройством. В сценариях тестирования Qtest напрямую взаимодействует с виртуальным устройством и выполняет роль посредника между клиентом Qtest и виртуальным устройством. Qtest — используется для проверки корректности работы устройства, а также, чтобы удостовериться, что гостевая ОС не запущена.  

Во время работы компонента `libqtest.c` запускает QEMU как подпроцесс. Основной целью запуска QEMU является выполнение главной функции `vl.c`. В сценарии тестирования осуществляется вызов функции `qtest_init()` `qtest.c` для инициализации сервера Qtest.  

На следующей схеме показана взаимосвязь между клиентом и сервером Qtest.

```asciidoc=
+----------------+  сокет  +----------------+----------------------+
|  Клиент Qtest  +---------->  Сервер Qtest  |                      |
+----------------+          +-------+--------+                      |
+----------------+                  |        |         Qemu         |
|  Qgraph        |               PIO|MMIO    |                      |
+----------------+                  |        |                      |
+----------------+          +-------v--------+----------------------+
|  libqos        |          |    Эмуляция физического устройства    |
+----------------+          +---------------------------------------+
+----------------+
|  libqtest      |
+----------------+
+----------------+
|  glib test     |
+----------------+
```

### libqos

* [Путь к исходному коду](https://github.com/qemu/qemu/tree/master/tests/qtest/libqos/libqos.c)
* [Документация](https://qemu.readthedocs.io/en/latest/devel/qtest.html?highlight=libqos)  

libqos — это фреймворк драйверов, который используется для компиляции сценариев qtest и предоставляет API, связанные с `memory`, `PCI` и `virtio`. Функции фреймворка:  

* Фреймворк выполняет роль обертки (wrapper) шины и функции, специфичные для каждого типа шин.
* Унифицирует модель доступа к устройству, облегчая задачу разработчику.  

## Процесс QEMU Fuzzer

* [Путь к исходному коду](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz)
* [Документация](https://qemu.readthedocs.io/en/latest/devel/fuzzing.html)  

Упомянутые выше две зависимости разработаны для проведения тестов функций QEMU и зависят от вводимых тестовых данных. Фаззинг повышает качество вводимых тестовых данных за счет использования алгоритмов генерирования случайных данных и мутации существующих данных.  В этом случае libFuzzer можно использовать для фильтрации входных данных Qtest и повышения эффективности теста. Далее показана общая структура QEMU Fuzzer.  

![](https://img-blog.csdnimg.cn/img_convert/f269d3ace4fe504117d7fe4e2a253375.png)  

В данном исходном коде:  

* `fuzz.h`: интерфейс и структура данных для реализации целевого объекта фаззинга и взаимодействия с libFuzzer.  
* `fork_fuzz.h`: общая память, параллельно используемая разными инструментами фаззинга.
* `qos_fuzz.h`: инкапсулированные интерфейсы libqos фреймворка Qtest.  
* `generic_fuzz_configs.h`: задает настройки фаззинга в стандартном режиме.  
* `virtio_xxx_fuzz.h` реализует фаззинг устройств virtio (net, blk и scsi).  

## Анализ сценариев QEMU Fuzzer

В [`документации для разработчиков`](https://wiki.qemu.org/Documentation/GettingStartedDevelopers) QEMU упоминается следующее:  

> К эмулятору QEMU нет документации с описанием архитектуры высокого уровня. Все необходимое есть в исходном коде.  

Поэтому разработчикам QEMU крайне важно изучить исходный код. В данном разделе проанализирован процесс фаззинга QEMU на примере устройства virtio-net. Путь к исходному коду: [`tests/qtest/fuzz/virto_net_fuzz.c`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/virtio_net_fuzz.c). Virtio называют технологией паравиртуализации. В этом случае эмуляцию устройств выполняет хост-ОС, а гостевая ОС управляет устройствами. На следующей схеме представлен рабочий процесс.  

![](https://img-blog.csdnimg.cn/img_convert/8cbe7f371f062202bb88928900b3a481.png)  

Описание логики реализации сверху вниз.  

* В первую очередь реализуется функция регистрации `register_virtio_net_fuzz_targets()`. Функция `fuzz_add_qos_target()` в libqos добавляет три объекта фаззинга и служит оберткой функции `fuzz_add_target()` данного фреймворка. Прототип:  

```cpp=
void fuzz_add_qos_target(
        FuzzTarget *fuzz_opts,
        const char *interface,
        QOSGraphTestOptions *opts
        );
```

* В завершении необходимо изменить файл [`meson.build`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/fuzz.c) и добавить опции условной компиляции.  

`virtio-net-socket` использован здесь как главный объект фаззинга для анализа параметров и функций, содержащихся в данных параметрах.  

* `virtio-net-socket`:

```cpp=
fuzz_add_qos_target(&(FuzzTarget){
        .name = "virtio-net-socket",
        .description = "Fuzz the virtio-net virtual queues. Fuzz incoming "
        "traffic using the socket backend",
        .pre_fuzz = &virtio_net_pre_fuzz,
        .fuzz = virtio_net_fork_fuzz,},
        "virtio-net",
        &(QOSGraphTestOptions){.before = virtio_net_test_setup_socket}
        );
```

Первый параметр — это указатель, который отмечает временный объект FuzzTarget. Данный объект определяется с помощью [`fuzz.h`](https://github.com/qemu/qemu/tree/master/tests/qtest/fuzz/fuzz.c) и содержит идентификационную информацию и ряд функций обратного вызова, связанных с фаззингом. Описание объекта:  

```asciidoc=
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| Поле       | Выражение                                                 | Описание                                                 |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| name        | const char *name                                          | идентификатор объекта (passed to --fuzz-target=)                            |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| description | const char *description                                   | справ. текст                                                               |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| pre_fuzz    | void(*pre_fuzz)(QTestState *)                             | запускается после инициализации QEMU перед fuzz-loop. |
|             |                                                           | eg: detect the memory map                                               |
|             |                                                           | Может иметь значение NULL                                                             |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
| fuzz        | void(*fuzz)(QTestState *, const unsigned char *, size_t); | принимает и исполняет команды, введенные с LibFuzzer.                           |
|             |                                                           |повторно исполняется в течение цикла фаззинга.                    |
|             |                                                           | Цикл состоит из установки, исполнения и сброса.                   |
|             |                                                           | Не может иметь значение NULL                                                          |
+-------------+-----------------------------------------------------------+-------------------------------------------------------------------------+
```

`virtio_net_pre_fuzz` инициализирует общую память, используемую **qos path** и **fork fuzz**. `virtio_net_fork_fuzz` порождает дочерний процесс и вызывает функцию `virtio_net_fuzz_multi`. Данная функция управляет случайными данными с помощью определяемой пользователем операции `vq_action`, добавляет поступающие пакеты данных в `virtioqueue` и отбрасывает пакеты данных. Затем запускается основной цикл.  

Второй параметр задает имя пользовательского устройства. В приведенном примере используется значение **virtio-net**.  

Третий параметр задает структуру тестовых опций, предоставляемых [`qgraph.h`](https://github.com/qemu/qemu/tree/master/tests/qtest/libqos/qgraph.h). Параметр `before` принимает к исполнению функции, прототипом которых является `QOSBeforeTest`. Функция `virtio_net_test_setup_socket` определяет серверную часть (backend) сетевого устройства QEMU в качестве **socket**, что обеспечивает связь с виртуальным устройством и отправку его пакетов данных в сеть хоста.  

* `virtio-net-socket-check-use`

```cpp=
fuzz_add_qos_target(&(FuzzTarget){
        .name = "virtio-net-socket-check-used",
        .description = "Fuzz the virtio-net virtual queues. Wait for the "
        "descriptors to be used. Timeout may indicate improperly handled "
        "input",
        .pre_fuzz = &virtio_net_pre_fuzz,
        .fuzz = virtio_net_fork_fuzz_check_used,},
        "virtio-net",
        &(QOSGraphTestOptions){.before = virtio_net_test_setup_socket}
        );
```

Функция `virtio_net_fork_fuzz_check_used` схожа с `virtio_net_fork_fuzz`. Разница заключается в значении `true`, которое используется при вызове функции `virtio_net_fuzz_multi`.

* `cirtio-net-slirp`

```cpp=
fuzz_add_qos_target(&(FuzzTarget){
        .name = "virtio-net-slirp",
        .description = "Fuzz the virtio-net virtual queues with the slirp "
        " backend. Warning: May result in network traffic emitted from the "
        " process. Run in an isolated network environment.",
        .pre_fuzz = &virtio_net_pre_fuzz,
        .fuzz = virtio_net_fork_fuzz,},
        "virtio-net",
        &(QOSGraphTestOptions){.before = virtio_net_test_setup_user}
        );
```

`virtio_net_test_setup_user` определяет серверную часть сетевого устройства в качестве **user**.  

## Сценарий QEMU Fuzzer: CVE-2017-12809

В данном разделе представлен краткий анализ [уязвимости, включенной в базу данных CVE,](https://unit42.paloaltonetworks.com/unit42-palo-alto-networks-discovers-new-qemu-vulnerability/) которая была обнаружена в эмуляторе QEMU инструментом libFuzzer.  

* Описание уязвимости: данная уязвимость классифицируется как отказ в обслуживании. Когда для сборки гостевой ОС используется эмулятор дисков IDE, CD или DVD-ROM, привилегированные пользователи гостевой ОС могут удалить пустой драйвер устройства CD-ROM, что приведет к разыменованию нулевого указателя. В результате будет нарушен процесс QEMU.  
* Код уязвимости: перед вызовом функции `blk_aio_flush()` в файле `hw/ide/core.c` система не проверяет, пустой или не пустой `s->blk`.  

```asciidoc= hw/ide/core.c | 10 +++++++++-
---
 hw/ide/core.c | 10 +++++++++-
 1 file changed, 9 insertions(+), 1 deletion(-)

diff --git a/hw/ide/core.c b/hw/ide/core.c
index 0b48b64d3a..bea39536b0 100644
--- a/hw/ide/core.c
+++ b/hw/ide/core.c
@@ -1063,7 +1063,15 @@ static void ide_flush_cache(IDEState *s)
     s->status |= BUSY_STAT;
     ide_set_retry(s);
     block_acct_start(blk_get_stats(s->blk), &s->acct, 0, BLOCK_ACCT_FLUSH);
-    s->pio_aiocb = blk_aio_flush(s->blk, ide_flush_cb, s);
+
+    if (blk_bs(s->blk)) {
+        s->pio_aiocb = blk_aio_flush(s->blk, ide_flush_cb, s);
+    } else {
+        /* XXX blk_aio_flush() crashes when blk_bs(blk) is NULL, remove this
+         * temporary workaround when blk_aio_*() functions handle NULL blk_bs.
+         */
+        ide_flush_cb(s, 0);
+    }
 }
 
 static void ide_cfata_metadata_inquiry(IDEState *s)
-- 
```

[Устранение уязвимости](https://lists.gnu.org/archive/html/qemu-devel/2017-08/msg01989.html): добавьте условное суждение в часть, в которой возникает данная уязвимость, и код теста к `tests/ide-test.c`.  

```
---
 tests/ide-test.c | 19 +++++++++++++++++++
 1 file changed, 19 insertions(+)

diff --git a/tests/ide-test.c b/tests/ide-test.c
index bfd79ddbdc..aa9de065fc 100644
--- a/tests/ide-test.c
+++ b/tests/ide-test.c
@@ -689,6 +689,24 @@ static void test_flush_nodev(void)
     ide_test_quit();
 }
 
+static void test_flush_empty_drive(void)
+{
+    QPCIDevice *dev;
+    QPCIBar bmdma_bar, ide_bar;
+
+    ide_test_start("-device ide-cd,bus=ide.0");
+    dev = get_pci_device(&bmdma_bar, &ide_bar);
+
+    /* FLUSH CACHE command on device 0 */
+    qpci_io_writeb(dev, ide_bar, reg_device, 0);
+    qpci_io_writeb(dev, ide_bar, reg_command, CMD_FLUSH_CACHE);
+
+    /* Just testing that qemu doesn't crash... */
+
+    free_pci_device(dev);
+    ide_test_quit();
+}
+
 static void test_pci_retry_flush(void)
 {
     test_retry_flush("pc");
@@ -954,6 +972,7 @@ int main(int argc, char **argv)
 
     qtest_add_func("/ide/flush", test_flush);
     qtest_a
     cd qemu
     git checkout stable-2.10dd_func("/ide/flush/nodev", test_flush_nodev);
+    qtest_add_func("/ide/flush/empty_drive", test_flush_empty_drive);
     qtest_add_func("/ide/flush/retry_pci", test_pci_retry_flush);
     qtest_add_func("/ide/flush/retry_isa", test_isa_retry_flush);
 
-- 
```

* Воспроизведение сценария уязвимости: перед установкой патча найдите версию с подтвержденными изменениями, добавьте тестовые сценарии в новый тест и запустите программу Qtest.  

```bash=
# The corresponding version cannot be obtained by running the **wget** command because all affected versions have been fixed.
git clone https://gitlab.com/qemu-project/qemu.git;cd qemu
git checkout stable-2.10
# Obtain the author of the patch from the mailing list and find the corresponding commit.
git log --author=Hajnoczi
git reset --hard=4da97120d51a4383aa96d741a2b837f8c4bbcd0b
# Start building.
mkdir build;cd build;../configure ----disable-werror
make qtest
```

Найденная в QEMU уязвимость VM escape включена в список стандартных уязвимостей, проработанных на соревнованиях в области информационной безопасности Capture the Flag (CTF), и базу данных общеизвестных уязвимостей информационной безопасности CVE ([CVE-2020-14364)](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-14364).

> Если вы заметили ошибку, напишите об этом здесь [cascades-sjtu](https://cascadeschen.cn).  