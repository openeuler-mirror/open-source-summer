<template>
    <div :class="'nav-fill '+(cookiesShow?'cookies-show':'')">
        <div class="nav-wrapper">
            <div class="nav-bar">
                <img
                    src="/openeuler-logo.png"
                    alt=""
                    class="nav-logo"
                    @click="goHome()"
                />
                <img
                    src="/openeuler-logo.png"
                    alt=""
                    class="nav-logo nav-logo-mobile"
                    @click="goHome()"
                />
                <ul :class="{'nav-menu': true,'lang-en': $lang == 'en'}">
                    <li
                        v-for="(item, index) in i18n.common.NAV_ROUTER_CONFIG"
                        :key="index"
                        @mouseenter="showSub(item.CLASS)"
                        @mouseleave="hideSub(item.CLASS)"
                        :class="item.CLASS"
                        :data-warden-title="'导航栏-'+item.NAME"
                    >
                        <a
                            @click="go(item)"
                            :class="{
                                'menu-link': true,
                                'menu-active': menuActiveFn(item)
                            }"
                            >{{ item.NAME }}
                            <span></span>
                            </a
                        >
                        <div
                            @mouseenter="showSub(item.CLASS)"
                            @mouseleave="hideSub(item.CLASS)"
                            class="sub-menu"
                            v-if="item.CHILDREN.length"
                        >
                            <ul class="sig-menu-content">
                                <li
                                    v-for="(subItem,
                                    subItemIndex) in item.CHILDREN"
                                    :key="subItemIndex"
                                    @click="go(subItem)"
                                    :data-warden-title="'子菜单-'+subItem.NAME"
                                >
                                    {{ subItem.NAME }}
                                </li>
                            </ul>
                            <span class="submenu-arrow"></span>
                        </div>
                    </li>
                </ul>
                <el-collapse-transition>
                    <ul
                        class="nav-menu-mobile"
                        v-show="menuMobileFlag"
                    >
                        <li
                            v-for="(item, index) in i18n.common.NAV_ROUTER_CONFIG"
                            :key="index"
                        >
                            <a
                                :class="{
                                    'menu-link': true,
                                    'menu-active': menuActiveFn(item) && !item.CHILDREN.length
                                }"
                                @click="toggleSub(item)"
                                >{{ item.NAME
                                }}<i
                                    :class="{
                                        'icon-arrow': true,
                                        'arrow-active':
                                            item.CLASS.indexOf('arrow-active') >
                                                -1 ||
                                            (menuActiveFn(item) && mobileActiveFlag)
                                    }"
                                    v-if="item.CHILDREN.length"
                                ></i
                            ></a>
                            <el-collapse-transition>

                                <ul
                                    class="sub-menu"
                                    v-show="item.CLASS.indexOf('arrow-active') > -1 ||
                                            (menuActiveFn(item) && mobileActiveFlag)"
                                >
                                    <li
                                        v-for="(subItem, subIndex) in item.CHILDREN"
                                        :class="{
                                            'sub-menu-color-active':
                                                $route.path.includes(resolvePath(subItem.PATH))
                                        }"
                                        :key="subIndex"
                                        @click="go(subItem)"
                                    >
                                        {{ subItem.NAME }}
                                    </li>
                                </ul>
                            </el-collapse-transition>
                        </li>
                        <li>
                            <a
                                :class="{
                                    'menu-link': true,
                                    'menu-active': gitteResourceFlag
                                }"
                                @click="toggleSubGitee"
                                >{{ i18n.common.GITTE }}<i
                                    :class="{
                                        'icon-arrow': true,
                                        'arrow-active': gitteResourceFlag
                                    }"
                                ></i
                            ></i>
                            </a>
                            <el-collapse-transition>

                                <ul
                                    class="sub-menu"
                                    v-show="gitteResourceFlag"
                                >
                                    <li
                                        v-for="(item, index) in i18n.common.GITTE_RESOURCE_LIST"
                                        :key="index"
                                        @click="open(item.URL)"
                                    >
                                        {{ item.NAME }}
                                    </li>
                                </ul>
                            </el-collapse-transition>
                        </li>
                    </ul>
                </el-collapse-transition>
                <div
                    :class="{ mask: menuMobileFlag }"
                    @click="menuMobileFlag = false"
                ></div>
                <div :class="{ 'search-mobile': true, show: searchFlag }">
                    <el-input
                        :placeholder="i18n.common.SEARCH_PLACE_HOLDER"
                        v-model="searchData"
                        @keyup.enter.native="toSearch"
                    >
                    <i
                        class="icon-search el-input__icon"
                        slot="suffix"
                        @click="toSearch"
                        >
                    </i>
                    </el-input>
                </div>
                <ul class="nav-other" v-show="!pcSearchFlag">
                    <li class="lang">
                        <span class="icon-lang"></span>
                        <ul>
                            <li
                                v-for="(item,
                                index) in i18n.common.LANG_LIST"
                                :key="index"
                                :class="i18n.common.LANG === item?'lang-list':''"
                                @click="toggleLang(item)"
                            >
                                {{ item }}
                            </li>
                            <span class="submenu-arrow"></span>
                        </ul>
                    </li>
                    <li>
                        <span>{{ i18n.common.CODE }}</span>
                        <ul>
                            <li
                                v-for="(item,
                                index) in i18n.common.GITTE_RESOURCE_LIST"
                                :key="index"
                                @click="open(item.URL)"
                            >
                                {{ item.NAME }}
                            </li>
                            <span class="submenu-arrow"></span>
                        </ul>
                    </li>
                    <li class="search" @click="pcSearchFlag=true">
                        <img src="/search.png" alt="" />
                    </li>
                </ul>
                <div class="search-input" v-show="pcSearchFlag">
                    <el-input
                        size="small"
                        :placeholder="i18n.common.SEARCH_PLACE_HOLDER"
                        v-model="searchData"
                        @blur="hidePcSearchInput"
                        @keyup.enter.native="toSearch"
                    >
                    <i
                        class="icon-search el-input__icon"
                        slot="suffix"
                        @click="toSearch"
                        >
                    </i>
                    </el-input>
                </div>
                <ul class="nav-other-mobile nav-other">
                    <li :class="['lang',menuMobileFlag?'del-hover':'']">
                        <span class="icon-lang"></span>
                        <ul>
                            <li
                                v-for="(item,
                                index) in i18n.common.LANG_LIST"
                                :key="index"
                                :class="i18n.common.LANG === item?'lang-list':''"
                                @click="toggleLang(item)"
                            >
                                {{ item }}
                            </li>
                            <span class="submenu-arrow"></span>
                        </ul>
                    </li>
                    <li
                        :class="{ search: true, 'search-active': searchFlag }"
                        @click="toggleSearchMobile"
                    >
                        <span class="icon-search"></span>
                    </li>
                    <li
                        :class="{
                            menu: true,
                            'menu-icon-active': menuMobileFlag
                        }"
                        @click="toggleMenuMobile"
                    >
                        <span class="icon-menu"></span>
                    </li>
                </ul>
            </div>
        </div>
        <div :class="'cookie-legal ' + (($lang==='ru')?'cookie-legal-ru':'')" v-if="cookiesShow">
            <template v-if="$lang!=='ru'">
                {{i18n.common.COOKIE_LEGAL_TEXT}}
                <a :href="'/'+$lang+'/other/privacy/'">{{i18n.common.COOKIE_LEGAL_LINK_TEXT}}</a>
            </template>
            <template v-else>
                {{i18n.common.COOKIE_LEGAL_TEXT}}
                <a :href="'/'+$lang+'/other/privacy/'">{{i18n.common.COOKIE_LEGAL_LINK_TEXT}}</a>
                {{i18n.common.COOKIE_LEGAL_TEXT_OTHER}}
                <a :href="'/'+$lang+'/other/privacy/'">{{i18n.common.COOKIE_LEGAL_LINK_TEXT_OTHER}}</a>
            </template>
            <img @click="close" src="/img/common/icon-close.png">
        </div>
    </div>
