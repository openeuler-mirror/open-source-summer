<template>
    <div class="search" v-loading.fullscreen="loading">
        <div class="search-banner">
            <h2>{{i18n.search.SEARCH}}</h2>
            <img src="/img/other/search/search.png" alt="">
            <div class="search-area-mobile">
                <el-input
                        :placeholder="i18n.common.SEARCH_PLACE_HOLDER"
                    v-model="formData.keyword">
                <i slot="suffix" class="icon-search" @click="search"></i>
                </el-input>
            </div>
            <div class="search-area">
                <el-input
                        :placeholder="i18n.common.SEARCH_PLACE_HOLDER"
                        v-model="formData.keyword"
                        @keyup.enter.native="search">
                    <i slot="suffix" @click="search"><img src="/img/other/search/search-icon.svg" alt=""></i>
                </el-input>
            </div>
        </div>
        <div class="search-tag">
            <div class="tag-title">
                <ul>
                    <li v-for="item in tagTitle" :class="{'active': curKey==item.key}" :key="item.key" @click="curKey = item.key">
                        {{i18n.search.TAG_NAME[item.key.toUpperCase()]}}
                        <span>（{{item.doc_count}}）</span>
                    </li>
                </ul>
            </div>
            <div class="tag-content">
                <div class="tag-left">
                    <div class="tags-info" v-for="item in allDatas">
                        <h3 v-html="item.title" @click="goDetail(item)"></h3>
                        <p v-html="item.textContent"></p>
                        <p class="articla-from"><span>{{ i18n.search.TAG_NAME.FROM }}：</span><span class="artical-tag">{{i18n.search.TAG_NAME[item.type.toUpperCase()]}} <span v-if="item.type === 'docs'">{{item.version}}</span></span></p>
                    </div>
                </div>
                <div class="tag-right">
                    <h4>{{i18n.search.REPO}}</h4>
                    <el-scrollbar class="scrollbar">
                        <div class="package" v-for="item in repoList">
                            <p class="pkg-title" @click="download(item.path)">{{item.filename}}</p>
                            <p>{{item.version}}</p>
                        </div>
                    </el-scrollbar>
                </div>
            </div>

            <div class="tag-page" v-show="allDatas.length">
                <el-pagination
                        class="search-pagination"
                        :current-page.sync="formData.page"
                        :page-size="10"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import { search, repoSearch } from "../../api/search";
    let that = null;
    const locationMethods = {
        
        getSearchPage (flag) {
            that.formData.page = flag;
            if(that.formData.keyword){
                that.loading = true;
                search(that.formData)
                    .then(response => {
                        that.loading = false;
                        that.total = response.data.totalNum;
                        if(!that.tagTitle.length){
                            that.tagTitle = response.data.total;
                        }
                        that.allDatas = response.data.records;
                    })
                    .catch(response => {
                        that.$message.error(response);
                        that.loading = false;
                    });
            }
            
        },
        repoSearch (flag) {
            if(that.formData.keyword){
                repoSearch(that.formData)
                    .then(response => {
                        that.repoList = response.data.records;
                    })
                    .catch(response => {
                        that.$message.error(response);
                    });
            }
            
        }
    }
    export default {
        name: "search",
        data() {
            that = this;
            return {
                loading: false,
                curKey: 'all',
                searchInput: "",
                formData: {
                    keyword: "",
                    model: "",
                    indexEs: "",
                    version: "",
                    page: 1,
                },
                total: 0,
                tagTitle: [],
                allDatas: [],
                repoList: []
            }
        },
        mounted() {
            this.formData.keyword = decodeURI(this.$route.query.keyword|| '') || '';
            this.formData.indexEs = this.$lang == 'en' ? 'openeuler_articles_en' : (this.$lang == 'ru' ? 'openeuler_articles_ru' : 'openeuler_articles');
            this.formData.model = '';
            this.search();
        },
        methods: {
            download (url) {
                window.open(url);
            },
            initData(flag) {
                locationMethods.getSearchPage(flag);
            },
            handleCurrentChange(val) {
                this.initData(val);
                scrollTo(0,0);
            },
            search (){
                if(this.formData.keyword) {
                    this.tagTitle = [];
                    this.curKey = 'all';
                    this.initData(1);  
                    locationMethods.repoSearch();  
                }
            },
            goDetail ({type, version, path, articleName}){
                let dealPath = null;
                const docsPath = path;
                path = path.split('/');
                path = path[path.length - 1] + '/' + articleName.split('.')[0];
                let sitePagesArr = [];
                if(type === 'docs'){
                    const flagLang = '/' + this.$lang + '/';
                    const resPath = docsPath.split('/server/')[1].split(flagLang)[0] + '/' + docsPath.split('/server/')[1].split(flagLang)[1] + '/';
                    const tempPath = this.$site.themeConfig.docsUrl + '/' + this.$lang + '/' + resPath + articleName.split('.')[0] + '.html';
                    window.open(tempPath);
                    return;
                }else{
                    sitePagesArr = this.$sitePages;
                }
                sitePagesArr.forEach(item => {
                    if(item.path.includes(encodeURI(path))){
                        dealPath = item.path;
                    }
                })
                if(dealPath){
                    const routeUrl = this.$router.resolve(dealPath);
                    window.open(routeUrl.href);
                }else {
                    this.$message.error('找不到此路径');
                }
            }
        },
        watch: {
            curKey: function (val) {
                this.formData.model = this.curKey;
                this.initData(1);
            }
        }
    }
