# 基于openEuler22.03安装ceph
## 1.环境准备

### 1.设置节点名称

| IP            | 作用               |
| :------------ | :----------------- |
| 192.168.31.20 | ceph01、NTP Server |
| 192.168.31.21 | ceph02             |
| 192.168.31.22 | ceph03             |

主机名需要和host设置相同，必须设置否则无法初始化，后续也有问题！

### 2.ceph01添加NTP服务器

```
yum install -y ntp
systemctl start ntpd
systemctl enable ntpd
timedatectl set-timezone Asia/Shanghai 
timedatectl set-local-rtc 0  
systemctl restart rsyslog 
systemctl restart crond 
ntpq -pn    
vim /etc/ntp.conf 
server  192.168.31.20  iburst
systemctl restart ntpd

在ntp_agent节点添加定时同步任务
crontab -e*/5 * * * *  /usr/sbin/ntpdate 192.168.31.20
```

### 3.免密操作

添加host (所有节点)

```
cat >>/etc/hosts <<EOF
192.168.31.20  ceph-01
192.168.31.21  ceph-02
192.168.31.22  ceph-03
EOF
```

ceph01 设置免密

```
ssh-keygen -t rsa -P "" -f /root/.ssh/id_rsa
for i in ceph-01 ceph-02 ceph-03 ;do
expect -c "
spawn ssh-copy-id -i /root/.ssh/id_rsa.pub root@$i        
      expect {                
      		"*yes/no*" {send "yesr"; exp_continue}                			   "*password*" {send "123456r"; exp_continue}                      "*Password*" {send "123456r";}        
      } "
done 
#123456为密码
```

### 4.关闭防火墙

所有节点关闭防火墙selinux

```
systemctl stop firewalld
systemctl disable firewalld
iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat
iptables -P FORWARD ACCEPT
setenforce 0
sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config
```

所有工作完成后建议所有节点重启一下服务器

```
reboot
```

## 2.安装

1.安装ceph

~~~absh
yum install ceph ceph-radosgw
~~~

2.安装ceph-deploy

~~~bash
安装： https://mirrors.aliyun.com/ceph/rpm-luminous/el7/noarch/
适配：
rpm -ivh python3-ceph-deploy-2.1.0-1.noarch.rpm --nodeps
cp /usr/lib/python3.6/site-packages/ceph_deploy /usr/lib/python3.9/site-packages/ -r
vim /usr/lib/python3.9/site-packages/osd.py +375 屏蔽下面的内容 
# line=line.decode("utf-8")
~~~

## 3.部署

~~~bash
1.部署集群
ceph-deploy new ceph-01 ceph-02 ceph-03
ceph-deploy --overwrite-conf mon create-initial
ceph-deploy mgr create ceph-01 ceph-02 ceph-03

2.部署mgr
ceph mgr module enable dashboard 
ceph dashboard create-self-signed-cert
ceph dashboard set-login-credentials admin abc@123

3.部署osd
ceph-deploy disk zap ceph-01 /dev/sdd
ceph-deploy osd create ceph-01 --data /dev/sdb

4.部署mds
ceph-deploy mds create ceph-01 ceph-02 ceph-03
~~~

## 4.异常解决

1.ceph -s 出现mon is allowing insecure global_id reclaim的警告
 	ceph config set mon auth_allow_insecure_global_id_reclaim false

2.OSD(s) have broken BlueStore compression

 	参考：https://gitee.com/src-openeuler/ceph/issues/I5D4PW

3.osd pg显示100% pg inactive.

​     参考：https://www.cnblogs.com/boshen-hzb/p/13305560.html

