---
title: Installing GNOME 3.38 on openEuler 21.09
date: 2021-10-12
tags:
    - GNOME
archives: 2021-10
author: dwl301
summary: Just about how to install GNOME 3.38 on openEuler 21.09 and resolve known issues.
---

# Installing GNOME 3.38 on openEuler 21.09

GNOME is a desktop environment for Unix-like operating systems. It is the official desktop of GNU Project, providing a comprehensive, easy-to-use, and user-friendly environment for developing and using applications.

This document describes how to install a complete GNOME desktop environment on openEuler 21.09.

## 1. Downloading the openEuler 21.09 Image

```
# wget https://repo.openeuler.org/openEuler-21.09/ISO/x86_64/openEuler-21.09-x86_64-dvd.iso.sha256sum
# wget https://repo.openeuler.org/openEuler-21.09/ISO/x86_64/openEuler-21.09-x86_64-dvd.iso
# sha256sum -c openEuler-21.09-x86_64-dvd.iso.sha256sum
openEuler-21.09-x86_64-dvd.iso: OK
```

## 2. Making an OS Installation Medium  
Assume that the following **sdb** is a USB storage device. In this case, run the **lsblk** command to confirm the device.  

```
# dd if=./openEuler-21.09-x86_64-dvd.iso of=/dev/sdb
# sync
```

## 3. Installing the OS  
Boot the OS from your USB device and install the OS in the minimum installation mode.  
Then ensure a minimum 5 GB available space for the root partition to install GNOME 3.38.  

## 4. Configuring the OS and Installing GNOME 3.38  
Set the system Yum source.  
Ensure that the following addresses are included in your **/etc/yum.repos.d/openEuler.repo** file:  

```
baseurl=http://repo.openeuler.org/openEuler-21.09/everything/x86_64/
baseurl=http://repo.openeuler.org/openEuler-21.09/EPOL/main/x86_64/
```

Refresh the Yum cache.  
```
# yum clean all
# yum makecache
```

Install font packages.  
```
# yum install -y dejavu-fonts liberation-fonts gnu-*-fonts wqy-*-fonts cjkuni-ukai-fonts  
```
If you use a high-speed network, add **google-\*-fonts** in the preceding command to install the large Google font packages; otherwise, do not add **google-\*-fonts**.  

Install X Server dependencies.  
```
# yum install -y xorg-*
```

Install GNOME 3.38 dependencies.  
```
# yum install -y adwaita-icon-theme atk atkmm at-spi2-atk at-spi2-core baobab abattis-cantarell-fonts cheese clutter clutter-gst3 clutter-gtk cogl dconf dconf-editor devhelp eog epiphany evince evolution-data-server file-roller folks gcab gcr gdk-pixbuf2 gdm gedit geocode-glib gfbgraph gjs glib2 glibmm24 glib-networking gmime30 gnome-autoar gnome-backgrounds gnome-bluetooth gnome-boxes gnome-builder gnome-calculator gnome-calendar gnome-characters gnome-clocks gnome-color-manager gnome-contacts gnome-control-center gnome-desktop3 gnome-disk-utility gnome-font-viewer gnome-getting-started-docs gnome-initial-setup gnome-keyring gnome-logs gnome-menus gnome-music gnome-online-accounts gnome-online-miners gnome-photos gnome-remote-desktop gnome-screenshot gnome-session gnome-settings-daemon gnome-shell gnome-shell-extensions gnome-software gnome-system-monitor gnome-terminal gnome-tour gnome-user-docs gnome-user-share gnome-video-effects gnome-weather gobject-introspection gom grilo grilo-plugins gsettings-desktop-schemas gsound gspell gssdp gtk3 gtk4 gtk-doc gtkmm30 gtksourceview4 gtk-vnc2 gupnp gupnp-av gupnp-dlna gvfs json-glib libchamplain libdazzle libgdata libgee libgnomekbd libgsf libgtop2 libgweather libgxps libhandy libmediaart libnma libnotify libpeas librsvg2 libsecret libsigc++20 libsoup mm-common mutter nautilus orca pango pangomm libphodav python3-pyatspi python3-gobject rest rygel simple-scan sushi sysprof tepl totem totem-pl-parser tracker3 tracker3-miners vala vte291 yelp yelp-tools yelp-xsl zenity
```

Start GNOME 3.38 using the GNOME Display Manager.  
```
# systemctl start gdm
```

Enable the default desktop login upon system start.  
```
# systemctl enable gdm
# systemctl set-default graphical.target
```

## 5. Fixing Known Issues  
### 5.1 Failed to Play Videos  
The decoder is missing. Manually compile and install the decoder.  
```
# yum install rpm-build git ffmpeg-devel
# git clone https://gitee.com/src-openeuler/gstreamer1-libav.git
# mkdir -p ~/rpmbuild/SOURCES
# cp gstreamer1-libav/* /root/rpmbuild/SOURCES/
# rpmbuild -ba /root/rpmbuild/SOURCES/gstreamer1-libav.spec
# yum install -y /root/rpmbuild/RPMS/x86_64/gstreamer1-libav-1.18.4-1.x86_64.rpm
```
Ensure that each command is executed properly and no error is reported.  

### 5.2 Failed to Create a VM by GNOME Boxes Using a Local ISO File  
The CPU type of the VM running in the default QEMU version is incorrect. Upgrade GNOME Boxes to the following version:  

```
# rpm -Uvh http://119.3.219.20:82/openEuler:/Mainline/standard_x86_64/x86_64/gnome-boxes-3.38.2-3.oe1.x86_64.rpm
```

Recompile QEMU. The smartcard option is disabled for the QEMU version installed by default. Add the `--enable-smartcard ` option to the **configure** command and recompile QEMU.  
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

Install the QEMU compilation dependencies, and recompile and upgrade QEMU.  
```
# yum install -y bison brlapi-devel chrpath device-mapper-multipath-devel flex gnutls-devel libaio-devel libattr-devel libcap-devel libcap-ng-devel libcurl-devel libiscsi-devel librbd-devel libseccomp-devel libssh-devel libtasn1-devel lzo-devel ncurses-devel numactl-devel pam-devel python-sphinx python3-devel rdma-core-devel snappy-devel spice-server-devel texinfo zstd-devel
# rpmbuild -ba /root/rpmbuild/SPECS/qemu.spec
# rpm -Uvh ~/rpmbuild/RPMS/x86_64/qemu-*.rpm
```
After the upgrade is complete, restart the host. After logging in to the host again, you can create and run VMs using gnome-boxes.  

### 5.3 Inefficiency for Common Users to Run VMs Using GNOME Boxes  
Common users are not automatically added to the `kvm` and `libvirt` groups, and VMs can only run as QEMU emulators. This makes it inefficient for common users to run VMs using GNOME Boxes.  
Run the following commands to add common users to the two groups so that VMs can run in KVM paravirtualization mode to improve the VM running efficiency.  
```
# usermod -aG kvm test
# usermod -aG libvirt test
# id test
uid=1000(test) gid=1000(test) groups=1000(test),10(wheel),36(kvm),985(libvirt)
```

After a common user is added to the `kvm` and `libvirt` groups, restart the system for the configuration to take effect.  
