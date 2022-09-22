#进行文件名称和文档链接的映射
'''
需要将文件名称与文件链接之间进行映射，因此此方法进行文件名称和文档链接之间的映射
其中需要传入两个参数：
path：存放文件名称和文件链接对应的excel文件，此excel文件第一行应为两个title,即fileName和path
filelist:保存文件名称（有些文件名称是经过处理的，因此需要将处理后的文件名称列表传入）的列表
返回的res即为返回对应的文件链接列表
'''
import os
import pandas as pd


def link_replace(path, filelist):
    data = pd.read_csv(path)
    res = []
    n = len(data['fileName'])
    m = len(filelist)
    for i in range(m):
        a = ' '
        for j in range(n):
            if filelist[i].lower() == data['fileName'][j].lower():
                res.append(data['path'][j])
                a = '1111'
        if a != '1111':
            print(filelist[i].lower(), data['fileName'][38].lower())
    return res



'''
index_name = 'r1.6'
path = 'D:\\File\\开源之夏\\资料\\ES-新\\MindSpore installation markdown files\\' + index_name + '\\cn\\'     #打开文件夹目录
fileList = os.listdir(path)          #保存各个文件名字
link_path = 'D:\\File\\开源之夏\\资料\\ES-新\\MindSpore installation markdown files\\' + index_name + '.xlsx'
res = link_replace(link_path, fileList)
print(fileList)
print(len(fileList))
print(res)
print(len(res))
'''

