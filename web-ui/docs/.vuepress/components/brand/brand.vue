<template>
  <div class="moblie-content">
    <common-banner
      :pc-src="'/img/other/brand/brand-banner.png'"
      :mobile-src="'/img/other/brand/brand-banner.png'"
      :inside-name="'BRAND'"
      :outside-name="i18n.brand.BRAND"
    ></common-banner>
    <div class="brand-all-word">
      <h3 class="brand-title">{{i18n.brand.MOBILETITLE}}</h3>
      <p class="brand-word">{{i18n.brand.WORDS}}</p>
    </div>
    <!-- 六个带有下载功能的卡片 -->
    <div class="brand-six-cards">
      <ul class="card-vertical">
        <li class="vertical-left">
          <h3>{{i18n.brand.PICTURE_TITLE[0]}}</h3>
          <img src="/img/other/brand/standard-poster.png" alt />
          <!-- 三个下载按钮 -->
          <a :href="item.URL" target="_blank" download
          v-for="(item, index) in i18n.brand.VERTICAL_LEFT_IMAGE" :key="index">
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">{{item.STYLE}}</el-button>
          </a>
        </li>
        <li class="vertical-center">
          <h3>{{i18n.brand.PICTURE_TITLE[1]}}</h3>
          <img src="/img/other/brand/mono-poster.png" alt />
          <a :href="item.URL" target="_blank" download
          v-for="(item, index) in i18n.brand.VERTICAL_CENTER_IMAGE" :key="index">
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">{{item.STYLE}}</el-button>
          </a>
        </li>
        <li class="vertical-right">
          <h3>{{i18n.brand.PICTURE_TITLE[2]}}</h3>
          <img src="/img/other/brand/black-poster.png" alt />
          <a :href="item.URL" target="_blank" download
          v-for="(item, index) in i18n.brand.VERTICAL_RIGHT_IMAGE" :key="index">
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">{{item.STYLE}}</el-button>
          </a>
        </li>
      </ul>
      <ul class="card-horizontal">
        <li class="horizontal-left">
          <h3>{{i18n.brand.PICTURE_TITLE[3]}}</h3>
          <img src="/img/other/brand/horizontal-poster.png" alt />
          <a :href="item.URL" target="_blank" download
          v-for="(item, index) in i18n.brand.HORIZONTAL_LEFT_IMAGE" :key="index">
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">{{item.STYLE}}</el-button>
          </a>
        </li>
        <li class="horizontal-center">
          <h3>{{i18n.brand.PICTURE_TITLE[4]}}</h3>
          <img src="/img/other/brand/white-poster.png" alt />
          <a :href="item.URL" target="_blank" download
          v-for="(item, index) in i18n.brand.HORIZONTAL_CENTER_IMAGE" :key="index">
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">{{item.STYLE}}</el-button>
          </a>
        </li>
        <li class="horizontal-right">
          <h3>{{i18n.brand.PICTURE_TITLE[5]}}</h3>
          <img src="/img/other/brand/block-hor-poster.png" alt />
          <a :href="item.URL" target="_blank" download
          v-for="(item, index) in i18n.brand.HORIZONTAL_RIGHT_IMAGE" :key="index">
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">{{item.STYLE}}</el-button>
          </a>
        </li>
      </ul>
    </div>
    <div class="ppt-box">
      <h3>{{ i18n.brand.PPT_TEXT }}</h3>
      <ul class="ppt-list">
        <li v-for="(item,index) in i18n.brand.PPT_LIST" :key="index">
          <a :href="item.LINK" target="_blank" download>
            <img :src="item.URL" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 1000px) {
    .moblie-content {
        padding: 40px 30px 80px 30px;
    }
}
.brand-all-word {
  width: 1120px;
  margin: 0 auto;
  padding-top: 60px;
  @media screen and (max-width: 1000px) {
     width: 315px;
    }
  .brand-title {
    width: 48px;
    height: 24px;
    font-size: 24px;

    font-weight: normal;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
  }
  .brand-word {
    width: 1120px;
    font-size: 14px;

    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
    line-height: 32px;
    margin-top: 20px;
    @media screen and (max-width: 1000px) {
      width: 315px;
      font-size: 14px;

      font-weight: normal;
      color: rgba(0, 0, 0, 0.5);
      line-height: 24px;
    }
  }
}
.brand-six-cards {
  width: 1120px;
  margin: 0 auto;
   @media screen and (max-width: 1000px) {
     width: 315px;
    }
  .card-vertical,
  .card-horizontal {
    display: flex;
    margin-bottom: 60px;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      width: 315px;
      margin-bottom: 40px;
    }
  }
  .vertical-left,
  .vertical-center,
  .vertical-right,
  .horizontal-left,
  .horizontal-center,
  .horizontal-right {
    width: 350px;
    height: 300px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    flex: 1;
    padding-top: 32px;
    margin: 30px 25px 0 0;
     @media screen and (max-width: 1000px) {
     width:315px;
    height:282px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 10px 0px rgba(0,0,0,0.2);
    border-radius:8px;
    }
  }
  ul h3 {
    height: 24px;
    text-align: center;
    font-size: 24px;

    color: rgba(0, 0, 0, 1);
    line-height: 24px;
    margin: 0 auto;
  }
  ul img {
    display: block;
    margin: 0 auto;
    padding-top: 39px;
  }
  .horizontal-left img {
    padding-top: 45px;
    padding-bottom: 50px;
  }
  .horizontal-center img {
    padding-bottom: 50px;
  }
  .horizontal-right img {
    padding-top: 45px;
    padding-bottom: 50px;
  }
  .card-btn {
    margin-left: 29px;
    margin-top: 20px;
    margin-bottom: 120px;
    width: 78px;
    height: 32px;
    padding: 2px;
    @media screen and (max-width: 1000px) {
      margin-bottom: 30px;
      width: 65px;
    }
  }
}
.ppt-box {
  width: 1120px;
  margin: 0 auto;
  padding-bottom: 200px;
  &>h3{
    font-size: 24px;
    color: #000000;
    line-height: 24px;
  }
  .ppt-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      width: 350px;
      height: 260px;
      background: #FFFFFF;
      box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-top: 30px;
    }
    li:first-child {
      margin-right: 25px;
    }
  }
   @media screen and (max-width: 1000px) {
      width: 315px;
      padding-bottom: 80px;
      .ppt-list {
        flex-direction: column;
        justify-content: center;
        li {
          box-shadow:0px 3px 10px 0px rgba(0,0,0,0.2);
          width: 315px;
          height: 234px;
          img {
            width: 315px;
            height: 234px;
            display: block;
          }
        }
      }
    }
}
</style>
