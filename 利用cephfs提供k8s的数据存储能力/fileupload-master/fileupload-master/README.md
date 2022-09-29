# fileupload

#### 软件架构
front目录下为vue的前端项目，myDjango目录下为django的后端项目，vue打包后置入django项目内部，由django内的dockerfile文件构建docker-django镜像，以容器的形式挂在服务器中运行

#### 安装启动教程

##### 1.vue项目

```bash
cd front

# 需要安装node环境，个人开发环境为nodeV12.8.0
npm install
# 在开发环境下，前后端项目在不同端口运行，因此下载功能会无法正常使用
npm run dev
# vue打包,打包目录设置在django内，由django返回html
```

##### 2.django项目

```bash
cd myDjango

# python3.7环境下
pip install django==3.2.2
pip install django-cors-headers
pip3 install djangorestframework

python manage.py runserver 0.0.0.0:8000
```



#### 目录及文件简介

##### 1.vue部分

##### ![image-20220703233324619](https://irises-1309021317.cos.ap-shanghai.myqcloud.com/picgo/202207032333667.png)



```public```：放置html模板与网页头部小图标，可以无视

```api```: js（vue）前端与后端通信有第三方处理请求应答库——axios，这里进一步对axios进行了封装处理，具体接口配置格式参考文件夹内的 uploadfile.js 文件，需要新增接口可以类比新增；也可以新增一个js文件，在index.js中，与uploadfile.js以一样的方式引入

```assets```: 静态资源文件夹，该项目无静态资源文件，可以无视

```components```: 放置vue组件，该项目内共仨个，左侧导航栏，顶部面包屑导航栏，上传文件的弹窗组件。组件概念可以简单理解成零件。

```router```: 内含的一个文件为配置路由的文件，当前项目仅一个路由，因此内部配置文件夹内就写了一个配置项。（左侧导航栏有两个，当初为了测试用，第二个实际上没有配置路由，因此点了之后页面找不到）

```scss```: 样式文件夹，可以简单理解成css的进化版，用于设置各组件样式（大小、位置、颜色等等）

```views```: 与components文件夹类似，放置vue组件，但一般该文件夹放置视图组件，及一个页面所展示的入口视图，该项目内只有一个上传文件的视图，也即FileUpload.vue

```App.vue```: vue组件的入口，是页面的最底层。

```main.js```: 打包构建入口文件，引入全局组件、设置全局配置等等。

```babel.config.js```: babel库的配置文件，用于解析编译js语言等，你可以无视。

```package-lock.json```：当前项目本地所安装的依赖及其版本信息，可以无视

```package.json```: node服务信息文件，内含npm命令、当前项目的相关依赖等信息，可以无视

```vue.config.js```: vue项目打包构建的配置信息，可以无视

##### 2.django部分

##### ![image-20220703235138503](https://irises-1309021317.cos.ap-shanghai.myqcloud.com/picgo/202207032351608.png)

```dist```: vue打包后所存放的打包文件(html,css,js)，给django提供模板

```myDjango```：项目文件夹，内含整个项目的配置文件

```asgi.py与wsgi.py```：django的通信相关处理文件

```setting.py```：django的总体配置文件，内含中间件，数据库，跨域等大量配置信息

```urls.py```: django的路由文件，用于路由分发或处理

```upload```： 放上传文件的文件夹

```uploadApi```：子模块（应用）文件夹，当前项目就一个上传下载的模块。

```admin.py```： 用于注册models中的表数据模型

```api_url.py```： 子模块路由分发与处理，通常处理该模块路由所匹配到的接口请求。

```api.py```：子模块中每个路由所对应到的具体处理方法

```models.py```：创建表数据模型

```test.py```：可以无视

```views.py```：由于视图已由vue打包完成，不是传统的MVC模式，不需要后端进行渲染处理，因此可以无视。

```db.sqlite3```：简化工作复杂度，使用了sqlite数据库，该为其数据库文件，处理该单一表数据存储应该够了。（不是很确定k8s进行容器编排后，数据库需要怎样的维护方式，如果不行的话后期可以转mysql之类的，数据库仅存了文件的相关信息用于展示索引等）

```dockerfile```：用于在服务器内构建进行进行容器化部署

```manage.py```： django启动管理入口文件，需要使用他进行管理django



#### 部署相关

咱这个需要部署到容器内部，因此我这边为了方便编写了一个dockerfile用于构建docker镜像，只需要在服务器上使用该文件构建镜像，接着运行容器即可。（后期可能会加一个docker-compose.yml方便管理容器，每次启动需要手写参数十分麻烦，心智负担太重）

