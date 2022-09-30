<template>
    <div class="sig-list-content" v-loading.fullscreen="loading">
        <common-banner
            :pc-src="'/img/sig/sig-banner.png'"
            :mobile-src="'/img/sig/sig-banner.png'"
            :inside-name="'SIG'"
            :outside-name="'SIG'"
        >
            <div slot="pc-slot" class="paragraph">
                <div>{{ i18n.sig.SIG_DESCRIPTION.P1 }}</div>
                <div>{{ i18n.sig.SIG_DESCRIPTION.P2 }}</div>
            </div>
            <div slot="mobile-slot" class="mobile-paragraph">
                <div>{{ i18n.sig.SIG_DESCRIPTION.P1 }}</div>
                <div>{{ i18n.sig.SIG_DESCRIPTION.P2 }}</div>
            </div>
        </common-banner>
        <ul class="instructions">
            <li>
                {{ i18n.sig.SIG_DESCRIPTION.LI1 }}
            </li>
            <li>
                {{ i18n.sig.SIG_DESCRIPTION.LI2 }}
            </li>
            <li>
                {{ i18n.sig.SIG_DESCRIPTION.LI3 }}
            </li>
        </ul>
        <el-tabs v-model="activeName">
            <el-tab-pane label="SIG List" name="first" class="tabTitle">
                <el-table
                    :data="list"
                    stripe
                    :default-sort="{ prop: 'group_name', order: 'desc' }"
                >
                    <el-table-column
                        prop="group_name"
                        :label="i18n.sig.SIG_LIST.NAME"
                    >
                        <template slot-scope="scope">
                            <a @click="toDetail(scope.row)">{{
                                scope.row.group_name
                            }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column :label="i18n.sig.SIG_LIST.GITEE_PAGE">
                        <template slot-scope="scope">
                            <a :href="scope.row.home_page" target="_blank"
                                ><img src="/img/sig/homePageLogo.png"
                            /></a>
                        </template>
                    </el-table-column>
                    <el-table-column :label="i18n.sig.SIG_LIST.MAIL">
                        <template slot-scope="scope">
                            <a
                                :href="'mailto:' + scope.row.maillist"
                                target="_blank"
                            >
                                {{ scope.row.maillist }}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="irc" :label="i18n.sig.SIG_LIST.IRC">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="SIG Board" name="second" class="tabTitle" lazy>
                <ul class="sig-list" v-fade v-if="list.length">
                    <li class="sig-item fade-in" v-for="(item, index) in list">
                        <h2 @click="toDetail(item)">{{ item.group_name }}</h2>
                        <ul class="info-list">
                            <li class="mibile-hidden">
                                <img src="/img/sig/home.svg" alt="" />
                                <span
                                    ><a
                                        target="_blank"
                                        :href="item.home_page"
                                        >{{ i18n.sig.SIG_LIST.HOME_PAGE }}</a
                                    ></span
                                >
                            </li>
                            <li class="sig-mail">
                                <img src="/img/sig/mail.svg" alt="" />
                                <span
                                    >{{ i18n.sig.SIG_LIST.MAIL
                                    }}{{ $isCn ? "：" : ": "
                                    }}<a :href="'mailto:' + item.maillist">{{
                                        item.maillist
                                    }}</a></span
                                >
                            </li>
                            <li>
                                <img src="/img/sig/chanel.svg" alt="" />
                                <span
                                    >{{ i18n.sig.SIG_LIST.IRC
                                    }}{{ $isCn ? "：" : ": "
                                    }}{{ item.irc }}</span
                                >
                            </li>
                            <li>
                                <img src="/img/sig/members.svg" alt="" />
                                <span>{{ i18n.sig.SIG_LIST.MANAGER }}</span>
                            </li>
                        </ul>
                        <ul class="administrators">
                            <li
                                v-for="(avatarItem, avatarIndex) in item.owners"
                                v-if="avatarIndex < 4"
                            >
                                <img
                                    :src="avatarItem.avatar_url"
                                    class="avatar"
                                />
                                <span
                                    class="name"
                                    :title="avatarItem.gitee_id"
                                    >{{ avatarItem.gitee_id }}</span
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="SIG Landscape" name="third" class="tabTitle">
                <div class="landscape">
                    <div
                        class="sig-category-wrapper"
                        v-for="item in sigCategoryList"
                    >
                        <h2>{{ item.CATEGORY_NAME }}</h2>
                        <ul class="sig-category-list">
                            <li
                                class="sig-category-item"
                                v-for="subItem in item.SUB_LIST"
                                :style="{ borderColor: subItem.COLOR }"
                            >
                                <h3 :style="{ backgroundColor: subItem.COLOR }">
                                    {{ subItem.SUB_CATEGORY_NAME }}
                                </h3>
                                <ul class="sig-list">
                                    <li
                                        @click="cateToSigDetail(item.NAME)"
                                        :style="{ borderColor: subItem.COLOR }"
                                        :class="item.IS_WIDER ? 'wider' : ''"
                                        v-for="item in subItem.LIST"
                                    >
                                        {{ item.NAME }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { sigList } from "../../api/sig";
import commonBanner from "./../common/banner.vue";
import sigCategoryList from "./../../data/sig/sig-list";
let that = null;
let remoteMethods = {
    getSigList() {
        that.loading = true;
        sigList()
            .then(data => {
                data = localMethods.shuffle(data);
                data.forEach(item => {
                    item.owners = localMethods.shuffle(JSON.parse(item.owners));
                });
                that.list = data;
                that.loading = false;
            })
            .catch(data => {
                that.$message.error(data);
                that.loading = false;
            });
    }
};
let localMethods = {
    shuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
};
export default {
    data() {
        that = this;
        return {
            list: [],
            loading: false,
            activeName: "first",
            sigCategoryList: []
        };
    },
    created() {
        this.sigCategoryList = sigCategoryList[this.$lang].SIG_LIST;
        remoteMethods.getSigList();
    },
    methods: {
        toDetail(item) {

            this.$router.push({
                path: this.resolvePath("/sig/sig-list/sig-detail.html"),
                query: {
                    id: item.id,
                    name: item.group_name,
                    mail: item.maillist
                }
            });

        },
        cateToSigDetail(name) {

            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].group_name === name) {
                    this.$router.push({
                        path: this.resolvePath("/sig/sig-list/sig-detail.html"),
                        query: {
                            id: this.list[i].id,
                            name: this.list[i].group_name,
                            mail: this.list[i].maillist
                        }
                    });
                    break;
                }
            }
            
        }
    },
    components: {
        commonBanner
    }
};
</script>
<style lang="less" scoped>
.paragraph {
    position: absolute;
    left: 0;
    top: 228px;
    width: calc(100% - 500px);
    font-size: 16px;
    line-height: 32px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.85);
}
.mobile-paragraph {
    margin: 0 -30px !important;
    line-height: 24px;
    font-size: 14px;
}
a {
    color: #002fa7;
    text-decoration: none;
    cursor: pointer;
}
.instructions {
    margin-bottom: 40px;
}
.instructions li {
    list-style-type: disc;
    margin-left: 17px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
    line-height: 32px;
    @media (max-width: 1000px) {
        font-size: 14px;
    }
}
/deep/.el-tabs__header {
    margin-bottom: 30px;
    @media (max-width: 1000px) {
        margin-bottom: 10px;
        display: none;
    }
}
/deep/.el-tabs__content {
    overflow: visible;
}
/deep/.el-tabs__item {
    font-size: 20px;
    line-height: 30px;
    color: rgba(0, 0, 0, 0.5) !important;
    @media (max-width: 1000px) {
        font-size: 18px;
    }
}
/deep/.is-active {
    color: #000000 !important;
}
/deep/.el-table {
    margin-bottom: 200px;
    thead {
        font-size: 16px;
        color: #000000;
        th {
            background-color: rgba(0, 0, 0, 0.05);
        }
        @media (max-width: 1000px) {
            font-size: 14px;
        }
    }
}
/deep/ .el-table_1_column_2 {
    text-align: left;
    @media (max-width: 1000px) {
        text-align: center;
    }
}

