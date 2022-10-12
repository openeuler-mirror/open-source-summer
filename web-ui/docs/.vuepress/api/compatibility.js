/**
 * @file  兼容性页面及详情接口配置文件
 * */

import appAjax from '../libs/ajax-utils';
const cveApi = '-cve';

// 1. 硬件列表
export const hardwareList = ({
    keyword,
    os,
    architecture,
    page,
    cpu,
    pageSize,
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/hardwarecomp/findAll',
            type: 'post',
            data: {
                keyword,
                os: os === 'all' ? '' : os,
                cpu: cpu === 'all' ? '' : cpu,
                architecture: architecture === 'all' ? '' : architecture,
                pages: {
                    page,
                    size: pageSize
                },
                lang
            },
            success(result) {
                let res = {
                    totalRecords: result.result.totalCount,
                    list: result.result.hardwareCompList
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
}

// 2. 驱动列表
export const driverList = ({
    keyword,
    os,
    architecture,
    page,
    pageSize,
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/drivercomp/findAll',
            type: 'post',
            data: {
                keyword,
                os: os === 'all' ? '' : os,
                architecture: architecture === 'all' ? '' : architecture,
                pages: {
                    page,
                    size: pageSize
                },
                lang
            },
            success(result) {
                let res = {
                    totalRecords: result.result.totalCount,
                    list: result.result.driverCompList
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
}


// 3. 驱动--操作系统的下拉列表
export const driverOSOptions = ({
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/drivercomp/getOS',
            type: 'get',
            params: {
                lang: lang
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

// 4. 驱动--架构的下拉列表
export const driverArchitectureOptions = ({
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/drivercomp/getArchitecture',
            type: 'get',
            params: {
                lang: lang
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

// 5. 硬件--操作系统的下拉列表
export const hardwareOSOptions = ({
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/hardwarecomp/getOS',
            type: 'get',
            params: {
                lang: lang
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

// 6. 硬件--架构的下拉列表
export const hardwareArchitectureOptions = ({
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/hardwarecomp/getArchitecture',
            type: 'get',
            params: {
                lang: lang
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


// 7. 详情页查询
export const detailList = ({
    id
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/hardwarecomp/getOne',
            type: 'get',
            params: {
                id: id
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

// 8. 详情页查询--列表
export const detailAapterList = ({
    id
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/hardwarecomp/getAdapterList',
            type: 'get',
            params: {
                hardwareId: id
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
//9. 软件列表 
export const softwareList = ({
    keyword,
    os,
    architecture,
    page,
    type,
    lang
}) => {
    return new Promise((resolve, reject) => {
        os = os ? `&os=${os}` : "";
        architecture = architecture ? `&arch=${architecture}` : "";
        type = type ? `&type=${type}` : "";
        keyword = keyword ? `&keyword=${keyword}` :"";
        appAjax.postJson({
            url: `https://api.compass-ci.openeuler.org/web_backend/compat_software_info?page_size=10&page_num=${page}${type}${architecture}${os}${keyword}`,
            type: 'get',
            notAuthorization:true,
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
}
// 10. 软件--操作系统的下拉列表
export const softwareOptions = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: 'https://api.compass-ci.openeuler.org/web_backend/query_compat_software',
            type: 'get',
            notAuthorization:true,
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
//11. 硬件cpu 下拉选项获取
export const hardwareCpuOptions = ({
    lang
}) => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            otherBaseUrl: cveApi,
            url: '/cve-security-notice-server/hardwarecomp/getCpu',
            type: 'get',
            params: {
                lang: lang
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
//12. 商业软件列表
export const businessSoftwareList = ({
    keyword,
    osName,
    page,
    testOrganization,
    lang
}) => {
    return new Promise((resolve, reject) => {
        osName = osName ? `&osName=${osName}` : "";
        testOrganization = testOrganization ? `&testOrganization=${testOrganization}` : "";
        keyword = keyword ? `&keyword=${keyword}` :"";
        appAjax.postJson({
            url: `https://shanhaitujian.cn/certification/software/communityChecklist?pageSize=10&pageNo=${page}${testOrganization}${osName}${keyword}`,
            type: 'get',
            timeout: 3000,
            notAuthorization:true,
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
//13. 商业软件--筛选框下拉列表
export const businessSoftwareOptions = () => {
    return new Promise((resolve, reject) => {
        appAjax.postJson({
            url: 'https://shanhaitujian.cn/certification/software/filterCriteria',
            type: 'get',
            timeout: 3000,
            notAuthorization:true,
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
}