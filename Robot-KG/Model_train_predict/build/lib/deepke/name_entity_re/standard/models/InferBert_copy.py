from __future__ import absolute_import, division, print_function

import json
import os

import torch
import torch.nn.functional as F
from pytorch_transformers import (BertConfig, BertForTokenClassification,
                                  BertTokenizer)
from collections import OrderedDict
from .BiLSTM_CRF import *

import hydra
from hydra import utils


class InferNer_search:

    def __init__(self, model_dir: str, vocab_size=None, num_labels=None, word2id=None, id2label=None):
        """
        Custom Your Ner Model
        Args:
            vocab_size (`int`): (Only BiLSTM_CRF) vocabulary size used in BiLSTM_CRF
            num_labels (`int`): (Only BiLSTM_CRF)the number of Labels used in BiLSTM_CRF, such as the length of ([B-LOC, I-LOC, B-ORG, I-ORG, B-PER, I-PER, O])
            word2id (`dict`): (Only BiLSTM_CRF) Map word into index for embedding
            id2label (`dict`): (Only BiLSTM_CRF) Map index into Label for decoding
        """

        assert vocab_size != None
        assert num_labels != None
        assert word2id != None
        assert id2label != None

        self.word2id = word2id
        self.id2label = id2label

        #self.model = torch.load(os.path.join("../Model_train_predict/example/ner/standard", "checkpoints", "model.pth"))
        #self.device = "cuda" if torch.cuda.is_available() else "cpu"
        #self.model = self.model.to(self.device)
        #self.model.eval()

    def load_model(self, model_dir: str, model_config: str = "model_config.json"):
        model_config = os.path.join(model_dir,model_config)
        model_config = json.load(open(model_config))
        model = BertNer.from_pretrained(model_dir)
        tokenizer = BertTokenizer.from_pretrained(model_dir, do_lower_case=model_config["do_lower"])
        return model, tokenizer, model_config

    def tokenize(self, text: str):
        """ tokenize input"""
        words = list(text)
        tokens = []
        valid_positions = []
        for i,word in enumerate(words):
            token = self.tokenizer.tokenize(word)
            tokens.extend(token)
            for i in range(len(token)):
                if i == 0:
                    valid_positions.append(1)
                else:
                    valid_positions.append(0)
        return tokens, valid_positions

    def preprocess(self, text: str):
        """ preprocess """
        tokens, valid_positions = self.tokenize(text)
        ## insert "[CLS]"
        tokens.insert(0,"[CLS]")
        valid_positions.insert(0,1)
        ## insert "[SEP]"
        tokens.append("[SEP]")
        valid_positions.append(1)
        segment_ids = []
        for i in range(len(tokens)):
            segment_ids.append(0)
        input_ids = self.tokenizer.convert_tokens_to_ids(tokens)
        input_mask = [1] * len(input_ids)
        while len(input_ids) < self.max_seq_length:
            input_ids.append(0)
            input_mask.append(0)
            segment_ids.append(0)
            valid_positions.append(0)
        return input_ids,input_mask,segment_ids,valid_positions

    def predict(self, text: str):
        words = [[self.word2id.get(w, 0) for w in text]]
        mask = [[1] * len(words[0])]
        y_pred = self.model(torch.tensor(words).to(self.device), torch.tensor(mask).bool().to(self.device))

        """Just adjust the format of output"""
        words = [w for w in text]
        labels = [(self.id2label[id], None) for id in y_pred[0]]
        result = []
        for word, (label, confidence) in zip(words, labels):
            if label!='O':
                result.append((word,label))
        # tmp = []
        # tag = OrderedDict()
        # tag['PER'] = []
        # tag['LOC'] = []
        # tag['ORG'] = []
        
        # for i, (word, label) in enumerate(result):
        #     if label=='B-PER' or label=='B-LOC' or label=='B-ORG':
        #         if i==0:
        #             tmp.append(word)
        #         else:
        #             wordstype = result[i-1][1][2:]
        #             tag[wordstype].append(''.join(tmp))
        #             tmp.clear()
        #             tmp.append(word)
        #     else:
        #         tmp.append(word)
                
        #     if i==len(result)-1:
        #         if label=='B-PER' or label=='B-LOC' or label=='B-ORG':
        #             tmp.append(word)
        #         wordstype = result[i][1][2:]
        #         tag[wordstype].append(''.join(tmp))

        return result
