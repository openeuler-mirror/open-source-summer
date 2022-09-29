from django.urls import path
from uploadApi import api

# uploadApi模块的路由
urlpatterns = [
    # 进一步根据匹配的路由调用相关函数,路由匹配是一层层的
    # 文件上传
    path('uploadfile/', api.fileSave),
    # 文件列表查询
    path('searchfilelist/', api.searchfilelist),
    # 文件删除
    path('deleteFile/', api.deleteFile)
]