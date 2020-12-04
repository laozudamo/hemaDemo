<template>
  <div class="search-history">

    <!-- 第一个 cell -->
    <van-cell
      title="历史记录"
    >
    <!-- icon -->
      <div
        slot="right-icon"
        @click="isShowIcon = !isShowIcon"
        v-if="isShowIcon"
      >
        <van-icon name="delete" class="delete-history"/>
      </div>
    <!-- text -->
      <div
        slot="right-icon"
        v-else
      >
        <span class="allDelete" @click="allClear">
          全部删除
        </span>

        <span
          class="done"
          @click="isShowIcon = !isShowIcon
        ">
          完成
        </span>

      </div>

    </van-cell>

    <!-- 遍历的cell -->
    <van-cell
      v-for="(keyword,index) in keywords"
      :key="index"
      @click="onClick(keyword)"
    >
      <div slot="title">
        {{keyword}}
      </div>
      <div slot="right-icon">
        <van-icon
          name="close"
          class="clear-history"
          v-show="!isShowIcon"
        />
      </div>

    </van-cell>

  </div>
</template>

<script>
import { deleteUserHistory } from '@/api/user.js'
import { getItem,removeItem } from '@/utils/storage.js'
import { getSearchHistory } from '@/api/search.js'
import { mapState } from 'vuex'
export default {
  name: 'search-history', 
  components: {},
  props: {},
  data () {
    return {
      keywords: [],
      isShowIcon: true,
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

    onClick (keyword) {
      // 判断 isShowIcon 状态
      if (this.isShowIcon) {
         // keyWord 进行搜索操作
         this.$emit('search',keyword)
      } else {
         // 删除历史
          if(this.user) {
            this.deleteUserHistory(keyword)
          } else {
            this.deleteLocalHistory(keyword)
          }
      }
    },

    // 删除用户历史
    async deleteUserHistory (keyword) {
      console.log(keyword);
      /* await deleteUserHistory() */
      console.log('删除用户历史')
    },

    // 删除本地历史
    async deleteLocalHistory (keyword) {
      console.log(keyword);
      console.log('删除本地历史')
    },

    // 全部删除 
    allClear() {
      // 判断有没有用户

      // 有 
      // 删除用户全部

      // no 
      // 删除本地全部
    }
  }
}
</script>

<style lang="less" scoped>
.delete-history {
  color: #333;
  font-size: 18px;
  line-height: 25px;
}

.done {
  padding: 2px;
  font-size: 13px;
  color: #333;
}

.allDelete {
  font-size: 13px;
  margin-right: 6px;
  padding: 2px;
  color: #333;
}

.clear-history {
  color: #d5505f;
}
</style>