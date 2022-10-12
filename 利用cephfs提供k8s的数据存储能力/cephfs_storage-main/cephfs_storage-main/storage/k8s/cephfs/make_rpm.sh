#!/usr/bin/env bash
version=$1
if [[ -z $version ]];then
  version="0.18.1"
fi
cur_path=$(pwd)
top_dir=$(rpm --eval "%{_topdir}")
cd $cur_path
is_x86=`(uname -i)`
if [[ $is_x86 == "x86_64" ]];then
  pkg_name="/cephfs-provisioner-"$version"-0.x86_64"
else
  pkg_name="/cephfs-provisioner-"$version"-0.aarch64"
fi
build_root_path="/BUILDROOT"
rm -rf $top_dir$build_root_path$pkg_name
mkdir -p $top_dir$build_root_path$pkg_name"/usr/local/bin/cephfs-provisioner"
mkdir -p $top_dir$build_root_path$pkg_name"/usr/lib/systemd/system"
cp cephfs-provisioner $top_dir$build_root_path$pkg_name"/usr/local/bin/cephfs-provisioner"
cp -r cephfs_provisioner $top_dir$build_root_path$pkg_name"/usr/local/bin/cephfs-provisioner"
cp cephfs-provisioner.service $top_dir$build_root_path$pkg_name"/usr/lib/systemd/system"
sed "s#{version}#$version#g" cephfs-provisioner.ba.spec > cephfs-provisioner.spec
rpmbuild -ba cephfs-provisioner.spec
echo "success...."