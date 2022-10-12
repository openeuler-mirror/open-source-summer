<template>
  <div class="footer-wrapper">
    <div class="atom">
      <p>{{ i18n.common.FOOTER.ATOM_TEXT }}</p>
      <img
        :src="i18n.common.FOOTER.ATOM_PC"
        alt=""
        class="atom-pc"
        v-if="!isShowH5"
      />
      <img :src="i18n.common.FOOTER.ATOM_MO" alt="" class="atom-mo" v-else />
    </div>
    <div class="footer-content">
      <div class="footer-left">
        <img src="/footer-logo2.svg" class="footer-logo" />
        <div class="footer-mail">{{ i18n.common.FOOTER.MAIL }}</div>
      </div>
      <div class="footer-center">
        <ul class="right-list">
          <li
            v-for="(item, index) in i18n.common.FOOTER.RIGHT_LIST"
            :key="index"
          >
            <a @click="goFooterUrl(item.URL)">{{ item.NAME }}</a>
          </li>
        </ul>
        <p class="footer-copyright">
          {{ i18n.common.FOOTER.COPY_RIGHT }}
        </p>
      </div>
      <div class="footer-right">
        <img src="/qrcode.png" class="footer-qrcode" />
        <div class="qrcode-desc">{{ i18n.common.FOOTER.QR_CODE }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      close:false,
      i18n: this.i18n || {
        common: {
          FOOTER: {},
        },
      },
    };
  },
  methods: {
    newWindow(url) {
      window.open(this.resolvePath(url))
    },
    closeQR() {
      this.close = true;
    },
    goFooterUrl(url) {
      if (url.includes("https")) {
        window.open(url)
      } else {
        this.$router.push({
          path: this.resolvePath(url),
        });
      }
    },
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.qr-code {
  position: fixed;
  cursor: pointer;
  width: 210px;
  left: 100px;
  bottom: 160px;
  z-index: 99;
  img {
    width: 100%;
  }
  .close {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
  }
   @media screen and (max-width: 1000px) {
    left: 30px;
    width: 140px;
    bottom: 80px;
  }
}
.none {
  display: none;
}
.footer-wrapper {
  position: relative;
  height: 530px;
  background-color: #111;
  @media screen and (max-width: 1000px) {
    height: 508px;
  }
  .atom {
    height: 330px;
    text-align: center;
    overflow: hidden;
    img {
      width: 380px;
      height: 81px;
    }
    p {
      margin: 88px 0 50px 0;
      color: #fff;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 1000px) {
    .atom {
      padding: 0 50px;
      height: 180px;
      img {
        width: 191px;
        height: 41px;
      }
      p {
        font-size: 12px;
        margin: 40px 0 20px 0;
      }
    }
  }
  .footer-content {
    margin: 0 auto;
    height: 200px;
    width: 1120px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
     height: 328px;
      flex-direction: column;
      align-items: center;
      width: 100%;
      justify-content: space-evenly;
    }
    .footer-left {
      @media screen and (max-width: 1000px) {
        height: unset;
        font-size: 14px;
        align-items: center;
      }
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: baseline;
      font-size: 16px;
      .footer-mail {
        color: #fff;
        margin-top: 17px;
        @media screen and (max-width: 1000px) {
          margin-top: 10px;
        }
      }
    }
    .footer-center {
      @media screen and (max-width: 1000px) {
        align-items: unset;
        height: unset;
        order: 1;
      }
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      .footer-copyright {
        width: 100%;
        text-align: center;
        color: #fff;
        margin-top: 21px;
        font-size: 12px;
        @media screen and (max-width: 1000px) {
          margin-top: 16px;
        }
      }
      .right-list {
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        // align-items: flex-end;
        font-size: 14px;
        li {
          padding: 0 10px;
           border-left: 1px solid #fff;
          a {
            color: #fff;
            text-decoration: none;
            cursor: pointer;
          }
        }
        li:first-child {
          border-left: none;
        }
      }
    }
    .footer-right {
      @media screen and (max-width: 1000px) {
        height: unset;
      }
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      .footer-qrcode {
        width: 78px;
        height: 78px;
      }
      .qrcode-desc {
        color: #fff;
        margin-top: 17px;
        text-align: center;
      }
    }
  }
}
@media screen and (min-width: 1000px) and (max-width: 1120px) {
  .footer-content {
    width: 100% !important;
  }
}
</style>
