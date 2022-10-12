---
title: "Guidance to Post a Blog"

---
<ClientOnly>
  <blog-postBlog />
</ClientOnly>

<div id="post-blog-content">

## 准备

1. 参考 http://git.mydoc.io/?t=179267 注册Gitee账号。

2. 在Gitee个人设置中设置主邮箱地址，在此https://gitee.com/profile/emails。

3. 签署贡献者协议，https://www.openeuler.org/zh/other/cla。

4. 参考http://git.mydoc.io/?t=180692准备你的git环境

## 理解博客格式

openEuler是用markdown格式写博客的。
请阅读该文章 <https://gitee.com/openeuler/website-v2/blob/master/web-ui/docs/zh/interaction/post-blog/README.md>来理解openEuler博客是如何设计的。

文件头需要包含如下信息：
```
---
title: Sample Post
date: 2020-03-03
tags: 
    - Sample
    - ABC
    - cccc
sig: sig-xxx
archives: 2020-03
author: openEuler Blog Maintainer
summary: Just about everything you'll need to style in the theme：headings, paragraphs, blockquotes, tables, code blocks, and more.
---

Here you can edit your blog. 
```

小提示：你可以复制  https://gitee.com/openeuler/website-v2/blob/master/web-ui/docs/zh/interaction/post-blog/blog_example/2020-03-03-sample-post.md 到你的工作路径下然后继续编辑。

## 提交博客

博客的提交利用了Gitee的PR(Pull Request)。

1. Fork openEuler 博客项目  <https://gitee.com/openeuler/website-v2> 到你自己的Gitee上。如果需要具体指导请参考 <http://git.mydoc.io/?t=153749> 。

2. Clone代码

```
git clone https://gitee.com/<your-gitee-id>/website-v2
```

3. 创建分支

```
git checkout -b <branch-name>
```

4. 创建工作路径

如果你发表中文博客，工作路径是 web-ui/docs/zh/blog 。
假设你要写一个英文博客：

```
cd web-ui/docs/en/blog
mkdir <your-gitee-id>
cd <your-gitee-id>
touch YEAR-MONTH-DAY-title.md
```

你可以以你的md文档名来命名你的资源文件，方便使用。例如： 
```
YEAR-MONTH-DAY-title-NN.MARKUP
```
其中，YEAR, MONTH, DAY, 和 title 和你的博客md文件名一致。NN 是01、02、03这样的序号。MARKUP文件扩展名。如下例子：
```
2020-01-01-new-years-is-coming.md
2020-01-01-new-years-is-coming-01.png
2020-01-01-new-years-is-coming-02.gif
2020-01-01-new-years-is-coming-03.pdf
```
使用HTML \<img\> 标签嵌入图片， 但你的图片资源需要放入当前目录下（即your-gitee-id目录下），输入图片名称作为 src 值：
```
<img src = "./2020-01-01-new-years-is-coming-01.png">
```

1. Commit 你的博客

```
git add <file-path>
git commit -m "<message>"
git push origin <branch-name>:<branch-name>
```

2. 参考 <http://git.mydoc.io/?t=153749> 提交你的PR

3. 等待评审和合入。 


</div>

<style lang="less">
#post-blog-content{
  width: 1120px;
  margin: 0 auto;
  margin-bottom: 200px;
  p{
    line-height: 42px;
    a{
      color: #002FA7;
      text-decoration: none;
    }
    img{
      width: 100%;
    }
  }
  h1,h2,h3,h4,h5{
    font-size:20px;
    font-weight: bold;
    margin: 40px 0 25px 0;
    a{
      display: none;
    }
  }
  ol{
    list-style-type: decimal;
    padding-left: 50px;
    li{
      line-height: 32px;
      ol{
        padding-left: 20px;
      }
    }
  }
  ol+p{
    padding-left: 50px;
  }
  div[class*="language-"]{
    background:rgba(225,230,238,0.3);
    border:1px solid rgba(151,151,151,1);
    border-radius: 0;
    margin:20px auto;
    code[class*="language-"], pre[class*="language-"]{
      color:rgba(0,0,0,0.5);
    }
  }
  ul{
    padding-left: 50px;
    li{
      line-height: 32px;
      a{
        color: #002FA7;
        text-decoration: none;
      }
    }
  }
  ul+div[class*="language-"],ol+div[class*="language-"]{
    margin-left: 50px;
  }
}
@media screen and (max-width: 1000px) {
    #post-blog-content {
        width: 100%;
        margin: 0 auto;
        padding: 0 15px;
        margin-bottom: 80px;
    }
}
</style>