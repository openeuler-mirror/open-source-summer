#索引创建
'''
此方法进行es中的索引创建,方法共包含一个参数，即s：需要创建的索引名称
如果需要在不同es中创建链接，则需要替换更改对应的host、port和auth中的账号和密码
'''
from elasticsearch import Elasticsearch
import yaml


def index_create(s):
    try:
        file = open("../conf/conf.yaml",'r',encoding='utf-8')
        print('1111111111111111111111111111111111111111')
        file_content = yaml.safe_load(file)
       
        print('22222222222222222222222222222222222222222')  
        host = file_content['elasticsearch']['host']
        port = file_content['elasticsearch']['port']
        auth = (file_content['elasticsearch']['user'], file_content['elasticsearch']['pwd'])
        print(host,port,auth,'1')
        print('1','2')
        es = Elasticsearch(
            hosts=[{'host': host, 'port': port}],
            http_auth=auth
        )
    except:
        st = '链接发生异常，请确认是否已打开服务'
        print('链接发生异常')
        return 0, st
    #构建索引
    mappings = {
        "mappings": {
                "properties": {
                    "text_entry": {"type": "text",
                                   "analyzer": "ik_max_word"}
                }
        }
    }
    try:
        res = es.indices.create(index=s, body=mappings)
        print(s + '索引创建成功------', res)
        max_result_body = {'index': {
            'max_result_window': 500000}}  #设置最大返回数为500000
        es.indices.put_settings(index=s, body=max_result_body)
    except:
        print('索引创建失败')
