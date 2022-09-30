/**
 * @file  博客页浏览次数接口配置文件
 * */

import appAjax from '../libs/ajax-utils';
//1 博客访问量列表
export const blogVisitList = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/blog/list',
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
//2 博客访问量详情
export const blogVisitDetail = ({
    title,
    date,
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/blog/one',
            type: 'post',
            data: {
                title,
                date,
                lang
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
// 3增加博客访问量
export const addVisit = ({
    title,
    date,
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/blog/visit',
            type: 'post',
            data: {
                title,
                date,
                lang
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