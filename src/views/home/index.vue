<template>
  <div class="home">
  <div class="serch">
      <van-search
      v-model="value"
      shape="round"
      background="rgb(25, 137, 250)"
      placeholder="搜索"
      />
  </div>

  <van-tabs v-model="active" >
    <van-tab :title="item.name" v-for="(item,index) in channels" :key="index">
    <article-list :channel="item" />
    </van-tab>
  </van-tabs>

  </div>
</template>

<script>
import {loadUserChannels} from '@/api/user.js'
import ArticleList from './components/articleList.vue'
export default {
  name: 'home', 
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
       value: '',
       active: 0,
       channels: [],
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels() {
      const {data} = await loadUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>

</style>