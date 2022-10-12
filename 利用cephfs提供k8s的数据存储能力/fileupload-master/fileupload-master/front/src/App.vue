<template>
  <div id="app">
    <!-- 根据路由属性meta中的withMenu值,下边显示什么内容 -->
    <div class="main" v-if="route.meta.withMenu === true">
      <!-- 左侧导航栏组件 -->
      <MyMenu />
      <div class="container">
        <!-- 右侧顶部 -->
        <div class="container-header">
          <!-- 面包屑导航栏 -->
          <MyhBreadcrumb></MyhBreadcrumb>
        </div>
        <div class="container-body">
          <!-- 子路由视图 -->
          <router-view/>
        </div>
      </div>
    </div>
    <div class="main" v-else>
      <div class="non-menu-container">
        <!-- 子路由视图 -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// 引入左侧导航栏和面包屑导航栏
import MyMenu from '@/components/Menu.vue'
import MyhBreadcrumb from '@/components/MyBreadcrumb.vue'
export default {
  components: {
    MyMenu,
    MyhBreadcrumb
  },
  data () {
    return {}
  },
  computed: {
    // 将当前路由绑定在route这个计算属性中
    route () {
      console.log(this.$route)
      return this.$route
    }
  }
}
</script>

<style lang="scss" src="@/scss/index.scss">
</style>
