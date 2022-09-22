'''
此方法用于对搜索获得的结果进行搜索，通过在调用搜索接口时输入的需要内容代码0,1,2,分别返回0:id（文档名字）、1:link（文档链接）、
2:text_entry(文本内容)
'''


def deal_res(res, re_num, re_id):    #对返回结果进行处理，通过返回序号选项返回结果
    num = 0
    if re_num > len(res):
        num = re_num - len(res)
        re_num = len(res)
    res = res[:re_num]
    res_list = []
    if re_id == 0:
        for i in res:
            res_list.append(i['_id'])
    if re_id == 1:
        for i in res:
            res_list.append(i['_source']['file_link'])
    if re_id == 2:
        for i in res:
            res_list.append(i['_source']['text_entry'])
    if re_id == 3:
        for i in res:
            a = []
            a.append(i['_id'])
            a.append(i['_source']['file_link'])
            a.append(i['highlight']['text_entry'])
            res_list.append(a)

    while num != 0:                                    #补充空值
        res_list.append(None)
        num -= 1
    return res_list

