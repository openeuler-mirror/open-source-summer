<template>
    <div class="community-search">
        <h3>{{i18n.community.SERVICE.DOWN.DOWN_CARD}}</h3>
        <div class="searching" v-if="invalidUrl && downFail">
            <div>{{i18n.community.SERVICE.DOWN.OUTLINE_DOWN_TIP}}</div>
            <div class="searching-content">
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
        <div v-if="!invalidUrl && downFail" class="invalid-url">
            <span>{{i18n.community.SERVICE.DOWN.DOWN_FAIL_DISC_LEFT}}</span>
            <span @click="jumpSendCode" class="down">{{i18n.community.SERVICE.DOWN.DOWN_CARD}}</span>
            <span>{{i18n.community.SERVICE.DOWN.DOWN_FAIL_DISC_RIGHT}}</span>
        </div>
    </div>
</template>

<script>
 import { downCard, refleshDownUrl, refleshDownCard } from "../../api/communityService";
export default {
    data () {
        return {
            downFail:false,
            messageTip:{
                success:true,
                text:""
            },
            VerificationCode:"",
            buttonText:this.i18n.community.SERVICE.SEARCH.SEND_CODE,
            searching:true,
            invalidUrl:false,
            paParams:"",
            isSend:false,
            waitSendtimer:null,
        }
    },
    methods:{
        changeTipMessage(res){
            this.messageTip.text = res.message
            this.messageTip.success = res.success
        },
        getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        jumpSendCode(){
            refleshDownUrl({PA:this.paParams},this.$lang).then(res=>{
                this.changeTipMessage(res)
                if(res.success){
                    this.invalidUrl = true
                    this.searching = true
                    this.isSend = true
                    this.waitSend()
                } else {
                    this.$message.error(res.message)
                }
            }).catch(rej=>{
                this.isSend = false
            })
        },
        waitSend(){
            let num = 60
            this.waitSendtimer = setInterval(()=>{
                num--
                this.buttonText = `${this.i18n.community.SERVICE.SEARCH.SEND_AGAIN}（${num}）`
                if(num==0){
                    clearInterval(this.waitSendtimer)
                    this.isSend = false
                    this.messageTip.text = ""
                    this.buttonText = this.i18n.community.SERVICE.SEARCH.SEND_CODE
                }
            },1000)
        },
        sendCode(){
            if(this.isSend){
                return
            }
            this.jumpSendCode()
        },
        submit(){
            refleshDownCard({PA:this.paParams,code:this.VerificationCode},this.$lang).then(res=>{
                if(res.success){
                    this.getPA(res.data.signInfo)
                }else{
                    this.messageTip.text = res.messageTip
                }
            })
        },
        getPA(val){
            let pa = val || this.getQueryString("PA")
            if(pa){
                downCard({PA:pa},this.$lang).then(res=>{
                    if(res.success){
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
                        function blobToFile (theBlob, fileName){
                            theBlob.lastModifiedDate = new Date();
                            theBlob.name = fileName;
                            return theBlob;
                        }
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
                        this.invalidUrl = false
                        this.downFail = true
                        this.paParams = pa
                    }
                })
            }
        }
    },
    created () {
        this.getPA()
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
    }
}
</style>
