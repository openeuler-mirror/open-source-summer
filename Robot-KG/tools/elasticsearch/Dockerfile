FROM docker.elastic.co/elasticsearch/elasticsearch:7.14.0

# 安装wget命令
RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
RUN yum makecache
RUN yum update -y
RUN yum -y install wget

# 安装ik分词器
RUN mkdir /usr/share/elasticsearch/plugins/ik
WORKDIR /usr/share/elasticsearch/plugins/ik
RUN wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.14.0/elasticsearch-analysis-ik-7.14.0.zip
RUN unzip elasticsearch-analysis-ik-7.14.0.zip
RUN rm elasticsearch-analysis-ik-7.14.0.zip
WORKDIR /usr/share/elasticsearch