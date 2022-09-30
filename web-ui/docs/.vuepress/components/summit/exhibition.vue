<template>
  <div class="exhibition">
    <div class="container">
      <a
        @click.stop="mapClick(item, $event, index)"
        v-for="(item, index) in link"
        :key="item"
        v-show="index <= 34 || showBox"
      ></a>
      <img
        src="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/images/%E7%BA%BF%E4%B8%8A%E5%B1%95%E5%8E%85.png"
      />
      <img
        class="box"
        v-if="showBox"
        src="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/images/%E7%BA%BF%E4%B8%8A%E5%B1%95%E5%8E%85%E5%BC%B9%E7%AA%97.png"
        alt=""
      />
      <div class="banner-video" v-if="isMasked">
        <div class="video-mask" @click.stop="maskClicked($event)"></div>
        <div class="video-box">
          <video width="100%" controls autoplay>
            <source :src="videoLink" />
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLink: "",
      isMasked: false,
      showBox: false,
      link: [
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/os-industry-overview/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E4%BA%A7%E4%B8%9A%E6%80%BB%E8%A7%88.mp4", //操作系统总览
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/core-user-cases/%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8.mp4", //中国移动
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/core-user-cases/%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1.mp4", //中国电信
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/core-user-cases/%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A.mp4", //中国联通
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/core-user-cases/%E4%B8%AD%E5%9B%BD%E9%93%B6%E8%81%94.mp4", //中国银联
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/core-user-cases/%E8%A1%8C%E4%B8%9A%E6%A1%88%E4%BE%8B.mp4", //行业案列
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/chip-vendor/%E9%B2%B2%E9%B9%8F.mp4", //鲲鹏
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/chip-vendor/%E9%A3%9E%E8%85%BE.mp4", //飞腾
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/osv-vendor/%E9%BA%92%E9%BA%9F%E8%BD%AF%E4%BB%B6.mp4", //麒麟软件
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/osv-vendor/%E7%BB%9F%E4%BF%A1%E8%BD%AF%E4%BB%B6.mp4", //统信软件
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/openatom-foundation/%E5%BC%80%E6%94%BE%E5%8E%9F%E5%AD%90%E5%BC%80%E6%BA%90%E5%9F%BA%E9%87%91%E4%BC%9A.mp4", //开放原子
        "box", //harmony
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/chip-vendor/%E7%94%B3%E6%B3%B0%E4%BF%A1%E6%81%AF.mp4", //申泰信息
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/chip-vendor/%E5%85%86%E8%8A%AF.mp4", //兆芯
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/osv-vendor/%E9%BA%92%E9%BA%9F%E4%BF%A1%E5%AE%89.mp4", //麒麟信安
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/osv-vendor/SUSE.mp4", //suse
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/other-vendor/%E5%A5%87%E8%99%8E360.mp4", //奇虎360
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/other-vendor/%E8%BD%AF%E9%80%9A%E5%8A%A8%E5%8A%9B.mp4", //软通动力
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/chip-vendor/%E9%BE%99%E8%8A%AF.mp4", //龙芯
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/osv-vendor/%E6%99%AE%E5%8D%8E%E5%9F%BA%E7%A1%80%E8%BD%AF%E4%BB%B6.mp4", //普华基础软件
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/osv-vendor/%E5%8C%97%E4%BA%AC%E6%8B%93%E6%9E%97%E6%80%9D.mp4", //北京拓林思
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/other-vendor/%E6%98%93%E6%8D%B7%E8%A1%8C%E4%BA%91.mp4", //易捷行云
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/other-vendor/%E4%B8%9C%E6%96%B9%E9%80%9A.mp4", //东方通
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/A-Tune%E8%B0%83%E4%BC%98MySQL%EF%BC%8C%E6%80%A7%E8%83%BD%E6%8F%90%E5%8D%87500%25.mp4", //A—Tune
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/Eggo%E4%BA%91%E5%8E%9F%E7%94%9F%E9%9B%86%E7%BE%A4%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B7%B7%E5%90%88%E9%83%A8%E7%BD%B2%E6%96%B9%E6%A1%88.mp4", //eggo云原生
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/A-Ops%E6%99%BA%E8%83%BD%E8%BF%90%E7%BB%B4%EF%BC%8C%E9%97%AE%E9%A2%98%E7%95%8C%E5%AE%9A%E6%97%B6%E9%97%B4%E5%B0%8F%E4%BA%8E10%E5%88%86%E9%92%9F.mp4", //A-Ops
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/OSWare%E2%80%93%E6%99%BA%E8%83%BD%E7%89%A9%E8%81%94%E7%BD%91%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.mp4", //OSWare
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/etMem%E5%86%85%E5%AD%98%E5%88%86%E7%BA%A7%E6%89%A9%E5%B1%95%EF%BC%8C%E5%90%8C%E7%AD%89%E6%80%A7%E8%83%BD%E4%B8%8B%E5%86%85%E5%AD%98%E6%88%90%E6%9C%AC%E6%98%BE%E8%91%97%E9%99%8D%E4%BD%8E.mp4", //etMem
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/openEuler%2BOpenStack%20%E6%89%93%E9%80%A0%E5%BC%80%E6%94%BE%E5%8F%AF%E4%BF%A1%E7%9A%84%E4%BA%91%E8%AE%A1%E7%AE%97%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B9%B3%E5%8F%B0.mp4", //OpenStack
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/openEuler%E7%A4%BE%E5%8C%BA%E4%BB%8B%E7%BB%8D.mp4", //openeuelr社区介绍
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/StratoVirt%E5%AF%B9%E6%8E%A5%E6%A0%87%E5%87%86%E8%99%9A%E6%9C%BA%EF%BC%8C%E5%AF%86%E5%BA%A6%E6%8F%90%E5%8D%871%E5%80%8D.mp4", //StratoVirt
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/%E5%9C%A8RISC-V%E5%BC%80%E5%8F%91%E6%9D%BF%E7%8E%A9Java%E6%B8%B8%E6%88%8F.mp4", //RISC-V
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/%E5%86%85%E6%A0%B8%E7%83%AD%E5%8D%87%E7%BA%A7%E5%9C%A8%E9%BA%92%E9%BA%9F%E9%93%B6%E6%B2%B3%E7%B3%BB%E7%BB%9F%E4%B8%8A%E7%9A%84%E5%AE%9E%E8%B7%B5.mp4", //内核热升级
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/DDE%E6%A1%8C%E9%9D%A2.mp4", //DDE桌面
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/euler-innovation-tech/%E4%B8%9C%E6%96%B9%E9%80%9ATongWeb%E5%BA%94%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%87%AA%E4%B8%BB%E6%A0%87%E5%87%86%E5%AE%89%E5%85%A8.mp4", //东方通
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/open-harmony/OpenHarmony%E4%BC%99%E4%BC%B4-%E4%B8%AD%E7%A7%91%E9%99%A2%E8%BD%AF%E4%BB%B6%E6%89%80.mp4", //九院研究所
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/open-harmony/OpenHarmony%E4%BC%99%E4%BC%B4-%E4%B9%9D%E8%81%94%E7%A7%91%E6%8A%80.mp4", //九联科技
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/open-harmony/OpenHarmony%E4%BC%99%E4%BC%B4-%E4%B8%9C%E6%96%B9%E5%88%9B%E7%A7%91.mp4", //东方创科
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/open-harmony/OpenHarmony%E4%BC%99%E4%BC%B4-%E6%8B%93%E7%BB%B4%E4%BF%A1%E6%81%AF.mp4", //拓维信息
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/open-harmony/OpenHarmony%E4%BC%99%E4%BC%B4-%E6%B6%A6%E5%92%8C%E8%BD%AF%E4%BB%B6.mp4", //润和软件
        "https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/openEuler-summit-2021/booth-videos/open-harmony/OpenHarmony%E4%BC%99%E4%BC%B4-%E8%BD%AF%E9%80%9A%E5%8A%A8%E5%8A%9B.mp4", //软通动力
      ],
    };
  },
  created() {},
  mounted() {
    document.body.addEventListener(
      "click",
      () => {
        undefined;
        this.showBox = false;
      },
      false
    );
  },
  methods: {
    videoClicked() {
      this.isMasked = true;
    },
    maskClicked() {
      this.isMasked = false;
    },
    closeBox() {
      this.showBox = false;
    },
    mapClick(link, e, index) {
      if (link == "box") {
        e.target.style = "z-index:1;";
        this.showBox = true;
      } else {
        if (index <= 34) {
          this.showBox = false;
        }
        this.videoLink = link;
        this.isMasked = true;
      }
    },
  },
};
</script>
<style lang="less" scpoed>
.exhibition {
  margin: 70px auto 0;
  .boxMask {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .banner-video {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 11;
    @media screen and (max-width: 1000px) {
      z-index: 100;
    }
    .video-mask {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
    }
    .video-box {
      width: 900px;
      top: 50%;
      left: 50%;
      position: relative;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }
  }
  .container {
    position: relative;
    width: 1120px;
    img {
      width: 100%;
    }
    .box {
      position: absolute;
      top: 25px;
      right: 25px;
      width: 286px;
      height: 154px;
    }
    a {
      position: absolute;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    a:nth-of-type(1) {
      width: 131px;
      height: 26px;
      top: 2px;
      left: 128px;
    }
    a:nth-of-type(2) {
      width: 80px;
      height: 28px;
      top: 0;
      left: 337px;
    }
    a:nth-of-type(3) {
      width: 80px;
      height: 28px;
      top: 0;
      left: 469px;
    }
    a:nth-of-type(4) {
      width: 80px;
      height: 28px;
      top: 0;
      left: 601px;
    }
    a:nth-of-type(5) {
      width: 80px;
      height: 28px;
      top: 0;
      left: 733px;
    }
    a:nth-of-type(6) {
      width: 80px;
      height: 28px;
      top: 0;
      left: 862px;
    }
    a:nth-of-type(7) {
      width: 80px;
      height: 28px;
      top: 158px;
      left: 128px;
    }
    a:nth-of-type(8) {
      width: 80px;
      height: 28px;
      top: 161px;
      left: 272px;
    }
    a:nth-of-type(9) {
      width: 80px;
      height: 28px;
      top: 149px;
      left: 459px;
    }
    a:nth-of-type(10) {
      width: 80px;
      height: 28px;
      top: 147px;
      left: 592px;
    }
    a:nth-of-type(11) {
      width: 134px;
      height: 28px;
      top: 129px;
      left: 717px;
    }
    a:nth-of-type(12) {
      width: 134px;
      height: 28px;
      top: 149px;
      left: 884px;
      z-index: 2;
    }
    a:nth-of-type(13) {
      width: 80px;
      height: 28px;
      top: 233px;
      left: 113px;
    }
    a:nth-of-type(14) {
      width: 80px;
      height: 28px;
      top: 234px;
      left: 259px;
    }
    a:nth-of-type(15) {
      width: 80px;
      height: 28px;
      top: 212px;
      left: 395px;
    }
    a:nth-of-type(16) {
      width: 80px;
      height: 28px;
      top: 216px;
      left: 552px;
    }
    a:nth-of-type(17) {
      width: 80px;
      height: 28px;
      top: 230px;
      left: 776px;
    }
    a:nth-of-type(18) {
      width: 80px;
      height: 28px;
      top: 225px;
      left: 893px;
    }
    a:nth-of-type(19) {
      width: 80px;
      height: 28px;
      top: 311px;
      left: 101px;
    }
    a:nth-of-type(20) {
      width: 96px;
      height: 28px;
      top: 292px;
      left: 429px;
    }
    a:nth-of-type(21) {
      width: 80px;
      height: 28px;
      top: 288px;
      left: 604px;
    }
    a:nth-of-type(22) {
      width: 80px;
      height: 28px;
      top: 296px;
      left: 725px;
    }
    a:nth-of-type(23) {
      width: 80px;
      height: 28px;
      top: 290px;
      left: 969px;
    }
    a:nth-of-type(24) {
      width: 141px;
      height: 39px;
      top: 418px;
      left: 52px;
    }
    a:nth-of-type(25) {
      width: 141px;
      height: 39px;
      top: 418px;
      left: 229px;
    }
    a:nth-of-type(26) {
      width: 141px;
      height: 39px;
      top: 418px;
      left: 402px;
    }
    a:nth-of-type(27) {
      width: 141px;
      height: 39px;
      top: 418px;
      left: 575px;
    }
    a:nth-of-type(28) {
      width: 146px;
      height: 39px;
      top: 418px;
      left: 746px;
    }
    a:nth-of-type(29) {
      width: 141px;
      height: 48px;
      top: 413px;
      left: 925px;
    }
    a:nth-of-type(30) {
      width: 141px;
      height: 28px;
      top: 480px;
      left: 32px;
    }
    a:nth-of-type(31) {
      width: 141px;
      height: 39px;
      top: 518px;
      left: 216px;
    }
    a:nth-of-type(32) {
      width: 141px;
      height: 39px;
      top: 518px;
      left: 395px;
    }
    a:nth-of-type(33) {
      width: 141px;
      height: 39px;
      top: 518px;
      left: 574px;
    }
    a:nth-of-type(34) {
      width: 79px;
      height: 28px;
      top: 523px;
      left: 791px;
    }
    a:nth-of-type(35) {
      width: 141px;
      height: 39px;
      top: 517px;
      left: 948px;
    }
    a:nth-of-type(36) {
      width: 127px;
      height: 25px;
      top: 73px;
      right: 171px;
      z-index: 1;
    }
    a:nth-of-type(37) {
      width: 127px;
      height: 25px;
      top: 73px;
      right: 36px;
      z-index: 1;
    }
    a:nth-of-type(38) {
      width: 127px;
      height: 25px;
      top: 106px;
      right: 171px;
      z-index: 1;
    }
    a:nth-of-type(39) {
      width: 127px;
      height: 25px;
      top: 106px;
      right: 36px;
      z-index: 1;
    }
    a:nth-of-type(40) {
      width: 127px;
      height: 25px;
      top: 139px;
      right: 171px;
      z-index: 1;
    }
    a:nth-of-type(41) {
      width: 127px;
      height: 25px;
      top: 139px;
      right: 36px;
      z-index: 1;
    }
  }
}
</style>