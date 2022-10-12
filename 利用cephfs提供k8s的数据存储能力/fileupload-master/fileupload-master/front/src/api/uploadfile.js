// utils文件封装了axios方法,将其导出的封装函数引入作为request函数调用
import request from './utils'
import { getCookie } from '../lib/cookie'
/**
 * (params) => {};是一个语法糖,代表箭头函数。与function (params) {} 在一定程度上等价
 * 以uploadFile这个函数举例
 * 它等同于
 * const uploadFile = function (params) {
 *   return request({...})
 * }
 * const 是声明变量的一个关键字, uploadFile这个变量存放了这个函数
 * 
 * 内部的request函数由utils文件内封装导出,参数分别代表请求路由、请求方法、请求头、传参等
 * 注意这里的url都使用的相对路由
 */
// 上传
export const uploadFile = (params) => {
    return request({
      url: "/api/uploadfile/",
      method: "post",
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken')
      },
      data: params,
    });
};

// 搜索
export const searchFileList = () => {
  return request({
    url: "/api/searchfilelist/",
    method: "get"
  });
};

// 删除
export const deleteFile = (params) => {
  return request({
    url: "/api/deleteFile/",
    method: "get",
    params
  });
};