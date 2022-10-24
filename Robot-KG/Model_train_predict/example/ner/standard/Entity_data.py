#从生成的json文件中提取出已经识别出的实体
import json
import pandas as pd
with open('ner_data.json', 'r', encoding='utf-8') as f:
    text_list = json.load(f)
######################################################################构建导入neo4j的实体表并导出
sum_dic_list = []
ner_list = []
for text in text_list:
    if text['head'] not in ner_list:
        dic_list = {}
        ner_list.append(text['head'])
        s = text['head'].replace('"', '')
        s = s.replace("'", '')
        dic_list['name'] = s
        dic_list['name_type'] = text['head_type']
        sum_dic_list.append(dic_list)
    if text['tail'] not in ner_list:
        dic_list = {}
        ner_list.append(text['tail'])
        st = text['tail'].replace('"', '')
        st = st.replace("'", '')
        dic_list['name'] = st
        dic_list['name_type'] = text['tail_type']
        sum_dic_list.append(dic_list)
df = pd.DataFrame(sum_dic_list)
df.to_csv('ner_entity.csv', index=False, encoding='utf-8')
##################################################################################



