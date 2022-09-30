<template>
  <div class="scheme-box">
    <div class="scheme">
      <h1 class="one-h">{{ scheme.TITLE }}</h1>
      <h2 class="two-h" id="h2-title-one">{{ scheme.TITLE_ONE }}</h2>
      <p class="content">{{ scheme.ONE_P1 }}</p>
      <p class="content" v-for="item in scheme.ONE_QUESTION" :key="item">
        {{ item }}
      </p>
      <div class="margin30"></div>
      <p class="content">{{ scheme.ONE_P2 }}</p>
      <div class="img-box">
        <img class="img" :src="scheme.ONE_PROCESS_IMG" alt="" />
      </div>
      <p class="content" v-for="item in scheme.ONE_ANSWER" :key="item">
        {{ item }}
      </p>
      <p class="content">{{ scheme.ONE_P3 }}</p>
      <div class="margin30"></div>

      <h2 class="two-h" id="h2-title-two">{{ scheme.TITLE_TWO }}</h2>
      <p class="content">{{ scheme.TWO_P1 }}</p>
      <div class="img-box">
        <img class="img" :src="scheme.TWO_SCHEME_IMG" alt="" />
      </div>
      <p class="content" v-for="item in scheme.TWO_SCHEME" :key="item">
        {{ item }}
      </p>

      <h2 class="two-h" id="h2-title-three">{{ scheme.TITLE_THREE }}</h2>
      <h3 class="three-h">{{ scheme.TITLE_THREE_ONE }}</h3>
      <p class="content">{{ scheme.THREE_ONE_P1 }}</p>
      <div v-for="item in scheme.THREE_ONE_LIST" :key="item.title">
        <p class="content">{{ item.title }}</p>
        <p class="content" v-for="content in item.content" :key="content">
          {{ content }}
        </p>
      </div>
      <p class="content">{{ scheme.THREE_ONE_P2 }}</p>
      <ul class="scheme-ul" v-for="item in scheme.THREE_ONE_GROUP" :key="item">
        <li>{{ item }}</li>
      </ul>
      <p class="content">{{ scheme.THREE_ONE_P3 }}</p>
      <p class="content">{{ scheme.THREE_ONE_P4 }}</p>

      <h3 class="three-h">{{ scheme.TITLE_THREE_TWO }}</h3>
      <p class="content">
        {{ scheme.THREE_TWO_P1 }}
        <a
          class="scheme-a"
          target="_Blank"
          href="https://www.openeuler.org/zh/compatibility/hardware/"
          >{{ scheme.THREE_TWO_A1 }}</a
        >
        {{ scheme.THREE_TWO_P2 }}
        <a
          class="scheme-a"
          target="_Blank"
          href="https://www.openeuler.org/zh/compatibility/"
          >{{ scheme.THREE_TWO_A2 }}</a
        >
      </p>
      <h3 class="three-h">{{ scheme.TITLE_THREE_THREE }}</h3>
      <p class="content">
        {{ scheme.THREE_THREE_P1 }}
        <a
          class="scheme-a"
          target="_Blank"
          href="https://gitee.com/openeuler/oec-application/blob/master/doc/openEuler%E7%A4%BE%E5%8C%BA%E5%BC%80%E6%BA%90%E8%BD%AF%E4%BB%B6%E9%80%82%E9%85%8D%E6%B5%81%E7%A8%8B.md"
          >{{ scheme.THREE_THREE_A1 }}</a
        >
        {{ scheme.THREE_THREE_P2 }}
        <a
          class="scheme-a"
          target="_Blank"
          href="https://www.openeuler.org/zh/compatibility/"
          >{{ scheme.THREE_THREE_A2 }}</a
        >
      </p>
      <h3 class="three-h">{{ scheme.TITLE_THREE_FOUR }}</h3>
      <p class="content">
        {{ scheme.THREE_FOUR_P1 }}
        <a
          class="scheme-a"
          target="_Blank"
          href="https://gitee.com/openeuler/oecp"
          >{{ scheme.THREE_FOUR_A1 }}</a
        >
        {{ scheme.THREE_FOUR_P2 }}
      </p>
      <h2 class="two-h" id="h2-title-four">{{ scheme.TITLE_FOUR }}</h2>
      <h3 class="three-h">{{ scheme.TITLE_FOUR_ONE }}</h3>
      <p class="content">
        {{ scheme.FOUR_ONE_P1 }}
        <b>{{ scheme.FOUR_ONE_A1 }}</b>
        {{ scheme.FOUR_ONE_P2 }}
      </p>
      <p class="content">{{ scheme.FOUR_ONE_P3 }}</p>
      <h3 class="three-h">{{ scheme.TITLE_FOUR_TWO }}</h3>
      <p class="content">
        {{ scheme.FOUR_ONE_P1 }}
        <b>{{ scheme.FOUR_ONE_A1 }}</b>
        {{ scheme.FOUR_TWO_P2 }}
      </p>
      <h3 class="three-h">{{ scheme.TITLE_FOUR_THREE }}</h3>
      <p class="content">{{ scheme.FOUR_THREE_P1 }}</p>

      <h2 class="two-h" id="h2-title-five">{{ scheme.TITLE_FIVE }}</h2>
      <p class="content">{{ scheme.FIVE_P1 }}</p>
      <h3 class="three-h">{{ scheme.TITLE_FIVE_ONE }}</h3>
      <p class="content">
        {{ scheme.FIVE_ONE_P1 }}
        <b>{{ scheme.FOUR_ONE_A1 }}</b>
        {{ scheme.FIVE_ONE_P2 }}
      </p>
      <h3 class="three-h">{{ scheme.TITLE_FIVE_TWO }}</h3>
      <p class="content">{{ scheme.FIVE_TWO_P1 }}</p>
      <h3 class="three-h">{{ scheme.TITLE_FIVE_THREE }}</h3>
      <p class="content">
        {{ scheme.FIVE_THREE_P1 }}
        <a
          class="scheme-a"
          target="_Blank"
          href="https://www.openeuler.org/zh/compatibility/hardware/"
          >{{ scheme.FIVE_THREE_A1 }}</a
        >
        {{ scheme.FIVE_THREE_P2 }}
      </p>
      <h3 class="three-h">{{ scheme.TITLE_FIVE_FOUR }}</h3>
      <p class="content">
        {{ scheme.FIVE_FOUR_P1 }}
        <b>{{ scheme.FOUR_ONE_A1 }}</b>
        {{ scheme.FIVE_FOUR_P2 }}
      </p>

      <h2 class="two-h" id="h2-title-six">{{ scheme.TITLE_SIX }}</h2>
      <p class="content">{{ scheme.SIX_P1 }}</p>
      <div v-for="(item, index) in scheme.SIX_LIST" :key="index">
        <h3 class="three-h">{{ item.title }}</h3>
        <p class="content">{{ item.content }}</p>
      </div>

      <h2 class="two-h" id="h2-title-seven">{{ scheme.TITLE_SEVNE }}</h2>
      <p class="content">{{ scheme.SEVEN_P1 }}</p>
      <div class="img-box">
        <img class="img" :src="scheme.SEVEN_TUNING_IMG" alt="" />
      </div>
      <p class="content">
        详见项目<a :href="scheme.SEVEN_P2_URL">链接</a>，{{ scheme.SEVEN_P2 }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["scheme"],
};
</script>

<style lang="less" scoped>
.scheme-box {
  width: 100%;
  overflow: hidden;
  .scheme {
    width: 1120px;
    margin: 0 auto;
    .one-h {
      margin: 40px 0 40px;
    }
    .two-h {
      margin: 20px 0;
    }
    .three-h {
      margin: 20px 0;
    }
    .content {
      font-size: 14px;
      color: #4d4d4d;
      line-height: 32px;
    }
    .margin30 {
      margin-bottom: 30px;
    }
    .img-box {
      margin: 10px 0;
      text-align: center;
      img {
        max-width: 100%;
      }
    }
    .scheme-ul {
      li {
        font-size: 14px;
        color: #4d4d4d;
        line-height: 32px;
      }
    }
    .scheme-a {
      color: #002fa7;
      text-decoration: none;
    }
  }
  @media screen and (max-width: 1120px) {
    .scheme {
      width: 100%;
      padding: 0 10px;
      margin: 0 auto;
    }
  }
}
</style>
