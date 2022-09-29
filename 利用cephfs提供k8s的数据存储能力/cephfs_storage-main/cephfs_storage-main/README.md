#  README

本项目主要利用cephfs-privisioner调用mgr提供的相关api， 进行资源的创建，并为k8s提供cephfs后端存储。

deploy文件夹： 主要是k8s和ceph的安装，部署指导文档。
storage文件夹： 主要是修改k8s和ceph的调用方法和调用接口。
