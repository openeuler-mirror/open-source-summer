<template>
    <div class="moblie-content">
        <common-banner
        :pc-src="'/img/blog/blog_banner.png'"
        :mobile-src="'/img/blog/blog_banner.png'"
        :inside-name="'CONNECT'"
        :outside-name="i18n.community.BLOG.BLOG"
        >
            <div slot="pc-slot" class="write-blog-btn banner-btn" @click="goPostBlog">
                <span class="blog-write">{{i18n.community.BLOG.BLOGGING}}</span>    
            </div>
        </common-banner>
        <div :class="['blog-content',$lang === 'ru'?'lang-ru':'']">
            <div class="main-content">
                <el-form :model="formData" class="blog-filter">
                    <el-form-item :label="i18n.community.BLOG.FILE">
                        <el-select v-model="formData.date" @change="selectChange" :placeholder="CELECT_FILE">
                            <el-option
                            v-for="(item, index) in formData.dateArr"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="i18n.community.BLOG.AUTHOR">
                        <el-select v-model="formData.author" @change="selectChange" :placeholder="i18n.community.BLOG.SELECT_AUTHOR">
                            <el-option
                            v-for="(item, index) in formData.authorArr"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="!isShowH5" :label="i18n.community.BLOG.LABEL">
                        <el-select v-model="formData.tags" multiple @change="selectChange" :placeholder="CELECT_LABEL">
                            <el-option
                            v-for="(item, index) in formData.tagArr"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="isShowH5" :label="i18n.community.BLOG.LABEL">
                        <el-select v-model="formData.tags" @change="selectChange" :placeholder="CELECT_LABEL">
                            <el-option
                            v-for="(item, index) in formData.tagArr"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="isShowH5" class="mobile-blog-write">
                        <div class="write-blog-btn" @click="goPostBlog">
                            <img class="middle-img mobile-middle-img" src="/img/blog/edit.svg" alt />
                            <span class="blog-write">{{i18n.community.BLOG.BLOGGING}}</span>    
                        </div>
                    </el-form-item>
                    <div v-if="!isShowH5" class="tags-active">
                        <span class="tags-active-item" v-for="(item, index) in formData.tags">{{item}} <span @click="delTag(index)">x</span></span>
                    </div>
                </el-form>
                <div class="blog-list">
                    <div v-if="!isShowH5">
                        <div class="blog-item" v-for="(item, index) in currentBlogListData" :key="'info'+index">
                            <div class="blog-item-right">
                                <p @click="go(item.path)" class="blog-item-title word-hover">{{item.frontmatter.title}}</p>
                                <p class="blog-item-content"><span class="summary">{{item.frontmatter.summary}}</span></p>
                                <div class="blog-desc">
                                    <span><img src="/img/blog/account.svg">{{item.frontmatter.author}}</span>
                                    <span><img src="/img/blog/date.svg">{{resolvePostDate(item.frontmatter.date)}}</span>
                                    <span><img src="/img/blog/visibility.svg"><span>{{i18n.community.BLOG.BROWSE}}</span>{{item.count}}<span>{{i18n.community.BLOG.VIEWED}}</span></span>
                                </div>
                                <p class="blog-item-tag">
                                    <img src="/img/blog/tag.svg">
                                    <span @click="switchTag(tag, indexTag, (formData.tags.length&&(formData.tags.indexOf(tag)>-1)))" v-for="(tag, indexTag) in item.frontmatter.tags" :key="indexTag" :class="'tag-item ' + ((formData.tags.length&&(formData.tags.indexOf(tag)>-1))?'active':'')">
                                        {{tag}}
                                    </span>
                                </p>
                            </div>
                        </div>   
                    </div>
                    <div v-else>
                        <div class="blog-item-mobile" v-for="(item, index) in currentBlogListData" :key="index">
                            <div class="item-wraper">
                                <p class="title" @click="go(item.path)">{{item.frontmatter.title}}</p>
                                <div class="summary">{{item.frontmatter.summary}}</div>
                                <div class="blog-desc">
                                    <span>{{item.frontmatter.author}}</span>
                                    <span>{{resolvePostDate(item.frontmatter.date)}}</span>
                                    <span>{{i18n.community.BLOG.BROWSE}}{{item.count}}{{i18n.community.BLOG.VIEWED}}</span>
                                </div>
                                <div class="tag">
                                    <span v-for="(tag, indexTag) in item.frontmatter.tags" :key="indexTag" class="tag-name">
                                        <span @click="clickTagItem(tag)" class="tag-item">{{tag}}</span>
                                        <span v-if="indexTag != (item.frontmatter.tags.length - 1)">, </span>
                                    </span>
                                </div>
                            </div>
                        </div>    
                    </div>
                    
                </div>  
                  
            </div>
            
            <div class="paginationClass" v-show="screenBlogListData.length>1">
                <el-pagination
                background
                @current-change="handleCurrentChange"
                :page-size="5"
                :layout="paginationLayout"
                :total="totalSize"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
