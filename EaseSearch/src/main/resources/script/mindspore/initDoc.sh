#!/bin/sh
if [ -d "/usr/local/docs" ]; then
  rm -rf /usr/local/docs/source/*
  rm -rf /usr/local/docs/target/*
fi
mkdir -p /usr/local/docs/source/
mkdir -p /usr/local/docs/target/zh/
mkdir -p /usr/local/docs/target/en/


# shellcheck disable=SC2164
cd /usr/local/docs/source
git clone https://gitee.com/mindspore/mindspore.github.io.git

mkdir -p /usr/local/docs/target/zh/install/




mkdir -p /usr/local/docs/target/zh/tutorial/
cp -r ./webapp/public/tutorials/zh-CN/* ../target/zh/tutorial/zh-CN/
cp -r ./webapp/public/tutorials/application/zh-CN/* ../target/zh/tutorial/application/zh-CN/
cp -r ./webapp/public/tutorials/experts/zh-CN/* ../target/zh/tutorial/experts/zh-CN/


mkdir -p /usr/local/docs/target/zh/api/
mkdir -p /usr/local/docs/target/zh/docs/
cp -r ./webapp/public/docs/zh-CN/* ../target/docs/zh-CN/*









mkdir -p /usr/local/docs/target/en/install/
mkdir -p /usr/local/docs/target/en/tutorial/
cp -r ./webapp/public/tutorials/en/* ../target/en/tutorial/en/
cp -r ./webapp/public/tutorials/application/en/* ../target/en/tutorial/application/en/
cp -r ./webapp/public/tutorials/experts/en/* ../target/en/tutorial/experts/en/
mkdir -p /usr/local/docs/target/en/api/
mkdir -p /usr/local/docs/target/en/docs/