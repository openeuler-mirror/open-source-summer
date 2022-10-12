<template>
    <div class="mail-list" v-loading.fullscreen="tableLoading">
        <common-banner
            :pc-src="'/img/community/maillist/mail-banner.png'"
            :mobile-src="'/img/community/maillist/mail-banner.png'"
            :inside-name="'COMMUNITY'"
            :outside-name="i18n.community.MAILING_LIST.TITLE"
        ></common-banner>

        <div :class="['maillist', 'is-pc', $lang === 'en' ? 'en' : '']" v-fade v-if="!isShowH5">
            <div :class="['maillist-divider-mail', 'is-pc']">
                <div class="maillist-icon-comm"></div>
            </div>
            <div
                class="mail-guide"
                v-for="(item, index) in i18n.community.MAILING_LIST
                    .GUIDE_CONTENT"
                :key="index"
            >
                <div class="step-left">
                    <div class="mail-box">
                        <div :class="['step-left-box','fade-in',$lang === 'en'?'en-box' + index : '',$lang === 'ru'?'ru-box' + index : '']">
                            <div class="inner-box">
                                <img :src="item.LEFT.LEFT_IMG" alt="" />
                                <p>
                                    <span  v-if="$lang !== 'zh'" class="en-title">{{ item.LEFT.LEFT_CIRCLE }}<br></span>
                                    {{ item.LEFT.LEFT_INFO }}
                                </p>
                            </div>
                        </div>
                        <div class="step-left-num">
                            <span v-if="$lang !== 'zh'">{{ item.LEFT.INDEX }}</span>
                            <span v-else>{{ item.LEFT.LEFT_CIRCLE }}</span>
                        </div>
                        <div class="step-line"></div>
                    </div>
                </div>
                <div class="step-right">
                    <div class="mail-box">
                        <div class="step-line"></div>
                        <div class="step-right-num">
                            <span v-if="$lang !== 'zh'">{{ item.RIGHT.INDEX }}</span>
                            <span v-else>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
                        </div>
                        <div :class="['step-right-box','fade-in',$lang !== 'zh'?'en-box' + index : '']">
                            <div class="inner-box">
                                <img :src="item.RIGHT.LEFT_IMG" alt="" />
                                <p>
                                    <span v-if="$lang !== 'zh'" class="en-title">{{ item.RIGHT.RIGHT_CIRCLE }}<br></span>
                                    {{ item.RIGHT.RIGHT_INFO }}<span class="link-color" @click="golink( item.RIGHT.LINK)">{{item.RIGHT.DO_THIS}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="maillist is-h5" v-else>
            <div
                class="mail-guide"
                v-for="(item, index) in i18n.community.MAILING_LIST
                    .GUIDE_CONTENT"
                :key="index"
            >
                <div class="step-left">
                    <div class="mail-box">
                        <div :class="['step-left-box',$lang === 'ru'?'ru-box':'']">
                            <div class="step-top">
                                <span :class="$lang === 'en'?'en-font':''">{{ item.LEFT.LEFT_CIRCLE }}</span>
                            </div>
                            <div :class="['inner-box',$lang === 'en'?'en-box' + index : '']">
                                <img :src="item.LEFT.LEFT_IMG" alt="" />
                                <p>
                                    {{ item.LEFT.LEFT_INFO }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-right">
                    <div class="mail-box">
                        <div class="step-top">
                            <span :class="$lang === 'en'?'en-font':''">{{ item.RIGHT.RIGHT_CIRCLE }}</span>
                        </div>
                        <div :class="['step-right-box', $lang === 'en'?'en-box' + index : '']">
                            <div :class="['inner-box',$lang === 'en'?'en-box' + index : '']">
                                <img :src="item.RIGHT.LEFT_IMG" alt="" />
                                <p>
                                    {{ item.RIGHT.RIGHT_INFO }}<span class="link-color" @click="golink( item.RIGHT.LINK)" >{{item.RIGHT.DO_THIS}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mail-table is-pc" v-if="!isShowH5">
            <el-table :data="list" stripe>
                <el-table-column
                    prop="display_name"
                    :label="i18n.community.MAILING_LIST.TABLE.NAME"
                    width="180"
                >
                    <template slot-scope="scope">
                        <a
                            class="list-name"
                            @click="userSubscribe(scope.row.list_id)"
                            ref="listName"
                        >
                            <p :id="scope.row.display_name">{{ scope.row.display_name }}</p>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fqdn_listname"
                    :label="i18n.community.MAILING_LIST.TABLE.EMAIL_ADDRESS"
                    width="260"
                >
                </el-table-column>
                <el-table-column
                    prop="archive"
                    :label="i18n.community.MAILING_LIST.TABLE.ARCHIVE"
                    width="120"
                >
                    <template slot-scope="scope">
                        <a
                            class="arch-link"
                            :href="'https://mailweb.openeuler.org/hyperkitty/list/' + scope.row.display_name.toLowerCase() +'@openeuler.org/'"
                            target="_blank">
                            <p>{{ scope.row.archive }}</p>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="description"
                    :label="i18n.community.MAILING_LIST.TABLE.DESCRIPTION"
                >
                </el-table-column>
            </el-table>
        </div>

        <div class="mail-table is-h5" v-else>
            <ul class="mail-list-h5">
                <li class="heaed">
                    <ul>
                        <li>{{ i18n.community.MAILING_LIST.TABLE.NAME_H5 }}</li>
                        <li>{{ i18n.community.MAILING_LIST.TABLE.ARCHIVE_H5 }}</li>
                        <li>{{ i18n.community.MAILING_LIST.TABLE.DESCRIPTION }}</li>
                    </ul>
                </li>
                <li
                    class="item"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <ul>
                        <li class="color-blue">
                            <span>
                                {{item.display_name}}
                            </span>
                        </li>
                        <li class="color-blue">
                            <span @click="go(item.display_name)">
                                {{item.archive}}
                            </span>
                        </li>
                        <li>
                            <span>
                                {{item.description}}
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { mailList } from "../../api/maillist";

export default {
    name: "maillist",
    data() {
        return {
            inPC: true,
            inEn: true,
            list: null,
            tableLoading: false
        };
    },
    mounted() {
        mailList()
            .then(response => {
                this.list = response.entries;
                this.list.forEach(item => {
                    item.archive = "Archive";
                });
                setTimeout(() => {
                    this.fixPositionOfId(); 
                }, 1000);
            })
            .catch(response => {
                this.$message.error(
                    this.i18n.community.MAILING_LIST.MAIL_ERROR
                );
            });
    },
    methods: {
        golink(path) {
            if (path && !path.includes("http")) {
                this.$router.push({
                    path: this.resolvePath(path)
                });
            }else if(path.includes("http")){
                window.open(path);
            }
        },
        go (name) {
            window.open('https://mailweb.openeuler.org/hyperkitty/list/' + name.toLowerCase() + '@openeuler.org/');
        },
        userSubscribe(userID) {
            window.open('https://mailweb.openeuler.org/postorius/lists/' + userID + '/');
        },
        fixPositionOfId(){
            var url=window.location.href;
            var positionId=url.split('#')[1];
            if(positionId){
                var target = document.getElementById(positionId);
                if (!target) {
                    return;
                }
                var targetOffset = target.parentNode.parentNode.parentNode.parentNode.offsetTop  + 1300;//首先算出id所在TR元素的偏移量+表格元素偏移量1300
                window.scrollTo({ 
                    top: targetOffset, 
                    behavior: "smooth" 
                });
            }else{
                return;
            }     
        },
    }
};
</script>

<style lang="less">
.mail-table table {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    
}
.mail-table .el-table td {
    border: none;
}
.mail-table .el-table th > .cell {
    padding-left: 30px;
}
.mail-table .el-table .cell {
    padding-left: 30px;
}
.mail-table .el-table thead {
    font-size: 16px;
    color: #000;
    
}
.mail-table .el-table__row td p,
.mail-table .el-table__row td p {
    color: #002fa7;
    font-size: 14px;
}
.mail-table .el-table td,
.el-table th.is-leaf {
    border: none;
}
.mail-table .el-table th.is-leaf {
    background: rgba(0, 0, 0, 0.05);
}
.mail-table .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgba(0, 0, 0, 0.03);
}
.mail-table .el-table--fit {
    margin: 0 auto;
}
.mail-table
    .el-table--enable-row-hover
    .el-table__body
    tr:nth-child(odd):hover
    > td {
    background: #fff;
}
.mail-subscribe .el-dialog {
    width: 1200px;
}
.mail-subscribe .el-dialog__title {
    text-align: center;
    font-size: 24px;
    display: block;
    margin: 40px auto 10px;
}
.mail-subscribe .el-form-item__content {
    text-align: center;
}
.mail-subscribe .el-input {
    width: 374px;
}
.mail-subscribe .el-input__inner {
    width: 374px;
}
.mail-subscribe .el-dialog__footer {
    text-align: center;
    padding: 10px 20px 60px;
}
.mail-subscribe .el-button--primary {
    background: #002fa7;
    border-color: #002fa7;
}
@media screen and (max-width: 768px) {
    .mail-table table {
        font-size: 12px;
    }
    .mail-table .el-table {
        width: 100%;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        
    }
    .mail-table .el-table td {
        border: none;
    }
    .mail-table .el-table th > .cell {
        padding-left: 30px;
    }
    .mail-table .el-table .cell {
        padding-left: 30px;
    }
    .mail-table .el-table thead {
        font-size: 16px;
        color: #000;
        
    }
    .mail-table .el-table__row td p,
    .mail-table .el-table__row td p {
        font-size: 12px;
    }
    .mail-table .el-table .cell:nth-child(1) {
        padding-left: 10px;
    }
    .mail-table .el-table th > .cell:nth-child(1) {
        padding-left: 10px;
    }
    .mail-table .el-table__row td:nth-child(1) .cell p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .mail-table .el-table__row td:nth-child(3) {
        overflow: hidden;
        display: -webkit-box;
        word-wrap: break-word;
        word-break: normal;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
}
</style>

<style lang="less" scoped>
.is-h5 {
    display: none;
}
.is-pc {
    display: block;
}
p {
    font-size: 16px;
    color: #000;
    
}
.maillist {
    width: 1200px;
    position: relative;
    margin: 80px auto 120px;
}
.maillist.en {
    margin-bottom: 200px;
}
.maillist-divider-mail {
    width: 2px;
    left: 50%;
    height: 620px;
    background-image: linear-gradient(
        to top,
        #002fa7 0%,
        #002fa7 50%,
        transparent 50%
    );
    background-size: 2px 11px;
    background-repeat: repeat-y;
    position: absolute;
}
.maillist-icon-comm {
    width: 0;
    height: 0;
    border-width: 15px;
    border-style: solid;
    border-color: #002fa7 transparent transparent transparent;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}
.step-right-box,
.step-left-box {
    width: 380px;
    height: 200px;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
}
.step-left-box {
    margin-right: 40px;
}
.step-right-box {
    margin-left: 40px;
}
.step-left-box.en-box1 {
    height: 260px;
}
.step-left-box.ru-box1 {
    height: 320px;
}
.step-left {
    z-index: 20;
}
.step-right {
    text-align: right;
    margin: -30px 0;
}
.step-left-num,
.step-right-num {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    background-color: #002fa7;
    display: inline-block;
}
.step-left-num span,
.step-right-num span {
    color: #fff;
    font-size: 20px;
    
}
.step-line {
    width: 107px;
    height: 2px;
    display: inline-block;
    vertical-align: middle;
    border-spacing: 24px;
    background-image: linear-gradient(
        to right,
        #002fa7 0%,
        #002fa7 50%,
        transparent 50%
    );
    background-size: 8px 2px;
    background-repeat: repeat-x;
}
.link-color {
    cursor: pointer;
    color: #002FA7;
}
.mail-box {
    padding: 0;
    height: 200px;
}
.mail-box p {
    margin: 0 20px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.5);
}
.inner-box {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.inner-box img {
    width: 110px;
    height: 110px;
    margin-left: 20px;
    flex-shrink: 0;
}
.en-title {
    display: block;
    color: #002FA7;
    margin-bottom: 10px;
    
}
.mail-table.is-pc {
    width: 1200px;
    margin: 0 auto 200px;
}
.list-name {
    cursor: pointer;
}
.description p {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 32px;
}
.el-form p {
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    margin: 60px auto 20px;
}
.user-icon {
    vertical-align: middle;
    margin-right: 10px;
}
.arch-link {
    text-decoration: none;
}
@media screen and (max-width: 1000px) {
    .is-h5 {
        display: block;
    }
    .is-pc {
        display: none;
    }
    h3 {
        font-size: 24px;
        line-height: 34px;
        text-align: center;
        margin: 40px 0 10px;
    }
    .maillist {
        width: 100%;
    }
    .mail-list {
        .mail-list-h5 {
            > li {
                min-height: 52px;
                display: flex;
                align-items: center;
                ul {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    li {
                        padding-left: 10px;
                        display: flex;
                        align-items: center;
                        height: 100%;
                    }
                    .color-blue {
                        color: #002fa7;
                        font-size: 12px;
                        
                    }
                    li:nth-child(1) {
                        flex-shrink: 1;
                        width: 80px;
                        span {
                            display: block;
                            width: 70px;
                            overflow: hidden; 
                            text-overflow: ellipsis; 
                            -o-text-overflow: ellipsis;
                            white-space:nowrap;
                        }
                    }
                    li:nth-child(2) {
                        flex-shrink: 1;
                        width: 80px;
                        span {
                            display: block;
                            width: 70px;
                            overflow: hidden; 
                            text-overflow: ellipsis; 
                            -o-text-overflow: ellipsis;
                            white-space:nowrap;
                        }
                    }
                    li:nth-child(3) {
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        color: #939393;
                        font-size: 12px;
                    }
                }
            }
            .heaed {
                ul li {
                    font-size: 14px !important;
                    color: #000 !important;
                }
            }
            > li:nth-child(odd) {
                background-color: #f2f2f2;
            }
        }
    }
    html[lang="ru"] .mail-list-h5 .heaed li:first-of-type {
        width: 111px;
    }
     html[lang="ru"] .mail-list-h5 .item li:nth-of-type(2) {
         text-align: right;
     }
    .step-right-box .inner-box.en-box1 {
        height: 200px;
    }
    .step-left-box .inner-box.en-box1 {
        height: 260px;
    }
    .maillist-divider-mail {
        display: none;
    }
    .step-line {
        display: none;
    }
    .maillist {
        margin-bottom: 80px;
        margin-top: 0;
    }
    .step-left,
    .step-right {
        margin: 40px 30px;
    }
    .step-right {
        text-align: center;
    }
    .step-top{
        margin: 0 auto 20px auto;
    }
    .step-top span {
        font-size: 17px;
        color: #000000;
        
        font-weight: bold;
    }
    .step-top .en-font {
        
    }
    .step-right-box,
    .step-left-box {
        width: 100%;
        height: 100%;
        box-shadow: none;
        border: none;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }
    .step-right-box {
        margin-left: 0;
    }
    .mail-box {
        height: 100%;
    }
    .mail-box p {
        text-align: justify;
        font-size: 14px;
        line-height: 24px;
    }
    .inner-box,
    .inner-box {
        width: 315px;
        height: 160px;
        margin: 0 auto;
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
    }
    .is-h5 div:last-of-type .step-left .ru-box .inner-box {
        height: 300px;
    }
    html[lang="ru"] .is-h5 div:last-of-type .step-right .inner-box {
        height: 200px;
    }
    .mail-table {
        padding: 0 30px;
        margin-bottom: 200px;
    .mail-table.is-pc {
        width: 1200px;
        margin: 0 auto 200px;
    }
    .list-name {
        cursor: pointer;
    }
    .arch-link {
        text-decoration: none;
    }
    .description p {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 32px;
    }
    .el-form p {
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        margin: 60px auto 20px;
    }
    .user-icon {
        vertical-align: middle;
        margin-right: 10px;
    }
    @media screen and (max-width: 1000px) {
        .is-h5 {
            display: block;
        }
        .is-pc {
            display: none;
        }
        h3 {
            font-size: 24px;
            line-height: 34px;
            text-align: center;
            margin: 40px 0 10px;
        }
        .maillist {
            width: 100%;
        }
        .maillist-divider-mail {
            display: none;
        }
        .step-line {
            display: none;
        }
        .maillist {
            margin-bottom: 80px;
            margin-top: 0;
        }
        .step-left,
        .step-right {
            margin: 40px 30px;
        }
        .step-right {
            text-align: center;
        }
        .step-left-num,
        .step-right-num {
            width: 48px;
            height: 48px;
            line-height: 48px;
            margin-bottom: 20px;
        }
        .step-left-num span,
        .step-right-num span {
            font-size: 18px;
        }
        .step-right-box,
        .step-left-box {
            width: 100%;
            height: 100%;
            box-shadow: none;
            border: none;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
        }
        .step-right-box {
            margin-left: 0;
        }
        .mail-box {
            height: 100%;
        }
        .mail-box p {
            text-align: justify;
            font-size: 14px;
            line-height: 24px;
        }
        .inner-box,
        .inner-box {
            width: 315px;
            height: 160px;
            margin: 0 auto;
            box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
        }
        .mail-table {
            padding: 0 30px;
        }
        .mail-table {
            margin-bottom: 80px;
        }
    }
    }
}
</style>