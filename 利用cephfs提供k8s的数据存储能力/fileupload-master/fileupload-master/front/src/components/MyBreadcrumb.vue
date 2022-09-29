<!--面包屑-->
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in lists" :key="item.path">
            <router-link :to="item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
 
<script>
// 这个组件已经封装好了，可以不管，业务改动不影响这个
    export default {
        name: "MyhBreadcrumb",
        data(){
            return{
                lists:[]
            }
        },
        created() {
            // 根据路由，生成当前路由的路径列表
          this.lists = this.$route.matched
        },
        watch:{
            $route(to)  {
                this.lists = to.matched
            }
        },
    }
</script>
 