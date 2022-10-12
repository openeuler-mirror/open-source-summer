---
title: Установка GNOME 3.38 на ОС openEuler 21.09
date: 2021-10-12  
tags:  
    - GNOME  
archives: 2021-10  
author: dwl301  
summary: Принципы установки релиза GNOME 3.38 на операционной системе openEuler 21.09 и методы решения известных проблем.
---



# Установка GNOME 3.38 на ОС openEuler 21.09

GNOME — это среда рабочего стола для операционных систем подобных UNIX. Это официальная версия рабочего стола GNU Project, которая предоставляет универсальную, удобную и простую в использовании среду для разработки и использования приложений.  

В данном документе описывается метод установки среды рабочего стола GNOME как полного законченного решения на операционной системе openEuler 21.09.  

1\. Загрузка образа openEuler 21.09

```
# wget https://repo.openeuler.org/openEuler-21.09/ISO/x86_64/openEuler-21.09-x86_64-dvd.iso.sha256sum
# wget https://repo.openeuler.org/openEuler-21.09/ISO/x86_64/openEuler-21.09-x86_64-dvd.iso
# sha256sum -c openEuler-21.09-x86_64-dvd.iso.sha256sum
openEuler-21.09-x86_64-dvd.iso: OK
```

2\. Создание установочного носителя для ОС 

Предположим, нижеприведенный носитель **sdb** является устройством хранения USB. В этом случае необходимо выполнить команду **lsblk**, чтобы подтвердить данное устройство.

```
# dd if=./openEuler-21.09-x86_64-dvd.iso of=/dev/sdb
# sync
```

3\. Установка ОС 

Выполните загрузку операционной системы с устройства USB и установите ее в минимальном режиме. Убедитесь, что для установки GNOME 3.38 в корневом разделе доступно не менее 5 ГБ свободного места.

4\. Конфигурирование ОС и установка GNOME 3.38 

Установите источник Yum системы. Убедитесь, что в ваш файл **/etc/yum.repos.d/openEuler.repo** включены следующие адреса:

```
baseurl=http://repo.openeuler.org/openEuler-21.09/everything/x86_64/
baseurl=http://repo.openeuler.org/openEuler-21.09/EPOL/main/x86_64/
```

Обновите кэш Yum.

```
# yum clean all
# yum makecache
```

Установите пакеты со шрифтами.

```
# yum install -y dejavu-fonts liberation-fonts gnu-*-fonts wqy-*-fonts cjkuni-ukai-fonts
```

Если используется высокоскоростное сетевое соединение, добавьте в вышеприведенную команду **google-\*-fonts**, чтобы установить тяжелые пакеты со шрифтами Google. В противном случае добавлять **google-\*-fonts** не нужно.

Установите зависимости X Server.

```
# yum install -y xorg-*
```

Установите зависимости GNOME 3.38.

```
# yum install -y adwaita-icon-theme atk atkmm at-spi2-atk at-spi2-core baobab abattis-cantarell-fonts cheese clutter clutter-gst3 clutter-gtk cogl dconf dconf-editor devhelp eog epiphany evince evolution-data-server file-roller folks gcab gcr gdk-pixbuf2 gdm gedit geocode-glib gfbgraph gjs glib2 glibmm24 glib-networking gmime30 gnome-autoar gnome-backgrounds gnome-bluetooth gnome-boxes gnome-builder gnome-calculator gnome-calendar gnome-characters gnome-clocks gnome-color-manager gnome-contacts gnome-control-center gnome-desktop3 gnome-disk-utility gnome-font-viewer gnome-getting-started-docs gnome-initial-setup gnome-keyring gnome-logs gnome-menus gnome-music gnome-online-accounts gnome-online-miners gnome-photos gnome-remote-desktop gnome-screenshot gnome-session gnome-settings-daemon gnome-shell gnome-shell-extensions gnome-software gnome-system-monitor gnome-terminal gnome-tour gnome-user-docs gnome-user-share gnome-video-effects gnome-weather gobject-introspection gom grilo grilo-plugins gsettings-desktop-schemas gsound gspell gssdp gtk3 gtk4 gtk-doc gtkmm30 gtksourceview4 gtk-vnc2 gupnp gupnp-av gupnp-dlna gvfs json-glib libchamplain libdazzle libgdata libgee libgnomekbd libgsf libgtop2 libgweather libgxps libhandy libmediaart libnma libnotify libpeas librsvg2 libsecret libsigc++20 libsoup mm-common mutter nautilus orca pango pangomm libphodav python3-pyatspi python3-gobject rest rygel simple-scan sushi sysprof tepl totem totem-pl-parser tracker3 tracker3-miners vala vte291 yelp yelp-tools yelp-xsl zenity
```

Запустите GNOME 3.38 с помощью экранного менеджера GNOME Display Manager.

```
# systemctl start gdm
```

