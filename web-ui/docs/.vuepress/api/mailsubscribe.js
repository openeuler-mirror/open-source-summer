/**
 * @file  邮件列表页订阅接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
export const subscribe = ({
  list_id,
  subscriber,
  display_name
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: '/mail/add',
            type: 'post',
            data: {
                list_id,
                subscriber,
                display_name
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