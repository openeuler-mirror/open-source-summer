<template>
  <div>
    <div class="A-Tune">
      <titlenav
        v-show="isShowNav"
        :currentIndex="activeIndex"
        :currentSubIndex="currentSubIndex"
        :dataList="i18n.minisite.NAV_TEXT"
      ></titlenav>
      <minibanner
        :themeArr="i18n.minisite.MIGRATION_BANNER_TEXT"
        :mobileImg="i18n.minisite.ATUNE_BANNER_IMG"
        :isShowH5="true"
      ></minibanner>
      <div class="atune-center">
        <div class="other-desc">
          <div>
            <p
              v-for="(item, index) in i18n.minisite.MIGRATION_DESC"
              :key="index"
            >
              {{ item }}
            </p>
          </div>
        </div>
        <SourceDownload />
        <div
          v-for="(item, index) in i18n.minisite.MIGRATION_LISTCONTENT"
          :key="index"
          class="list-content"
          id="framework"
        >
          <contentlist
            :outsideStr="item.TITLE_OUTSIDE"
            :insideStr="item.TITLE_INSIDE"
            :subtitle="item.SUBTITLE"
            :listTitle="item.LISTTITLE"
            :descList="item.CONTENT"
            :frameImg="item.FRAMEWORK_IMG"
          ></contentlist>
        </div>

        <scheme :scheme="i18n.scheme.SCHEME" id="document"></scheme>
      </div>
    </div>

    <div class="bisheng" id="caseGuidance">
      <div class="reference">
        <div class="menu-title">
          <div
            v-for="(item, index) in i18n.minisite.MIGRATION_REFERENCE.MENU_LIST"
            :key="index"
            :class="index === menuIndex ? 'active' : ''"
            @click="checkMeun(index)"
          >
            <p>{{ item }}</p>
            <p class="title-border"></p>
          </div>
        </div>
        <div v-if="menuIndex === 0">
          <div class="h5-link" v-if="isShowH5">
            <a
              :href="item.LINK"
              v-for="(item, index) in i18n.minisite.MIGRATION_REFERENCE
                .LINK_LIST"
              :key="index"
              target="__blank"
              >{{ item.TEXT }}</a
            >
          </div>
          <div class="link-list list" v-else>
            <div
              class="item"
              v-for="(item, index) in i18n.minisite.MIGRATION_REFERENCE
                .LINK_LIST"
              :key="index"
              @click="go(item.LINK)"
            >
              {{ item.TEXT }}
            </div>
          </div>
        </div>

        <div v-else-if="menuIndex === 1" class="move-content">
          <p>{{ i18n.minisite.MOVE_CONTENT.DESCRIBE }}</p>
          <img :src="i18n.minisite.MOVE_CONTENT.IMG" />
          <p>{{ i18n.minisite.MOVE_CONTENT.SUBTITLE }}</p>
          <p
            v-for="(item, index) in i18n.minisite.MOVE_CONTENT.LINK_LIST"
            :key="index"
          >
            <a :href="item">{{ item }}</a>
          </p>
        </div>

        <div v-else class="move-content">
          <p>
            社区版本相关迁移问题， 请在<a :href="i18n.minisite.DIRECT_CONTENT"
              >兼容性 SIG</a
            >提交相关问题跟进。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import titlenav from "./../summit/titleNav.vue";
import minibanner from "./banner.vue";
import miniimg from "./imglink.vue";
import minidesc from "./description.vue";
import miniframe from "./framework.vue";
import contentlist from "./content.vue";
import scheme from "./scheme.vue";
import SourceDownload from "./SourceDownload.vue";

