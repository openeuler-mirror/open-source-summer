<template>
    <div v-if="!isShowH5" v-show="isShow" class="anchor-wrapper">
        <div class="box-line">
                <img class="gif" v-lazy="'/img/summit/home/nav.gif'" alt="" />
                <img class="line" alt="" />
        </div>
        <div class="nav-text">
            <ul>
                <li v-for="(item,index) in computedAnchorList" :class="index === currentIndex?'active':''" :key="index">
                    <a @click="scroll(item.offsetTop)">
                        <div><div class="inside"></div></div>
                        <div>{{ item.name }}</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
            scrollTop: 0,
            isShow: !this.reserveOffsetTop
        };
    },
    props: {
        anchorList: {
            type: Array,
            default: function () {
                return [];
            }
        },
        reserveOffsetTop: {
            type: Number,
            default: function () {
                return 0;
            }
        }
    },
    mounted() {
        !this.isShowH5 && window.addEventListener('scroll',this.scroTop);
    },
    computed: {
        computedAnchorList: function () {
            return this.anchorList.map((item, index) => {
                item.offsetTop = document.querySelector('#' + item.anchorId).offsetTop;
                if (index) {
                    item.offsetRange = [this.anchorList[index - 1].offsetTop, item.offsetTop];
                } else {
                    item.offsetRange = [0, item.offsetTop];
                }
                
                return item;
            })
        }
    },
    methods: {
        scroll(offsetTop) {
            window.scrollTo(0, offsetTop - 30);
        },
        scroTop() {

            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            (this.scrollTop < this.reserveOffsetTop) ? (this.isShow = false) : (this.isShow = true);
            this.anchorList.forEach((item, index) => {
                if((item.offsetRange[0] <= this.scrollTop) && (this.scrollTop < item.offsetRange[1])) {
                    this.currentIndex = index;
                }
            })
        }
    },
    destroyed () { 
        window.removeEventListener('scroll', this.scroTop);
    } 

};
</script>

<style lang="less" scoped>
.anchor-wrapper {
    position: fixed;
    cursor: pointer;
    top: 170px;
    right: 70px;
    z-index: 1000;
    display: block;
    
    .box-line {
        width: 70px;
        margin-left: -26px;
        .gif {
            width: 70px;
            height: 70px;
            margin: 0 auto -30px auto;
            position: relative;
            z-index: 20;
        }
        .line {
            display: block;
            width: 2px;
            height: 441px;
            margin: 0 auto;
            visibility: hidden;
        }
    }
    .nav-text {
        position: relative;
        margin-top: -375px;
        &::before {
            content: "";
            display: block;
            position: absolute;
            width: 1px;
            border-left: 1px solid;
            left: 8px;
            height: calc(100% + 147px);
            top: -70px;
            border-image: linear-gradient(#747373,#fff) 30 30;
        }
        ul li a>div {
            display: inline-block;
            &:first-of-type {
                margin-right: 17px;
                border-radius: 50%;
                width: 18px;
                position: relative;
                background: #FFFFFF;
                height: 18px;
                border: 1px solid #979797;
                div {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #D8D8D8;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -7px;
                    margin-top: -7px;
                }
            }
            &:last-of-type {
                font-size: 20px;
                color: #000000;
                line-height: 30px;
            }
        }
        ul li {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
        }
        ul .active {
            & a>div {
                color: #002FA7 !important;
            }
            .inside {
                background: #002FA7;
            }
        }
        ul li>a{
            text-decoration: none;
        }
    }
    @media screen and (max-width: 1120px) {
        display: none;
    }
}
</style>
