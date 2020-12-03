<template>
  <div class="search-history">

    <!-- 第一个 cell -->
    <van-cell
      title="历史记录"
    >

    <div slot="right-icon" v-if="true">
      <van-icon name="delete" class="delete-history"/>
    </div>
    <div slot="right-icon" v-if="false">
      <span>全部删除</span>
      &nbsp;&nbsp;
      <span>完成</span>
    </div>

    </van-cell>

    <!-- 遍历的cell -->
    <van-cell
      v-for="(keyword,index) in keywords"
      :key="index"
    >
      <div slot="title">
        {{keyword}}
      </div>
      <div slot="right-icon" >
        <van-icon name="close" class="clear-history" />
      </div>

    </van-cell>

  </div>
</template>

<script>
import { getItem } from '@/utils/storage.js'
import { getSearchHistory } from '@/api/search.js'
import { mapState } from 'vuex'
export default {
  name: 'search-history', 
  components: {},
  props: {},
  data () {
    return {
      keywords: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if(this.user) {
      this.loadSearchHistory()
    } else {
      // 查看本地有没有
      const localHistory = getItem('keyWords')
      if(localHistory) {
        this.loadLocalHistory()

      } 
    }
  },
  mounted () {},
  methods: {
    // user history
    async loadSearchHistory() {
      const { data } = await getSearchHistory()
      this.keywords = data.data.keywords
    },
    // local history
    loadLocalHistory() {
      this.keywords = getItem('keyWords')
    },
  }
}
</script>

<style lang="less" scoped>
.delete-history {
  color: #333;
  font-size: 18px;
  line-height: 25px;
}
</style>