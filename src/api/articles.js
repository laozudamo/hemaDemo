import request from '@/utils/request.js'

export const getRecomendArticles = params => {
  return request ({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}