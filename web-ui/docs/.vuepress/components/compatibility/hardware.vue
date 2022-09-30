<template>
    <div class="hardware-box">
        <div class="banner">
            <div class="breadcrumb" @click="to">{{i18n.compatibility.COMPATIBILITY}} \</div>
            <div class="banner-title">
                {{i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE}}
            </div>
        </div>
        <div class="hardware-content">
            <div class="hardware-content-top">
                <div class="title">{{i18n.compatibility.HARDWARE_OEC_DETAIL.DISCRIPTION_TITLE}}</div>
                <div class="content">
                    {{i18n.compatibility.HARDWARE_OEC_DETAIL.DISCRIPTION_CONTENT}}
                </div>
            </div>
            <div class="hardware-content-middle">
                <div class="title">{{i18n.compatibility.HARDWARE_OEC_DETAIL.PROCESS_TITLE}}</div>
                <div class="content">
                    <div class="content-item">
                       <div class="left">{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].ID}}</div>
                       <div class="right">
                           <div class="item-title"> {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].TITLE}}</div>
                           <div class="item-content">
                                {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].DESCRIPTION_1}}
                               <a :href="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].A_TEXT" target="_blank">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].A_TEXT}}
                               </a>
                               {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].DESCRIPTION_2}}
                           </div>
                       </div>
                    </div>
                    <div class="content-item">
                       <div class="left">{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].ID}}</div>
                       <div class="right">
                           <div class="item-title"> {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].TITLE}}</div>
                           <div class="item-content">
                                {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].DESCRIPTION_1}}
                               <a :href="'mailto:' + i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT}}
                               </a>
                               {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].DESCRIPTION_2}}
                               <p>{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].DESCRIPTION_3}}
                                    <a :href="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT2" target="_blank">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT2}}
                               </a>
                               </p>
                              
                           </div>
                       </div>
                    </div>
                    <div class="content-item">
                       <div class="left">{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].ID}}</div>
                       <div class="right">
                           <div class="item-title"> {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].TITLE}}</div>
                           <div class="item-content">
                                {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].DESCRIPTION_1}}
                               <a href="/openEuler-compatibility.pdf" download="openEuler兼容性策略介绍.pdf" >
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].A_TEXT}}
                               </a>
                           </div>
                       </div>
                    </div>
                    <div class="content-item">
                       <div class="left">{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].ID}}</div>
                       <div class="right">
                           <div class="item-title"> {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].TITLE}}</div>
                           <div class="item-content">
                                {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].DESCRIPTION_1}}
                               <a target="_blank" :href="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].A_TEXT">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].A_TEXT}}
                               </a>
                               {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].DESCRIPTION_2}}
                           </div>
                       </div>
                    </div>
                    <div class="content-item">
                       <div class="left">{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].ID}}</div>
                       <div class="right">
                           <div class="item-title"> {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].TITLE}}</div>
                           <div class="item-content">
                                {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].DESCRIPTION_1}}
                               <a target="_blank" href="https://gitee.com/src-openeuler/oec-hardware/releases">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_TEXT}}
                               </a>
                               {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].DESCRIPTION_2}}
                                <a href="/openEuler硬件兼容性测试工具使用指南.pdf" download="openEuler硬件兼容性测试工具使用指南.pdf">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_TEXT_2}}
                               </a>
                           </div>
                       </div>
                    </div>
                    <div class="content-item">
                       <div class="left">{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].ID}}</div>
                       <div class="right">
                           <div class="item-title"> {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].TITLE}}</div>
                           <div class="item-content">
                                {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].DESCRIPTION_1}}
                               {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].DESCRIPTION_3}}
                               <a :href="'mailto:' + i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].A_TEXT">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].A_TEXT}}
                               </a>
                               {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].DESCRIPTION_2}}
                           </div>
                       </div>
                    </div>
                    <div class="content-item" v-if="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6]">
                       <div class="left">{{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].ID}}</div>
                       <div class="right">
                           <div class="item-title"> {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].TITLE}}</div>
                           <div class="item-content">
                                {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].DESCRIPTION_1}}
                               <a @click="to">
                                   {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].A_TEXT}}
                               </a>
                               {{i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].DESCRIPTION_2}}
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
           
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        
    },
    methods: {
        to () {
            this.$router.push({
                path: this.resolvePath('/compatibility/')
            })
        },
    },
};
</script>

<style lang="less" scoped>
.hardware-box {
    .banner {
        width: 1120px;
        margin: 0 auto;
        .breadcrumb {
            margin-top: 34px;
            margin-bottom: 16px;
            font-size: 20px;
            color: #002fa7;
            line-height: 30px;
            cursor: pointer;
        }
        .banner-title {
            font-size: 36px;
            line-height: 46px;
            margin-bottom: 104px;
            color: #000;
        }
    }
    .hardware-content {
        width: 1120px;
        margin: 0 auto 200px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 16px;
        line-height: 26px;
        a{
            text-decoration: none;
            color: #002fa7;
            cursor: pointer;
        }
        .hardware-content-top {
            .title{
                font-size: 24px;
                color:#000;
                margin-bottom: 20px;
                line-height: 34px;
            }
            .content {
                font-size: 16px;
                line-height: 26px;
                color: rgba(0, 0, 0, 0.5);
            }
        }
        .hardware-content-middle {
            margin: 40px 0 ;
            .title{
                font-size: 24px;
                color:#000;
                margin-bottom: 20px;
                line-height: 34px;
            }
            .content-item {
                display: flex;
                padding: 30px;
                align-items: center;
                justify-content: left;
                .left {
                    font-size: 48px;
                    color: #002fa7;
                    padding-right: 30px;
                }
                .right {
                    padding-left: 30px;
                    border-left: 1px solid rgba(0, 0, 0, 0.15);
                    .item-title {
                       color: rgba(0, 0, 0, 1);
                       font-size: 20px;
                       line-height: 30px;
                       margin-bottom: 10px;
                    }
                    .item-content {
                        font-size: 16px;
                        line-height: 26px;
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
    }
}

@media (max-width: 1000px) {
.hardware-box {
    .banner {
        width: 100%;
        padding-left:30px;
        padding-right: 30px;
        .breadcrumb {
            display: none;
        }
        .banner-title {
            width: 100%;
            font-size: 24px;
            margin: 40px 0 30px 0;
        }
    }
    .hardware-content {
        width: 100%;
        padding-left: 30px;
        padding-right: 30px;
        margin-bottom: 80px;
        font-size: 14px;
        line-height: 24px;
        .hardware-content-top {
            .title {
                font-size: 14px;
                line-height: 24px;
                font-weight: 400;
            }
        }
        .hardware-content-middle {
            .title {
                font-size: 14px;
                line-height: 24px;
                font-weight: 400;
            }
             .content-item {
                padding: 15px 0;
                .left {
                    font-size: 36px;
                    padding-right: 15px;
                }
                .right {
                    padding-left: 15px;
                    border-left: 1px solid rgba(0, 0, 0, 0.15);
                    .item-title {
                       color: rgba(0, 0, 0, 1);
                       font-size: 14px;
                       line-height: 24px;
                       margin-bottom: 10px;
                    }
                    .item-content {
                        font-size: 14px;
                        line-height: 24px;
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
    }
}
}

</style>
