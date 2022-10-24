#通过label-studio标记的命名体识别（ner，bio标注方式），数据转换成我们需要的bio数据格式，具体生成数据格式可看out_sig_data_file/res_ner.txt
#输入数据格式为从label-studio导出的csv文件，具体格式参考sig_data_file/project-ner.csv
import json
import pandas as pd
import numpy as np


def gen_train_data(file_data, save_path):
    """
    file_path: 通过Label Studio导出的csv文件
    save_path: 保存的路径
    """
    data = file_data
    for idx, item in data.iterrows():
        text = item['text']
        if pd.isna(text):
            text = ''
        text_list = list(text)
        label_list = []
        labels = item['label']
        label_list = ['O' for i in range(len(text_list))]
        if pd.isna(labels):
            pass
        else:
            labels = json.loads(labels)
            for label_item in labels:
                start = label_item['start']
                end = label_item['end']
                label = label_item['labels'][0]
                label_list[start] = f'B-{label}'
                label_list[start+1:end-1] = [f'I-{label}' for i in range(end-start-2)]
                label_list[end - 1] = f'E-{label}'
        assert len(label_list) == len(text_list)
        with open(save_path, 'a') as f:
            for idx_, line in enumerate(text_list):
                if text_list[idx_] == '\t' or text_list[idx_] == ' ':
                    text_list[idx_] = '，'
                line = text_list[idx_] + ' ' + label_list[idx_] + '\n'
                f.write(line)
            f.write('\n')


file_path = 'sig_data_file/project-ner.csv'
a = pd.read_csv(file_path)
a['newindex'] = np.arange(len(a)-1, -1, -1)
a.sort_values('newindex', inplace=True)
a.drop('newindex', axis=1, inplace=True)
a = a.reset_index(drop=True)
gen_train_data(a, 'out_sig_data_file/res_ner.txt')
