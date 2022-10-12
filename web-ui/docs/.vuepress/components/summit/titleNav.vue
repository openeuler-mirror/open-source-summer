<template>
  <div class="title-nav" :class="{ internship: internship }">
    <div class="box-line">
      <img class="gif" v-lazy="'/img/summit/home/nav.gif'" alt="" />
      <img
        class="line"
        :class="{ 'internship-line': internship }"
        v-lazy="'/img/summit/home/line.png'"
        alt=""
      />
    </div>
    <div class="nav-text" :class="{ 'internship-nav': internship }">
      <ul>
        <li
          v-for="(item, index) in dataList"
          :class="index === currentIndex ? 'active' : ''"
          :key="index"
        >
          <a @click.stop="jump(item.key)">
            <div><div class="inside"></div></div>
            <div class="nav-name">
              {{ item.name }}
            </div>
            <br />
            <div class="sub-nav" v-if="item.children">
              <div
                v-for="(i, ind) in item.children"
                :key="i.key"
                @click.stop.prevent="jump(i.key)"
                :class="ind === currentSubIndex ? 'sub-active' : ''"
              >
                {{ i.name }}
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="qq-code" v-show="show && internship">
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
export default {
  data() {
    return {
      show: true,
      color: "#002fa7",
    };
  },
  props: ["currentIndex", "currentSubIndex", "dataList", "internship"],
  mounted() {},
  // watch: {
  //   currentIndex(n) {
  //     if (n === 2) this["--color"] = "#ffffff";
  //     else this["--color"] = "#002fa7";
  //   },
  // },
  methods: {
    jump(key) {
      window.scrollTo(0, document.querySelector(key).offsetTop - 80);
    },
    close() {
      this.show = false;
    },
  },
};
</script>

<style lang="less" scpoed>
@active: #002fa7;

.title-nav {
  position: fixed;
  cursor: pointer;
  top: 170px;
  right: 70px;
  z-index: 1000;
  display: block;

  .box-line {
    width: 70px;
    margin-left: -26px;
    .gif {
      width: 70px;
      height: 70px;
      margin: 0 auto -30px auto;
      position: relative;
      z-index: 20;
    }
    .line {
      display: block;
      width: 2px;
      height: 441px;
      margin: 0 auto;
    }
    .internship-line {
      height: 470px;
    }
  }
  .nav-text {
    position: relative;
    margin-top: -390px;

    ul li a > div {
      display: inline-block;
      transition: color 0.3s;
      &:first-of-type {
        margin-right: 17px;
        border-radius: 50%;
        width: 18px;
        position: relative;
        background: #ffffff;
        height: 18px;
        border: 1px solid #979797;
        div {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #d8d8d8;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -7px;
          margin-top: -7px;
          transition: background-color 0.3s;
        }
      }
      .nav-name {
        font-size: 20px;
        color: #000000;
        line-height: 30px;
      }
    }
    .sub-nav {
      padding-left: 56px;
      padding-top: 8px;
      font-size: 14px;
      line-height: 20px;
      > div {
        transition: color 0.3s;
      }
      .sub-active {
        color: @active;
      }
    }
    ul li {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
    }
    ul .active {
      & a > div.nav-name {
        color: @active;
      }
      .inside {
        background-color: @active;
      }
    }
    ul li > a {
      text-decoration: none;
    }
  }
  .qq-code {
    position: absolute;
    width: 170px;
    .close {
      position: absolute;
      top: -20px;
      right: -20px;
      width: 20px;
    }
    img {
      width: 100%;
    }
  }
  .internship-nav {
    margin-top: -425px;
  }
  @media screen and (max-width: 1540px) {
    display: none;
  }
}
.internship {
  top: 70px;
  right: 100px;
}
</style>
