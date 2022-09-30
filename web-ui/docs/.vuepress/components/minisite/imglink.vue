<template>
    <div class="link-box">
        <div v-for="(item,index) in dataList" :key="index" @click="go(item.LINK)" >
            <img :src="item.IMG" alt="" />
            <div class="guide" v-if="isShowTip && item.SHOW">
                <div class="d3"></div>
                <p v-if="!isShowH5">{{ mailAddress }}</p>
                <p v-else><span>{{ mailAddress?mailAddress.slice(0,8):'' }}</span><br><span>{{ mailAddress?mailAddress.slice(8):'' }}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isShowTip: false,
        }
    },
    props: ['dataList','mailAddress'],
    methods: {
        go(path) {
            if(path) {
                if(path === 'mail') {
                    this.isShowTip = ! this.isShowTip;
                }else {
                    window.open(path);
                }
            }
        },
    },
    mounted() {
        
    }
}
</script>

<style lang="less" scoped>
.link-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 908px;
    margin: 50px auto;
    &>div {
        position: relative;
    }
    img {
        width: 196px;
        height: 157px;
        display: block;
        cursor: pointer;
    }
    p {
        font-size: 18px;
        color: #000000;
        line-height: 60px;
        padding-bottom: 10px;
    }
    .guide {
        position: absolute;
        box-sizing: border-box;
        border: 1px solid rgba(0, 47, 167, .5);
        width: 300px;
        padding: 10px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
        text-align: left;
        left: 20%;
        top: 94%;
        .d3{
            margin-left: 10px;
            width: 15px;
            height: 15px;
            transform: rotate(45deg);
            border-left: 1px solid rgba(0, 47, 167, .5);
            border-top: 1px solid rgba(0, 47, 167, .5);
            box-sizing: border-box;
            position: relative;
            top: -18px;
            background: #fff;
        }
    }
    @media screen and (max-width: 1120px) {
        flex-direction: column;
        width: 315px;
        align-items: center;
        margin: 40px auto;
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
        p {
            font-size: 16px;
            line-height: 30px;
            &:last-of-type {
                white-space: nowrap;
            }
        }
        .guide {
            width: 220px;
            z-index: 10;
        }
    }
}
</style>