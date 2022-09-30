FROM node:alpine as Builder

MAINTAINER zhangxiaopan<zhangxiaopan2@huawei.com>

RUN mkdir -p /home/openeuler/web
WORKDIR /home/openeuler/web
COPY . /home/openeuler/web

RUN rm -rf ./docs/ru
RUN cp ./docs/.vuepress/config.zh.js ./docs/.vuepress/config.js

RUN npm install

RUN mv /home/openeuler/web/script/update-build-script.js /home/openeuler/web/node_modules/@vuepress/core/lib/node/build/index.js
RUN mv /home/openeuler/web/script/add-worker-script.js /home/openeuler/web/node_modules/@vuepress/core/lib/node/build/worker.js
RUN node --openssl-legacy-provider --max_old_space_size=9216 /home/openeuler/web/node_modules/vuepress/cli.js build docs

FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/nginx:1.16.1-20.03-lts-sp2

COPY --from=Builder /home/openeuler/web/docs/.vuepress/dist/ /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf

ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]


