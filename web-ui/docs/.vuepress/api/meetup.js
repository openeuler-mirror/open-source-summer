/**
 * @file  沙龙页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const sigApi = '-sig';
export const eventsList = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: sigApi,
            url: '/activities/',
            type: 'get',
            success(result) {
                if (result) {
                    resolve(result);
                    return;
                }
                reject(result);
            },
            error(msg) {
                reject(msg);
            }

        });

    });
};

export const eventDetail = (id) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: sigApi,
            url: `/activity/${id}/`,
            type: 'get',
            success(result) {
                if (result) {
                    resolve(result);
                    return;
                }
                reject(result);
            },
            error(msg) {
                reject(msg);
            }

        });

    });
};