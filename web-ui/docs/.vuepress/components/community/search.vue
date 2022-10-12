<!-- 证书查询 -->
<template>
    <div class="community-search">
        <h3>{{searching?i18n.community.SERVICE.SEARCH.SEARCH:i18n.community.SERVICE.DOWN.DOWN_CARD}}</h3>
        <div class="searching" v-if="searching">
            <div>{{i18n.community.SERVICE.SEARCH.SEARCH_DISC}}</div>
            <div class="searching-content">
                <div class="email">
                    <el-input
                        :placeholder="i18n.community.SERVICE.SEARCH.EMAIL_PLAHD"
                        v-model="emailAddress"
                        clearable
                    ></el-input>
                </div>
                <div class="number">
                    <el-input 
                        v-model="VerificationCode"
                        :placeholder="i18n.community.SERVICE.SEARCH.CODE_PLAHD"
                        clearable
                    ></el-input>
                    <el-button class="send-buttom button" :class="isSend?'is-send':''" type="primary" size="medium" plain @click="sendCode">{{buttonText}}</el-button>
                    <div class="send-tip" :class="messageTip.success?'':'send-tip-error'">{{messageTip.text}}</div>
                </div>
                <el-button class="button" @click="submit" type="primary" size="medium">{{i18n.community.SERVICE.BTNSURE}}</el-button>
            </div>
        </div>
        <div class="searching" v-else>
            <div>{{i18n.community.SERVICE.DOWN.SEARCH_RESULTS}}</div>
            <div class="get-cred" v-if="credent.length">
                <div @click="showInfo(item)" class="get-cred-item" v-for="(item,index) in credent" :key="index">
                    <img :src="item.iconUrl" alt="">
                    <div class="get-cred-item-disc">
                        <div v-for="title in item.title" :key="title">{{title}}</div>
                    </div>
                    <div class="check" :class="item.check?'blue-border':''" v-if="showCheck">
                        <span class="is-check" v-if="item.check"></span>
                    </div>
                </div>
            </div>
            <div class="not-cred" v-else>{{i18n.community.SERVICE.DOWN.NO_CARD}}</div>
            <div class="dowm-cred" v-if="credent.length && usePC">
                <el-button class="button" @click="hanndelcheck" type="primary" size="medium">{{showCheck?i18n.community.SERVICE.DOWN.DOWN_CHOOSE_CARD:i18n.community.SERVICE.DOWN.DOWN_CARD}}</el-button>
            </div>
        </div>
        <div class="show-template" v-if="showTemplate" @click="showTemplate=false">
            <img :src="previewImage" alt="">
        </div>
    </div>
</template>

<script>
 import { getCode, searchCard, downCard } from "../../api/communityService";
export default {
    data () {
        return {
            previewImage:"",
            identification:"",
            messageTip:{
                success:true,
                text:""
            },
            usePC:false,
            emailAddress:"",
            VerificationCode:"",
            buttonText:this.i18n.community.SERVICE.SEARCH.SEND_CODE,
            searching:true,
            invalidUrl:false,
            isOutline:false,
            paParams:"",
            credent:[],
            isSend:false,
            showTemplate:false,
            showCheck:false,
            waitSendtimer:null,
        }
    },
    methods:{
        changeTipMessage(res){
            this.messageTip.text = res.message
            this.messageTip.success = res.success
        },
        hanndelcheck(){
            if(this.showCheck){
                this.credent.forEach(item=>{
                    if(item.check){
                        downCard({PA:item.signInfo},this.$lang).then(res=>{
                            if(res.success){
                                //将base64转换为blob
                                function dataURLtoBlob (dataurl) { 
                                    var arr = dataurl.split(','),
                                        mime = arr[0].match(/:(.*?);/)[1],
                                        bstr = atob(arr[1]),
                                        n = bstr.length,
                                        u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    return new Blob([u8arr], { type: mime });
                                }
                                //将blob转换为file
                                function blobToFile (theBlob, fileName){
                                    theBlob.lastModifiedDate = new Date();
                                    theBlob.name = fileName;
                                    return theBlob;
                                }
                                //调用
                                let str = "data:application/pdf;base64," + res.data.data
                                var blob = dataURLtoBlob(str);
                                var file = blobToFile(blob, "zs");
                                let href = URL.createObjectURL(file)
                                let downloadElement = document.createElement("a")
                                downloadElement.href = href
                                downloadElement.download = res.data.fileName
                                document.body.appendChild(downloadElement)
                                downloadElement.click()
                                document.body.removeChild(downloadElement)
                            }else{
                                this.$message.error(res.message)
                            }
                        })
                    }
                })
            }
            if(this.usePC){
                this.showCheck = true
            }
        },
        showInfo(item){
            if(this.showCheck){
                item.check = !item.check
            }else{
                this.previewImage = item.imageUrl
                if(item.imageUrl){
                    this.showTemplate = true
                }
            }
        },
        waitSend(){
            let num = 60
            this.waitSendtimer = setInterval(()=>{
                num--
                this.buttonText = `${this.i18n.community.SERVICE.SEARCH.SEND_AGAIN}（${num}）`
                if(num==0){
                    clearInterval(this.waitSendtimer)
                    this.waitSendtimer = null
                    this.messageTip.text = ""
                    this.isSend = false
                    this.buttonText = this.i18n.community.SERVICE.SEARCH.SEND_CODE
                }
            },1000)
        },
        sendCode(){
            if(this.isSend || !this.emailAddress){
                return
            }
            this.isSend = true
            getCode(this.emailAddress,this.$lang).then(res => {
                this.changeTipMessage(res)
                if(res.success){
                    this.identification = res.data.identification
                    this.waitSend()
                }else{
                    this.isSend = false
                }
            }).catch(rej => {
                this.isSend = false
            });
        },
        submit(){
            if(!this.VerificationCode || !this.emailAddress){
                return
            }
            searchCard({
                identification: this.identification,
                code: this.VerificationCode
            },this.$lang).then(res=>{
                if(res.success){
                    res.data.forEach(item=>{
                        item.check = false
                        item.iconUrl= "/api-certification/"+ item.iconUrl
                        item.imageUrl= "/api-certification/"+ item.imageUrl
                    })
                    this.credent = res.data || []
                    this.searching = false
                    this.messageTip.text = ""
                }else{
                    this.$message.error(res.message)
                }
            }) 
        },
        IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            this.usePC = flag;
        }
    },
    created(){
        this.IsPC()
    },
    beforeDestroy(){
        clearInterval(this.waitSendtimer)
        this.waitSendtimer = null
    }
}
</script>

