import axios from 'axios'
/* 引出大整数 处理大整数 */
/* import JSONbig from 'json-bigint' */

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
//
//  transformResponse: [function (data) {
//    // Do whatever you want to transform the data
//    try {
//      /* 处理大整数 */
//      const data = JSONbig.parse(data)
//      return data
//    } catch(err) {    /* 发生错误直接返回data */
//      console.log(err,'处理大整数错误')
//
//      return data
//    }
//  }]
  
})


// 请求拦截器

// 响应拦截器

export default request