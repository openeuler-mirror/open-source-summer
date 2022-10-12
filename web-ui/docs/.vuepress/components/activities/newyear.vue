<template>
  <div class="newyear">
    <div class="part-one box-shadow" id="container">
      <div class="point">
        <img
          class="left-point"
          src="/img/activities/year2022/bg-left.png"
          alt=""
        />
        <img
          class="right-point"
          src="/img/activities/year2022/bg-right.png"
          alt=""
        />
      </div>
      <div class="title-2022">
        <img
          class="lantern-left"
          src="/img/activities/year2022/lantern-left.gif"
          alt=""
        />
        <img
          class="logo-2022"
          src="/img/activities/year2022/2022-logo.png"
          alt=""
        />
        <img class="cheers" src="/img/activities/year2022/cheers.png" alt="" />
        <img
          class="lantern-right"
          src="/img/activities/year2022/lantern-right.gif"
          alt=""
        />
      </div>
      <div class="text-box" :class="{'letter':textBlock}" ref="letter">
        <p class="fade fade-time-0">亲爱的开发者们：</p>
        <p class="fade fade-time-1">
          你们好！我想每一个用心爱过我的人都记得：2019年12月31日，openEuler
          社区正式宣布开源。在大家共同的建设和努力下，我正在不断成长，截至2021年12月31日12:00
        </p>
        <div class="icon-box">
          <div class="icon-top fade fade-time-2">
            <div class="icon-item" v-for="item in iconTop" :key="item.text">
              <div class="icon-pic" v-if="!isShowH5">
                <img :src="item.icon" alt="" />
              </div>
              <span>{{ item.text }}</span>
              <span class="yellow">{{ item.num }}</span>
              {{ item.puls }}
            </div>
          </div>
          <div class="icon-bottom fade fade-time-3">
            <div class="icon-item" v-for="item in iconBottom" :key="item.text">
              <div class="icon-pic" v-if="!isShowH5">
                <img :src="item.icon" alt="" />
              </div>
              <span>{{ item.text }}</span>
              <span class="yellow">{{ item.num }}</span>
              {{ item.puls }}
            </div>
          </div>
        </div>
        <div class="ellipsis"></div>
        <p class="fade fade-time-4">
          在这两年，我的成长轨迹中详细记录了你们为我写下的一行行代码，奋斗的每一个日夜。是你们的坚持与贡献，才打造出我更好的模样，成长为最具活力的开源社区。
        </p>
        <p class="fade fade-time-5">
          我对我们的相遇心怀感恩，对你们的付出铭记于心。因此在我两岁生日的时刻，我们诚心推出
          “<span class="dark-red"> openEuler of Our Own </span>” 系列新年活动，诚挚希望您收下我精心准备的礼物，期望在未来你我可以并肩继续坚定走下去。
        </p>
        <p class="fade fade-time-6">openEuler 社区</p>
      </div>
    </div>
    <div class="part-tow">
      <div class="part-tow-title title">
        <img src="/img/activities/year2022/activity-title1.png" alt="" />
      </div>
      <div class="part-tow-text box-shadow">
        <div class="point">
          <img
            class="left-point"
            src="/img/activities/year2022/bg-left.png"
            alt=""
          />
        </div>
        <div class="fu-gif">
          <img src="/img/activities/year2022/fu-gif.gif" alt="" />
        </div>
        <div class="qr-code">
          <img src="/img/activities/year2022/qr-code.png" alt="" />
          <p class="yellow">扫码添加小助手微信</p>
        </div>
        <div class="text-item">
          <h3 class="text-head dark-red">参与方式</h3>
          <p>
            在朋友圈晒出自己的欧拉社区年度贡献报告，并以话题
            <span class="blue">#我为openEuler 打call</span>
            开头写上一段最想对openEuler
            开源社区说得话，可以是自己收获的心得体会、未来期望，也可以是告白或者吐槽哦~
          </p>
          <p>
            完成即可获得 openEuler DIY积木工卡套或 openEuler
            定制夜灯其中一款，并有书签和贴纸随机掉落哦～
          </p>
        </div>
        <div
          class="text-item"
          v-for="(item, index) in activityOne"
          :key="item.title"
        >
          <h3 class="text-head dark-red">
            {{ item.title }}
          </h3>
          <p
            v-for="(item1, index1) in item.content"
            :class="{ 'last-tow': index == 2 && index1 == 0 }"
            :key="item1.content"
          >
            {{ item1 }}
          </p>
        </div>
      </div>
    </div>
    <div class="part-three">
      <div class="part-tow">
        <div class="part-tow-title title">
          <img src="/img/activities/year2022/activity-title2.png" alt="" />
        </div>
        <div class="part-tow-text box-shadow">
          <div class="point">
            <img
              class="right-point"
              src="/img/activities/year2022/bg-right.png"
              alt=""
            />
          </div>
          <div class="fu-gif">
            <img src="/img/activities/year2022/fu-gif.gif" alt="" />
          </div>
          <div class="qr-code">
            <img src="/img/activities/year2022/qr-code.png" alt="" />
            <p class="yellow">扫码添加小助手微信</p>
          </div>
          <div class="text-item">
            <h3 class="text-head dark-red">参与方式</h3>
            <p>
              以
              <span class="blue">【我为openEuler 代言】</span
              >为主题录制一段不少于30秒的视频。视频内容可以介绍自己在openEuler社区的身份；在openEuler社区做过什么事；对openEuler社区未来的期望……
            </p>
            <p>
              完成即可获得openEuler 定制卫衣+openEuler 定制电脑包。注：礼品随机发放。
            </p>
            <p>
              【我为openEuler
              代言】系列主题视频收集完毕后，我们会进行视频后期剪辑加工处理，并在openEuler
              头条号、公众号、视频号、B站等渠道进行发布。
            </p>
          </div>
          <div
            class="text-item"
            v-for="(item, index) in activityTow"
            :key="item.title"
          >
            <h3 class="text-head dark-red">
              {{ item.title }}
            </h3>
            <p
              v-for="(item1, index1) in item.content"
              :class="{ 'last-tow': index == 2 && index1 == 0 }"
              :key="item1.content"
            >
              {{ item1 }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="show-prize">
      <div class="title">
        <img src="/img/activities/year2022/title-last.png" alt="" />
      </div>
      <div class="prize-box">
        <div
          class="pirze-item box-shadow"
          v-for="item in prizeItem"
          :key="item"
        >
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenLite, TweenMax, Linear, Sine } from "gsap";
export default {
  data() {
    return {
      textBlock: false,
      iconTop: [
        {
          icon: "/img/activities/year2022/user.png",
          text: "社区用户",
          num: "370,000",
          puls: "+",
        },
        {
          icon: "/img/activities/year2022/software.png",
          text: "社区软件包",
          num: "8600",
          puls: "+",
        },
        {
          icon: "/img/activities/year2022/contribution.png",
          text: "社区贡献者",
          num: "8000",
          puls: "+",
        },
      ],
      iconBottom: [
        {
          icon: "/img/activities/year2022/sig.png",
          text: "SIG组",
          num: "95",
          puls: "个",
        },
        {
          icon: "/img/activities/year2022/osv.png",
          text: "商用OSV",
          num: "11",
          puls: "家",
        },
        {
          icon: "/img/activities/year2022/company.png",
          text: "企业成员",
          num: "300",
          puls: "+家",
        },
      ],
      activityOne: [
        {
          title: "活动对象：",
          content: ["openEuler 社区的朋友们"],
        },
        {
          title: "活动时间：",
          content: ["2021年12月31日-2022年1月5日"],
        },
        {
          title: "兑换方式：",
          content: [
            "打call完毕后请在2022年1月6日前（含6日）发送朋友圈截图至openEuler小助手微信（vx:openeuler123)，小助手验收通过后登记个人收货地址，我们将在活动结束后1-10个工作日内为您寄出。",
            "注：奖品仅限300份，先到先得哦",
          ],
        },
      ],
      activityTow: [
        {
          title: "活动对象：",
          content: ["openEuler 社区SIG组成员"],
        },
        {
          title: "活动时间：",
          content: ["2021年12月31日-2022年1月12日 "],
        },
        {
          title: "兑换方式：",
          content: [
            "请于2022年1月13日前（含13日）把视频发送至openEuler小助手微信（vx:openeuler123)，为避免微信压缩画质，建议通过压缩文件进行传输。小助手查收后登记个人收货地址，我们将在活动结束后1-10个工作日内为您寄出。",
            "注：奖品仅限80份，先到先得哦",
          ],
        },
      ],
      prizeItem: [
        "/img/activities/year2022/card.png",
        "/img/activities/year2022/bag.png",
        "/img/activities/year2022/clothes.png",
        "/img/activities/year2022/bookmark.png",
        "/img/activities/year2022/light.png",
      ],
    };
  },
  methods: {
    goFooterUrl(url) {
      if (url.includes("https")) {
        window.open(url);
      } else {
        console.log(this.$router);
        this.$router.push({
          path: this.resolvePath(url),
        });
      }
    },
    fall() {
      let a = null;
      TweenLite.set("#container", { perspective: 600 });
      TweenLite.set("img", { xPercent: "-50%", yPercent: "-50%" });
      var container = document.getElementById("container"),
        w = 1120,
        h = 700;
      for (let i = 0; i < 80; i++) {
        var Div = document.createElement("div");
        TweenLite.set(Div, {
          attr: { class: "dot" },
          x: R(0, w),
          y: R(-200, -150),
          z: R(-200, 200),
        });
        container.appendChild(Div);
        animm(Div);
        a = Math.floor(Math.random() * 10 + 1);
        Div.style.backgroundImage = `url(/img/activities/year2022/icon${a}.png)`;
      }

      function animm(elm) {
        TweenMax.to(elm, R(6, 15), {
          y: h + 100,
          ease: Linear.easeNone,
          repeat: -1,
          delay: -15,
        });
        TweenMax.to(elm, R(4, 8), {
          x: "+=100",
          rotationZ: R(0, 180),
          repeat: -1,
          yoyo: true,
          ease: Sine.easeInOut,
        });
        TweenMax.to(elm, R(2, 8), {
          rotationX: R(0, 360),
          rotationY: R(0, 360),
          repeat: -1,
          yoyo: true,
          ease: Sine.easeInOut,
          delay: -5,
        });
      }
      function R(min, max) {
        return min + Math.random() * (max - min);
      }
    },
    scroTop() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (!this.isShowH5) {
        if (scrollTop > 200) {
          this.textBlock = true;
          let fades = document.querySelectorAll(".fade");
          for (let i = 0; i < fades.length; i++) {
            fades[i].classList.add("run-fade");
          }
        }
      } else {
      }
    },
    showFade() {
      this.$refs.letter.style.visibility = "visible"
      let fades = document.querySelectorAll(".fade");
      for (let i = 0; i < fades.length; i++) {
        fades[i].style.opacity = "1";
      }
    },
  },
  mounted() {
    this.fall();
    this.isShowH5 ? this.showFade() : "";
    window.addEventListener("scroll", this.scroTop);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroTop);
  },
};
</script>
<style>
.dot {
  position: absolute;
  top: 0;
  width: 11px;
  height: 12px;
  background-size: 100% 100%;
}
</style>
<style lang="less" scoped>
.red {
  color: #a70000;
}
.blue {
  cursor: pointer;
  color: #002fa7;
}
.yellow {
  color: #ef8a2c;
}
.dark-red {
  color: #b03214;
}
.box-shadow {
  border-radius: 8px;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 1000px) {
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
  }
}
.newyear {
  max-width: 1120px;
  margin: 0 auto 200px;
  .point {
    display: none;
  }
  img {
    width: 100%;
  }
  .part-one {
    position: relative;
    padding: 142px 30px 0 30px;
    height: 758px;
    background-image: url(/img/activities/year2022/cheer-bg.png);
    background-repeat: no-repeat;
    background-size: 100%, 100%;
    overflow: hidden;
    .title-2022 {
      .lantern-left,
      .lantern-right,
      .logo-2022,
      .cheers {
        position: absolute;
        top: 20px;
        left: 50px;
        width: 105px;
        z-index: 2;
        @media screen and (max-width: 1000px) {
          width: 42px;
          top: 0;
          left: 8px;
        }
      }
      .logo-2022 {
        display: none;
        @media screen and (max-width: 1000px) {
          display: block;
          width: 130px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .cheers {
        display: none;
        @media screen and (max-width: 1000px) {
          display: block;
          width: 100%;
          max-height: 110px;
          left: 0;
          top: inherit;
          bottom: -10px;
        }
      }

      .lantern-right {
        left: inherit;
        right: 50px;
        @media screen and (max-width: 1000px) {
          right: 8px;
        }
      }
    }
    .text-box {
      position: relative;
      padding: 30px;
      background-color: #fff;
      border-radius: 8px;
      z-index: 1;
      visibility: hidden;
      @keyframes letter {
        from {
          transform: translateX(-500px);
        }
        to {
          transform: translate();
          visibility: visible;
        }
      }
      .dark-red {
        font-size: 20px;
      }
      p {
        color: #555;
        font-size: 16px;
        line-height: 32px;
      }
      p:nth-of-type(n+2){
        text-indent: 2em;

      }
      p:last-child {
        text-align: right;
      }
      .fade {
        opacity: 0;
      }
      .run-fade {
        animation: fade 2s cubic-bezier(0.26, 0.45, 1, 0.56) forwards;
      }
      .fade-time(@i) when(@i >=0) {
        .fade-time-@{i} {
          animation-delay: @i * 2 + 1s;
        }
        .fade-time((@i - 1));
      }

      .fade-time(9);
      @keyframes fade {
        100% {
          opacity: 1;
        }
      }
      .icon-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 82px;
        .icon-top,
        .icon-bottom {
          display: flex;
          justify-content: space-around;
          padding-left: 40px;
          @media screen and (max-width: 1000px) {
            padding-left: 28px;
          }
        }
        .icon-bottom {
          @media screen and (max-width: 1000px) {
            .icon-item:last-child {
              position: relative;
              padding-bottom: 26px;
            }
            .icon-item:last-child::after {
              position: absolute;
              content: "......";
              left: 0;
              bottom: 10px;
              letter-spacing: 2px;
            }
          }
        }
        .icon-item {
          display: flex;
          align-items: center;
          width: 230px;
          .icon-pic {
            margin-right: 12px;
            width: 28px;
            height: 25px;
          }
        }
      }
    }
    .letter {
      animation: letter 1s forwards ease-in-out;
    }
  }
  .part-tow {
    margin-top: 62px;
    .part-tow-title {
      margin-bottom: 23px;
      text-align: center;
      img {
        width: 520px;
      }
    }
    .part-tow-text {
      position: relative;
      padding: 60px 50px 0 50px;
      width: 100%;
      height: 490px;
      font-size: 14px;
      line-height: 30px;
      background-image: url(/img/activities/year2022/activity1-bg.png);
      background-size: 100%;
      background-repeat: no-repeat;
      h3 {
        font-size: 16px;
      }
      .last-tow {
        width: 890px;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
      }
      .fu-gif {
        position: absolute;
        top: 0;
        right: 50px;
        width: 70px;
        @media screen and (max-width: 1000px) {
          width: 60px;
          right: 15px;
        }
      }
      .qr-code {
        position: absolute;
        right: 60px;
        bottom: 60px;
        text-align: center;
        @media screen and (max-width: 1000px) {
          display: none;
        }
        img {
          width: 90px;
        }
        p {
          font-size: 12px;
          color: #ef8a2c;
        }
      }
    }
  }
  .part-three {
    .fu-gif {
      left: 50px;
      @media screen and (max-width: 1000px) {
        width: 60px;
        left: 15px;
      }
    }
    .part-tow-text {
      background-image: url(/img/activities/year2022/activity2-bg.png);
    }
    .part-tow-text {
      padding-top: 90px;
      height: 560px;
    }
  }
  .show-prize {
    .title {
      margin: 50px 0 30px 0;
      text-align: center;
      img {
        width: 300px;
      }
    }
    .prize-box {
      display: flex;
      justify-content: space-between;
    }
    .pirze-item {
      cursor: pointer;
      width: 210px;
      transition: all 0.5s;
    }
    .pirze-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 20px 4px rgba(115, 119, 124, 30%);
    }
  }
  @media screen and (max-width: 1000px) {
    margin: 0;
    padding: 18px 30px 65px;
    font-size: 14px;
    .point {
      display: block;
      .left-point,
      .right-point {
        position: absolute;
        top: 0;
        left: 0;
        width: 127px;
        height: 37px;
      }
      .right-point {
        left: inherit;
        right: 0;
      }
    }
    .part-one {
      height: fit-content;
      padding: 50px 12px 60px;
      background: #ffeddc;
      .text-box {
        p {
          font-size: 14px;
          line-height: 24px;
        }
        .icon-box {
          flex-direction: column;
          height: fit-content;
          .icon-top,
          .icon-bottom {
            flex-direction: column;
            .icon-item {
              padding: 5px 0;
            }
            .yellow {
              color: #fbb130;
              font-size: 16px;
            }
          }
        }
        .fade-time-5 {
          flex-direction: column;
          .dark-red {
            font-size: 16px;
          }
        }
      }
    }
    .part-tow {
      margin-top: 40px;
   
      .title {
        margin-bottom: 20px;
        img {
          width: 300px;
        }
      }
      .part-tow-text {
        padding: 54px 15px 30px;
        background: #ffeddc;
        height: fit-content;
      }
    }
    .show-prize {
      .title {
        margin: 40px 0 33px 0;
        img {
          width: 180px;
        }
      }
      .prize-box {
        flex-wrap: wrap;
        .pirze-item {
          margin-bottom: 15px;
          width: 150px;
        }
      }
    }
  }
  .questionnaire {
    position: relative;
    margin: 40px 0;
    height: 370px;
    text-align: center;
    .joinsoon {
      position: absolute;
      left: 50px;
      bottom: 50px;
      width: 180px;
      height: 40px;
    }
    img {
      height: 100%;
      box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
    }
  }
  .prize {
    display: flex;
    margin-bottom: 60px;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      width: 270px;
      height: 354px;
      border-radius: 8px;
      box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
      &:first-of-type {
        margin-bottom: 60px;
        width: 100%;
        height: 200px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    li:hover {
      transition: all 0.3s;
      transform: translateY(-8px);
    }
  }
  .rule {
    margin-bottom: 170px;
    .rule-title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 36px;
    }
    p {
      line-height: 30px;
      font-size: 14px;
      margin-bottom: 30px;
    }
  }
}
@media screen and (max-width: 1000px) {
  .questionnaire-content {
    .questionnaire {
      .joinsoon {
        left: 139px;
        bottom: 79px;
        width: 100px;
        height: 30px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    .prize {
      align-items: center;
      flex-direction: column;
      justify-content: center;
      li {
        margin-bottom: 30px;
        width: 315px;
        height: 300px;
      }
      li:first-of-type {
        margin-bottom: 30px;
        width: 315px;
        height: 300px;
      }
    }
    .rule {
      margin-bottom: 80px;
      .rule-title {
        font-size: 18px;
      }
      padding: 0 30px;
    }
  }
}
</style>