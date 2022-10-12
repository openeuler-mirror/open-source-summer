---
title: "Guidance to Post a Blog"

---
<ClientOnly>
  <blog-postBlog />
</ClientOnly>

<div id="post-blog-content">

## Preparation

1. Refer to <http://git.mydoc.io/?t=179267> to register Gitee account.

2. Set your primary mail box in gitee settings <https://gitee.com/profile/emails>.

3. Sign your CLA in <https://www.openeuler.org/en/other/cla>.

4. Prepare your git environment refering to <http://git.mydoc.io/?t=180692>.

## Understand blog format

The openEuler blog is written in markdown format.
You can read <https://gitee.com/openeuler/website-v2/blob/master/web-ui/docs/en/interaction/post-blog/README.md> to get understand how the blog is designed.

The head includes the following information:
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

Tips: you can copy https://gitee.com/openeuler/website-v2/blob/master/web-ui/docs/en/interaction/post-blog/blog_example/2020-03-03-sample-post.md to your folder and edit it.

## Post your blog

The blog posting follows the pull request of [Gitee](gitee.com).

1. Fork openEuler blog project <https://gitee.com/openeuler/website-v2> to your own gitee. Refer to <http://git.mydoc.io/?t=153749> for detailed guidance.

2. Clone the code to your local environment.

```
git clone https://gitee.com/<your-gitee-id>/website-v2
```

3. Create a branch

```
git checkout -b <branch-name>
```

4. Create a folder in the website floder
If you are going to post a blog in English, the web-ui/docs/en/blog is your work path. 

And if you are going to post a blog in Chinese, the web-ui/docs/zh/blog is your work path. 

Assume that you are preparing a English blog.

```
cd web-ui/docs/en/blog
mkdir <your-gitee-id>
cd <your-gitee-id>
touch YEAR-MONTH-DAY-title.md
```

And You can put the resources in the same folder as your text file's, and name the resources as 
```
YEAR-MONTH-DAY-title-NN.MARKUP
```
Where the YEAR, MONTH, DAY, and title are the same as your blog file, and NN is the serial number of the pictures, like 01, 02 and so on. The MARKUP is the file extension, and for pictures it is recommended to use png.
The following are one example.
```
2020-01-01-new-years-is-coming.md
2020-01-01-new-years-is-coming-01.png
2020-01-01-new-years-is-coming-02.gif
2020-01-01-new-years-is-coming-03.pdf
```

1. Commit your post

```
git add <file-path>
git commit -m "<message>"
git push origin <branch-name>:<branch-name>
```

2. Refer to <http://git.mydoc.io/?t=153749> to submit your Pull Request

3. Wait for reviewing and merging. 


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