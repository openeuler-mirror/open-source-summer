'''
此文件为es数据库查询相关后端接口，使用时将其运行在服务器上，使用时通过改变代码中的host、port、auth修改成自己的数据库进行部署
'''
import json
from elasticsearch import Elasticsearch
import os
from flask_cors import *
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'
from flask import Flask, request
app = Flask(__name__)

import yaml


@app.route('/quicksearch', methods=['post'])
#def easysearch(index, keywords, operator_str, query_way, re_id, re_num, ik_way='ik_max_word'):
def easysearch():
    #######################################################参数都在一个内含参数request中，必须从其中提取传入的参数
    res_data = request.form
    index = res_data['index']
    keywords = res_data['keywords']
    operator_str = res_data['operator_str']
    query_way = res_data['query_way']
    re_id = res_data['re_id']
    re_num = res_data['re_num']
    ik_way = res_data['ik_way']
    ######################################################
    try:
        config_path = os.path.join(os.path.dirname(os.path.abspath(os.path.dirname(os.path.dirname(__file__)))), 'conf')
        config_path = os.path.join(config_path, 'conf.yaml')
        with open(config_path, 'r', encoding='utf-8') as f:
            result = yaml.load(f.read(), Loader=yaml.FullLoader)
        host = str(result['elasticsearch']['host'])
        port = str(result['elasticsearch']['port'])
        auth = (str(result['elasticsearch']['user']), str(result['elasticsearch']['pwd']))
        es = Elasticsearch(
            hosts=[{'host': host, 'port': port}],
            http_auth=auth
        )
    except Exception as e:
        print(e)
        s = '链接发生异常，请确认是否已打开服务'
        return json.dumps({'num': 0, 'results': s})
########################################################################################
    dsl = {}
    #构造简单查询dsl语句
    if query_way == 'match':
        dsl = {
            'query': {
                query_way: {
                    'text_entry': {
                        'query': keywords,
                        'operator': operator_str,
                        'analyzer': ik_way
                    }
                }
            },
            "size": 1000,
            "highlight": {
                "fields": {
                    "text_entry": {}
                },
                "pre_tags": "<search>",
                "post_tags": "</search>",
                "fragment_size": 20
            }
        }
########################################################################################
    if query_way == 'multi_match':
        dsl = {
            "query": {
                "multi_match": {
                    "query": keywords,
                    "fields": ["_id", "text_entry", 'path'],
                    'operator': operator_str,
                    'analyzer': ik_way
                }
            },
            "size": 1000
        }
######################################################################
    #进行查询
    try:
        result = es.search(index=index, body=dsl)
    except Exception as e:
        print(e)
        return json.dumps({'num': 0, 'results': '查询失败，可能是语法错误'})
    if len(result['hits']['hits']) == 0:
        return json.dumps({'num': 0, 'results': '未查询到'})
    return json.dumps({'num': 1, 'results': result})


'''
easysearch(index, keywords, operator_str, query_way, ik_way='ik_max_word')

1.参数说明:index:要查询的索引名(string), keywords:要查询的关键词，中间用空格分开，也可以是句子，自动分词(string),  operator:关键词之间的关系联结，如and,or(string),
         query_way:查询方式，如match,term(string), ik_way:ik分词模式，可选，默认为ik_max_word; re_id表示返回信息的代码，0表示返回文件名称，1表示返回文件链接，2表示返回文件内容;
         re_num表示要返回结果的数量
2.返回数据说明（共两个参数）:1.是否成功代码，0为失败 ，1为成功   2.返回失败0时返回一个失败提示字符串;返回成功1时返回是一个列表，列表中每个元素是一个字典，通过字典可访问需要的元素，字典结构如下
{
        "_index" : "r1.7",
        "_type" : "_doc",
        "_id" : "mindspore_cpu_win_install_nightly.md",
        "_score" : 0.038760435,
        "_source" : {
          "file_link":文件链接
          "text_entry": 文本内容
          }
}
3.此接口可实现简单查询，即单层match基本查询，用于基本查询使用
'''


def define_search(index, dsl, re_id, re_num):
    try:
        es = Elasticsearch(["http://127.0.0.1:9200"])
    except:
        s = '链接发生异常，请确认是否已打开服务'
        return 0, s
        # 进行查询
    try:
        result = es.search(index=index, body=dsl)
    except:
        return '查询失败，可能是语法错误'
    if len(result['hits']['hits']) == 0:
        return 0, '未查询到'
    return 1, deal_res(result['hits']['hits'], re_num, re_id)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5602)
'''
define_search(index, dsl)
1.参数说明:index:要查询的索引名(string), dsl:DSL查询语句，只包含query部分,文本查询部分为text_entry,示例如下(字典类型):
{
   'query': {
            'match': {
                'text_entry': {
                    'query': "系统",
                    'operator': "and",
                    'analyzer': “ik_max_word”
                }
            }
        }
    }
2.返回数据说明（共两个参数）:1.是否成功代码，0为失败 ，1为成功    2.返回失败0时返回一个失败提示字符串;返回成功1时返回是一个列表，列表中每个元素是一个字典，通过字典可访问需要的元素，字典结构如下:
{
        "_index" : "r1.7",
        "_type" : "_doc",
        "_id" : "mindspore_cpu_win_install_nightly.md",
        "_score" : 0.038760435,
        "_source" : {
          "text_entry": 文本内容
          }
}
3.此接口可实现文本复杂查询，通过自定义DSL语句进行查询
'''

#使用时将下列测试语句删掉即可
'''
num, s = easysearch('r1.7-api', 'data process，dataset，numpy，处理数据',
                    'or', 'match', 0, 8)
if num == 0:
    print(s)
else:
    print(s)
'''

'''
dsl2 = {
   'query': {
            'match_all': {}
        }
    }
num, s = define_search('r1.6', dsl2)
if num == 0:
    print(s)
else:
    print(s[0]['_source']['text_entry'])
'''








'''
dsl2 = {
   'query': {
            'match': {
                'text_entry': {
                    'query': "我想要安装conda",
                    'operator': "or",
                    'analyzer': 'ik_max_word'
                 }
            }
        }
    }
'''
