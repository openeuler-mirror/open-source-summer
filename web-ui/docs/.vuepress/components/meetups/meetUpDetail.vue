<template>
    <div id="meetUpDetail">
         <div class="link-container" @click="goMeetUps">
            <p class="MeetUps-link">{{ i18n.interaction.MEETUPS.MEETUPS }}\</p>
        </div>
        <div class="top-content">
            <h3 :class="$lang === 'en'?'font-condensed':''" v-for="(item,index) in detailObj.TITLE_LIST">{{ item }}</h3>
            <p :class="$lang === 'en'?'font-bold':''">{{ detailObj.MEETUPS_DATE }}</p>
        </div>
        <div class="review" v-show="detailObj.MEETUPS_VIDEO_LINK">
            <p>{{ i18n.interaction.MEETUPS.DETAIL_REVIEW }}</p>
            <div class="video-box" v-if="!isShowH5">
                <p :class="$lang === 'en'?'font-regular':''" @click="go('https://space.bilibili.com/527064077/channel/detail?cid=156371')">{{ i18n.interaction.MEETUPS.MORE_VIDEO }}>></p>
                <div class="video-item">
                    <video :poster="detailObj.MEETUPS_VIDEO_COVER"
                           loop
                           width="768px"
                           height="432px"
                           id="meetUp-video">
                        <source :src="detailObj.MEETUPS_VIDEO_LINK"  type="video/mp4">
                    </video>
                    <playcontroll :ctrl-obj="videoCtrlParams" ref="playctrlEle" @playStatus="checkStatus"></playcontroll>
                    <div class="play-btn" v-if="!isNowPlay" @click="playmeetUpVideo('webBtn')"></div>
                </div>
            </div>
            <div class="mobile-video" v-else>
                <video :poster="detailObj.MEETUPS_VIDEO_COVER"
                       loop
                       muted
                       width="100%"
                       height="216px"
                       ref="mobileVideo"
                       @click="playmeetUpVideo('videoElement')">
                    <source :src="detailObj.MEETUPS_VIDEO_LINK"  type="video/mp4">
                </video>
                <div class="play-btn" v-if="!isNowPlay" @click="playmeetUpVideo('mobileBtn')"></div>
                <p :class="$lang === 'en'?'font-regular':''" @click="go('https://space.bilibili.com/527064077/channel/detail?cid=156371')">{{ i18n.interaction.MEETUPS.MORE_VIDEO }}>></p>
            </div>
        </div>
        <div class="description">
            <p :class="['title',$lang === 'en'?'font-regular':'']">{{ i18n.interaction.MEETUPS.DETAIL_DESC }}</p>
            <p :class="['desc-content',$lang === 'en'?'font-regular':'']" v-for="(item,index) in detailObj.MEETUPS_DESC">{{ item }}</p>
        </div>
        <div class="meet-flowPath" v-if="flowPathList.length">
            <p :class="['title',$lang === 'en'?'font-regular':'']">{{ i18n.interaction.MEETUPS.DETAIL_FLOW }}</p>
            <div class="calendar">
                <el-table
                :data="flowPathList"
                :show-header=false
                style="width: 100%" v-if="!isShowH5">
                    <el-table-column
                        prop="icon"
                        width="50">
                        <i class="el-icon-time"></i>
                    </el-table-column>
                    <el-table-column
                        prop="TIME"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="THEME"
                        width="540">
                    </el-table-column>
                    <el-table-column
                        prop="SPEAKER"
                        width="230">
                    </el-table-column>
                </el-table>
                <div class="mobile-table" v-if="isShowH5">
                    <div class="item" v-for="(item,index) in flowPathList" :key="index">
                        <div class="time">{{ item.TIME }}</div>
                        <div class="agenda">
                            <p>{{ item.THEME }}</p>
                            <p v-if="item.SPEAKER || item.POSITION">
                                <span>{{ item.SPEAKER }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="meet-message">
            <p :class="['title',$lang === 'en'?'font-regular':'']">{{ i18n.interaction.MEETUPS.DETAIL_MEET }}</p>
            <div :class="['meet-address',$lang === 'en'?'en-address':'']">
                <div class="address-message">
                    <img v-if="addressObj.ADDRESS_IMG" :src="addressObj.ADDRESS_IMG" alt />
                    <img v-else :src="i18n.interaction.MEETUPS.DEFAULT_IMG" alt />
                    <div class="address-text">
                        <i class="location"></i>
                        <p v-if="addressObj">{{ detailObj.MEETINGS_INFO?detailObj.MEETINGS_INFO.ADDRESS_UP:'' }}</p>
                        <p v-if="addressObj" v-for="(item,index) in addressObj.ADDRESS_DOWN" :key="index">{{ item }}</p>
                    </div>
                </div>
                <div class="scan-qrcode">
                    <div>
                         <i class="qrcode"></i>
                        <span>{{ i18n.interaction.MEETUPS.DETAIL_QRCODE_TEXT }}</span>
                    </div>
                    <img v-if="addressObj" :src="addressObj.APPLY_QRCODE" alt />
                </div>
            </div>
            <div class="map" v-if="position.length">
                <baidu-map :center="{lng: position[0],lat: position[1]}" :zoom="17" style="height:373px" 
                :scroll-wheel-zoom="true" ak="E8fzNbGP929RhtOZQGNsSKYO">
                    <bm-marker :position="{lng: position[0],lat: position[1]}" :dragging="true">
                    </bm-marker>
                </baidu-map>
            </div>
        </div>
    </div>
</template>

<script>
import playcontroll from './../controll/videoctrl';
import baiduMap from 'vue-baidu-map/components/map/Map.vue';
import bmMarker from 'vue-baidu-map/components/overlays/Marker.vue';
import {eventDetail} from "./../../api/meetup";
window.global = (() => {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    if (typeof globalThis !== 'undefined') { return globalThis; }
    throw new Error('unable to locate global object');
})();
export default {
    name: "meetUpDetail",
    data() {
        return {
            flowPathList: [],
            detailObj: {},
            addressObj: {},
            videoCtrlParams:{
                element: '',
                isShow: true,
                barWidth: 646
            },
            isNowPlay: false,
            position: []
        };
    },
    mounted (){
        this.videoCtrlParams.element = document.getElementById('meetUp-video');

        if(this.$route.query.isMini){
            eventDetail(this.$route.query.id).then(res => {
                this.detailObj = {
                    TITLE_LIST: [res.title],
                    MEETUPS_DATE: res.date,
                    MEETUPS_DESC: [res.synopsis],
                    MEETINGS_INFO: {
                        ADDRESS_UP: res.address || this.i18n.interaction.MEETUPS.LIVE_ADDRESS
                    },
                    SHOW_MAP: res.address
                }
                const tempArr = JSON.parse(res.schedules);
                tempArr.forEach(item => {
                    if (!item.speakerList) {
                        this.flowPathList.push({
                            THEME: item.topic,
                            TIME: item.start + '-' + item.end,
                            SPEAKER: item.speaker
                        })    
                    } else {
                        this.flowPathList.push({
                            THEME: item.topic,
                            TIME: item.start + '-' + item.end,
                            SPEAKER: item.speakerList.map((item) => {
                                return item.name
                            }).join('，')
                        }) 
                    }
                    
                })
                this.addressObj = {
                    ADDRESS_IMG: `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/${res.poster}.png`,
                    ADDRESS_DOWN: [res.detail_address || res.live_address],
                    APPLY_QRCODE: res.wx_code,
                    LATITUDE: res.latitude,
                    LONGTITUDE: res.longitude
                }
                this.position = [res.longitude, res.latitude];
            })
        } else {
            
            this.detailContent();
            this.position = this.addressObj.ADDRESS_LOCATION;
        }

    },
    methods: {
        goMeetUps() {
            this.$router.push('/' + this.$lang + "/interaction/salon-list/");
        },
        go(path) {
            if(path && path.includes("http")) {
                window.open(path);
            }
        },
        detailContent() {
            let  listData= this.i18n.interaction.MEETUPS.MEETUPS_DATA;
            listData.forEach((item)=>{
                if(item.ID == this.$route.query.id){
                    this.detailObj = item;
                    this.flowPathList = item.MEETUPS_FLOW_PATH;
                    this.addressObj = item.MEETINGS_INFO;
                }
            })
        },
        checkStatus(status) {
             if(status === true){
                this.isNowPlay = true;
            }else{
                this.isNowPlay = false;
            }
        },
        playmeetUpVideo(which) {
            if(which == 'webBtn') {
                this.$refs.playctrlEle.isPlay = true;
                this.isNowPlay = true;
            }else {
                this.$refs.mobileVideo.play();
                this.isNowPlay = true;
            }
        }
    },
    components: {
        playcontroll,
        baiduMap,
        bmMarker
    }

}
</script>

<style lang="less" scoped>
#meetUpDetail {
    .link-container{
        width: 1120px;
        margin: 0 auto;
        .MeetUps-link{
            font-size: 20px;
            color: #002fa7;
            cursor: pointer;
            margin: 34px 0 16px 0;
            padding: 0;
        }
    }
    .top-content{
        width: 100%;
        height: 220px;
        background-image: url('/img/home/homeActive.gif');
        overflow: hidden;
        color: #fff;
        
        h3{
            font-size: 30px;
            text-align: center;
            &:first-of-type {
                margin-top: 67px;
            }
            &:last-of-type {
                margin-bottom: 28px;
            }
        }
        p{
            text-align: center;
            font-size: 18px;
        }
    }
    .review {
        margin: 61px auto 0 auto;
        width: 876px;
        .play-btn {
            width: 100px;
            height: 100px;
            position: absolute;
            border-radius: 50px;
            bottom: 50%;
            left: 50%;
            margin: 0 0 -50px -50px;
            background-image: url('/img/home/play-btn.gif');
            cursor: pointer;
            background-size: contain;
            opacity: 0.6;
        }
        &>p {
            text-align: center;
            font-size: 30px;
            
            color: #000000;
            line-height: 46px;
        }
        .video-box {
            width: 100%;
            height: 540px;
            background: #FFFFFF;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-top: 50px;
            padding-right: 54px;
            position: relative;
            background-image: url('/img/meetups/review-bg.png');
            background-size: contain;
            overflow: hidden;
            p {
                text-align: right;
                font-size: 20px;
                
                color: #002FA7;
                line-height: 54px;
                text-shadow: 0px 6px 30px rgba(0, 0, 0, 0.1);
                cursor: pointer;
            }
            .video-item {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -384px;
                margin-top: -216px;
                &:hover {
                    .playControll {
                        display: block;
                    }
                }
                .big-controll {
                    bottom: 5px;
                }
            }
        }
    }   
    .title{
        text-align: center;
        font-size: 30px;
        color: #000000;
        margin-bottom: 50px;
        
        line-height: 46px;
    }
    .description{
        margin-top: 100px;
        .desc-content{
            width: 1120px;
            font-size: 18px;
            color: rgba(0,0,0,.5);
            margin: 0 auto;
            line-height: 40px;
            &:last-of-type {
                margin-bottom: 60px;
            }
        }
    }
    .meet-flowPath{
        .calendar{
            width: 1120px;
            margin: 0 auto;
        }
    }
    .meet-flowPath .calendar {
        /deep/ .el-table::before {
            background-color: #ffffff;
        }
        /deep/ .el-table tbody tr { 
            pointer-events:none;
            height: 100px;
        }
        /deep/ .el-table .el-table__body>tbody>tr>td div{
            word-break: normal !important;
        }
        /deep/ .hideIcon tbody tr:nth-of-type(3) td:first-of-type,
        /deep/ .hideIcon tbody tr:nth-of-type(4) td:first-of-type,
        /deep/ .hideIcon tbody tr:nth-of-type(5) td:first-of-type,
        /deep/ .hideIcon tbody tr:nth-of-type(3) td:nth-of-type(2),
        /deep/ .hideIcon tbody tr:nth-of-type(4) td:nth-of-type(2),
        /deep/ .hideIcon tbody tr:nth-of-type(5) td:nth-of-type(2)
        {
            display: none;
        }
        /deep/ .el-table tbody tr td {
            font-size: 18px;           
            line-height: 20px;
            color: rgba(0, 0, 0, 0.5);
            &:last-of-type {
                font-size: 14px;  
            }
            &:nth-of-type(4) {
                text-align: center;
            }
            &:nth-of-type(1) {
                text-align: right;
            }
            &:nth-of-type(3),&:nth-of-type(4) {
                color: #000000;
            }
        }
    }
    .meet-message{
        margin-top: 60px;
        margin-bottom: 128px;
        .meet-address{
            width: 920px;
            height: 270px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 45px;
            background: #ffffff;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            border-bottom: 3px solid #002fa7;
            .address-message{
                display: flex;
                flex-direction: row;
                img{
                    width: 224px;
                    height: 143px;
                }
                .address-text{
                    margin-left: 40px;
                    position: relative;
                    .location{
                        position: absolute;
                        width: 18px;
                        height: 20px;
                        background-image: url('/img/meetups/location.png');
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                    p{
                        font-size: 16px;
                        max-width: 350px;
                        color: #000000;
                        line-height: 24px;
                        margin-bottom: 12px;
                        &:first-of-type{
                            color: #002FA7;
                            font-size: 20px;
                            margin: 0 0 20px 30px;
                        }
                        &:last-of-type{
                            margin-bottom: 0;
                        }
                    }
                }
            }
            .scan-qrcode{
                position: relative;
                &>div {
                    display: flex;
                    flex-direction: row;
                }
                .qrcode{
                    display: block;
                    width: 20px;
                    height: 18px;
                    background-image: url('/img/meetups/link.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                    margin-right: 10px;
                }
                span{
                    color: #002FA7;
                    font-size: 20px;
                    line-height: 18px;
                    margin-bottom: 10px;
                }
                img{
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin-top: 20px;
                }
            }
        }
        .map {
            width: 1120px;
            margin: -50px auto 0 auto;
            position: relative;
            z-index: -1;
        }
        .en-address{
            width: 978px;
        }
    }
    .font-bold{
        font-weight: bold !important;  
    }
    @media screen and (max-width: 1000px) {
        .link-container{
            display: none;
        }
        .review {
            margin: 40px 0 0 0;
            width: 100%;
            &>p {
                font-size: 17px;
                font-weight: bold;
                text-align: left;
                margin: 0 0 20px 30px;
            }
            .mobile-video {
                position: relative;
                .play-btn {
                    bottom: 60%;
                }
                &>p {
                    text-align: center;
                    margin-top: 8px;
                    font-size: 17px;
                    
                    color: #002FA7;
                    line-height: 46px;
                    text-shadow: 0px 6px 30px rgba(0, 0, 0, 0.1);
                }
            }
        }
        .top-content{
            h3{
                font-size: 20px;
                max-width: 345px;
                margin: 0 auto;
            }
            p{
                font-size: 16px;
            }
        }
        .title{
            text-align: left;
            font-size: 17px;
            color: #000000;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .description{
            padding: 0 30px;
            margin-top: 40px;
            .desc-content{
                width: 100%;
                font-size: 16px;
            }
        }
        .meet-flowPath{
            padding: 0 30px;
            .calendar {
                width: 100%;
            }
        }
        .mobile-table {
            .item {
                width: 100%;
                display: flex;
                flex-direction: row;
                margin-bottom: 20px;
                border-bottom: 1px solid  rgba(0, 0, 0, 0.15);
                &:last-of-type {
                    border-bottom: 0;
                }
                .time {
                    width: 82px;
                    height: 20px;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.5);
                    line-height: 20px;
                    margin: 0 29px 0 0;
                }
                .agenda {
                    p {
                        
                        color: #000000;
                        line-height: 20px;
                        font-size: 12px;
                        margin-bottom: 20px;
                        &:first-of-type {
                            width: 209px;
                        }
                        span {
                            &:first-of-type {
                                margin-right: 25px;
                                width: 41px;
                                vertical-align: top;
                            }
                            &:first-of-type,&:last-of-type {
                                display: inline-block;
                            }
                            &:last-of-type {
                                width: 139px;
                            }
                        }
                    }
                }
            }
        }
        .meet-message{
            padding: 0 30px;
            margin-bottom: 80px;
            .meet-address{
                flex-direction: column;
                width: 100%;
                padding: 40px;
                border-bottom: none;
                width: 100%;
                height: auto !important;
                .address-message{
                    flex-direction: column;
                    margin-bottom: 30px;
                    img{
                        margin: 0 auto;        
                    }
                    .address-text{
                        margin-left: 0;
                        .location{
                            display: none;
                        }
                        p{
                            text-align: center;
                            font-size: 14px;
                            max-width: 100%;
                             &:first-of-type{
                                margin: 20px 0 10px 0;
                                font-size: 16px;
                            }
                        }
                    }
                }
                .scan-qrcode{
                    display: flex;
                    flex-direction: column-reverse;
                    
                    .qrcode{
                        display: none;
                    }
                    span{
                        width: 100%;
                        text-align: center;
                        font-size: 16px;
                        margin: 20px 0 0 0;
                    }
                    img{
                        margin: 0 auto;
                    }
                }
            }
            .title{
                font-size: 17px;
            }
            .map{
                display: none;
            }
            .en-address{
                height: auto !important;
            }
        }
    }
}

</style>