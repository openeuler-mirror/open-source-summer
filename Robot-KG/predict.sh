<<'COMMENT'
1. 将NER和RE的pth预训练模型移至目的文件夹
    1.1 挂载方式:
        resource/pretrain_models_input => Model_train_predict/example/pretrain_models_input # 因为是gpu训练, cpu预测, 所以需要将预训练模型导入
COMMENT
mkdir Model_train_predict/example/ner/standard/checkpoints/
mkdir Model_train_predict/example/re/standard/checkpoints/
cp Model_train_predict/example/pretrain_models_input/model_ner.pth Model_train_predict/example/ner/standard/checkpoints/model_ner.pth
cp Model_train_predict/example/pretrain_models_input/model_re.pth Model_train_predict/example/re/standard/checkpoints/model_re.pth

<<'COMMENT'
2. 命名实体模型预测 NER
    2.1 复制所有教程或指导等txt文档到Model_train_predict/example/ner/standard/data/pre_data_dir/下
    # 2.2 挂载方式:
    #     resource/predict_ner_input => /kg/Model_train_predict/example/ner/standard/data/pre_data_dir # ner模型预测所需的数据。这已经是全部数据, 后续re模型预测时, 会调用ner预测结果作为输入。
COMMENT
    # 2.3 运行Model_train_predict/example/ner/standard/predict.py，在当前目录生成ner_data.json文件
cd Model_train_predict/example/ner/standard
python predict.py
    # 2.4 运行当前目录下Entity_data.py文件，当前目录生成ner_entity.csv文件
python Entity_data.py

<<'COMMENT'
3. 关系抽取模型预测 RE
COMMENT
    # 3.1 复制上述Model_train_predict/example/ner/standard/ner_data.json文件到Model_train_predict/example/re/standard/目录下
cp /kg/Model_train_predict/example/ner/standard/ner_data.json /kg/Model_train_predict/example/re/standard/
    # 3.2 进入Model_train_predict/example/re/standard
cd /kg/Model_train_predict/example/re/standard
    # 3.2 运行当前目录下re_predict.py, 生成neo4j_relation.csv文件
python re_predict.py
    # 3.4 返回Model_train_predict/example

<<'COMMENT'
4. 保存预训练模型预测的csv结果至外部挂载
    4.1 挂载方式:
        resource/neo4j/import => Model_train_predict/example/ner/standard/data/pre_data_dir/output # re模型预测所需的数据
COMMENT
# rm -rf /kg/Model_train_predict/example/predict_output
# mkdir /kg/Model_train_predict/example/predict_output
cp /kg/Model_train_predict/example/ner/standard/ner_entity.csv /kg/Model_train_predict/example/predict_output/ner_entity.csv
cp /kg/Model_train_predict/example/re/standard/neo4j_relation.csv /kg/Model_train_predict/example/predict_output/neo4j_relation.csv

<<'COMMENT'
5. 启动后端服务
COMMENT
    # 5.1 启动外部服务API端口
cd /kg/Search_ui
# python Search_api.py
nohup python Search_api.py > Search_api.log 2>&1 &
    # 5.2 启动neo4j查询服务
cd /kg/Search_neo4j
# python Neo_data_search.py
nohup python Neo_data_search.py > Neo_data_search.log 2>&1 &
    # 5.3 启动es查询服务
cd /kg/es_search
# python Search_api.py
nohup python Search_api.py > Search_api.log 2>&1 &
    # 5.4 返回起始工作目录
cd /kg