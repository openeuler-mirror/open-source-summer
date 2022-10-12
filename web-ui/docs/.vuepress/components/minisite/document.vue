<template>
    <div class="document">
        <p class="title">{{ docsObj.TITLE_OUTSIDE }}<span>{{ docsObj.TITLE_INSIDE }}</span></p>
        <div class="docs-list">
            <div class="item" v-for="(item,index) in docsObj.DATA_LIST" :key="index">
                <img :src="item.IMG" alt="" />
                <div>
                    <div class="theme" v-if="item.THEME">{{ item.THEME }}</div>
                    <div>
                        <a :href="value.LINK" v-for="(value,key) in item.LINK" :key="key" target="_blank">{{ value.TEXT }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['docsObj'],
    
}
</script>

<style lang="less" scoped>
.document {
    padding-top: 74px;
    .title {
        font-size: 36px;
        color: #000000;
        line-height: 48px;
        position: relative;
        text-align: center;
        width: 1120px;
        margin: 0 auto;
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
    .docs-list {
        width: 1330px;
        margin: 30px auto 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
            margin-right: 50px;
            width: 410px;
            padding: 25px 0 25px 50px;
            background: #FFFFFF;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            display: flex;
            justify-content: start;
            align-items: center;
            font-size: 18px;
            color: #000000;
            line-height: 28px;
            img {
                width: 120px;
                height: 120px;
                display: block;
                margin-right: 50px;
            }
            div {
                a {
                    font-size: 16px;
                    color: #002FA7;
                    display: block;
                    text-decoration: none;
                    margin-bottom: 10px;
                }
            }
            .theme {
                margin-bottom: 20px;
            }
            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }
    }
    @media screen and (max-width: 1120px) {
        padding-top: 57px;
        .title {
            width: 315px;
            font-size: 18px;
            line-height: 18px;
            margin: 0 auto;
            span {
                font-size: 16px;
                line-height: 26px;
                left: 45%;
                top: -17px;
            }
        }
        .docs-list {
            flex-direction: column;
            width: 100%;
            .item {
                margin: 0 auto 20px auto;
                width: 315px;
                height: 150px;
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                img {
                    width: 100px;
                    height: 100px;
                    display: block;
                    margin-right: 20px;
                }
                div {
                    a {
                        font-size: 14px;
                        display: block;
                        text-decoration: none;
                        margin-bottom: 8px;
                    }
                }
                .theme {
                    margin-bottom: 10px;
                }
                &:nth-of-type(3n) {
                    margin-right: auto;
                }
            }
        }
    }
}
</style>