Активируйте окно входа на рабочий стол по умолчанию при запуске системы.

```
# systemctl enable gdm
# systemctl set-default graphical.target
```

5\. Исправление известных проблем 

5.1 Сбой воспроизведения видео

Нет декодера. Вручную скомпилируйте и установите декодер.

```
# yum install rpm-build git ffmpeg-devel
# git clone https://gitee.com/src-openeuler/gstreamer1-libav.git
# mkdir -p ~/rpmbuild/SOURCES
# cp gstreamer1-libav/* /root/rpmbuild/SOURCES/
# rpmbuild -ba /root/rpmbuild/SOURCES/gstreamer1-libav.spec
# yum install -y /root/rpmbuild/RPMS/x86_64/gstreamer1-libav-1.18.4-1.x86_64.rpm
```

Убедитесь, что каждая команда выполняется корректно, ошибки не возникают.

5.2 Сбой создания ВМ в среде GNOME с помощью локального файла ISO 

Некорректный тип центрального процессора виртуальной машины, работающей в версии QEMU, которая установлена по умолчанию. Обновите GNOME Boxes до версии:

```
# rpm -Uvh http://119.3.219.20:82/openEuler:/Mainline/standard_x86_64/x86_64/gnome-boxes-3.38.2-3.oe1.x86_64.rpm
```

Повторно скомпилируйте QEMU. В установленной по умолчанию версии QEMU отключена опция smartcard. Добавьте опцию `--enable-smartcard` в команду **configure** и повторно скомпилируйте QEMU.

```
# wget https://repo.openeuler.org/openEuler-21.09/source/Packages/qemu-4.1.0-82.oe1.src.rpm
# rpm -ivh qemu-4.1.0-82.oe1.src.rpm

Modify the ~/rpmbuild/SPECS/qemu.spec file as follows:
# diff -Nur ~/rpmbuild/SPECS/qemu.spec.bak ~/rpmbuild/SPECS/qemu.spec
--- /root/rpmbuild/SPECS/qemu.spec.bak	2021-10-12 14:30:30.300362506 +0800
+++ /root/rpmbuild/SPECS/qemu.spec	2021-10-12 14:37:14.140967049 +0800
@@ -1,6 +1,6 @@
 Name: qemu
 Version: 4.1.0
-Release: 82
+Release: 83
 Epoch: 2
 Summary: QEMU is a generic and open source machine emulator and virtualizer
 License: GPLv2 and BSD and MIT and CC-BY-SA-4.0
@@ -750,7 +750,7 @@
     --disable-parallels \
     --disable-sheepdog \
     --disable-capstone \
-    --disable-smartcard \
+    --enable-smartcard \
     --enable-zstd

 make %{?_smp_mflags} $buildldflags V=1
@@ -963,6 +963,9 @@
 %endif

 %changelog
+* Tue Oct 12 2021 Wenlong Ding <wenlong.ding@turbolinux.com.cn>
+- Open build option: --enable-smartcard
+
 * Sun Sep 26 2021 Chen Qun <kuhn.chenqun@huawei.com>
 - virtio-net: fix use after unmap/free for sg

```

Установите зависимости для компиляции QEMU, повторно скомпилируйте и обновите QEMU.

```
# yum install -y bison brlapi-devel chrpath device-mapper-multipath-devel flex gnutls-devel libaio-devel libattr-devel libcap-devel libcap-ng-devel libcurl-devel libiscsi-devel librbd-devel libseccomp-devel libssh-devel libtasn1-devel lzo-devel ncurses-devel numactl-devel pam-devel python-sphinx python3-devel rdma-core-devel snappy-devel spice-server-devel texinfo zstd-devel
# rpmbuild -ba /root/rpmbuild/SPECS/qemu.spec
# rpm -Uvh ~/rpmbuild/RPMS/x86_64/qemu-*.rpm
```

Завершив обновление, перезапустите хост-систему. После повторного входа на хост будут доступны операции создания и запуска виртуальных машин с помощью gnome-boxes.

5.3 Сбой запуска ВМ с помощью GNOME Boxes обычными пользователями 

Пользователи с обычным набором прав не добавлены автоматически в группы `kvm` и `libvirt`, поэтому виртуальные машины могут работать только как эмуляторы QEMU. По этой причине такие пользователи не могут запускать виртуальные машины, используя GNOME Boxes. Для добавления обычных пользователей к упомянутым группам выполните следующие команды, после чего ВМ смогут работать в режиме паравиртуализации KVM, который повышает эффективность.

```
# usermod -aG kvm test
# usermod -aG libvirt test
# id test
uid=1000(test) gid=1000(test) groups=1000(test),10(wheel),36(kvm),985(libvirt)
```

Добавив обычных пользователей к группам `kvm` и `libvirt`, перезапустите систему, чтобы настройки вступили в силу.