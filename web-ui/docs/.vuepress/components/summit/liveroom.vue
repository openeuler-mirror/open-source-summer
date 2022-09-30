<template>
  <div class="live-room" v-if="renderData.length" id="liveroom">
    <div class="title">
      <div class="ever" v-if="isPass">
        <img
          v-lazy="'/img/summit/home/zh-mobile-liveroom.png'"
          alt=""
          v-if="isShowH5"
        />
        <img v-lazy="'/img/summit/home/zh-pc-liveroom.png'" alt="" v-else />
      </div>
      <div class="current" v-if="isSummit">
        <img
          v-lazy="'/img/summit/devday-2021/h5-liveroom.png'"
          alt=""
          v-if="isShowH5"
        />
        <img v-lazy="'/img/summit/devday-2021/pc-liveroom.png'" alt="" v-else />
      </div>
      <div class="current" v-if="isDeveloper">
        <img
          v-lazy="'/img/summit/devday-2021/h5-liveroom.png'"
          alt=""
          v-if="isShowH5"
        />
        <img v-lazy="'/img/summit/devday-2021/pc-liveroom.png'" alt="" v-else />
      </div>
    </div>
    <div class="time-box" id="time-box" v-if="isSummit">
      <el-tabs v-model="currentTime" @tab-click="tabClick">
        <el-tab-pane label="11月09日" name="nine"></el-tab-pane>
        <el-tab-pane label="11月10日" name="ten"></el-tab-pane>
      </el-tabs>
    </div>
    <el-select
      v-model="nowValue"
      class="live-choose"
      v-if="isShowH5"
      @change="tabLiveRoom"
    >
      <el-option
        v-for="(item, index) in renderData"
        :key="index"
        :label="item.OPTION"
        :value="item.LIVEURL"
      >
        <span>{{ item.OPTION }}</span>
      </el-option>
    </el-select>
    <iframe
      id="livePage"
      :height="iframeHeight"
      allow="camera *;microphone *;"
      border="0"
      scrolling="no"
      :src="nowLiveSrc"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
    ></iframe>
    <div class="web-box" v-if="!isShowH5 && !isSummit">
      <p v-if="!isDeveloper">{{ liveData.LIVETITLE }}</p>
      <div class="item-box">
        <div
          :class="[
            'live-item',
            roomId === index ? 'active-room' : '',
            { 'developer-item': isDeveloper },
          ]"
          v-for="(item, index) in renderData"
          @click="tabLiveRoom(item.LIVEURL, index)"
          :key="index"
        >
          <p>{{ item.THEME }}</p>
          <p>{{ item.TIME }}</p>
        </div>
      </div>
    </div>
    <div class="web-box" v-if="!isShowH5 && isSummit">
      <p v-if="currentTime === 'nine'">{{ i18n.summit.LIVETITLE }}</p>
      <p v-else>{{ i18n.summit.TEN_TITLE }}</p>
      <div class="item-box">
        <div
          :class="[
            'live-item',
            roomId === index ? 'active-room' : '',
            { 'summit-item': isSummit && currentTime == 'nine' },
          ]"
          v-for="(item, index) in renderData"
          @click="tabLiveRoom(item.LIVEURL, index)"
          :key="index"
        >
          <p>{{ item.THEME }}</p>
          <p>{{ item.TIME }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowLiveSrc: '',
      nowValue: '',
      roomId: null,
      userName: '',
      iframeHeight: 630,
      isSummit: false,
      isDeveloper: false,
      tenData: [],
      nineData: [],
      renderData: [],
      currentTime: 'ten',
    };
  },
  props: ['liveData', 'isPass'],
  created() {
    if (this.liveData.TEN) {
      this.isSummit = true;
      this.renderData = this.liveData.TEN;
    } else {
      this.renderData = this.liveData.RENDERDATA;
    }
    !this.isSummit && !this.isPass ? (this.isDeveloper = true) : '';
    let digit = Math.round(Math.random() * 10);
    digit > 3 ? digit : (digit = 3);
    this.creatUserId(digit);
  },
  mounted() {
    let liveId = this.$route.query.liveid;
    this.showIframe(liveId);
    window.addEventListener(
      'message',
      (event) => {
        let data = '';
        try {
          data = JSON.parse(event.data);
        } catch (e) {
          data = event.data;
        }
        if (data.height == 'auto') {
          this.iframeHeight = 550;
        } else if (data.height) {
          this.iframeHeight = parseInt(data.height);
        }
      },
      false
    );
  },
  methods: {
    tabClick() {
      if (this.currentTime == 'nine') {
        this.renderData = this.liveData.NINE;
        this.showIframe();
      } else {
        this.renderData = this.liveData.TEN;
        this.showIframe();
      }
    },
    showIframe(id) {
      if (id) {
        this.renderData.forEach((item, index, arr) => {
          if (parseInt(item['ID']) === parseInt(id)) {
            this.nowLiveSrc = item['LIVEURL'] + this.userName;
            this.nowValue = item['OPTION'];
            this.roomId = index;
          }
        });
      } else {
        this.nowLiveSrc = this.renderData[0]['LIVEURL'] + this.userName;
        this.nowValue = this.renderData[0]['OPTION'];
        this.roomId = 0;
      }
    },
    creatUserId(num) {
      let returnId = '';
      let charStr =
        '0123456789@#$%&~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (var i = 0; i < num; i++) {
        var index = Math.round(Math.random() * (charStr.length - 1));
        returnId += charStr.substring(index, index + 1);
      }
      this.userName = returnId;
    },
    tabLiveRoom(src, index) {
      let indexType = typeof index;
      if (indexType === 'number') {
        this.nowLiveSrc = src + this.userName;
        this.roomId = index;
      } else {
        this.nowLiveSrc = src + this.userName;
      }
    },
  },
};
</script>
<style>
.live-room .live-choose {
  width: 100%;
}
.live-room .live-choose .el-input {
  width: 100%;
}
@media screen and (max-width: 1000px) {
  .el-scrollbar > .el-scrollbar__bar {
    opacity: 1 !important;
  }
}
</style>
<style lang="less" scpoed>
#tab-nine,
#tab-ten {
  font-size: 22px;
  font-weight: 700;
  font-family: FZLTCHJW--GB1-0, FZLTCHJW--GB1;
  color: rgba(0, 0, 0, 0.5);
  line-height: 28px;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
    line-height: 40px;
  }
}
.is-active {
  color: #002fa7 !important;
}
.el-tabs {
  .el-tabs__nav-wrap::after {
    display: none !important;
  }
  .el-tabs__nav-scroll {
    @media screen and (max-width: 1000px) {
      display: flex;
      justify-content: center;
    }
  }
}
.live-room {
  width: 1120px;
  margin: 0 auto 0 auto;
  .title {
    padding: 90px 0 50px 0;
    img {
      display: block;
      margin: 0 auto;
      width: 900px;
      height: 76px;
    }
    @media screen and (max-width: 1000px) {
      margin: 40px 0 30px 0;
      padding: 0;
      img {
        width: 335px;
        height: 38px;
      }
    }
  }
  #livePage {
    width: 1120px;
    margin: 0 auto 0 auto;
    display: block;
    border: none;
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin-top: 30px;
    }
  }
  .web-box {
    & > p {
      font-size: 20px;
      color: #000000;
      line-height: 23px;
      margin: 40px 0 30px 0;
      text-align: center;
    }
    .item-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      .live-item {
        width: 178px;
        padding: 18px 0;
        cursor: pointer;
        background: #ffffff;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        &:first-of-type {
          width: 100%;
          margin: 0 0 30px 0;
        }
        p {
          color: #002fa7;
          text-align: center;
          font-size: 18px;
          line-height: 18px;
          &:last-of-type {
            margin-top: 16px;
            font-size: 16px;
          }
        }
      }
      .summit-item {
        width: 216px;
      }
      .developer-item {
        transition: none;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 130px;
        height:96px;
        &:hover {
          transition: all 0.3s;
          box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
        }
      }
      .active-room {
        background-color: #002fa7;
        p {
          color: #ffffff;
        }
      }
      .developer-item:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:30px;
        margin-bottom:12px;
        height: 66px;
        p:nth-child(2) {
          display: none;
        }
      }
      .active-room.developer-item {
        background-size: cover;
        background-image: url(/img/summit/devday-2022/live-bg.png);
      }
      .active-room.developer-item:first-child {
        background-image: url(/img/summit/devday-2022/live-bg-long.png);
      }
    }
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}
</style>
