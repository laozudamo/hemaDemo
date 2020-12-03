import request from '@/utils/request.js'

/* 搜索建议 */
export const searchSuggestion = q => {
  return request ({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params:{
      q
    }
  })
}

/* 用户搜索历史 */
export const getSearchHistory = () => {
  return request ({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}

/* 获取搜索结果 */
export const getSearchResults = params => {
  return request ({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}