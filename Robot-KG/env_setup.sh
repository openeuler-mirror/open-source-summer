# 变量
env_name="kg_qabot"
setup_folder="Model_train_predict"
py_version=3.8
waiting_time=10

# conda环境安装、激活
conda remove -n $env_name --all -y
conda create -n $env_name python=$py_version -y
source ~/anaconda3/bin/activate $env_name
sleep $waiting_time
conda activate $env_name

# 安装知识图谱问答机器人所需依赖项
pip install -r requirements.txt
cd $setup_folder
python -W ignore setup.py install
python -W ignore setup.py develop
cd ../