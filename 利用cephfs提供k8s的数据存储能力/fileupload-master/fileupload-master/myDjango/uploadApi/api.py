from distutils.log import error
from tkinter import E
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework.authtoken.models import Token
# from django.contrib.auth.hashers import check_password,make_password
# from django.contrib.auth.models import User
from uploadApi.models import File
from myDjango.settings import BASE_DIR
import os

# hosturl = "https://api.theirises.cn/"
# hosturl = "http://127.0.0.1:9000/"

#文件上传保存
# 装饰器标明接口需要post方法
@api_view(['POST'])
def fileSave(request):
    try:
        # 获取请求中包含的文件,文件名等信息
        f = request.FILES.get('file')
        name = request.POST['name']
        size = request.POST['size']
        uid = request.POST['uid']
        filetype = name.split('.')[1] or 'unkown'
        # 写入本地upload文件夹
        destination = open(os.path.join("./upload", name), 'wb+')
        for chunk in f.chunks():
            destination.write(chunk)
        destination.close()
        # 数据库中记录这文件信息
        newFileObj = File.objects.create(name=name, 
        size=size, filetype=filetype, url=os.path.join('/upload', name).replace('\\', '/'))
        newFileObj.save()
        # 返回应答
        return Response({
            'error_code': 0,
            'error_msg': '保存完毕',
            'data': {
                'uid': uid
            }
        })
    except Exception as e:
        # 异常处理应答
        return Response({
            'error_code': -1,
            'error_msg': e,
            'data': {
                'uid': uid
            }
        })



#文件搜索
@api_view(['GET'])
def searchfilelist(request):
    try:
        # 获取所有文件
        filelist = File.objects.all()
        # 构造所需要返回的数据数组
        filelist_data = []
        for f in filelist:
            f_item = {
                'name':f.name,
                'size':f.size,
                'filetype':f.filetype,
                'create_time':f.create_time,
                'url': f.url,
                'id':f.id
            }
            filelist_data.append(f_item)
        print(filelist_data)
        # 返回应答
        return Response({
            'error_code': 0,
            'error_msg': '搜索成功',
            'data': {
                'filelist': filelist_data,
            }
        })
    except Exception as e:
        return Response({
            'error_code': -1,
            'error_msg': e,
            'data': {
            }
        })

#文件删除
@api_view(['GET'])
def deleteFile(request):
    try:
        id = request.GET.get('id')
        fileObj = File.objects.get(id=id)
        # 根据请求携带的id,找到对应的文件进行删除
        path = fileObj.url.split('/')[-1:]
        path = os.path.join('upload', path[0]).replace('\\', '/')
        # path = os.path.join(base_dir, fileObj.url[1:])
        print(path)
        os.remove(path)
        # 删除数据库中对应的记录
        fileObj.delete()
        return Response({
            'error_code': 0,
            'error_msg': '删除成功',
            'data': {
                'id': id
            }
        })
    except Exception as e:
        return Response({
            'error_code': -1,
            'error_msg': e,
            'data': {
                'id': id
            }
        })



