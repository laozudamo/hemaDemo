<template>
  <div id="app">
    <!-- 一级路由出口 -->
    <!-- 组件缓存 -->
    <keep-alive :include="cachePages">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['cachePages'])  // 注意这里的写法
  }
}
</script>
<style lang="less">

</style>
