from django.db import models

# Create your models here.

#文件表
class File(models.Model):
  # 这是一个数据表配置,如字符串类型的name,日期类型的create_time等,上传下载就一张表够了
  name = models.CharField(null=True, blank=True, max_length=20)
  create_time = models.DateField(auto_now_add=True)
  size = models.IntegerField(default=0, blank=False, null=False)
  filetype = models.CharField(null=True, blank=True, max_length=20)
  user = models.CharField(null=True, blank=True, max_length=20)
  url = models.CharField(null=True, blank=True, max_length=100)
  def __int__(self):
    return self.id