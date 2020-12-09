import axios from 'axios'
import store from '@/store/'
/* 引出大整数 处理大整数 */
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

const request = axios.create({
  baseURL: 'http://localhost:8080/', // 基础路径

  /* 大整数处理 */
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONbig.parse(data)
    } catch(err) {
      console.log(err,'处理大整数错误')
      return data
    }
  }]
})

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})


// 请求拦截器
request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// 响应拦截器
request.interceptors.response.use(function (response) {
  // 响应成功
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // 响应失败
  // 拿到状态码

 /*  const {status} = error.response */
  const status = error.response.status 
  if( status === 400) {
    // 客户端参数错误
    Toast.fial('客户端请求异常')
  } else if( status === 401 ) {
      // token 无效
      const user = store.state.user
      if( !user || !user.token) {
        // 如果没有user或者usertoken 重新登录
        return redirectLogin()
      } 
      // 如果有user 或者 refresh_token获取新token 刷新token
        try {
          const { data } = await refreshTokenReq({
            url:'/app/v1_0/authorizations',
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${user.refresh_token}`
            }
          })
          // 刷新token 成功 
          user.token = data.data.token
          // 将新 token 更新到容器里面
          store.commit('setUser',user)
          
          // 把失败请求继续发出去
          // 这里使用 request 发请求
          // 本次失败的相关配置对象
          return request(error.config) 
        } catch(err) {
          redirectLogin()
        }
  } else if( status === 403 ) {
    // 没有权限
    Toast('没有权限访问')
  } else if( status >= 500 ) {
    Toast('服务器异常，请稍后重试')
    // 服务端异常
  } else {
    Toast('出现错误，请稍后再试')
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
})

function redirectLogin () {
  router.replace({
    name: 'login',
    // 查询参数 查询参数会以 ？ 作为分隔符放到 URL 后面
    query: {
      // 数据名是自己起的
      // router.currentRoute 和我们在组件中获取的 this.$route 是一个东西
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request