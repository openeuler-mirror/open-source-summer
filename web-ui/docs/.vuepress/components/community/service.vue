<!-- 认证服务 -->
<template>
    <div class="community-service">
        <common-banner
            :pc-src="'/img/community/conduct/conduct-banner.png'"
            :mobile-src="'/img/community/conduct/conduct-banner.png'"
            :outside-name="i18n.community.SERVICE.TITLE"
        />
        <div class="connten">
            <div class="community-service-disc">
                <P>{{i18n.community.SERVICE.DOWN.DPSCRIPT_ONE}}</P>
            </div>
            <h3>{{i18n.community.SERVICE.DOWN.GET_CARD}}</h3>
            <div>{{i18n.community.SERVICE.DOWN.GET_CARD_DISC}}</div>
            <div class="get-cred">
                <div 
                    @click="showInfo(item)" 
                    class="get-cred-item" 
                    v-for="(item,index) in i18n.community.SERVICE.DOWN.CARD_MODEL" 
                    :key="index"
                    :class="{'disabel':!item.NEXT_URL}"
                >
                    <div class="filter" v-if="!item.NEXT_URL"></div>
                    <div class="not-open" v-if="!item.NEXT_URL">{{i18n.community.SERVICE.DOWN.NOT_CARDURL}}</div>
                    <img :src="item.IMG" alt="">
                    <div class="get-cred-item-disc">
                        <div>{{item.DISC}}</div>
                        <div>{{item.NAME}}</div>
                    </div>
                </div>
            </div>
            <h3>{{i18n.community.SERVICE.DOWN.DOWN_CARD}}</h3>
            <div>
                {{i18n.community.SERVICE.DOWN.DOWN_CARD_DISC}}
            </div>
            <div class="get-cred">
                <div @click="search" class="get-cred-item down" v-for="(item,index) in i18n.community.SERVICE.DOWN.DOWNCREDENT" :key="index">
                    <img :src="item.IMG" alt="">
                    <div>{{item.NAME}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        showInfo(item){
            if(item.NEXT_URL){
                window.open(item.NEXT_URL, '_blank');
            }
        },
        search(){
            this.$router.push(this.resolvePath("/community/certification-services/search/"));
        }
    }
}

</script>

<style lang='less' scoped>
.community-service{
    width: 1120px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%;
        height: unset;
    }
    /deep/.jump-next-dialog{
        width: 1140px;
        @media screen and (max-width: 768px) {
            width: calc(100vw - 60px);
        }
    }
    .connten{
        margin-top: 70px;
        margin-bottom: 214px;
        font-size: 16px;
        font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.5);
        line-height: 32px;
        @media screen and (max-width: 768px) {
            width: 100%;
            margin-bottom: 80px;
            padding: 0 30px;
            height: unset;
            margin-top: 40px;
            font-size: 14px;
        }
        h3{
            margin: 60px 0 20px 0;
            font-size: 24px;
            color: #000000;
            line-height: 24px;
            @media screen and (max-width: 768px) {
                margin-top: 40px;
                font-size: 16px;
            }
        }
        .get-cred{
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            @media screen and (max-width: 768px) {
                margin-top: 0;
                flex-direction: column;
            }
            .get-cred-item.down{
                justify-content: center;
                line-height: 20px;
                div{
                    margin-top: 8px;
                }
            }
            .get-cred-item.disabel{
                cursor:not-allowed;
                .filter{
                    opacity: .3;
                    top:0;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: #D8D8D8;
                }
                .not-open{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 18px;
                    color: #002FA7;
                }
            }
            .get-cred-item{
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                width: 240px;
                height: 192px;
                box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                padding: 25px 0 20px;
                line-height: 1;
                @media screen and (max-width: 768px) {
                    padding-top: 20px;
                    font-size: 14px;
                    margin-top: 30px;
                    height: 166px;
                    background: #FFFFFF;
                    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
                    border-radius: 7px;
                }
                &-disc{
                    font-family: Roboto-Regular, Roboto;
                    text-align: center;
                    font-size: 16px;
                    color: #333333;
                    line-height: 28px;
                    @media screen and (max-width: 768px) {
                        line-height: 24px;
                    }
                }
                img{
                    width: auto;
                    height: 90px;
                    @media screen and (max-width: 768px) {
                        width: auto;
                        height: 72px;
                    }
                }
            }
        }
    }
    .dialog-content{
        padding: 0 95px 30px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 32px;
        @media screen and (max-width: 768px) {
            padding: 0;
            font-size: 14px;
            line-height: 24px;
        }
        h3{
            font-size: 24px;
            color: #000000;
            text-align: center;
            margin-bottom: 40px;
        }
        .is-flex{
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .user-read{
            margin-top: 30px;
            text-align: center;
            .user-read-btn{
                height: 40px;
                padding: 11px 30px;
            }
            .blue-border.check{
                border: 1px solid #002FA7;
            }
            .check{
                margin-right: 18px;
                width: 20px;
                height: 20px;
                border: 1px solid rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .is-check{
                    border-radius: 50%;
                    width: 12px;
                    height: 12px;
                    background: #002FA7;
                }
            }
        }
    }
}
</style>
