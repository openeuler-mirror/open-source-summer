<template>
  <div class="internship">
    <titlenav
      class="titlenav"
      v-show="isShowNav"
      :currentIndex="activeIndex"
      :dataList="i18n.learn.NAV_LIST"
      :internship="true"
    ></titlenav>
    <div class="internship-banner">
      <a href="#task">
        <img
          class="banner-pc"
          src="/img/internship/internship-banner.png"
          alt
        />
        <img
          class="banner-mo"
          src="/img/internship/internship-banner-mo.png"
          alt
        />
      </a>
    </div>
    <div class="internship-list">
      <div class="warper">
        <div class="intership-introduce do-jump" id="introduce">
          <p>{{ i18n.learn.INTRODUCE }}</p>
        </div>
        <div class="step do-jump" id="step">
          <div class="step-title title">
            <img :src="STEP.TITLE" alt />
          </div>
          <div class="step-content">
            <div class="step-nav">
              <div
                class="step-bar"
                :class="{ stepActive: index == stepActive }"
                v-for="(item, index) in STEP.STEPNAV"
                :style="`background:url(${item.IMG}) no-repeat;`"
                :key="item.IMG"
                @click="stepChange(index)"
              >
                <img :src="item.ACTIVE" alt />
              </div>
            </div>
            <div class="step-body" :class="{ 'step-body-en': $lang === 'en' }">
              <div class="step-text" v-show="stepActive === 0">
                <img class="number" src="/img/internship/1.png" alt />
                <h4>{{ STEP.STEP_ONE.TITLE }}</h4>
                <div class="main-text">
                  <p>{{ STEP.STEP_ONE.TEXT1 }}</p>
                  <p>
                    {{ STEP.STEP_ONE.TEXT2 }}
                    <a
                      href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4A68T?from=project-issue"
                      target="_blank"
                      >{{ STEP.STEP_ONE.LINK1 }}</a
                    >
                    {{ STEP.STEP_ONE.TEXT3 }}
                  </p>
                  <p>{{ STEP.STEP_ONE.TEXT4 }}</p>
                  <div class="attention">
                    <p>
                      {{ STEP.STEP_ONE.ATTENTION1 }}
                      <a href="mailto:intern@openeuler.sh"
                        >intern@openeuler.sh</a
                      >
                      {{ STEP.STEP_ONE.ATTENTION2 }}
                      <span class="orange">{{ STEP.STEP_ONE.TIP }}</span>
                    </p>
                    <a
                      href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/01%20%E5%AE%9E%E4%B9%A0%E7%94%B3%E8%AF%B7%E6%9D%90%E6%96%99%E6%A8%A1%E6%9D%BF.rar"
                      download
                      class="download"
                      >{{ STEP.STEP_ONE.DONWLOAD }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="step-text" v-show="stepActive === 1">
                <img class="number" src="/img/internship/2.png" alt />
                <h4>{{ STEP.STEP_TOW.TITLE }}</h4>
                <div class="main-text">
                  <p>{{ STEP.STEP_TOW.P_TEXT[0] }}</p>
                  <p>
                    {{ STEP.STEP_TOW.P_TEXT[1] }}
                    <span class="blue">{{ STEP.STEP_TOW.P_TEXT[2] }}</span>
                    {{ STEP.STEP_TOW.P_TEXT[3] }}
                  </p>
                  <p>
                    {{ STEP.STEP_TOW.P_TEXT[4] }}
                    <span class="blue">{{ STEP.STEP_TOW.P_TEXT[5] }}</span>
                    {{ STEP.STEP_TOW.P_TEXT[6] }}
                    <span class="blue">{{ STEP.STEP_TOW.P_TEXT[7] }}</span>
                    {{ STEP.STEP_TOW.P_TEXT[8] }}
                  </p>
                  <p>
                    {{ STEP.STEP_TOW.P_TEXT[9] }}
                    <span class="blue">{{ STEP.STEP_TOW.P_TEXT[10] }}</span>
                    {{ STEP.STEP_TOW.P_TEXT[11] }}
                    <span class="orange">{{ STEP.STEP_TOW.P_TEXT[12] }}</span>
                  </p>
                  <div class="attention black">
                    <div class="attention-title">{{ STEP.ATTENTION }}</div>
                    <p>{{ STEP.STEP_TOW.ATTENTION_TEXT[0] }}</p>
                    <p>
                      {{ STEP.STEP_TOW.ATTENTION_TEXT[1] }}
                      <span class="blue">{{
                        STEP.STEP_TOW.ATTENTION_TEXT[2]
                      }}</span>
                      {{ STEP.STEP_TOW.ATTENTION_TEXT[3] }}
                    </p>
                    <a
                      href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/02%20%E4%BB%BB%E5%8A%A1%E8%AE%A4%E9%A2%86%E9%82%AE%E4%BB%B6%E6%A8%A1%E6%9D%BF.rar"
                      download
                      class="download"
                      >{{ STEP.STEP_TOW.DONWLOAD }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="step-text" v-show="stepActive === 2">
                <img class="number" src="/img/internship/3.png" alt />
                <h4>{{ STEP.STEP_ThREE.TITLE }}</h4>
                <div class="main-text">
                  <p>
                    {{ STEP.STEP_ThREE.P_TEXT[0] }}
                    <span class="blue">{{ STEP.STEP_ThREE.P_TEXT[1] }}</span>
                    {{ STEP.STEP_ThREE.P_TEXT[2] }}
                  </p>
                  <p>
                    {{ STEP.STEP_ThREE.P_TEXT[3] }}
                    <span class="blue">{{ STEP.STEP_ThREE.P_TEXT[4] }}</span>
                    {{ STEP.STEP_ThREE.P_TEXT[5] }}
                  </p>
                  <p>
                    {{ STEP.STEP_ThREE.P_TEXT[6] }}
                    <span class="blue">{{ STEP.STEP_ThREE.P_TEXT[7] }}</span>
                    {{ STEP.STEP_ThREE.P_TEXT[8] }}
                  </p>
                  <div class="attention black">
                    <div class="attention-title">{{ STEP.ATTENTION }}</div>
                    <p>
                      {{ STEP.STEP_ThREE.ATTENTION_TEXT[0] }}
                      <span class="blue">
                        {{ STEP.STEP_ThREE.ATTENTION_TEXT[1] }}
                      </span>
                      {{ STEP.STEP_ThREE.ATTENTION_TEXT[2] }}
                    </p>
                  </div>
                  <div class="flow-chart">
                    <img
                      class="chart-pc"
                      src="/img/internship/step-3.png"
                      alt
                    />
                    <img
                      class="chart-mo"
                      src="/img/internship/step-3-mo.png"
                      alt
                    />
                  </div>
                </div>
              </div>
              <div class="step-text" v-show="stepActive === 3">
                <img class="number" src="/img/internship/4.png" alt />
                <div class="main-text">
                  <h4>{{ STEP.STEP_FOUR.TITLE }}</h4>
                  <p>{{ STEP.STEP_FOUR.P_TEXT1[0] }}</p>
                  <div class="attention firstAttention">
                    <p v-for="item in STEP.STEP_FOUR.P_TEXT" :key="item">
                      {{ item }}
                    </p>
                  </div>
                  <p>
                    {{ STEP.STEP_FOUR.P_TEXT1[1] }}
                    <a class="blue" href="mailto:intern@openeuler.sh">
                      {{ STEP.STEP_FOUR.P_TEXT1[2] }}
                    </a>
                    {{ STEP.STEP_FOUR.P_TEXT1[3] }}
                  </p>
                  <div class="attention black">
                    <div class="attention-title">{{ STEP.ATTENTION }}</div>
                    <p
                      v-for="item in STEP.STEP_FOUR.ATTENTION_TEXT"
                      :key="item"
                    >
                      {{ item }}
                    </p>
                    <a
                      href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/03%20%E8%AF%81%E4%B9%A6%E7%94%B3%E8%AF%B7%E6%9D%90%E6%96%99%E5%92%8C%E9%82%AE%E4%BB%B6%E6%A8%A1%E6%9D%BF.rar"
                      download
                      class="download"
                      >{{ STEP.STEP_FOUR.DONWLOAD }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="task" class="do-jump">
          <div class="task-title title">
            <img :src="TASK.TITLE" alt />
          </div>
          <div class="tabbar">
            <el-tabs v-model="community" @tab-click="tabClick">
              <el-tab-pane label="openEuler" name="openEuler"></el-tab-pane>
              <el-tab-pane label="openLooKeng" name="openLooKeng"></el-tab-pane>
              <el-tab-pane label="openGauss" name="openGauss"></el-tab-pane>
              <el-tab-pane label="昇思 MindSpore" name="MindSpore"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="taks-body">
            <p class="task-introduce" v-show="community == 'openEuler'">
              {{ TASK.INTRODUCE }}
            </p>
            <div class="item-box">
              <div
                class="item"
                :class="[
                  {
                    'last-child':
                      community == 'openEuler' &&
                      index + 1 == communityTask.length,
                  },
                  { 'other-community': community !== 'openEuler' },
                  {'mindspore':community==='MindSpore'}
                ]"
                v-for="(item, index) in communityTask"
                :key="index"
              >
                <a :href="item.NAME_LINK" class="item-name" target="_blank">
                  {{ item.NAME }}
                </a>
                <div
                  class="item-intriduce"
                  v-if="item.INTRODUCE"
                >
                  {{ item.INTRODUCE }}
                </div>
                <div v-else class="mindspore-require-box">
                  <div v-for="item in item.TEXT_ARRAY" :key="item">{{item}}</div>
                </div>
                <div class="button-box">
                  <button @click="go(item.TASK)" class="button-left">
                    {{ TASK.INTERNSHIP_TASK }}
                  </button>
                  <button @click="go(item.GITEE)" class="button-right">
                    <span>{{
                          community!=='openEuler'
                        ? i18n.learn.OFFICAL_WEB
                        : TASK.SIG_DETAIL
                    }}</span>
                    <img src="/img/internship/arrow.png" alt />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="integral" class="do-jump">
          <div class="integral-title title">
            <img :src="i18n.learn.INTEGRAL.TITLE" alt />
          </div>
          <div class="integral-border">
            <div class="integral-content">
              <div
                class="integral-item"
                v-for="(item, index) in i18n.learn.INTEGRAL.INTEGRAL_DATA"
                :class="{ circular: index !== 3 }"
                :key="item.HEAD"
              >
                <h3>
                  {{ item.HEAD }}
                  <slot v-if="index === 3"
                    ><span class="supplement-gauss">{{
                      i18n.learn.INTEGRAL.SUPPLEMENT_GAUSS
                    }}</span></slot
                  >
                </h3>
                <div
                  v-for="(item1, index1) in item.TEXT"
                  :key="item1"
                  class="star"
                >
                  <img v-if="index === 3" src="/img/internship/star.png" alt />
                  <p>
                    <slot v-if="index === 1 && index1 === 2">
                      <a href="/doc/开源实习报告模板.docx" title="下载报告模板">{{
                        item1
                      }}</a>
                    </slot>
                    <span v-else>{{ item1 }} <a  v-if="index === 1 && index1 === 1"
                    download
                    :title="i18n.learn.INTEGRAL.INTERNSHIP_COMMENT.TITLE"
                    :href="i18n.learn.INTEGRAL.INTERNSHIP_COMMENT.LINK"
                    >{{i18n.learn.INTEGRAL.INTERNSHIP_COMMENT.TEXT}}</a> </span>
                  </p>
                </div>
                <div class="supplement">{{ item.SUPPLEMENT }}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="rank">
          <div class="rank-title">
            <img class="web" src="/img/internship/rank-title.png" alt />
            <img class="mobile" src="/img/internship/rank-title-mo.png" alt />
          </div>
          <div class="rank-border">
            <div class="rank-content" ref="rankContent">
              <div class="rank-box">
                <div class="rank-top">
                  <div
                    class="top-item"
                    v-for="(item, index) in rankTop"
                    :key="index"
                  >
                    <a
                      class="gitee-name"
                      target="_blank"
                      :href="item.giteeRoom"
                      >{{ item.GiteeId }}</a
                    >
                    <div class="score">
                      {{ item.integralValue }}
                      <span>{{ i18n.learn.RANK.SCORE }}</span>
                    </div>
                    <div
                      class="rank-box"
                      :class="[
                        { second: index === 0 },
                        { first: index === 1 },
                        { third: index === 2 },
                      ]"
                    >
                      <span v-if="index === 0">{{
                        i18n.learn.RANK.SECOND
                      }}</span>
                      <span v-if="index === 1">{{
                        i18n.learn.RANK.FIRST
                      }}</span>
                      <span v-if="index === 2">{{
                        i18n.learn.RANK.THIRD
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="rank-last">
                  <div
                    class="rank-item"
                    v-for="(item, index) in renderData"
                    :key="index"
                  >
                    <div class="rank-left">
                      <div class="rank-class">{{ item.rank }}</div>
                      <a
                        :href="item.giteeRoom"
                        target="_blank"
                        class="gitee-name"
                        >{{ item.GiteeId }}</a
                      >
                    </div>
                    <div class="rank-right">
                      <div class="score">{{ item.integralValue }}</div>
                      <span>{{ i18n.learn.RANK.SCORE }}</span>
                    </div>
                  </div>
                </div>
                <div class="view-all" v-if="showAll">
                  <a @click="extend()" v-if="!isExent">
                    {{ i18n.learn.RANK.VIEW_ALL }}
                    <div>
                      <img src="/img/internship/right.svg" alt />
                    </div>
                  </a>
                  <a @click="extend()" v-else>
                    {{ i18n.learn.RANK.PACK_UP }}
                    <div>
                      <img class="arrow" src="/img/internship/right.svg" alt />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="rule" class="do-jump">
        <div class="rule-title title">
          <img :src="i18n.learn.RULE.TITLE" alt />
        </div>
        <div class="rule-border">
          <div class="rule-content">
            <div class="warper">
              <div
                class="rule-item"
                v-for="(item, index) in i18n.learn.RULE.RULE_DATA"
                :key="index"
              >
                <div class="question">{{ item.QUESTION }}</div>
                <div class="answer">{{ item.ANSWER }}</div>
              </div>
              <div class="more-question orange">
                {{ i18n.learn.RULE.MORE[0] }}
                <a
                  class="this-post"
                  href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4AJIR?from=project-issue"
                  target="_blank"
                  >{{ i18n.learn.RULE.MORE[1] }}</a
                >
                {{ i18n.learn.RULE.MORE[2] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="partner" class="do-jump">
        <div class="warper">
          <div class="partner-title title">
            <img :src="i18n.learn.PARTNER_TITLE" alt />
          </div>
          <div class="img-list">
            <img
              v-lazy="item.IMG"
              alt
              v-for="(item, index) in i18n.learn.PARTNER_DATA"
              :key="index"
            />
          </div>
        </div>
      </div>
      <div id="help" class="do-jump">
        <div class="help-title title">
          <img :src="i18n.learn.HELP_TITLE" alt />
        </div>
        <div class="help-content">
          <div class="help-left">
            <p>
              {{ i18n.learn.HELP[0] }}
              <a href="mailto:intern@openeuler.sh">{{ i18n.learn.HELP[1] }}</a>
            </p>
            <p>{{ i18n.learn.HELP[2] }}</p>
            <p>{{ i18n.learn.HELP[3] }}</p>
          </div>
          <div class="help-right">
            <img src="/img/internship/qrCode.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="qq-code" v-show="show">
      <img
        class="close"
        @click="close()"
        src="/img/internship/close.png"
        alt=""
      />
      <img src="/img/internship/qq-code.png" alt="" />
    </div>
  </div>
</template>

<script>
import titlenav from '../summit/titleNav.vue';
import { getRank, getToken } from '../../api/internship';
export default {
  components: {
    titlenav,
  },
  data() {
    return {
      renderData: [],
      show: true,
      community: 'openEuler',
      showAll: false,
      isExent: false,
      rankInfo: [],
      stepActive: 0,
      isShowNav: false,
      activeIndex: 0,
      rankTop: [],
      rankLast: [],
      communityTask: [],
      STEP: {},
      TASK: {},
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    tabClick() {
      if (this.community == 'openEuler') {
        this.communityTask = this.TASK.EULER_TASK_ITEM;
      } else if (this.community == 'openLooKeng') {
        this.communityTask = this.TASK.LOOKENG_TASK_ITEM;
      } else if (this.community === 'MindSpore') {
        this.communityTask = this.TASK.MINDSPORE_TASK_ITEM;
      } else {
        this.communityTask = this.TASK.OPENGAUSS_TASK_ITEM;
      }
    },
    extend() {
      if (this.isExent) {
        this.renderData = this.rankInfo.slice(3, 10);
        window.location.href = '#rank';
      } else {
        this.renderData = this.rankInfo.slice(3);
      }
      this.isExent = !this.isExent;
    },
    stepChange(index) {
      this.stepActive = index;
    },
    go(path) {
      if (path && !path.includes('http')) {
        this.$router.push({
          path: this.resolvePath(path),
        });
      } else if (path.includes('http')) {
        window.open(path);
      } else {
        return false;
      }
    },
     scrollTop() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > 240) {
        this.isShowNav = true;
      } else {
        this.isShowNav = false;
      }
      const jump = document.querySelectorAll('.do-jump');
      let topArr = [];
      for (let i = 0; i < jump.length; i++) {
        topArr.push(jump[i].offsetTop + jump[i].clientHeight);
      }
      for (let i = 0; i < topArr.length; i++) {
        if (scrollTop <= topArr[i] - 100) {
          this.activeIndex = i;
          break;
        }
      }
    },
    showRank() {
      getToken()
        .then((data) => {
          return getRank({
            token: data.loginData.token,
            currentPage: 1,
            pageSize: 100,
            userId: data.loginData.userId,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          if (res.UserPoints) {
            let info = res.UserPoints;
            info.length > 10 ? (this.showAll = true) : '';
            info.sort((a, b) => {
              return b.integralValue - a.integralValue;
            });
            info.forEach((item, index) => {
              item['giteeRoom'] = `https://gitee.com/${item.GiteeId}`;
              index < 9
                ? (item['rank'] = `0${index + 1}`)
                : (item['rank'] = index + 1);
            });
            this.rankInfo = info;
            this.renderData = info.slice(3, 10);
            this.rankTop = info.slice(0, 3);
            // 改变一二名数组顺序
            this.rankTop.splice(
              0,
              1,
              ...this.rankTop.splice(1, 1, this.rankTop[0])
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.STEP = this.i18n.learn.STEP;
    this.TASK = this.i18n.learn.TASK;
  },
  mounted() {
    this.tabClick();
    this.showRank();
    window.addEventListener('scroll', this.scrollTop);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollTop);
  },
};
</script>
<style lang="less" scoped>
.qq-code {
  position: fixed;
  width: 150px;
  right: 50px;
  bottom: 70px;
  display: none;
  img {
    width: 100%;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: -20px;
    right: -20px;
    width: 20px;
  }
  @media screen and (max-width: 1000px) {
    display: block;
  }
}
/deep/.tabbar {
  .el-tabs__nav-wrap::after {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    .el-tabs__nav-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .el-tabs__nav-scroll {
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
  .el-tabs__item {
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    @media screen and (max-width: 1000px) {
      height: 20px;
      line-height: 0;
      font-size: 16px;
      .el-tabs__active-bar {
        height: 1px;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .el-tabs__active-bar {
      height: 1px;
    }
  }
}

.closeInternship {
  padding-top: 150px;
  text-align: center;
  font-size: 24px;
  p {
    padding-bottom: 20px;
  }
  img {
    width: 170px;
  }
  @media screen and (max-width: 1000px) {
    padding: 70px 20px 0;
    font-size: 16px;
  }
}
a {
  font-size: 14px;
  color: #002fa7;
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.internship {
  max-width: 1920px;
  margin: 0 auto;
  padding-bottom: 200px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding-bottom: 80px;
  }
  .internship-banner {
    display: flex;
    justify-content: center;
    height: 380px;
    .banner-mo {
      display: none;
    }
    img {
      cursor: pointer;
      width: 100%;
    }
    @media screen and (max-width: 1000px) {
      height: 300px;
      .banner-pc {
        display: none;
      }
      .banner-mo {
        display: block;
      }
      img {
        max-width: 375px;
      }
    }
  }
  .banner-center {
    width: 1120px;
    height: 380px;
    font-size: 40px;
    margin: 0 auto;
    p:nth-child(1) {
      padding: 66px 0 30px 0;
    }
  }
  .warper {
    width: 1120px;
    margin: 0 auto;
    @media (max-width: 1000px) {
      width: 100%;
      padding: 0 30px;
    }
  }
  .internship-list {
    .intership-introduce {
      p {
        padding-top: 60px;
        font-size: 20px;
        line-height: 40px;
        @media (max-width: 1000px) {
          padding-top: 20px;
          font-size: 16px;
        }
      }
    }
    .title {
      text-align: center;
      padding: 106px 0 13px 0;
      img {
        width: 180px;
      }
      @media (max-width: 1000px) {
        padding: 30px 0 !important;
        img {
          width: 113px;
          height: 34px;
        }
      }
    }
    #step {
      .step-title {
        text-align: center;
        padding: 60px 0 70px 0;
        @media (max-width: 1000px) {
          padding: 30px 0;
        }
      }
      .step-content {
        border-radius: 8px 8px 8px 8px;
        background-color: rgb(93, 200, 255);
        .step-nav {
          display: flex;
          @media (max-width: 1000px) {
            display: none;
          }
          .step-bar {
            cursor: pointer;
            width: 280px;
            height: 160px;
            background-size: 100% 100% !important;
            img {
              display: none;
              width: 100%;
              margin-top: -20px;
              height: 180px;
            }
          }
          .stepActive {
            img {
              display: block;
            }
          }
        }
        .step-body {
          margin-top: -1px;
          padding: 32px 30px 37px;
          height: 392px;
          background: url(/img/internship/step-background.png) no-repeat;
          background-size: 100% 100%;
          .number {
            display: none;
          }
          .suspend {
            padding: 10px 0 0 10px;
          }
          @media (max-width: 1000px) {
            padding: 0;
          }
          h4 {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: normal;
            color: #000000;
            line-height: 24px;
          }
          p {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 24px;
            @media (max-width: 1000px) {
              font-size: 12px;
              a {
                font-size: 12px;
              }
            }
          }
          .specialSpan {
            padding-left: 10px;
          }
          .blue {
            color: #2e9afe;
          }
          .orange {
            color: #ff7c56;
          }
          .attention {
            margin: 10px 14px 0 35px;
            .attention-title {
              font-size: 14px;
              color: #000000;
              line-height: 24px;
            }
            .download {
              display: block;
              margin-top: 10px;
            }
          }
          .firstAttention {
            margin-top: 0;
          }
          .black {
            p {
              position: relative;
              padding-left: 12px;
            }
            p::before {
              position: absolute;
              top: 10px;
              left: 0;
              content: '';
              height: 4px;
              width: 4px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 50%;
            }
          }
          .flow-chart {
            margin-top: 8px;
            padding-left: 35px;
            .chart-mo {
              display: none;
            }
            img {
              width: 960px;
            }
          }
        }
        .step-body-en {
          height: 485px;
        }
        @media (max-width: 1000px) {
          background: none;
          p::before {
            display: none;
          }
          .step-body {
            background: none;
            height: 100%;
            font-size: 12px;
            .step-text:nth-child(2) {
              .download {
                padding-bottom: 44px;
              }
            }
            .step-text:nth-child(4) {
              margin-bottom: 0;
            }
            .step-text {
              display: block !important;
              position: relative;
              margin-bottom: 20px;
              padding: 50px 5px 5px;
              background-color: #2e9afe;
              border-radius: 8px;
              .main-text {
                padding: 10px;
                border-radius: 8px;
                background-color: #eaf5fe;
                .download {
                  margin-top: 6px;
                  font-size: 12px;
                }
              }
              .number {
                position: absolute;
                display: block;
                top: 0;
                left: 0;
                width: 60px;
              }
              h4 {
                position: absolute;
                top: 12px;
                left: 60px;
                font-size: 16px;
                color: #fff;
              }
              p {
                line-height: 22px;
              }
              .attention {
                margin: 6px 0 0 30px;
              }
            }
            .flow-chart {
              padding: 0;
              text-align: center;
              .chart-pc {
                display: none;
              }
              .chart-mo {
                display: inline-block;
                width: 268px;
              }
            }
          }
        }
      }
    }
    #task {
      .task-introduce {
        font-size: 20px;
        line-height: 40px;
      }
      .item-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        .item {
          margin: 0 25px 25px 0;
          padding: 24px 20px;
          background-color: #fff;
          color: rgba(0, 0, 0, 0.5);
          box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          transition: box-shadow 1s;
          .item-name {
            cursor: pointer;
            color: #002fa7;
            line-height:20px;
            font-size: 20px;
            @media (max-width: 1000px) {
              font-size: 16px;
            }
          }
          .item-intriduce {
            padding-top: 8px;
            margin-bottom: 20px;
            height: 70px;
            width: 221px;
            font-size: 14px;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            .waiting {
              margin-top: 14px;
              font-size: 18px;
              text-align: center;
              @media screen and (max-width: 1120px) {
                font-size: 14px;
              }
            }
          }
          .button-box {
            display: flex;
            .button-left,
            .button-right {
              margin: 0;
              padding: 8px 12px;
              cursor: pointer;
              color: #fff;
              outline: none;
              border: none;
              transition: all 0.2s;
              background-color: #002fa7;
            }
            .button-left:hover {
              background-color: #0c41c9;
            }
            .button-right {
              display: flex;
              margin-left: 24px;
              align-content: center;
              color: #002fa7;
              background-color: #fff;
              line-height: 24px;
              transition: all 0.2s;
              border: 1px solid transparent;
              &:hover {
                border: 1px solid #002fa7;
                img {
                  transform: translateX(5px);
                }
              }
              img {
                margin-left: 6px;
                width: 24px;
                transition: all 0.3s;
              }
            }
          }
        }
        .item:nth-child(4n) {
          margin-right: 0;
        }
        .last-child {
          margin: 0 0 25px 0;
          flex: 1;
          height: 203px;
          .button-box {
            display: none;
          }
          .item-intriduce {
            padding: 0;
            width: 100%;
            height: 100%;
            line-height: 152px;
            text-align: center;
            font-size: 20px;
            color: #000000;
          }
        }
        .other-community {
          flex: 1;
           display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 0 25px 0;
          padding: 24px;
          height: 302px;
          text-align: center;
          background-size: 120%;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(/img/internship/other-community-bg.png);
          @media (max-width: 1000px) {
            background-image: none;
          }
          .item-name {
            font-size: 20px;
            @media (max-width: 1000px) {
              font-size: 16px;
            }
          }
          .item-intriduce {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px 0 0 0;
            width: 100%;
            font-size: 18px;
            @media (max-width: 1000px) {
              font-size: 14px;
            }
          }
          .mindspore {
            height: 100px;
          }
          .button-box {
            justify-content: center;
          }
        }
        .mindspore {
         
          text-align: left;
          .item-name {
            display: block;
            margin-bottom: 8px;
            }
          .mindspore-require-box {
            margin-bottom: 24px;
            font-size: 14px;
            line-height: 22px;
          }
        }
        .item:hover {
          box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.3);
        }
      }
      @media (max-width: 1000px) {
        .task-introduce {
          text-align: left;
          font-size: 16px;
        }
        .item-box {
          flex-direction: column;
          align-content: center;
          justify-content: center;
          .item:nth-child(n) {
            width: 310px;
            margin: 0 0 25px 0;
            .item-intriduce {
              width: 275px;
            }
          }
          .last-child {
            margin: 0;
            .item-intriduce {
              font-size: 16px;
            }
          }
        }
      }
    }
    #integral {
      .integral-title {
        padding: 67px 0 50px 0;
        img {
          width: 270px;
          @media (max-width: 1000px) {
            width: 160px;
            height: 34px;
          }
        }
      }
      .integral-border {
        border: 5px solid #5877ff;
        border-top: 16px solid #5877ff;
        border-radius: 8px;
        background-color: #5877ff;
        .integral-content {
          padding: 5px 15px 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          background-color: #eef1ff;
          line-height: 24px;
          h3,
          h4 {
            margin: 10px 0;
            font-size: 18px;
            color: #000000;
            .supplement-gauss {
              font-size: 14px;
            }
          }
          h4 {
            margin-top: 10px;
            font-size: 14px;
          }
          p {
            position: relative;
            padding-left: 12px;
          }
          .circular {
            p::before {
              content: '';
              position: absolute;
              left: 0;
              top: 10px;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background-color: #2e9afe;
            }
          }
          .star {
            position: relative;
            img {
              position: absolute;
              left: 0;
              top: 8px;
              height: 8px;
            }
          }
          .download-color {
            cursor: pointer;
            color: #002fa7;
          }
        }
      }
      @media (max-width: 1000px) {
        .integral-border {
          border: 5px solid #5877ff;
          border-top: 16px solid #5877ff;
          border-radius: 8px;
          background-color: #5877ff;
        }
        .integral-content {
          padding-bottom: 41px;
          height: 100%;
          background: none;
          border-radius: 8px;
          background-color: #eef1ff;
          h3,
          h4 {
            margin-bottom: 6px;
            font-size: 16px;
            color: #000000;
          }
          h4 {
            margin-top: 8px;
            margin-bottom: 0;
            font-size: 12px;
          }
        }
      }
    }
    #rank {
      padding-top: 30px;
      .rank-title {
        position: relative;
        height: 80px;
        text-align: center;
        img {
          border-radius: 8px 8px 0 0;
          width: 374px;
        }
        .mobile {
          display: none;
        }
      }
      .rank-title::before {
        position: absolute;
        content: '积分排行';
        width: 374px;
        color: #fff;
        text-align: center;
        font-size: 28px;
        line-height: 80px;
      }
      .rank-border {
        border-radius: 8px;
        border: 5px solid #ff7c56;
        border-top: 16px solid #ff7c56;
        background-color: #ff7c56;
      }
      .rank-content {
        border-radius: 8px;
        padding: 30px 290px 25px;
        background-color: #fff2ee;
        transition: all 0.5s;
        .rank-top {
          display: flex;
          justify-content: center;
          .top-item {
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            text-align: center;
            .gitee-name {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.5);
              line-height: 16px;
            }
            .gitee-name:hover {
              color: #002fa7;
            }
            .score {
              margin: 10px 0 20px;
              font-size: 18px;
              color: #ff644e;
              line-height: 16px;
              span {
                padding-left: 10px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
              }
            }
            .rank-box {
              width: 170px;
              font-size: 24px;
              color: #ffffff;
              line-height: 24px;
            }
            .second {
              height: 66px;
              line-height: 66px;
              background: #5dc8ff;
              border: 1px solid #a4e1ff;
            }
            .first {
              position: relative;
              height: 104px;
              line-height: 104px;
              background: #ff7c56;
              border: 1px solid #a4e1ff;
            }
            .third {
              height: 48px;
              line-height: 48px;
              background: #2e9afe;
              border: 1px solid #a4e1ff;
            }
          }
        }
        .rank-last {
          .rank-item:nth-of-type(1) {
            margin-top: 30px;
            border-top: 1px dashed #ff7c56;
          }
          .rank-item {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
            margin-bottom: 10px;
            border-bottom: 1px dashed #ff7c56;
            .rank-left,
            .rank-right {
              display: flex;
              align-items: center;
              .rank-class {
                font-size: 24px;
                color: #ff7c56;
              }
              .gitee-name {
                padding-left: 20px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
                line-height: 16px;
              }
              .gitee-name:hover {
                color: #002fa7;
              }
            }
            .rank-right {
              .score {
                font-size: 18px;
                color: #ff644e;
                line-height: 16px;
              }
              span {
                padding-left: 30px;
                font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
                line-height: 16px;
              }
            }
          }
        }
        .dash {
          padding-top: 50px;
          margin-bottom: 20px;
          border-bottom: 1px dashed #ff7c56;
        }
        .view-all {
          padding-top: 15px;
          font-size: 14px;
          color: #002fa7;
          a {
            cursor: pointer;
            display: flex;
            justify-content: center;
            div {
              display: flex;
              justify-content: center;
              padding-left: 9px;
              img {
                transform: rotate(90deg);
                transition: 0.3s;
              }
              .arrow {
                transform: rotate(-90deg);
              }
            }
          }
        }
      }
      @media (max-width: 1000px) {
        .rank-title {
          height: 48px;
          img {
            width: 109px;
          }
          .web {
            display: none;
          }
          .mobile {
            display: inline-block;
          }
        }
        .rank-title::before {
          content: '';
        }
        .rank-content {
          border-radius: 8px;
          padding: 26px 15px 10px;
          height: 100%;
          .dash {
            padding-top: 30px;
          }
          .rank-top {
            .top-item {
              .gitee-name {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
              }
              .score {
                margin: 10px 0;
                font-size: 14px;
                span {
                  font-size: 12px;
                }
              }
              .rank-box {
                width: 92px;
                font-size: 16px;
                line-height: 24px;
              }
              .second {
                height: 60px;
                line-height: 60px;
              }
              .first {
                height: 85px;
                line-height: 85px;
              }
              .first::after {
                top: -60px;
              }
              .third {
                height: 40px;
                line-height: 40px;
              }
            }
          }
          .rank-last {
            .rank-item:nth-of-type(1) {
              margin-top: 20px;
            }
            .rank-item {
              padding: 14px 0;
              margin: 0;
              border-bottom: 1px dashed #ff7c56;
              .rank-left,
              .rank-right {
                .rank-class {
                  font-size: 16px;
                }
                .gitee-name {
                  padding-left: 10px;
                  font-size: 12px;
                }
              }
              .rank-right {
                .score {
                  font-size: 14px;
                }
                span {
                  padding-left: 6px;
                  font-size: 12px;
                }
              }
            }
          }
          .view-all {
            padding-top: 20px;
          }
        }
      }
    }
    #rule {
      .rule-title {
        padding: 60px 0 50px 0;
        img {
          width: 250px;
        }
      }
      .rule-content {
        padding: 32px 0 20px 0;
        height: 488px;
        background: url(/img/internship/rule-background.png) no-repeat;
        background-size: 100% 488px;
        .question {
          margin-bottom: 10px;
          font-size: 18px;
          color: #000000;
          line-height: 24px;
        }
        .answer {
          margin-bottom: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          line-height: 24px;
        }
        .more-question {
          padding-top: 25px;
          font-size: 14px;
          color: #ff7c56;
          .this-post {
            font-size: 16px;
          }
        }
      }
    }
    @media (max-width: 1000px) {
      #rule {
        padding: 0 30px;
        .rule-title {
          img {
            width: 155px;
          }
        }
        .rule-border {
          border-radius: 8px;
          border: 5px solid #5dc8ff;
          border-top: 16px solid #5dc8ff;
          background-color: #5dc8ff;
        }
        .rule-content {
          border-radius: 8px;
          padding: 26px 15px;
          height: 100%;
          background: none;
          background-color: #eff9ff;
          .warper {
            padding: 0;
          }
          .question {
            margin-bottom: 6px;
            font-size: 16px;
            line-height: 22px;
          }
          .answer {
            margin-bottom: 6px;
            font-size: 12px;
            line-height: 22px;
          }
          .more-question {
            padding-top: 6px;
            font-size: 12px;
            .this-post {
              font-size: 14px;
            }
          }
        }
      }
    }
    #partner {
      .partner-title {
        padding: 60px 0 50px 0;
      }
      .img-list {
        display: flex;
        flex-wrap: wrap;
        img {
          cursor: pointer;
          margin: 0 24px 40px 0;
          width: 260px;
          height: 60px;
        }
        img:nth-of-type(4n) {
          margin-right: 0;
        }
        img:last-child {
          margin-bottom: 0;
        }
      }
      @media (max-width: 1000px) {
        .img-list {
          margin-bottom: 0;
          img {
            margin: 0 30px 20px 0;
            width: 142px;
            height: 33px;
          }
          img:nth-of-type(2n) {
            margin: 0 0 20px 0;
          }
          img:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    #help {
      .help-title {
        padding: 60px 0 50px 0;
      }
      .help-content {
        display: flex;
        justify-content: center;
        .help-left {
          padding-right: 57px;
          p {
            font-size: 20px;
            color: #000000;
            line-height: 40px;
            margin-bottom: 10px;
            a {
              font-size: 20px;
            }
          }
        }
        .help-right {
          img {
            width: 170px;
          }
        }
      }
      @media (max-width: 1000px) {
        .help-content {
          padding: 0 30px;
          flex-direction: column;
          .help-left {
            padding-right: 57px;
            p {
              font-size: 16px;
              color: #000000;
              line-height: 30px;
              margin-bottom: 10px;
              a {
                font-size: 20px;
              }
            }
          }
          .help-right {
            text-align: center;
            img {
              width: 170px;
            }
          }
        }
      }
    }
  }
}
</style>
