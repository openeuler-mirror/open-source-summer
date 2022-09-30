<!-- 直播 -->
<template>
    <div class="liveList">
        <common-banner
        :pc-src="'/img/live/live-banner.png'"
        :mobile-src="'/img/live/live-banner.png'"
        :inside-name="'CONNECT'"
        :outside-name="i18n.interaction.LIVE.LIVE"
        ></common-banner>
        <div class="live-ist">
        <div class="now-start" v-if="i18n.interaction.LIVE.LIVENOW.length == 0?false:true">
            <div class="now-start-title">{{i18n.interaction.LIVE.WILLPLAYER}}</div>
            <div class="now-start-content">
            <div
                class="content-box card-hover"
                v-for="(item,key) in nowShowArr"
                :key="key"
                @click="toBLink(item.NOWLINK)"
            >
                <div class="left-content">
                <p class="live-title">{{item.LIVETITLE}}</p>
                <p class="live-teacher">{{item.LIVETEACHER}}</p>
                <p class="live-time">{{item.LIVETIME}}</p>
                </div>
                <div class="right-content">
                <img :src="item.PHOTOPATH" alt />
                </div>
            </div>
            </div>
            <div class="nowpagination">
            <el-pagination
                background="#002FA7"
                @current-change="handleCurrentChange1"
                :page-size="6"
                :layout="paginationLayout"
                :total="nowTotalSize"
            ></el-pagination>
            </div>
        </div>
        <div class="replayer">
            <div class="replayer-tile">{{i18n.interaction.LIVE.REPLAYER}}</div>
            <div class="replayer-content" ref="replayerScroll">
                <div
                    class="content-box card-hover"
                    v-for="(item,key) in formerlyShowArr"
                    :key="key"
                    @click="toBLink(item.FORMERLYLINK)"
                >
                    <div class="left-content">
                        <p class="live-title">{{item.LIVETITLE}}</p>
                        <p class="live-teacher">{{item.LIVETEACHER}}</p>
                        <p class="live-time">{{item.LIVETIME}}</p>
                    </div>
                    <div class="right-content">
                        <img :src="item.PHOTOPATH" alt />
                    </div>
                </div>
            </div>
            <div class="replaypagination">
                <el-pagination
                    background
                    @current-change="handleCurrentChange2"
                    :page-size="6"
                    :layout="paginationLayout"
                    :total="formerlyTotalSize"
                ></el-pagination>
            </div>
        </div>
        <!-- 此div用于增加高度显示背景图的效果 -->
        <div class="block"></div>
        </div>
    </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
export default {
    data () {
        return {
        nowArr: [],
        formerlyArr: [],
        nowTotalSize: 0,
        formerlyTotalSize: 0,
        currentPage: 1,
        nowShowArr: [],
        formerlyShowArr: [],
        }
    },
    mounted () {
        this.nowArr = this.i18n.interaction.LIVE.LIVENOW;
        this.formerlyArr = this.i18n.interaction.LIVE.LIVEFORMERLY;
        this.nowShowArr = this.nowArr.slice(0, 6);
        this.nowTotalSize = this.i18n.interaction.LIVE.LIVENOW.length;
        this.formerlyTotalSize = this.i18n.interaction.LIVE.LIVEFORMERLY.length;
        this.formerlyShowArr = this.formerlyArr.slice(0, 6);
    },
    methods: {
        toBLink (link) {
            if (link == '') {
                alert(this.i18n.interaction.LIVE.LINKTIPS);
            } else {
                window.open(link);
        }

        },
        handleCurrentChange1 (val) {
            this.nowShowArr = this.nowArr.slice(6 * (val - 1), 6 * val);
            scrollTo(0, 300);
        },
        handleCurrentChange2 (val) {
            this.formerlyShowArr = this.formerlyArr.slice(6 * (val - 1), 6 * val);
        }
    },
    components: {
        commonBanner
    },
}

</script>

