<template>
    <div class="bisheng">
        <div class="banner-box">
            <div class="text">
                <p v-for="(item,index) in i18n.minisite.BISHENG_BANNER_TEXT" :key="index">{{ item }}</p>
            </div>
            <img src="/img/minisite/bisheng/banner.png" alt="" />
        </div>
        <div class="bisheng-desc">
            <div class="desc-list">
                <p v-for="(item,index) in i18n.minisite.BISHENG_DESC" :key="index">{{ item }}</p>
            </div>
            <div class="link-box">
                <div v-for="(item,index) in linkList" :key="index" @click="linkGo(item.LINK_LIST,index)">
                    <img :src="item.IMG" alt="" />
                    <div class="box-text">{{ item.TITLE }}</div>
                    <div class="tip" v-if="index < 3">
                        <div class="d3"></div>
                        <a :href="value.LINK" v-for="(value,key) in item.LINK_LIST" :key="key" target="_blank">{{ value.TEXT }}</a>
                    </div>
                </div>
            </div>
            <div class="more-info">
                <p>{{ i18n.minisite.BISHENG_MORE }}</p>
                <ul class="info-list">
                    <li v-for="(item,index) in i18n.minisite.BISHENG_INFO" :key="index">
                        <span class="theme">{{ item.THEME }}</span>
                        <span>{{ item.BODY }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <miniframe :outsideStr="i18n.minisite.BISHENG_FRAMEWORK.TITLE_OUTSIDE" :insideStr="i18n.minisite.BISHENG_FRAMEWORK.TITLE_INSIDE"
        :descList="i18n.minisite.BISHENG_FRAMEWORK.DESC_LIST" :frameImg="i18n.minisite.BISHENG_FRAMEWORK.FRAMEWORK_IMG" id="framework"></miniframe>
        <minidocs :docsObj="i18n.minisite.BISHENG_LEARN"></minidocs>
        <div class="reference">
            <p class="title">{{ i18n.minisite.BISHENG_REFERENCE.TITLE_OUTSIDE }}<span>{{ i18n.minisite.BISHENG_REFERENCE.TITLE_INSIDE }}</span></p>
            <div class="h5-link" v-if="isShowH5">
                <a :href="item.LINK" v-for="(item,index) in i18n.minisite.BISHENG_REFERENCE.LINK_LIST" :key="index" target="__blank">{{ item.TEXT }}</a>
            </div>
            <div class="link-list list" v-else>
                <div class="item" v-for="(item,index) in i18n.minisite.BISHENG_REFERENCE.LINK_LIST" :key="index" @click="go(item.LINK)">{{ item.TEXT }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import miniimg from './imglink.vue';
import miniframe from './framework.vue';
import minidocs from './document.vue';
export default {
    data () {
        return {
            linkList: []
        }
    },
    mounted () {
        this.linkList = this.i18n.minisite.BISHENG_LINK;
    },
    methods: {
        go(url) {
            window.open(url);
        },
        linkGo(link,index) {
            if ( index >= 3)
            window.open(link)
        }
    },
    components: {
        miniimg,
        miniframe,
        minidocs
    }
}
</script>
<style>
.bisheng .framework-box .framework img {
    width: 1016px;
    height: 650px;
}
.bisheng .document .title span {
    left: 41.7%;
}
@media screen and (max-width: 1120px) {
    .bisheng .framework-box .framework img {
        width: 305px;
        height: 195px;
        margin-bottom: 40px;
    }
    .bisheng .document .title span {
        left: 36%;
    }
    .bisheng .document .docs-list>div:last-of-type {
        margin-bottom: 0;
    }
}
</style>
<style lang="less" scoped>
.bisheng {
    padding-bottom: 200px;
    @media screen and (max-width: 1120px) {
        padding-bottom: 80px;
    }
}
.bisheng .title {
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
    @media screen and (max-width: 1120px) {
        width: 315px;
        font-size: 18px;
        line-height: 18px;
        margin: 0 auto;
        span {
            font-size: 16px;
            line-height: 26px;
            left: 39%;
            top: -17px;
        }
    }
}
.bisheng .list {
    width: 1330px;
    margin: 30px auto 0 auto;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1120px) {
        width: 100%;
    }
}
.bisheng .banner-box {
    width: 1120px;
    margin: 78px auto;
    display: flex;
    justify-content: space-between;
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
                width: 320px;
            }
        }
    }
    img {
        margin-left: 336px;
        width: 500px;
        height: 360px;
    }
    @media screen and (max-width: 1120px) {
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
                    margin: 0;
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
}
.bisheng .bisheng-desc {
    font-size: 18px;
    color: #000000;
    line-height: 48px;
    width:100%;
    background-image: url('/img/minisite/svirt/svirt-bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
    .desc-list,.more-info {
        width: 1120px;
        margin: 0 auto;
    }
    .more-info {
        ul {
            padding: 0 0 50px 20px;
            list-style: disc;
            li {
                color: rgba(0, 0, 0, 0.5);
                span {
                    color: #000000;
                }
                .theme {
                    font-weight: bold;
                }
            }
        }
    }
    @media screen and (max-width: 1120px) {
        font-size: 16px;
        line-height: 30px;
        .desc-list,.more-info {
            width: 315px;
        }

    }
}
.bisheng .link-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1120px;
    margin: 50px auto;
    .box-text {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 20px;
        color: #002FA7;
        top: 105px;
        font-size: 16px;
        @media screen and (max-width: 1120px) {
            top: 90px;
        }

    }
    &>div {
        position: relative;
    }
    &>div:nth-child(2n) {
        .box-text {
            color: #FEB32A;
        }
    }
    &>div:hover .tip {
        display: block;
        z-index: 2;
    }
    img {
        width: 196px;
        height: 157px;
        display: block;
        cursor: pointer;
        // margin-right: 112px;
    }
    .tip {
        display: none;
        position: absolute;
        top: 65%;
        left: 60%;
        width: 143px;
        padding: 30px 0;
        background: #FFFFFF;
        box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 47, 167, 0.5);
        .d3 {
            width: 10px;
            height: 10px;
            transform: rotate(45deg);
            border-left: 1px solid rgba(0, 47, 167, .5);
            border-top: 1px solid rgba(0, 47, 167, .5);
            box-sizing: border-box;
            position: absolute;
            top: -6px;
            left: 20px;
            background: #fff;
        }
        a {
            font-size: 16px;
            color: #000000;
            line-height: 18px;
            display: block;
            text-align: center;
            text-decoration: none;
            margin-bottom: 20px;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
        a:hover {
            color: #002FA7;
        }
    }
    .hidden {
        display: none !important;
    }
    
    @media screen and (max-width: 1120px) {
        flex-direction: column;
        width: 315px;
        align-items: center;
        margin: 40px auto;
        .tip {
            left: 40%;
            z-index: 200;
        }
        &>div {
            margin-bottom: 21px;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
        img {
            width: 176px;
            height: 141px;
        }
    }
}

.bisheng .reference {
    padding-top: 124px;
    .link-list {
        .item {
            cursor: pointer;
            width: 410px;
            padding: 16px 0;
            background: #FFFFFF;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            font-size: 18px;
            color: #000000;
            text-align: center;
            line-height: 28px;
            &:hover {
                color: #FFFFFF;
                background: #002FA7;
            }
        }
    }
    @media screen and (max-width: 1120px) {
        padding-top: 57px;
        .h5-link {
            margin-top: 37px;
            a {
                display: block;
                color: #002FA7;
                text-align: center;
                margin-bottom: 30px;
                text-decoration: none;
                font-size: 16px;
                line-height: 30px;
                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>