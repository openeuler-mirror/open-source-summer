<template>
    <div class="conduct-banner">
        <common-banner
                :pc-src="'/img/community/conduct/conduct-banner.png'"
                :mobile-src="'/img/community/conduct/conduct-banner.png'"
                :inside-name="'COMMUNITY'"
                :outside-name="i18n.community.CONDUCT.TITLE"
        ></common-banner>
    </div>
</template>

<script>
    import commonBanner from './../common/banner.vue';
    export default {
        name: "conduct",
        components: {
            commonBanner
        }
    }
</script>
<style lang="less">
@media screen and (max-width: 1000px) {
    .content .markdown p,.content .markdown a,.content .markdown ul li {
        word-break: normal;
    }
}
</style>
<style lang="less" scoped>
    .conduct-banner {
        width: 1200px;
        margin: 0 auto;
        @media screen and (max-width: 1000px) {
            width: 100%;
            padding: 0 15px;
        }
        .report-banner {
            height: 600px;
            background-color: #002fa7;
        @media screen and (max-width: 1000px) {
            display: none;
        }
    }
        .report-banner-mobile {
            display: none;
            margin-top: 40px;
            h3 {
                text-align: center;
                font-size: 24px;
                
                margin-bottom: 10px;
                height: 34px;
                line-height: 34px;
            }
            div {
                width: 100%;
                height: 200px;
                background-color: #002fa7;
            }
            @media screen and (max-width: 1000px) {
                display: block;
            }
        }
    }
</style>
