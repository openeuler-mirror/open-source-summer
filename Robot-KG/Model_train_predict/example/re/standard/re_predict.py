import os
import sys
import torch
import logging
import hydra
from hydra import utils
from deepke.relation_extraction.standard.tools import Serializer
from deepke.relation_extraction.standard.tools import _serialize_sentence, _convert_tokens_into_index, _add_pos_seq, _handle_relation_data , _lm_serialize
import matplotlib.pyplot as plt
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))
from deepke.relation_extraction.standard.utils import load_pkl, load_csv
import deepke.relation_extraction.standard.models as models
import json
import pandas as pd
import gc


logger = logging.getLogger(__name__)


def _preprocess_data(data, cfg):
    
    relation_data = load_csv(os.path.join(cfg.cwd, cfg.data_path, 'relation.csv'), verbose=False)
    rels = _handle_relation_data(relation_data)

    if cfg.model_name != 'lm':
        vocab = load_pkl(os.path.join(cfg.cwd, cfg.out_path, 'vocab.pkl'), verbose=False)
        cfg.vocab_size = vocab.count
        serializer = Serializer(do_chinese_split=cfg.chinese_split)
        serial = serializer.serialize

        _serialize_sentence(data, serial, cfg)
        _convert_tokens_into_index(data, vocab)
        _add_pos_seq(data, cfg)
        logger.info('start sentence preprocess...')
        formats = '\nsentence: {}\nchinese_split: {}\nreplace_entity_with_type:  {}\nreplace_entity_with_scope: {}\n' \
                'tokens:    {}\ntoken2idx: {}\nlength:    {}\nhead_idx:  {}\ntail_idx:  {}'
        logger.info(
            formats.format(data[0]['sentence'], cfg.chinese_split, cfg.replace_entity_with_type,
                        cfg.replace_entity_with_scope, data[0]['tokens'], data[0]['token2idx'], data[0]['seq_len'],
                        data[0]['head_idx'], data[0]['tail_idx']))
    else:
        _lm_serialize(data,cfg)
    return data, rels


def predict_instance(dic):
    new_instance = dict()
    new_instance['sentence'] = dic['text']
    new_instance['head'] = dic['head']
    new_instance['head_type'] = dic['head_type']
    new_instance['tail'] = dic['tail']
    new_instance['tail_type'] = dic['tail_type']
    return new_instance


@hydra.main(config_path='conf/config.yaml')
def main(cfg):
    cwd = utils.get_original_cwd()
    # cwd = cwd[0:-5]
    cfg.cwd = cwd
    cfg.pos_size = 2 * cfg.pos_limit + 2
    print(cfg.pretty())

    # get predict instance
    ################################################文件中读取数据
    with open(cfg.cwd + '/ner_data.json', 'r', encoding='utf-8') as f:
        text_list = json.load(f)
    ##############################################################
    result_list = []
    a = 0
    count = 0
    count_flag = True
    count_item = 0
    for num in range(0, int(len(text_list)/4), 2):
        instance = predict_instance(text_list[num])
        data = [instance]

        # preprocess data
        data, rels = _preprocess_data(data, cfg)

        # model
        __Model__ = {
            'cnn': models.PCNN,
            'rnn': models.BiLSTM,
            'transformer': models.Transformer,
            'gcn': models.GCN,
            'capsule': models.Capsule,
            'lm': models.LM,
        }

        # 最好在 cpu 上预测
        cfg.use_gpu = False
        if cfg.use_gpu and torch.cuda.is_available():
            device = torch.device('cuda', cfg.gpu_id)
        else:
            device = torch.device('cpu')
        logger.info(f'device: {device}')

        model = __Model__[cfg.model_name](cfg)
        logger.info(f'model name: {cfg.model_name}')
        logger.info(f'\n {model}')
        path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))))
        path = os.path.join(path, cfg.fp)
        print(path)
        model.load(path, device=device)
        model.to(device)
        model.eval()

        x = dict()
        x['word'], x['lens'] = torch.tensor([data[0]['token2idx']]), torch.tensor([data[0]['seq_len']])

        if cfg.model_name != 'lm':
            x['head_pos'], x['tail_pos'] = torch.tensor([data[0]['head_pos']]), torch.tensor([data[0]['tail_pos']])
            if cfg.model_name == 'cnn':
                if cfg.use_pcnn:
                    x['pcnn_mask'] = torch.tensor([data[0]['entities_pos']])
            if cfg.model_name == 'gcn':
                # 没找到合适的做 parsing tree 的工具，暂时随机初始化
                adj = torch.empty(1,data[0]['seq_len'],data[0]['seq_len']).random_(2)
                x['adj'] = adj


        for key in x.keys():
            x[key] = x[key].to(device)

        result_dic = {}
        with torch.no_grad():
            y_pred = model(x)
            y_pred = torch.softmax(y_pred, dim=-1)[0]
            prob = y_pred.max().item()
            prob_rel = list(rels.keys())[y_pred.argmax().item()]
            print(int(len(text_list)/4))
            a=a+1
            print(a)
            print(num)
            print('写入计数：', count)
            print('写入次数：', count_item)
            logger.info(f"\"{data[0]['head']}\" 和 \"{data[0]['tail']}\" 在句中关系为：\"{prob_rel}\"，置信度为{prob:.2f}。")

            if prob > 0.8:
                result_dic['head'] = data[0]['head']
                result_dic['tail'] = data[0]['tail']
                result_dic['relation'] = prob_rel
                result_dic['score'] = prob
                result_list.append(result_dic)

            count = count + 1
            if count >= 30:
                count_item = count_item + 1
                if count_flag == False and result_list != None and len(result_list) != 0:
                    data_result = pd.DataFrame(result_list)
                    data_result.to_csv(cfg.cwd + '/neo4j_relation.csv', mode='a', index=False, encoding='utf-8',
                                       header=False)
                if count_flag == True and result_list != None and len(result_list) != 0:
                    data_result = pd.DataFrame(result_list)
                    data_result.to_csv(cfg.cwd + '/neo4j_relation.csv', mode='w', index=False, encoding='utf-8')
                    count_flag = False
                del result_list
                gc.collect()
                result_list = []
                count = 0


        if cfg.predict_plot:
            # maplot 默认显示不支持中文
            plt.rcParams["font.family"] = 'Arial Unicode MS'
            x = list(rels.keys())
            height = list(y_pred.cpu().numpy())
            plt.bar(x, height)
            for x, y in zip(x, height):
                plt.text(x, y, '%.2f' % y, ha="center", va="bottom")
            plt.xlabel('关系')
            plt.ylabel('置信度')
            plt.xticks(rotation=315)
            plt.show()

    if count_flag == False and result_list != None and len(result_list) != 0:
        data_result = pd.DataFrame(result_list)
        data_result.to_csv(cfg.cwd + '/neo4j_relation.csv', mode='a', index=False, encoding='utf-8',
                           header=False)

    if count_flag == True and result_list != None and len(result_list) != 0:
        data_result = pd.DataFrame(result_list)
        data_result.to_csv(cfg.cwd + '/neo4j_relation.csv', mode='w', index=False, encoding='utf-8')
        count_flag = False
    #data_result = pd.DataFrame(result_list)
    #data_result.to_csv(cfg.cwd + '/neo4j_relation.csv', index=False, encoding='utf-8')


if __name__ == '__main__':
    main()


