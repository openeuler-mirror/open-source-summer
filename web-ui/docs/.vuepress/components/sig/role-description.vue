<!-- 角色说明 -->
<template>
    <div class="role-description">
        <common-banner 
        :pc-src="'/img/sig/roledescription-banner.png'"
        :mobile-src="'/img/sig/roledescription-banner.png'"
        :inside-name="'SIG'"
        :outside-name="i18n.sig.ROLE_DESCRIPTION.ROLE_DESCRIPTION"
        ></common-banner>
        <div :class="['role-table',language == '/en/'?'en-table':'']">
            <h2 :id="h2Id">{{i18n.sig.ROLE_DESCRIPTION.TABLE_TITLE}}</h2>
            <p class="table-description">{{i18n.sig.ROLE_DESCRIPTION.TABLE_DESCRIPTION}}</p>
            <table class="table-box">
                <thead>
                    <tr>
                        <th v-for="(item,index) in theadList" :key="index">{{item}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tbodyList" :key="index">
                        <td style="text-align:left;">{{item.ROLE}}</td>
                        <td style="text-align:left;">{{item.RESPONSIBILITIES}}</td>
                        <td style="text-align:left;">{{item.REQUIREMENT}}</td>
                        <td style="text-align:left;">{{item.DEFINED_DOCUMENT}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="table-card">
               <div class="card-box" v-for="(item,index) in tbodyList" :key="index">
                   <p><span>{{theadList?theadList[0] + ':':''}}</span><span>{{item.ROLE}}</span></p>
                   <p><span>{{theadList?theadList[1] + ':':''}}</span><span>{{item.RESPONSIBILITIES}}</span></p>
                   <p><span>{{theadList?theadList[2] + ':':''}}</span><span>{{item.REQUIREMENT}}</span></p>
                   <p><span>{{theadList?theadList[3] + ':':''}}</span><span>{{item.DEFINED_DOCUMENT}}</span></p>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import commonBanner from './../common/banner.vue';
export default {
    data () {
        return {
            theadList:[],
            tbodyList:[],
            language:'',
            h2Id:''
        }
    },
  components: {
        commonBanner
    },
    created () {
      this.language = this.$lang === "zh" ? "/zh/" : "/en/";
    },
    mounted () {
        this.theadList = this.i18n.sig.ROLE_DESCRIPTION.TABLE_THEAD;
        this.tbodyList = this.i18n.sig.ROLE_DESCRIPTION.TABLE_TBODY;
        this.h2Id = this.i18n.sig.ROLE_DESCRIPTION.TABLE_TITLE;
    }
}

</script>

<style lang='less'>
.role-description{
    width: 1120px;
    margin: 0 auto;
    margin-top: 60px;
    .role-table{
        .table-card{
            display: none;
        }
        h2{
            line-height: 24px;
            font-size: 24px;
            margin: 40px 0 20px;
            
            font-weight: normal;
        }
        .table-description{
            font-size: 14px;
            color: rgba(0,0,0,0.5);
            line-height: 24px;
            
            letter-spacing: 0.8px;
        }
        .table-box{
            width: 1120px;
            thead{
                background: rgba(0, 0, 0, 0.05);
                tr{
                    height: 60px;
                    font-size: 16px;
                    
                    font-weight: normal;
                    color: #000000;
                    line-height: 16px;
                    width: 1120px;
                    display: flex;
                    th{
                        padding: 22px 0 22px 30px;
                        &:first-of-type,&:nth-of-type(2){
                            flex: 1;
                        }
                        &:nth-of-type(3),&:last-of-type{
                            flex: 2;
                        }
                    }
                }
            }
            tbody{
                tr{
                    width: 1120px;
                    display: flex;
                    height: 56px;
                    font-size: 14px;
                    
                    font-weight: normal;
                    color: rgba(0, 0, 0, 0.5);
                    line-height: 16px;
                    &:nth-of-type(2){
                        background: rgba(0, 0, 0, 0.03);
                    }
                    td{
                        padding: 20px 0 20px 30px;
                        &:first-of-type,&:nth-of-type(2){
                            flex: 1;
                        }
                        &:nth-of-type(3),&:last-of-type{
                            flex: 2;
                        }
                    }
                }
            }
        }
    }
    .en-table{
        
        .table-description{
            
            font-weight: normal;
        }
        .table-box{
            thead{
                tr{
                    th{
                         &:first-of-type{
                             flex: 0.5;
                         }
                    }
                }
            }
            tbody{
                tr{
                    td{
                         &:first-of-type{
                             flex: 0.5;
                         }
                    }
                }
            }
        }
    }
}
@media (max-width: 1000px) {
    .content .markdown p,.content .markdown a,.content .markdown ul li {
        word-break: normal;
    }
    .role-description{
        width: 100%;
        position: relative;
        padding: 0 30px;
        margin-top: 0px;
        margin-bottom: 80px;
        .role-table{
            margin-top: 40px;
            h2{
                display: none;
            }
            .table-description{
                font-size: 14px;
                
                font-weight: normal;
                color: rgba(0, 0, 0, 0.5);
                line-height: 24px;
                margin-bottom: 40px;
            }
            .table-box{
                display: none;
            }
            .table-card{
                display: block;
                .card-box{
                    width: 100%;
                    padding: 20px;
                    font-size: 12px;
                    
                    font-weight: normal;
                    color: #000000;
                    line-height: 16px;
                    &:first-of-type,&:last-of-type{
                        background: rgba(0, 0, 0, 0.05);
                    }
                    p{
                        margin-top: 12px;
                        &:first-of-type{
                            margin-top: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
