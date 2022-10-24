<<'COMMENT'
1. 读取配置信息:
    1.1 从conf/conf.yaml中读取ES数据搜索引擎配置信息。
    1.2 挂载方式:
        resource/conf => conf/ # es配置文件
COMMENT
es_host=$(cat conf/conf.yaml | grep 'host' | awk '{print $2}')
es_port=$(cat conf/conf.yaml | grep 'port' | awk '{print $2}')
es_index=$(cat conf/conf.yaml | grep 'index_name' | awk '{print $2}')

<<'COMMENT'
2. 删除ES索引
COMMENT

<<'COMMENT'
3. 数据准备: 
    3.1 将被搜索的数据(原始txt文件和每个文件链接记录)放入es_create/file_data/中。
    3.2 参考已有数据文件夹格式es_create/file_data/new-open,同时将文件名称与链接对应的同名xlsx文件放于同文件夹下, 具体格式参考es_create/file_data/文件夹下数据。
    3.3 挂载方式:
        resource/raw_data_input => /kg/es_create/file_data
COMMENT

<<'COMMENT'
4. ES数据库创建索引并且导入数据: 
    4.1 数据准备好后, 增加conf/conf.yaml(样例请参考conf/conf_demo.yaml).
    4.2 修改对应的ES数据库相关信息, conf的ES数据库信息使用位置为es_create/Index_create.py。
COMMENT
    # 4.3 运行es_create/create_main.py文件, 在data_file文件夹下生成与ES索引同名json文件。
cd es_create
mkdir /kg/Model_train_predict/example/ner/standard/data/pre_data_dir/
python create_main.py
    # 4.3 在ES数据库中生成同名索引: 
        # curl命令参考链接为: https://cloud.tencent.com/developer/article/1402401
        # curl -H 'Content-Type: application/x-ndjson' -XPOST 'ip:port/索引名称/_doc/_bulk?pretty' --data-binary todo: @文件位置
curl -H 'Content-Type: application/x-ndjson' -XPOST $es_host:$es_port/$es_index/_doc/_bulk?pretty --data-binary @../data_file/$es_index.json
cd ..

<<'COMMENT'
5. 命名实体模型训练 NER
    5.1 准备数据标注, 标注格式为BIO标注方式。在标注之前需要自行设计好实体类型和相互之间的关系, 格式参照data_process/design_data/type.txt和data_process/design_data/relation.csv
    5.2 训练数据放入Model_train_predict/example/ner/standard/data, 参考train.txt,type.txt,valid.txt, 可通过文件挂载完成。
    5.3 挂载方式: 
        resource/train_ner_input => Model_train_predict/example/ner/standard/data # 训练ner模型所需的数据
COMMENT
    # 5.4 运行Model_train_predict/example/ner/standard/目录下的run.py进行训练, 可以进入conf文件夹修改参数
cd Model_train_predict/example/ner/standard
    # 5.5 移除旧预训练模型, 新的预训练模型会在此重新生成
rm checkpoints/model_ner.pth
mkdir checkpoints
python run.py
cd /kg

<<'COMMENT'
6. 关系抽取模型训练 RE
    6.1 准备数据标注, 根据自己的部分数据进行标注, 标注格式参照Model_train_predict/example/re/standard/data/origin/文件夹下的几个csv文件
    6.2 训练数据放入Model_train_predict/example/re/standard/data/origin/, 可通过文件挂载完成。
    6.3 挂载方式: 
        resource/train_re_input=> Model_train_predict/example/re/standard/data/origin # 训练re模型所需的数据
COMMENT
    # 6.4 运行Model_train_predict/example/re/standard目录下的run.py进行训练
cd Model_train_predict/example/re/standard
    # 6.5 移除旧预训练模型, 新的预训练模型会在此重新生成
rm checkpoints/model_re.pth
mkdir checkpoints
python run.py
cd /kg

<<'COMMENT'
7. 保存预训练模型至外部挂载(如有需要也可使用scp命令在不同服务器中传送文件)
    7.1 挂载方式:
        resource/pretrain_models_output => Model_train_predict/example/pretrain_output # 因为是gpu训练, cpu预测, 所以需要导出预训练模型
COMMENT
rm -rf Model_train_predict/example/pretrain_output
mkdir Model_train_predict/example/pretrain_output
cp Model_train_predict/example/ner/standard/checkpoints/model_ner.pth Model_train_predict/example/pretrain_output/model_ner.pth
cp Model_train_predict/example/re/standard/checkpoints/model_re.pth Model_train_predict/example/pretrain_output/model_re.pth