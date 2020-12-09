<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
    <van-list
      class="vanList"
      v-model="loading"
      finished-text="没有更多了"
      :finished="finished"
      @load="onLoad"
    >
      <article-item
      v-for="(article,index) in articles"
      :key="index"
      :article="article"
      />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getRecomendArticles } from '@/api/articles.js'
import {debounce} from 'lodash'
export default {
  name: 'articleList', 
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    },
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false,
      scrollTop:0, // 列表滚动到顶部的距离
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce( () => {
      this.scrollTop = articleList.scrollTop
    },50)
  },
  activated () {
    // 把记录的到顶部的距离重新设置回去
    this.$refs['article-list'].scrollTop = this.scrollTop
  }, 
  methods: {
    async onLoad() {
      /* 请求数据 */
      const { data } = await getRecomendArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      /* 把数据放到list里面 */
      const { results } = data.data
      this.articles = [...this.articles,...results]
      /* this.articles.push(...results) */
      this.loading = false

      /* 如果数据全部加载完 */
      if(results.length) {
        /* 更新加载 */
        this.timestamp = data.data.pre_timestamp
      } else {
        /* 加载结束 */
        this.finished = true
      }
    },

    async onRefresh() {
    const { data } = await getRecomendArticles({
      channel_id: this.channel.id,
      timestamp: Date.now(),
      with_top: 1
    })
    
      /* 往顶部追加数据 */
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
    }

  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  top: 98px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>