import request from '@/utils/request.js'
/* 推荐文章 */
export const getRecomendArticles = params => {
  return request ({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/* 文章详情 */
export const getCurrentArticle = article_id => {
  return request ({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`,
  })
}

/* 收藏文章 */
export const cellectArticle = article_id => {
  return request ({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: article_id
    }
  })
}

/* 取消收藏文章 */
export const cancelCelletArticle = article_id => {
  return request ({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${article_id}`,
  })
}

/* 点赞文章 */
export const goodArticle = article_id => {
  return request ({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: article_id
    }
  })
}

/* 取消点赞文章*/
export const cancelGoodArticle = article_id => {
  return request ({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${article_id}`,
  })
}

/* 获取文章评论 */

export const getArticleComment = params => {
  return request({
    method: 'GET',
    ulr: '/app/v1_0/comments',
    params
  })
}