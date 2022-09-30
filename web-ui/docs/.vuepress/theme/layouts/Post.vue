<template>
    <div id="vuepress-theme-blog__post-layout">
        <div class="blog-link-post" @click="goBlog">
            {{ i18n.community.BLOG.BLOG }}\
        </div>
        <div class="post-left">
            <p class="blog-img mobile-hide">
                <img class="middle-img" src="/img/blog/blog_user.png" alt />
            </p>
            <p class="mobile-hide">
                <img
                    class="mobile-middle-img"
                    src="/img/blog/account.svg"
                    alt
                />
                <span class="blog-author">{{ $frontmatter.author }}</span>
            </p>
            <p class="mobile-hide">
                <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
                <span class="blog-date mobile">{{
                    resolvePostDate($frontmatter.date)
                }}</span>
            </p>
            <p class="mobile-hide">
                <img
                    class="mobile-middle-img"
                    src="/img/blog/visibility.svg"
                    alt
                />
                <span class="blog-date">
                    <span>
                        <span>{{ i18n.community.BLOG.BROWSE }}</span>
                        <span>{{ blogVisit }}</span>
                        <span>{{ i18n.community.BLOG.VIEWED }}</span>
                    </span>
                </span>
            </p>
            <p class="bottom-line bottom-line-none"></p>
            <p v-if="otherBlog.length" class="other-blog">
                {{ i18n.community.BLOG.OTHER_BLOG }}
            </p>
            <p class="other-blog-item">
                <span
                    @click="goOtherBlog(item.path)"
                    v-for="(item, index) in otherBlog"
                    :key="index"
                    >{{ item.frontmatter.title }}</span
                >
            </p>
        </div>
        <div class="post-right">
            <p class="blog-title">{{ $frontmatter.title }}</p>
            <div class="user-info-mobile">
                <div class="left">
                    <img src="/img/blog/blog_user.png" alt />
                </div>
                <div class="right">
                    <p class="name">{{$frontmatter.author}}</p>
                    <p class="date-count">
                        <span class="date">{{resolvePostDate($frontmatter.date)}}</span>
                        <span class="count">{{i18n.community.BLOG.BROWSE}}{{blogVisit}}{{i18n.community.BLOG.VIEWED}}</span>
                    </p>
                </div>
            </div>
            <p class="blog-item-tag">
                <span>{{ i18n.community.BLOG.LABEL }}: </span>
                <span v-for="(tag, index) in $frontmatter.tags" :key="index">
                    <span class="tag-item">{{ tag }}</span>
                    <span v-if="index != $frontmatter.tags.length - 1">, </span>
                </span>
            </p>
            <p class="bottom-line bottom-line-none"></p>
            <Content id="blog_content" class="markdown" />
        </div>
        <div class="bottom-line"></div>
        <template v-if="!$frontmatter.isNotOriginal">
            <div class="disclaimer">{{ i18n.community.BLOG.COPYRIGHT_1 }} <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">CC-BY-SA 4.0</a> {{ i18n.community.BLOG.COPYRIGHT_2 }}</div>
        </template>
        <div :class="['disclaimer',$lang !== 'zh'?'bottom-height':'']" >
            {{ i18n.community.BLOG.DISCLAIMER }}
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
import { blogVisitDetail, addVisit } from "../../api/blogCount";
export default {
    name: "Post",
    data() {
        return {
            targetLocale: "",
            allBlogListData: [],
            otherBlog: [],
            i18n: this.i18n || {
                community: {
                    BLOG: {}
                }
            },
            // 访问量
            blogVisit: "",
            visitCount: {
                title: "",
                date: "",
                lang: ""
            }
        };
    },
    created() {
        this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
    },
    mounted() {
        this.allBlogListData = this.blogList();
        this.otherBlog = this.getOtherBlog(this.allBlogListData);
        this.visitCount.title = this.$frontmatter.title;
        this.visitCount.date = this.$frontmatter.date;
        this.visitCount.lang = this.$lang;
        this.getBlogCount();
        this.addBlogsCount();
    },

    methods: {
        goBlog() {
            this.$router.push(this.targetLocale + "interaction/blog-list/");
        },
        goOtherBlog(path) {
            this.$router.push(path);
        },
        resolvePostDate(date) {
            return dayjs(date).format(
                this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
            );
        },
        blogList() {
            return this.$sitePages.filter(item => {
                return item.path.indexOf("/" + this.$lang + "/blog/") === 0;
            });
        },
        getOtherBlog(data) {
            return data.filter(item => {
                return (
                    item.frontmatter.author === this.$frontmatter.author &&
                    item.frontmatter.title !== this.$frontmatter.title
                );
            });
        },
        getBlogCount() {
            blogVisitDetail(this.visitCount).then(response => {
                this.blogVisit =
                    (response.data[0] && response.data[0].count) || 1;
            });
        },
        addBlogsCount() {
            addVisit(this.visitCount).then(response => {});
        }
    }
};
</script>