</template>

<script>
let cookieUtils = null;
export default {
    data() {
        console.log(this.i18n)
        return {
            toggleSubMenu: [],
            menuActivePath: "",
            menuMobileFlag: false,
            searchData: "",
            searchFlag: false,
            mobileActiveFlag : true,
            pcSearchFlag: false,
            gitteResourceFlag: false,
            i18n: this.i18n || {
                common : {}
            },
            cookiesShow: false
        };
    },
    mounted() {
        cookieUtils = require('./../../libs/cookie-utils').default;
        this.cookiesShow = !cookieUtils.get('key');
    },
    methods: {
        close() {
            cookieUtils.set('key', 'key', 30);
            this.cookiesShow = false;
        },
        hidePcSearchInput (){
            setTimeout(() => {
                this.pcSearchFlag = false;
            },100)
        },
        toSearch () {
            this.searchFlag = false;
            this.pcSearchFlag = false;
            this.$router.push({
                path: this.resolvePath('/other/search/'),
                query: {
                    keyword: encodeURI(this.searchData)
                }
            })
        },
        open (url) {
            window.open(url);
        },
        goHome() {
            const targetLocale = "/" + this.$lang + "/";
            this.$router.push(targetLocale);
            this.menuMobileFlag = false;
        },
        go(item) {
            console.log(item)
            if(item.IS_OPEN_WINDOW){
                window.open(this.$site.themeConfig.docsUrl + item.PATH);
                return;
            }
            if(item.IS_OPEN_MINISITE_WINDOW){
                window.open(item.PATH);
                return;
            }
            if (item.PATH) {
                this.$router.push({
                    path: this.resolvePath(item.PATH)
                });
                this.menuMobileFlag = false;
            }
        },
        showSub(toggleClass) {
            toggleClass.push("show-sub-menu");
        },
        hideSub(toggleClass) {
            toggleClass.pop();
        },
        toggleLang(item) {
            let lang = '';
            if(item === '中文') {
                lang = 'zh';
            }else if(item === 'English') {
                lang = 'en';
            }else {
                lang = 'ru';
            }
            window.localStorage.setItem("locale", lang);
            let currentLink = this.$page.path;
            let query = '';
            for(let key in this.$route.query) {
                if(query.includes('?')){
                    query +='&' + key + '=' +this.$route.query[key];
                } else {
                    query +='?' + key + '=' +this.$route.query[key];
                }
            }
            if(this.$page.path.includes('/docs/')){
                window.location.href = '/' + lang + '/documentation/';
                return;
            }
            currentLink = '/' + lang + currentLink.substring(3) + query;
            window.location.href = decodeURIComponent(currentLink);
        },
        menuActiveFn(item) {
            const $route = this.$route;
            let children = item.CHILDREN;
            if(item.OTHER_CHILDREN) {
                children = children.concat(item.OTHER_CHILDREN);
            }
            return (
                $route.path.includes(this.resolvePath(item.PATH)) ||
                children.some(
                    item =>
                        $route.path.includes(this.resolvePath(item.PATH))
                )
            );
        },
        toggleMenuMobile() {
            this.searchFlag = false;
            this.menuMobileFlag = !this.menuMobileFlag;
        },
        toggleSub(item) {
            if (item.PATH) {
                this.$router.push(this.resolvePath(item.PATH));
                this.menuMobileFlag = false;
                return;
            }
            if(this.mobileActiveFlag && this.menuActiveFn(item)){
                this.mobileActiveFlag = false;
                return;
            }
            if (item.CLASS.length) {
                item.CLASS.pop();
            } else {
                this.gitteResourceFlag = false;
                this.i18n.common.NAV_ROUTER_CONFIG.forEach(item => {
                    item.CLASS = [];
                });
                item.CLASS.push("arrow-active");
            }
            this.mobileActiveFlag = false;
        },
        toggleSubGitee () {
            this.mobileActiveFlag = false;
            if(this.gitteResourceFlag) {
                this.gitteResourceFlag = false;
            } else {
                this.i18n.common.NAV_ROUTER_CONFIG.forEach(item => {
                    item.CLASS = [];
                });
                this.gitteResourceFlag = true;
            }
        },
        toggleSearchMobile() {
            this.menuMobileFlag = false;
            this.searchFlag = !this.searchFlag;
        }
    }
};
</script>
<style lang="less" scoped>
.nav-fill {
    .search-mobile {
        .el-input {
            width: 80%;
            margin: 9px;
        }
    }

    .el-input__icon {
        display: inline-block;
        margin-top: 4px;
        cursor: pointer;
    }
}
.nav-other li span {
    font-size: 16px;

    font-weight: normal;
    color: #000000;
    line-height: 16px;
}
</style>
<style lang="less" scoped>
@keyframes fade-in {
    0% {
        opacity: 0;
        top: -60px;
    }
    100% {
        opacity: 1;
        top: 0;
    }
}
.menu-active {
    @media (min-width: 1000px) {
        & > span {
            transform:scale(1,1) !important;
        }
    }
    @media screen and (max-width: 1000px) {
        color: #0041bd;
    }
}
.menu-mobile-active {
    display: block !important;
}
.show {
    display: block !important;
}
.search-active {
    color: #0041bd;
}
.mask {
    position: fixed;
    top: 72px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
.nav-fill {
    height: 60px;
    @media screen and (max-width: 1000px) {
        height: 70px;
    }
    .nav-wrapper {
        background-color: #fff;
        animation: fade-in;
        animation-duration: 0.5s;
        height: 60px;
        width: 100%;
        position: fixed;
        z-index: 999;
        @media screen and (max-width: 1000px) {
            height: 70px;
        }
        .nav-bar {
            width: 1120px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media screen and (max-width: 1000px) {
                width: 100%;
                padding: 0 15px;
                box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
            }
            ul li {
                display: inline-block;
            }
            .nav-logo {
                flex-shrink: 0;
                margin-right: 28px;
                cursor: pointer;
                height: 60px;
            }
            .nav-logo-mobile {
                display: none;
                width: 142px;
                height: auto;
            }
            .nav-other-mobile {
                display: none !important;
                height: 100%;
                .menu-icon-active {
                    color: #0041bd;
                }
                li {
                    height: 100%;
                    line-height: 70px;
                    span {
                        vertical-align: middle;
                    }
                    margin-left: 20px;
                    cursor: pointer;
                }
                .lang {
                    font-size: 16px;
                }
                .search {
                    font-size: 22px;
                }
                .menu {
                    font-size: 20px;
                }
            }
            .nav-menu-mobile {
                max-height: calc(100vh - 70px);
                overflow-y: scroll;
                background-color: #fff;
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                padding: 10px 30px;
                z-index: 998;
                & > li {
                    display: block;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
                    padding: 10px 0;
                    &:last-child {
                        border-bottom: none;
                        margin-bottom: 0;
                    }
                    a {
                        border: none;
                        font-size: 16px;

                        height: 26px;
                        line-height: 26px;
                        display: inline-block;
                        width: 100%;
                        position: relative;
                        .arrow-active {
                            color: #0041bd;
                            transform: rotate(90deg);
                        }
                        i {
                            position: absolute;
                            right: 7px;
                            top: 5px;
                        }
                    }
                    .sub-menu {
                        margin-left: 15px;
                        .sub-menu-color-active {
                            color: #0041bd;
                        }
                        li {
                            display: block;
                            height: 26px;
                            line-height: 26px;
                            font-size: 14px;

                            color: rgba(0, 0, 0, 0.7);
                            margin: 6px 0;
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
            .lang-en {
                & > li {
                    padding: 0 15px !important;
                    &:first-child {
                        padding-left: 20px !important;
                    }
                }
            }
            .nav-menu {
                height: 100%;
                flex: 3;

                color: #000;
                font-size: 16px;
                display: flex;
                align-items: center;
                @media screen and (max-width: 1000px) {
                    display: none;
                }
                @media screen and (max-width: 1280px) {
                    flex:2;
                }
                .menu-link span {
                    display: block;
                    transform:scale(0,0);
                    position: relative;
                    width: 100%;
                    height: 4px;
                    border-radius: 4px;
                    background-color: #002FA7;
                    top: -8px;
                    transition: all .3s;
                }
                .show-sub-menu {
                    .sub-menu {
                        transform: translate(-50%) scaleY(1);
                        top: 60px;
                    }
                }
                .sub-menu {
                    background-color: #fff;
                    position: absolute;
                    left: 50%;
                    white-space: nowrap;
                    display: table;
                    transition: all .3s;
                    transform-origin: top;
                    transform: translate(-50%) scaleY(0);
                    border: 1px solid #002fa7;
                    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                    font-size: 14px;
                    .sig-menu-content {
                        cursor: pointer;
                        padding: 16px;
                        text-align: center;
                        line-height: 14px;
                        li {
                            color: unset;
                            cursor: pointer;
                            display: block;
                            margin-bottom: 16px;
                            &:hover {
                                color: #0041bd;
                            }
                        }
                        li:last-child {
                            margin-bottom: 0;
                        }
                    }
                    .submenu-arrow {
                        position: absolute;
                        width: 22px;
                        height: 13px;
                        top: -6px;
                        left: 50%;
                        margin-left: -11px;
                        background: url('/submenu-arrow.svg') no-repeat;
                        background-position: 50% 43%;
                    }
                }
                & > li {
                    position: relative;
                    padding: 0 20px;
                    height: 100%;
                    line-height: 60px;
                    &:hover {
                        & > a {
                            color: #002fa7;
                        }
                    }
                    @media screen and (max-width: 1000px) {
                        line-height: 70px;
                    }
                    & > a {
                        display: inline-block;
                        height: 100%;
                        cursor: pointer;
                        &:hover {
                            span {
                                transform:scale(1,1);
                            }
                        }
                    }
                }
            }
            .nav-other {
                flex: 1;
                height: 100%;
                font-size: 16px;
                color: #000;

                display: flex;
                justify-content: flex-end;
                .lang {
                    .icon-lang {
                        display: block;
                        width: 22px;
                        height: 22px;
                        background-image: url('/lang.png');
                        background-size: contain;
                    }
                    font-family: Roboto !important;
                    &>ul .lang-list {
                        color: #0041bd;
                    }
                }
                @media screen and (max-width: 1000px) {
                    display: none;
                }
                @media screen and (max-width: 1280px) {
                    justify-content: flex-start;
                }
                & > li {
                    position: relative;
                    width: 22px;
                    margin-left: 22px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    &:nth-of-type(2) {
                        width: 32px;
                    }
                    img {
                        width: 100%;
                    }
                    &:hover {
                        ul {
                            transform: translate(-50%) scaleY(1);
                            top: 60px;
                        }
                    }
                    ul {
                        top: 60px;
                        background-color: #fff;
                        position: absolute;
                        left: 50%;
                        white-space: nowrap;
                        display: table;
                        transition: all .3s;
                        transform-origin: top;
                        transform: translate(-50%) scaleY(0);
                        border: 1px solid #002fa7;
                        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
                        border-radius: 5px;
                        font-size: 14px;
                        cursor: pointer;
                        padding: 16px;
                        text-align: center;
                        line-height: 14px;
                        li {
                            cursor: pointer;
                            display: block;
                            line-height: 25px;
                            &:hover {
                                color: #0041bd;
                            }
                        }
                        li:nth-child(3) {
                            margin-bottom: 0;
                        }
                        .submenu-arrow {
                            position: absolute;
                            width: 22px;
                            height: 13px;
                            top: -6px;
                            left: 50%;
                            margin-left: -11px;
                            background: url('/submenu-arrow.svg') no-repeat;
                            background-position: 50% 43%;
                        }
                        &:hover {
                            transform: translate(-50%) scaleY(1);
                            top: 60px;
                        }
                    }
                }
            }
            .search-input {
                flex-shrink: 0;
                width: 240px;
                .el-input__icon{
                    line-height: 29px;
                    cursor: pointer;
                }
            }
            .search-mobile {
                display: none;
                text-align: center;
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: #fff;
                .icon-search {
                    font-size: 20px;
                }
            }
            @media screen and (max-width: 1000px) {
                .nav-logo {
                    display: none;
                }
                .nav-logo-mobile {
                    display: inline-block;
                }
                .nav-other-mobile {
                    display: flex !important;
                    flex: 0;
                    font-family: Roboto !important;
                    .lang>ul {
                        border-bottom-right-radius:0;
                        border-bottom-left-radius:0;
                        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                        border: 1px solid rgba(0, 47, 167, 0.5);
                        padding: 20px;
                        li {
                            margin: 16px 0 0 0;
                            height: 16px;
                            line-height: 16px;
                            font-size: 16px;
                            font-family: Roboto !important;
                            &:first-of-type {
                                margin: 0;
                            }
                        }
                    }
                    .del-hover>ul {
                        display: none;
                    }
                }
            }
        }
    }
}
.cookies-show {
    height: 120px;
    @media screen and (max-width: 1000px) {
        height: 130px;
    }
    .nav-wrapper {
        top: 60px;
        .nav-menu-mobile,.search-mobile,.mask {
            top: 130px !important;
        }
    }
    .cookie-legal {
        line-height: 60px;
        z-index: 999;
        width: 100%;
        position: fixed;
        height: 60px;
        text-align: center;
        background-color: #f3f3f3;
        color: #333;
        font-size: 14px;
        @media screen and (max-width: 1000px) {
            font-size: 12px;
            line-height: 30px;
        }
        a {
            cursor: pointer;
            text-decoration: solid;
        }
        img {
            cursor: pointer;
            vertical-align: middle;
            margin-left: 20px;
            @media screen and (max-width: 1000px) {
                width: 20px;
                height: 20px;
                margin-left: 0;
            }
        }
    }
    .cookie-legal-ru {
        line-height: 30px;
        @media screen and (max-width: 1000px) {
            line-height: 10px;
        }
    }
}
@media screen and (min-width: 1000px) and (max-width: 1120px){
    .nav-bar {
        width: 100% !important;
    }
}
</style>
