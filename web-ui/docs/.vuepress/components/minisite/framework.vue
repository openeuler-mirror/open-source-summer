<template>
    <div class="framework-box">
        <div class="framework">
            <p class="title">{{ outsideStr }}<span>{{ insideStr }}</span></p>
            <div class="framework-desc">
                <p v-for="(item,index) in descList" :key="index">{{ item }}</p>
            </div>
            <img :src="frameImg" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['outsideStr','insideStr','descList','frameImg']
}
</script>

<style lang="less" scoped>
.framework-box {
    width: 100%;
    overflow: hidden;
    background: linear-gradient(180deg, #F8FBFF 0%, #FCFDFF 100%);
    .framework {
        margin-top: 74px;
        .title {
            width: 1120px;
            margin: 0 auto 30PX;
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
        .framework-desc {
            width: 1120px;
            margin: auto;
            p {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.7);
                letter-spacing: 0;
                line-height: 32px;
            }
        }
        img {
            width: 1117px;
            margin: 0 auto 50px auto;
            display: block;
        }
    }
    @media screen and (max-width: 1120px) {
        .framework {
            margin-top: 57px;
            .title {
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
            .framework-desc {
                width: 100%;
                margin: 30px 0 20px 0;
                padding: 0 30px;
                p {
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.75);
                    line-height: 30px;  
                }
            }
            img {
                width: 330px;
                margin: 0 auto;
            }
        }
    }
}
</style>