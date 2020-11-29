import axios from 'axios'
import store from '@/store'
/* 引出大整数 处理大整数 */
/* import JSONbig from 'json-bigint' */

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  
})


// 请求拦截器
request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// 响应拦截器

export default request