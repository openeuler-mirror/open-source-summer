from OSPP_T import *


if __name__ == '__main__':
    text = '我会java，熟悉C++，spring全家桶，数据库也还可以！'
    t = Skill()
    res = t.get_skill(text)
    print(res)
