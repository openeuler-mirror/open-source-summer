<template>
    <div class="theme-container">
        <mesbanner class="not-found-top"
        :outsideName="currentLang.title"
        :pcSrc="'/img/404/404-banner.png'"
        :mobileSrc="'/img/404/404-banner.png'"
        :isOther="true"
        :pcMessage="''"
        :mobileMessage="''"
        >
        </mesbanner>
    </div>
</template>

<script>
import mesbanner from './../../components/common/mesbanner';
export default {
    data () {
        return {
            language:{
                en:{
                    title:404
                },
                cn:{
                    title:404
                }
            },
            currentLang:{}
        }
    },
    components: {
        mesbanner
    },
    created () {
        this.currentLang = this.language.cn;
    },
  methods: {
  },
  watch: {
      '$route.path': {
          immediate: true,
          handler (val) {
              if(val === '/') {
                  window.location.href = '/zh/';
              }
          }
      }
  }
}
</script>

<style lang="less" scoped>
.not-found-top{
    margin-bottom: 200px;
    @media (max-width: 1000px) {
        margin-bottom: 80px;
    }
}
</style>
