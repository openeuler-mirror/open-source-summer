<template>
    <div class="i-Sula">
        <titlenav v-show="isShowNav" :currentIndex="activeIndex" :dataList="i18n.minisite.NAV_TEXT"></titlenav>
        <minibanner :themeArr="i18n.minisite.ISULA_BANNER_TEXT" :mobileImg="i18n.minisite.ISULA_BANNER_IMG" 
        videoUrl="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/iSula.mp4"></minibanner>
        <div class="desc-box">
            <div class="isula-desc">
                <minidesc :isOther="false" :descArr="i18n.minisite.ISULA_DESC_UP" :descImg="i18n.minisite.ISULA_LOGO"></minidesc>
                <miniimg :dataList="i18n.minisite.ISULA_LINK" :mailAddress="i18n.minisite.ISULA_MAIL"></miniimg>
                <p v-for="(item,index) in i18n.minisite.ISULA_DESC_DOWN" :key="index">{{ item }}</p>
                <img :src="i18n.minisite.ISULA_DESC_IMG" alt="" />
            </div>
        </div>
        <div class="framework-box" id="framework">
            <p class="title">{{ i18n.minisite.ISULA_FRAMEWORK.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ISULA_FRAMEWORK.TITLE_INSIDE }}</span></p>
            <div class="framework-desc">
                <div class="tab-list">
                    <div :class="['item',frameworkIndex === index?'active':'']" v-for="(item,index) in i18n.minisite.ISULA_FRAMEWORK.TAB" @click="changeTab(item.KEY,index,0)" :key="index">{{ item.VALUE }}</div>
                </div>
                <div :class="['description',frameworkIndex == 0?'indent':'']">
                    <p v-for="(item,index) in frameworkData.DESC_LIST" :key="index">{{ item }}</p>
                </div>
            </div>
            <div class="framework-img">
                <p>{{ frameworkData.FRAMEWORK_TITLE }}</p>
                <img :class="[frameworkIndex === 1?'img-2':'',frameworkIndex === 2?'img-3':'']" :src="frameworkData.FRAMEWORK_IMG" alt="" />
            </div>
        </div>
        <div class="document" id="document">
            <p class="title">{{ i18n.minisite.ISULA_DOCUMENT.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ISULA_DOCUMENT.TITLE_INSIDE }}</span></p>
            <div class="tab-list">
                <div :class="['item',documentIndex === index?'active':'']" v-for="(item,index) in i18n.minisite.ISULA_DOCUMENT.TAB" :key="index" @click="changeTab(item.KEY,index,1)">{{ item.VALUE }}</div>
            </div>
            <div class="doc-list">
                <div class="item" v-for="(item,index) in documentData" :key="index">
                    <img :src="item.IMG" alt="" />
                    <div>
                        <p v-for="(value,key) in item.DESC" @click="go(value.LINK)" :key="key">{{ value.TEXT }}</p>
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
            frameworkData: {},
            documentData: [],
            frameworkIndex: 0,
            documentIndex: 0,
            activeIndex: -1,
            isShowNav: false
        }
    },
    mounted (){
        this.frameworkData = this.i18n.minisite.ISULA_FRAMEWORK['ISULAD'];
        this.documentData = this.i18n.minisite.ISULA_DOCUMENT['ISULAD'];
        if(!this.isShowH5) {
            window.addEventListener('scroll',this.isulaScroll);
        }
    },
    methods:{
        go(path) {
            if(path) {
                window.open(path);
            }
        },
        changeTab(key,index,which) {
            if(key) {
                if(which === 0) {
                    this.frameworkData = this.i18n.minisite.ISULA_FRAMEWORK[key];
                    this.frameworkIndex = index;
                }else {
                    this.documentData = this.i18n.minisite.ISULA_DOCUMENT[key];
                    this.documentIndex = index;
                }
            }
        },
        isulaScroll(value) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 300) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 1000 && scrollTop < 2200) {
                this.activeIndex = 0;
            }else if(scrollTop > 2400){
                this.activeIndex = 1;
            }else {
                return false;
            }
        },
    },
    destroyed () { 
        window.removeEventListener('scroll', this.isulaScroll);
    },
    components: {
        titlenav,
        miniimg,
        minibanner,
        minidesc
    },
}
</script>
<style>
.i-Sula .description .content img {
    width: 139px;
    height: 144px;
}
.i-Sula .link-box {
    width: 552px;
}
@media screen and (max-width: 1120px) {
    .i-Sula .link-box {
        width: 315px;
    }
}
</style>
<style lang="less" scoped>
.i-Sula {
    width: 100%;
}
.i-Sula .framework-desc,.i-Sula .document,.i-Sula .framework-img,
.i-Sula .title,.i-Sula .isula-desc{
    width: 1120px;
    margin: 0 auto;
}
.i-Sula .title {
    font-size: 36px;
    color: #000000;
    line-height: 48px;
    position: relative;
    margin-top: 74px;
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

.i-Sula .desc-box {
    width: 100%;
    background-image: url('/img/minisite/isula/pc-desc-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    .isula-desc {
        p {
            font-size: 18px;
            color: #000000;
            line-height: 48px;
        }
        img {
            width: 720px;
            height: 242px;
            display: block;
            margin: 19px auto 49px auto;
        }
    }
}
.i-Sula .framework-box {
    width: 100%;
    overflow: hidden;
    background: linear-gradient(180deg, #F8FBFF 0%, #FCFDFF 100%);
    .framework-desc {
        .tab-list {
            display: flex;
            flex-direction: row;
            margin: 30px 0 34px 0;
            .item {
                font-size: 20px;
                color: rgba(0, 0, 0, 0.5);
                line-height: 48px;
                margin-right: 50px;
                cursor: pointer;
            }
            .active {
                border-bottom: 4px solid #002FA7;
                color: rgba(0, 0, 0, 0.7);
            }
        }
        .description {
            p {
                font-size: 18px;
                color: rgba(0, 0, 0, 0.7);
                line-height: 48px;
            }
        }
        .indent {
            p {
                text-indent: 10px;
                &:first-of-type,&:nth-of-type(2),&:last-of-type {
                    text-indent: 0;
                }
            }
        }
    }
    .framework-img {
        p {
            font-size: 18px;
            color: rgba(0, 0, 0, 0.7);
            line-height: 48px;
        }
        img {
            width: 736px;
            height: 664px;
            display: block;
            margin: 20px auto 50px auto;
        }
        .img-2 {
            width: 607px;
            height: 720px;
        }
        .img-3 {
            width: 1029px;
            height: 301px;
        }
    }
}
.i-Sula .document {
    margin-bottom: 200px;
    .tab-list {
        display: flex;
        flex-direction: row;
        margin: 30px 0 34px 0;
        .item {
            font-size: 20px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 48px;
            margin-right: 50px;
            cursor: pointer;
        }
        .active {
            border-bottom: 4px solid #002FA7;
            color: rgba(0, 0, 0, 0.7);
        }
    }
    .doc-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 940px;
        margin: 0 auto;
        .item {
            width: 280px;
            height: 150px;
            background: #FFFFFF;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            display: flex;
            border-radius: 8px;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
            margin-right: 50px;
            &:nth-of-type(3) {
                margin-right: 0;
                p {
                    font-size: 16px;
                    &:first-of-type {
                        font-size: 18px;
                        margin-bottom: 8px;
                    }
                }
            }
            img {
                width: 100px;
                height: 100px;
                display: block;
                margin: 0 20px 0 30px;
            }
            p {
                color: #002FA7;
                line-height: 28px;
                cursor: pointer;
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .i-Sula .framework-desc,.i-Sula .document,.i-Sula .framework-img,
    .i-Sula .title,.i-Sula .isula-desc{
        width: 100%;
        margin: 0 auto;
    }
    .i-Sula .title {
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
    
    .i-Sula .desc-box {
        background-image: none;
        .isula-desc {
            p {
                width: 315px;
                margin: 0 auto;
            }
            img {
                width: 360px;
                height: 122px;
                margin: 19px auto 40px auto;
            }
        }
    }
    .i-Sula .framework-box {
        .framework-desc {
            .tab-list {
                width: 315px;
                margin: 30px auto 34px auto;
                .item {
                    font-size: 16px;
                    line-height: 26px;
                    margin-right: 16px;
                }
                .active {
                    border-bottom: 2px solid #002FA7;
                    color: #000000;
                }
            }
            .description {
                p {
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.75);
                    line-height: 30px;
                    width: 315px;
                    margin: 0 auto;
                }
            }
            .indent {
                p {
                    text-indent: 0;
                }
            }
        }
        .framework-img {
            p {
                font-size: 16px;
                color: rgba(0, 0, 0, 0.75);
                line-height: 30px;
                width: 315px;
                margin: 0 auto;
            }
            img {
                width: 368px;
                height: 350px;
                margin: 10px auto 20px auto;
            }
            .img-2 {
                width: 365px;
                height: 433px;
            }
            .img-3 {
                width: 371px;
                height: 109px;
            }
        }
    }
    .i-Sula .document {
        margin-bottom: 80px;
        .tab-list {
            width: 315px;
            margin: 30px auto 34px auto;
            .item {
                font-size: 16px;
                line-height: 26px;
                margin-right: 16px;
            }
            .active {
                border-bottom: 2px solid #002FA7;
                color: #000000;
            }
        }
        .doc-list {
            flex-direction: column;
            width: 100%;
            .item {
                margin: 0 auto;
                width: 260px;
                height: 120px;
                margin-bottom: 20px;
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                &:nth-of-type(3) {
                    margin: 0 auto 0 auto;
                    p {
                        font-size: 14px;
                        &:first-of-type {
                            font-size: 16px;
                            margin-bottom: 6px;
                        }
                    }
                }
                img {
                    width: 90px;
                    height: 90px;
                }
                p {
                    line-height: 26px;
                }
            }
        }
    }
}
</style>