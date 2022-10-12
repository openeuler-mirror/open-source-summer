import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementUI及其样式,所有el-***,组件均来自此处引入,是一个第三方的组件库
// https://element.eleme.cn/#/zh-CN/component/date-picker elmentUI文档
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入接口文件
import api from '@/api/index'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$message = ElementUI.Message
// 将接口文件绑定在vue实例的原型变量$api上,这样每个组件都可以使用this.$api去直接调用对应的接口函数,因为被继承了
Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
