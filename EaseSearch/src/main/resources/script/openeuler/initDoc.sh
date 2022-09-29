#!/bin/bash
if [ -d "/usr/local/docs" ]; then
  rm -rf /usr/local/docs/source/*
  rm -rf /usr/local/docs/target/*
fi

npm i pnpm -g

mkdir -p /usr/local/docs/source/
mkdir -p /usr/local/docs/target/zh/
mkdir -p /usr/local/docs/target/en/
mkdir -p /usr/local/docs/target/ru/

# shellcheck disable=SC2164
cd /usr/local/docs/source
git clone https://gitee.com/openeuler/openEuler-portal.git
# shellcheck disable=SC2164
cd ./openEuler-portal
pnpm install
pnpm build



cp -r /usr/local/docs/source/openEuler-portal/app/.vitepress/dist/zh /usr/local/docs/target/
cp -r /usr/local/docs/source/openEuler-portal/app/.vitepress/dist/en /usr/local/docs/target/
cp -r /usr/local/docs/source/openEuler-portal/app/.vitepress/dist/ru /usr/local/docs/target/


rm -rf /usr/local/docs/target/zh/blog
cp -r /usr/local/docs/source/openEuler-portal/app/zh/blog /usr/local/docs/target/zh/
rm -rf /usr/local/docs/target/zh/news
cp -r /usr/local/docs/source/openEuler-portal/app/zh/news /usr/local/docs/target/zh/
rm -rf /usr/local/docs/target/zh/showcase
cp -r /usr/local/docs/source/openEuler-portal/app/zh/showcase /usr/local/docs/target/zh/
cp /usr/local/docs/source/openEuler-portal/app/.vitepress/dist/zh/showcase/index.html /usr/local/docs/target/zh/showcase/
rm -rf /usr/local/docs/target/zh/migration
cp -r /usr/local/docs/source/openEuler-portal/app/zh/migration /usr/local/docs/target/zh/


rm -rf /usr/local/docs/target/en/blog
cp -r /usr/local/docs/source/openEuler-portal/app/en/blog /usr/local/docs/target/en/
rm -rf /usr/local/docs/target/en/news
cp -r /usr/local/docs/source/openEuler-portal/app/en/news /usr/local/docs/target/en/
rm -rf /usr/local/docs/target/en/showcase
cp -r /usr/local/docs/source/openEuler-portal/app/en/showcase /usr/local/docs/target/en/
cp /usr/local/docs/source/openEuler-portal/app/.vitepress/dist/en/showcase/index.html /usr/local/docs/target/en/showcase/
rm -rf /usr/local/docs/target/en/migration
cp -r /usr/local/docs/source/openEuler-portal/app/zh/migration /usr/local/docs/target/zh/

rm -rf /usr/local/docs/target/ru/blog
cp -r /usr/local/docs/source/openEuler-portal/app/ru/blog /usr/local/docs/target/ru/
rm -rf /usr/local/docs/target/ru/news
cp -r /usr/local/docs/source/openEuler-portal/app/ru/news /usr/local/docs/target/ru/
rm -rf /usr/local/docs/target/ru/showcase
cp -r /usr/local/docs/source/openEuler-portal/app/ru/showcase /usr/local/docs/target/ru/
cp /usr/local/docs/source/openEuler-portal/app/.vitepress/dist/ru/showcase/index.html /usr/local/docs/target/ru/showcase/
rm -rf /usr/local/docs/target/ru/migration
cp -r /usr/local/docs/source/openEuler-portal/app/zh/migration /usr/local/docs/target/zh/


# shellcheck disable=SC2164
cd /usr/local/docs/source

git clone https://gitee.com/openeuler/docs.git

# shellcheck disable=SC2164
cd ./docs
for r in $(git branch -r --list "origin/stable2-*")
do
  b=${r##*origin/stable2-}
  git checkout -b $b $r
  mkdir -p /usr/local/docs/target/zh/docs/$b/docs
  mkdir -p /usr/local/docs/target/en/docs/$b/docs
  cp -r /usr/local/docs/source/docs/docs/zh/docs/* /usr/local/docs/target/zh/docs/$b/docs/
  cp -r /usr/local/docs/source/docs/docs/en/docs/* /usr/local/docs/target/en/docs/$b/docs/
done












