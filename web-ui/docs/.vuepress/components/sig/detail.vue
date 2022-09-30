<template>
    <div class="sig-detail">
        <anchor :anchor-list="anchorList"></anchor>
        <div class="breadcrumbs" @click="back">SIG \</div>
        <h1>{{ $route.query.name }}</h1>
        <h2 id="introduction">{{ i18n.sig.SIG_DETAIL.INTRODUCTION }}</h2>
        <p class="no-meeting" v-if="description">{{ description }}</p>
        <p class="no-meeting" v-else>
            {{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT1
            }}<a
                target="_blank"
                :href="
                    'https://gitee.com/openeuler/community/tree/master/sig/' +
                    $route.query.name
                "
                >{{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT2 }}</a
            >{{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT3 }}
        </p>
        <div class="contact">
            <span>{{ i18n.sig.SIG_DETAIL.MAIL_LIST }}: </span
            ><a :href="'mailto:' + $route.query.mail">{{
                $route.query.mail
            }}</a>
        </div>
        <h2 id="meeting" class="meetings">
            {{ i18n.sig.SIG_DETAIL.ORGANIZING_MEETINGS }}
        </h2>
        <div class="calender-wrapper" v-if="calenderData.length">
            <calender :table-data="calenderData" />
        </div>
        <p v-else class="no-meeting">
            {{ i18n.sig.SIG_DETAIL.NO_MEETINGS }}
        </p>
        <h2 class="member" id="member">{{ i18n.sig.SIG_DETAIL.MEMBERS }}</h2>
        <div class="developer-wrapper">
            <div class="dev-leader">
                <div
                    class="dev-dever"
                    v-for="(value, index) in memberList.slice(0, memberCurLen)"
                    :key="index"
                >
                    <el-image
                        style="width: 120px; height: 120px; border-radius: 50%"
                        :src="value.avatar_url"
                    ></el-image>
                    <p class="dever-name">{{ value.gitee_id }}</p>
                    <p
                        class="dever-rank"
                        :title="value.sigs.join(', ') + 'SIG Maintainer'"
                        :class="[
                            'dever-rank',
                            $lang == 'en' ? 'en-dever-rank' : '',
                        ]"
                    >
                        <span
                            v-for="(item, itemIndex) in value.sigs"
                            :key="itemIndex"
                            >{{ item
                            }}{{
                                itemIndex != value.sigs.length - 1 ? ", " : ""
                            }}</span
                        >
                        <span>SIG Maintainer</span>
                    </p>
                    <div class="dev-link">
                        <a :href="'mailto:' + value.email" v-if="value.email">
                            <img
                                class="email-link"
                                src="/img/home/email.png"
                                alt=""
                            />
                        </a>
                        <a target="_blank" :href="value.home_page">
                            <img src="/img/home/Gitee.png" alt="" />
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="isShowH5 && memberList.length > 4" class="more-wrapper">
                <template v-if="flag">
                    <div class="more-text">
                        {{ i18n.sig.SIG_DETAIL.EXPAND }}
                    </div>
                    <img
                        @click="
                            memberCurLen = memberList.length;
                            flag = !flag;
                        "
                        src="/img/home/arrow.svg"
                    />
                </template>
                <template v-else>
                    <div class="more-text">
                        {{ i18n.sig.SIG_DETAIL.RETRACT }}
                    </div>
                    <img
                        @click="
                            memberCurLen = 4;
                            flag = !flag;
                        "
                        src="/img/home/arrowUp.svg"
                    />
                </template>
            </div>
        </div>
        <h2 id="dynamic">{{ i18n.sig.SIG_DETAIL.LATEST_DYNAMIC }}</h2>
        <div class="dynamic">
            <div class="item">
                <div class="header">
                    <span class="left">{{ i18n.sig.SIG_DETAIL.BLOG }}</span>
                    <span
                        class="right"
                        @click="go('/' + $lang + '/interaction/blog-list/')"
                        >{{ i18n.sig.SIG_DETAIL.MORE }}</span
                    >
                </div>
                <ul class="body">
                    <li
                        v-for="item in blogList.slice(0, 3)"
                        :key="item.path"
                        @click="go(item.path)"
                    >
                        {{ item.frontmatter.title }}
                    </li>
                    <li v-if="!blogList.length" class="empty">
                        {{ i18n.sig.SIG_DETAIL.BLOG_EMPTY1
                        }}<a
                            target="_blank"
                            :href="'/' + $lang + '/interaction/post-blog/'"
                            >{{ i18n.sig.SIG_DETAIL.BLOG_EMPTY2 }}</a
                        >{{ i18n.sig.SIG_DETAIL.BLOG_EMPTY3 }}
                    </li>
                </ul>
            </div>
            <div class="item">
                <div class="header">
                    <span class="left">{{ i18n.sig.SIG_DETAIL.NEWS }}</span>
                    <span
                        class="right"
                        @click="go('/' + $lang + '/interaction/news-list/')"
                        >{{ i18n.sig.SIG_DETAIL.MORE }}</span
                    >
                </div>
                <ul class="body">
                    <li
                        v-for="item in newsList.slice(0, 3)"
                        :key="item.path"
                        @click="go(item.path)"
                    >
                        {{ item.frontmatter.title }}
                    </li>
                    <li v-if="!blogList.length" class="empty">
                        {{ i18n.sig.SIG_DETAIL.NEWS_EMPTY }}
                        {{ i18n.sig.SIG_DETAIL.NEWS_EMPTY2 }}
                        <a
                            target="_blank"
                            :href="'https://gitee.com/openeuler/website-v2/blob/master/web-ui/docs/' + $lang + '/interaction/post-news/README.md'"
                            >{{ i18n.sig.SIG_DETAIL.NEWS_EMPTY3 }}</a>
                            {{ i18n.sig.SIG_DETAIL.NEWS_EMPTY4 }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { sigDetail, sigMember } from "../../api/sig";
import calender from "./../home/calender";
import anchor from "./../common/anchor";
let that = null;
let anchorList = [];
let remoteMethods = {
    getSigDetail() {
        sigDetail(that.$route.query.id)
            .then((data) => {
                that.calenderData = data.tableData;
                this.getSigMember();
            })
            .catch((data) => {
                that.$message.error(data);
            });
    },
    getSigMember() {
        sigMember(that.$route.query.id)
            .then((data) => {
                that.description = data.description || "";
                that.memberList = JSON.parse(data.owners);
                that.memberCurLen = that.memberList.length;
                if (that.isShowH5 && that.memberList.length > 4) {
                    that.memberCurLen = 4;
                }
                that.$nextTick(() => {
                    that.anchorList = anchorList;
                })
            })
            .catch((data) => {
                that.$message.error(data);
            });
    },
};
export default {
    data() {
        that = this;
        return {
            calenderData: [],
            memberList: [],
            anchorList: [],
            description: "",
            blogList: [],
            newsList: [],
            memberCurLen: 0,
            flag: true,
        };
    },
    components: {
        calender,
        anchor,
    },
    mounted() {
        this.blogList = this.getList("/blog/");
        this.newsList = this.getList("/news/");
        remoteMethods.getSigDetail();
        anchorList = [
            {
                name: that.i18n.sig.SIG_DETAIL.INTRODUCTION,
                anchorId: "introduction",
            },
            {
                name: that.i18n.sig.SIG_DETAIL.ORGANIZING_MEETINGS,
                anchorId: "meeting",
            },
            {
                name: that.i18n.sig.SIG_DETAIL.MEMBERS,
                anchorId: "member",
            },
            {
                name: that.i18n.sig.SIG_DETAIL.LATEST_DYNAMIC,
                anchorId: "dynamic",
            },
        ];
    },
    methods: {
        /**
         * 获取属于当前sig下的博客或新闻列表
         * @param { string } 博客或新闻对应的枚举字符串
         * @return { Array } 筛选之后的列表
         */
        getList(val) {
            let list = this.$sitePages.filter((item) => {
                // 筛选当前语言和当前传入的枚举参数进行过滤
                if (
                    item.path.indexOf("/" + this.$lang + val) === 0 &&
                    item.frontmatter.sig === this.$route.query.name
                ) {
                    return true;
                }
            });
            return list.sort(
                (a, b) =>
                    Date.parse(b.frontmatter.date) -
                    Date.parse(a.frontmatter.date)
            );
        },
        back() {
            this.$router.push({
                path: this.resolvePath("/sig/sig-list"),
            });
        },
        go(path) {
            this.$router.push(path);
        },
    },
};
</script>
<style>
.sig-detail a {
    text-decoration: none;
    color: #002fa7;
}
</style>
<style lang="less" scoped>
.sig-detail {
    width: 1120px;
    margin: 0 auto;
    @media screen and (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
    }
}
.sig-detail .member {
    padding-top: 90px;
}
.sig-detail .no-meeting {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 1000px) {
        font-size: 14px;
    }
}
.sig-detail .breadcrumbs {
    margin-top: 28px;
    color: #002fa7;
    font-size: 20px;

    cursor: pointer;
}
.sig-detail .meetings {
    padding-top: 40px;
    margin-bottom: 30px;
}
.en-dever-rank {
    font-size: 14px !important;
    line-height: 20px !important;
}
.sig-detail .calender-wrapper {
    margin-top: -25px;
}
.sig-detail h1 {
    margin-top: 12px;
    font-size: 36px;
    color: #000;
    line-height: 46px;
}
.sig-detail h2 {
    padding-top: 54px;
    font-size: 24px;
    color: #000;
    line-height: 24px;
    margin-bottom: 28px;
}
.sig-detail .contact {
    margin-top: 20px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    line-height: 32px;
}
.sig-detail .contact a {
    color: #002fa7;
    cursor: pointer;
    text-decoration: none;
}
.sig-detail .developer-wrapper .dev-leader {
    display: flex;
    flex-wrap: wrap;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever {
    flex: 0 0 25%;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
        flex: 0 0 50%;
    }
    flex-direction: column;
    display: flex;
    align-items: center;
    margin-top: 30px;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dever-name {
    margin-top: 20px;
    color: #005cc7;
    font-size: 16px;
    line-height: 1;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dever-rank {
    text-align: center;
    @media screen and (min-width: 1000px) {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    margin-top: 10px;
    font-size: 14px;

    line-height: 14px;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dev-link {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dev-link a {
    margin: 0 8px;
}

.sig-detail .more-wrapper {
    margin-top: 38px;
    text-align: center;
    color: #002fa7;
    font-size: 14px;
    .more-text {
        margin-bottom: 7px;
    }
}

.sig-detail .dynamic {
    margin-bottom: 200px;
    @media screen and (max-width: 1000px) {
        margin-bottom: 80px;
        flex-direction: column;
    }
    display: flex;
    justify-content: space-between;
    .item {
        width: 546px;
        height: 234px;
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
        @media screen and (max-width: 1000px) {
            width: 100%;
            margin-bottom: 30px;
            height: 196px;
        }
        .header {
            display: flex;
            height: 72px;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            @media screen and (max-width: 1000px) {
                padding: 0 20px;
                height: 52px;
            }
            .left {
                font-size: 20px;
                color: #000;
                position: relative;
                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -12px;
                    width: 100%;
                    height: 2px;
                    background-color: #002fa7;
                    border-radius: 1px;
                }
                @media screen and (max-width: 1000px) {
                    font-size: 16px;
                }
            }
            .right {
                color: #002fa7;
                font-size: 16px;
                cursor: pointer;
                @media screen and (max-width: 1000px) {
                    font-size: 14px;
                }
            }
        }
        .body {
            padding: 0 30px;
            li {
                margin: 23px 0;
                color: #000;
                font-size: 16px;
                width: 482px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #d8d8d8;
                    margin-right: 9px;
                }
            }
            .empty {
                white-space: unset;
                overflow: unset;
                text-overflow: unset;
                &::before {
                    display: none;
                }
            }
            @media screen and (max-width: 1000px) {
                padding: 0 20px;
                li {
                    font-size: 14px;
                    width: 292px;
                }
            }
        }
    }
}
</style>
