<template>
  <div class="developer-2022">
    <titlenav
      v-show="showNav"
      class="titlenav"
      :currentIndex="activeIndex"
      :dataList="i18n.devday2022.NAV_LIST"
    ></titlenav>
    <div class="banner">
      <a href="#liveroom">
        <img class="main" :src="i18nData.SUMMIT_BANNER.PC_IMG" />
      </a>
    </div>
    <div class="h5-banner">
      <a href="#liveroom">
        <img :src="i18nData.SUMMIT_BANNER.MOBILE_IMG" />
      </a>
    </div>
    <div class="container">
      <div class="text-wrapper">
        <p class="text">{{ i18nData.SUMMIT_INTRODUCE }}</p>
      </div>
      <liveroom
        :liveData="i18n.devday2022.LIVEDATA"
        :isPass="false"
        class="live-room do-jump"
        id="liveroom"
      ></liveroom>
      <div class="agenda do-jump" id="agenda">
        <div class="title">
          <img class="pc" :src="i18nData.AGENDA.TITLE_IMG_PC" alt />
          <img class="mo" :src="i18nData.AGENDA.TITLE_IMG_MO" alt />
        </div>
        <div class="agenda-data">
          <div class="time-box">
            <div
              @click="tabClick(index)"
              class="taber-item"
              :class="{ 'taber-active': index === agendaTab }"
              v-for="(item, index) in i18nData.AGENDA.AGENDA_DATA_TITLE"
              :key="item"
            >
              <div class="taber-top">{{ item }}</div>
              <div class="taber-bottom">APRIL</div>
            </div>
          </div>
          <div class="agenda-body">
            <div class="first-day" v-if="agendaTab === 0">
              <div
                class="agenda-item"
                v-for="item in agendaData.AGENDA_DATA_13.SCHEDULE"
                :key="item.TIME"
              >
                <div class="detail-time">
                  {{ item.TIME }}
                </div>
                <div class="agenda-detail">
                  <div
                    class="schedule-item"
                    v-for="item2 in item.SCHEDULE_LIST"
                    :key="item2"
                  >
                    {{ item2 }}
                  </div>
                </div>
              </div>
            </div>
            <div class="second-day" v-if="agendaTab === 1">
              <div class="time-box-second">
                <el-tabs v-model="showTabSecond" @tab-click="zoneTabClick">
                  <el-tab-pane
                    v-for="(item, index) in agendaData.AGENDA_DATA_14
                      .TIME_TITLE"
                    :key="index"
                    :label="item.ZH"
                    :name="item.EN"
                  ></el-tab-pane>
                </el-tabs>
              </div>
              <div class="second-body">
                <div class="second-left">
                  <div
                    class="left-item"
                    @click="index === 0 && go('/sig/meeting-guide/')"
                    v-for="(item, index) in agendaData.AGENDA_DATA_14
                      .COLUMN_TITLE[tabIndex].TIME"
                    :key="item.ZH"
                  >
                    <slot v-if="index === 0">
                      <div class="move-star"></div>
                      <div class="move-star move-star2"></div>
                      <div class="move-star move-star3"></div>
                      <div class="move-star move-star4"></div>
                      <div class="move-star move-star5"></div>
                      <div class="stars" ref="starsRef">
                        <div
                          class="star"
                          v-for="(item, index) in starsCount"
                          :key="index"
                        ></div>
                      </div>
                    </slot>
                    <p>{{ item.ZH }}</p>
                    <p class="second-en">{{ item.EN }}</p>
                  </div>
                </div>
                <div class="second-right" v-show="tabIndex === 0">
                  <div class="right-title">
                    <div
                      class="right-title-item"
                      :class="{ 'active-bg': activeBackground === index }"
                      v-for="(item, index) in timeTitle"
                      :key="item"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div class="right-card-box">
                    <div
                      class="right-card-column"
                      :class="{ 'special-card1': index === 2 }"
                      v-for="(item, index) in agendaData.AGENDA_DATA_14
                        .SCHEDULE"
                      :key="index"
                    >
                      <div
                        class="right-card"
                        :class="[
                          { double: index === 3 && index2 === 0 },
                          { double: index === 5 && index2 === 0 },
                          { double: index === 6 && index2 === 0 },
                          { half: index === 7 && index2 === 0 },
                          { 'one-part': index === 7 && index2 === 2 },
                        ]"
                        v-for="(item2, index2) in item.SCHEDULE_CARD"
                        :key="index2"
                      >
                        <div class="card-left">{{ item2.TEXT }}</div>
                        <div class="card-right">
                          <div
                            class="dialogue"
                            @click="goInstall(item2.ZOOM_LINK)"
                          >
                            {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[0] }}
                          </div>
                          <div
                            class="etherpad"
                            @click="goInstall(item2.ETHERPAD)"
                          >
                            {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[1] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="second-right afternoon" v-show="tabIndex === 1">
                  <div class="right-title">
                    <div
                      class="right-title-item"
                      v-for="(item, index) in timeTitle"
                      :class="{ 'active-bg1': activeBackground === index }"
                      :key="item"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div class="right-card-box">
                    <div
                      class="right-card-column"
                      :class="[{ 'special-card': index === 6 }]"
                      v-for="(item, index) in agendaData.AGENDA_DATA_14
                        .SCHEDULE_AFTERNOON"
                      :key="index"
                    >
                      <div
                        class="right-card"
                        :class="[
                          { double: index === 2 && index2 === 0 },
                          { double: index === 3 && index2 === 2 },
                          { onepart: index === 4 && index2 === 0 },
                          { onepart: index === 4 && index2 === 1 },
                          { double: index === 7 && index2 === 1 },
                        ]"
                        v-for="(item2, index2) in item.SCHEDULE_CARD"
                        :key="index2"
                      >
                        <div class="card-left">{{ item2.TEXT }}</div>
                        <div class="card-right">
                          <div
                            class="dialogue"
                            @click="goInstall(item2.ZOOM_LINK)"
                          >
                            {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[0] }}
                          </div>
                          <div
                            class="etherpad"
                            @click="goInstall(item2.ETHERPAD)"
                          >
                            {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[1] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="second-right night" v-show="tabIndex === 2">
                  <div class="right-title">
                    <div
                      class="right-title-item"
                      v-for="(item, index) in timeTitle"
                      :class="{ 'active-bg2': activeBackground === index }"
                      :key="item"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div class="right-card-box">
                    <div
                      class="right-card-column"
                      v-for="(item, index) in agendaData.AGENDA_DATA_14
                        .SCHEDULE_NIGHT"
                      :key="index"
                    >
                      <div
                        class="right-card"
                        :class="[{ onepart: index === 2 && index2 === 0 }]"
                        v-for="(item2, index2) in item.SCHEDULE_CARD"
                        :key="index2"
                      >
                        <div class="card-left">{{ item2.TEXT }}</div>
                        <div class="card-right">
                          <div
                            class="dialogue"
                            @click="goInstall(item2.ZOOM_LINK)"
                          >
                            {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[0] }}
                          </div>
                          <div
                            class="etherpad"
                            @click="goInstall(item2.ETHERPAD)"
                          >
                            {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[1] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="second-body-mo">
                <div class="mo-title">
                  {{ i18nData.AGENDA.AGENDA_DATA_14.MO_TITLE }}
                </div>
                <div class="mo-render-box">
                  <div
                    class="mo-render-card"
                    v-for="(item, index) in secondDayData"
                    :key="item.TITLE.ZH"
                  >
                    <div
                      class="mo-render-title"
                    >
                      <h4>{{ item.TITLE.ZH }}</h4>
                      <h4>{{ item.TITLE.EN }}</h4>
                    </div>
                    <div
                      class="mo-render-detail"
                      v-for="item2 in item.SCHEDULE_CARD"
                      :key="item2.TEXT"
                    >
                      <div class="mo-detail-left">
                        <div class="mo-detail-text">
                          {{ item2.TEXT.replace('、', ' ') }}
                        </div>
                        <div class="mo-detail-time">
                          {{ item2.TIME }}
                        </div>
                      </div>
                      <div class="mo-detail-right card-right">
                        <div
                          class="mo-right-top dialogue"
                          @click="goInstall(item2.ZOOM_LINK)"
                        >
                          {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[0] }}
                        </div>
                        <div
                          class="mo-right-botton etherpad"
                          @click="goInstall(item2.ETHERPAD)"
                        >
                          {{ agendaData.AGENDA_DATA_14.RIGHT_TEXT[1] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="third-day" v-if="agendaTab === 2">
              <div class="third-body">
                <div class="time-box-second">
                  <el-tabs v-model="showTabThird" @tab-click="zoneTabClick">
                    <el-tab-pane
                      v-for="(item, index) in agendaData.AGENDA_DATA_15
                        .TIME_TITLE"
                      :key="index"
                      :label="item.ZH"
                      :name="item.EN"
                    ></el-tab-pane>
                  </el-tabs>
                </div>
                <div
                  class="third-body-morning"
                  v-if="showTabThird === 'morning'"
                >
                  <div class="star-box">
                    <div
                      class="move-star"
                      v-for="(item, index) in 20"
                      :class="`move-star${index}`"
                      :key="item"
                    ></div>
                  </div>
                  <div
                    class="third-item"
                    v-for="(item, index) in agendaData.AGENDA_DATA_15.SCHEDULE"
                    :style="{
                      backgroundImage:
                        'url(/img/summit/devday-2022/agenda/third-' +
                        index +
                        '.png)',
                    }"
                    :key="item.TIEM"
                  >
                    <div class="third-left">{{ item.TIME }}</div>
                    <div class="third-right">
                      <div class="schedule-text">{{ item.TEXT }}</div>
                      <div class="speak">
                        <div
                          class="host-guest"
                          v-if="index === 10 || index === 11"
                        >
                          <div
                            class="host-item"
                            v-for="value in agendaData.AGENDA_DATA_15.HOST"
                            :key="value"
                          >
                            {{ value }}
                          </div>
                        </div>
                        <div class="item-box">
                          <div
                            class="speak-item"
                            v-for="item2 in item.SPEAKER"
                            :key="item2.NAME"
                          >
                            <div class="speak-name">{{ item2.NAME }}</div>
                            <div class="speak-position">
                              {{ item2.POSITION }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="third-body-afternoon" v-else>
                  <carousel
                    :agendaData="agendaData.AGENDA_DATA_15.SCHEDULE_AFTERNOON"
                  ></carousel>
                  <carousel
                    class="lastday-last"
                    :agendaData="
                      agendaData.AGENDA_DATA_15.SCHEDULE_AFTERNOON_LAST
                    "
                  ></carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lecturer do-jump" id="lecturer">
        <div class="title">
          <img class="mo" v-lazy="lecturerData.LECTURER_BANNER.mobile" alt="" />
          <img class="pc" v-lazy="lecturerData.LECTURER_BANNER.web" alt="" />
        </div>
        <div
          class="lecturer-box"
          v-fade
          v-if="lecturerData.LECTURER_LIST.length"
        >
          <div
            class="item fade-in"
            v-for="(item, index) in lecturerData.LECTURER_LIST"
            :key="index"
          >
            <img v-lazy="item.IMG" alt="" />
            <p>{{ item.NAME }}</p>
            <p v-for="item2 in item.POSITION" :key="item2">{{ item2 }}</p>
          </div>
        </div>
      </div>
      <div class="construction do-jump" id="construction-unit">
        <div class="construction-title">
          <img class="web" v-lazy="construction.WEB_TITLE" alt="" />
          <img class="mobile" v-lazy="construction.MOBILE_TITLE" alt="" />
        </div>
        <div class="guidance">
          <div class="text-title">
            {{ construction.HOST.TEXT_TITLE }}
          </div>
          <div class="img-list">
            <img
              v-lazy="item.IMG"
              alt=""
              v-for="(item, index) in construction.HOST.LIST"
              :key="index"
            />
          </div>
        </div>
        <div class="host">
          <div class="text-title">
            {{ construction.UNION.TEXT_TITLE }}
          </div>
          <div class="img-list">
            <img
              v-lazy="item.IMG"
              alt=""
              v-for="(item, index) in construction.UNION.LIST"
              :key="index"
            />
          </div>
        </div>
        <div class="host">
          <div class="text-title">
            {{ construction.CO_ORGANIZER.TEXT_TITLE }}
          </div>
          <div class="img-list">
            <img
              v-lazy="item.IMG"
              alt=""
              v-for="(item, index) in construction.CO_ORGANIZER.LIST"
              :key="index"
            />
          </div>
        </div>
      </div>
      <div class="review-wrapper">
        <div class="title">
          <span>{{ i18n.summit.HIGHLIGHTS }}</span>
          <img src="/img/summit/devday-2021/review.png" />
        </div>
        <div
          v-for="item in i18nData.FOOTER"
          :key="item.LINK"
          @click="go(item.LINK)"
          class="link"
        >
          {{ item.SUMMIT }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from './carousel-2022.vue';
import liveroom from './liveroom.vue';
import titlenav from './titleNav.vue';

export default {
  components: {
    carousel,
    liveroom,
    titlenav,
  },
  data() {
    return {
      i18nData: {},
      showTabSecond: 'morning',
      showTabThird: 'morning',
      // 星星数量
      starsCount: 120,
      tabIndex: 0,
      agendaTab: 2,
      agendaData: [],
      secondDayData: [],
      construction: [],
      lecturerData: [],
      activeIndex: -1,
      activeBackground: -1,
      timeTitle: [],
      showNav: false,
      interval: null,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scrollTop);
  },

  created() {
    this.i18nData = this.i18n.devday2022;
    this.agendaData = this.i18nData.AGENDA;
    this.secondDayData = this.agendaData.AGENDA_DATA_14.SCHEDULE;
    this.construction = this.i18nData.CONSTRUCTION;
    this.lecturerData = this.i18nData.LECTURER;
    this.timeTitle = this.agendaData.AGENDA_DATA_14.TITLE;
    this.isTimeOn();
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollTop);
  },
  methods: {
    getDate(time) {
      let currentDate = parseInt(new Date().getTime() / 1000 / 60);
      let date = parseInt(new Date(time).getTime() / 1000 / 60);
      return date - currentDate + 60;
    },
    tabClick(index) {
      this.agendaTab = index;
      index === 1 ? this.getStars() : '';
    },
    scrollTop() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > 240) {
        this.showNav = true;
      } else {
        this.showNav = false;
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
    zoneTabClick(event) {
      event ? (this.tabIndex = parseInt(event.index)) : '';
      this.activeBackground = -1;
      if (this.tabIndex === 0) {
        this.secondDayData = this.agendaData.AGENDA_DATA_14.SCHEDULE;
        this.timeTitle = this.agendaData.AGENDA_DATA_14.TITLE;
      } else if (this.tabIndex === 1) {
        this.secondDayData = this.agendaData.AGENDA_DATA_14.SCHEDULE_AFTERNOON;
        this.timeTitle = this.agendaData.AGENDA_DATA_14.TITLE_AFTERNOON;
      } else {
        this.secondDayData = this.agendaData.AGENDA_DATA_14.SCHEDULE_NIGHT;
        this.timeTitle = this.agendaData.AGENDA_DATA_14.TITLE_NIGHT;
      }
      this.isTimeOn();
    },
    isTimeOn() {
      this.timeTitle.forEach((item, index) => {
        this.getDate(`2022-4-14-${item.split(' ')[0]}`) >= 0 &&
        this.getDate(`2022-4-14-${item.split(' ')[0]}`) < 60
          ? (this.activeBackground = index)
          : '';
      });
    },
    tabAutoChange() {
      let time = new Date().getTime();
      if (
        time > new Date('2022-4-14-12:00').getTime() &&
        time < new Date('2022-4-14-18:00')
      ) {
        this.agendaTab = 1;
        this.tabIndex = 1;
        this.showTabSecond = 'afternoon';
      } else if (
        time > new Date('2022-4-14-18:00').getTime() &&
        time < new Date('2022-4-14-21:00')
      ) {
        this.agendaTab = 1;
        this.tabIndex = 2;
        this.showTabSecond = 'night';
      } else if (
        time > new Date('2022-4-14-21:00').getTime() &&
        time < new Date('2022-4-15-12:00')
      ) {
        this.agendaTab = 2;
        this.tabIndex = 0;
        this.showTabThird = 'morning';
      } else if (time > new Date('2022-4-15-12:00').getTime()) {
        this.agendaTab = 2;
        this.tabIndex = 1;
        this.showTabThird = 'afternoon';
      }
      this.zoneTabClick();
    },
    getStars() {
      this.$nextTick(() => {
        let distance = 10;
        let starNodes = Array.from(this.$refs.starsRef[0].children);
        starNodes.forEach((item) => {
          let speed = 0.2 + Math.random() * 1;
          let thisDistance = distance + Math.random() * 200;
          item.style.transformOrigin = `0 0 ${thisDistance}px`;
          item.style.transform = `
        translate3d(0,0,-${thisDistance}px)
        rotateY(${Math.random() * 360}deg)
        rotateX(${Math.random() * 50}deg)
        scale(${speed},${speed})`;
        });
      });
    },
    goInstall(path) {
      if (path.includes('http') || path.includes('https')) {
        window.open(path);
      } else {
        this.$router.push(path);
      }
    },
    go(url) {
      const routeUrl = this.$router.resolve(this.resolvePath(url));
      window.open(routeUrl.href);
    },
  },
};
</script>
<style lang="less" scoped>
.web {
  @media screen and (max-width: 1120px) {
    display: none;
  }
}
.mobile {
  display: none;
  @media screen and (max-width: 1120px) {
    display: inline-block;
  }
}
.lastday-last {
  @media screen and (max-width: 1120px) {
    display: none;
  }
}

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
.stars {
  position: absolute;
  transform: perspective(500px);
  transform-style: preserve-3d;
  perspective-origin: 50% 100%;
  animation: rotate 50s infinite linear;
  bottom: 0;
}

.third-body-morning .stars {
  position: absolute;
  top: 20%;
  right: 50%;
  animation: rotate 100s infinite linear;
  .star {
    border-radius: 50%;
    background-color: #fff;
  }
}

.move-star {
  position: absolute;
  top: -19px;
  width: 30px;
  height: 19px;
  background-image: url(/img/summit/devday-2022/agenda/meteor.png);
  background-size: cover;
  animation: meteor 3s infinite;
}
.move-star2 {
  top: -50px;
  left: -40px;
  animation: meteor 3s 1s ease-in infinite;
}
.move-star3 {
  top: -80px;
  left: -100px;
  animation: meteor 3s 2s ease-in infinite;
}
.move-star4 {
  top: -160px;
  left: -300px;
  animation: meteor 3s 3s ease-in infinite;
}
.move-star5 {
  top: -100px;
  left: -100px;
  animation: meteor 3s 4s ease-in infinite;
}

.star-box {
  .move-star {
    top: -50px;
    left: -40px;
    width: 40px;
    height: 25px;
    animation: meteor2 5s 1s ease-in infinite;
    img {
      width: 100%;
    }
  }
  .move-star1 {
    top: -500px;
    left: -400px;
    animation: meteor2 5s 2s ease-in infinite;
  }
  .move-star2 {
    top: 40px;
    left: -100px;
    animation: meteor2 5s 3s ease-in infinite;
  }
  .move-star3 {
    top: 300px;
    left: -40px;
    animation: meteor2 5s 4s ease-in infinite;
  }
  .move-star4 {
    top: 700px;
    left: -100px;
    animation: meteor2 5s 5s ease-in infinite;
  }
  .move-star5 {
    top: 750px;
    left: -200px;
  }
  .move-star6 {
    top: 880px;
    left: -450px;
  }
  .move-star7 {
    top: 712px;
    left: -500px;
  }
  .move-star8 {
    top: 288px;
    left: -510px;
  }
  .move-star9 {
    top: 700px;
    left: -150px;
  }
  .move-star10 {
    top: 670px;
    left: -50px;
  }
  .move-star11 {
    top: 999px;
    left: -50px;
  }
  .move-star12 {
    top: 1300px;
    left: -500px;
  }
  .move-star13 {
    top: 1100px;
    left: -100px;
  }
  .move-star14 {
    top: 1400px;
    left: -230px;
  }
  .move-star15 {
    top: 170px;
    left: -500px;
  }
  .move-star16 {
    top: 2000px;
    left: -200px;
  }
  .move-star17 {
    top: 1450px;
    left: -80px;
  }
  .move-star18 {
    top: 1700px;
    left: -300px;
  }
  .move-star19 {
    top: 1900px;
    left: -200px;
  }
  .move-star20 {
    top: 1800px;
    left: -200px;
  }
  .move-star(@i) when(@i >=0) {
    .move-star@{i} {
      animation-delay: @i * 0.5 + 1s;
    }
    .move-star((@i - 1));
  }
  .move-star(20);
}

@keyframes meteor {
  0% {
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
  40% {
  }
  100% {
    -webkit-transform: translate(400px, 190px);
    transform: translate(350px, 190px);
  }
}

@keyframes meteor2 {
  0% {
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
  40% {
  }
  100% {
    -webkit-transform: translate(1900px, 1000px);
    transform: translate(1900px, 1000px);
  }
}

.star {
  width: 2px;
  height: 2px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
}
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
  @media screen and (max-width: 1120px) {
    display: block;
  }
}
.banner {
  @media screen and (max-width: 1120px) {
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
.container {
  width: 1120px;
  margin: 0 auto;
  margin-bottom: 100px;
  @media screen and (max-width: 1120px) {
    margin-bottom: 60px;
    padding: 0 10px;
    width: 100%;
  }
  .text-wrapper {
    color: #000;
    font-size: 20px;
    line-height: 40px;
    @media screen and (max-width: 1120px) {
      padding: 0 20px;
      font-size: 14px;
      line-height: 26px;
      margin-bottom: 40px;
    }
  }
  .title {
    cursor: pointer;
    margin-bottom: 40px;
    text-align: center;
    img {
      width: 900px;
      height: 76px;
      @media screen and (max-width: 1120px) {
        width: 335px;
        height: 38px;
      }
    }
    .pc {
      @media screen and (max-width: 1120px) {
        display: none;
      }
    }
    .mo {
      display: none;
      @media screen and (max-width: 1120px) {
        display: inline-block;
      }
    }
  }
  .live-room {
    @media screen and (max-width: 1000px) {
      margin-bottom: 40px;
    }
  }
  /deep/.agenda {
    padding-top: 90px;
    @media screen and (max-width: 1120px) {
      padding: 0;
      margin-bottom: 40px;
    }

    .agenda-data {
      .time-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
        @media screen and (max-width: 1120px) {
          margin-bottom: 30px;
        }
        .taber-item {
          cursor: pointer;
          display: flex;
          margin-right: 40px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #cbcbcb;
          border-radius: 8px;
          border: 1px solid #cbcbcb;
          transition: all 0.3s ease-out;
          .taber-top {
            padding: 13px 17px 3px 15px;
            line-height: 48px;
            font-size: 48px;
            font-weight: 700;
            border-bottom: 1px solid #cbcbcb;
          }
          .taber-bottom {
            padding: 6px 0;
            font-size: 24px;
            font-weight: 100;
            font-family: HuaweiSansLight;
            line-height: 24px;
          }
          @media screen and (max-width: 1120px) {
            .taber-top {
              padding: 6px 16px;
              font-size: 32px;
              line-height: 32px;
            }
            .taber-bottom {
              padding: 4px 0;
              font-size: 16px;
            }
          }
        }
        .taber-active {
          color: #fff;
          background-color: #002fa7;
          border: 1px solid #fff;
          .taber-top {
            border-bottom: 1px solid #fff;
          }
        }
        .taber-item:last-child {
          margin-right: 0;
        }
      }
      .agenda-body {
        font-size: 18px;
        .first-day {
          .detail-time {
            background-image: url(/img/summit/devday-2022/agenda/first_time0.png);
          }
          @media screen and (max-width: 1120px) {
            .agenda-item {
              align-items: center;
              justify-content: center;
              flex-direction: column;
              .detail-time {
                width: 315px;
                margin-bottom: 16px;
                padding: 14px 0;
                font-size: 12px;
                border-radius: 8px;
                overflow: hidden;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-image: url(/img/summit/devday-2022/agenda/mo_sig.png) !important;
              }
              .agenda-detail {
                width: 315px;
                font-size: 12px;
                flex-direction: column;
                .schedule-item {
                  margin-left: 0 !important;
                  padding: 12px 0;
                  width: 100%;
                  margin-bottom: 12px;
                }
              }
            }
          }
        }
        .agenda-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .detail-time {
            // cursor: pointer;
            padding: 25px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 170px;
            flex-shrink: 0;
            background-size: cover;
            color: #fff;
            font-size: 18px;
            line-height: 20px;
          }
          .agenda-detail {
            display: flex;
            width: 100%;
            .schedule-item {
              // cursor: pointer;
              transition: all 0.3s;
              padding: 20px 0;
              margin-left: 24px;
              width: 100%;
              text-align: center;
              box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              transition: all 0.2s;
              &:hover {
                box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
              }
            }

            .schedule-item:first-child {
              margin-left: 22px;
            }
          }
        }
        .agenda-item:last-child {
          margin: 0;
        }
        .time-box-second {
          .el-tabs__nav-wrap::after {
            display: none;
          }
          .el-tabs__item {
            font-size: 20px;
            font-family: FZLTCHJW--GB1-0, FZLTCHJW--GB1;
            color: rgba(0, 0, 0, 0.5);
            line-height: 24px;
            @media screen and (max-width: 1120px) {
              font-size: 16px;
              line-height: 40px;
            }
          }
          .is-active {
            color: #002fa7;
          }
          .el-tabs__active-bar {
            height: 3px;
            border-radius: 3px;
          }
          .el-tabs__nav-scroll {
            display: flex;
            justify-content: center;
          }
        }
        .second-day {
          .live-item {
            cursor: pointer;
          }
          .live-item::after {
            position: absolute;
            top: 0;
            right: 8px;
            content: '直播';
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #002fa7;
            width: 40px;
            height: 20px;
            background-color: #7fefce;
          }
          .second-body {
            display: flex;
            margin-top: 15px;
            .second-left {
              @media screen and (max-width: 1120px) {
                display: none;
              }
              .left-item {
                position: relative;
                // cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                font-size: 18px;
                color: #fff;
                width: 220px;
                height: 94px;
                background-size: cover;
                background-image: url(/img/summit/devday-2022/agenda/second_sig.png);
                .second-en {
                  font-size: 14px;
                  margin-top: 10px;
                }
              }

              .left-item:first-child {
                cursor: pointer;
                flex-direction: row;
                height: 48px;
                background-image: url(/img/summit/devday-2022/agenda/second_title.png);
                // background-image: none;
              }
            }
            .second-right {
              @media screen and (max-width: 1120px) {
                display: none;
              }
              margin-left: 30px;
              flex: 1;
              .right-title {
                position: sticky;
                top: 61px;
                left: 0;
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                background-color: #fff;
                z-index: 10;
                .right-title-item {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 16px;
                  width: 100%;
                  height: 48px;
                  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
                  border-radius: 8px;
                  background-color: #fff;
                  transition: all 0.2s;
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  &:hover {
                    box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
                  }
                }
                .right-title-item:last-child {
                  margin: 0;
                }
                .active-bg {
                  color: #fff;
                  background-image: url(/img/summit/devday-2022/agenda/moring_time.png);
                }
                .active-bg1 {
                  color: #fff;
                  background-image: url(/img/summit/devday-2022/agenda/afternoon_time.png);
                }
                .active-bg {
                  color: #fff;
                  background-image: url(/img/summit/devday-2022/agenda/night_time.png);
                }
              }
              .right-card-box {
                .right-card-column {
                  display: flex;
                  margin-bottom: 20px;
                  .right-card {
                    display: flex;
                    flex: 1;
                    align-items: center;
                    justify-content: space-between;
                    line-height: 30px;
                    margin-right: 16px;
                    padding: 17px 0 17px 17px;
                    height: 94px;
                    word-spacing: 100vw;
                    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    transition: all 0.2s;
                    &:hover {
                      box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
                    }
                    .card-right {
                      display: flex;
                      flex-direction: column;
                      .dialogue,
                      .etherpad {
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 60px;
                        height: 46px;
                        font-size: 14px;
                        color: #002fa7;
                        background-color: rgb(229, 234, 246);
                        border-radius: 0px 8px 0px 0px;
                        transition: all 0.2s;
                      }
                      .etherpad {
                        margin-top: 2px;
                        border-radius: 0px 0px 8px 0px;
                      }
                      .dialogue:hover,
                      .etherpad:hover {
                        color: #fff;
                        background-color: #002fa7;
                      }
                    }
                  }
                  .double {
                    flex: none;
                    width: 576px;
                  }
                  .half {
                    flex: none;
                    width: 139px;
                  }
                  .one-part {
                    flex: none;
                    width: 278px;
                  }
                  .right-card:last-child {
                    margin-right: 0;
                  }
                }
                .special-card1 {
                  display: block;
                  flex: none;
                  height: 94px;
                  .right-card {
                    margin: 0;
                    flex: none;
                    width: 575px;
                    height: 40px;
                    word-spacing: normal;
                    .card-right {
                      display: flex;
                      flex-direction: row;
                      .dialogue,
                      .etherpad {
                        height: 40px;
                        margin: 0;
                      }
                      .etherpad {
                        margin-left: 2px;
                        border-radius: 0px 8px 8px 0px;
                      }
                      .dialogue {
                        border-radius: 0;
                      }
                    }
                  }
                  .right-card:nth-child(2) {
                    margin-bottom: 14px;
                  }
                  .right-card:first-child {
                    margin-right: 16px;
                    width: 279px;
                    height: 94px;
                    float: left;

                    .card-right {
                      display: flex;
                      flex-direction: column;
                      .dialogue,
                      .etherpad {
                        height: 46px;
                      }
                      .etherpad {
                        margin-top: 2px;
                        margin-left: 0;
                        border-radius: 0px 0px 8px 0px;
                      }
                      .dialogue {
                        border-radius: 0px 8px 0 0;
                      }
                    }
                  }
                }
                .special-card {
                  position: relative;
                  display: block;
                  flex: none;
                  height: 94px;
                  .right-card {
                    flex: none;
                    width: 203px;
                    height: 40px;
                    .card-right {
                      display: flex;
                      flex-direction: row;
                      .dialogue,
                      .etherpad {
                        height: 40px;
                        margin: 0;
                      }
                      .etherpad {
                        margin-left: 2px;
                        border-radius: 0px 8px 8px 0px;
                      }
                      .dialogue {
                        border-radius: 0;
                      }
                    }
                  }
                  .right-card:nth-child(0) {
                    margin-bottom: 14px;
                  }
                  .right-card:nth-child(n + 3) {
                    width: 205px;
                    height: 94px;
                    float: left;

                    .card-right {
                      display: flex;
                      flex-direction: column;
                      .dialogue,
                      .etherpad {
                        height: 46px;
                      }
                      .etherpad {
                        margin-top: 2px;
                        margin-left: 0;
                        border-radius: 0px 0px 8px 0px;
                      }
                      .dialogue {
                        border-radius: 0px 8px 0 0;
                      }
                    }
                  }
                  .right-card:nth-child(1),
                  .right-card:nth-child(2) {
                    width: 205px;
                    float: left;
                    word-spacing: normal;
                  }
                  .right-card:nth-child(1) {
                    width: 427px;
                    margin-right: 16px;
                    margin-bottom: 12px;
                  }
                  .right-card:nth-child(2) {
                    position: absolute;
                    bottom: 0;
                  }
                }
              }
            }
            .afternoon {
              .right-card-box {
                .right-card-column {
                  .double {
                    flex: none;
                    width: 427px;
                  }
                  .onepart {
                    flex: none;
                    width: 205px;
                  }
                }
              }
            }
            .night {
              .right-title {
                .right-title-item {
                  width: 427px;
                }
              }
              .right-card-box {
                .right-card-column {
                  .onepart {
                    flex: none;
                    width: 427px;
                  }
                }
              }
            }
          }
          .second-body-mo {
            display: none;
            @media screen and (max-width: 1120px) {
              display: block;
              .mo-title {
                margin-bottom: 16px;
                text-align: center;
                font-weight: 700;
                font-size: 14px;
                font-family: FZLTCHJW--GB1-0, FZLTCHJW--GB1;
                color: #000000;
                line-height: 24px;
              }
              .mo-render-box {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: 12px;
                .mo-render-card {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  width: 315px;
                }
                .mo-render-title {
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  margin-bottom: 16px;
                  width: 315px;
                  height: 48px;
                  color: #fff;
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  background-image: url(/img/summit/devday-2022/agenda/mo_sig.png);
                  h4:first-child {
                    margin-bottom: 3px;
                  }
                }
                .mo-render-detail {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  line-height: 20px;
                  margin-bottom: 24px;
                  padding: 11px 0 11px 24px;
                  width: 100%;
                  height: 70px;
                  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
                  border-radius: 8px;
                  .mo-detail-right {
                    display: flex;
                    flex-direction: column;
                    line-height: 20px;
                    .dialogue,
                    .etherpad {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 40px;
                      height: 34px;
                      color: #002fa7;
                      font-size: 10px;
                      background-color: rgb(229, 234, 246);
                      border-radius: 0px 8px 0px 0px;
                    }
                    .etherpad {
                      margin-top: 2px;
                      border-radius: 0px 0px 8px 0px;
                    }
                  }
                  .mo-detail-text {
                    word-spacing: normal;
                    line-height: 20px;
                  }
                  .mo-detail-time {
                    color: #555;
                    word-spacing: normal;
                  }
                }
              }
            }
          }
        }
        .third-day {
          .third-body-morning {
            position: relative;
            overflow: hidden;
            .third-item {
              display: flex;
              align-items: center;
              padding: 24px 32px;
              color: #fff;
              margin-bottom: 30px;
              box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              background-size: cover;
              .third-right {
                margin-left: 237px;
                .schedule-text {
                  margin-bottom: 20px;
                }
                .speak {
                  display: flex;
                  .host-guest {
                    .host-item:nth-child(1) {
                      margin-bottom: 16px;
                    }
                  }
                  font-size: 16px;
                  .speak-item {
                    display: flex;
                    margin-bottom: 16px;
                    .speak-name {
                      width: 55px;
                      margin-right: 30px;
                    }
                  }
                  .speak-item:last-of-type {
                    margin: 0;
                  }
                }
              }
            }
          }
          @media screen and (max-width: 1120px) {
            .third-body {
              font-size: 12px;
              .third-body-morning {
                margin-top: 14px;
              }
              .third-item {
                padding: 0;
                height: initial;
                margin: 0;
                box-shadow: none;
                flex-direction: column;
                background-image: none !important;
                .third-left {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 315px;
                  height: 48px;
                  margin: 0 0 16px 0;
                  background-size: cover;
                  border-radius: 8px;
                  background-image: url(/img/summit/devday-2022/agenda/mo_sig.png);
                }
                .third-right {
                  padding: 12px;
                  margin: 0 0 24px 0;
                  line-height: 24px;
                  width: 315px;
                  color: rgba(0, 0, 0, 0.85);
                  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                  border-radius: 8px;
                  .schedule-text {
                    margin: 0;
                    line-height: 24px;
                  }
                  .speak {
                    color: #555555;
                    font-size: 12px;
                    .host-guest {
                      .host-item {
                        margin-bottom: 0;
                        line-height: 24px;
                      }
                      .host-item:nth-child(1) {
                        margin-bottom: 0;
                      }
                    }
                    .speak-item {
                      margin: 0;
                      line-height: 24px;
                      .speak-name {
                        margin-right: 24px;
                        width: 40px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .lecturer {
    width: 1029px;
    margin: 0 auto;
    padding-top: 90px;
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
          font-size: 14px;
          color: #000;
          line-height: 16px;
          margin-top: 8px;
          width: 180px;
          text-align: center;
          &:first-of-type {
            margin-top: 20px;
            font-size: 16px;
            font-weight: 400;
            color: #002fa7;
            line-height: 20px;
          }
          &:last-of-type {
            margin-top: 8px;
          }
        }
      }
    }
    @media screen and (max-width: 1000px) {
      width: 345px;
      padding: 0;
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
  .construction {
    text-align: center;
    .construction-title {
      padding: 50px 0 40px;
    }
    .text-title {
      margin-bottom: 10px;
      font-size: 20px;
      font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
      color: #000000;
      line-height: 46px;
    }
    .img-list {
      margin: 0 auto 40px auto;
      width: 1120px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      flex-direction: row;
      margin-bottom: 40px;
      img {
        cursor: pointer;
        width: 280px;
        height: 80px;
      }
      @media screen and (max-width: 1120px) {
        margin-top: 40px;
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
    .guidance {
      .img-list {
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
    }
    @media screen and (max-width: 1120px) {
      .construction-title {
        padding: 0;
        margin: 30px 0;
        img {
          width: 335px;
          height: 38px;
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
  .review-wrapper {
    @media screen and (max-width: 1120px) {
      padding: 0 20px;
    }
    .title {
      text-align: left;
      font-size: 26px;
      margin-bottom: 32px;
      @media screen and (max-width: 1120px) {
        margin-bottom: 10px;
      }
      span {
        vertical-align: middle;
        @media screen and (max-width: 1120px) {
          font-size: 16px;
        }
      }
      img {
        @media screen and (max-width: 1120px) {
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
      @media screen and (max-width: 1120px) {
        margin-bottom: 12px;
        font-size: 14px;
      }
    }
  }
}
</style>
