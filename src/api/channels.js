import request from '@/utils/request.js'

/* 获取全部频道 */
export const getAllchannels = () => {
  return request({
    method: 'GET',
    url:'/app/v1_0/channels'
  })
}
