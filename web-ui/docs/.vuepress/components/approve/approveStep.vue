<template>
  <div class="approve-step">
    <div class="banner">
      <div class="breadcrumb" @click="toApprove">
        {{ i18n.approve.TITLE }} \
      </div>
      <div class="banner-title">
        {{ i18n.approve.STEP_HEAD }}
      </div>
    </div>
    <div class="approve-content">
      <div class="approve-middle">
        <div class="title">{{ i18n.approve.STEP_TITLE }}</div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[0].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[0].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[0].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[0].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[0].LINK_1 }} </a
              >。
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[1].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[1].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[1].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[1].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[1].LINK_1 }} </a
              >。
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[2].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[2].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[2].TEXT_1 }}
              <a :href="'mailto:' + i18n.approve.STEP_CONTENT[2].LINK_1">
                {{ i18n.approve.STEP_CONTENT[2].LINK_1 }}
              </a>
              {{ i18n.approve.STEP_CONTENT[2].TEXT_2 }}
              <p>
                {{ i18n.approve.STEP_CONTENT[2].TEXT_3 }}
                <a :href="i18n.approve.STEP_CONTENT[2].LINK_2" target="_blank">
                  {{ i18n.approve.STEP_CONTENT[2].LINK_2 }}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[3].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[3].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[3].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[3].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[3].LINK_1 }}
              </a>
              {{ i18n.approve.STEP_CONTENT[3].TEXT_2 }}
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[4].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[4].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[4].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[4].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[4].LINK_TEXT }}
              </a>
              {{ i18n.approve.STEP_CONTENT[4].TEXT_2 }}
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[5].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[5].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[5].TEXT_1 }}
            </div>
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

    };
  },

  methods: {
    //跳转osv认证列表页
    toApprove() {
      this.$router.push({
        path: this.resolvePath("/approve/"),
      });
    },
  },
};
</script>

<style lang="less" scoped>
.approve-step {
  .banner {
    width: 1120px;
    margin: 0 auto;
    .breadcrumb {
      margin-top: 34px;
      margin-bottom: 16px;
      font-size: 20px;
      color: #002fa7;
      line-height: 30px;
      cursor: pointer;
    }
    .banner-title {
      font-size: 36px;
      line-height: 46px;
      margin-bottom: 104px;
      color: #000;
    }
  }
  .approve-content {
    width: 1120px;
    margin: 0 auto 200px;
  }
  .approve-middle {
    margin: 40px 0 0;
    .title {
      font-size: 24px;
      color: #000;
      margin-bottom: 20px;
      line-height: 34px;
    }
    .content-item {
      display: flex;
      padding: 30px;
      align-items: center;
      justify-content: left;
      .left {
        font-size: 48px;
        color: #002fa7;
        padding-right: 30px;
      }
      .right {
        padding-left: 30px;
        border-left: 1px solid rgba(0, 0, 0, 0.15);
        .item-title {
          color: rgba(0, 0, 0, 1);
          font-size: 20px;
          line-height: 30px;
          margin-bottom: 10px;
        }
        .item-content {
          font-size: 16px;
          line-height: 26px;
          color: rgba(0, 0, 0, 0.5);
          a {
            text-decoration: none;
            color: #002fa7;
            cursor: pointer;
          }
        }
      }
    }
  }
}

@media (max-width: 1000px) {
  .approve-step {
    .banner {
      width: 100%;
      padding-left: 30px;
      padding-right: 30px;
      .breadcrumb {
        display: none;
      }
      .banner-title {
        width: 100%;
        font-size: 24px;
        margin: 40px 0 30px 0;
      }
    }
    .approve-content {
      width: 100%;
      padding-left: 30px;
      padding-right: 30px;
      margin-bottom: 80px;
      font-size: 14px;
      line-height: 24px;
    }
    .approve-middle {
      .title {
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
      }
      .content-item {
        padding: 15px 0;
        .left {
          font-size: 36px;
          padding-right: 15px;
        }
        .right {
          padding-left: 15px;
          border-left: 1px solid rgba(0, 0, 0, 0.15);
          .item-title {
            color: rgba(0, 0, 0, 1);
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 10px;
          }
          .item-content {
            font-size: 14px;
            line-height: 24px;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
}
</style>