import commonBanner from "./../common/banner.vue";
import {blogVisitList} from "../../api/blogCount"

export default {
    data() {
        return {
        // 页面显示数据
        currentBlogListData: [],
        // 筛选结果数据
        screenBlogListData: [],
        // 所有博客数据
        allBlogListData: [],
        totalSize: 0,
        currentPage: 1,
        formData: {
            tags: [],
            date: null,
            author: null,
            tagsArr: [],
            dateArr: [],
            authorArr: [],
        },
        //常量每页显示数量
        PAGESIZE: 5,
        CELECT_LABEL: "",
        CELECT_FILE: ""
        };
    },
    components: {
        commonBanner,
    },
    computed: {},

    created() {
        this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
        this.dataList = this.$sitePages;
    },
    mounted() {
        if (this.isShowH5) {
            this.formData.tags = null;
        }
        blogVisitList()
        .then(response => {
        if(response){
            this.countList = response.data;
            this.allBlogListData = this.blogList();
            this.screenBlogListData = this.allBlogListData;
            this.screenChange();
            this.formData.tagArr = this.getTags();
            this.formData.dateArr = this.getTimes();
            this.formData.authorArr = this.getAuthors();
            this.CELECT_LABEL = this.i18n.community.BLOG.CELECT_LABEL;
            this.CELECT_FILE = this.i18n.community.BLOG.CELECT_FILE;
        }
        }).catch(() => {
            this.countList = [];
            this.allBlogListData = this.blogList();
            this.screenBlogListData = this.allBlogListData;
            this.screenChange();
            this.formData.tagArr = this.getTags();
            this.formData.dateArr = this.getTimes();
            this.formData.authorArr = this.getAuthors();
            this.CELECT_LABEL = this.i18n.community.BLOG.CELECT_LABEL;
            this.CELECT_FILE = this.i18n.community.BLOG.CELECT_FILE;
        })
    },
    methods: {
        switchTag(tag, index, flag) {
            if (flag) {
                this.formData.tags.splice(this.formData.tags.indexOf(tag), 1);
            } else {
                this.formData.tags.push(tag);
            }
            this.selectChange();
        },
        delTag(index) {
            this.formData.tags.splice(index, 1);
            this.selectChange();
        },
        handleCurrentChange(val) {
            this.currentBlogListData = this.screenBlogListData.slice(
            (val - 1) * this.PAGESIZE,
            val * this.PAGESIZE
            );
            scrollTo(0, 0);
        },
        screenChange() {
            if (this.screenBlogListData.length > this.PAGESIZE) {
                this.currentBlogListData = this.screenBlogListData.slice(
                0,
                this.PAGESIZE
                );
            } else {
                this.currentBlogListData = this.screenBlogListData;
            }
            this.totalSize = this.screenBlogListData.length;
            this.currentPage = 1;
        },
        selectChange() {
            let resultArr = [];
            this.allBlogListData
            resultArr= this.filterChange(this.allBlogListData,'tags');
            resultArr= this.filterChange(resultArr,'date');
            resultArr= this.filterChange(resultArr,'author');
            this.screenBlogListData = resultArr;
            this.screenChange();
        },
        filterChange (blogList,filterElement) {
            let resultArr = [];
            if (this.formData[filterElement] === null || (this.formData[filterElement] && !this.formData[filterElement].length) || this.formData[filterElement] === '全部' || this.formData[filterElement] === 'All' ) {
                resultArr = blogList;
            } else {
                blogList.forEach((item) => {
                    if (!item.frontmatter[filterElement]) {
                        return;
                    }
                    if (!this.isShowH5 && (filterElement === 'tags')) {
                        let tempArr = [];
                        tempArr = this.formData[filterElement].filter((filterElementItem)=>{
                            return (item.frontmatter[filterElement].indexOf(filterElementItem) > -1);
                        })
                        if (tempArr.length) {
                            resultArr.push(item);
                        }  
                    } else {
                        if (item.frontmatter[filterElement].indexOf(this.formData[filterElement]) > -1) {
                            resultArr.push(item);
                        }    
                    }
                    
                });
            }
            return resultArr;
        },
        clickTagItem(tag) {
            this.formData.tags = tag;
            this.selectChange();
        },
        getTags() {
            let tagsArr = [];
            let tagsArrUniq = [];
            if (this.isShowH5) {
                tagsArrUniq.push({value:this.i18n.community.BLOG.ALL,label:'all'});    
            }
            
            this.$sitePages.forEach((item) => {
                if (item.path.indexOf("/" + this.$lang + "/blog/") !== 0) {
                    return;
                }
                if (!item.frontmatter.tags) {
                    return;
                }
                tagsArr.push.apply(tagsArr, item.frontmatter.tags);
            });
            tagsArr = this.uniq(tagsArr);
            tagsArr.forEach((item) => {
                let obj = {
                value: item,
                label: item,
                };
                tagsArrUniq.push(obj);
            });
            return tagsArrUniq;
        },
        uniq(array,which) {
            var temp = [];
            for (var i = 0; i < array.length; i++) {
                if (temp.indexOf(array[i]) == -1) {
                    temp.push(array[i]);
                }
            }
            if(which === 'time') {
                let timeRes = [];
                temp.forEach((item) => {
                    timeRes.push(item.slice(0,4) + item.slice(5))
                });
                timeRes.sort((a,b)=>{
                    return  b-a;
                });
                timeRes.forEach((item,index) => {
                    timeRes[index] = item.slice(0,4) + '-' + item.slice(4);
                });
                temp = timeRes;
            }
            return temp;
        },
        getTimes() {
            let timesArr = [];
            let timesArrUniq = [];
            timesArrUniq.push({value:this.i18n.community.BLOG.ALL,label:'all'});
            this.$sitePages.forEach((item) => {
                if (item.path.indexOf("/" + this.$lang + "/blog/") !== 0) {
                    return;
                }
                if (!item.frontmatter.date) {
                    return;
                }
                timesArr.push(item.frontmatter.date.slice(0, 7));
            });
            timesArr = this.uniq(timesArr,'time');
            timesArr.forEach((item) => {
                let obj = {
                    value: item,
                    label: item,
                };
                timesArrUniq.push(obj);
            });
            return timesArrUniq;
        },
        getAuthors() {
            let authorsArr = [];
            let authorsArrUniq = [];
            authorsArrUniq.push({value:this.i18n.community.BLOG.ALL,label:'all'});
            this.$sitePages.forEach((item) => {
                if (item.path.indexOf("/" + this.$lang + "/blog/") !== 0) {
                    return;
                }
                if (!item.frontmatter.author) {
                    return;
                }
                authorsArr.push(item.frontmatter.author);
            });
            authorsArr = this.uniq(authorsArr);
            authorsArr.forEach((item) => {
                let obj = {
                    value: item,
                    label: item,
                };
                authorsArrUniq.push(obj);
            });
            return authorsArrUniq;
        },
        blogList() {
            let list = this.$sitePages.filter((item) => {
                if(item.path.indexOf("/" + this.$lang + "/blog/") === 0){
                item.count=0;
                this.countList.forEach(itemCount=>{
                    if(itemCount.title==item.frontmatter.title){
                        item.count=itemCount.count;
                    }
                })
                return true;
                }
            });
            return list.sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
            
        },
        go(path) {
            if (path) {
                this.$router.push(path);
            }
        },
        getBlogDataByLang(data) {
            let blogData = [];
            let langID = this.$lang === "zh" ? "zh" : "en";
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === langID) {
                    blogData.push(data[i]);
                }
            }
            return blogData;
        },
        resolvePostDate(date) {
            return dayjs(date).format(
                this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
            );
        },

        resolvePostTags(tags) {
            if (!tags || Array.isArray(tags)) return tags;
            return [tags];
        },
        goPostBlog() {
            this.$router.push(this.targetLocale + "interaction/post-blog/");
        },
    },
};
</script>

