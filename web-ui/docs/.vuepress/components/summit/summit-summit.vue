<template>
  <div>
    <titlenav
      class="titlenav"
      v-show="isShowNav"
      :currentIndex="activeIndex"
      :dataList="i18n.summit.NAV_LIST"
    ></titlenav>
    <div class="banner">
      <a
        href="#live"
      >
        <img class="main" :src="i18n.summit.SUMMIT_BANNER.PC_IMG" />
      </a>
    </div>
    <div class="h5-banner">
      <a
        href="#live"
        ><img :src="i18n.summit.SUMMIT_BANNER.MOBILE_IMG"
      /></a>
    </div>
    <div class="container">
      <div class="text-wrapper">
        <p class="text">{{ i18n.summit.SUMMIT_INTRODUCE }}</p>
      </div>
      <!-- 直播模块 -->
      <liveroom
        :liveData="i18n.summit.SUMMITLIVE"
        :isPass="false"
        class="summit-live"
        id="live"
      ></liveroom>
      <div class="agenda" id="agenda">
        <div :class="['title', $lang === 'en' ? 'en-title' : '']">
          <img v-lazy="agendaData.WEB_TITLE" alt="" v-if="!isShowH5" />
          <img v-lazy="agendaData.MOBILE_TITLE" alt="" v-else />
        </div>
        <div class="time-box">
          <el-tabs v-model="showTab" @tab-click="tabClick">
            <el-tab-pane :label="dateArr[0]" name="nine"></el-tab-pane>
            <el-tab-pane :label="dateArr[1]" name="ten"></el-tab-pane>
          </el-tabs>
          <!-- 10号按钮 -->
          <el-radio-group
            v-model="showBtn"
            @change="changeTime"
            v-show="showTab === 'ten'"
          >
            <el-radio-button label="forenoon">{{ dateArr[2] }}</el-radio-button>
            <el-radio-button label="afternoon">{{
              dateArr[3]
            }}</el-radio-button>
          </el-radio-group>
          <!-- 9号按钮 -->
          <el-radio-group
            v-model="showBtn"
            @change="changeTime"
            v-show="showTab === 'nine'"
          >
            <el-radio-button label="forenoon">{{ dateArr[2] }}</el-radio-button>
            <el-radio-button label="afternoon">{{
              dateArr[3]
            }}</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 10号表格 -->
        <div
          :class="['calendar-content', showTab === 'nine' ? 'center-p' : '']"
          v-show="showTab === 'ten' && showBtn === 'forenoon'"
        >
          <el-table
            :data="agendaTableData"
            :show-header="false"
            :span-method="objectSpanMethod"
            style="width: 100%"
            v-if="!isShowH5"
            empty-text="敬请期待"
          >
            <el-table-column prop="icon" width="30">
              <i class="el-icon-time"></i>
            </el-table-column>
            <el-table-column prop="TIME" width="200"> </el-table-column>
            <el-table-column prop="THEME" width="470"> </el-table-column>
            <el-table-column prop="SPEAKER" width="90"> </el-table-column>
            <el-table-column prop="POSITION" width="280"> </el-table-column>
          </el-table>
          <div class="mobile-table tenDay" v-if="isShowH5">
            <div
              class="item"
              v-for="(item, index) in agendaTableData"
              :key="index"
            >
              <div class="time">{{ item.TIME }}</div>
              <div class="agenda">
                <p>{{ item.THEME }}</p>
                <p v-if="item.SPEAKER || item.POSITION">
                  <span>{{ item.SPEAKER }}</span>
                  <span>{{ item.POSITION }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 9号上午 -->
        <div
          :class="['calendar-content', showTab === 'nine' ? 'center-p' : '']"
          v-show="showTab === 'nine' && showBtn === 'forenoon'"
        >
          <el-table
            :data="i18n.summit.AGENDA.FORENOON_AGENDA_9"
            :show-header="false"
            style="width: 100%"
            v-if="!isShowH5"
            empty-text="敬请期待"
          >
            <el-table-column prop="icon" width="30">
              <i class="el-icon-time"></i>
            </el-table-column>
            <el-table-column prop="TIME" width="200"> </el-table-column>
            <el-table-column prop="THEME" width="470"> </el-table-column>
            <el-table-column prop="SPEAKER" width="370"> </el-table-column>
          </el-table>
          <div class="mobile-table nineDay" v-if="isShowH5">
            <div
              class="item"
              v-for="(item, index) in i18n.summit.AGENDA.FORENOON_AGENDA_9"
              :key="index"
            >
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
        <!-- 9号表格 -->
        <div
          :class="['calendar-content', showTab === 'nine' ? 'center-p' : '']"
          v-show="showTab === 'nine' && showBtn === 'afternoon'"
        >
          <div class="forum-title" :class="{ 'sub-title': isShowH5 }">
            {{ agendaData.SUB_FORUM }}
          </div>
          <div class="head-list">
            <div
              class="head-item"
              :class="{ forumActive: forumTab === index }"
              @click="forumClick(index)"
              v-for="(item, index) in agendaData.FORUM_HEAD"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <el-table
            :data="forumList"
            :show-header="false"
            :span-method="SpanMethod"
            :class="showTab === 'nine' ? 'hideIcon' : ''"
            style="width: 100%"
            v-if="!isShowH5"
            empty-text="敬请期待"
          >
            <el-table-column prop="icon" width="30">
              <i class="el-icon-time"></i>
            </el-table-column>
            <el-table-column prop="TIME" width="200"> </el-table-column>
            <el-table-column prop="THEME" width="414"> </el-table-column>
            <el-table-column prop="SPEAKER" width="140">
              <template slot-scope="scope">
                <p>{{ scope.row.SPEAKER }}</p>
                <p
                  v-if="scope.$index == 1 && forumTab == 2"
                  class="specialTable"
                >
                  {{ scope.row.SPEAKER2 }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="POSITION" width="320">
              <template slot-scope="scope">
                <p>{{ scope.row.POSITION }}</p>
                <p v-if="scope.$index == 8 && forumTab == 3">
                  {{ scope.row.POSITION2 }} {{ scope.row.POSITION3 }}
                </p>
                <p
                  v-if="scope.$index == 1 && forumTab == 2"
                  class="specialTable"
                >
                  {{ scope.row.POSITION2 }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div class="mobile-table nine" v-if="isShowH5">
            <div class="select-box">
              <el-select class="mobile-select" v-model="value">
                <el-option
                  v-for="(item, index) in agendaData.FORUM_HEAD"
                  :key="index"
                  :value="item"
                  @click.native="forumClick(index)"
                >
                </el-option>
              </el-select>
            </div>
            <div class="item" v-for="(item, index) in forumList" :key="index">
              <div class="time">{{ item.TIME }}</div>
              <div class="agenda">
                <p>{{ item.THEME }}</p>
                <p
                  v-if="item.SPEAKER || item.POSITION"
                  :class="[
                    {
                      longname: forumTab == 1 && (index == 0 || index == 1),
                    },
                    {
                      longname: forumTab == 3 && index == 4,
                    },
                    {
                      longname: forumTab == 0 && (index == 4 || index == 6),
                    },
                  ]"
                >
                  <span>{{ item.SPEAKER }}</span>
                  <span style="vertical-align: top">{{ item.POSITION }}</span>
                  <span v-if="forumTab === 3 && index === 8" class="special-mo"
                    >{{ item.POSITION2 }}<br />{{ item.POSITION3 }}</span
                  >
                </p>
                <p v-if="forumTab === 2 && index === 1">
                  <span>{{ item.SPEAKER2 }}</span
                  ><span>{{ item.POSITION2 }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <carousel
          :class="{ carousel: isShowH5 }"
          v-if="isShowcarousel"
          :agendaData="carouselObj"
          :sigData="sigObj"
        ></carousel>
        <div class="exhibition-title">
          <img src="/img/summit/summit2021/exhirition-title.png" alt="" v-if="!isShowH5" />
          <img src="/img/summit/summit2021/exhirition-title-mo.png" alt="" v-else>
        </div>
        <exhibition
          id="exhibition"
          :class="{ 'mobile-exhibition': isShowH5 }"
        ></exhibition>
        <div class="lecturer" id="lecturer">
          <div class="title">
            <img
              v-lazy="lecturerData.LECTURER_BANNER.mobile"
              alt=""
              v-if="isShowH5"
            />
            <img v-lazy="lecturerData.LECTURER_BANNER.web" alt="" v-else />
          </div>
          <div
            class="lecturer-box"
            v-fade
            v-if="lecturerData.LECTURER_LIST.length && !isShowH5"
          >
            <div
              class="item fade-in"
              v-for="(item, index) in lecturerData.LECTURER_LIST"
              :key="index"
            >
              <img v-lazy="item.IMG" alt="" />
              <p>{{ item.NAME }}</p>
              <p>{{ item.POSITION }}</p>
            </div>
          </div>
          <div
            class="lecturer-box"
            v-fade
            v-if="lecturerData.LECTURER_LIST.length && isShowH5"
          >
            <div
              :class="['item', 'fade-in']"
              v-for="(item, index) in lecturerData.LECTURER_LIST"
              :key="index"
            >
              <img v-lazy="item.IMG" alt="" />
              <p>{{ item.NAME }}</p>
              <p>{{ item.POSITION }}</p>
            </div>
          </div>
        </div>
        <div class="lecturer" id="publisher">
          <div class="title">
            <img
              v-lazy="lecturerData.PUBLISHER_BANNER.mobile"
              alt=""
              v-if="isShowH5"
            />
            <img v-lazy="lecturerData.PUBLISHER_BANNER.web" alt="" v-else />
          </div>
          <div
            class="lecturer-box"
            v-fade
            v-if="lecturerData.PUBLISHER_LIST.length && !isShowH5"
          >
            <div
              class="item fade-in"
              v-for="(item, index) in lecturerData.PUBLISHER_LIST"
              :key="index"
            >
              <img v-lazy="item.IMG" alt="" />
              <p>{{ item.NAME }}</p>
              <p>{{ item.POSITION }}</p>
            </div>
          </div>
          <div
            class="lecturer-box"
            v-fade
            v-if="lecturerData.PUBLISHER_LIST.length && isShowH5"
          >
            <div
              class="item fade-in"
              v-for="(item, index) in lecturerData.PUBLISHER_LIST"
              :key="index"
            >
              <img v-lazy="item.IMG" alt="" />
              <p>{{ item.NAME }}</p>
              <p>{{ item.POSITION }}</p>
            </div>
          </div>
        </div>
        <div class="construction" id="construction">
          <div class="construction-title">
            <img v-lazy="construction.WEB_TITLE" alt="" v-if="!isShowH5" />
            <img v-lazy="construction.MOBILE_TITLE" alt="" v-else />
          </div>
          <div class="guidance">
            <div class="text-title">
              {{ guidanceData.TEXT_TITLE }}
            </div>
            <div class="img-list">
              <img
                v-lazy="item.IMG"
                alt=""
                v-for="(item, index) in guidanceData.LIST"
                :key="index"
              />
            </div>
          </div>
          <div class="host">
            <div class="text-title">
              {{ hostData.TEXT_TITLE }}
            </div>
            <div class="img-list">
              <img
                v-lazy="item.IMG"
                alt=""
                v-for="(item, index) in hostData.LIST"
                :key="index"
              />
            </div>
          </div>
          <div class="stratagic">
            <div class="text-title">
              {{ stratagicData.TEXT_TITLE }}
            </div>
            <div class="img-list">
              <img
                v-lazy="item.IMG"
                alt=""
                v-for="(item, index) in stratagicData.LIST"
                :key="index"
              />
            </div>
          </div>
          <div class="sponsored">
            <div class="text-title">
              {{ sponsoredData.TEXT_TITLE }}
            </div>
            <div class="img-list">
              <img
                v-lazy="item.IMG"
                alt=""
                v-for="(item, index) in sponsoredData.LIST"
                :key="index"
              />
            </div>
          </div>
          <div class="organizer">
            <div class="text-title">
              {{ organizerData.TEXT_TITLE }}
            </div>
            <div class="img-list">
              <img
                v-lazy="item.IMG"
                alt=""
                v-for="(item, index) in organizerData.LIST"
                :key="index"
              />
            </div>
          </div>
          <div class="support">
            <div class="text-title">
              {{ supportData.TEXT_TITLE }}
            </div>
            <div class="img-list">
              <img
                v-lazy="item.IMG"
                alt=""
                v-for="(item, index) in supportData.LIST"
                :key="index"
              />
            </div>
          </div>
          <div class="foundation">
            <div class="text-title">
              {{ foundation.TEXT_TITLE }}
            </div>
            <div class="img-list">
              <img
                v-lazy="item.IMG"
                alt=""
                v-for="(item, index) in foundation.LIST"
                :key="index"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="review-wrapper">
        <div class="title">
          <span>{{ i18n.summit.HIGHLIGHTS }}</span>
          <img src="/img/summit/devday-2021/review.png" />
        </div>
        <div @click="go('/interaction/summit-list/devday2021/')" class="link">
          openEuler Developer Day 2021
        </div>
        <div @click="go('/interaction/summit-list/')" class="link">
          openEuler Summit 2020
        </div>
        <div @click="go('/interaction/summit-list/list/')" class="link">
          openEuler Virtual Summit 2020
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from "./carousel.vue";
import titlenav from "./titleNav.vue";
import liveroom from "./liveroom.vue";
import exhibition from "./exhibition.vue";

export default {
  components: {
    carousel,
    titlenav,
    liveroom,
    exhibition,
  },
  data() {
    return {
      value: "麒麟软件",
      showTab: "ten",
      showBtn: "forenoon",
      agendaData: {},
      dateArr: [],
      isShowNav: false,
      agendaTableData: [],
      isShowcarousel: false,
      isShowBtn: true,
      construction: {},
      guidanceData: {},
      hostData: {},
      stratagicData: {},
      sponsoredData: {},
      organizerData: {},
      supportData: {},
      foundation: {},
      sigObj: {},
      carouselObj: {},
      forumData: [],
      forumList: [],
      forumTab: 0,
      lecturerData: {},
      activeIndex: -1,
    };
  },
  created() {
    this.agendaData = this.i18n.summit.AGENDA;
    this.lecturerData = this.i18n.summit.LECTURER;
    this.carouselObj = this.agendaData.AFTERNOON_AGENDA_10;
    this.sigObj = this.agendaData.SIG_CONTENT;
  },
  mounted() {
    window.addEventListener("scroll", this.scroTop);
    this.agendaTableData = this.agendaData.FORENOON_AGENDA_10;
    this.construction = this.i18n.summit.CONSTRUCTION;
    this.guidanceData = this.construction.GUIDANCE;
    this.hostData = this.construction.HOST;
    this.stratagicData = this.construction.STRATEGIC;
    this.sponsoredData = this.construction.CO_SPONSORED;
    this.organizerData = this.construction.CO_ORGANIZER;
    this.supportData = this.construction.SUPPORT;
    this.foundation = this.construction.FOUNDATION;
    this.dateArr = this.agendaData.DATE;
    this.forumData = this.agendaData.AFTERNOON_AGENDA_9;
    this.carouselObj = this.agendaData.AFTERNOON_AGENDA_10;
    this.sigObj = this.agendaData.SIG_CONTENT;
    this.forumClick(0);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroTop);
  },
  methods: {
    forumClick(index) {
      this.forumTab = index;
      this.forumList = this.forumData[index];
    },
    scroTop() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      let value = 0;
      if (this.showTab === "ten" && this.showBtn === "afternoon") {
        value = 1400;
      }
      if (scrollTop < 500 || scrollTop > 7200 + value) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }
      if (scrollTop > 500 && scrollTop < 1000) {
        this.activeIndex = 0;
      } else if (scrollTop > 1620 && scrollTop < 2120 + value) {
        this.activeIndex = 1;
      } else if (scrollTop > 2620 + value && scrollTop < 3020 + value) {
        this.activeIndex = 2;
      } else if (scrollTop > 3220 + value && scrollTop < 4000 + value) {
        this.activeIndex = 3;
      } else if (scrollTop > 4300 + value && scrollTop < 5000 + value) {
        this.activeIndex = 4;
      } else if (scrollTop > 5400 + value && scrollTop < 7200 + value) {
        this.activeIndex = 5;
      } else {
        return false;
      }
    },
    go(url) {
      const routeUrl = this.$router.resolve(this.resolvePath(url));
      window.open(routeUrl.href);
    },
    tabClick(tab) {
      this.showTab = tab.name;
      if (tab.name === "nine") {
        this.isShowBtn = false;
        this.isShowcarousel = false;
        this.showBtn = "forenoon";
      } else if (tab.name === "ten") {
        this.agendaTableData = this.agendaData.FORENOON_AGENDA_10;
        this.isShowBtn = true;
        this.showBtn = "forenoon";
      } else {
        return false;
      }
    },
    changeTime(tab) {
      this.showBtn = tab;
      if (tab === "forenoon" && this.showTab === "ten") {
        this.isShowcarousel = false;
        this.agendaTableData = this.agendaData.FORENOON_AGENDA_10;
      } else if (tab === "afternoon" && this.showTab === "ten") {
        this.isShowcarousel = true;
      } else if (this.showTab === "nine" && tab === "afternoon") {
        this.forumClick(0);
      } else {
        return false;
      }
    },
    // 9号表格合并函数
    SpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.showTab === "nine") {
        if (this.forumTab === 1 && (rowIndex === 0 || rowIndex === 1)) {
          if (columnIndex === 3)
            return {
              rowspan: 1,
              colspan: 2,
            };
        }
        if (this.forumTab === 3 && rowIndex === 4) {
          if (columnIndex === 3) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          }
        }
        if (this.forumTab === 0 && (rowIndex === 4 || rowIndex === 6)) {
          if (columnIndex === 3) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          }
        }
      } else {
        return false;
      }
    },
    // 10号表格合并函数
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.showTab === "ten" && this.showBtn === "forenoon") {
        if (
          rowIndex === 7 ||
          rowIndex === 6 ||
          rowIndex === 5 ||
          rowIndex === 8 ||
          rowIndex === 9
        ) {
          if (columnIndex === 3) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          }
        }
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.h5-banner {
  display: none;
  margin-bottom: 40px;
  .title {
    text-align: center;
    font-size: 24px;
    line-height: 34px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  img {
    display: block;
    width: 375px;
    margin: 0 auto;
  }
  @media screen and (max-width: 1000px) {
    display: block;
  }
}
.el-table_3_column_13 {
  p {
    padding-left: 20px;
  }
}
.banner {
  @media screen and (max-width: 1000px) {
    display: none;
  }
  height: 380px;
  width: 100%;
  margin-bottom: 50px;
  a {
    display: inline-block;
    width: 100%;
    text-align: center;
    @media screen and (min-width: 2500px) {
      display: flex;
      justify-content: space-around;
    }
    .main {
      max-width: 1920px;
      width: 100%;
      height: 100%;
    }
  }
}
.titlenav {
  @media screen and (max-width: 1550px) {
    display: none;
  }
}
.mobile-exhibition {
  overflow-x: scroll;
}
.container {
  width: 1120px;
  margin: 0 auto;
  margin-bottom: 100px;
  @media screen and (max-width: 1000px) {
    margin-bottom: 60px;
    padding: 0 10px;
    width: 100%;
  }
   .exhibition-title {
    text-align: center;
    font-size: 24px;
    line-height: 34px;
    margin: 70px 0 40px 0;
    img {
    display: block;
    width: 900px;
    margin: 0 auto;
  }
    @media screen and (max-width: 1000px) {
    margin-top: 40px;
    img {
      width: 355px;
      height: 38px;
    }
  }
  }
  .summit-live {
    margin-bottom: 90px;
    @media screen and (max-width: 1000px) {
      margin-bottom: 40px;
    }
  }
  .text-wrapper {
    margin-bottom: 50px;
    color: #000;
    font-size: 20px;
    line-height: 40px;
    @media screen and (max-width: 1000px) {
      padding: 0 20px;
      font-size: 14px;
      line-height: 26px;
      margin-bottom: 40px;
    }
  }
  .carousel {
    padding: 0 10px;
  }
  .construction {
    text-align: center;
    .construction-title {
      margin: 40px 0;
    }
    .text-title {
      margin-bottom: 10px;
      font-size: 20px;
      font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
      color: #000000;
      line-height: 46px;
    }
    .img-list {
      margin-bottom: 40px;
      img {
        cursor: pointer;
        width: 280px;
        height: 80px;
      }
    }
    .foundation,
    .sponsored,
    .organizer,
    .support {
      .img-list {
        margin: 0 auto 40px auto;
        width: 1120px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        img {
          margin-bottom: 10px;
          // display: block;
        }
      }
      @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .img-list {
          width: 100%;
          flex-direction: column;
          img {
            margin: 0 auto 10px auto;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    @media screen and (max-width: 1000px) {
      .construction-title {
        margin: 30px 0;
        img {
        width: 335px;
        }
      }
      .text-title {
        margin-bottom: 0;
        font-size: 16px;
      }
      .img-list {
        margin-bottom: 30px;
        img {
          width: 210px;
          height: 60px;
        }
      }
    }
  }
  .calendar-content {
    margin-top: 18px;
  }
  /deep/#agenda {
    @media screen and (max-width: 1000px) {
      overflow: hidden;
      .el-radio-group {
        display: block;
        text-align: center;
        span {
          padding: 7px 16px;
        }
      }
    }
    margin-bottom: 100px;
    .forum-title {
      margin: 30px auto 20px;
      line-height: 30px;
      text-align: center;
      font-size: 22px;
      color: rgba(0, 0, 0, 0.85);
    }
    .sub-title {
      margin: 20px auto 20px;
      width: 140px;
      font-size: 16px;
    }
    .head-list {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      .head-item {
        margin-right: 20px;
        cursor: pointer;
        height: 70px;
        width: 170px;
        text-align: center;
        line-height: 70px;
        user-select: none;
        transition: all .3s;
        box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        &:last-child {
          margin: 0;
        }
      }
      @media screen and (max-width: 1000px) {
        display: none;
      }
    }
    .specialTable {
      padding-top: 10px;
      font-size: 18px;
    }
    .nameTable {
      text-align: center;
    }
    .forumActive {
      color: #ffffff;
      background-color: #002fa7;
    }
    .el-table {
      &::before {
        width: 95%;
      }
      font-size: 18px;
      .cell {
        padding: 0;
      }
    }
    .el-tabs__nav-scroll {
      @media screen and (max-width: 1000px) {
        display: flex;
        justify-content: center;
      }
    }
    .el-tabs__item {
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
    .el-table_1_column_1,
    .el-table_1_column_2,
    .el-table_1_column_5,
    .el-table_2_column_7,
    .el-table_3_column_11 {
      color: rgba(0, 0, 0, 0.5);
    }
    .el-table_1_column_5 {
      font-size: 16px;
    }
    .el-table_2_column_8,
    .el-table_2_column_9,
    .el-table_1_column_3,
    .el-table_3_column_12,
    .el-table_1_column_4 {
      .cell {
        color: #000;
      }
    }
    .el-table_2_column_9 {
      .cell {
        padding-left: 40px;
        padding-right: 20px;
      }
    }
    .is-active {
      color: #002fa7;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .title {
      width: 900px;
      position: relative;
      margin: 0 auto 30px;
      img {
        width: 900px;
        height: 76px;
      }
      @media screen and (max-width: 1000px) {
        width: 335px;
        img {
          width: 335px;
          height: 38px;
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    #agenda {
      margin-bottom: 50px;
    }
  }
  // 移动端峰会日程
  .mobile-table {
    padding: 0 20px;
  }
  .tenDay,
  .nineDay {
    margin-top: 20px;
    font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
    .item {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      &:last-of-type {
        border-bottom: 0;
        margin-bottom: 0;
      }
      .time {
        flex-shrink: 0;
        flex-basis: 82px;
        width: 82px;
        height: 20px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
        margin: 0 27px 0 0;
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
            &:first-of-type,
            &:last-of-type {
              display: inline-block;
            }
            &:last-of-type {
              width: 200px;
            }
          }
        }
      }
    }
    .item:nth-child(-n + 10):nth-child(n + 6) {
      p span:first-of-type {
        width: 180px;
      }
      p span:last-of-type {
        width: 0;
      }
    }
  }
  .nineDay {
    .item:nth-child(-n + 10):nth-child(n + 6) {
      p span:first-of-type {
        width: 180px;
      }
    }
  }
  .nine {
    .select-box {
      margin-bottom: 30px;
      text-align: center;
      .mobile-select {
        width: 315px;
        height: 32px;
        color: rgba(0, 0, 0, 0.3);
      }
    }
    .item {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      &:first-of-type {
        .agenda {
          margin: 20px 0 0 0;
        }
      }
      &:last-of-type {
        border-bottom: 0;
      }
      .time {
        flex-shrink: 0;
        flex-basis: 82px;
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
          span {
            &:first-of-type {
              margin-right: 25px;
              width: 48px;
              vertical-align: top;
            }
            &:first-of-type,
            &:last-of-type {
              vertical-align: top;
              display: inline-block;
            }
          }
        }
        .longname {
          span {
            width: 150px !important;
          }
          span {
            &:last-of-type {
              width: 0 !important;
            }
          }
        }
        .special-mo {
          padding-left: 76px;
        }
      }
    }
  }
  .link-wrapper {
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    line-height: 1;
    width: 80%;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;
    }
    img {
      height: 234px;
      width: 246px;
      border-radius: 8px;
      @media screen and (max-width: 1000px) {
        margin-bottom: 30px;
      }
    }
  }
  .schedule-pc {
    margin-bottom: 50px;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .schedule-h5 {
    display: none;
    margin-bottom: 40px;
    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
  .review-wrapper {
    padding: 0 20px;
    .title {
      font-size: 26px;
      margin-bottom: 32px;
      @media screen and (max-width: 1000px) {
        margin-bottom: 10px;
      }
      span {
        vertical-align: middle;
        @media screen and (max-width: 1000px) {
          font-size: 16px;
        }
      }
      img {
        @media screen and (max-width: 1000px) {
          display: none;
        }
        width: 28px;
        height: 28px;
        vertical-align: middle;
      }
    }
    .link {
      color: #002fa7;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 24px;
      cursor: pointer;
      @media screen and (max-width: 1000px) {
        margin-bottom: 12px;
        font-size: 14px;
      }
    }
  }
}
.lecturer {
  width: 1029px;
  margin: 70px auto 0;
  .lecturer-box {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .item {
      width: 180px;
      margin: 0 103px 30px 0;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      img {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        display: block;
      }
      p {
        font-size: 16px;
        color: #002fa7;
        line-height: 16px;
        margin-top: 20px;
        width: 180px;
        text-align: center;
        &:last-of-type {
          word-spacing: 100vw;
          font-size: 14px;
          font-weight: 400;
          color: #000000;
          line-height: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    width: 345px;
    .lecturer-box {
      margin-top: 20px;
      .hidden {
        display: none;
      }
      .item {
        width: 155px;
        margin-right: 35px;
        &:nth-of-type(2n) {
          margin-right: 0;
        }
        p {
          width: 155px;
        }
      }
    }
    .show-all {
      display: block;
      text-align: center;
      margin-top: 20px;
      p {
        color: #002fa7;
      }
    }
  }
  @media screen and (min-width: 1000px) and (max-width: 1120px) {
    width: 1020px;
    .lecturer-box {
      .item {
        margin-right: 100px;
      }
    }
  }
}
@media screen and (max-width: 370px) {
  // 适配iphone5
  .container .text-wrapper .title img,
  .container .text-wrapper .calendar-content img {
    width: 280px;
  }
  .container .text-wrapper .party-box img {
    width: 270px;
  }
  .container .lecturer {
    width: 300px !important;
  }
  .container .title img {
    width: 300px !important;
    height: 34px !important;
  }
  .container .lecturer .lecturer-box .item {
    margin-right: 20px !important;
  }
  .container .lecturer .lecturer-box .item:nth-of-type(2n) {
    margin-right: 0 !important;
  }
}
@media screen and (min-width: 1000px) and (max-width: 1120px) {
  // 适配ipad Pro
  .container,
  .container .banner img {
    width: 100% !important;
  }
}
</style>