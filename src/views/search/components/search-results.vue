<template>
  <div class="search-results">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
       <!--  <van-cell
          v-for="(article,index) in articles"
          :key="index"
          :title="article.title"
        /> -->
        <article-item 
          v-for="(article,index) in articles"
          :key="index"
          :title="article.title"
          :article="article"
        />
      </van-list>

  </div>
</template>

<script>
import ArticleItem from '@/components/article-item/index.vue'
import { getSearchResults } from '@/api/search.js'
export default {
  name: 'search-results', 
  components: {
    ArticleItem
  },
  props: {
    searchKey: {
      require: true,
      type: [String,Number]
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /* 加载搜索结果 */
    async onLoad () {
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.pageSize,
        q: this.searchKey
      })
      const { results } = data.data
      this.articles=[...this.articles,...results]
/* 
      List 组件通过 loading 和 finished 两个变量控制加载状态
      当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true
      此时可以发起异步操作并更新数据，数据更新完毕后，
      将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。 */
      this.loading = false  // 设置才能持续加载

      if( results.length > 0) {
        this.page++
      } else {
        this.finished = true
      }

    },
  }
}
</script>

<style lang="less" scoped>

.search-results {
  position: fixed;
  top: 54px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;  // 才能滚动
}
</style>