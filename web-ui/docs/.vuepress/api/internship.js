/**
 * @file  实习页面gitee积分接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const rankApi = '-rank';
export const getToken = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: rankApi,
            url: '/intern/admin/login',
            type: 'post',
            data: {
                userName: "admin",
                passWord:"admin"
            },
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
export const getRank = ({
    token,
    userId,
    pageSize,
    currentPage
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: rankApi,
            url: `/intern/points/lists`,
            type: 'get',
            params: {
                token:token,
                currentPage:1,
                pageSize,
            },
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
export const getRankDetail = ({
    token,
    userId,
    pageSize,
    currentPage
}) => {
    return new Promise((resolve, reject) => {
        console.log(token,pageSize);
        appAjax.postJson({
            otherBaseUrl: rankApi,
            url: '/intern/user/points',
            type: 'get',
            params: {
                token:token,
                currentPage:1,
                pageSize:10,
                userId:userId
            },
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