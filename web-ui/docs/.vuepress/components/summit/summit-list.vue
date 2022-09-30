<!-- 峰会列表页 -->
<template>
    <div class="summit-list">
        <message-banner
        :insideName="'CONNECT'"
        :outsideName="i18n.interaction.SUMMIT.LISTNEWTITLE"
        :pcSrc="'/img/summit/summit-banner.png'"
        :mobileSrc="'/img/summit/summit-banner.png'"
        :isOther="false"
        :pcMessage="i18n.interaction.SUMMIT.LISTTIME"
        :mobileMessage="i18n.interaction.SUMMIT.LISTTIME"
        >
        </message-banner>
        <div class="theme-speech">
            <h3>{{i18n.interaction.SUMMIT.SPEECHTITLE}}</h3>
            <ul class="speech-list">
                <li v-for="(item,key) in speechList" :key="key">
                    <div class="list-head">
                        <p class="list-time">
                            <i class="icon-time"></i>
                            <span>{{item.SPEECHTIME}}</span>
                        </p>
                        <p class="teacher-name">
                            <span>{{item.SPEECHER}}</span>
                            <i class="icon-player" @click="toWhere(item.SPEECHLINK)"></i>
                        </p>
                        <p :class="['list-title',language == '/zh/'?'':'is-en']">{{item.SPEECHTHEME}}</p>
                    </div>
                    <div class="list-body clearfix">
                        <div class="list-explain fl">{{item.SPEECHCONTENT}}</div>
                        <div class="teacher-info fl">
                            <div class="teacher-img">
                                <img :src="item.SPEECHERIMG" alt />
                            </div>
                            <div class="base-info">
                                <p>{{item.SPEECHER}}</p>
                                <p :class="language == '/zh/'?'':'p-en'">{{item.SPEECHERINFO}}</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="design-summit">
            <h3>{{i18n.interaction.SUMMIT.DESIGNTITLE}}</h3>
            <div class="h4">
                <span v-for="(item,key) in trackList" :key="key">{{item}}</span>
            </div>
            <div class="summit-video" v-for="(item,key) in designList" :key="key">
                <div class="video-time" v-for="time in item.DESIGNTIME">
                    <p>{{time.DAY}}</p>
                    <p>{{time.HOUR}}</p>
                </div>
                <div :class="item.TRACK1?'video-one':'null-track'">
                    <div v-for="track1 in item.TRACK1">
                    <div class="video-download" v-if="item.TRACK1?true:false">
                        <div @click="toWhere(track1.TRACK1LINK)">{{i18n.interaction.SUMMIT.LISTTITLE}}</div>
                        <div
                        @click="toWhere(track1.TRACK1DOWNLOAD)"
                        >{{i18n.interaction.SUMMIT.VIDEODOWNLOAD}}</div>
                    </div>
                    <p>{{track1.TRACK1TITLE}}</p>
                    <div class="mobile-time" v-for="time in item.DESIGNTIME">
                        <p>{{time.DAY}}</p>
                        <p>{{time.HOUR}}</p>
                    </div>
                    <p>{{track1.TRACK1TEACHER}}</p>
                    <p>{{track1.TRACK1MAINTAINER}}</p>
                    </div>
                </div>
                <div :class="item.TRACK2?'video-two':'null-track'">
                    <div v-for="track2 in item.TRACK2">
                    <div class="video-download" v-if="item.TRACK2?true:false">
                        <div @click="toWhere(track2.TRACK2LINK)">{{i18n.interaction.SUMMIT.LISTTITLE}}</div>
                        <div
                        @click="toWhere(track2.TRACK2DOWNLOAD)"
                        >{{i18n.interaction.SUMMIT.VIDEODOWNLOAD}}</div>
                    </div>
                    <p>{{track2.TRACK2TITLE}}</p>
                    <div class="mobile-time" v-for="time in item.DESIGNTIME">
                        <p>{{time.DAY}}</p>
                        <p>{{time.HOUR}}</p>
                    </div>
                    <p>{{track2.TRACK2TEACHER}}</p>
                    <p>{{track2.TRACK2MAINTAINER}}</p>
                    </div>
                </div>
                <div :class="item.TRACK3?'video-three':'null-track'">
                    <div v-for="track3 in item.TRACK3">
                    <div class="video-download" v-if="item.TRACK3?true:false">
                        <div @click="toWhere(track3.TRACK3LINK)">{{i18n.interaction.SUMMIT.LISTTITLE}}</div>
                        <div
                        @click="toWhere(track3.TRACK3DOWNLOAD)"
                        >{{i18n.interaction.SUMMIT.VIDEODOWNLOAD}}</div>
                    </div>
                    <p>{{track3.TRACK3TITLE}}</p>
                    <div class="mobile-time" v-for="time in item.DESIGNTIME">
                        <p>{{time.DAY}}</p>
                        <p>{{time.HOUR}}</p>
                    </div>
                    <p>{{track3.TRACK3TEACHER}}</p>
                    <p>{{track3.TRACK3MAINTAINER}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="friendship-link">
            <div class="link-title">{{i18n.interaction.SUMMIT.FRIENDSHIPLINK}}</div>
            <div class="link-list">
                <div
                v-for="(item,key) in linkList"
                :key="key"
                :style="{backgroundImage:item.URL}"
                @click="toWhere(item.LINK)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import messageBanner from "./../common/mesbanner.vue";
export default {
    data () {
        return {
            speechList: [],
            designList: [],
            trackList: [],
            linkList: [],
            language:''
        }
    },
    mounted () {
        this.speechList = this.i18n.interaction.SUMMIT.SPEECHLIST;
        this.designList = this.i18n.interaction.SUMMIT.DESIGNLIST;
        this.trackList = this.i18n.interaction.SUMMIT.TRACKLIST;
        this.linkList = this.i18n.interaction.SUMMIT.OTHERLINK;
        this.language = this.$lang;

    },
    components: {
        messageBanner
    },
    methods: {
        toWhere (link) {
            window.open(link);
        }
    }
}

</script>

<style lang='less' scoped>
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
.wid-and-hei(@width,@height) {
    width: @width;
    height: @height;
}
.max-wid-hei(@width,@height){
    max-width:@width ;
    max-height: @height;
}
.word-common-css(@fontSize,@fontFamily1,@fontFamily2,@fontWeight,@color,@lineHeight) {
    font-size: @fontSize;
    font-weight: @fontWeight;
    color: @color;
    line-height: @lineHeight;
}
.background-size(@size) {
    background-size: @size;
}
.icon-css(@width,@height,@url,@size) {
    display: inline-block;
    width: @width;
    height: @height;
    background-image: url(@url);
    .background-size(@size);
}
.back-shadow-radius(@background,@shadow,@radius) {
    background: @background;
    box-shadow: @shadow;
    border-radius: @radius;
}
//主题的高度和宽度固定
.theme-css(@width,@height) {
    width: @width;
    height: @height;
    .word-common-css(36px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),46px);
    .mr-All( 0 auto);
}
.summit-list {
    width: 1120px;
    .mr-All(0 auto 200px auto);
    @media (max-width: 1000px) {
        width: 100%;
        .mr-All(0 auto 80px auto);
    }
    /deep/ .message-banner .banner-pc .outside{
        font-size: 43px;
    }
}
.theme-speech {
    .mr-All(60px 0 90px 0);
    h3 {
        .theme-css(1120px,46px);
        text-align: center;
    }
    @media (max-width: 1000px) {
        h3 {
            .wid-and-hei(64px, 26px);
            .word-common-css(16px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(11,22,43,1),26px);
            .mr-All(0);
        }
        width: 315px;
        .mr-All(40px auto);
    }
    .speech-list {
        .mr-All(60px 0 0 0);
    li {
        position: relative;
        transition: all 0.4s;
        height: 144px;
        overflow: hidden;
        box-sizing: border-box;
        .mr(top,20px);
        &:first-of-type {
            .mr(top,0);
        }
        .wid-and-hei(1120px,144px);
        .back-shadow-radius(rgba(255,255,255,1),0px 6px 30px 0px rgba(0,0,0,0.1),8px);
        &:hover {
            height: 364px;
            .list-head {
                .back-shadow-radius(rgba(0,47,167,1),0px 6px 30px 0px rgba(0,0,0,0.1),8px 8px 0 0);
                p {
                    color: rgba(255, 255, 255, 1);
                }
                .list-time {
                    .icon-time {
                        background-image: url("/img/summit/white-clock.svg");
                    }
                }
                .teacher-name {
                    .icon-player {
                        cursor: pointer;
                        background-image: url("/img/summit/white-player.svg");
                    }
                }
            }
            .list-body {
                top: 144px;
                z-index: 0;
                border: 2px solid #002FA7;
                border-top: 0;
                display: block;
                border-bottom-right-radius:8px;
                border-bottom-left-radius:8px;
            }
        }
            .list-head {
                position: relative;
                z-index: 1;
                .wid-and-hei(100%,144px);
                padding: 38px 0 0 52px;
                p {
                    .word-common-css(22px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),24px);
                }
                .list-time {
                    font-size: 18px;
                    line-height: 20px;
                    position: relative;                     
                    color: rgba(0, 0, 0, 0.5);
                    .icon-time {
                        .icon-css(18px,18px,"/img/summit/gray-clock.svg",contain);
                        position: absolute;
                    }
                    span{
                        display: inline-block;
                        .mr(left,33px);
                    }
                }
                .teacher-name {
                    position: absolute;
                    right: 38px;
                    .icon-player {
                    .icon-css(25px,25px,"/img/summit/blue-player.svg",contain);
                    position: absolute;
                    right:0;
                    }
                    span{
                        display: inline-block;
                        .mr(right,60px);
                    }
                }
                .list-title {
                    .mr(top,26px);
                    .max-wid-hei(624px,24px);
                }
                .is-en{
                    font-size: 20px;
                    white-space:nowrap;
                    @media (max-width: 1000px) {
                        white-space:normal;
                        font-size: inherit;
                        text-overflow:ellipsis;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        display: -webkit-box;
                    }
                }
            }
            .list-body {
                position: absolute;
                top: -145px;
                z-index: -1;
                padding: 24px 42px 25px 50px;
                // display: none;
                .list-explain {
                    .mr-All(26px 96px 46px 0);
                    .wid-and-hei(600px,96px);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    .word-common-css(14px,FZLTXIHJW--GB1-0,FZLTXIHJW--GB1,normal,rgba(0,0,0,0.5),32px);
                }
                .teacher-info {
                    display: flex;
                    .teacher-img {
                        .wid-and-hei(120px,168px);
                        .mr(right,40px);
                        img {
                            .wid-and-hei(100%,100%);
                        }
                    }
                    .base-info {
                        .mr(top,33px);
                        .wid-and-hei(168px,94px);
                        p {
                            
                            font-weight: normal;
                            &:first-of-type {
                            font-size: 16px;
                            color: rgba(0, 0, 0, 1);
                            line-height: 16px;
                            .mr(bottom,14px);
                            }
                            &:last-of-type {
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.5);
                                line-height: 32px;
                            }
                        }
                        .p-en{
                            line-height: 27px !important;
                            @media (max-width: 1000px) {
                                line-height: 18px !important;
                            }
                        }
                    }
                }
            }
        }
        @media (max-width: 1000px) {
            .mr-All(30px 0 0 0);
            li {
                &:hover {
                    .wid-and-hei(315px,336px);
                }
                .wid-and-hei(315px,162px);
                .mr(top,30px);
                &:first-of-type {
                    .mr(top,0);
                }
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                .list-head {
                    height: 162px;
                    padding: 20px 31px 20px 20px;
                    font-size: 16px;
                    p {
                        .word-common-css(16px,FZLTXIHJW--GB1-0,FZLTXIHJW--GB1,normal,rgba(0,0,0,1),26px);
                    }
                    .list-time {
                        font-size: 14px;
                        line-height: 24px;
                        color: rgba(0, 0, 0, 0.5);
                        
                        span{
                            .mr(left,0);
                        }
                        .icon-time {
                            display: none;
                        }
                    }
                    .teacher-name {
                        bottom: 20px;
                        width: 257px;
                    }
                    .list-title {
                        .mr(top,10px);
                        .max-wid-hei(255px,52px);
                    }
                }
                .list-body {
                    top: 160px !important;
                    padding: 20px 18px;
                    .list-explain {
                    display: none;
                    }
                    .teacher-info {
                        float: none;
                        .teacher-img {
                            .wid-and-hei(96px, 134px);
                            .mr(right,23px);
                            img {
                            .wid-and-hei(96px, 134px);
                            }
                        }
                        .base-info {
                            .mr(top,20px);
                            .wid-and-hei(156px,114px);
                            p {
                                &:first-of-type {
                                    line-height: 26px;
                                    .mr(bottom,20px);
                                }
                                &:last-of-type {
                                    line-height: 24px;
                                    .wid-and-hei(156px, 48px);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.summit-list .design-summit {
    .mr(bottom,100px);
    @media (max-width: 1000px) {
        .mr-All(0 15px);
    }
    h3 {
        .theme-css(1120px,46px);
        text-align: center;
    }
    .h4 {
        .mr-All(60px 0 40px 0);
        span {
        width: 70px;
        height: 24px;
        font-size: 20px;
        
        color: rgba(0, 0, 0, 1);
        line-height: 24px;
        display: inline-block;
            &:first-of-type {
                .mr(left,315px);
                @media (max-width: 1000px) {
                    .mr(left,0);
                }
            }
            &:nth-of-type(2) {
                .mr(left,238px);
                @media (max-width: 1000px) {
                    .mr(left,0);
                }
            }
            &:last-of-type {
                .mr(left,254px);
                @media (max-width: 1000px) {
                    .mr(left,0);
                }
            }
        }
    }
    .summit-video {
        .mr(bottom,40px);
        display: flex;
        justify-content: space-between;
        & > div {
            .mr(left,40px);
            &:first-of-type {
                .mr(left,0);
            }
        }
        .null-track {
            .wid-and-hei(284px, 156px);
        }
        .video-one,
        .video-two,
        .video-three {
            box-sizing: border-box;
            padding: 26px 0 22px 25px;
            .wid-and-hei(284px, 156px);
            .back-shadow-radius(rgba(255,255,255,1),0px 6px 20px 0px rgba(0,0,0,0.1),8px);
            position: relative;

            .video-download {
                display: none;
                position: absolute;
                .wid-and-hei(88px, 76px);
                left: 50%;
                top: 50%;
                .mr-All(-36px 0 0 -44px);
                div {
                    cursor: pointer;
                    .wid-and-hei(88px, 28px);
                    .back-shadow-radius(rgba(0,47,167,1),none,2px);
                    &:first-of-type {
                        .mr(bottom,20px);
                    }
                    text-align: center;
                    .word-common-css(12px, PingFangSC-Regular,PingFang SC, 400, rgba(255,255,255,1), 28px);
                }
            }
            .mobile-time {
                display: none;
            }
            p {
                .word-common-css(18px, FZLTHJW--GB1-0,FZLTHJW--GB1, normal, rgba(0,0,0,0.85), 18px);
                &:first-of-type{
                    .max-wid-hei(204px,48px);
                    @media (max-width: 1000px) {
                        text-overflow:ellipsis;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        display: -webkit-box;
                    }
                }
                &:nth-of-type(2) {
                font-size: 16px;
                
                line-height: 15px;
                .mr(top,23px);
                }
                &:last-of-type {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.5);
                    line-height: 20px;
                    .mr(top,12px);
                    max-height: 40;
                    max-width: 234px;
                }
            }
            &:hover {
                border: 2px solid rgba(0, 47, 151, 1);
                .video-download {
                display: block;
                }
                p {
                    color: rgba(0, 0, 0, 0.1);
                    &:last-of-type {
                        color: rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
        .video-time {
            .wid-and-hei(148px,156px);
            .back-shadow-radius(rgba(255,255,255,1),none,0);
            p {
                .word-common-css(18px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),21px);
                text-align: center;
                .mr(top,7px);
                &:first-of-type {
                
                color: rgba(0, 0, 0, 0.5);
                .mr(top,54px);
                }
            }
        }
    }
    @media (max-width: 1000px) {    
        .mr(bottom,0);
        h3 {
            .wid-and-hei(315px, 26px);
            .word-common-css(16px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(11,22,43,0.85),26px);
            .mr-All(0 auto);
            text-align: left;
        }
        .h4 {
            .mr-All(30px 0 20px 0);
            display: flex;
            justify-content: space-around;
            span {
                width: 60px;
                height: 26px;
                font-size: 16px;
                
                font-weight: normal;
                line-height: 26px;
                display: block;
            }
        }
        .summit-video {
            .null-track {
                .wid-and-hei(107px, 141px);
            }
            .mr(bottom,20px);
            .video-time {
                display: none;
            }
            & > div {
                .mr(left,12px);
                &:nth-of-type(2) {
                .mr(left,0);
                }
            }
            .video-one,
            .video-two,
            .video-three { 
                .wid-and-hei(107px, 141px); 
                .video-download {
                    .wid-and-hei(60px, 81px);
                    .mr-All(-41px 0 0 -31px);
                    div {
                        cursor: pointer;
                        .wid-and-hei(60px, 28px);
                        .back-shadow-radius(rgba(0,47,167,1),none,2px);
                        &:first-of-type {
                        .mr(bottom,25px);
                        }
                        text-align: center;
                        .word-common-css(12px, FZLTXIHJW--GB1-0,FZLTXIHJW--GB1, normal, rgba(255,255,255,1), 28px);
                    }
                }
                .mobile-time{
                    margin-top: 5px;
                }
                &:hover {
                    border-radius: 8px;
                    border: 1px solid rgba(0, 47, 151, 1);
                    .mobile-time {
                        p {
                        color: rgba(0, 0, 0, 0.1);
                        }
                    }
                }
                padding: 10px 0 10px 8px;
                .wid-and-hei(107, 141px);
                .back-shadow-radius(rgba(255,255,255,1),0px 3px 10px 0px rgba(0,0,0,0.2),4px);
                p {
                    
                    font-size: 10px;
                    line-height: 16px;
                    color: rgba(0, 0, 0, 1);
                    &:last-of-type {
                        color: rgba(0, 0, 0, 0.5);
                        font-size: 8px;
                        line-height: 16px;
                        .mr(top,6px);
                        .max-wid-hei(99px,48px);
                        text-overflow:ellipsis;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        display: -webkit-box;
                    }
                    &:nth-of-type(2) {
                        font-size: 10px;
                        .mr(top,10px);
                    }
                }
                .mobile-time {
                    display: block;
                    p {
                        color: rgba(0, 0, 0, 0.5);
                        &:last-of-type {
                        line-height: 16px;
                        .mr(top,0);
                        }
                    }
                }
            }
        }
    }
}
.summit-list .friendship-link {
    .link-title {
        .theme-css(1120px,46px);
        text-align: center;
        .mr(bottom,60px);
    }
    .link-list {
        .wid-and-hei(960px, 100px);
        display: flex;
        justify-content: space-between;
        .mr-All(0 auto);
        div {
            margin-left: 40px;
            cursor: pointer;
            .wid-and-hei(280px, 80px);
            &:last-of-type {
                background-size: cover;
            }
        }
    }
    @media (max-width: 1000px) {
        display: none;
    }
}
</style>
