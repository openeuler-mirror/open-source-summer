/**
 * @file  镜像获取接口配置文件
 * */

 import appAjax from '../libs/ajax-utils';
 const mirrorApi = '-mirror';

 export const getAllMirror = () => {
    return new Promise((resolve,reject) => {
        appAjax.postJson({
            otherBaseUrl: mirrorApi,
            url: '/?mirrorstats=true',
            type: 'get',
            success(result) {
                if(result) {
                    resolve(result);
                    return;
                }
                reject(result);
            },
            error(msg) {
                reject(msg);
            }
        })
    });
 };
 //百度地图ak注册脚本
 export const loadBMap = (ak)=> {
    return new Promise(function(resolve, reject) {
        if (typeof BMap !== 'undefined') {
            resolve(BMap)
            return true
        }
        window.onBMapCallback = function() {
            resolve(BMap)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
            'https://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=onBMapCallback'
        script.onerror = reject
        document.head.appendChild(script)
    })
}
// 镜像选择
export const selectMirror = ({version}) => {
    let env = window.location.host;
    let url = null;
    env.includes('openeuler') ? url = `https://api.openeuler.org/mirrors/openEuler-${version}/ISO/`:url =`/openEuler-${version}/ISO/`
    return new Promise((resolve,reject) => {
        appAjax.postJson({
            otherBaseUrl: mirrorApi,
            url: url,
            type: 'get',
            success(result) {
                if(result) {
                    resolve(result);
                    return;
                }
                reject(result);
            },
            error(msg) {
                reject(msg);
            }
        })
    });
 };