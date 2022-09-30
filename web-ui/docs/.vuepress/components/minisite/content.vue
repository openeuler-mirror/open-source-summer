<template>
    <div class="content-list">
        <div class="content">
            <p class="title">{{ outsideStr }}<span>{{ insideStr }}</span></p>
            <div class="content-desc">
                <h1 class="subtitle">{{subtitle}}</h1>
                <h3 class="list-title">{{listTitle}}</h3>
                <p v-for="(item,index) in descList" :key="index">{{ item }}</p>
            </div>
            <img :src="frameImg" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['outsideStr','insideStr','descList','frameImg','subtitle','listTitle']
}
</script>

<style lang="less" scoped>
.content-list {
    width: 100%;
    overflow: hidden;
    .content {
        margin-top: 30px;
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
        .content-desc {
            width: 1120px;
            margin: auto;
            .subtitle {
                font-size: 32px;
                color: #000000;
                letter-spacing: 0;
                line-height: 32px;
                font-weight: 400;
                margin: 40px 0;
            }
            .list-title {
                font-size: 24px;
                color: #000000;
                letter-spacing: 0;
                line-height: 32px;
                font-weight: 400;
                margin-bottom: 8PX;
            }
            p {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.7);
                letter-spacing: 0;
                line-height: 32px;
            }
        }
        img {
            width: 1117px;
            margin: auto;
            display: block;
        }
    }
    @media screen and (max-width: 1120px) {
        .content {
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
            .content-desc {
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