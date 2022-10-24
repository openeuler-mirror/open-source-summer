import json
from elasticsearch import Elasticsearch
import os
from flask_cors import *
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'
from flask import Flask, request
app = Flask(__name__)
from Send_post import send_post, send_neo_post


def es_post(text):
    res_num, res = send_post(text)
    answer_str = 'The answer for your question is below:\n'
    if res_num == 0:
        answer_str = 'Sorry,' + res + 'please change and query again.'
    else:
        for i in res:
            if i != None:
                answer_str = answer_str + i[0] + ':  ' + i[1] + '\n' + i[2][0] + '\n'
        answer_str = answer_str[:-1]  # 去掉最后的换行
    return answer_str


@app.route('/mainsearch', methods=['post'])
def route_search():
    # res_data = request.form
    # text = res_data['sentence']
    res_data = json.loads(request.data)
    text = res_data['sentence']
    try:
        re_num, re_list = send_neo_post(text)
        answer_str = ''
        if re_num == 1:
            s = ''
            for i in re_list:
                s = s + i + ' '
            answer_str = es_post(s)
        if re_num == 0:
            print('No entity found')
            answer_str = es_post(text)
        if re_num == 2:
            print('neo4j database connection error')
            answer_str = es_post(text)
        if re_num == 3:
            print('model prediction error')
            answer_str = es_post(text)
    except Exception as e:
        print(e)
        return json.dumps({'nums': 1, 'results': 'query error'})
    return json.dumps({'nums': 0, 'results': answer_str})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)






