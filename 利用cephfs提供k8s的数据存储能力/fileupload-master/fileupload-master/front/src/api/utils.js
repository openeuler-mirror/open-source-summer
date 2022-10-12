// 网络请求所用的库axios
import axios from "axios";
import { Message } from "element-ui";

/**
 * 这一部分关于baseUrl是因为前后端分开开发，服务不在一块，使用相对路由将无法正确访问到后端服务（我们这里前端服务端口在8080，后端在8000）
 * 因此需要写死后端服务的协议、ip、端口，将请求路径转化为绝对路径
 * 后期部署这一部分将不会起作用
 */
let baseUrl = ''

// process.env.NODE_ENV == 'delelopemnt' 判断是否是开发环境，
if (process.env.NODE_ENV == "development") { 
  // 开发环境中
  baseUrl = "http://127.0.0.1:8000" 
}

// 构造axios实例，这设置超时时长与请求基础路径等，还有其他参数，但可以不关心
const instance = axios.create({
    timeout: 10000,
    baseURL: baseUrl
});

// 请求拦截器，基本不做处理
instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
);

// 应答异常处理，根据应答状态码进行不同的报错提示，不过其实这个案例的后端服务不会出现这些状态码，目前结构比较简单
function errorHandle (error) {
    let message = ''
    switch (error.response.status) {
        case 302:
          message = "接口重定向了！";
          break;
        case 400:
          message = "参数不正确！";
          break;
        case 401:
          message = "您未登录，或者登录已经超时，请先登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = "请求超时！";
          break;
        case 409:
          message = "系统已存在相同数据！";
          break;
        case 500:
          message = "服务器内部错误！";
          break;
        case 501:
          message = "服务未实现！";
          break;
        case 502:
          message = "网关错误！";
          break;
        case 503:
          message = "服务不可用！";
          break;
        case 504:
          message = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          message = "HTTP 版本不受支持！";
          break;
        default:
          message = "异常问题，请联系管理员！";
          break;
    }
    Message.error(message)
    return Promise.reject(error)
}

// 应答拦截器
instance.interceptors.response.use(
  // 若后端服务正常
    (res) => {
      let data = res.data;
      return Promise.resolve(data);
    },
    // 若后端服务异常
    (error) => {
      if (error && error.response) {
        return errorHandle(error)
      }
      return Promise.reject('网络错误');
    }
);
// Promise是一个语法糖，他是一个承诺，如果承诺成功了，则resolve，失败了，则reject。否则将一直处于pengding状态等待承诺完成
// 成功失败都表示承诺完成，关于这一部分其实如果对异步不太熟悉的话理解可能会比较困难，这里就先不关心了

export default instance