<template>
  <div class="userprofile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link>
      <img src="" slot="default">
    </van-cell>

    <van-cell title="昵称" is-link to="" />

    <van-cell title="性别" is-link />

    <van-cell title="生日" is-link />
    
  </div>
</template>

<script>
export default {
  name: 'userprofile', 
  components: {},
  props: {},
  data () {
    return {}
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