//获取文档目录配置接口
import appAjax from './../libs/ajax-utils';
export const catalogList = (
    versionType,
    langType
) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: `/docs/menu?version=${versionType}&lang=${langType}/`,
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