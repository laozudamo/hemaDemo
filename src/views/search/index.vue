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
      @search="onSearch"
    />

    <!-- advice -->
    <search-advice
      v-else
      :advice="searchText"
      @search="onSearch"
    />

    
  </div>
</template>

<script>
import SearchAdvice from './components/search-advice.vue'
import SearchHistory from './components/search-history.vue'
import SearchResults from './components/search-results.vue'

import { setItem,getItem } from '@/utils/storage.js'
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
    onSearch (searchText) {
      /* 搜索 */
      this.isShowResults = true

      this.searchText = searchText
      // 判断是否登录
      const user = getItem('user')
      if(!user) {
        // 没有登录 存输入内容到本地
        //  this.keyWords.unshift(this.searchText) // 数组 前面追加
        this.keyWords.unshift(this.searchText) 

        let setHistory = Array.from(new Set (this.keyWords)) // 数组去重
        setItem('keyHistory', setHistory)
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