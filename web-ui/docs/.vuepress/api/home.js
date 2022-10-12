/**
 * @file  首页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const sigApi = '-sig';
export const meetingList = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: sigApi,
            url: '/meetingsdata/',
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
export const statisticsList = ({
    type
}) => {
    return new Promise((resolve,reject) => {
        appAjax.postJson({
            url: '/search/statistics',
            type: 'get',
            params: {
                type
            },
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
        });
    });
}