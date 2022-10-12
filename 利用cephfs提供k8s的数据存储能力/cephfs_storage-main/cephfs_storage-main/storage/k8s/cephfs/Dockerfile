FROM openeuler/openeuler
RUN yum install python3 -y
RUN yum install python-pip -y 
RUN pip3 install requests
COPY cephfs-provisioner /usr/local/bin/cephfs-provisioner
COPY cephfs_provisioner/cephfs_provisioner.py /usr/local/bin/cephfs_provisioner
RUN chmod -v o+x /usr/local/bin/cephfs_provisioner


