"""myDjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from uploadApi import api_url
from django.views.static import serve
from myDjango.settings import MEDIA_ROOT

urlpatterns = [
    # 啥都没,返回html
    path('', TemplateView.as_view(template_name='index.html')),
    # admin,返回后台管理页(django自带的)
    path('admin/', admin.site.urls),
    # api则根据api_url处理
    path('api/', include(api_url)),
    # upload则上传文件
    path('upload/',  serve, {"document_root":MEDIA_ROOT}),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
