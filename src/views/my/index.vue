<template>
  <div class="my-container">
    <div class="user-info">
      <van-cell-group v-if="user" class="my-head">

        <van-cell title="单元格" value="内容" center class="my-info" :border="false">
          <div slot="icon">
            <van-image fit="cover" round :src="owner.photo" class="avatar" />
          </div>
          <div slot="title" class="nickName">{{owner.name}}</div>
          <span slot="default" class="upDateUserFile">编辑资料</span>
        </van-cell>

        <van-grid :border="false" class="data-info">
          <van-grid-item text="头条" class="data-info-item">
            <span slot="icon">{{owner.art_count}}</span>
          </van-grid-item >
          <van-grid-item text="关注" class="data-info-item">
            <span slot="icon">{{owner.follow_count}}</span>
          </van-grid-item>
          <van-grid-item text="粉丝" class="data-info-item">
            <span slot="icon">{{owner.fans_count}}</span>
          </van-grid-item>
          <van-grid-item text="获赞" class="data-info-item">
            <span slot="icon">{{owner.like_count}}</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <div class="not-login" v-else>
        <div class="not-login-inbox" @click="$router.push('login')">
          <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" class="not-login-img" />
          <span class="log-out">登录/注册</span>
        </div>
      </div>

      <van-grid :column-num="2" class="grid-nav">
        <van-grid-item class="grid-item-collect">
          <van-icon name="star-o"/>
          <span class="collet">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item-history">
          <van-icon name="clock-o" />
          <span class="history">历史</span>
        </van-grid-item>
      </van-grid>

      <div class="link-wrap">
        <van-cell title="消息通知" is-link to="" v-if="user" />
        <van-cell title="小智同学" is-link to="" />
      </div>

      <van-cell title="退出登录" class="loginOutBtn" v-if="user" @click="onLogout" />
    </div>
  </div>
</template>

<script>
import { getOwnData } from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'my', 
  components: {},
  props: {},
  data () {
    return {
      owner: {
        art_count: 0,
        certi: '',
        fans_count: 0,
        follow_count: 0,
        id: null,
        intro: '',
        is_media: false,
        like_count: 0,
        name: '',
        photo: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.getOwnproFile()
  },
  mounted () {},
  methods: {
    async getOwnproFile() {
      const { data } = await getOwnData()
      this.owner = data.data
    },

    onLogout() {
      /* 提示用户 */
    this.$dialog.confirm({
      title: '退出登录'
    })
      .then(() => {
        /* 清除用户登陆状态 */
        this.$store.commit('setUser',null)
      })
      .catch(() => {
        // on cancel
      });
      /* 清除user */
    }
  }
}
</script>

<style lang="less" scoped>
.my-head {
  background: url('./bg.jpg') no-repeat;
  background-size: cover;
  .my-info {
    height: 115px;
    background-color: unset;
    padding-top: 38px;
    .avatar {
      box-sizing: border-box;
      width: 60px;
      height: 60px;
      border: 1px solid #fff;
    }
    .upDateUserFile {
      color: #fff;
      height: 16px;
    }
  }
  /deep/.van-grid-item__content {
    background-color: unset;
    border: none;
  }
}
.data-info {
  height: 65px;
  color: #fff;
   font-size: 18px;
  /deep/.van-grid-item__text {
    font-size: 11px;
    color: #fff;
  }
  /deep/.van-grid-item__content {
    padding: 0px;
  }
}
.grid-nav {
  margin-top: 5px;
  height: 70px;
  .grid-item-collect,
  .grid-item-history{
    font-size: 22px;
    .collet,
    .history {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
.nickName {
  font-size: 18px;
  color: #fff;
  margin-left: 11px;
}
.link-wrap {
  margin-top: 8px;
}
.loginOutBtn {
  margin-top: 4px;
  text-align: center;
  color: #d86262;
}

.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  background: url('./bg.jpg') no-repeat;
  background-size: cover;
  .not-login-inbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .not-login-img {
      width: 60px;
      height: 60px;
    }
    .log-out {
      margin-top: 7px;
      font-size: 12px;
    }
  }
}

</style>