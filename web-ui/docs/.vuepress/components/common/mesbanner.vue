<!--带有信息的banner-->
<template>
    <div :class="['message-banner',isOther?'other-height':'']">
        <div class="banner-pc">
            <img :src="pcSrc" :class="isOther?'other':''"/>
            <span class="inside" v-if="insideName?true:false">{{insideName}}</span>
            <span :class="['outside', $isCn ? 'font-xihjw' : 'font-hwmedium']">{{outsideName}}</span>
            <p class="message-pc">{{pcMessage}}</p>
        </div>
        
        <div class="banner-mobile">
            <h3>{{ outsideName }}</h3>
            <p class="message-mobile">{{mobileMessage}}</p>
            <img :src="mobileSrc" />
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  props: ['insideName', 'outsideName', 'pcSrc', 'mobileSrc','isOther','pcMessage','mobileMessage']
};
</script>

<style lang="less" scoped>
.word-common-css(@fontSize,@fontFamily1,@fontFamily2,@fontWeight,@color,@lineHeight) {
    font-size: @fontSize;
    font-weight: @fontWeight;
    color: @color;
    line-height: @lineHeight;
}
.message-banner {
  width: 1120px;
  margin: 0 auto;
  height: 380px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 0 55px;
    height: unset;
  }
  .banner-pc {
    height: 100%;
    width: 100%;
    position: relative;
    @media screen and (max-width: 1000px) {
      display: none;
    }
    .message-pc {
        .word-common-css(25px,PingFangSC-Regular,PingFang SC,400,#000000,30px);
        position: absolute;
        top: 263px;
    }
    img {
      height: 360px;
      width: 500px;
      position: absolute;
      right: 0;
      top: 10px;
    }
    .other {
        height: 400px;
        width: 400px;
        top: 180px;
    }
    .inside {
      position: absolute;
      left: 0;
      top: 120px;
      font-size: 60px;
      line-height: 60px;
      
      color: rgba(0, 0, 0, 0.05);
    }
    .outside {
      position: absolute;
      left: 0;
      top: 156px;
      font-size: 48px;
      line-height: 48px;
      color: #000;
      font-weight: normal;
    }
  }
  .banner-mobile {
    display: none;
    @media screen and (max-width: 1000px) {
      display: block;
    }
    width: 100%;
    h3 {
      font-size: 24px;
      line-height: 34px;
      text-align: center;
      
      margin-top: 40px;
    }
    img {
      margin-top: 10px;
      width: 100%;
    }
    .message-mobile {
        margin: 20px auto 40px auto;
        width: 100%;
        text-align: center;
    }
  }
}
.other-height{
    height: 630px;
     @media screen and (max-width: 1000px) {
         height: unset;
     }
}
@media screen and (min-width: 1000px) and (max-width: 1120px){
    .message-banner {
        width: 100% !important;
    }
}
</style>