<style lang='less' scoped>
.community-search{
    width: 1120px;
    margin: 0 auto;
    font-size: 16px;
    font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
    .invalid-url{
        .down{
            color: #002FA7;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0 30px;
        height: unset;
        font-size: 14px;
        line-height: 24px;
    }
    .show-template{
        position: fixed;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
        z-index: 2001;
        img{
            width: calc(100% - 60px);
            max-width: 634px;
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
    .button{
        height: 40px;
        padding: 11px 30px;
    }
    h3{
        padding: 60px 0;
        font-size: 36px;
        color: #000000;
        @media screen and (max-width: 768px) {
            padding: 40px 0;
            font-size: 18px;
        }
    }
    .searching{
        padding-bottom: 180px;
        @media screen and (max-width: 768px) {
            padding-bottom: 80px;
        }
        .searching-content{
            margin: 0 auto;
            margin-top: 40px;
            text-align: center;
            width: 400px;
            @media screen and (max-width: 768px) {
                width: 100%;
                margin-top: 30px;
            }
            /deep/.el-input__inner{
                color: rgba(0, 0, 0, 0.5);
                height: 40px;
                border: 1px solid rgba(0, 0, 0, 0.5);
            }
            /deep/.el-input__inner::-webkit-input-placeholder{
                color:  rgba(0, 0, 0, 0.25);
            }
            .email{
                margin-bottom: 20px;
                @media screen and (max-width: 768px) {
                    margin-bottom: 16px;
                }
            }
            .number{
                margin-bottom: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                .send-tip{
                    position: absolute;
                    bottom: -25px;
                    font-size: 14px;
                    color: #002FA7;
                    @media screen and (max-width: 768px) {
                        bottom: -35px;
                    }
                }
                .send-tip-error{
                    color: #CD0000 !important;
                }
                .send-buttom{
                    margin-left: 10px;
                    background-color: #FFF;
                    color: #002FA7;
                    @media screen and (max-width: 768px) {
                        padding: 10px 9px;
                    }
                }
                .send-buttom:hover{
                    background-color: #FFF;
                }
                .send-buttom:focus{
                    background-color: #FFF;
                }
                .is-send.send-buttom{
                    color: rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(0, 0, 0, 0.5);
                }
                .is-send.send-buttom:hover{
                    background-color: #FFF;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                }
                .is-send.send-buttom:focus{
                    background-color: #FFF;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                }
            }
        }
        .not-cred{
            color: #CD0000;
            margin-top: 20px;
        }
        .get-cred{
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            @media screen and (max-width: 768px) {
                margin-top: 30px;
                flex-direction: column;
            }
            .get-cred-item{
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
                position: relative;
                &-disc{
                    text-align: center;
                    font-size: 18px;
                    color: #333333;
                    line-height: 28px;
                }
                @media screen and (max-width: 768px) {
                    padding-top: 20px;
                    font-size: 14px;
                    margin-bottom: 76px;
                    height: 166px;
                    background: #FFFFFF;
                    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
                    border-radius: 7px;
                }
                .blue-border.check{
                    border: 1px solid #002FA7;
                }
                .check{
                    position: absolute;
                    bottom: -36px;
                    left: 50%;
                    transform: translateX(-50%);
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
        .dowm-cred{
            text-align: center;
            margin-top: 50px;
        }
    }
}
</style>
