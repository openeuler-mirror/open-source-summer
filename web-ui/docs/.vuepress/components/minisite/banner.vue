<template>
    <div class="banner-box">
        <div class="text">
            <p v-for="(item,index) in themeArr" :key="index">{{ item }}</p>
        </div>
        <img :src="mobileImg" alt="" v-if="isShowH5" />
        <video
        preload="auto"
        playsinline="true"
        autoplay="autoplay" loop="loop" muted="muted" id="video" v-else>
            <source :src="videoUrl"  type="video/mp4">
        </video>
    </div>
</template>

<script>
export default {
    props: ['themeArr','mobileImg','videoUrl', 'isShowH5']

}
</script>

<style lang="less" scoped>
.banner-box {
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
        width: 266px;
        height: 216px;
    }
    #video {
        width: 223px;
        height: 224px;
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