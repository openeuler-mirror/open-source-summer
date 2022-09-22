#r1.6和r1.7中在线api文档生成和索引生成，其中r1.6一个索引（包含python、c++、java在内），r1.7一个索引（包含python、c++、java在内）
'''
该文件生成MindSpore官网抓取的api文件r1.6和r1.7（其中各包含python、java、c++三个部分）在es中进行索引的生成和json文件的生成,在使用时通过修改index_name为r1.6或r1.7
进行r1.6文件夹或者r1.7文件夹的生成和创建，同时需要修改path为本地文件位置或者相对文件位置，link_path为保存的文件名字和文件链接对应的excel文件
生成：（1）生成对应elasticsearch库中生成index索引：r1.6、r1.7,每个分别生成1个index,即生成r1.6-api和r1.7-api,由于部分c++文件和python文件有名字重复的问题，因此在导入时修改文件名字
      为c++-api-filename.txt形式,源文件名字中'.'全部修改为'-'
（2）：生成对应的json文件，后面可通过curl命令直接导入es,即生成r1.6-api.json和r1.7-api.json
'''
import os
import json
from jsoncretae import deal_json_invaild
from test import write_json
from Index_create import index_create
from Link_replace import link_replace


def json_create_api():
    index_name = 'r1.7'
    path = 'D://File//开源之夏//资料//MindSpore-API//' + index_name +'//'     #打开文件夹目录
    os_path = path
    mkdir_list = os.listdir(path)
    n = 0
    file_list = []    #过渡用文件f
    file_list_rename = []    #用于给文件重命名id，即加上c++，python等用来区分文件
    for j in mkdir_list:
        path = path + j + '//'
        fileList = os.listdir(path)          #保存各个文件名字
        for i in range(len(fileList)):
            file_list.append(path + fileList[i])
            fileList[i] = j + '-' + fileList[i]
        file_list_rename.extend(fileList)
        path = os_path
    n = len(file_list)
    fileList = file_list_rename
    # 利用excel文件替换链接进入PathList
    link_path = 'D:\\File\\开源之夏\\资料\\MindSpore-API\\' + index_name + '.xlsx'
    PathList = link_replace(link_path, fileList)  # 用于存储各个文件的链接/路径
    print(len(PathList))
    print(len(fileList))
    print(fileList)
    ##################################

    TypeList = []     #用于存储各个文本内容
    for i in range(0, n):
        a = open(file_list[i], "r", encoding='utf-8')
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
        res_1 = ju_1 + str(file_list_rename[k].lower())   #构建文本id
        h1 = {"_index": index_name + "-api", "_id": res_1}
        h2 = {"index": h1}                #构建指引头部index
        print(res_1)
        #a = open(r"r1.6.json", "a", encoding='UTF-8')
        #a.write(res_1)
        write_json('..\data_file\\' + index_name + "-api" + '.json', h2)      #写入json文件

        res_2 = ju_2 + x
        print(res_2)
        hashmap2 = {"file_link": PathList[k], "text_entry": res_2}
        write_json('..\data_file\\' + index_name + "-api" + '.json', hashmap2)        #写入json文件
        k += 1
        number += 1
    index_create(index_name + "-api")
        # a = open(r'out1.7.json', "a", encoding='UTF-8')
        # a.write(res_2)

