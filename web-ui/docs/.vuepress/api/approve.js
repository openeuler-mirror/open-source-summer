/**
 * @file  OSV认证相关接口
 * */

 import appAjax from '../libs/ajax-utils';
 const cveApi = '-approve';

 export const osvList = ({
   keyword,
   osvName,
   type,
   page,
   pageSize,
}) => {
   return new Promise((resolve, reject) => {
       appAjax.postJson({
           otherBaseUrl: cveApi,
           url: '/cve-security-notice-server/osv/findAll',
           type: 'post',
           data: {
               keyword,
               osvName: osvName === 'all' ? '' : osvName,
               type: type === 'all' ? '' : type,
               pages: {
                   page,
                   size: pageSize
               },
           },
           success(result) {
               let res = {
                   totalRecords: result.result.totalCount,
                   list: result.result.osvList
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

//获取OS厂商选项
export const getOsName = () => {
   return new Promise((resolve,reject) => {
       appAjax.postJson({
           otherBaseUrl: cveApi,
           url: '/cve-security-notice-server/osv/getOsName',
           type: 'get',
           success(result) {
               if(result) {
                   resolve(result.result);
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

//获取分类选项
export const getType = () => {
   return new Promise((resolve,reject) => {
       appAjax.postJson({
           otherBaseUrl: cveApi,
           url: '/cve-security-notice-server/osv/getType',
           type: 'get',
           success(result) {
               if(result) {
                   resolve(result.result);
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

 //点击查看报告
 export const getApproveReport = ({
   id
}) => {
   return new Promise((resolve, reject) => {
       appAjax.postJson({
           otherBaseUrl: cveApi,
           url: 'cve-security-notice-server/osv/getOne',
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