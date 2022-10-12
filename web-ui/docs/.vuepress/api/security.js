/**
 * @file  安全页接口配置文件
 * */

import appAjax from './../libs/ajax-utils';
const cveApi = '-cve';
export const securityList = ({
    keyword,
    page,
    pageSize,
    type,
    year
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/securitynotice/findAll',
            type: 'post',
            data: {
                keyword,
                type,
                year: year === '0' ? '' : year,
                pages: {
                    page,
                    size: pageSize
                }
            },
            success(result) {
                let res = {
                    totalRecords: result.result.totalCount,
                    list: result.result.securityNoticeList
                }
                if (result) {
                    resolve(res);
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


export const cveList = ({
    keyword,
    page,
    pageSize,
    status
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/cvedatabase/findAll',
            type: 'post',
            data: {
                keyword,
                status,
                pages: {
                    page,
                    size: pageSize
                }
            },
            success(result) {
                let res = {
                    totalRecords: result.result.totalCount,
                    list: result.result.cveDatabaseList
                }
                if (result) {
                    resolve(res);
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

export const securityDetail = ({
    sn
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/securitynotice/getBySecurityNoticeNo',
            type: 'get',
            params: {
                securityNoticeNo: sn
            },
            success(result) {
                if (result) {
                    resolve(result.result);
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

export const cveDetail = ({
    cveId,
    packageName
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/cvedatabase/getByCveIdAndPackageName',
            type: 'get',
            params: {
                cveId,
                packageName
            },
            success(result) {
                if (result) {
                    resolve(result.result);
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

export const getAffectedProduct = ({
    cveId,
    affectedComponent
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/securitynotice/byCveIdAndAffectedComponent',
            type: 'get',
            params: {
                cveId,
                affectedComponent
            },
            success(result) {
                if (result) {
                    resolve(result.result);
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

export const getPackage = ({
    cveId,
    packageName
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/cvedatabase/getCVEProductPackageList',
            type: 'get',
            params: {
                cveId,
                packageName

            },
            success(result) {
                if (result) {
                    resolve(result.result);
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

export const getDownloadUrl = ({
    id
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/securitynotice/getPackageLink',
            type: 'post',
            data: {
                packageName: id
            },
            success(result) {
                if (result) {
                    resolve(result.result[0]);
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