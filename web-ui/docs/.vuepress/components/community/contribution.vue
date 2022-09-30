<template>
  <div class="content-map">
    <div class="position"></div>
    <div class="container">
      <img v-if="!isShowH5" :src="i18n.community.CONTRIBUTION.BACKGROUND_IMG" />
      <img v-else :src="i18n.community.CONTRIBUTION.BACKGROUND_IMG_H5" :class="{ 'enTop': ($lang == 'en') }" />
      <a
        v-for="(item, index) in i18n.community.CONTRIBUTION.LINK_LIST"
        :key="index"
        :href="item"
        target="_blank"
        :class="{ enMap: ($lang == 'en') }"
      ></a>
      <a :href="'/' + $lang + '/community/contribution/detail.html'">{{
        i18n.community.CONTRIBUTION.LOOK_DESC
      }}</a>
      <a
        download="trail-chess.pdf"
        :href="i18n.community.CONTRIBUTION.DOWLOAD_PDF_URL"
        >{{ i18n.community.CONTRIBUTION.PRINT_MAP }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "contribution",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$lang);
  },
  methods: {
    go(path) {
      if (path && !path.includes("http")) {
        window.open(this.resolvePath(path));
      } else if (path.includes("http")) {
        window.open(path);
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.content-map .position {
  height: 0;
  @media screen and (max-width: 1000px) {
    height: 90px;
  }
}
.container {
  width: 1120px;
  margin: 0 auto 200px;
  position: relative;
  @media screen and (max-width: 1000px) {
    margin-bottom: 80px;
    width: 375px;
  }
  img {
    width: 1120px;
    @media screen and (max-width: 1000px) {
      padding-top: 20px;
      width: 375px;
    }
  }
  .enTop {
     @media screen and (max-width: 1000px) {
       padding: 0;
    }
  }
  a {
    cursor: pointer;
    position: absolute;
  }
  a:nth-of-type(1) {
    width: 40px;
    height: 60px;
    top: 261px;
    left: 179px;
    @media screen and (max-width: 1000px) {
      top: 224px;
      left: 112px;
    }
  }
  a:nth-of-type(2) {
    width: 40px;
    height: 60px;
    top: 261px;
    left: 239px;
    @media screen and (max-width: 1000px) {
      top: 224px;
      left: 172px;
    }
  }
  a:nth-of-type(3) {
    width: 40px;
    height: 60px;
    top: 261px;
    left: 299px;
    @media screen and (max-width: 1000px) {
      top: 224px;
      left: 232px;
    }
  }
  a:nth-of-type(4) {
    width: 40px;
    height: 60px;
    top: 261px;
    left: 359px;
    @media screen and (max-width: 1000px) {
      top: 224px;
      left: 292px;
    }
  }
  a:nth-of-type(5) {
    width: 132px;
    height: 50px;
    top: 397px;
    left: 179px;
    @media screen and (max-width: 1000px) {
      top: 360px;
      left: 112px;
    }
  }
  a:nth-of-type(6) {
    width: 76px;
    height: 50px;
    top: 397px;
    left: 321px;
    @media screen and (max-width: 1000px) {
      top: 360px;
      left: 254px;
    }
  }
  a:nth-of-type(7) {
    width: 106px;
    height: 50px;
    top: 457px;
    left: 291px;
    @media screen and (max-width: 1000px) {
      top: 420px;
      left: 224px;
    }
  }
  a:nth-of-type(8) {
    width: 102px;
    height: 50px;
    top: 457px;
    left: 179px;
    @media screen and (max-width: 1000px) {
      top: 420px;
      left: 112px;
    }
  }
  a:nth-of-type(9) {
    width: 144px;
    height: 50px;
    top: 514px;
    left: 253px;
    @media screen and (max-width: 1000px) {
      top: 475px;
      left: 186px;
    }
  }
  a:nth-of-type(10) {
    width: 218px;
    height: 50px;
    top: 634px;
    left: 179px;
    @media screen and (max-width: 1000px) {
      top: 597px;
      left: 112px;
    }
  }
  a:nth-of-type(11) {
    width: 126px;
    height: 50px;
    top: 574px;
    left: 179px;
    @media screen and (max-width: 1000px) {
      top: 537px;
      left: 112px;
    }
  }
  a:nth-of-type(12) {
    width: 210px;
    height: 24px;
    top: 869px;
    left: 90px;
    @media screen and (max-width: 1000px) {
      top: 757px;
      left: 118px;
    }
  }
  a:nth-of-type(13) {
    width: 50px;
    height: 70px;
    top: 923px;
    left: 90px;
    @media screen and (max-width: 1000px) {
      top: 811px;
      left: 118px;
    }
  }
  a:nth-of-type(14) {
    width: 50px;
    height: 70px;
    top: 923px;
    left: 150px;
    @media screen and (max-width: 1000px) {
      top: 811px;
      left: 178px;
    }
  }
  a:nth-of-type(15) {
    width: 50px;
    height: 70px;
    top: 923px;
    left: 210px;
    @media screen and (max-width: 1000px) {
      top: 811px;
      left: 238px;
    }
  }
  a:nth-of-type(16) {
    width: 70px;
    height: 90px;
    top: 903px;
    left: 591px;
    @media screen and (max-width: 1000px) {
      top: 1019px;
      left: 112px;
    }
  }
  a:nth-of-type(17) {
    width: 70px;
    height: 90px;
    top: 903px;
    left: 691px;
    @media screen and (max-width: 1000px) {
      top: 1019px;
      left: 232px;
    }
  }
  a:nth-of-type(18) {
    width: 70px;
    height: 90px;
    top: 903px;
    left: 791px;
    @media screen and (max-width: 1000px) {
      top: 1115px;
      left: 112px;
    }
  }
  a:nth-of-type(19) {
    width: 70px;
    height: 90px;
    top: 903px;
    left: 891px;
    @media screen and (max-width: 1000px) {
      top: 1115px;
      left: 232px;
    }
  }
  a:nth-of-type(20) {
    width: 60px;
    height: 80px;
    top: 747px;
    left: 791px;
    @media screen and (max-width: 1000px) {
      top: 1337px;
      left: 114px;
    }
  }
  a:nth-of-type(21) {
    width: 60px;
    height: 80px;
    top: 747px;
    left: 892px;
    @media screen and (max-width: 1000px) {
      top: 1337px;
      left: 234px;
    }
  }
  a:nth-of-type(22) {
    width: 80px;
    height: 28px;
    top: 580px;
    left: 627px;
    @media screen and (max-width: 1000px) {
      top: 1549px;
      left: 144px;
    }
  }
  a:nth-of-type(23) {
    width: 80px;
    height: 28px;
    top: 627px;
    left: 627px;
    @media screen and (max-width: 1000px) {
      top: 1599px;
      left: 270px;
    }
  }
  a:nth-of-type(24) {
    width: 80px;
    height: 28px;
    top: 667px;
    left: 627px;
    @media screen and (max-width: 1000px) {
      top: 1682px;
      left: 148px;
    }
  }
  a:nth-of-type(25) {
    width: 80px;
    height: 28px;
    top: 587px;
    left: 763px;
    @media screen and (max-width: 1000px) {
      top: 1550px;
      left: 266px;
    }
  }
  a:nth-of-type(26) {
    width: 80px;
    height: 28px;
    top: 627px;
    left: 763px;
    @media screen and (max-width: 1000px) {
      top: 1640px;
      left: 148px;
    }
  }
  a:nth-of-type(27) {
    width: 80px;
    height: 28px;
    top: 667px;
    left: 763px;
    @media screen and (max-width: 1000px) {
      top: 1683px;
      left: 270px;
    }
  }
  a:nth-of-type(28) {
    width: 80px;
    height: 28px;
    top: 586px;
    left: 909px;
    @media screen and (max-width: 1000px) {
      top: 1591px;
      left: 148px;
    }
  }
  a:nth-of-type(29) {
    width: 80px;
    height: 28px;
    top: 627px;
    left: 909px;
    @media screen and (max-width: 1000px) {
      top: 1634px;
      left: 270px;
    }
  }
  a:nth-of-type(30) {
    width: 80px;
    height: 28px;
    top: 667px;
    left: 909px;
    @media screen and (max-width: 1000px) {
      top: 1717px;
      left: 148px;
    }
  }
  a:nth-of-type(31) {
    width: 84px;
    height: 16px;
    top: 161px;
    left: 700px;
    @media screen and (max-width: 1000px) {
      top: 1836px;
      left: 112px;
    }
  }
  a:nth-of-type(32) {
    width: 84px;
    height: 16px;
    top: 259px;
    left: 700px;
    @media screen and (max-width: 1000px) {
      top: 1934px;
      left: 112px;
    }
  }
  a:nth-of-type(33) {
    cursor: pointer;
    width: 100px;
    height: 30px;
    top: 22px;
    left: 888px;
    background-color: #fff;
    color: #002fa7;
    border: 1px solid #002da7;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    border-radius: 1px;
    text-decoration: none;
    @media screen and (max-width: 1000px) {
      top: -46px;
      left: 30px;
    }
  }
  a:nth-of-type(34) {
    cursor: pointer;
    width: 100px;
    height: 30px;
    top: 22px;
    left: 998px;
    background-color: #fff;
    color: #002fa7;
    border: 1px solid #002da7;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    border-radius: 1px;
    text-decoration: none;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .enMap:nth-of-type(1) {
    width: 40px;
    height: 60px;
    top: 240px;
    left: 170px;
    @media screen and (max-width: 1000px) {
      top: 197px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(2) {
    width: 40px;
    height: 60px;
    top: 240px;
    left: 237px;
    @media screen and (max-width: 1000px) {
      top: 197px;
      left: 172px;
    }
  }
  .enMap:nth-of-type(3) {
    width: 40px;
    height: 60px;
    top: 240px;
    left: 301px;
    @media screen and (max-width: 1000px) {
      top: 197px;
      left: 232px;
    }
  }
  .enMap:nth-of-type(4) {
    width: 40px;
    height: 60px;
    top: 240px;
    left: 360px;
    @media screen and (max-width: 1000px) {
      top: 197px;
      left: 290px;
    }
  }
  .enMap:nth-of-type(5) {
    width: 240px;
    height: 48px;
    top: 366px;
    left: 167px;
    @media screen and (max-width: 1000px) {
      width: 218px;
      height: 41px;
      top: 332px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(6) {
    width: 116px;
    height: 48px;
    top: 420px;
    left: 167px;
    @media screen and (max-width: 1000px) {
      width: 90px;
      height: 46px;
      top: 380px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(7) {
    width: 118px;
    height: 48px;
    top: 420px;
    left: 289px;
    @media screen and (max-width: 1000px) {
      width: 121px;
      height: 46px;
      top: 380px;
      left: 208px;
    }
  }
  .enMap:nth-of-type(8) {
    width: 240px;
    height: 48px;
    top: 474px;
    left: 167px;
    @media screen and (max-width: 1000px) {
      width: 218px;
      height: 41px;
      top: 431px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(9) {
    width: 240px;
    height: 48px;
    top: 528px;
    left: 167px;
    @media screen and (max-width: 1000px) {
      width: 218px;
      height: 41px;
      top: 483px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(10) {
    width: 240px;
    height: 60px;
    top: 636px;
    left: 167px;
    @media screen and (max-width: 1000px) {
      width: 218px;
      height: 57px;
      top: 585px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(11) {
    width: 240px;
    height: 48px;
    top: 582px;
    left: 167px;
    @media screen and (max-width: 1000px) {
      width: 218px;
      height: 41px;
      top: 534px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(12) {
    width: 260px;
    height: 24px;
    top: 878px;
    left: 72px;
    @media screen and (max-width: 1000px) {
      width: 210px;
      height: 24px;
      top: 752px;
      left: 116px;
    }
  }
  .enMap:nth-of-type(13) {
    width: 72px;
    height: 45px;
    top: 936px;
    left: 72px;
    @media screen and (max-width: 1000px) {
      width: 60px;
      top: 807px;
      left: 116px;
    }
  }
  .enMap:nth-of-type(14) {
    width: 82px;
    height: 45px;
    top: 936px;
    left: 161px;
    @media screen and (max-width: 1000px) {
      width: 67px;
      top: 807px;
      left: 191px;
    }
  }
  .enMap:nth-of-type(15) {
    width: 71px;
    height: 45px;
    top: 936px;
    left: 256px;
    @media screen and (max-width: 1000px) {
      width: 60px;
      top: 807px;
      left: 272px;
    }
  }
  .enMap:nth-of-type(16) {
    width: 64px;
    height: 80px;
    top: 892px;
    left: 599px;
    @media screen and (max-width: 1000px) {
      top: 1010px;
      left: 127px;
    }
  }
  .enMap:nth-of-type(17) {
    width: 64px;
    height: 80px;
    top: 892px;
    left: 709px;
    @media screen and (max-width: 1000px) {
      top: 1010px;
      left: 252px;
    }
  }
  .enMap:nth-of-type(18) {
    width: 64px;
    height: 80px;
    top: 892px;
    left: 824px;
    @media screen and (max-width: 1000px) {
      top: 1095px;
      left: 127px;
    }
  }
  .enMap:nth-of-type(19) {
    width: 64px;
    height: 80px;
    top: 892px;
    left: 939px;
    @media screen and (max-width: 1000px) {
      top: 1095px;
      left: 252px;
    }
  }
  .enMap:nth-of-type(20) {
    width: 60px;
    height: 85px;
    top: 730px;
    left: 855px;
    @media screen and (max-width: 1000px) {
      top: 1319px;
      left: 127px;
    }
  }
  .enMap:nth-of-type(21) {
    width: 60px;
    height: 85px;
    top: 730px;
    left: 941px;
    @media screen and (max-width: 1000px) {
      top: 1319px;
      left: 252px;
    }
  }
  .enMap:nth-of-type(22) {
    width: 135px;
    height: 24px;
    top: 573px;
    left: 593px;
    @media screen and (max-width: 1000px) {
      width: 130px;
      height: 14px;
      top: 1530px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(23) {
    width: 89px;
    height: 16px;
    top: 574px;
    left: 739px;
    @media screen and (max-width: 1000px) {
      width: 86px;
      height: 16px;
      top: 1530px;
      left: 251px;
    }
  }
  .enMap:nth-of-type(24) {
    width: 109px;
    height: 18px;
    top: 613px;
    left: 894px;
    @media screen and (max-width: 1000px) {
      width: 104px;
      height: 14px;
      left: 195px;
      top: 1609px;
    }
  }
  .enMap:nth-of-type(25) {
    width: 187px;
    height: 18px;
    top: 613px;
    left: 594px;
    @media screen and (max-width: 1000px) {
      width: 183px;
      height: 14px;
      left: 112px;
      top: 1580px;
    }
  }
  .enMap:nth-of-type(26) {
    width: 75px;
    height: 18px;
    top: 613px;
    left: 805px;
    @media screen and (max-width: 1000px) {
      width: 70px;
      height: 14px;
      left: 112px;
      top: 1609px;
    }
  }
  .enMap:nth-of-type(27) {
    width: 43px;
    height: 17px;
    top: 657px;
    left: 774px;
    @media screen and (max-width: 1000px) {
      width: 36px;
      height: 14px;
      left: 112px;
      top: 1660px;
    }
  }
  .enMap:nth-of-type(28) {
    width: 159px;
    height: 18px;
    top: 655px;
    left: 594px;
    @media screen and (max-width: 1000px) {
      width: 156;
      height: 14px;
      top: 1633px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(29) {
    width: 176px;
    height: 18px;
    top: 573px;
    left: 837px;
    @media screen and (max-width: 1000px) {
      width: 172px;
      height: 14px;
      left: 112px;
      top: 1555px;
    }
  }
  .enMap:nth-of-type(30) {
    width: 168px;
    height: 18px;
    top: 656px;
    left: 839px;
    @media screen and (max-width: 1000px) {
      width: 166px;
      height: 14px;
      left: 161px;
      top: 1660px;
    }
  }
  .enMap:nth-of-type(31) {
    width: 104px;
    height: 14px;
    top: 160px;
    left: 704px;
    @media screen and (max-width: 1000px) {
        width: 96px;
        height: 16px;
      top: 1793px;
      left: 112px;
    }
  }
  .enMap:nth-of-type(32) {
    width: 124px;
    height: 14px;
    top: 254px;
    left: 698px;
    @media screen and (max-width: 1000px) {
         width: 115px;
        height: 16px;
      top: 1900px;
      left: 112px;
    }
  }
}
</style>