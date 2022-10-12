#!/bin/bash
if [ -d "/usr/local/docs" ]; then
  rm -rf /usr/local/docs/source/*
  rm -rf /usr/local/docs/target/*
fi
mkdir -p /usr/local/docs/source/
mkdir -p /usr/local/docs/target/zh/
mkdir -p /usr/local/docs/target/en/

# shellcheck disable=SC2164
cd /usr/local/docs/source
git clone https://gitee.com/opengauss/website.git
git clone https://gitee.com/opengauss/blog.git


mkdir -p /usr/local/docs/target/zh/events/
mkdir -p /usr/local/docs/target/zh/news/
mkdir -p /usr/local/docs/target/zh/post/
cp -r ./website/content/zh/events/* ../target/zh/events/
cp -r ./website/content/zh/news/* ../target/zh/news/
cp -r ./blog/content/zh/post/* ../target/zh/post/

mkdir -p /usr/local/docs/target/en/events/
mkdir -p /usr/local/docs/target/en/news/
mkdir -p /usr/local/docs/target/en/post/
cp -r ./website/content/en/events/* ../target/en/events/
cp -r ./website/content/en/news/* ../target/en/news/
cp -r ./blog/content/en/post/* ../target/en/post/



git clone https://gitee.com/opengauss/docs.git
cd ./docs

for r in $(git branch -r --list "origin/*"); do
  b=${r##*origin/}
 # shellcheck disable=SC2170
 # shellcheck disable=SC1073
 # shellcheck disable=SC1072
 # shellcheck disable=SC1020
 # shellcheck disable=SC1009
 if [[ "master" != $b ]] && [[ "website" != $b ]] && [[ "HEAD" != $b ]] && [[ "->" != $b ]]; then
    git checkout $b
    mkdir -p /usr/local/docs/target/zh/docs/$b/docs
    mkdir -p /usr/local/docs/target/en/docs/$b/docs
    cp -r ./content/zh/docs/* /usr/local/docs/target/zh/docs/$b/docs/
    cp -r ./content/en/docs/* /usr/local/docs/target/en/docs/$b/docs/
 fi
done



