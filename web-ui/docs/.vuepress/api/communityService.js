/**
 *社区认证请求接口
 * */

import appAjax from './../libs/ajax-utils';
const authApi = '-certification';
const pravacyMethods = {
    resolveLang(lang) {
        return (lang == "zh"?false:lang == "en"?"en-US":"ru-RU");
    }
}
export const getCode = (email,lang) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            notAuthorization: true,
            otherBaseUrl: authApi,
            url: '/certification/list/verifyCode',
            type: 'GET',
            params:{
                email,
            },
            headLanguage: pravacyMethods.resolveLang(lang),
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

export const searchCard = (params,lang) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            notAuthorization: true,
            otherBaseUrl: authApi,
            url: '/certification/list',
            type: 'GET',
            params,
            headLanguage: pravacyMethods.resolveLang(lang),
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
export const downCard = (params,lang) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            notAuthorization: true,
            otherBaseUrl: authApi,
            url: '/certification',
            type: 'GET',
            params,
            headLanguage: pravacyMethods.resolveLang(lang),
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
export const refleshDownUrl = (params,lang) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            notAuthorization: true,
            otherBaseUrl: authApi,
            url: '/refreshDonwnurl',
            type: 'GET',
            params,
            headLanguage: pravacyMethods.resolveLang(lang),
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
export const refleshDownCard = (params,lang) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            notAuthorization: true,
            otherBaseUrl: authApi,
            url: '/refreshDonwnurl',
            type: 'PATCH',
            params,
            headLanguage: pravacyMethods.resolveLang(lang),
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