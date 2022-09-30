<template>
    <div id="showDetail">
        <div class="bg" @click="handleClose"></div>
        <div class="cadenderSinge active">
            <h1 class="calenderH1">{{item3.name}}</h1>
            <span class="meetingTime">{{i18n.common.MEETINGS_TIME}}{{item3.startTime+"-"+item3.endTime}}</span>
            <div class="meetDetail clearfix">
                <img :src="item3.url" :alt="item3.creator"/>
                <div class="meetDetailDe">
                <h2>{{item3.creator}}</h2>
                <p>{{item3.detail}}</p>
                </div>
            </div>
            <div class="detail-link">
                <h3>Zoom</h3>
                <div><img src="/img/home/detail-link.png"><span>{{item3.meeting_id}}</span></div>
                <div class="link" @click="open(item3.join_url)"><span><img src="/img/home/detail-link.png">{{item3.join_url}}</span></div>
            </div>
            <div class="detail-link">
                <h3>Etherpad</h3>
                <div class="link" @click="open(item3.etherpad)"><span><img src="/img/home/detail-link.png" alt="">{{item3.etherpad||'-'}}</span></div>
            </div>
            <div class="detail-link" v-if="item3.video_url">
                <h3>{{i18n.common.MEETINGS_REPLAY}}</h3>
                <div class="link" @click="open(item3.video_url)"><span><img src="/img/home/detail-link.png" alt="">{{item3.video_url||'-'}}</span></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'calenderDetail',
    props: {
        item3: {
            type: Object,
        }
    },
    data(){
        return{

        }
    },
    methods: {
        handleClose(){
            this.$emit('close-detail')
        },
        open (url) {
            if(url){
                window.open(url);
            }
        }
    }
    
}
</script>
<style lang="less" scoped>
#showDetail .link {
    cursor: pointer;
    @media screen and (max-width: 1000px) {
        span {
            overflow: hidden;
            display: inline-block;   
            word-break: break-all;
        }
    }
}
#showDetail{
    position: absolute;;
    top: 0;
    left: 0;
    width: 100%;
    height: 740px;
    z-index: 100;
    text-align: left;
    overflow: hidden;
}
.bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10000%;
    background: #000;
    opacity:  0.5;
    z-index: 1;
}
.cadenderSinge{
    @media screen and (max-width: 1000px) {
        width: 90%;
    }
    border-radius: 4px;
    padding: 12px 20px 15px;
    position:  absolute;
    top: 50%;
    left: 50%;
    transform:  translate(-50%, -50%);
    /*margin: -96px 0 0 -35px;*/
    z-index: 10;
    background: #fff;
    
  }
  .meetDetail {
    margin-top: 10px;
    display: flex;
    justify-content: start;
  }
  .meetDetail img{
    overflow: hidden;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .meetDetailDe{
    padding-left: 10px;
  }
  .meetingTime{
    line-height: 14px;
    font-size: 12px;
    color: #000;
    margin-bottom: 10px;
  }
  h1{
    margin: 0;
    font-size: 16px;
  }
  
  .meetDetailDe h2{
    line-height: 20px;
  }
   .meetDetailDe p{
    line-height: 18px;
    font-size: 12px;
    margin: 0;
  }
  .cadenderSinge.active{
    padding: 15px 20px;
  }
  h2{
    margin: 0;
    font-size: 14px;
  }
  .detail-link {
      h3 {
          font-size: 14px;
          margin-top: 10px;
      }
      div {
          img {
              vertical-align: middle;
              margin-right: 5px;
          }
          span {
              vertical-align: middle;
          }
          font-size: 12px;
          margin-top: 8px;
          color: #929292;
      }
  }
</style>