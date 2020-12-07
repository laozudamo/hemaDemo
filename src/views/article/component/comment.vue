<template>
  <div class="commment-container">
    <p>评论</p>
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >

      <van-cell v-for="item in list" :key="item" :title="item" />

    </van-list>
  </div>
</template>

<script>
import { getArticleComment } from '@/api/articles.js'
export default {
  name: 'comoment', 
  components: {},
  props: {
    source: {
      type: [Object,String,Number],
      required: true
    }
  },
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      offset: null,
      limit:10,
    }
  },
  computed: {},
  watch: {},
  created () {
     this.loadArticleComment()
     
  },
  mounted () {},
  methods: {
    
    async loadArticleComment () {
      const { data } = await getArticleComment({
        params: {
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        }
      })
      console.log(data);
    },

   onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
    }, 1000)
   }
  }
}
</script>

<style lang="less" scoped>

</style>