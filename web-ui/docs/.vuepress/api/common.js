/**
 * @file  活动相关接口
 * */

import appAjax from '../libs/ajax-utils';

export const getGiteeJson = (url) => {
   return new Promise((resolve,reject) => {
       appAjax.postJson({
           url: `get/json/?path=${url}`,
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