<style lang='less' scoped>
@urlhead: "/img/live/";
.background-css(@url,@repeat,@position,@size) {
    background-image: url(@url);
    background-repeat: @repeat;
    background-position: @position;
    background-size: @size;
}
@mr-left: left;
@mr-right: right;
@mr-bottom: bottom;
@mr-top: top;
.mr(@position,@px) when (@position = @mr-top) {
    margin-top: @px;
}
.mr(@position,@px) when (@position = @mr-right) {
    margin-right: @px;
}
.mr(@position,@px) when (@position = @mr-bottom) {
    margin-bottom: @px;
}
.mr(@position,@px) when (@position = @mr-left) {
    margin-left: @px;
}
.mr-All(@mr) {
    margin: @mr;
}
.word-common-css(@fontSize,@fontFamily,@fontWeight,@color,@lineHeight) {
    font-size: @fontSize;
    font-weight: @fontWeight;
    color: @color;
    line-height: @lineHeight;
}
.title-css {
    .word-common-css(24px,FZLTHJW,normal,rgba(0, 0, 0, 1),34px);
    @media screen and (max-width: 1000px) {
        .word-common-css(16px,FZLTHJW,550,rgba(11, 22, 43, 1),26px);
        margin-bottom: 10px;
    }
}
.the-content-css {
    display: flex;
    .mr(left,5px);
    @media screen and (max-width: 1000px) {
        .mr(left,0);
    }
}
.content-box-css {
    cursor: pointer;
    .wid-and-hei(350px,200px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    .mr-All(30px 0 0 25px);
    &:first-of-type {
        .mr(left,0);
    }
    @media (min-width: 1000px) {
        &:nth-of-type(4n + 0) {
        .mr(left,0);
        }
    }
    @media screen and (max-width: 1000px) {
        .wid-and-hei(315px,166px);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        margin: 30px 0 0 0;
    }
}
.wid-and-hei(@width,@height) {
    width: @width;
    height: @height;
}
.right-content-css {
    float: left;
    .wid-and-hei(145px,200px);
    img {
        .wid-and-hei(109px,109px);
        .mr-All(62px 12px 29px 24px);
    }
    @media screen and (max-width: 1000px) {
        float: left;
        .wid-and-hei(130px,166px);
        img {
        .wid-and-hei(90px,90px);
        .mr-All(50px 18px 39px 22px);
        }
    }
}
.left-content-css {
    float: left;
    width: 205px;
    @media screen and (max-width: 1000px) {
        float: left;
        width: 185px;
    }
}
// 具体样式从这里开始
.card-hover:hover {
        box-shadow: 0px 6px 30px 0px rgba(0, 47, 167, 0.2) !important;
}
.live-ist {
    .background-css("@{urlhead}ball-background.png",repeat,center center,contain);
    margin-top: 68px;
    @media screen and (max-width: 1000px) {
        background: none;
        .mr-All(40px 0 80px 0);
        width: 100%;
    }
    .block {
        height: 200px;
        @media screen and (max-width: 1000px) {
        height: 0;
        }
    }
}
.live-ist .now-start {
    width: 1120px;
    .mr-All(0 auto);
    @media screen and (max-width: 1000px) {
        .mr-All(0 auto);
        width: 315px;
    }
    .now-start-title {
        .title-css;
    }
    .now-start-content {
        .the-content-css;
        flex-direction: row;
        flex-wrap: wrap;
        @media screen and (max-width: 1000px) {
            flex-direction: column;
        }
        .content-box {
        .content-box-css;
        .left-content {
            .left-content-css;
            p {
                .mr-All(24px 0 0 20px);
                &:last-of-type {
                    .mr(top,12px);
                    @media screen and (max-width: 1000px) {
                        .mr(top,0);
                    }
                }
            }
            .live-title {
            max-width: 180px;
            max-height: 60px;
            //显示两行文字多余的用省略号代替但IE和火狐不支持
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .word-common-css(18px,FZLTHJW,normal,rgba(0, 0, 0, 1),30px);
            @media screen and (max-width: 1000px) {
                .word-common-css(14px,FZLTHJW,normal,rgba(0,0,0,1),26px);
                max-width: 129px;
                max-height: 52px;
            }
            }
            .live-teacher {
            .word-common-css(14px,PingFangSC-Regular,400,rgba(0, 0, 0, 1),14px);
            @media screen and (max-width: 1000px) {
                .word-common-css(14px,FZLTHJW,normal,rgba(0,0,0,0.5),24px);
            }
            }
            .live-time {
            white-space: nowrap;
            .word-common-css(14px,PingFangSC-Regular,400,rgba(0, 0, 0, 1),14px);
                @media screen and (max-width: 1000px) {
                    .word-common-css(14px,FZLTHJW,normal,rgba(0,0,0,0.5),24px);
                }
            }
        }
        .right-content {
            .right-content-css;
            .background-css("@{urlhead}Fill2.svg",no-repeat,0 0,contain);
            @media screen and (max-width: 1000px) {
            .background-css("@{urlhead}Fill2.svg",no-repeat,3px -8px,contain);
            }
        }
        }
    }
    .nowpagination {
        .mr(top,30px);
    }
}

.live-ist .replayer {
    width: 1120px;
    .mr-All(50px auto 0 auto);
    @media screen and (max-width: 1000px) {
        .mr-All(40px auto 0 auto);
        width: 315px;
    }
    .replaypagination{
        .mr(top,30px);
    }
    .replayer-tile {
        .title-css;
    }
    .replayer-content {
        @media screen and (max-width: 1000px) {
            flex-direction: column;
        }
        .the-content-css;
        flex-wrap: wrap;
        
        .content-box {
        .content-box-css;
        .left-content {
            .left-content-css;
            p {
                .mr-All(24px 0 0 20px);
                &:last-of-type {
                    .mr(top,12px);
                    @media screen and (max-width: 1000px) {
                        .mr(top,0);
                    }
                }
            }
            .live-title {
            max-width: 180px;
            max-height: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            .word-common-css(18px,FZLTHJW,normal,rgba(0, 0, 0, 1),30px);
            @media screen and (max-width: 1000px) {
                .word-common-css(14px,FZLTHJW,normal,rgba(0,0,0,1),26px);
                max-width: 129px;
                max-height: 52px;
            }
            }
            .live-teacher {
            .word-common-css(14px,PingFangSC-Regular,400,rgba(0, 0, 0, 1),14px);
            @media screen and (max-width: 1000px) {
                .word-common-css(14px,FZLTHJW,normal,rgba(0,0,0,0.5),24px);
            }
            }
            .live-time {
                white-space: nowrap;
                .word-common-css(14px,PingFangSC-Regular,400,rgba(0, 0, 0, 1),14px);
                @media screen and (max-width: 1000px) {
                    .word-common-css(14px,FZLTHJW,normal,rgba(0,0,0,0.5),24px);
                }
            }
        }
        .right-content {
            .right-content-css;
            .background-css("@{urlhead}Fill.svg",no-repeat,0 0,contain);
            @media screen and (max-width: 1000px) {
            .background-css("@{urlhead}Fill.svg",no-repeat,3px -8px,contain);
            }
        }
        }
    }
    .paginationClass {
        .mr(top,30px);
    }
}
</style>
