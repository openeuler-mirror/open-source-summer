# 启动后端服务

# 1. 启动外部服务API端口
cd /kg/Search_ui
nohup python Search_api.py > Search_api.log 2>&1 &
# 2. 启动neo4j查询服务
cd /kg/Search_neo4j
nohup python Neo_data_search.py > Neo_data_search.log 2>&1 &
# 3. 启动es查询服务
cd /kg/es_search
nohup python Search_api.py > Search_api.log 2>&1 &
# 4. 返回起始工作目录
cd /kg