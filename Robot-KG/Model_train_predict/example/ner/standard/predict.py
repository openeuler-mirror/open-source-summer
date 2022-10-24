from deepke.name_entity_re.standard import *
import hydra
from hydra import utils
import pickle
import os
import json


def pre_data(file_dir):
    file_list = os.listdir(file_dir)
    sentence_list = []
    for i in file_list:
        file_path = file_dir + i
        with open(file_path, 'r', encoding='utf-8') as f:
            s = f.readlines()
            sentence_list.extend(s)
    print(sentence_list)
    return sentence_list


@hydra.main(config_path="conf", config_name='config')
def predict_main(cfg):
    if cfg.model_name == 'lstmcrf':
        path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
        path = os.path.join(path, cfg.predict_model_path)
        with open(os.path.join(utils.get_original_cwd(), cfg.data_dir, cfg.model_vocab_path), 'rb') as inp:
            word2id = pickle.load(inp)
            label2id = pickle.load(inp)
            id2label = pickle.load(inp)

        model = InferNer(path, cfg, len(word2id), len(label2id), word2id, id2label)
    elif cfg.model_name == 'bert':
        model = InferNer(utils.get_original_cwd()+'/'+"checkpoints/", cfg)
    else:
        raise NotImplementedError(f"model type {cfg.model_name} not supported")
    text_list = pre_data(utils.get_original_cwd() +'/data/pre_data_dir/')
    result_triple = []    #存储最后的三元组组成的字典

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
                if str not in entity_list and len(str)>1:
                    entity_list.append(str)
                    text_type = result[i][1][2:5]
                    dic[str] = text_type
                str = ''
                ###############################################构建关系预测字典列表
                for i in range(len(entity_list)):
                    for j in range(i+1, len(entity_list)):
                        if entity_list[i].lower().strip() == entity_list[j].lower().strip():
                            continue
                        triple_dic = {}
                        #正向添加,头尾关系
                        triple_dic['text'] = text
                        triple_dic['head'] = entity_list[i]
                        triple_dic['head_type'] = dic[entity_list[i]]
                        triple_dic['tail'] = entity_list[j]
                        triple_dic['tail_type'] = dic[entity_list[j]]
                        result_triple.append(triple_dic)
                        #反向添加，头尾反向关系
                        triple_dic2={}
                        triple_dic2['text'] = text
                        triple_dic2['tail'] = entity_list[i]
                        triple_dic2['tail_type'] = dic[entity_list[i]]
                        triple_dic2['head'] = entity_list[j]
                        triple_dic2['head_type'] = dic[entity_list[j]]
                        result_triple.append(triple_dic2)
    ####################################################################读取type表并将英文关系替换为中文关系
    with open(utils.get_original_cwd() + '/data/type.txt', 'r', encoding='utf-8') as f:
        data_list = f.readlines()
    data_dic = {}
    for i in data_list:
        a = i.split(' ')
        data_dic[a[1][0:].strip()] = a[0].strip()
    for j in result_triple:
        j['head_type'] = data_dic[j['head_type']]
        j['tail_type'] = data_dic[j['tail_type']]
    ###################################################################
    print(result_triple)
    ner_out_path = utils.get_original_cwd()+'/ner_data.json'
    with open(ner_out_path, 'w', encoding='utf-8') as f:           #数据保存到json文件
        json.dump(result_triple, f)

                ###############################################









    # for k,v in result.items():
    #     if v:
    #         print(v,end=': ')
    #         if k=='PER':
    #             print('Person')
    #         elif k=='LOC':
    #             print('Location')
    #         elif k=='ORG':
    #             print('Organization')
   
    
if __name__ == "__main__":
    predict_main()
