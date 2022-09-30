<template>
    <div class="description" :class="{'other': isOther}">
        <div class="other-desc" v-if="isOther">
            <div>
                <p v-for="(item,index) in descArr" :key="index">{{ item }}</p>
            </div>
        </div>
        <div class="content" v-else>
            <div class="text">
                <p v-for="(item,index) in descArr" :key="index">{{ item }}</p>
            </div>
            <img :src="descImg" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['isOther',"descArr",'descImg'],


}
</script>

<style lang="less" scoped>
.description {
    width: 1120px;
    margin: 0 auto;
    .content {
        display: flex;
        flex-direction: row;
        margin-bottom: 40px;
        .text {
            width: 854px;
            p {
                font-size: 18px;
                line-height: 48px;
                color: #000000;
            }
        }
        img {
            width: 186px;
            height: 186px;
            display: block;
            margin-left: 40px;
        }
    }
    .other-desc {
        width: 100%;
        background-image: url('/img/minisite/atune/desc-bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 244px;
        display: flex;
        justify-content: center;
        align-items: center;
        &>div {
            width: 877px;
        }
        p {
            color: #FFFFFF;
            line-height: 48px;
            font-size: 18px;
        }
    }
    @media screen and (max-width: 1120px) {
        width: 315px;
        .content {
            flex-direction: column-reverse;
            justify-content: center;
            .text {
                width: 315px;
                p {
                    font-size: 16px;
                    line-height: 30px;
                }
            }
            img {
                width: 100px;
                height: 100px;
                margin: 0 auto 20px auto;
            }
        }
        .other-desc {
            height: 290px;
            background-image: url('/img/minisite/atune/desc-mobile.png');
            p {
                width: 315px;
                margin: 0 auto;
                line-height: 30px;
                font-size: 14px;
                text-align: center;
            }
        }
    }
}
.other {
    width: 100% !important;
    @media screen and (max-width: 1120px) {
        width: 100% !important;
    }
}
</style>