<style lang="less">
.blog-header {
    height: 560px;
    .blog-title {
        width: 1120px;
        height: 560px;
        margin: 0 auto;
        font-size: 48px;
        line-height: 560px;
        font-weight: normal;
        position: relative;
    }
}
.blog-connect {
    font-size: 60px;
    color: rgba(0, 0, 0, 0.05);
    position: absolute;
    top: -50px;
    left: 0px;
}
.word-hover{
    &:hover{
        color: #002FA7;
    }
}
.blog-banner-img {
    position: absolute;
    top: 70px;
    right: 0;
}
.middle-img {
    vertical-align: middle;
}
.blog-filter {
    margin-bottom: 8px;
}
.lang-ru {
    /deep/ .el-form-item__label,/deep/ .el-select-dropdown__item,/deep/ .el-input__inner {
        font-family: Arial !important;
    }
    .el-form-item__content .blog-write {
        font-size: 16px;
    }
    .mobile-blog-write .el-form-item__content {
        min-width: 170px;
    }
}
.blog-content {
    width: 1120px;
    margin: 0 auto;
    .el-select__tags {
        min-width: 140px !important;
        display: none;
    }
    .el-form-item__label {
        font-size: 18px;
        color: #000;
        
    }

    .el-input__inner {
        font-size: 16px;
        height: 32px;
        color: #000;
        
    }

    .el-select-dropdown__item {
        color: #000;
        
    }

    .el-form-item {
        margin-right: 50px !important;
    }

    .el-form-item__content {
        min-width: 140px;
        min-height: 32px;
    }
}
.blog-write {
    font-size: 18px;
    font-weight: 400;
    color: #002fa7;
    
}
.blog-item {
    height: 335px;
    border-top: 1px solid;
    border-color: rgba(0, 0, 0, 0.25);
    padding: 40px 0 40px 0;
    @media screen and (max-width: 1000px) {
        display: none;
    }
}
.blog-item-left {
    display: inline-block;
    width: 190px;
    p {
        margin-bottom: 18px;
    }
}
.blog-item-right {
    display: inline-block;
    width: calc(100% - 210px);
    vertical-align: top;
}
.tag-item {
    cursor: pointer;
}
.blog-img {
    img {
        width: 100px;
        height: 100px;
    }
}
.blog-author {
    font-size: 14px;
    font-weight: bold;
    
}
.blog-date {
    font-size: 12px;
}
.fz12 {
    font-size: 12px;
}
.blog-item-title {
    font-size: 24px;
    margin-bottom: 36px;
    cursor: pointer;
}
.blog-item-content {
    height: 100px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
}
.summary {
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}
.blog-item-all {
    margin: 12px 0 24px 0;
    font-size: 14px;
    color: #002fa7;
    text-align: right;
    cursor: pointer;
}
.blog-item-tag {
    font-size: 14px;
    color: #002fa7;
    .first-tag{
      color: #00000080;
    }
}
.blog-item-mobile {
    display: none;
    @media screen and (max-width: 1000px){
        margin-top: 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid #e6e6e6;
        display: block;
        .item-wraper {
            .title {
                font-size: 16px;
                line-height: 26px;
                
            }
            .user-info {
                height: 65px;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                img {
                    width: 26px;
                    height: 26px;
                    border-radius: 100%;
                    margin-right: 11px;
                }
                .right {
                    .name {
                        color: rgba(0, 0, 0, 0.5);
                        font-size: 14px;
                        line-height: 24px;
                        
                    }
                    .date-count {
                        color: rgba(0, 0, 0, 0.5);
                        font-size: 12px;
                        line-height: 16px;
                        
                        .date {
                            margin-right: 16px;
                        }
                    }
                }
            }
            .summary {
                color: rgba(0, 0, 0, 0.5);
                font-size: 14px;
                line-height: 24px;
                
                text-align: justify;
                margin-bottom: 10px;
            }
            .more {
                text-align: right;
                font-size: 14px;
                line-height: 24px;
                color: #002fa7;
                margin-bottom: 10px;
            }
            .tag {
                font-size: 14px;
                line-height: 24px;
                
                color: rgba(0, 0, 0, 0.5);
                .tag-name {
                    color: #002fa7;
                }
            }
        }
    }
}
.paginationClass {
    margin: 20px 0 200px 0;
}
.write-blog-btn {
    background-color: #002fa7;
    height: 32px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: inline-block;
    cursor: pointer;
    padding: 0 20px;
    @media (min-width: 1000px) {
        margin-top: 4px;
        display: none;
    }
    
    .blog-write {
        color: #fff;
        vertical-align: middle;
        @media (min-width: 1000px) {
            margin-top: -2px;
        }
    }
    .middle-img {
        width: 20px ;
        height: 20px ;
    }
}

