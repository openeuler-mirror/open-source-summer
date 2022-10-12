<!-- 建设中页面 -->
<template>
  <div class="building">
        <mesbanner
        :outsideName="i18n.common.BUILDING.BUILDING"
        :pcSrc="'/img/building/building-banner.png'"
        :mobileSrc="'/img/building/building-banner.png'"
        :isOther="true"
        :pcMessage="i18n.common.BUILDING.BUILDINGMES"
        :mobileMessage="i18n.common.BUILDING.BUILDINGMES"
        ></mesbanner>
  </div>
</template>

<script>
import mesbanner from './../common/mesbanner'
export default {
  data () {
    return {
    }
  },
  components: {
      mesbanner
  }
}

</script>

<style lang='less'>
.building{
    margin-bottom: 200px;
    @media screen and (max-width: 1000px) {
        margin-bottom: 80px;
    }
}
</style>
