# 基于ResearchOps平台建设社区问答&资源推荐机器人

#### 介绍

本项目通过使用知识图谱技术，结合ES数据库，neo4j图数据库，实现了社区文档资源推荐的对话机器人，可以根据用户自然语言描述进行推荐对应文档链接。该项目同时包括前端、后端和构建过程三部分代码。

#### 使用说明

1. 挂载文件说明（挂载文件样例请参考[这里](./sample_resource)）

   ```shell
   # 创建文件夹resource - 训练
   resource/conf => conf/ # 输入, 配置文件
   resource/raw_data_input => es_create/file_data # 输入, 原始文件和记录每个文件链接
   resource/train_ner_input => /kg/Model_train_predict/example/ner/standard/data # 输入, 训练ner模型所需的数据, 可使用pip install label-studio构造输入数据
   resource/train_re_input => /kg/Model_train_predict/example/re/standard/data/origin # 输入, 训练re模型所需的数据, 可使用pip install label-studio构造输入数据
   resource/pretrain_models_output => /kg/Model_train_predict/example/pretrain_output # 输出, 导出预训练模型
   
   # 创建文件夹resource - 预测
   resource/conf => conf/ # 输入, 配置文件
   resource/pretrain_models_input => Model_train_predict/example/pretrain_models_input # 输入, 预测中需要将预训练模型导入
   resource/raw_data_input => es_create/file_data # 输入, 原始文件和记录每个文件链接
   resource/train_ner_input => /kg/Model_train_predict/example/ner/standard/data # 输入, 训练ner模型所需的数据, 可使用pip install label-studio构造输入数据
   resource/train_re_input => /kg/Model_train_predict/example/re/standard/data/origin # 输入, 训练re模型所需的数据, 可使用pip install label-studio构造输入数据
   resource/neo4j/import => /kg/Model_train_predict/example/predict_output # 输出, 实体和关系最终的csv文件
   ```


2. 知识图谱社区问答机器人主服务 - train.sh

- 脚本内容（脚本详细介绍请参考[这里](./train.sh)）：

  - 读取配置信息
  - 删除ES索引
  - 数据准备
  - ES数据库创建索引并且导入数据
  - 命名实体模型训练 NER
  - 关系抽取模型训练 RE
  - 保存预训练模型至外部挂载

- 挂载（在GPU上创建文件夹resource）

  ```txt
  local_path/resource/conf => /kg/conf/ # 输入, 配置文件
  local_path/resource/raw_data_input => /kg/es_create/file_data # 输入, 原始文件和记录每个文件链接
  local_path/resource/train_ner_input => /kg/Model_train_predict/example/ner/standard/data # 输入, 训练ner模型所需的数据, 可使用pip install label-studio构造输入数据
  local_path/resource/train_re_input=> /kg/Model_train_predict/example/re/standard/data/origin # 输入, 训练re模型所需的数据, 可使用pip install label-studio构造输入数据
  local_path/resource/pretrain_models_output => /kg/Model_train_predict/example/pretrain_output # 输出, 因为是gpu训练, cpu预测, 所以需要导出预训练模型
  ```

- 启动docker

  ```sh
  docker build -t user_name/kg_qabot:0.1 ./ # 进入项目主目录，通过Dockerfile创建镜像
  
  # 启动容器，修改local_path为正确地址，修改docker的user_name信息
  docker run -it --name kg_qabot_train  \
  -v local_path/resource/conf:/kg/conf \
  -v local_path/resource/raw_data_input:/kg/es_create/file_data \
  -v local_path/resource/train_ner_input:/kg/Model_train_predict/example/ner/standard/data \
  -v local_path/resource/train_re_input:/kg/Model_train_predict/example/re/standard/data/origin \
  -v local_path/resource/pretrain_models_output:/kg/Model_train_predict/example/pretrain_output \
  user_name/kg_qabot:0.1 \
  /bin/bash
  ```

- 运行docker

  ```sh
  # 确保已经进入该容器内部，若未进入请执行下列命令
  docker exec -it kg_qabot_train /bin/bash
  # 在进入该容器内部后，授予train.sh脚本权限并运行
  chmod +x ./train.sh
  ./train.sh
  ```

- 获取预训练模型NER和RE

  ```txt
  在脚本train.sh运行结束后，会自动将NER和RE的预训练模型model_ner.pth和model_re.pth保存至local_path/resource/pretrain_models_output中
  ```

3. 知识图谱社区问答机器人主服务 - predict.sh（脚本详细介绍请参考[这里](./predict.sh)）：

- 脚本内容

  - 将NER和RE的pth预训练模型移至目的文件夹
  - 命名实体模型预测 NER
  - 关系抽取模型预测 RE
  - 保存预训练模型预测的csv结果至外部挂载

- 挂载（在CPU上创建文件夹resource）

  ```txt
  resource/conf => conf/ # 输入, 配置文件
  resource/pretrain_models_input => Model_train_predict/example/pretrain_models_input # 输入, 因为是gpu训练, cpu预测, 所以需要将预训练模型导入
  resource/raw_data_input => /kg/es_create/file_data # 输入, 原始文件和记录每个文件链接
  resource/train_ner_input => /kg/Model_train_predict/example/ner/standard/data # 输入, 训练ner模型所需的数据, 可使用pip install label-studio构造输入数据
  resource/train_re_input=> /kg/Model_train_predict/example/re/standard/data/origin # 输入, 训练re模型所需的数据, 可使用pip install label-studio构造输入数据
  resource/neo4j/import => /Model_train_predict/example/predict_output # 输出, neo4j所需数据
  ```

- 准备预训练模型

  ```txt
  将GPU服务器上的local_path/resource/pretrain_models_output中的预训练模型model_ner.pth和model_re.pth，移动到CPU服务器上的local_path/resource/pretrain_models_input中
  ```

- 启动docker

  ```shell
  docker build -t user_name/kg_qabot:0.1 ./ # 进入项目主目录，通过Dockerfile创建镜像
  
  # 启动容器，修改local_port端口信息，修改local_path为正确地址，修改docker的user_name信息
  docker run -it --name kg_qabot_predict \
  -p local_port:8000 \
  -v local_path/resource/conf:/kg/conf \
  -v local_path/resource/pretrain_models_input:/kg/Model_train_predict/example/pretrain_models_input \
  -v local_path/resource/raw_data_input:/kg/es_create/file_data \
  -v local_path/resource/train_ner_input:/kg/Model_train_predict/example/ner/standard/data \
  -v local_path/resource/train_re_input:/kg/Model_train_predict/example/re/standard/data/origin \
  -v local_path/resource/neo4j/import:/kg/Model_train_predict/example/predict_output \
  user_name/kg_qabot:0.1 \
  /bin/bash
  ```

- 运行docker

  ```shell
  # 确保已经进入该容器内部，若未进入请执行下列命令
  docker exec -it kg_qabot_predict /bin/bash
  # 在进入该容器内部后，授予predict.sh脚本权限并运行
  chmod +x ./predict.sh
  ./predict.sh
  ```

- 获取预训练模型NER和RE在预测后输出的csv

  ```txt
  在脚本predict.sh运行结束后，会自动将NER和RE的预训练模型model_ner.pth和model_re.pth预测的结果csv保存至local_path/resource/neo4j/import
  ```