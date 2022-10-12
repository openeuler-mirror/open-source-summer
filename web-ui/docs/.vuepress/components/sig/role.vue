<template>
    <div class="report-content">
        <common-banner 
        :pc-src="'/img/sig/role-desc.png'" 
        :mobile-src="'/img/sig/role-desc.png'"
        :inside-name="'SIG'"
        :outside-name="i18n.sig.ROLE_DESC.TITLE"
        ></common-banner>
    </div>
</template>

<script>
import commonBanner from './../common/banner.vue';
export default {
    data() {
        return {};
    },
    components: {
        commonBanner
    }
};
</script>
<style lang="less" scoped>
.report-content {
    width: 1200px;
    margin: 0 auto;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 15px;
    }
    .report-banner {
        height: 600px;
        background-color: #002fa7;
        @media (max-width: 1000px) {
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
        @media (max-width: 1000px) {
            display: block;
        }
    }
}
</style>
