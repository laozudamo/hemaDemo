<template>
  <div class="my-container">
    <div class="user-info">
      <van-cell-group>
        <van-cell title="单元格" value="内容" center>
          <div slot="icon">
            <van-image width="50" height="50" fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div slot="title">昵称</div>
          <van-button slot="default" size="mini" type="info" round>编辑资料</van-button>
        </van-cell>

        <van-grid>
          <van-grid-item text="头条">
            <span slot="icon">12</span>
          </van-grid-item>
          <van-grid-item text="关注">
            <span slot="icon">12</span>
          </van-grid-item>
          <van-grid-item text="粉丝">
            <span slot="icon">12</span>
          </van-grid-item>
          <van-grid-item text="获赞">
            <span slot="icon">12</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

        <van-grid :column-num="2">
          <van-grid-item>
            <van-icon name="star-o"/>
          </van-grid-item>
          <van-grid-item>
            <van-icon name="clock-o" />
          </van-grid-item>
        </van-grid>

      <van-cell title="消息通知" is-link to="" />
      <van-cell title="小智同学" is-link to="" />
      <van-cell title="退出登录" class="loginOutBtn" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'my', 
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
.loginOutBtn {
  text-align: center;
}

</style>