/*  */
import request from '@/utils/request.js'

/* 登录 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/* 获取短信验证码 */
export const getCode = (mobile) => {
  return request ({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/* 获取自己的资料 */

export const getOwnData = () => {
  return request ({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}

/* 获取用户频道列表 */
export const loadUserChannels = () =>{
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}