.sig-list-content /deep/.el-tabs__nav-wrap::after {
    //tab下划线隐藏
    position: static !important;
}
.sig-list-content {
    width: 1120px;
    margin: 0 auto;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 15px;
    }
    .sig-list-banner {
        height: 600px;
        background-color: #002fa7;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .sig-list-banner-mobile {
        display: none;
        margin-top: 40px;
        h3 {
            text-align: center;
            font-size: 24px;

            margin-bottom: 10px;
            height: 34px;
            line-height: 34px;
        }
        div {
            width: 100%;
            height: 200px;
            background-color: #002fa7;
        }
        @media (max-width: 1000px) {
            display: block;
        }
    }
    .sig-list {
        column-count: 2;
        column-gap: 50px;
        margin-bottom: 200px;
        @media (max-width: 1000px) {
            margin-top: 0px;
            column-count: 1;
            column-gap: 0;
            margin-bottom: 40px;
            padding: 0 15px;
        }
        .sig-item {
            > h2 {
                word-break: keep-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                &:hover {
                    color: #002fa7;
                }
            }
            .sig-mail {
                word-break: keep-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            width: 530px;
            box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-bottom: 60px;
            break-inside: avoid;
            transform: translate3d(0, 0, 0);
            padding: 36px 54px;
            @media (max-width: 1000px) {
                width: 100%;
                padding: 30px 30px 0 30px;
                margin-bottom: 40px;
            }
            .info-list {
                @media (max-width: 1000px) {
                    margin-top: 10px;
                    margin-bottom: 8px;
                }
                .mibile-hidden {
                    @media (max-width: 1000px) {
                        display: none;
                    }
                }
                li {
                    margin-top: 26px;

                    font-size: 16px;
                    line-height: 20px;
                    @media (max-width: 1000px) {
                        margin-top: 10px;
                        font-size: 14px;
                        line-height: 24px;
                    }
                    img {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        vertical-align: middle;
                        margin-top: -4px;
                        @media (max-width: 1000px) {
                            display: none;
                        }
                    }
                }
            }
            .administrators {
                padding: 0 10px;
                display: flex;
                justify-content: start;
                flex-wrap: wrap;
                @media (max-width: 1000px) {
                    padding: 0;
                }
                li {
                    flex: 0 0 25%;
                    text-align: center;
                    margin-top: 16px;
                    @media (max-width: 1000px) {
                        flex: 0 0 33.3333333333333%;
                        margin-bottom: 20px;
                        margin-top: 8px;
                        font-size: 12px;
                    }
                    img {
                        width: 70px;
                        height: 70px;
                        display: block;
                        margin: 0 auto;
                        border-radius: 50%;
                        @media (max-width: 1000px) {
                            width: 36px;
                            height: 36px;
                        }
                    }
                    span {
                        margin-top: 12px;
                        flex-shrink: 0;
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        @media (min-width: 1000px) {
                            width: 95px;
                        }
                        @media (max-width: 1000px) {
                            margin-top: 5px;
                            width: 85px;
                        }
                    }
                }
            }
            a {
                color: #002fa7;
                text-decoration: none;
            }
            h2 {
                font-size: 30px;

                @media (max-width: 1000px) {
                    font-size: 18px;
                    line-height: 26px;

                    color: #002fa7;
                }
            }
        }
    }
    .landscape {
        margin-bottom: 200px;
        .sig-category-wrapper {
            margin-bottom: 50px;
            h2 {
                font-size: 24px;
                line-height: 26px;
                color: #000;
                font-weight: normal;
                margin-bottom: 30px;
            }
            .sig-category-list {
                column-count: 2;
                column-gap: 20px;
                .sig-category-item {
                    break-inside: avoid;
                    transform: translate3d(0, 0, 0);
                    border: 1px solid;
                    border-radius: 4px;
                    margin-bottom: 20px;
                    h3 {
                        font-size: 16px;
                        line-height: 26px;
                        color: #fff;
                        font-weight: normal;
                        text-align: center;
                        line-height: 42px;
                        height: 42px;
                    }
                    .sig-list {
                        padding: 20px 10px 10px 20px;
                        margin-bottom: unset;
                        column-count: unset;
                        column-gap: unset;
                        display: flex;
                        flex-wrap: wrap;
                        li {
                            flex-shrink: 0;
                            width: 162px;
                            text-align: center;
                            color: #000;
                            font-size: 14px;
                            line-height: 30px;
                            height: 32px;
                            border: 1px solid;
                            border-radius: 4px;
                            margin: 0 10px 10px 0;
                            cursor: pointer;
                        }
                        .wider {
                            width: 248px;
                        }
                    }
                }
            }
        }
    }
}
</style>
