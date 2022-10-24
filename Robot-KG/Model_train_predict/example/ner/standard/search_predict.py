from deepke.name_entity_re.standard import *
import hydra
from hydra import utils
import pickle
import os
import json
from Model_train_predict.example.ner.standard.InferBert_copy import infer

def predict_main(text_list):
    print('88888888888888888888888888888888888888888')
    print(os.getcwd())
    with open('../Model_train_predict/example/ner/standard/data/data_bilstm.pkl', 'rb') as inp:
        word2id = pickle.load(inp)
        label2id = pickle.load(inp)
        id2label = pickle.load(inp)
        print(os.getcwd())
        print('4444444444444444444444444444444444444444444')
        print(sys.path)
        model = infer('../Model_train_predict/example/ner/standard/checkpoints/', len(word2id), len(label2id), word2id, id2label)
    print('333333333333333333333333333333333333333333333333333333')
    for text in text_list:
        if text != ' ':
            print("NER句子:")
            print(text)
            print('NER结果:')
            result = model.predict(text)
            print(result)
            if len(result) != 0:
                dic = {}   #实体与类型的对照字典
                entity_list = [] #最终的实体表
                str = ''
                preone=''
                for i in range(len(result)):
                    if (result[i][1][0] == 'E' and i != len(result)-1 and preone!='') or (i != len(result)-1 and result[i+1][1][2:5] != preone and preone!=''):
                        str = str + result[i][0]
                        if str not in entity_list and str.lower().strip() not in entity_list and len(str)>1:
                            entity_list.append(str)
                            text_type = result[i][1][2:5]
                            dic[str] = text_type
                        str = ''
                        preone=result[i+1][1][2:5]
                    else:
                        str = str + result[i][0]
                        if preone == '':
                            preone = result[i][1][2:5]
                print(str)
                if str not in entity_list and len(str)>1:
                    print('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                    entity_list.append(str)
                    text_type = result[i][1][2:5]
                    dic[str] = text_type
                str = ''
                ###############################################构建关系预测字典列表
                final_list = entity_list
                print(entity_list)
                return entity_list


def search_pre(s):
    print('1111111111111111111111111111')
    text_list = list()
    text_list.append(s)
    text_list.append(s.lower())
    final_list = predict_main(text_list)
    return final_list
