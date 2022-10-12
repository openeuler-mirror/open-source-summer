# Readme

## 1.背景

​	dashboard主要是ceph的mgr组件下的模块，在这里主要是增加接口/cephfsapi/share进行创建文件夹的处理请求。

## 2.测试

可以执行python3 demo.py进行测试。

## 3.安装

~~~bash
cp -r dashboard /usr/share/ceph/mgr/
systemctl restart ceph-mgr@nodename
~~~

