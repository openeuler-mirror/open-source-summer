<template>
    <div class="secgear">
        <div class="banner-box">
            <div class="text">
                <p v-for="(item,index) in i18n.minisite.SECGEAR_BANNER_TEXT" :key="index">{{ item }}</p>
            </div>
            <img src="/img/minisite/secgear/banner.png" alt="" />
        </div>
        <minidesc :isOther="true" :descArr="i18n.minisite.SECGEAR_DESC"></minidesc>
        <miniframe :outsideStr="i18n.minisite.SECGEAR_FRAMEWORK.TITLE_OUTSIDE" :insideStr="i18n.minisite.SECGEAR_FRAMEWORK.TITLE_INSIDE"
        :descList="i18n.minisite.SECGEAR_FRAMEWORK.DESC_LIST" :frameImg="i18n.minisite.SECGEAR_FRAMEWORK.FRAMEWORK_IMG" id="framework"></miniframe>
        <minidocs :docsObj="i18n.minisite.SECGEAR_DOCUMENT" id="document"></minidocs>
    </div>
</template>

<script>
import miniframe from './framework.vue';
import minidesc from './description.vue';
import minidocs from './document.vue';
export default {
    data () {
        return {

        }
    },
    components: {
        miniframe,
        minidesc,
        minidocs
    }
}
</script>
<style>
.secgear .document .docs-list {
    width: 1045px;
    justify-content: flex-start;
    flex-direction: row;
}
.secgear .document .docs-list .item {
    width: 315px;
    height: 150px;
}
.secgear .document .docs-list .item img {
    margin-right: 20px;
}
.secgear .document .docs-list .item {
    margin-bottom: 40px;
}
.secgear .description .other-desc > div {
    width: 1037px;
}
.secgear .framework-box .framework img {
    width: 632px;
    height: 654px;
}
@media screen and (max-width: 1120px) {
    .secgear .description .other-desc > div {
        width: 310px;
    }
    .secgear .framework-box .framework img {
        width: 316px;
        height: 327px;
    }
    .secgear .document .docs-list {
        width: 100%;
        flex-direction: column;
    }
}
</style>
<style lang="less" scoped>
.secgear {
    padding-bottom: 160px;
    @media screen and (max-width: 1120px) {
        padding-bottom: 80px;
    }
}
.secgear .banner-box {
    width: 1018px;
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
            }
        }
    }
    img {
        margin-left: 165px;
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
</style>