<template>
  <div class="articleIndex">
    <!-- nav -->
    <van-nav-bar
      class="article-nav"
      right-text="按钮"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    >
      <!-- 返回icon -->
      <template #right>
        <van-icon name="ellipsis" size="20" />
      </template>
    </van-nav-bar>

    <!-- title -->

    <h1 class="article-title">{{article.title}}</h1>
    <van-cell center class="user-info">
      <div slot="icon">
        <van-image
          fit="cover"
          class="avator"
          round
          :src="article.aut_photo"
        />
      </div>
      <div slot="title" class="user-name">
        {{article.aut_name}}
      </div>

      <div slot="label" class="pubdate">
        <p>{{article.pubdate | relativeTime}}</p>
      </div>

      <div>
        <van-button
          round
          size="small"
          class="fllow-btn"
          :disabled="isDisable"
          :type="article.is_followed ? '': 'warning'"
          :icon="article.is_followed ? '' : 'plus'"
          @click="checkFocus(article)"
        >
          {{article.is_followed ? '已关注' : '关注'}}
        </van-button>
      </div>
    </van-cell>
    <!-- content -->
    <div
      class="content markdown-body"
      ref="article-content"
      v-html="article.content"
    >
    </div>

    <!-- comment -->
    <comment-list
      :source="articleId"
    />

    <!-- comment action -->
    <van-cell center class="comment">
      <div class="write-comment">
        写评论
      </div>
      <div slot="right-icon" class="icon-wrap"> 
        <van-icon name="comment-o" badge="9" />

        <van-button
          :icon="isStar ?'star':'star-o'"
          size="small"
          @click="onStar(article)"
        />
        <van-button
          :icon="article.attitude ===1 ?'good-job':'good-job-o'"
          size="small"
          @click="onGood(article)"
        />

        <van-button icon="share" size="small"/>
      </div>
    </van-cell>
  </div>
</template>

<script>
// 在组件里获取到那个太路由参数
// 方式1: this.$route.params.xxx
// 方式2: props 传参 推荐 
// 在路由里面设置 props 为 true 映射 声明props接收 
import './github-markdown.css'
import { followUser, cancelFollowUser } from '@/api/user.js'
import
{
  getCurrentArticle,
  cellectArticle, 
  cancelCelletArticle,
  goodArticle,
  cancelGoodArticle
}
from '@/api/articles.js'
import { ImagePreview } from 'vant'
import CommentList from './component/comment.vue'
export default {
  name: 'articleIndex', 
  components: {
    CommentList
  },
  props: {
    articleId: {
      required: true,
      type: [Object,Number,String]
    }
  },
  data () {
    return {
      article: {},
      isDisable: false,
      isStar: false,
      isGood: false,
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCurrentArticle()
  },
  mounted () {},
  methods: {
    async loadCurrentArticle() {
        const { data } = await getCurrentArticle (this.articleId)
        this.article = data.data
        this.$nextTick(() => {
          this.handelPreviewImg()
        })
        
        // 1 获取文章内容 dom 容器
        // 数据改变影响试图更新(DOM数据) 不是立即的
        // 如果需要在修改后数据后 操作被数据影响的DOM,
        // 需要把代码放到 $nextTick 中
        // 2 得到所有img标签
        // 3 循环img 列表, 给IMG注册点击事件
        // 4 在事件处理函数中 调用ImagePreview() 预览
    },

    handelPreviewImg () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img,index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },

    async checkFocus(article) {
        this.isDisable = true

        if(article.is_followed === false) {
          // 关注用户
          await followUser(article.aut_id)
        } else {
          // 取消关注
          await cancelFollowUser(article.aut_id)
        }
      
      this.article.is_followed = !this.article.is_followed
      this.isDisable = false
    },

    async onStar (article) {
      if(this.isStar) {
        // satr 则取消
        await cancelCelletArticle(article.art_id)
      } else {
        // star-o 则收藏
        await cellectArticle(article.art_id)
      }
      this.isStar = !this.isStar
    },

    async onStar (article) {
      if(this.isStar) {
        // satr 则取消
        await cancelCelletArticle(article.art_id)
      } else {
        // star-o 则收藏
        await cellectArticle(article.art_id)
      }
      this.isStar = !this.isStar
    },

    async onGood (article) {
      if(article.attitude === 1) {
        // 取消
        await cancelGoodArticle(article.art_id)
        this.article.attitude = -1
      } else {
        // star-o 则收藏
        await goodArticle(article.art_id)
        this.article.attitude = 1
      }
    },

  }
}
</script>

<style lang="less" scoped>
.article-nav {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
}

.article-title {
  padding: 60px 10px 10px;
  font-size: 18px;
  background-color: #fff;
  margin: 0;
}

.van-icon-ellipsis {
  color: #fff;
}
.user-info {
  .avator {
    height: 40px;
    width: 40px;
    margin-right: 8px;
  }
  .user-name {
    font-size: 12px;
    color: #333;
  }
  .pubdate {
    margin-top: -5px;
    font-size: 11px;
    color: #b4b4b4;
  }
  .fllow-btn {
    width: 85px;
    height: 29px;
  }
}
.content {
  padding: 8px;
  background-color: #fff;
}
.comment {
  position: fixed;
  bottom: 0px;
}
.write-comment {
  margin-right: 15px;
  border: 1px solid #b4b4b4;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  color:#b4b4b4;
}
.icon-wrap {
  color: #dc4d4d9e;
  width: 200px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/deep/.van-button--default {
  color: #dc4d4d9e;
  border: unset;
  background-color: #fff;
  font-size: 18px;
}
/deep/ .van-button::before {
  padding: 0;
  background-color: #fff;
}

/deep/ .van-button {
  height: unset;
  line-height: 100%;
}
</style>