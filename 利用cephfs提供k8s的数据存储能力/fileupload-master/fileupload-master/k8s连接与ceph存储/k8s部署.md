### 1.配置私有仓库

我已将代码上传至个人阿里云镜像仓库，配置镜像仓库

```bash
kubectl create secret docker-registry django-upload-secret --docker-server=registry.cn-hangzhou.aliyuncs.com/irises/django-upload --docker-username=imagePull@1993119420270967.onaliyun.com --docker-password=lz6060788 -n default
```

参数含义：

- django-upload-secret：指定密钥的键名称，自定义
- docker-server： 指定docker仓库地址
- docker-username：指定docker仓库账号
- docker-password：指定docker仓库密码
- n:  命名空间



### 2.修改deployment，在spec下与containers同级，添加

已添加至yaml中

```yaml
imagePullSecrets:
- name: django-upload-secret
```



### 3.创建pod

```bash
# 通过yaml创建pod
kubectl create -f django-upload.yaml

# 创建services，暴露服务
kubectl expose deployment django-upload --port=8000 --type=NodePort
```

