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

/* 修改用户频道列表 */
/* wo TM 人傻了 data 位置放到外面了 注意注意 无论是方法还是data 还是请求 注意不要放错了地儿 */
export const addUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
/* 删除用户频道 */
export const deleteUserChannel = channelID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelID}`,
  })
}
