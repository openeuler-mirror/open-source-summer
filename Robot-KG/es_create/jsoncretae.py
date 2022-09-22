'''
此方法辅助json文件的生成，对文本中的特殊符号进行一定处理和转化，使其能够成功转化为json格式，data为文本数据字符串
'''
def deal_json_invaild(data):
    data = data.replace("\n", "\\n").replace("\r", "\\r").replace("\n\r", "\\n\\r") \
        .replace("\r\n", "\\r\\n") \
        .replace("\t", "\\t")
    data = data.replace('"', ' replacesymble ')
    data = data.replace("'''", ' solosymble ')
    print(data)


    print(data)
    return data