.banner-btn {
    position: absolute;
    display: flex !important;
    padding: 0 30px;
    height: 40px;
    top: 252px;
    .blog-write {
        font-size: 14px !important;
        line-height: 18px !important;
    }
}

@media screen and (max-width: 1000px) {
    .moblie-content {
        padding: 40px 30px 80px 30px;
    }
    .blog-header {
        height: auto;
        .blog-title {
            width: 100%;
            height: auto;
            margin: 0 auto;
            text-align: center;
            font-size: 18px;
            line-height: 34px;
            position: relative;
        }
    }
    .blog-connect {
        display: none;
    }
    .blog-banner-img {
        position: relative;
        top: 0px;
        right: 0;
        height: 200px;
        margin: 10px auto;
        display: block;
    }
    .middle-img {
        vertical-align: middle;
    }
    .mobile-middle-img {
        display: none;
    }
    .blog-filter {
        margin: 40px auto;
        padding: 75px 0 0;
        position: relative;
    }
    .blog-content {
        width: 100%;
        .el-select__tags {
            min-width: 140px !important;
        }
        .el-form-item__label {
            display: none !important;
        }
        .el-input__inner {
            font-size: 14px;
            color: #000;
            
        }
        .el-select-dropdown__item {
            color: #000;
            
        }
        .el-form-item {
            margin-right: 0px !important;
            width: 100%;
        }
        .el-select {
            width: 100%;
        }
        .el-form-item__content {
            min-width: 140px;
            min-height: 32px;
            line-height: 32px;
            width: 100%;
            text-align: center;
        }
        .el-input__inner {
            height: 32px;
            line-height: 32px;
        }
        .el-input__icon {
            line-height: 32px;
        }
    }
    .blog-write {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        color: #fff;
        font-size: 14px;
        background: rgba(0, 47, 167, 1);
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-left: 0;
    }
    .mobile-blog-write {
        position: absolute;
        top: 0;
        left: 0;
    }
    .blog-item {
        height: auto;
        border-top: 0;
        border-bottom: 1px solid;
        border-color: rgba(0, 0, 0, 0.25);
        padding: 0px 15px;
        margin-bottom: 40px;
        position: relative;
    }
    .blog-item-left {
        display: inline-block;
        position: absolute;
        top: 40px;
        width: 100%;
        p {
            display: inline-block;
            margin-bottom: 0px;
        }
    }
    .blog-item-right {
        display: inline-block;
        width: 100%;
        vertical-align: top;
        position: relative;
    }
    .blog-img {
        width: 26px;
        height: 26px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .blog-author {
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        margin-left: 10px;
    }
    .blog-date {
        font-size: 12px;
        display: inline-block;
        margin-left: 15px;
    }
    .blog-item-title {
        font-size: 16px;
        margin-bottom: 76px;
        cursor: pointer;
    }
    .blog-item-content {
        height: auto;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 54px;
    }
    .blog-item-all {
        margin: 0 0 30px 0;
        font-size: 14px;
        color: #002fa7;
        text-align: right;
        cursor: pointer;
    }
    .blog-item-tag {
        font-size: 14px;
        color: #002fa7;
        position: absolute;
        bottom: 54px;
    }
    .paginationClass {
        margin: 40px 0 0 0;
    }
    
}
.blog-content .main-content {
    @media screen and (min-width: 1000px) {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        .blog-filter {
            width: 230px;
        }
        .blog-filter .tags-active {
            margin-bottom: 50px;
            .tags-active-item {
                display: inline-block;
                height: 32px;
                line-height: 32px;
                color: #002fa7;
                border: 1px solid #002fa7;
                border-radius: 16px;
                padding: 0 16px;
                margin-right: 15px;
                margin-bottom: 20px;
                font-size: 14px;
                span {
                    cursor: pointer;
                    margin-left: 5px;
                }
            }
        }
        .blog-list {
            width: 860px;
            margin-right: 68px;
        }
        .el-form-item {
            margin: 0 0 20px !important;
        }
        .blog-item:first-of-type {
            border: none;
        }
        .blog-item {
            padding: 30px 0;
            &:first-of-type {
                padding-top: 0;
            }
            height: unset;
            .blog-item-right {
                width: unset;
                .blog-item-content {
                    height: unset;
                    margin-bottom: 20px;
                }
                .blog-item-title {
                    margin-bottom: 20px;
                }
                .blog-desc {
                    font-size: 12px;
                    color: rgba(0, 0, 0, .4);
                    margin-bottom: 18px;
                    img {
                        margin-right: 14px;
                    }
                }
                .blog-desc > span {
                    margin-right: 31px;
                }
                .blog-item-tag {
                    img {
                        margin-right: 7px;
                        vertical-align: middle;
                    }
                    .tag-item {
                        display: inline-block;
                        height: 26px;
                        padding: 0 16px;
                        border-radius: 13px;
                        margin-right: 12px;
                        line-height: 26px;
                        background-color: rgba(0,0,0,0.04);
                    }
                    .active {
                        border: 1px solid #002fa7;
                        background-color: #fff;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1000px) {
        .blog-item-mobile {
            .item-wraper {
                .title {
                    margin-bottom: 10px;
                }
                .blog-desc {
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 12px;
                    line-height: 16px;
                    margin-bottom: 10px;
                    span {
                        margin-right: 16px;
                    }
                }
            }
        }

    }
    
}
</style>
