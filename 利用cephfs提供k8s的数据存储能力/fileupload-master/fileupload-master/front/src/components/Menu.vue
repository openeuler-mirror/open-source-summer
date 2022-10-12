<template>
<!-- 这是一个左边导航栏的样式 -->
    <div id="menu">
        <!-- 使用的el-menu组件 -->
        <el-menu
            default-active="file"
            class="el-menu-vertical-demo"
            @select="changePath"
            background-color="rgb(99 124 150)"
            text-color="rgb(202 202 202)"
            active-text-color="#fff">
            <el-menu-item index="file">
                <i class="el-icon-user-solid"></i>
                <span slot="title">文件上传</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
// 组件函数内容
export default {
    // 名称
    name: 'MyMenu',
    // vue组件变量
    data(){
        return{
        }
    },
    // 组件生成时
    mounted () {
    },
    // 计算属性（也是一个变量）
    computed:{
    },
    watch:{
    },
    methods:{
        // 路由跳转函数，由this.$router.push()触发，根据 路由名称 跳转，与el-menu中的@select绑定，这是一个事件冒泡机制，可以先不了解
        changePath (index) {
            this.$router.push({name:index})
        },
    }
}
</script>

<style lang="scss">

</style>