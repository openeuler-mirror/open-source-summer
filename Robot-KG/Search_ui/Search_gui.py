import tkinter
from tkinter import *
from tkinter.messagebox import showinfo
from tkinter.ttk import Separator
from PIL import ImageTk
from PIL import Image
from Send_post import send_post, send_neo_post
'''
本文件为整个系统的前端查询界面，可以直接运行，通过在输入框中输入想要查询的语句，系统会返回对应的文档，类似于微信聊天形式
'''

def event1(event):
  """
  事件的属性 delta 解析
  在MouseWheel 事件中,正值代表上卷,负值代表下卷;
  在 Window 下,通常是 120 的倍数;在 MacOS 下,为 1 的倍数
  """
  number = int(-event.delta / 120)
  cv.yview_scroll(number, 'units')


def es_post(text):
    res_num, res = send_post(text)
    answer_str = '针对您的提问,为您推荐的帮助文档为:\n'
    if res_num == 0:
        answer_str = '十分抱歉,' + res + '相关内容文档，请更换内容后再次查询'
    else:
        for i in res:
            if i != None:
                answer_str = answer_str + i[0] + ':  ' + i[1] + '\n' + i[2][0] + '\n'
        answer_str = answer_str[:-1]  # 去掉最后的换行
    return answer_str


#返回指定大小的图片
def get_img(filename, width, height):
    im = Image.open(filename).resize((width, height))
    im = ImageTk.PhotoImage(im)
    return im


#在输入框时按回车键，动作响应与button完全相同
def act_text(event):
    global ly, cimage1, image1, count, distance
    text = text1.get(0.0, END)
    ######################################不能发送空消息
    if text == '\n' or text == '':
        showinfo('提示', '无法发送空消息')
        return
    #####################################
    text = text[0:-1]
    text1.delete(0.0, END)
    ly = ly + distance
    cv.create_image(robotx, ly, image=cimage1)
    cv.create_text(liaox, ly, text=text, fill='#6A5ACD', anchor=W, font=('微软雅黑', 10, 'bold'))
    #########################################################################################发送请求进行访问,并且构建回复语句
    re_num, re_list = send_neo_post(text)  #送入neo4j查询接口进行查询
    answer_str = ''
    if re_num == 1:
        s = ''
        for i in re_list:
            s = s + i + ' '
        answer_str = es_post(s)
    if re_num == 0:
        print('未识别出命名实体')
        answer_str = es_post(text)
    if re_num == 2:
        print('neo4j数据库链接异常')
        answer_str = es_post(text)
    if re_num == 3:
        print('模型预测异常')
        answer_str = es_post(text)
    ly = ly + distance
    cv.create_image(robotx, ly, image=image1)
    cv.create_text(liaox, ly, text=answer_str, fill='#7CCD7C', anchor=W, font=('微软雅黑', 10, 'bold'))
    if ly > 480:
        cv.configure(scrollregion=(0, 0, 1000, ly + 80))
        if count % 2 == 0:
            cv.yview_scroll(5, 'units')
            count = 0
        count = count + 1


#button1动作响应函数
def act_button1(event):
    global ly, cimage1, image1, count, distance
    text = text1.get(0.0, END)
    ######################################不能发送空消息
    if text == '\n' or text == '':
        showinfo('提示', '无法发送空消息')
        return
    #####################################
    text = text[0:-1]
    text1.delete(0.0, END)
    ly = ly + distance
    cv.create_image(robotx, ly, image=cimage1)
    cv.create_text(liaox, ly, text=text, fill='#6A5ACD', anchor=W, font=('微软雅黑', 10, 'bold'))
    #########################################################################################发送请求进行访问,并且构建回复语句
    re_num, re_list = send_neo_post(text)
    answer_str = ''
    if re_num == 1:
        s = ''
        for i in re_list:
            s = s + i + ' '
        answer_str = es_post(s)
    if re_num == 0:
        print('未识别出命名实体')
        answer_str = es_post(text)
    if re_num == 2:
        print('neo4j数据库链接异常')
        answer_str = es_post(text)
    if re_num == 3:
        print('模型预测异常')
        answer_str = es_post(text)
    ly = ly + distance
    cv.create_image(robotx, ly, image=image1)
    cv.create_text(liaox, ly, text=answer_str, fill='#7CCD7C', anchor=W, font=('微软雅黑', 10, 'bold'))
    if ly > 480:
        cv.configure(scrollregion=(0, 0, 1000, ly+80))
        if count % 2 == 0:
          cv.yview_scroll(5, 'units')
          count = 0
        count = count + 1

















ly = 60
robotx = 40
liaox = 70
count = 0
distance = 100  # 对话框间隔距离
root = Tk()
root.title('机器人对话')
root.geometry('800x600')# 这里的乘号不是 * ，而是小写英文字母 x
###
#myframe = Frame(root, relief=GROOVE, width=770, height=600, bd=1)
#myframe.place(x=0, y=0)
###
cv = Canvas(root, bg='white', height=480, width=800, relief='raised', bd=2, confine=False)
global cimage1, image1
cimage1 = get_img('../picture/client.jpg', 35, 35)  # 用户头像设置
image1 = get_img('../picture/robot.jpg', 35, 35)    #机器人头像设置
#########################################################
vbar = Scrollbar(cv, orient=VERTICAL)  # 竖直滚动条
vbar.place(x=780, width=20, height=480)
vbar.configure(command=cv.yview)

hbar = Scrollbar(cv, orient=HORIZONTAL)#水平滚动条
hbar.place(x=0, y=460, width=785, height=20)
hbar.configure(command=cv.xview)
cv.config(xscrollcommand=hbar.set, yscrollcommand=vbar.set)  # 设置
cv.configure(scrollregion=(0, 0, 100000, 480))
###########################################
text1 = Text(root)
text1.place(relwidth=0.9, relheight=0.2, y=480)
text1.bind('<Return>', act_text)
text1.focus_set()

button1 = Button(root, text='发送', bg='#5F9EA0', font=('微软雅黑', 10, 'bold'))
button1.bind('<ButtonPress-1>', act_button1)
button1.focus_set()
button1.place(relheight=0.2, relwidth=0.1, y=481, x=720)

cv.create_image(robotx, ly, image=image1)
cv.create_text(liaox, ly, text='我是机器人小熊........', fill='#7CCD7C', anchor=W, font=('微软雅黑', 10, 'bold'))

###为cv添加鼠标滚动

cv.bind('<MouseWheel>', event1)
cv.focus_set()


cv.pack()
root.mainloop()






