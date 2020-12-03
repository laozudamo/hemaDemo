<template>
  <div class="search-container">
    <form action="/">
      <van-search
        show-action
        shape="round"
        v-model="searchText"
        placeholder="请输入搜索关键词"
        background="#d86262"
        @cancel="$router.back()"
        @search="onSearch"
        @input="onInput"
     
      />
    </form>

    <!-- results -->
    <search-results
      v-if="isShowResults"
      :searchKey ="searchText"
    />
    <!-- history -->
    <search-history
      v-else-if="searchText === ''"
    />

    <!-- advice -->
    <search-advice
      v-else
      :advice="searchText"
    />

    
  </div>
</template>

<script>
import { setItem } from '@/utils/storage.js'
import SearchAdvice from './components/search-advice.vue'
import SearchHistory from './components/search-history.vue'
import SearchResults from './components/search-results.vue'

import { mapState } from 'vuex'  // import mapState

export default {
  name: 'searchIndex', 
  components: {SearchAdvice,SearchHistory, SearchResults},
  props: {},
  data () {
    return {
      searchText: '',
      isShowResults: false,
      keyWords:[],
    }
  },
  computed: {
    ...mapState['user']
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      /* 搜索 */
      this.isShowResults = true
      // 判断是否登录
      if(!this.user) {
        // 没有登录 存输入内容到本地
       this.keyWords.unshift(this.searchText) // 数组 起那面追加
        // 数组去重
        setItem('keyWords', this.keyWords)
      }
      
    },

    onInput () {
      this.isShowResults = false
    }

  }
}
</script>

<style lang="less" scoped>  
/deep/.van-search__action {
  background-color: #d86262; 
  color: #fff;
}
</style>