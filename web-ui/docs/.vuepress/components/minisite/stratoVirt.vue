<template>
    <div class="StratoVirt">
        <titlenav v-show="isShowNav" :currentIndex="activeIndex" :dataList="i18n.minisite.SVIRT_NAV_TEXT"></titlenav>
        <minibanner :themeArr="i18n.minisite.SVIRT_BANNER_TEXT" :mobileImg="i18n.minisite.SVIRT_BANNER_IMG"
        videoUrl="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/StratoVirt-minisite.mp4"></minibanner>
        <div class="sVirt-desc">
            <minidesc :isOther="false" :descArr="i18n.minisite.SVIRT_DESC" :descImg="i18n.minisite.SVIRT_IMG"></minidesc>
            <miniimg :dataList="i18n.minisite.SVIRT_LINK" :mailAddress="i18n.minisite.ISULA_MAIL"></miniimg>
        </div>
        <div class="character-box">
            <div class="character" id="character">
                <p class="title">{{ i18n.minisite.SVIRT_CHARACTER.TITLE_OUTSIDE }}<span>{{ i18n.minisite.SVIRT_CHARACTER.TITLE_INSIDE }}</span></p>
                <p>{{ i18n.minisite.SVIRT_CHARACTER.CHARACTER_TEXT }}</p>
                <div class="character-list">
                    <div class="item" v-for="(item,index) in i18n.minisite.SVIRT_CHARACTER.CHARACTER_LIST" :key="index">
                        <img :src="item.IMG" alt="" />
                        <p>{{ item.TITLE }}</p>
                        <p>{{ item.DESC }}</p>
                    </div>
                </div>
            </div>
            <div class="framework-box" id="framework">
                <p class="title">{{ i18n.minisite.SVIRT_FRAMEWORK.TITLE_OUTSIDE }}<span>{{ i18n.minisite.SVIRT_FRAMEWORK.TITLE_INSIDE }}</span></p>
                <div class="framework">
                    <img :src="i18n.minisite.SVIRT_FRAMEWORK.LEFT_IMG" alt="" />
                    <div>
                        <p v-for="(item,index) in i18n.minisite.SVIRT_FRAMEWORK.RIGHT_TEXT" :key="index">{{ item }}</p>
                    </div>
                </div>
            </div>
            <div class="document" id="document">
                <p class="title">{{ i18n.minisite.SVIRT_DOCUMENT.TITLE_OUTSIDE }}<span>{{ i18n.minisite.SVIRT_DOCUMENT.TITLE_INSIDE }}</span></p>
                <div class="list-box">
                    <div class="item" v-for="(item,index) in i18n.minisite.SVIRT_DOCUMENT.LIST">
                        <img :src="item.ICON" alt="" />
                        <div @click="go(item.LINK)">{{ item.TEXT }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import titlenav from './../summit/titleNav.vue';
import miniimg from './imglink.vue';
import minibanner from './banner.vue';
import minidesc from './description.vue';
export default {
    data() {
        return {
            activeIndex: -1,
            navTitleScroll: [900,1400,2000],
            isShowNav: false
        }
    },
    mounted (){
        if(!this.isShowH5) {
            window.addEventListener('scroll',this.svirtScroll);
        }
    },
    methods: {
        go(path) {
            window.open(path);
        },
        svirtScroll(value) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 500) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 600 && scrollTop < 1300) {
                this.activeIndex = 0;
            }else if(scrollTop > 1300 && scrollTop < 1900){
                this.activeIndex = 1;
            }else if(scrollTop > 1900){
                this.activeIndex = 2;
            }else {
                return false;
            }
        },
    },
    destroyed () { 
        window.removeEventListener('scroll', this.svirtScroll);
    },
    components: {
        titlenav,
        miniimg,
        minibanner,
        minidesc
    },
}
</script>

