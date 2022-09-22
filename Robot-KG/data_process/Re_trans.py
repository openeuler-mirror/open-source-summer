#通过label-studio标记的关系表数据转换成我们需要的数据格式
import json
import pandas as pd


def re_trans(file_path):
    json_data = []
    with open(file_path, 'r', encoding='utf-8') as f:
        json_data = json.load(f)
    df = pd.DataFrame(columns=['sentence', 'relation', 'head', 'head_offset', 'tail', 'tail_offset'])
    df_list = []
    df_re = pd.read_csv('sig_data_file/RE.csv')
    #################################################################
    df_dic = {}   #储存对应id对应的原来语句
    for i in range(0, len(df_re)):
        df_dic[df_re.iloc[i]['id']] = df_re.iloc[i]['text']
    ##################################################################
    for line in json_data:
        if len(line['annotations'][0]['result']) != 0:                    #过滤已经跳过的语句
            dic = line['annotations'][0]['result']
            for i in dic:
                if i['type'] == 'relation':
                    head_id = i['from_id']
                    tail_id = i['to_id']
                    new_text = ''
                    if 'id' in line:
                        if line['id'] in df_dic:
                            new_text = df_dic[line['id']]
                            new_text = new_text.replace('#', '\#')
                            new_text = new_text.replace('"', '\"')
                            new_text = new_text.replace(',', '\,')
                        else:
                            continue
                    else:
                        continue
                    new_relation = i['labels'][0]
                    new_head = ''
                    new_tail = ''
                    new_head_offset = ''
                    new_tail_offset = ''
                    head_flag = 0
                    tail_flag = 0
                    for j in dic:
                        if j['type'] == 'labels':
                            if j['id'] == head_id:
                                new_head = j['value']['text']
                                new_head_offset = j['value']['start']
                                head_flag = 1
                            if j['id'] == tail_id:
                                new_tail = j['value']['text']
                                new_tail_offset = j['value']['start']
                                tail_flag = 1
                            if head_flag == 1 and tail_flag == 1:
                                break
                    new_df = {'sentence': new_text, 'relation': new_relation, 'head': new_head, 'head_offset': new_head_offset, 'tail': new_tail, 'tail_offset':
                              new_tail_offset}
                    df_list.append(new_df)
    df = df.append(df_list)
    print(df)
    return df


file_path = 'sig_data_file/RE.json'
out_path = 'out_sig_data_file/RE_out.csv'
df = re_trans(file_path)
df.to_csv(out_path, encoding='utf-8', index=0)