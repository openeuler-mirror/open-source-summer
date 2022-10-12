<template>
    <div class="safety-bulletin-content" v-loading.fullscreen="loading">
        <div class="breadcrumb" @click="to">{{i18n.security.SECURITY_ADVISORIES}} \</div>
        <div class="bulletinInner">
            <h1>{{i18n.security.SECURITY_ADVISORIES}}{{i18n.security.DETAIL}}</h1>
            <h2>{{detailData.securityNoticeNo}}</h2>
            <p>{{i18n.security.SYNOPSIS}}: {{detailData.summary}}</p>
            <p>{{i18n.security.RELEASE_DATE}}: {{detailData.announcementTime}}</p>
            <div class="tabs">
                <div v-for="item in tabsList" :class="{'tab-item': true, 'active': item.id===curTab}" @click="curTab=item.id">{{item.name}}</div>
            </div>
            <div v-show="curTab===1">
                <h2>{{i18n.security.BRIEF_INTRODUCTION}}</h2>
                <p>{{detailData.introduction}}</p>
                <h2>{{i18n.security.SEVERITY}}</h2>
                <p>{{detailData.type}}</p>
                <h2>{{i18n.security.THEME}}</h2>
                <p>{{detailData.subject}}</p>
                <h2>{{i18n.security.DESCRIPTION}}</h2>
                <p>{{detailData.description}}</p>
                <h2>{{i18n.security.AFFECTED_COMPONENTS}}</h2>
                <p>{{detailData.affectedComponent}}</p>
                <h2>CVE</h2>
                <div class="link-group">
                    <a v-for="(item, index) in detailData.cveId.split(';')" :key="index" @click="go(item)">{{item}}</a>    
                </div>
                <h2>{{i18n.security.REFERENCE_DOCUMENTS}}</h2>
                <div class="link-group">
                    <a :href="item.url" target="_blank" v-for="(item, index) in detailData.referenceList">{{item.url}}</a>    
                </div>    
            </div>
            <div v-show="curTab===2">
                <div class="package-list-wraper" v-for="item in detailData.packageHelperList">
                    <h1>{{item.productName}}</h1>
                    <ul class="package-list" v-for="item1 in item.child">
                        <li class="item">
                            <ul>
                                <li>{{item1.productName}}</li>
                            </ul>
                        </li>
                        <li class="item" v-for="item2 in item1.child">
                            <ul>
                                <li>
                                    {{item2.packageName}}
                                </li>
                                <li v-if="item2.sha256">
                                    {{item2.sha256}}
                                </li>
                            </ul>
                        </li>
                    </ul>    
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script>
import { securityDetail } from "../../api/security"
let that = null;

