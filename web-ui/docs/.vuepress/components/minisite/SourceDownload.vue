<template>
  <div id="sourceDownload">
    <h1 class="source-download-title">
      {{ i18n.minisite.MIGRATION_SOURCE_DOWNLOAD.TITLE }}
    </h1>
    <div class="source-download">
      <div
        class="source-download-item"
        v-for="(item, index) in i18n.minisite.MIGRATION_SOURCE_DOWNLOAD.SOURCES"
        :key="index"
      >
        <div class="source-download-name">{{ item.NAME }}</div>
        <div class="describe">{{ item.DESCRIBE }}</div>
        <div class="describe-detail">{{ item.DESCRIBE_DETAIL }}</div>
        <div class="source-download-version">
          <span class="label">版本信息</span>
          <span class="value">{{ item.VERSION }}</span>
        </div>
        <div class="source-download-link">
          <span class="label">{{ item.LINK_TITLE }}</span>
          <template v-for="(i, index) in item.LINKS">
            <a :key="index" :href="i.LINK" target="_blank">{{ i.NAME }}</a>
          </template>

          <span class="label document-file">文档</span>
          <a :href="item.DOCUMENT_LINK" target="_blank"
            >{{ item.NAME }}使用指南</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#sourceDownload {
  margin-top: 30px;
  background-image: url("/img/minisite/migration/source-download.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  .source-download-title {
    text-align: center;
    font-size: 32px;
    color: #fff;
    letter-spacing: 0;
    line-height: 32px;
    font-weight: 400;
    padding-top: 30px;
    margin-bottom: 30px;
  }
  .source-download {
    display: flex;
    width: 1120px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-between;
    @media screen and (max-width: 1120px) {
      width: 100%;
      padding: 0 80px;
    }
    &-item {
      width: calc(50% - 15px);
      min-height: 100px;
      margin-bottom: 30px;
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: 5px 5px 10px rgba(150, 150, 150, 0.5);
      padding: 20px;
      @media screen and (max-width: 750px) {
        width: 100%;
      }
      .label.document-file {
        padding-left: 10%;
      }
      .label {
        font-size: 14px;
        color: #555;
        padding-right: 24px;
      }
      .value {
        font-size: 14px;
        color: #000;
      }
      .source-download-name {
        font-size: 24px;
        color: #000000;
        letter-spacing: 0;
        line-height: 32px;
        font-weight: 400;
        margin-bottom: 20px;
      }
      .describe {
        font-size: 16px;
        height: 64px;
        line-height: 32px;
        @media screen and (max-width: 750px) {
          height: auto;
        }
      }
      .describe,
      .describe-detail {
        color: rgba(0, 0, 0, 0.7);
        letter-spacing: 0;
        // color: #555;
      }
      .describe-detail {
        height: 120px;
        font-size: 14px;
        line-height: 22px;
        @media screen and (max-width: 1120px) {
          height: 150px;
        }
        @media screen and (max-width: 800px) {
          height: 240px;
        }
        @media screen and (max-width: 750px) {
          height: auto;
        }
      }
      .source-download-link {
        margin-top: 16px;
        a {
          text-decoration: none;
          color: #022ea7;
          font-size: 14px;
        }
        a + a {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
