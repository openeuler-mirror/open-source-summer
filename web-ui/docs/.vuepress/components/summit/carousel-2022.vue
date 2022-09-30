<template>
  <div class="agenda-carousel">
    <div class="agenda-msg">
      <div class="agenda-msg-mo">
        <div class="agenda-hand-mo">
          <div
            class="prev btn"
            @click="handleBtn('left')"
            :style="{ background: 'url(' + prev + ') no-repeat center' }"
          ></div>
          <div class="agenda-title-text" v-if="!isTransform">
            {{ carouselObj.TIME_LIST[0] }}
          </div>
          <div class="agenda-title-text" v-else>
            {{
              i18n.devday2022.AGENDA.AGENDA_DATA_15.SCHEDULE_AFTERNOON_LAST
                .TIME_LIST[0]
            }}
          </div>
          <div
            class="next btn"
            @click="handleBtn('right')"
            :style="{ background: 'url(' + prev + ') no-repeat center' }"
          ></div>
        </div>
      </div>
      <div class="time-list">
        <div
          class="time-item"
          :class="{ 'active-bg': activeBackground === index }"
          v-for="(item, index) in carouselObj.TIME_LIST"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="card-list">
        <div
          class="shade-remind"
          v-if="isShowDetail"
          @click="hideDetail('1')"
        ></div>
        <div class="msg-detail" @click="showDetail('1')" v-if="isShowDetail">
          <div class="detail-time-box">
            <p><i></i>{{ detailMsg.TIME }}</p>
            <p>{{ detailMsg.THEME }}</p>
          </div>
          <div class="speaker-box">
            <i v-if="detailMsg.SPEAKER"></i>
            <p v-for="(value, key) in detailMsg.SPEAKER" :key="key">
              {{ value }}
            </p>
          </div>
          <div class="desc-box">
            <i v-if="detailMsg.DESC"></i>
            <p v-for="(item, index) in detailMsg.DESC" :key="index">
              <template v-if="item">
                {{ item }}
              </template>
            </p>
          </div>
        </div>
        <div class="card-box">
          <div class="transform-box" :class="{ 'is-transform': isTransform }">
            <ul class="card-list">
              <li v-for="(item, index) in carouselObj.CARD_LIST" :key="index">
                <p class="section" v-for="values in item.TITLE" :key="values">
                  {{ values }}
                </p>
                <a
                  :class="[
                    value.THEME ? 'card-item' : 'null-item',
                    {
                      'double-card':
                        (index === 1 &&
                          key === 1 &&
                          carouselObj.TIME_LIST.length > 10) ||
                        (index === 1 &&
                          key === 2 &&
                          carouselObj.TIME_LIST.length > 10),
                    },
                  ]"
                  v-for="(value, key) in item.ITEM_LIST"
                  :key="key"
                  @click="showDetail(value, 1)"
                >
                  <p>{{ value.THEME }}</p>
                  <p class="mo-time">{{ value.TIME }}</p>
                </a>
              </li>
            </ul>
            <ul class="card-list devday-last">
              <li
                v-for="(item, index) in i18n.devday2022.AGENDA.AGENDA_DATA_15
                  .SCHEDULE_AFTERNOON_LAST.CARD_LIST"
                :key="index"
              >
                <p class="section" v-for="values in item.TITLE" :key="values">
                  {{ values }}
                </p>
                <a
                  :class="[value.THEME ? 'card-item' : 'null-item']"
                  v-for="(value, key) in item.ITEM_LIST"
                  :key="key"
                  @click="showDetail(value, 1)"
                >
                  <p>{{ value.THEME }}</p>
                  <p class="mo-time">{{ value.TIME }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prev: '/img/home/prev.svg',
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
      summitData: false,
      isTransform: false,
      activeBackground: -1,
    };
  },
  props: ['agendaData', 'sigData'],
  created() {
    this.getDate();
    let agendaObj = this.i18n.interaction.SUMMIT.SUMMIT_HOME_DATA;
    agendaObj = agendaObj.AGENDA;
    this.carouselObj = this.agendaData;
    this.isTimeOn();
  },
  methods: {
    getDate(time) {
      let currentDate = parseInt(new Date().getTime() / 1000 / 60);
      let date = parseInt(new Date(time).getTime() / 1000 / 60);
      return date - currentDate + 15;
    },
    isTimeOn() {
      this.carouselObj.TIME_LIST.forEach((item, index) => {
        this.getDate(`2022-4-15-${item.split(' ')[0]}`) >= 0 &&
        this.getDate(`2022-4-15-${item.split(' ')[0]}`) < 15
          ? (this.activeBackground = index)
          : '';
      });
    },
    showDetail(item, which) {
      if (item.THEME && which === 1) {
        this.detailMsg = {};
        this.isShowDetail = true;
        this.detailMsg = item;
      } else if (item.CONTENT && which === 2) {
        this.sigContent = item.CONTENT;
        this.sigDesc = item.DESC ? item.DESC : [];
        this.showSigDetail = true;
      } else {
        return false;
      }
    },
    handleBtn(direction) {
      this.isShowDetail = false;
      direction === 'left'
        ? (this.isTransform = false)
        : (this.isTransform = true);
    },
    hideDetail(which) {
      if (which === '1') {
        this.isShowDetail = false;
      } else {
        this.showSigDetail = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.agenda-carousel {
  position: relative;
  margin-top: 50px;
  display: block;
  @media screen and (max-width: 1120px) {
    margin-top: 14px;
  }
  .shade-remind {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.05);
  }
  .msg-detail {
    font-size: 14px;
    color: #000000;
    line-height: 26px;
    z-index: 20;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: scroll;
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f1f1f1;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #afbfe8;
    }
    width: 450px;
    height: 350px;
    background: #ffffff;
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 26px;
    @media screen and (max-width: 1120px) {
      position: fixed;
      width: 315px;
      height: 357px;
      padding: 20px;
      margin: 0;
      transform: translate(-50%, -50%);
      font-size: 10px;
      .speaker-box,
      .time-box {
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
    .detail-time-box {
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
  .agenda-msg {
    display: flex;
    flex-direction: row;
    .time-list {
      @media screen and (max-width: 1120px) {
        display: none;
      }
      position: relative;
      z-index: 10;
      background-color: white;
      .time-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 170px;
        height: 92px;
        font-size: 20px;
        color: #00000080;
        margin-bottom: 16px;
        background-size: cover;
        box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      .time-item:first-child {
        color: #ffffff;
        background-size: cover;
        background-image: url(/img/summit/devday-2022/agenda/thild-half.png);
        margin-bottom: 30px;
        height: 48px;
        line-height: 48px;
      }
      .active-bg {
        color: #fff;
        background-image: url(/img/summit/devday-2022/agenda/thild-time.png);
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
      .left {
        left: 45px;
      }
      .right {
        right: 15px;
        transform: rotateZ(-180deg);
      }
      .card-box {
        width: 100%;
        padding-left: 30px;
        @media screen and (max-width: 1120px) {
          overflow: hidden;
        }
        .card-list {
          display: flex;
          margin: 0 10px;
          flex-direction: row;
          width: 100%;
          transition: 0.5s ease-in-out;
          li {
            margin-right: 16px;
            .null-item {
              display: block;
              width: 218px;
              height: 92px;
              border-radius: 8px;
              overflow: hidden;
              margin-bottom: 16px;
              box-shadow: none;
              p {
                font-size: 18px;
                color: rgba(0, 0, 0, 0.85);
                line-height: 30px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              @media screen and (max-width: 1120px) {
                display: none;
              }
            }
            .section {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 30px;
              font-size: 20px;
              color: #ffffff;
              height: 48px;
              box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              background-size: cover;
              background-image: url(/img/summit/devday-2022/agenda/thild-title.png);
            }
            .card-item {
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              text-decoration: none;
              padding: 16px;
              width: 218px;
              height: 92px;
              border-radius: 8px;
              overflow: hidden;
              margin-bottom: 16px;
              box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
              transition: all 0.2s;
              &:hover {
                box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
              }
              p {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                color: #000000d9;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .mo-time {
                display: none;
              }
            }
            .double-card {
              height: 200px;
            }
          }
        }
        .devday-last {
          display: none;
          @media screen and (max-width: 1120px) {
            display: flex;
          }
        }

        @media screen and (max-width: 1120px) {
          .transform-box {
            display: flex;
            align-items: flex-start;
            width: 100%;
            height: 1852px;
            transition: all 0.3s;
          }
          .is-transform {
            height: 100%;
            transform: translate(-100%);
          }
        }
      }
    }
    @media screen and (max-width: 1120px) {
      align-items: center;
      p::after {
        display: none;
      }
      flex-direction: column;
      width: 100%;
      .card-list {
        display: flex;
        justify-content: center;
        width: 335px;
        .shade-remind {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
        }
        .card-box {
          padding: 0;
          width: 335px;
          .card-list {
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 12px;

            li {
              margin: 0;
              width: 315px;
              .section {
                font-size: 12px;
                margin-bottom: 16px;
              }
              .card-item {
                display: block;
                width: 100%;
                height: fit-content;
                padding: 11px 12px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                p {
                  text-align: left;
                  font-size: 12px;
                  line-height: 24px;
                }
                .mo-time {
                  display: block;
                  color: #555;
                }
              }
              .card-item:hover {
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }
  }
  .agenda-msg-mo {
    display: none;
    @media screen and (max-width: 1120px) {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 26px;
      .agenda-hand-mo {
        display: flex;
        width: 315px;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 700;
        .next {
          transform: rotateZ(-180deg);
        }
        .btn {
          cursor: pointer;
          padding: 5px;
          width: 8px;
          height: 16px;
          box-sizing: content-box;
        }
        .isShow {
          opacity: 0;
        }
      }
    }
  }
}
</style>
