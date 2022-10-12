/**
 * 这一文件的内容基本为项目创建时生成的，需要关心的是引入所需要引入的组件，然后配置路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入视图组件
import FileUpload from '../views/FileUpload.vue'

Vue.use(VueRouter)

// 这个路由数组的每个对象，都是一条路由
const routes = [
  /**
   * path: '/', 表示默认路径
   * name: '' 路由名称自己写，根据业务需要判断当前路由时可能会用到
   * component: 这个路由对应的组件
   * meta 一般习惯用这个放一些自己设置这个路由的熟悉，如这个组件路由的名称，用于我面包屑导航栏显示当前位置
   * 
   * 路由与组件我另外写一个markdown解释一下，纯文字太干燥了
   */
  {
    path: '/',
    name: 'file',
    component: FileUpload,
    meta: { withMenu: true, title: '文件上传下载' }
  }
]

const router = new VueRouter({
  routes
})

export default router