const locationMethods = {
    getSecurityDetail () {
        that.loading = true;
        securityDetail({
            sn: that.$route.query.id
        })
        .then(data => {
            that.loading = false;
            if(data){
                data.cveId = data.cveId.replace(/\n/g, '');
                data.packageName = data.packageName.replace(/\n/g, '');
                that.detailData = data;
            }
        })
        .catch(data => {
            that.$message.error(data);
            that.loading = false;
        });
    }
}
export default {
    data() {
        that = this;
        return {
            loading: false,
            detailData: {
                cveId: '',
                packageName: '',
                referenceDocuments: ''
            },
            tabsList: [
                {
                    name: that.i18n.security.OVERVIEW,
                    id: 1
                },
                {
                    name: that.i18n.security.UPDATED_PACKAGES,
                    id: 2
                }
            ],
            curTab: 1
        };
    },
    created () {
        locationMethods.getSecurityDetail();
    },
    methods: {
        to () {
            this.$router.push({
                path: this.resolvePath('/security/safety-bulletin/')
            })
        },
        go (id) {
            let packageName = this.detailData.affectedComponent
            this.$router.push({
                path: this.resolvePath('/security/cve/detail.html'),
                query: {id ,packageName}
            })
        }
    }
};
</script>
<style lang="less" scoped>
.safety-bulletin-content {
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 200px;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
        margin-bottom: 80px;
    }
    .breadcrumb {
        margin-top: 34px;
        margin-bottom: 16px;
        font-size: 20px;
        color: #002fa7;
        line-height: 20px;
        
        cursor: pointer;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .bulletinInner {
        .tabs {
            margin-bottom: 40px;
            .tab-item {
                display: inline-block;
                font-size: 20px;
                line-height: 40px;
                color: rgba(0, 0, 0, .5);
                margin-right: 50px;
                cursor: pointer;
            }
            .active {
                color: #000;
                border-bottom: 2px solid #002fa7;
            }
            @media (max-width: 1000px) {
                margin-bottom: 30px;
                .tab-item {
                    font-size: 16px;
                    line-height: 36px;
                    margin-right: 40px;
                }
            }
        }
        .package-list-wraper {
            &>h1 {
                font-size: 24px;
                font-weight: normal;
                line-height: 24px;
                margin-bottom: 30px;
                @media (max-width: 1000px) {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
            }
        }
        .package-list {
            margin-bottom: 40px;
            @media (max-width: 1000px) {
                margin-bottom: 30px;
            }
            .item:first-child {
                li {
                color: #000 !important;
                font-size: 16px !important;
                }
            }
            .item:first-child > ul {
                height: 60px;
                @media (max-width: 1000px) {
                    height: 50px;
                }
            }
            .item > ul {
                height: 46px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
                @media (max-width: 1000px) {
                    height: 38px !important;
                }
                li {
                    color: rgba(0, 0, 0, .5) !important;
                }
                li:nth-child(2) {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
                text-align: center;
                }
                li:nth-child(3) {
                font-size: 14px;
                text-align: right;
                color: rgba(0, 0, 0, 0.85);
                }
                li:nth-child(4) {
                font-size: 14px;
                text-align: right;
                color: rgba(0, 0, 0, 0.85);
                }
                li {
                flex: 1;
                span {
                    display: none;
                }
                }
            }
            .item {
                border-top: 1px solid rgba(0, 0, 0, .15);
            }
            .item:first-child {
                border: none;
            }
            @media (max-width: 1000px) {
                .item > ul {
                    height: 52px;
                    font-size: 12px;
                    &:first-child {
                        font-size: 14px;
                    }
                    li:first-child {
                        font-size: 12px;
                        color: #000;
                    }
                }
                margin-bottom: 30px;
                .item:first-child {
                    li {
                        color: #000 !important;
                        font-size: 14px !important;
                    }
                }
            }
        }
        h1 {
            font-size: 36px;
            margin-bottom: 104px;
            @media (max-width: 1000px) {
                margin-top: 40px;
                margin-bottom: 30px;
                font-size: 16px;
                line-height: 26px;
            }
        }
        h2 {
            margin-bottom: 20px;
            
            font-size: 24px;
            font-weight: normal;
            @media (max-width: 1000px) {
                font-size: 14px;
                line-height: 24px;
                
            }
        }
        p {
            color: rgba(0, 0, 0, .5);
            font-size: 14px;
            line-height: 32px;
            margin-bottom: 40px;
            
            @media (max-width: 1000px) {
                margin-bottom: 30px;
                font-size: 14px;
                line-height: 24px;
            }
        }
        a {
            color: #002fa7;
            text-decoration: none;
            font-size: 14px;
            line-height: 32px;
            
            cursor: pointer;
            @media (max-width: 1000px) {
                line-height: 24px;
            }
        }
        h2:last-child {
            margin-top: 40px;
            @media (max-width: 1000px) {
                margin-top: 30px;
            }
        }
        .link-group {
            margin-bottom: 40px;
            @media (max-width: 1000px) {
                margin-bottom: 30px;
            }
            a {
                display: block;
            }
        }
    }
    p {
        white-space: pre-wrap;
        text-align: justify;
    }
}
</style>
