<template>
    <div class="agenda-carousel"  :class="summitData ? 'summit2021' : ''">
        <div class="agenda-msg">
            <div class="time-list" :class="{'summit_time' :isShowH5 && summitData}">
                <div :id="index== 1 && !summitData? 'goCenter':''" v-for="(item,index) in carouselObj.TIME_LIST" :key="index" :class="{'tea-div':summitData && index === 4}">{{ item }}</div>
            </div>
            <div class="card-list">
                <button
                    class="left"
                    @click="handleBtn('left')"
                    :style="{ background: 'url(' + prev + ') no-repeat center' }"
                ></button>
                <button
                    class="right"
                    @click="handleBtn('right')"
                    :style="{ background: 'url(' + prev + ') no-repeat center' }"
                ></button>
                <div class="shade-remind" v-if="isShowDetail" @click="hideDetail('1')"></div>
                <div class="msg-detail" @click="showDetail('1')" v-if="isShowDetail">
                    <div class="time-box">
                        <p><i></i>{{ detailMsg.TIME }}</p>
                        <p>{{ detailMsg.THEME }}</p>
                    </div>
                    <div class="speaker-box">
                        <i v-if="detailMsg.SPEAKER"></i>
                        <p v-for="(value,key) in detailMsg.SPEAKER" :key="key">{{ value }}</p>
                    </div>
                    <div class="desc-box">
                        <i v-if="detailMsg.DESC"></i>
                        <p v-for="(item,index) in detailMsg.DESC" :key="index" v-if="item">{{ item }}</p>
                    </div>
                </div>
                <div class="card-box">
                    <ul class="card-list" :style="{transform: 'translateX(' + cardPosition + 'px)'}">
                        <li v-for="(item,index) in carouselObj.CARD_LIST" :key="index" >
                            <p class="section" v-for="(values,keys) in item.TITLE" :key="values">{{ values }}</p>
                            <a href="#goCenter" :class="[value.THEME?'card-item':'null-item',{'teacard':key==4 && summitData},{'teacard_mo':key==4 && isShowH5 && summitData}] " v-for="(value,key) in item.ITEM_LIST" :key="key" @click="showDetail(value,1)">
                                <p>{{ value.THEME }}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="sig-content" v-if="sigObj && !summitData">
            <p class="sig-title">{{ sigObj.TITLE }}</p>
            <div class="sig-1" v-if="sigObj.SIG1_TIME">
                <div class="time">
                    {{ sigObj.SIG1_TIME }}
                </div>
                <div class="detail">
                    <span v-for="(item,index) in sigObj.SIG1_DETAIL">{{ item }}</span>
                </div>
            </div>
            <slot name="othersig"></slot>
            <div class="sig-2">
                <div class="shade-remind" @click="hideDetail('2')" v-if="showSigDetail"></div>
                <div class="msg-detail" @click="showDetail('1')" v-if="showSigDetail">
                    <div class="desc-box">
                        <div class="desc" v-if="sigDesc.length">
                            <div class="top-title"><i></i></div>
                            <p v-for="(item,index) in sigDesc" :key="index">{{ item }}</p>
                        </div>
                        <div class="content" v-if="sigContent.length">
                            <div class="top-title"><i></i></div>
                            <p v-for="(item,index) in sigContent" :key="index">{{ item }}</p>
                        </div>
                    </div>
                </div>
                <div class="time">{{ sigObj.SIG2_TIME }}</div>
                <div class="detail">
                    <div v-for="(item,index) in sig2DetailList" @click="showDetail(item,2)" :class="item.CONTENT?'':'not-click'">{{ item.THEME }}</div>
                </div>
            </div>
            <div class="sig-3" v-if="sigObj.SIG3_TIME">
                <div class="time">{{ sigObj.SIG3_TIME }}</div>
                <div class="detail">
                    <span v-for="(item,index) in sigObj.SIG3_DETAIL">{{ item }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            prev: "/img/home/prev.svg",
            carouselObj: {},
            cardPosition: 0,
            cardIndex: 0,
            isShowDetail: false,
            detailMsg: {},
            sigObj: {},
            sigContent: [],
            sigDesc: [],
            showSigDetail: false,
            sig2DetailList: [],
            summitData:false
        }
    },
    props: ['agendaData','sigData'],
    mounted() {
        let agendaObj = this.i18n.interaction.SUMMIT.SUMMIT_HOME_DATA;
        agendaObj = agendaObj.AGENDA;
        this.carouselObj = this.agendaData?this.agendaData:agendaObj.AFTERNOON_AGENDA_25;
        this.sigObj = this.sigData?this.sigData:agendaObj.SIG_CONTENT;
        this.sig2DetailList = this.sigObj.SIG2_DETAIL;
        this.isSummitData()
    },
    methods: {
        isSummitData() {
            if (this.carouselObj.TIME_LIST.length===10) {
                this.summitData=true;
            }
        },
        handleBtn(direction) {
            this.isShowDetail = false;
            if(direction === 'left') {
                if(this.cardIndex <= 0) {
                    this.cardIndex = 0;
                }else {
                    this.cardIndex = this.cardIndex - 1;
                    this.isShowH5?this.cardPosition = this.cardPosition + 220:this.cardPosition = this.cardPosition + 317;
                }
            }else{
                //当最后一列已经是数据的最后一组时不能再往右移
                let screenWidth = document.body.clientWidth;        //为了适配ipad Pro
                if(this.cardIndex >= this.carouselObj.CARD_LIST.length - 3 && screenWidth > 1120) {
                    this.cardIndex = this.carouselObj.CARD_LIST.length - 3;
                }else if(this.cardIndex >= this.carouselObj.CARD_LIST.length - 1 && screenWidth < 1120){
                    this.cardIndex = this.carouselObj.CARD_LIST.length - 1;
                }else {
                    this.cardIndex = this.cardIndex + 1;
                    this.isShowH5?this.cardPosition = this.cardPosition - 220:this.cardPosition = this.cardPosition - 317;
                }
            }
        },
        showDetail(item,which) {
            this.summitData ? this.goCenter():'';
            if(item.THEME && which === 1){
                this.detailMsg = {};
                this.isShowDetail = true;
                this.detailMsg = item;
            }else if(item.CONTENT && which === 2) {
                this.sigContent = item.CONTENT;
                this.sigDesc = item.DESC ? item.DESC : [];
                this.showSigDetail = true;
            }
            else {
                return false;
            }

        },
        goCenter() {
            this.isShowH5 ? document.documentElement.scrollTop = 1900 : document.documentElement.scrollTop = 2800
        },
        hideDetail(which) {
            if(which === '1') {
                this.isShowDetail = false;
            }else {
                this.showSigDetail = false;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.agenda-carousel {
    position: relative;
    margin-top: 50px;
    display: block;
    .shade-remind {
        z-index: 10;
        width: 100%;
        height: 95%;
        background: rgba(0, 0, 0, 0.05);
        position: absolute;
        top: 86px;
    }        
    .msg-detail {
        font-size: 14px;
        color: #000000;
        line-height: 26px;
        z-index: 20;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -225px;
        margin-top: -175px;
        overflow-y: scroll;
        &::-webkit-scrollbar-track {
            border-radius:10px;
            background-color:#F1F1F1;
        }
        &::-webkit-scrollbar {
            width:4px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius:10px;
            background-color:#AFBFE8;
        }
        width: 450px;
        height: 350px;
        background: #FFFFFF;
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 26px;
        .time-box {
            margin-bottom: 18px;
            p {
                &:first-of-type {
                    color: rgba(0, 0, 0, 0.5);
                    line-height: 20px;
                    i {
                        width: 14px;
                        height: 14px;
                        display: inline-block;
                        margin-right: 9px;
                        background: url('/img/summit/home/time.svg') no-repeat center center;
                        margin-bottom: -2px;
                    }
                }
            }
        }
        .speaker-box {
            margin-bottom: 16px;
            i {
                width: 16px;
                height: 16px;
                display: block;
                margin-bottom: 8px;
                background: url('/img/summit/home/speaker.svg') no-repeat center center;
            }
        }
        .desc-box {
            .top-title {
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                span {
                    letter-spacing: 1px;
                    color: rgba(0, 0, 0, 0.5);
                }
            }
            i {
                width: 18px;
                height: 18px;
                display: inline-block;
                margin-right: 6px;
            }
            .desc {
                margin-bottom: 20px;
            }
            .content i {
                background: url('/img/summit/home/content.svg') no-repeat center center;
            }
            .desc i {
                background: url('/img/summit/home/desc.svg') no-repeat center center;
            }
        }
    }
    button {
        width: 20px;
        height: 40px;
        z-index: 10;
        background: none;
        display: block;
        border: 0;
        outline: none;
        cursor: pointer;
        position: absolute;
        transition: transform 0.5s ease-in-out;
        top: 13px;
    }
    .agenda-msg {
        display: flex;
        flex-direction: row;
        .time-list {
            margin-top: 130px;
            position: relative;
            z-index: 10;
            background-color: white;
            margin-right: -20px;
            div {
                width: 150px;
                height: 156px;
                line-height: 156px;
                margin-top: 40px;
                font-size: 18px;
                height: 150px;
                margin-bottom: 36px;
                margin-top: 0;
                line-height: 150px;
                color: rgba(0, 0, 0, 0.5);
            }
            .tea-div {
                height: 60px;
                line-height: 60px;
            }
        }
        .card-list {
            position: relative;
            width: calc(100% - 150px);
            display: block;
            margin-top: 25px;
            .left {
                left: 45px;
            }
            .right {
                right: 15px;
                transform: rotateZ(-180deg);
            }
            .card-box {
                width: 100%;
                overflow: hidden;
                .card-list {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    margin-top: 8px;
                    transition: 0.5s ease-in-out;
                    li {
                        margin-left: 47px;
                        .null-item {
                            // width: 260px;
                            // height: 156px;
                             width: 270px;
                            height: 150px;
                            border-radius: 8px;
                            overflow: hidden;
                            margin-bottom: 36px;
                            box-shadow: none;
                            // cursor: pointer;
                            // &:hover {
                            //     box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
                            // }
                            p {
                                font-size: 18px;
                                color: rgba(0, 0, 0, 0.85);
                                line-height: 30px;
                                
                                margin: 30px;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                height: 90px;
                                width: 210px;
                            }
                        }
                        .section {
                            font-size: 20px;
                            
                            color: #000000;
                            line-height: 29px;
                            text-align: center;
                            &:last-of-type {
                                margin-bottom: 30px;
                            }
                        }
                        .card-item {
                            display: inline-block;
                            text-decoration: none;
                            width: 270px;
                            height: 150px;
                            border-radius: 8px;
                            overflow: hidden;
                            margin-bottom: 36px;
                            box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
                            cursor: pointer;
                            &:hover {
                                box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
                            }
                            p {
                                font-size: 18px;
                                color: rgba(0, 0, 0, 0.85);
                                line-height: 30px;
                                
                                margin: 30px;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                height: 90px;
                                width: 210px;
                            }
                        }
                        .teacard {
                            height: 60px;
                            p {
                                margin: 15px 30px;
                            }
                        }
                    }
                }
            }
        }
    }
    .sig-content {
        width: 1120px;
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        position: relative;
        .sig-title {
            font-size: 20px;
            font-weight: normal;
            color: rgba(0, 0, 0, 0.85);
            line-height: 30px;
            text-align: center;
            margin: 50px 0 30px 0;
        }
        .sig-1,.sig-2,.sig-3 {
            display: flex;
            flex-direction: row;
            margin-bottom: 42px;
            .time {
                margin-right: 60px;
                color: rgba(0, 0, 0, 0.5);              
                font-size: 18px;
                white-space: nowrap;
                line-height: 20px;
            }
        }
        .sig-1 {
            .detail {
                span {
                    display: inline-block;
                    font-size: 20px;
                    
                    font-weight: normal;
                    color: #000000;
                    line-height: 20px;
                    &:first-of-type {
                        margin-right: 40px;
                    }
                    &:last-of-type {
                        margin-left: 20px;
                        font-size: 16px;
                        color: rgba(0, 0, 0, 0.5);
                        line-height: 28px;
                    }
                }
            }
        }
        .sig-2 {
            .detail {
                font-size: 18px;
                width: 938px;
                align-items: start;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.85);
                line-height: 30px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                div {
                    height: 54px;
                    background: #FFFFFF;
                    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    padding: 12px 16px;
                    box-sizing: border-box;
                    margin: 0 20px 20px 0;
                    cursor: pointer;
                }
                .not-click {
                    cursor: inherit;
                }
            }
        }
        .sig-3 {
            .detail {
                span {                  
                    font-size: 20px;
                    
                    font-weight: normal;
                    color: #000000;
                    line-height: 20px;
                }
            }
        }
    }
}
@media screen and (max-width: 400px) {
    .agenda-carousel {
        .agenda-msg {
            .card-list {
                .msg-detail {
                    margin-left: -95px !important;
                }
            }
        }
    }
}
@media screen and (max-width: 370px) {
    // 适配iphone5
    .agenda-carousel .agenda-msg .time-list div {
        width: 80px !important;
    }
    .agenda-carousel .agenda-msg .card-list .right {
        right: -64px !important;
    }
    .agenda-carousel .card-list .msg-detail {
        left: 60% !important;
    }
    .agenda-carousel .sig-content .sig-2 .shade-remind {
        top: 5% !important;
        height: 94% !important;
    }
}
@media screen and (min-width: 700px) and (max-width: 1000px) {
    // 适配ipad
    .agenda-carousel .agenda-msg .card-list .card-box,.agenda-carousel .card-list .shade-remind {
        width: 458px !important;
    }
    .agenda-carousel .agenda-msg .card-list .right {
        right: 130px !important;
    }
    .agenda-carousel .card-list .msg-detail {
        left: 40% !important;
    }
    .agenda-carousel .sig-content .msg-detail {
        top: 46% !important;
    }
}
@media screen and (min-width: 1000px) and (max-width: 1120px) {
    // 适配ipad Pro
    .agenda-carousel .agenda-msg .card-list .card-box,.agenda-carousel .card-list .shade-remind {
        width: 660px !important;
    }
    .agenda-carousel .agenda-msg .card-list .right {
        right: 225px !important;
    }
    .agenda-carousel .card-list .shade-remind {
        width: 75% !important;
    }
    .agenda-carousel .card-list .msg-detail {
        left: 35% !important;
    }   
    .agenda-carousel .sig-content .shade-remind {
        height: 380px !important;
        width: 80%;
    }
    .agenda-carousel .sig-content {
        width: 100% !important;
    }
}
@media screen and (max-width: 1000px) {
    .agenda-carousel {
        .shade-remind {
            width: 250px;
            height: 95%;
            top: 63px;
            font-size: 12px;
            line-height: 24px;
        }
        .msg-detail {
            width: 220px;
            height: 357px;
            padding: 20px;
            margin-left: -116px;
            margin-top: -140px;
            font-size: 10px;
            .speaker-box,.time-box {
                margin-bottom: 12px;
            }
            .time-box {
                p {
                    &:last-of-type {
                        font-size: 12px;
                    }
                }
            }
            .desc-box {
                
                p {
                    width: 100%;
                    word-wrap: break-word;
                    font-size: 14px;
                }
            }
        }
        .more-msg {
            display: none;
        }
        .agenda-msg {
            .card-list {
                width: calc(100% - 120px);
                .left {
                    left: 10px;
                }
                .right {
                    right: -3px;
                }
                .card-box {
                    width: 234px;
                    .card-list {
                        li {
                            margin-left: 25px;
                            .section {
                                font-size: 14px;
                                &:last-of-type {
                                    margin-bottom: 10px;
                                }
                            }
                            .null-item {
                                width: 195px;
                                height: 90px;
                                margin-bottom: 15px;
                                box-shadow: none;
                            }
                            .card-item {
                                &:hover {
                                    box-shadow: none;
                                }
                                width: 195px;
                                height: 90px;
                                margin-bottom: 15px;
                                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                                p {
                                    font-size: 12px;
                                    line-height: 18px;
                                    margin: 18px;
                                    width: 160px;
                                    height: 54px;
                                }
                            }
                            .teacard_mo {
                                height: 60px;
                            }
                        }
                    }
                }
            }
            .time-list {
                margin-top: 50px;
                margin-right: -10px;
                div {
                    font-size: 12px;
                    width: 120px;
                    height: 90px;
                    line-height: 90px;
                    margin-top: 20px;
                    margin-bottom:15px ;
                    &:first-of-type {
                        margin-top: 35px;
                    }
                }
                /deep/ .el-tabs__nav-scroll div{
                    font-size: 16px;
                }
                /deep/ .el-radio-group span {
                    font-size: 14px;
                }   
            }
            .summit_time {
                margin-top: 100px;
                div {
                    margin:0 0 15px 0 !important;
                }
            }
        }
        .sig-content {
            width: 100%;
            margin-top: 30px;
            border-top: 1px solid rgba(0, 0, 0, 0.15);
            .sig-title {
                margin-top: 40px;
                font-size: 14px;
                line-height: 24px;
            }
            .sig-1,.sig-2 {
                border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            }
            .sig-1,.sig-2,.sig-3 {
                margin-bottom: 20px;
                .time {
                    font-size: 12px;
                    margin-right: 29px;
                }
            }
            .sig-1 {
                .time {
                    line-height: 62px;
                    margin-bottom: 20px;
                }
                .detail {
                    span {
                        font-size: 12px;
                        &:first-of-type {
                            display: block;
                            margin: 0 0 20px 0;
                        }
                        &:last-of-type {
                            margin-left: 20px;
                            font-size: 12px;
                            line-height: 20px;
                        }
                    }
                }
            }
            .sig-2 {
                position: relative;
                .shade-remind {
                    left: 0;
                    top: 10%;
                    width: 100%;
                    height: 90%;
                }
                .msg-detail {
                    height: 260px;
                    margin: -100px 0 0 -110px;
                }
                .time {
                    margin: 20px 0; 
                }
                flex-direction: column;
                .detail {
                    width: 100%;
                    font-size: 12px;
                    line-height: 18px;
                    div {
                        padding: 10px 20px;
                        height: auto;
                        margin: 0 12px 10px 0;
                        &:last-of-type {
                            margin-bottom: 20px;
                        }
                    }
                }
            }
            .sig-3 {
                .time {
                   line-height: 25px; 
                   width: 90px;
                }
                .detail {
                    span {
                        font-size: 12px;

                    }
                }
            }
        }
    }
}
.summit2021 {
    margin-top: -10px;
}
</style>