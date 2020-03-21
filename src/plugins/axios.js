import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router/index'
import store from '../store/index'
// import qs from 'qs';

// 创建axios实例
let isJsBaseUrl = false
const service = axios.create({
  baseURL: (isJsBaseUrl && window.SystemApiBaseUrl) ? window.SystemApiBaseUrl : process.env.VUE_APP_API_URL, // api的 base_url
  timeout: 60000, // 请求超时时间
  // transformRequest: [function (data) {
  //   // `transformRequest` 允许在向服务器发送前，修改请求数据 , 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法 因此network中查看的结果是：name=xiaoming&age=12
  //   return qs.stringify(data);
  // }],
  // transformResponse: [function (data) {
  //   // `transformResponse` 在传递给 then/catch 前，允许修改响应数据, 对 data 进行任意转换处理
  //   return data;
  // }],
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
service.interceptors.request.use(
  config => {
    // 请求前进行处理
    let token = sessionStorage.getItem('TOKEN')
    if (token) {
      // 参数、头部中带token
      // config.params = { token: token, ...config.params };
      config.headers['TOKEN'] = token
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.ret === 401) {
      // 未登录
      Message.error(response.message || '请求失败，请稍后重试')

      // 清理token
      store.dispatch('user/clearUserMessage');

      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来
      })

      return Promise.reject(response)

    } else if (res.ret === 0) {
      // 请求成功
      return Promise.resolve(res)
    } else {
      // 其他错误
      Message.error(response.message || res.message || res.msg || '服务器连接失败')
      return Promise.reject(response)
    }
  },
  error => {
    Message.error(error.message || error.msg || '服务器连接失败')
    return Promise.reject(error)
  }
)

export default service
