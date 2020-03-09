import axios from 'axios'
import { Message } from 'element-ui'
// import store from "../store/index";
import router from '../router/index';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE, // api的 base_url
  timeout: 60000, // 请求超时时间
});

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
service.interceptors.request.use(
  config => {
    // 请求前进行处理
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;

    if (res.ret === 401) {
      // 未登录
      Message.error(response.message || '请求失败，请稍后重试');
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来
      });
      window.open(response.data.toUrl, '_self');

      return Promise.reject(response)
    } else if (res.ret === 0) {
      // 请求成功
      return Promise.resolve(res);
    } else {
      // 其他错误
      Message.error(res.message || res.msg || '服务器连接失败');
      return Promise.reject(response)
    }
  },
  error => {
    Message.error('服务器连接失败');
    return Promise.reject(error)
  }
);

export default service;
