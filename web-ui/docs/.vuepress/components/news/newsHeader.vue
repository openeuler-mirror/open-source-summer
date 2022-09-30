<template>
    <div id="news_header">
        <div class="news-link" @click="goNews">
            {{ i18n.community.NEWS.NEWS }}\
        </div>
        <div class="news-title">{{ $frontmatter.title }}</div>
        <div class="news-time">
            <p>
                <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
                <span class="news-date">{{ $frontmatter.date }}</span>
            </p>
            <p>
                <img
                    class="mobile-middle-img"
                    src="/img/blog/visibility.svg"
                    alt
                />
                <span class="news-date">
                    <span id="busuanzi_container_page_pv">
                        <span>{{ i18n.community.BLOG.BROWSE }}</span>
                        <span>{{ newsVisit }}</span>
                        <span>{{ i18n.community.BLOG.VIEWED }}</span>
                    </span>
                </span>
            </p>
        </div>
        <p class="news-time-bottom-line"></p>
    </div>
</template>

<script>
import { newsVisitDetail, addVisit } from "../../api/newsCount";

export default {
    name: "postnews",
    data() {
        return {
            targetLocale: "",
            // 访问量
            newsVisit: "",
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
        this.visitCount.title = this.$frontmatter.title;
        this.visitCount.newsDate = this.$frontmatter.date;
        this.visitCount.lang = this.$lang;
        this.getNewsCount();
        this.addNewsCount();
    },
    methods: {
        goNews() {
            this.$router.push(this.targetLocale + "interaction/news-list/");
        },
        getNewsCount() {
            newsVisitDetail(this.visitCount).then(response => {
                this.newsVisit = response.data[0] && response.data[0].count || 1;
            });
        },
        addNewsCount() {
            addVisit(this.visitCount).then(response => {});
        }
    }
};
</script>

<style lang="less">
#news_header {
    width: 1120px;
    margin: 0 auto;
}
.news-link {
    font-size: 20px;
    color: #002fa7;
    cursor: pointer;
    margin: 34px 0 16px 0;
    padding: 0;
}
.news-title {
    font-size: 36px;
    font-weight: normal;
    color: #000;
    margin-bottom: 36px;
}
.news-time {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    p {
        &:last-of-type{
            margin-left: 51px;
        }
    }
}
.news-date {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
}
.news-time-bottom-line {
    margin: 18px 0 30px 0;
    border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.5);
}
@media screen and (max-width: 1000px) {
    #news_header {
        width: 100%;
        margin: 0 auto;
        padding: 0 30px;
    }
    .news-link {
        display: none;
    }
    .news-title {
        font-size: 18px;
        margin-bottom: 20px;
        margin-top: 40px;
    }
    .news-time {
        margin-top: 0px;
        p{
            &:first-of-type{
                span{
                    &:first-of-type{
                        display: inline-block;
                        width: 100px;
                    }    
                }
            }
            #busuanzi_container_page_pv{
                width: 120px;
                display: inline-block;
            }
        }
    }
    .news-time-bottom-line {
        margin: 30px 0 30px 0;
    }
    .mobile-middle-img{
        display: none;
    }
}
</style>