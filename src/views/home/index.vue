<template>
  <div class="home-container">
    <!-- search -->
    <div class="serch">
        <van-search
        v-model="value"
        shape="round"
        background="#d86262"
        placeholder="搜索"
        />
    </div>
    <!-- nav -->
    <van-tabs v-model="active">
      <van-tab
      :title="item.name"
      v-for="(item,index) in channels"
      :key="index">
      <article-list :channel="item" />
      </van-tab>

      <div 
      class="edit-nav-wrap"
      slot="nav-right"
      @click="onShowPop"
      >
        <van-icon name="apps-o" class="icon" />
      </div>
    </van-tabs>
    <!-- pop -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      class="channle-edit"
      get-container="body"
    >
    <!-- 弹出框内容 -->
    <channel-edit
      :user-channels="channels"
      :onActive="active"
      @closePop="isChannelEditShow=false"
      @update-active="upDateActive"
    />
    
    </van-popup>
  </div>
</template>

<script>
import {loadUserChannels} from '@/api/user.js'
import ArticleList from './components/articleList.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'home', 
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
       value: '',
       active: 0,
       channels: [],
       isChannelEditShow: false // 编辑频道显示状态
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
    },
    onShowPop() {
      this.isChannelEditShow=true
    },
    upDateActive (index) {
      this.active = index
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.van-tabs__nav {
    padding-left: 0;
  }
  /deep/.van-tab {
    width: 82px;
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/.van-tabs__line {
    width: 45px;
    height: 3px;
    background-color: #d5505f;
}
.channle-edit {
  height: 100%;
}
 /deep/.van-tabs__wrap {
    margin-right: 44px;
}
.edit-nav-wrap {
  position: fixed;
  right: 0px;
  width: 44px;
  height: 43px;
  text-align: center;
  background-color: #fff;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 7px;
    width: 1px;
    height: 29px;
    background: #edeff3;
  }
  .icon {
    color: #d5505f;;
    font-size: 26px;
    line-height: 44px;
    opacity: .95;
  }
}
</style>