export default {
  data() {
    return {
      activeIndex: -1,
      currentSubIndex: -1,
      menuIndex: 0,
      isShowNav: false,
    };
  },
  mounted() {
    if (!this.isShowH5) {
      window.addEventListener("scroll", this.atuneScroll);
    }
  },
  methods: {
    go(path) {
      if (path) {
        window.open(path);
      }
    },
    atuneScroll(value) {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop < 600) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }
      const sd = document.getElementById("sourceDownload").offsetTop - 200;
      const fw = document.getElementById("framework").offsetTop - 200;
      const dt = document.getElementById("document").offsetTop - 200;
      const cd = document.getElementById("caseGuidance").offsetTop - 200;
      // console.log(scrollTop, sd, fw, dt);

      if (scrollTop > sd && scrollTop < fw) {
        this.activeIndex = 0;
        this.currentSubIndex = -1;
      } else if (scrollTop > fw && scrollTop < dt) {
        this.activeIndex = 1;
        this.currentSubIndex = -1;
      } else if (scrollTop > dt && scrollTop < cd) {
        this.activeIndex = 2;
        const arr = ["one", "two", "three", "four", "five", "six", "seven"];
        arr.forEach((i, index) => {
          const one = document.getElementById(`h2-title-${i}`).offsetTop - 100;
          let two = 0;
          try {
            two =
              document.getElementById(`h2-title-${arr[index + 1]}`).offsetTop -
              100;
          } catch (error) {
            if (index === 6 && scrollTop > one) {
              this.currentSubIndex = 6;
            }
          }
          if (scrollTop > one && scrollTop < two) {
            this.currentSubIndex = index;
          }
        });
      } else if (scrollTop > cd) {
        this.currentSubIndex = -1;
        this.activeIndex = 3;
      } else {
        this.currentSubIndex = -1;
        return false;
      }
    },
    checkMeun(num) {
      this.menuIndex = num;
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.atuneScroll);
  },
  components: {
    titlenav,
    minibanner,
    miniimg,
    minidesc,
    miniframe,
    contentlist,
    scheme,
    SourceDownload,
  },
};
</script>
<style>
.A-Tune .banner-box {
  width: 850px;
}
.A-Tune .banner-box #video {
  margin-left: 229px;
}
@media screen and (max-width: 1120px) {
  .A-Tune .banner-box {
    width: 315px;
  }
}
</style>
<style lang="less" scoped>
.A-Tune {
  width: 100%;
}
.A-Tune .title {
  width: 1120px;
  margin: 0 auto;
  font-size: 36px;
  color: #000000;
  line-height: 48px;
  position: relative;
  text-align: center;
  span {
    font-size: 36px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.05);
    line-height: 48px;
    position: absolute;
    left: 47%;
    top: -24px;
  }
}
.A-Tune .atune-center {
  width: 100%;
}
html[lang="ru"] .A-Tune .atune-center .tune-desc {
  height: unset;
}
.A-Tune .document {
  width: 1120px;
  margin: 74px auto 200px auto;
  .doc-list {
    margin: 30px auto 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 940px;
    .item {
      width: 410px;
      height: 194px;
      background: #ffffff;
      cursor: pointer;
      border-radius: 8px;
      box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      flex-direction: row;
      padding-left: 30px;
      &:nth-of-type(2),
      &:first-of-type {
        margin-bottom: 30px;
      }
      &:nth-of-type(2),
      &:last-of-type {
        margin-left: 80px;
      }
      img {
        width: 120px;
        height: 120px;
        display: block;
      }
      div {
        width: 200px;
        margin-left: 30px;
        p {
          font-size: 18px;
          color: #000000;
          line-height: 28px;
          &:last-of-type {
            color: rgba(0, 0, 0, 0.5);
            line-height: 30px;
            font-size: 16px;
            margin-top: 16px;
            display: none;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .A-Tune .title {
    width: 315px;
    font-size: 18px;
    line-height: 18px;
    span {
      font-size: 16px;
      line-height: 26px;
      left: 45%;
      top: -17px;
    }
  }
  .A-Tune .document {
    width: 100%;
    margin: 37px auto 80px auto;
    .doc-list {
      flex-direction: column;
      width: 310px;
      .item {
        width: 310px;
        height: 158px;
        margin-bottom: 30px;
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        &:nth-of-type(2),
        &:last-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        img {
          width: 90px;
          height: 90px;
        }
        div {
          width: 160px;
          margin-left: 20px;
          p {
            font-size: 16px;
            line-height: 30px;
            &:last-of-type {
              line-height: 26px;
              font-size: 14px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}

.bisheng {
  padding-bottom: 200px;
  @media screen and (max-width: 1120px) {
    padding-bottom: 80px;
  }
}
.bisheng .title {
  font-size: 36px;
  color: #000000;
  line-height: 48px;
  position: relative;
  text-align: center;
  span {
    font-size: 36px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.05);
    line-height: 48px;
    position: absolute;
    left: 47%;
    top: -24px;
  }
  @media screen and (max-width: 1120px) {
    width: 315px;
    font-size: 18px;
    line-height: 18px;
    margin: 0 auto;
    span {
      font-size: 16px;
      line-height: 26px;
      left: 39%;
      top: -17px;
    }
  }
}
.bisheng .list {
  width: 1330px;
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1120px) {
    width: 100%;
  }
}
.other-desc {
  width: 100%;
  background-image: url("/img/minisite/atune/desc-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-bottom: 44px;
  & > div {
    width: 1120px;
  }
  p {
    color: #ffffff;
    line-height: 48px;
    font-size: 18px;
  }
}

@media screen and (max-width: 1120px) {
  width: 315px;
  .content {
    flex-direction: column-reverse;
    justify-content: center;
    .text {
      width: 315px;
      p {
        font-size: 16px;
        line-height: 30px;
      }
    }
    img {
      width: 100px;
      height: 100px;
      margin: 0 auto 20px auto;
    }
  }
  .other-desc {
    height: 370px;
    background-image: url("/img/minisite/atune/desc-mobile.png");
    p {
      width: 315px;
      margin: 0 auto;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
    }
  }
}
.bisheng .banner-box {
  width: 1120px;
  margin: 78px auto;
  display: flex;
  justify-content: space-between;
  .text {
    h1 {
      color: #000000;
      font-size: 24px;
      line-height: 48px;
      font-weight: bold;
      &:first-of-type {
        font-size: 50px;
        line-height: 60px;
        margin: 34px 0 40px 0;
        width: 312px;
      }
    }
  }
  img {
    margin-left: 336px;
    width: 500px;
    height: 360px;
  }
  @media screen and (max-width: 1120px) {
    width: 315px;
    margin: 40px auto 20px auto;
    overflow: hidden;
    flex-direction: column-reverse;
    position: relative;
    .text {
      width: 100%;
      p {
        color: #002fa7;
        text-align: center;
        font-size: 18px;
        line-height: 20px;
        &:first-of-type {
          font-size: 28px;
          color: #000000;
          line-height: 30px;
          position: absolute;
          width: 100%;
          left: 0;
          top: 0;
          margin: 0;
        }
      }
    }
    img {
      width: 260px;
      height: 200px;
      display: block;
      margin: 60px auto 42px auto;
    }
  }
}
.bisheng .bisheng-desc {
  font-size: 18px;
  color: #000000;
  line-height: 48px;
  width: 100%;
  background-image: url("/img/minisite/svirt/svirt-bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  .desc-list,
  .more-info {
    width: 1120px;
    margin: 0 auto;
  }
  .more-info {
    ul {
      padding: 0 0 50px 20px;
      list-style: disc;
      li {
        color: rgba(0, 0, 0, 0.5);
        span {
          color: #000000;
        }
        .theme {
          font-weight: bold;
        }
      }
    }
  }
  @media screen and (max-width: 1120px) {
    font-size: 16px;
    line-height: 30px;
    .desc-list,
    .more-info {
      width: 315px;
    }
  }
}
.bisheng .link-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1120px;
  margin: 50px auto;
  & > div {
    position: relative;
  }
  & > div:hover .tip {
    display: block;
  }
  img {
    width: 196px;
    height: 157px;
    display: block;
    cursor: pointer;
    // margin-right: 112px;
  }
  .tip {
    display: none;
    position: absolute;
    top: 65%;
    left: 60%;
    width: 143px;
    padding: 30px 0;
    background: #ffffff;
    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 47, 167, 0.5);
    .d3 {
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      border-left: 1px solid rgba(0, 47, 167, 0.5);
      border-top: 1px solid rgba(0, 47, 167, 0.5);
      box-sizing: border-box;
      position: absolute;
      top: -6px;
      left: 20px;
      background: #fff;
    }
    a {
      font-size: 16px;
      color: #000000;
      line-height: 18px;
      display: block;
      text-align: center;
      text-decoration: none;
      margin-bottom: 20px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    a:hover {
      color: #002fa7;
    }
  }
  .hidden {
    display: none !important;
  }

  @media screen and (max-width: 1120px) {
    flex-direction: column;
    width: 315px;
    align-items: center;
    margin: 40px auto;
    .tip {
      left: 40%;
      z-index: 200;
    }
    & > div {
      margin-bottom: 21px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    img {
      width: 176px;
      height: 141px;
    }
  }
}

.bisheng .reference {
  padding-top: 124px;
  .menu-title {
    display: flex;
    width: 1120px;
    margin: auto;
    justify-content: center;
    div {
      display: inline-block;
      height: 48px;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      text-align: justify;
      line-height: 48px;
      font-weight: 400;
      margin-left: 40px;
      cursor: pointer;
    }
    .active {
      font-size: 20px;
      color: #000000;
      .title-border {
        width: 54px;
        height: 4px;
        background: #002fa7;
      }
    }
  }
  .link-list {
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    flex-direction: row;
    align-items: baseline;

    .item {
      cursor: pointer;
      width: 410px;
      margin-bottom: 30px;
      padding: 25px 0;
      background: #ffffff;
      box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 18px;
      color: #000000;
      text-align: center;
      line-height: 28px;
      transition: background-color 0.3s;
      &:hover {
        color: #ffffff;
        background-color: #002fa7;
      }
    }
  }

  .move-content {
    width: 1120px;
    margin: 30px auto 0;
    p {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
      letter-spacing: 0;
      line-height: 32px;
    }
  }
  @media screen and (max-width: 1120px) {
    padding-top: 57px;
    .menu-title {
      width: 100%;
      justify-content: space-around;
      div {
        margin: 0;
      }
    }
    .h5-link {
      margin-top: 37px;
      a {
        display: block;
        color: #002fa7;
        text-align: center;
        margin-bottom: 30px;
        text-decoration: none;
        font-size: 16px;
        line-height: 30px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
