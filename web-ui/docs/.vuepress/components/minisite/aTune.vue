<template>
    <div class="A-Tune">
        <titlenav v-show="isShowNav" :currentIndex="activeIndex" :dataList="i18n.minisite.NAV_TEXT"></titlenav>
        <minibanner :themeArr="i18n.minisite.ATUNE_BANNER_TEXT" :mobileImg="i18n.minisite.ATUNE_BANNER_IMG" 
        videoUrl="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/A-Tune.mp4"></minibanner>
        <div class="atune-center">
            <minidesc :isOther="true" :descArr="i18n.minisite.ATUNE_DESC"></minidesc>
            <miniimg :dataList="i18n.minisite.ATUNE_LINK" :mailAddress="i18n.minisite.ATUNE_MAIL"></miniimg>
            <miniframe :outsideStr="i18n.minisite.ATUNE_FRAMEWORK.TITLE_OUTSIDE" :insideStr="i18n.minisite.ATUNE_FRAMEWORK.TITLE_INSIDE"
            :descList="i18n.minisite.ATUNE_FRAMEWORK.DESC_LIST" :frameImg="i18n.minisite.ATUNE_FRAMEWORK.FRAMEWORK_IMG" id="framework"></miniframe>
        </div>
        <div class="document" id="document">
            <p class="title">{{ i18n.minisite.ATUNE_DOCUMENT.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ATUNE_DOCUMENT.TITLE_INSIDE }}</span></p>
            <div class="doc-list">
                <div class="item" v-for="(item,index) in i18n.minisite.ATUNE_DOCUMENT.DOCS_LIST" :key="index" @click="go(item.LINK)">
                    <img :src="item.IMG" alt="" />
                    <div>
                        <p>{{ item.TITLE }}</p>
                        <p>{{ item.DESC }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import titlenav from './../summit/titleNav.vue';
import minibanner from './banner.vue';
import miniimg from './imglink.vue';
import minidesc from './description.vue';
import miniframe from './framework.vue';
export default {
    data() {
        return {
            activeIndex: -1,
            isShowNav: false
        }
    },
    mounted() {
        if(!this.isShowH5) {
            window.addEventListener('scroll',this.atuneScroll);
        }
    },
    methods:{
        go(path) {
            if(path) {
                window.open(path);
            }
        },
        atuneScroll(value) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 600) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 800 && scrollTop < 1800) {
                this.activeIndex = 0;
            }else if(scrollTop > 1800){
                this.activeIndex = 1;
            }else {
                return false;
            }
        },
    },
    destroyed () { 
        window.removeEventListener('scroll', this.atuneScroll);
    },
    components: {
        titlenav,
        minibanner,
        miniimg,
        minidesc,
        miniframe
    },
}
</script>
<style>
.A-Tune .banner-box {
    width: 850px;
}
.A-Tune .banner-box #video {
    margin-left: 229px;
}
@media screen and (max-width: 1120px) {
    .A-Tune .banner-box {
        width: 315px;
    }
}
</style>
<style lang="less" scoped>
.A-Tune {
    width: 100%;
}
.A-Tune .title {
    width: 1120px;
    margin: 0 auto;
    font-size: 36px;
    color: #000000;
    line-height: 48px;
    position: relative;
    text-align: center;
    span {
        font-size: 36px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.05);
        line-height: 48px;
        position: absolute;
        left: 47%;
        top: -24px;
    }
}
.A-Tune .atune-center {
    width: 100%;
}
html[lang="ru"] .A-Tune .atune-center .tune-desc {
    height: unset;
}
.A-Tune .document {
    width: 1120px;
    margin: 74px auto 200px auto;
    .doc-list {
        margin: 30px auto 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 940px;
        .item {
            width: 410px;
            height: 194px;
            background: #FFFFFF;
            cursor: pointer;
            border-radius: 8px;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            flex-direction: row;
            padding-left: 30px;
            &:nth-of-type(2),&:first-of-type {
                margin-bottom: 30px;
            }
            &:nth-of-type(2),&:last-of-type {
                margin-left: 80px;
            }
            img {
                width: 120px;
                height: 120px;
                display: block;
            }
            div {
                width: 200px;
                margin-left: 30px;
                p {                  
                    font-size: 18px;
                    color: #000000;
                    line-height: 28px;
                    &:last-of-type {
                        color: rgba(0, 0, 0, 0.5);
                        line-height: 30px;
                        font-size: 16px;
                        margin-top: 16px;
                        display: none;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .A-Tune .title {
        width: 315px;
        font-size: 18px;
        line-height: 18px;
        span {
            font-size: 16px;
            line-height: 26px;
            left: 45%;
            top: -17px;
        }
    }
    .A-Tune .document {
        width: 100%;
        margin: 37px auto 80px auto;
        .doc-list {
            flex-direction: column;
            width: 310px;
            .item {
                width: 310px;
                height: 158px;
                margin-bottom: 30px;
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                &:nth-of-type(2),&:last-of-type {
                    margin-left: 0;
                }
                &:last-of-type {
                    margin-bottom: 0;
                }
                img {
                    width: 90px;
                    height: 90px;
                }
                div {
                    width: 160px;
                    margin-left: 20px;
                    p {
                        font-size: 16px;
                        line-height: 30px;
                        &:last-of-type {
                            line-height: 26px;
                            font-size: 14px;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>