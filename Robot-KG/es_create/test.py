import json

def read_file(file):
    '''
    读取md文件
    '''
    with open(file, encoding='UTF-8', errors='ignore') as f:
        content = f.read()
    return content


def write_json(filename, hashmap):
    '''
    写入json文件
    '''
    with open(filename, 'a', encoding='UTF-8') as file_obj:
        json.dump(hashmap, file_obj, ensure_ascii=False)
        file_obj.write('\n')
'''
md_name = 'mindspore_gpu_install_source.md' # md文件名称
md_path = './' + md_name # md文件路径

content = str(read_file(md_path)) # 读取md内容, 并强转为str
# print(content)

hashmap = {'content': content} # 构造字典（其实title可以不加的）

filename = "hashmap.json"
write_json(filename) # 将字典写入json文件
'''
"""
如果有多个md文件:
1) 将我上面的代码封装 (参数列表需要md文件路径、待保存的JSON文件名称或路径);
2) 使用os walk等方式遍历指定路径下的所有md文件;
3) 对于每个md文件, 使用我上面的方法转为JSON并保存;
备注: 如果只需要JSON对象, 不需要JSON文件, 则直接把字典转成JSON就可以了, 注意字符编码为UTF-8;
"""