</script>

<style lang="less">
    em {
        color: #002FA7;
    }
    .search-area .el-input__inner {
        height: 62px;
        line-height: 62px;
        font-size: 20px;
        
        color: #000;
        border: 1px solid #7f7f7f;
        border-radius: 8px;
    }
    .search-area .el-input__inner:hover,
    .search-area .el-input__inner:focus {
        border: 2px solid #002FA7;
        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
    }
    .tag-left .el-scrollbar__wrap {
        width: calc(~"100% + 17px");
        height: calc(~"100% + 17px");
    }
    .search-tag .el-tab-pane {
        width: 730px;
        min-height: 1300px;
        padding-right: 30px;
        border-right: 1px solid #D8D8D8;
    }
    .tag-right .el-scrollbar__wrap {
        max-height: 100vh;
    }
    .search-area-mobile img {
        margin: 4px 0 0 0 !important;
        width: 25px !important;
        height: 25px !important;
    }
    .search-pagination {
        @media (max-width: 1000px) {
            .el-pager li {
                display: none;
            }
            .el-pager .active {
                display: inline-block;
            }
        }
    }
</style>
<style lang="less" scoped>
    .search {
        @media (max-width: 1000px) {
            padding: 0 30px;
        }
    }
    .icon-search{
        color: #002fa7;
        font-size: 16px;
        line-height: 32px;
    }
    .search-pagination {
        display: block;
    }
    .search-banner {
        width: 1080px;
        text-align: center;
        margin: 0 auto;
        h2 {
            display: none;
        }
        @media (max-width: 1000px) {
            width: 100%;
            h2 {
                display: block;
                text-align: center;
                font-size: 24px;
                color: #000;
                
                line-height: 34px;
                margin-top: 40px;
            }
        }
        .search-area-mobile {
            display: none;
            @media (max-width: 1000px) {
                display: block;
                width: 100%;
                margin-bottom: 40px;
            }
        }
    }
    .search-banner img {
        width: 175px;
        height: 200px;
        margin: 30px 0 40px;
        @media (max-width: 1000px) {
            margin: 10px 0 40px;
        }
    }
    .search-area {
        width: 600px;
        height: 60px;
        margin: 0 auto 80px;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .search-area img {
        width: 27px;
        height: 27px;
        vertical-align: middle;
        margin: 18px 25px;
    }
    .search-tag {
        width: 1120px;
        margin: 0 auto 180px;
        @media (max-width: 1000px) {
            width: 100%;
            margin-bottom: 80px;
            .tag-title ul li {
                width: 72px;
                
                padding-bottom: 18px;
                cursor: pointer;
                span {
                    display: none;
                }
            }
        }
    }
    .tag-content {
        width: 1120px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        @media (max-width: 1000px) {
            width: 100%;
            .tag-left {
                border: none;
                padding-right: 0;
                margin-right: 0;
            }
            .tag-right {
                display: none;
            }
        }
    }
    .tag-title {
        height: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }
    .tag-title .active {
        border-bottom: 4px solid #022fa7;
    }
    .tag-title::after {
        content: "";
        clear: both;
    }
    .tag-title span {
        font-size: 16px;
        
        cursor: pointer;
    }
    .tag-title li {
        float: left;
        width: 130px;
        text-align: center;
        padding-bottom: 15px;
        cursor: pointer;
    }
    .tag-left {
        flex: 4;
        border-right: 1px solid #D8D8D8;
        padding-right: 30px;
        margin-right: 30px;
    }
    .tag-left a {
        font-size: 20px;
        
        text-decoration: none;
        color: #000;
    }
    .tag-left em {
        color: #002FA7;
    }
    .tag-left p {
        font-size: 14px;
        
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
    }
    .tags-info {
        margin-top: 40px;
    }
    .tags-info h3{
        cursor: pointer;
    }
    .tags-info:first-child {
        margin-top: 20px;
    }
    .articla-from {
        font-size: 12px;
    }
    .artical-tag {
        color: #000;
    }
    .tag-right {
        flex: 1;
        margin-top: 20px;
    }
    h4 {
        font-size: 20px;
        
        margin-bottom: 15px;
    }
    p {
        font-size: 14px;
        
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
        margin: 10px 0 20px;
    }
    .pkg-title {
        cursor: pointer;
        font-size: 14px;
        
        font-weight: normal;
        color: #002FA7;
        margin: 0;
    }
</style>