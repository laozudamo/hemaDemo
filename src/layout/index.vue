<template>
  <div class="layout-container">
    <router-view />

    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o" replace to="/">
          首页
        </van-tabbar-item>
        <van-tabbar-item icon="video-o" replace to="/myVideo">
        视频
        </van-tabbar-item>
        <van-tabbar-item icon="chat-o" badge="9" replace to="/qa">
        问答
        </van-tabbar-item>
        <van-tabbar-item icon="user-o" replace to="/my">
        我的
        </van-tabbar-item>
      </van-tabbar>
    </div>

    <!-- 底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'layout', 
  components: {},
  props: {},
  data () {
    return {
     active: 3
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>

</style>