```dockerfile
# dockerfile
FROM python:3.7 #拉取python3.7的镜像

RUN mkdir -p /var/www/upload/django # 创建对应的工作区文件夹，用于放置该项目

WORKDIR /var/www/upload/django # 设置工作区
COPY . /var/www/upload/django # 复制当前文件夹内所有文件之容器内的目标文件夹

# 更新pip并安装相关依赖
RUN python -m pip install --upgrade pip \
    && pip install django==3.2.2 \
    && pip install django-cors-headers \
    && pip3 install djangorestframework

# 暴露8000端口
EXPOSE 8000

# 图片文件夹与数据库内容卷挂载
VOLUME ["/var/www/upload/django/upload"]
VOLUME ["/var/www/upload/django/db.sqlite3"]

# 执行命令 python manage.py runserver 0.0.0.0:8000以启动django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

```bash
# 1.构建镜像,在dockerfile所在文件夹内
docker build -t docker-django:1.0 ./ # docker-django为命名的镜像名,后为镜像版本号

# 2.创建并启动容器
docker run -p 5000:8000 --name upload -d docker-django:1.0

# 注意点
1. -p 参数后跟随的为端口映射，上述含义为服务器5000端口映射至容器内8000端口，因为我服务器内部署有其他服务，默认的80端口被占用，若80端口没有被其他服务占用，可以部署至80端口。
2. -v 参数后跟随的为卷挂载，服务器内的/etc/docker/upload/fileupload与容器内的/var/www/upload/django的资源共享，简单来讲就是两边对应的文件夹内的文件保持一致，也就是说容器内部产生的数据存储可以转移到了容器外，而容器外改写代码，也将会影响到容器内（不过一般都只有数据挂载或者日志挂载）
3. --name 给容器命名upload

# 3.创建挂载文件夹(初次创建容器时由于宿主机没有对应的文件，若直接挂载会导致容器内文件被覆盖为空，因此需要拷贝出容器内文件，未来当这些文件存在了之后，可以直接跳至第六步)
mkdir -p /var/djangodata/db
docker cp upload:/var/www/upload/django/db.sqlite3 /var/djangodata/db # 拷贝容器中的数据库文件
docker cp upload:/var/www/upload/django/upload /var/djangodata

# 4.停止容器
docker stop upload

# 5.删除容器
docker rm upload

# 6.重新启动容器
docker run -p 5000:8000 --name upload -v /var/djangodata/db/db.sqlite3:/var/www/upload/django/db.sqlite3 -v /var/djangodata/upload:/var/www/upload/django/upload -d docker-django:1.0

# 关于docker的一些命令
docker ps -a # 查看所有容器
docker image ls # 查看镜像列表
docker restart [containerid, containername] # 重启容器
docker rmi [imageid, imagename] # 删除镜像
docker stop [containerid, containername] # 停止容器
docker rm [containerid, containername] # 删除容器

docker exec -it [containerid, containername] bash # 进入容器内部
ctrl + p 加上 ctrl + q # 不停止退出容器
```

<img src="https://irises-1309021317.cos.ap-shanghai.myqcloud.com/picgo/202207040035509.png" alt="image-20220704003552430" style="zoom:150%;" />

上述图片那样，说明容器已运行，接着访问x.x.x.x:5000，若页面正常显示则说明服务正常启动，反之，进入容器内部

```bash
lsof -i :8000
# 查看8000端口占用情况，若未占用说明服务没起来，需要手动进入项目文件夹内，python manage.py runserver 0.0.0.0:8000启动，查看是否有异常情况

# 若提示lsof没有该命令，则需要手动安装
apt-get update # ubuntu与debian等linux系统是这个包管理器，centos与其他一些是yum，当然这个镜像是apt-get，可能会安装很慢，可以在这之前换一下安装源
apt-get install lsof
```



#### 其他

​        目前该项目基本功能已经实现了，容器部署也完成（但未用到docker-compose编排，可以用），前端vue部分存在一些开发的痕迹未清除，后续处理，但不影响。django部分以容器的形式运行着，个人感觉程序监控部分没则么做的很好，这方面经验有点不太够，可能需要后续配合容器输出日志文件等方式。

​        当前项目没有配置nginx，无法监控请求，也没有加上登录功能，在正常环境下是挺危险的，不过可能你就单纯给自己试验的，不会对外界开放，所以可能没事，所以功能上和环境搭建上做了简单的处理。

​        目前所需存储的应该主要就upload文件夹和数据库，我不是很清楚ceph分布式同时操作数据库会不会有问题，可能你会知道，不过暂时先这样把，有问题再处理就行，这部分就一个简单的前后端web应用。





