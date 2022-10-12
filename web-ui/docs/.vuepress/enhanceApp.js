import ElementUI from 'element-ui';
import './public/style/theme/index.css';
import './public/style/base.css';
import enlocale from 'element-ui/lib/locale/lang/en';
import rulocale from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';
import'./public/style/markdown.less';
import directive from './libs/directive';
import VueLazyload from 'vue-lazyload';
// import tracing from 'web-tracing'
import eularTrace from '../../packages/eularTrace/eularTrace'


export default ({
    Vue,
    siteData,
    isServer
}) => {
    Vue.directive('fade', directive.fade);
    Vue.use(VueLazyload, {
        preLoad: 1.3,
        attempt: 1
    });
    Vue.use(eularTrace, {
        requestUrl: 'http://123456webservertest/traceTest',
        appName: 'website-v2',
        event: true,
        performance: true,
        pv: true,
        error: true,
    });
    if(!isServer){
        window.global = (() => {
                if (typeof self !== 'undefined') { return self; }
                if (typeof window !== 'undefined') { return window; }
                if (typeof global !== 'undefined') { return global; }
                if (typeof globalThis !== 'undefined') { return globalThis; }
                throw new Error('unable to locate global object');
        })();
        let $lang = '';
        if(window.location.href.includes('/en/')) {
            $lang = 'en';
        }else if(window.location.href.includes('/zh/')) {
            $lang = 'zh';
        }else {
            $lang = 'ru';
        }
        let screenWidth = document.body.clientWidth;
        Vue.prototype.isShowH5 = false;
        Vue.prototype.paginationLayout = "total,prev, pager, next"
        if(screenWidth <= 1000){
            Vue.prototype.isShowH5 = true;
            Vue.prototype.paginationLayout = "total, prev, jumper, next"
        }
        if (window.location.href.includes('/en/')) {
            Vue.use(ElementUI);
            locale.use(enlocale);
            Vue.prototype.$isCn = false;
        } else if(window.location.href.includes('/ru/')) {
            Vue.use(ElementUI);
            locale.use(rulocale);
            Vue.prototype.$isCn = false;
        }else {
            Vue.use(ElementUI);
            Vue.prototype.$isCn = true;
        }
        let pagesArr = [];
        siteData.pages.forEach(item => {
            if($lang === 'zh' && item.path.includes('/zh/')) {
                pagesArr.push(item);
            } else if($lang === 'en' && item.path.includes('/en/')) {
                pagesArr.push(item);
            }else if($lang === 'ru' && item.path.includes('/ru/')){
                pagesArr.push(item);
            }
        })
        Vue.prototype.$sitePages = pagesArr;
        let instance = new Vue({
            data () {
                return {
                    i18n: siteData.themeConfig.locales[$lang].lang
                }
            }
        })
        Vue.prototype.i18n = instance.i18n;
    }else{
        Vue.use(ElementUI);
    }
    let checkLoop = false;
    Vue.mixin({
        data () {
            return isServer ? {i18n: {}} : {}
        },
        mounted () {
            if(this.$router && this.$frontmatter) {
                document.title = this.$frontmatter.title || 'openEuler';
            }
        },
        created () {
            if(!checkLoop){
                checkLoop = true;
                const originalPush = this.$router.push;
                this.$router.push = function push(location) {
                    return originalPush.call(this, location).catch(err => err);
                }
            }
            if(isServer){
                this.i18n = siteData.themeConfig.locales[this.$lang].lang
            }
        },
        methods : {
            resolvePath(path){
                if(path){
                    let targetLocale = '';
                    if(this.$lang === 'en') {
                        targetLocale = '/en';
                    }else if(this.$lang === 'zh') {
                        targetLocale = '/zh';
                    }else {
                        targetLocale = '/ru';
                    }
                    return targetLocale + path;    
                }
                
            }
        }
    })
    
    
}