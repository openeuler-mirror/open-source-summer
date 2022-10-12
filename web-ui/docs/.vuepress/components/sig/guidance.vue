<template>
    <div class="sig-guidance">
        <div class="sig-banner">
            <common-banner
                :pc-src="'/img/sig/sig-guide-banner.png'"
                :mobile-src="'/img/sig/sig-guide-banner.png'"
                :inside-name="'SIG'"
                :outside-name="i18n.sig.GUIDANCE_LIST.GUIDE.TITLE"
                class="is-pc"
            ></common-banner>
        </div>
        <div class="is-pc sig-guidance" :class="$lang === 'ru'?'ru-guidance':''" v-fade v-if="!isShowH5">
            <div :class="['maillist-divider-mail',$lang === 'ru'?'ru-line':'']">
                <div class="maillist-icon-comm"></div>
            </div>
            <div
                class="mail-guide"
                v-for="(item, index) in i18n.sig.GUIDANCE_LIST.GUIDE.LINE_CONTENT"
                :key="index"
            >
                <div class="step-left">
                    <div class="mail-box">
                        <div class="step-left-box fade-in" :class="[$lang === 'en'?'en-step-box':'',$lang === 'ru'?'ru-step-box':'']">
                            <div class="inner-box">
                                <img :src="item.LEFT.LEFT_IMG" alt />
                                <p v-if="$lang === 'zh'?true:false">{{ item.LEFT.LEFT_INFO }}</p>
                                <p v-else>
                                    <span class="en-desc">{{item.LEFT.LEFT_DESC}}</span>
                                    <span>{{ item.LEFT.LEFT_INFO }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="step-left-num">
                            <span>{{ item.LEFT.LEFT_CIRCLE }}</span>
                        </div>
                        <div class="step-line"></div>
                    </div>
                </div>
                <div class="step-right" :class="$lang == 'en'?'en-step-right':''">
                    <div class="mail-box">
                        <div class="step-line"></div>
                        <div class="step-right-num">
                            <span>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
                        </div>
                        <div class="step-right-box fade-in" :class="[$lang == 'en'?'en-step-box':'',$lang === 'ru'?'ru-step-box':'']">
                            <div class="inner-box">
                                <img :src="item.RIGHT.LEFT_IMG" alt />
                                <p v-if="$lang === 'zh'?true:false" v-html="item.RIGHT.RIGHT_INFO"></p>
                                <p v-else>
                                    <span class="en-desc">{{item.RIGHT.RIGHT_DESC}}</span>
                                    <span v-html="item.RIGHT.RIGHT_INFO"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="is-h5 sig-guidance-H5" v-else>
            <div
                class="mail-guide"
                v-for="(item, index) in i18n.sig.GUIDANCE_LIST.GUIDE.LINE_CONTENT"
                :key="index"
            >
                <div class="step-H5">
                    <div class="step-top">
                        <span :class="$lang === 'en'?'en-font':''">{{ item.LEFT.MOBILE_CIRCLE }}</span>
                    </div>
                    <div class="inner-box">
                        <img :src="item.LEFT.LEFT_IMG" alt />
                        <p>{{ item.LEFT.LEFT_INFO }}</p>
                    </div>
                </div>
                <div class="step-H5">
                    <div class="step-top">
                        <span :class="$lang === 'en'?'en-font':''">{{ item.RIGHT.MOBILE_CIRCLE }}</span>
                    </div>
                    <div class="inner-box">
                        <img :src="item.RIGHT.LEFT_IMG" alt />
                        <p v-html="item.RIGHT.RIGHT_INFO"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "guidance"
}
</script>

<style scoped>
.en-step-box{
    width: 380px !important;
    height: 260px !important;
}
.en-step-box p{
    font-size: 14px !important;
    
    font-weight: 400 !important;
    color: rgba(0, 0, 0, 0.5) !important;
    line-height: 20px !important;
}
.en-step-right{
    margin: -37px 0 !important;
}
.is-h5 {
    display: none;
}
.is-pc {
    display: block;
}
h3 {
    text-align: center;
    font-size: 24px;
}
.sig-guidance {
    max-width: 1200px;
    margin: 0 auto 200px;
}
.ru-guidance .ru-line {
    height: 1557px;
}
.maillist-divider-mail {
    width: 2px;
    left: 50%;
    height: 950px;
    background-image: linear-gradient(
        to top,
        #002fa7 0%,
        #002fa7 50%,
        transparent 50%
    );
    background-size: 2px 11px;
    background-repeat: repeat-y;
    position: absolute;
}
.maillist-icon-comm {
    width: 0;
    height: 0;
    border-width: 15px;
    border-style: solid;
    border-color: #002fa7 transparent transparent transparent;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}
.step-right-box,
.step-left-box {
    width: 380px;
    height: 200px;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
}
.step-left-box.ru-step-box {
    height: 280px;
}
.ru-guidance div:nth-of-type(2) .step-right .ru-step-box {
    height: 300px;
}
.ru-guidance .mail-box {
    height: 320px;
}
.ru-guidance div:nth-of-type(2) .step-left .ru-step-box {
    height: 480px;
}
.ru-guidance div:nth-of-type(3) .step-right .ru-step-box {
    height: 330px;
}
.step-left-box {
    margin-right: 40px;
}
.step-left-box .en-desc,.step-right-box .en-desc{
    font-size: 16px !important;
    
    font-weight: normal !important;
    color: #002FA7 !important;
    line-height: 26px !important;
    display: block;
    margin-bottom: 10px;
}
.step-right-box {
    margin-left: 40px;
}
.step-left {
    z-index: 20;
}
.step-right {
    text-align: right;
    margin: -30px 0;
}
.step-left-num,
.step-right-num {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    background-color: #002fa7;
    display: inline-block;
}
.step-left-num span,
.step-right-num span {
    color: #fff;
    font-size: 20px;
    
}
.step-line {
    width: 107px;
    height: 2px;
    display: inline-block;
    vertical-align: middle;
    border-spacing: 24px;
    background-image: linear-gradient(
        to right,
        #002fa7 0%,
        #002fa7 50%,
        transparent 50%
    );
    background-size: 8px 2px;
    background-repeat: repeat-x;
}
.mail-box {
    padding: 0;
    height: 200px;
}
.mail-box p {
    margin: 0 20px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.5);
}
.inner-box {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.inner-box img {
    margin-left: 30px;
    width: 110px;
    height: 110px;
    flex-shrink: 0;
}

@media screen and (max-width: 1000px) {
    .sig-guidance.is-pc {
        display: none;
    }
    .is-h5 {
        display: block;
    }
    .sig-guidance {
        margin: 40px auto 80px;
    }
    .sig-guidance-H5 {
        margin-bottom: 80px;
    }
    .step-H5 {
        margin: 40px auto;
        text-align: center;
    }
    .step-top {
        margin: 0 auto 20px auto;
    }
    .step-top .en-font {
        
    }
    .step-top span {
        font-size: 17px;
        color: #000000;
        
        font-weight: bold;
    }
    .step-H5 p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
        margin: 10px 20px;
        text-align: justify;
        
    }
    .inner-box {
        width: 315px;
        padding: 10px 0;
        margin: 20px auto 0;
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
    }
}
@media screen and (min-width: 1000px) and (max-width:1120px){
    .step-line{
        width: 22px;
    }
    .sig-guidance {
        max-width: 100%;
    }
}
</style>