<style lang="less" scoped>
.StratoVirt {
    width: 100%;
}
.StratoVirt .sVirt-desc,
.character-box .character,
.character-box .framework-box,
.character-box .document{
    width: 1120px;
    margin: 0 auto;
}
.StratoVirt .title {
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
.StratoVirt .sVirt-banner {
    width: 1018px;
    margin: 78px auto;
    display: flex;
    flex-direction: row;
    .text {
        p {
            color: #000000;
            font-size: 24px;
            line-height: 48px;
            font-weight: bold;
            &:first-of-type {
                font-size: 50px;
                line-height: 60px;
                margin: 34px 0 40px 0;
            }
        }
    }
    #sVirt-video {
        margin-left: 410px;
        width: 223px;
        height: 224px;
    }
}
.StratoVirt .sVirt-desc {
    margin-bottom: 124px;
}
.StratoVirt .character-box {
    width:100%;
    background-image: url('/img/minisite/svirt/svirt-bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
}
.character-box .character {
    &>:last-of-type {
        margin: 30px 0 20px 0;
        font-size: 18px;
        color: #000000;
        line-height: 48px;
    }
    .character-list {
        margin: 0 0 94px 100px;
        width: 920px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow: hidden;
        justify-content: space-between;
        .item {
            margin-bottom: 30px;
            img {
                display: block;
                width: 32px;
                height: 32px;
            }
            p {
                font-size: 18px;
                color: #000000;
                line-height: 48px;
                font-weight: bold;
                &:last-of-type {
                    font-size: 16px;
                    line-height: 30px;
                    color: rgba(0, 0, 0, 0.7);
                    font-weight: normal;
                    width: 240px;
                }
            }
        }
    }
}
.character-box .framework-box {
    .framework {
        display: flex;
        flex-direction: row;
        margin: 30px 0 124px 0;
        align-items: center;
        img {
            width: 415px;
            height: 479px;
            display: block;
            margin: 0 40px 0 13px;
        }
        div {
            width: 613px;
            p {
                font-size: 18px;
                color: rgba(0, 0, 0, 0.7);
                line-height: 48px;
            }
        }
    }
}
.character-box .document {
    .list-box {
        width: 844px;
        margin: 30px auto 200px auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .item {
            display: flex;
            width: 134px;
            flex-direction: column;
            margin: 0 100px 20px 0;
            &:nth-of-type(4) {
                margin-right: 0;
            }
            img {
                width: 32px;
                height: 32px;
            }
            div {
                font-size: 18px;
                color: #002FA7;
                line-height: 48px;
                white-space:nowrap;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }

}
html[lang="ru"] .character-box .document .list-box .item {
    width: unset;
}
@media screen and (max-width: 1000px) {
    .StratoVirt .sVirt-desc,
    .character-box .character,
    .character-box .framework-box,
    .character-box .document{
        width: 315px;
        margin: 0 auto;
    }
    .StratoVirt .title {
        width: 315px;
        margin: 37px auto 0 auto;
        font-size: 18px;
        line-height: 18px;
        span {
            font-size: 16px;
            line-height: 26px;
            left: 44%;
            top: -17px;
            white-space:nowrap;
        }
    }
    .StratoVirt .sVirt-banner {
        width: 315px;
        margin: 40px auto 20px auto;
        overflow: hidden;
        flex-direction: column-reverse;
        position: relative;
        .text {
            width: 100%;
            p {
                color: #002FA7;
                text-align: center;
                font-size: 18px;
                line-height: 20px;
                &:first-of-type {
                    font-size: 28px;
                    color: #000000;
                    line-height: 30px;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 0;
                }
            }
        }
        img {
            width: 260px;
            height: 200px;
            display: block;
            margin: 60px auto 42px auto;
        }
    }
    .StratoVirt .sVirt-desc {
        margin-bottom: 58px;
    }
    .StratoVirt .character-box {
        background-image: unset;
    }
    .character-box .character {
        &>:last-of-type {
            font-size: 16px;
            line-height: 30px;
        }
        .character-list {
            width: 315px;
            flex-direction: column;
            margin: 0 0 20px 0;
            .item {
                margin-bottom: 20px;
                img {
                    display: none;
                }
                p {
                    font-size: 16px;
                    line-height: 30px;
                    &:last-of-type {
                        font-size: 14px;
                        line-height: 26px;
                        width: 100%;
                    }
                }
            }
        }
    }
    .character-box .framework-box {
        width: 100%;
        background: #F8FBFF;
        overflow: hidden;
        .framework {
            flex-direction: column-reverse;
            margin-bottom: 0;
            img {
                width: 332px;
                height: 383px;
                margin: 20px auto;
            }
            div {
                width: 315px;
                p {
                     color: rgba(0, 0, 0, 0.75);
                    font-size: 16px;
                    line-height: 30px;
                }
            }
        }
    }
    .character-box .document {
        .list-box {
            width: 315px;
            margin-bottom: 80px;
            flex-direction: column;
            .item {
                margin: 0;
                img {
                    display: none;
                }
            }
        }
    }
}
.character-box .character .character-list .item {
    width: 240px;
}
html[lang="en"] .character-box .character .character-list .item p{
    line-height: 32px;
}
</style>