<style lang="less" scoped>
#vuepress-theme-blog__post-layout {
    width: 1120px;
    margin: 0 auto;
}
.blog-link-post {
    font-size: 20px;
    color: #002fa7;
    cursor: pointer;
    margin: 34px 0 16px 0;
    padding-left: 235px;
}
.post-left {
    display: inline-block;
    width: 200px;
    vertical-align: top;
    p {
        margin-bottom: 20px;
    }
}
.mobile-auther {
    display: none;
}
.bottom-line {
    height: 1px;
    margin: 30px 0;
    background: rgba(0, 0, 0, 0.5);
}
.other-blog {
    font-size: 16px;
    text-align: center;
    color: #000;
}
.other-blog-item {
    span {
        display: block;
        cursor: pointer;
        color: rgba(0, 47, 167, 1);
    }
}
.post-right {
    display: inline-block;
    margin-left: 30px;
    width: calc(100% - 250px);
}
.blog-title {
    font-size: 36px;
    font-weight: bold;
    color: #000;
    margin-bottom: 36px;
}

.blog-date.mobile {
    @media (max-width: 1000px) {
        margin-left: 45px;
    }
}
.disclaimer {
    font-size: 16px;
    line-height: 26px;
    color: #002fa7;
    margin-bottom: 30px;
}
.bottom-height {
    margin-bottom: 200px;
}
#blog_content {
    width: 100%;
    @media (max-width: 1000px) {
        padding: 0;
    }
    margin-bottom: 0;
    p {
        line-height: 42px;
        a {
            color: #002fa7;
            text-decoration: none;
        }
        img {
            width: 100%;
        }
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
        font-size: 16px;
        font-weight: bold;
        margin: 40px 0 25px 0;
        a {
            display: none;
        }
    }
    ol {
        li {
            line-height: 32px;
            ol {
                padding-left: 20px;
            }
        }
    }
    ul {
        li {
            line-height: 32px;
            a {
                color: #002fa7;
                text-decoration: none;
            }
        }
    }
}
#vuepress-theme-blog__post-layout .user-info-mobile {
    display: none;
}
@media (max-width: 1000px) {
    #vuepress-theme-blog__post-layout {
        width: 100%;
        padding: 0 30px;
        position: relative;
        .mobile-hide {
            display: none;
        }
        .user-info-mobile {
            height: 65px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            border-bottom: 1px solid #bfbfbf;
            img {
                width: 26px;
                height: 26px;
                border-radius: 100%;
                margin-right: 11px;
            }
            .right {
                .name {
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 14px;
                    line-height: 24px;
                    
                }
                .date-count {
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 12px;
                    line-height: 16px;
                    
                    .date {
                        margin-right: 16px;
                    }
                }
            }
        }
    }
    .blog-link-post {
        display: none;
    }
    .post-left {
        display: none;
    }
    .mobile-middle-img {
        display: none;
    }
    .mobile-auther {
        display: block;
        margin: 20px 0 30px 0;
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        p {
            display: inline-block;
            margin-bottom: 0px;
            p {
                //   display: inline;
            }
            img {
                width: 26px;
                vertical-align: middle;
            }
        }
    }

    .bottom-line-none {
        display: none;
    }
    .other-blog-item {
        span {
            display: block;
            cursor: pointer;
            color: rgba(0, 47, 167, 1);
        }
    }
    .post-right {
        display: inline-block;
        margin-left: 0;
        width: 100%;
    }
    .blog-title {
        font-size: 24px;
        line-height: 34px;
        font-weight: bold;
        color: #000;
        margin-bottom: 0px;
        margin-top: 40px;
    }
    .blog-item-tag {
        display: none;
        .first-tag {
            color: #00000080;
        }
    }
    .disclaimer {
        font-size: 16px;
        line-height: 26px;
        color: #002fa7;
        margin-bottom: 30px;
    }
    .bottom-height {
        margin-bottom: 80px;
    }
}
</style>
<style lang="less">
#blog_content {
    @media screen and (max-width: 1000px) {
        p{
            word-break: normal;
        }
        img{
            width: 100%;
        }
        code{
            width: 100%;
            word-wrap: break-word;
            word-break: normal;
        }
        table{
            word-break:break-all;
            tr{
                td{
                    &:first-of-type,&:nth-of-type(2){
                        word-break:normal;
                    }
                }
            }
    }
    }
}
</style>