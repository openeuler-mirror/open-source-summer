import sys
sys.path.append("..")
from es_search.Deal_res import deal_res
import requests
import os
import yaml
'''
（1）本文件为后端请求发送部分，其中send_post向es数据库发送请求，通过改变data中的参数来改变访问的索引和查询方式，返回re_num代表返回的最大数量，re_id代表返回的形式，
传入参数s为查询语句
（2）send_neo_post为向neo4j数据库发送请求，其中参数s为查询语句
'''


def send_post(s):
    with open('/kg/conf/conf.yaml', 'r', encoding='utf-8') as f:
        result = yaml.load(f.read(), Loader=yaml.FullLoader)
    index_name = str(result['elasticsearch']['index_name'])
    url = 'http://localhost:5602/quicksearch'
    # url = 'http://' + str(result['elasticsearch']['host']) + ':' + str(result['elasticsearch']['port']) + '/quicksearch'
    data = {
        'index': index_name,
        'keywords': s,
        'operator_str': 'or',
        'query_way': 'match',
        're_id': 3,
        're_num': 3,
        'ik_way': 'ik_max_word'
    }
    response = requests.post(url, data=data)
    result = response.json()
    res_num = result['num']
    res = result['results']
    if res_num == 1:
        res = deal_res(res['hits']['hits'], data['re_num'], data['re_id'])
    print(res)
    return res_num, res


def send_neo_post(s):
    # config_path = os.path.join(os.path.dirname(os.path.abspath(os.path.dirname(os.path.dirname(__file__)))), 'conf')
    # config_path = os.path.join(config_path, 'conf.yaml')
    # with open(config_path, 'r', encoding='utf-8') as f:
    #     result = yaml.load(f.read(), Loader=yaml.FullLoader)
    url = 'http://localhost:5606/neo_search'
    # url = 'http://' + str(result['neo4j']['url']) + '/neo_search'
    data = {
        'string': s
    }
    response = requests.post(url, data=data)
    result = response.json()
    res_num = result['nums']
    res = result['results']
    return res_num, res



