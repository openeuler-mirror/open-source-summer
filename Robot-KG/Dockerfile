FROM python:3.8
  
RUN apt-get update
RUN apt-get install vim --yes
#RUN cat /proc/version

WORKDIR /kg

COPY . .

# 安装环境
RUN pip install -r requirements.txt --no-cache-dir
RUN cd Model_train_predict && python setup.py install && python setup.py develop
