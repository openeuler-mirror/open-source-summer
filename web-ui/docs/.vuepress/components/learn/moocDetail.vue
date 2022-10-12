<template>
    <div class="mooc-detail">
        <div class="detail-mobile" v-if="isShowH5">
            <div class="mobile-menu">
                <div class="prev" @click="previous">
                    <i class="el-icon-arrow-left"></i>
                    <span>{{ i18n.learn.PREV_TEXT }}</span>
                </div>
                <div class="menu" @click="showMenu('show')">
                    <span>{{ i18n.learn.MOOC_CATALOG }}</span>
                </div>
                <div class="next" @click="next">
                    <span>{{ i18n.learn.NEXT_TEXT }}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <el-collapse-transition>
                <div class="nav-tree" v-show="isShowMenu">
                    <ul class="course-menu">
                        <li v-for="(items,indexs) in menuData" :key="indexs">
                            <div @click="showItem(indexs,items)">
                                <span>{{ items.label }}</span>
                                <i :class="mobileNavIndex === indexs?'el-icon-arrow-down':'el-icon-arrow-right'" v-if="indexs !== 0"></i>
                            </div>
                            <el-collapse-transition>
                                <ul class="item" v-show="items.children && mobileNavIndex === indexs">
                                    <li :class="navItemIndex === item.key?'active':''" v-for="(item,index) in items.children" @click="toCourse(item,index)">{{ item.label }}</li>
                                </ul>
                            </el-collapse-transition>
                        </li>
                    </ul>
                    <div class="course-mask" @click="showMenu('hide')"></div>
                </div>
            </el-collapse-transition>
            <div class="mobile-content">
                <p class="title"> <span :key="currentNode.title">{{ currentNode.title }}</span></p>
                <p class="desc">{{ currentNode.desc }}</p>
                <div class="text" v-show="introductionText.length">
                    <p v-for="(item,index) in introductionText">{{ item }}</p>
                    <div class="teacher" v-if="currentNode.key === 'introduction0'">
                        <p>{{ i18n.learn.TEACHER_TEAM }}</p>
                        <div class="item" v-for="(item,index) in teacherList">
                            <img :src="item.img" alt="" />
                            <div>
                                <p>{{ item.position }}</p>
                                <p>{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video" v-show="!introductionText.length">
                    <video :src="currentNode.video" loop width="315px" height="200px" ref="mobileVideo"></video>
                    <div class="play-btn" v-if="!isNowPlay" @click="playmoocVideo('mobileBtn')"></div>
                </div>
            </div>
        </div>
        <div class="detail-pc" v-else>
            <router-link :to="'/' + $lang + '/learn/mooc/'" tag="p" class="back">{{ i18n.learn.MOOC_LIST_ROUTRE }}\</router-link>
            <h1>{{ courseH1 }}</h1>
            <div class="content">
                <div class="article-nav fl">
                    <div class="nav-top">{{ i18n.learn.MOOC_CATALOG }}</div>
                    <el-tree
                    ref="tree"
                    node-key="key"
                    :data="menuData"
                    :props="defaultProps"
                    accordion
                    :highlight-current="true"
                    @node-click="handleNodeClick">
                    </el-tree>
                </div>
                <div class="article-detail fl">
                    <div class="infomation">
                        <div>
                            <p> <span class="title" :key="currentNode.title">{{ currentNode.title }}</span> 
                            <a :href="currentNode.ppt"
                                :download="currentNode.ppt"
                             class="download" v-show="currentNode.ppt">{{ i18n.learn.COURSE_DOWNLOAD }}</a>
                            </p>
                            <p class="desc">{{ currentNode.desc }}</p>
                        </div>
                    </div>
                    <div class="text" v-show="introductionText.length">
                        <p v-for="(item,index) in introductionText">{{ item }}</p>
                        <div class="teacher" v-if="currentNode.key === 'introduction0'">
                            <p>{{ i18n.learn.TEACHER_TEAM }}</p>
                            <div class="item" v-for="(item,index) in teacherList">
                                <img :src="item.img" alt="" />
                                <div>
                                    <p>{{ item.position }}</p>
                                    <p>{{ item.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="video" v-show="!introductionText.length">
                        <video :src="currentNode.video" loop width="712px" height="400px" id="pc-video"></video>
                        <playcontroll :ctrl-obj="videoCtrlParams" ref="playctrlEle" @playStatus="checkStatus"></playcontroll>
                        <div class="play-btn" v-if="!isNowPlay" @click="playmoocVideo('webBtn')"></div>
                    </div>
                    <div class="crtl-btn">
                        <div class="prev" @click="previous">
                            <i class="el-icon-arrow-left"></i>
                            <span>{{ i18n.learn.PREV_TEXT }}</span>
                        </div>
                        <div class="next" @click="next">
                            <span>{{ i18n.learn.NEXT_TEXT }}</span>
                            <i class="el-icon-arrow-right"></i> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import playcontroll from './../controll/videoctrl';
export default {
    name: 'moocDetail',
    data () {
        return {
            videoCtrlParams: {
                element: '',
                isShow: true,
                barWidth: 590
            },
            isNowPlay: false,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            menuData: [],
            currentNode: {
                title: '',
                ppt: '',
                desc: '',
                video: '',
                key: ''
            },
            teacherList: [],
            introductionText: [],
            allNode: [],
            courseH1: '',
            courseIndex: 0,
            isShowMenu: false,
            mobileNavIndex: -1,
            navItemIndex: ''
        }
    },
    mounted() {
        this.videoCtrlParams.element = document.getElementById('pc-video');
        this.getMenu();
        this.introductionText = this.menuData[0].introduction;
        this.teacherList = this.menuData[0].teacher;
        this.currentNode.title = this.menuData[0].label;
        this.currentNode.key = this.menuData[0].key;
        this.allNode = this.getCoursePath(this.menuData);
    },
    updated() {
        if(!this.isShowH5) {
            this.setCheckedNode();
        }
    },
    methods: {
        toCourse(item,index) {
            this.setCourseData(item);
            this.showMenu('hide');
            this.navItemIndex = item.key;
        },
        showItem(index,item) {
            if(index == 0) {
                this.setCourseData(item);
                this.showMenu('hide');
            }else {
                if(this.mobileNavIndex === index) {
                    this.mobileNavIndex = -1;
                }else {
                    this.mobileNavIndex = index;
                }
            }
        },
        showMenu(option) {
            if(option === 'show') {
                this.isShowMenu = true;
            }else if(option === 'hide'){
                this.isShowMenu = false;
            }else {
                return false;
            }
        },
        setCheckedNode() {
            this.$refs.tree.setCurrentKey(this.currentNode.key);
        },
        getMenu() {
            let  listData= this.i18n.learn.MOOC_DATA;
            listData.forEach((item)=>{
                if(item.ID == this.$route.query.id){
                    this.menuData = item.NAV_DATA;
                    this.courseH1 = item.COURSE_H1;
                }
            });
        },
        checkStatus(status) {
             if(status === true){
                this.isNowPlay = true;
            }else{
                this.isNowPlay = false;
            }
        },
        handleNodeClick(obj,node,com) {
            this.setCourseData(obj);
            if(obj.key && this.isShowH5) {
                this.isShowMenu = false;
            }
        },
        getCoursePath(menuData) {
            menuData.forEach((item,index)=>{
                if(item.children && item.children.length) {
                    this.getCoursePath(item.children);
                }else {
                    this.allNode.push(item);
                }
            });
            return this.allNode;
        },
        playmoocVideo(option) {
            if(option === 'webBtn') {
                this.$refs.playctrlEle.isPlay = true;
            }else if(option === 'mobileBtn'){
                this.$refs.mobileVideo.play();
                this.isNowPlay = true;
            }
        },
        getTitleAndIndex(arr,option) {
            arr.forEach((item,index)=>{
                if(item.key === this.currentNode.key && index !== 0 && option === 'prev') {
                    this.currentNode.title = arr[index - 1].label;
                    this.courseIndex = index - 1;
                }else if(item.key === this.currentNode.key && option === 'next') {
                    this.currentNode.title = arr[index + 1].label;
                    this.courseIndex = index + 1;
                }else {
                    return false;
                }
            });
        },
        setCourseData(obj) {
            if(obj.introduction) {
                this.introductionText = obj.introduction;
                this.currentNode.title = obj.label;
                this.currentNode.key = obj.key;
                this.currentNode.desc = '';
                if(!this.isShowH5) {
                    this.setCheckedNode();
                }
                if(obj.ppt) {
                    this.currentNode.ppt = obj.ppt;
                }
            }else if(obj.desc){
                this.introductionText = [];
                this.currentNode.title = obj.label;
                this.currentNode.ppt = obj.ppt_link;
                this.currentNode.desc = obj.desc;
                this.currentNode.video = obj.video_link;
                this.currentNode.key = obj.key;
                if(this.isShowH5) {
                    this.$refs.mobileVideo.isPlay = false;
                }else {
                    this.$refs.playctrlEle.isPlay = false;
                    this.setCheckedNode();
                    this.$refs.playctrlEle.barPercentage = 0;
                }
            }else {
                return false;
            }
        },
        previous() {
            this.getTitleAndIndex(this.allNode,'prev');
            this.currentNode.key = this.allNode[this.courseIndex].key;
            this.setCourseData(this.allNode[this.courseIndex]);
        },
        next() {
            this.getTitleAndIndex(this.allNode,'next');
            //最后一章则无下一篇
            if(this.courseIndex === this.allNode.length -1) {
                return false;
            }else {
                this.currentNode.key = this.allNode[this.courseIndex].key;
            }
            this.setCourseData(this.allNode[this.courseIndex]);
        },
    },
    components: {
        playcontroll
    }
}
</script>

<style lang="less" scoped>
.mooc-detail .detail-pc {
    overflow: hidden;
    padding-bottom: 200px;
    h1 {
        width: 1120px;
        font-size: 36px;
        line-height: 50px;
        color: #000000;
        margin: 0 auto 50px auto;
    }
    .back {
        cursor: pointer;
        font-size: 20px;
        color: #002FA7;
        line-height: 20px;
        width: 1120px;
        margin: 28px auto 16px auto;
    }
}
.detail-pc .content {
    width: 1150px;
    margin: 0 auto;
    .article-nav {
        margin-right: 60px;
        background: #FFFFFF;
        margin-left: 16px;
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        .nav-top {
            width: 308px;
            height: 60px;
            background: #FFFFFF;
            font-size: 18px;
            line-height: 60px;
            color: #000000;
            padding-left: 36px;
            font-weight: bold;
        }
        /deep/ .el-tree {
            max-height: 1030px;
            width: 308px;
            overflow: hidden;
        }
        /deep/ .el-tree-node__content>.el-tree-node__expand-icon {
            padding: 12px;
        }
        /deep/ .el-tree-node__children .is-current .el-tree-node__label{
            color: #002FA7;
        }
        /deep/ .el-tree .el-tree-node__label{
            font-size: 16px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.85);
        }
        /deep/ .el-tree .el-tree-node__children .el-tree-node__label {
            font-size: 14px;
            line-height: 20px;
            white-space: pre-wrap;
        }
        /deep/ .el-tree-node .el-tree-node__content {
            padding: 30px;
        }
    }
    .article-detail {
        width: 712px;
        .infomation {
            padding-bottom: 30px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            &>div {
                &:first-of-type {
                    .desc {
                        font-size: 16px;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 26px;
                        margin-top: 20px;
                    }
                    .title {
                        font-size: 18px;
                        line-height: 20px;
                        color: #000000;
                    }
                    .download {
                        display: inline-block;
                        width: 104px;
                        height: 32px;
                        background: #002FA7;
                        border-radius: 4px;
                        color: #FFFFFF;
                        font-size: 16px;
                        line-height: 32px;
                        text-align: center;
                        text-decoration: none;
                        margin-left: 30px;
                    }
                }
            }
        }
        .video {
            position: relative;
            padding: 30px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            .playControll {
                display: block;
            }
            .big-controll {
                bottom: 34px;
            }
            .play-btn {
                width: 50px;
                height: 50px;
                position: absolute;
                border-radius: 50%;
                bottom: 50%;
                left: 50%;
                margin: 0 0 -10px -25px;
                background-image: url('/img/learn/play.png');
                cursor: pointer;
                background-size: contain;
                opacity: 0.6;
            }
        }
        .text {
            font-size: 16px;
            line-height: 36px;
            padding: 30px 0;
            color: rgba(0, 0, 0, 0.7);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            .teacher {
                margin-top: 20px;
                &>p {             
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.69);
                    margin-bottom: 10px;
                    line-height: 36px;
                }
                .item {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 20px;
                    img {
                        display: block;
                        width: 60px;
                        height: 60px;
                        margin-right: 20px;
                    }
                    p {
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.69);
                        line-height: 16px;
                        margin-top: 8px;
                        &:last-of-type {
                            color: #000000;
                            margin-top: 12px;
                        }
                    }
                }
            }
        }
        .crtl-btn {
            margin-top: 24px;
            position: relative;
            height: 30px;
            .prev,.next {
                cursor: pointer;
                font-size: 16px;
                line-height: 22px;
                font-weight: 400;
                position: absolute;
                color: #002FA7;
                i {
                    color: #252C32;
                }
            }
            .prev {
                left: 0;
                top: 0;
            }
            .next {
                right: 0;
                top: 0;
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .detail-mobile .mobile-menu{
        width: 100%;
        height: 40px;
        padding: 10px 16px;
        position: fixed;
        top: 70px;
        background: #FBFBFB;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        z-index: 100;
        .prev,.menu,.next {
            font-size: 14px;
            font-weight: 400;
            color: #002FA7;
            line-height: 20px;
        }
    }
    .detail-mobile .nav-tree {
        position: fixed;
        width: 100%;
        top: 113px;
        z-index: 200;
        .course-menu {
            background-color: #fff;
            z-index: 100;
            padding: 10px 30px;
            height: 400px;
            overflow: scroll;
            position: fixed;
            width: 100%;
            top: 110px;
            &>li {
                padding: 10px 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                font-size: 16px;
                color: #000000;
                line-height: 26px;
                &:last-of-type {
                    border-bottom: 0;
                }
                div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .el-icon-arrow-down {
                        color: #002FA7;
                    }
                }
                .item {
                    padding-left: 15px;
                    li {
                        font-size: 14px;
                        padding: 6px;
                    }
                    .active {
                        color: #002FA7;
                    }
                }
            }
        }
        .course-mask {
            position: fixed;
            background-color: rgba(0, 0, 0, 0.4);
            width: 100%;
            top: 110px;
            height: 100%;
        }
    }
    .detail-mobile .mobile-content {
        width: 315px;
        margin: 0 auto;
        padding: 40px 0 80px 0;
        .title {
            font-size: 18px;
            line-height: 18px;
            color: #000000;
            font-weight: blod;
            margin-top: 40px;
        }
        .desc {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.85);
            line-height: 20px;
            margin-top: 20px;
        }
        .text {
            p {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
                line-height: 24px;
            }
            .teacher {
                margin-top: 20px;
                &>p {
                    color: rgba(0, 0, 0, 0.7);
                }
                .item {
                    display: flex;
                    flex-direction: row;
                    margin: 20px 0;
                    img {
                        display: block;
                        width: 50px;
                        height: 50px;
                        margin-right: 20px;
                    }
                    div {
                        p {
                            font-size: 12px;
                            color: rgba(0, 0, 0, 0.69);
                            line-height: 16px;
                            &:last-of-type {
                                color: #000000;
                                margin-top: 10px;
                            }
                        }
                    }
                }
            }
        }
        .text,.video {
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            padding-top: 30px;
            margin-top: 30px;
        }
        .video {
            position: relative;
            .play-btn {
                width: 50px;
                height: 50px;
                position: absolute;
                border-radius: 50%;
                bottom: 50%;
                left: 50%;
                margin: 0 0 -35px -25px;
                background-image: url('/img/learn/play.png');
                cursor: pointer;
                background-size: contain;
                opacity: 0.6;
            }
        }
    }
}
</style>