# Posts
This file is to explain in which way the content of the blogs are stored and read by the blog system.

## What is supported in the blog
A blog can include many formats of information, like text, pictures, videos, animations or others. 

openEuler Blog is designed to support the following formats:

1. text
2. static picture
3. links
4. animation

## Folder design
The content of blogs are under <https://gitee.com/openeuler/website-v2>

```
|__ web-ui/docs/en/interaction/post-blog/blog_example          --list the some blog examples
|__ web-ui/docs/zh/blog/guidance  --house the guidance to post and maintain the blogs in Chinese
|__ web-ui/docs/en/blog/guidance  --house the guidance to post and maintain the blogs in English
|__ web-ui/docs/zh/blog           --house all the final posts in Chinese
   |__ author_1  --house the blogs by authors' gitee ID, and each author need create your own foler by your id.
   |__ author_2  --house the blogs by authors' gitee ID
|__ web-ui/docs/en/blog           --house all the final posts in English
   |__ author_1  --house the blogs by authors' gitee ID, and each author need create your own foler by your id.
   |__ author_2  --house the blogs by authors' gitee ID

```

## Post content design
### Choose languange
If you are going to post a blog in English, the web-ui/docs/en/blog is your work path. 

And if you are going to post a blog in Chinese, the web-ui/docs/zh/blog is your work path. 

### File name (Assuming to write a post in Enlgish)
To create a post, add a file to your web-ui/docs/en/blog/author_1/_ directory with the following format:

```
YEAR-MONTH-DAY-title.MARKUP
```
Where YEAR is a four-digit number, MONTH and DAY are both two-digit numbers, and MARKUP is the file extension representing the format used in the file. For example, the following are examples of valid post filenames:
```
2020-01-01-new-years-is-coming.md
2020-02-15-how-to-write-a-blog.md
```

### File headers
Functionally, the post should support categories, archives, title, date, brief description, thus the file headers should be as below.
```
---
title: ...
date: yyyy-mm-dd
tags: 
    - aaaa
    - bbbb
    - cccc
archives: yyyy-mm
author: name of author
summary: ...
---
```

### Including resources

At some point, you’ll want to include images, downloads, or other digital assets along with your text content. 

You can put the resources in the same folder as your text file's, and name the resources as 
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
Then, from within any post, they can be linked to using the site’s root as the path for the asset to include. Here are some simple examples in Markdown:

Including images in a post:
```
...Use the html <img> tag,and enter relative path of the image as src attribute.
<img src="./2020-01-01-new-years-is-coming-01.png" style="width:100%;">
```

Linking to a PDF for readers to download:
```
...
Use the html <a> tag,and enter relative path of the file as href attribute.
The file will be downloaded once the link is clicked.
<a href="./2020-01-01-new-years-is-coming-03.pdf" target="_blank" download >get the PDF</a>.
```
Linking to a url for readers to visit:
```
... you can [read more](<https://gitee.com/openeuler/>).
```

## Thanks
The content above refered to <https://jekyllrb.com/docs/posts/#the-posts-folder>. 
