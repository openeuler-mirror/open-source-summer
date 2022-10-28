import torch
import pandas as pd
import torch.nn as nn
from torchcrf import CRF
from torch.utils import data


TRAINDATA = 'BiFile/OutputFile/trainData.txt'
TESTDATA = 'BiFile/OutputFile/testData.txt'
MODEL = 'BiFile/OutputFile/model/model_90.pth'
VOCAB_PATH = 'BiFile/OutputFile/vocab.txt'
LABEL_PATH = 'BiFile/OutputFile/label.txt'
USERDICT = 'BiFile/userDict.txt'
WORD_PAD_ID = 0
EMBEDDING_DIM = 100
HIDDEN_SIZE = 256
TARGET_SIZE = 3
VOCAB_SIZE = 3000
WORD_UNK = '<UNK>'
LR = 1e-3
BATCH = 64
EPOCH = 100
MODEL_DIR = 'BiFile/OutputFile/model/'
LABEL_O_ID = 0
MODEL_NAME = 'model_100.pth'


class Dataset(data.Dataset):
    def __init__(self, type='train', base_len=50):
        super().__init__()
        self.base_len = base_len
        data_path = TRAINDATA if type == 'train' else TESTDATA
        self.df = pd.read_csv(data_path, encoding='utf-8', names=['word', 'label'])
        _, self.word2id = self.__get_vocab__()
        _, self.label2id = self.__get_label__()
        self.get_points()


    # 找切分点
    def get_points(self):
        self.points = [0]
        i = 0
        while True:
            if i + self.base_len >= len(self.df):
                self.points.append(len(self.df))
                break
            if self.df.loc[i + self.base_len, 'label'] == 'O':
                i += self.base_len
                self.points.append(i)
            else:
                i += 1


    def __len__(self):
        return len(self.points) - 1

    
    # 向量化
    def __getitem__(self, index):
        df = self.df[self.points[index] : self.points[index + 1]]
        wordUnkId = self.word2id[WORD_UNK]
        labelOId = self.label2id['O']
        input = [self.word2id.get(w, wordUnkId) for w in df['word']]
        target = [self.label2id.get(l, labelOId) for l in df['label']]
        return input, target    
    
    def __get_vocab__(self):
        df = pd.read_csv(VOCAB_PATH, names=['word', 'id'])
        return list(df['word']), dict(df.values)

    def __get_label__(self):
        df = pd.read_csv(LABEL_PATH, names=['label', 'id'])
        return list(df['label']), dict(df.values)


class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.embed = nn.Embedding(VOCAB_SIZE, EMBEDDING_DIM, WORD_PAD_ID)
        self.lstm = nn.LSTM(
            EMBEDDING_DIM,
            HIDDEN_SIZE,
            batch_first = True,
            bidirectional = True
        )
        self.linear = nn.Linear(2 * HIDDEN_SIZE, TARGET_SIZE)
        self.crf = CRF(TARGET_SIZE)
    

    def _get_lstm_feature(self, input):
        out = self.embed(input)
        out, _ = self.lstm(out)
        return self.linear(out)


    def forward(self, input, mask):
        out = self._get_lstm_feature(input)
        return self.crf.decode(out, mask)

    
    def loss_fn(self, input, target, mask):
        y_pred = self._get_lstm_feature(input)
        return -self.crf.forward(y_pred, target, mask, reduction='mean')


