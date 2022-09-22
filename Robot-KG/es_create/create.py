#r1.6和r1.7文档在Elasticsearch生成索引和json文件
'''
该文件通过读取指定位置的r1.6和r1.7相关文档进行在es中的索引创建和生成对应的json文件，在使用时通过修改index_name为r1.6或r1.7
进行r1.6文件夹或者r1.7文件夹的生成和创建，同时需要修改path为本地文件位置或者相对文件位置，link_path为保存的文件名字和文件链接对应的excel文件
生成：（1）对应elasticsearch库中生成index索引：r1.6、r1.7
（2）：生成r1.6.json和r1.7.json文件，后面可通过curl命令直接导入es
'''
import os
from test import write_json
from Index_create import index_create
from Link_replace import link_replace


def json_create():
        index_name = 'r1.6'
        path = 'D:\\File\\开源之夏\\资料\\ES-新\\MindSpore installation markdown files\\' + index_name + '\\cn\\'     #打开文件夹目录
        fileList = os.listdir(path)          #保存各个文件名字
        n = len(fileList)
        print(fileList)

        TypeList = []     #用于存储各个文本内容
        #利用excel文件替换链接进入PathList
        link_path = 'D:\\File\\开源之夏\\资料\\ES-新\\MindSpore installation markdown files\\' + index_name + '.xlsx'
        PathList = link_replace(link_path, fileList)     #用于存储各个文件的链接/路径
        ##################################
        for i in range(0, n):
            a = open(path + fileList[i], "r", encoding='utf-8')
            out = str(a.readlines())    #逐行读取文本
            str_out = ""
            for x in out:
                str_out += x           #将整个文本组成一个字符串
            TypeList.append(str_out)   #加入文本列表


        number = 1
        ju_1 = ''
        ju_2 = ''

        # print(ju_1)
        k = 0
        for x in TypeList:
            res_1 = ju_1 + str(fileList[k])   #构建文本id
            h1 = {"_index": index_name, "_id": res_1}
            h2 = {"index": h1}                #构建指引头部index
            print(res_1)
            #a = open(r"r1.6.json", "a", encoding='UTF-8')
            #a.write(res_1)
            write_json('..\data_file\\' + index_name + '.json', h2)      #写入json文件

            res_2 = ju_2 + x
            print(res_2)
            hashmap2 = {"file_link": PathList[k], "text_entry": res_2}
            write_json('..\data_file\\' + index_name + '.json', hashmap2)        #写入json文件
            k += 1
            number += 1
            # a = open(r'out1.7.json', "a", encoding='UTF-8')
            # a.write(res_2)

        index_create(index_name)

