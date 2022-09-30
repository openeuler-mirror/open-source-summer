/**
 * @file  搜索页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
export const search = ({
   keyword,
   model,
   indexEs,
   version,
   page,
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/search/keyword',
            type: 'post',
            data: {
                keyword,
                model: model == 'all' ? '' : model,
                indexEs,
                version,
                page,
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

export const repoSearch = ({
    keyword
 }) => {
     return new Promise((resolve, reject) => {
         appAjax.postJson({
             url: '/repo/search',
             type: 'get',
             params: {
                 keyword
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