class Skill():
    def __init__(self):
        _, self.word2id = self.__get_vocab__()
        self.id2label, _ = self.__get_label__()
        self.model = torch.load(MODEL)

    def __get_vocab__(self):
        df = pd.read_csv(VOCAB_PATH, names=['word', 'id'])
        return list(df['word']), dict(df.values)


    def __get_label__(self):
        df = pd.read_csv(LABEL_PATH, names=['label', 'id'])
        return list(df['label']), dict(df.values)


    def __extract__(self, label, text):
        i = 0
        res = []
        while i < len(label):
            if label[i] != 'O':
                prefix, name = label[i].split('-')
                start = end = i
                i += 1
                while i < len(label) and label[i] == 'I-' + name:
                    end = i
                    i += 1
                
                res.append(text[start:end + 1])
            else:
                i += 1
        
        return res


    def __get_user_words__(self):
        userWord = []
        with open(USERDICT, encoding='utf-8') as file:
            for l in file.readlines():
                userWord.append(l.split('\n')[0])
        return userWord


    def user_add(self, word):
        userWord = self.__get_user_words__()

        if word in userWord:
            print(f"{word} is already in the dict!")
        else:
            with open(USERDICT, 'a', encoding='utf-8') as file:
                file.write(word + '\n')
            print("Added successfully!")


    def user_remove(self, word):
        userWord = self.__get_user_words__()
        if word in userWord:
            with open(USERDICT, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            with open(USERDICT, 'w', encoding='utf-8') as file:
                for l in lines:
                    if word == l.split('\n')[0]:
                        continue
                    else:
                        file.write(l)
            print('Remove successfully!')
        else:
            print(f"{word} is not in the dict!")


    def get_skill(self, text):
        input = torch.tensor([[self.word2id.get(w, WORD_PAD_ID) for w in text]])
        mask = torch.tensor([[1] * len(text)]).bool()

        y_pred = self.model(input, mask)

        label = []
        for l in y_pred:
            label.append(self.id2label[l[0]])
        
        res = self.__extract__(label, text)
        res = self.__filter__(text, res)
        res = list(set(res))
        return res


    def __filter__(self, text, arr):
        userWord = self.__get_user_words__()
        res = arr
        for uWord in userWord:
            if uWord in text:
                res.append(uWord)
            for aWord in arr:
                if uWord in aWord:
                    res.append(uWord)
                    res.remove(aWord)
        return res


class Train():
    def __init__(self):
        self.dataset = Dataset()
        self.loader = data.DataLoader(
            self.dataset,
            batch_size=BATCH,
            shuffle=True,
            collate_fn=self.__collate_fn__
        )
        self.model = Model()
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=LR)


    def __collate_fn__(self, batch):
        batch.sort(key=lambda x: len(x[0]), reverse=True)
        max_len = len(batch[0][0])
        input = []
        target = []
        mask = []

        for item in batch:
            pad_len = max_len - len(item[0])
            input.append(item[0] + [WORD_PAD_ID] * pad_len)
            target.append(item[1] + [LABEL_O_ID] * pad_len)
            mask.append([1] * len(item[0]) + [0] * pad_len)
        
        return torch.tensor(input), torch.tensor(target), torch.tensor(mask).bool()


    def train_net(self):
        for e in range(EPOCH):
            for b, (input, target, mask) in enumerate(self.loader):
                y_pred = self.model(input, mask)
                loss = self.model.loss_fn(input, target, mask)

                self.optimizer.zero_grad()
                loss.backward()
                self.optimizer.step()

                if b % 10 == 0:
                    print(f'Epoch: {e} Loss: {loss.item()}')
            if e % 10 == 0:
                torch.save(self.model, MODEL_DIR + f'model_{e}.pth')


class Test():
    def __init__(self):
        self.dataset = Dataset('test')
        self.loader = data.DataLoader(
            self.dataset,
            batch_size=BATCH,
            collate_fn=self.__collate_fn__
        )


    def __collate_fn__(self, batch):
        batch.sort(key=lambda x: len(x[0]), reverse=True)
        max_len = len(batch[0][0])
        input = []
        target = []
        mask = []

        for item in batch:
            pad_len = max_len - len(item[0])
            input.append(item[0] + [WORD_PAD_ID] * pad_len)
            target.append(item[1] + [LABEL_O_ID] * pad_len)
            mask.append([1] * len(item[0]) + [0] * pad_len)
        
        return torch.tensor(input), torch.tensor(target), torch.tensor(mask).bool()

    
    def test_net(self):
        with torch.no_grad():
            model = torch.load(MODEL_DIR + MODEL_NAME)

            y_ture_list = []
            y_pred_list = []

            for b, (input, target, mask) in enumerate(self.loader):
                y_pred = model(input, mask)
                # loss = model.loss_fn(input, target, mask)

                for lst in y_pred:
                    y_pred_list += lst

                for y, m in zip(target, mask):
                    y_ture_list += y[m == True].tolist()

            y_ture_tensor = torch.tensor(y_ture_list)
            y_pred_tensor = torch.tensor(y_pred_list)

            accuracy = (y_ture_tensor == y_pred_tensor).sum() / len(y_ture_tensor)
            print(f'total: {len(y_ture_tensor)} accuracy: {accuracy.item()}')

