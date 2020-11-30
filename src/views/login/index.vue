<template>
  <div class="login-container">
    <!-- head -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- form 
    表单验证通过 提交登录-->
    <van-form
    ref="login-form"
    :show-error="false"
    :show-error-message="false"
    @submit="onLogin"
    @failed="onFailed"
    >
      <van-field
        :rules="formRules.mobile"
        v-model="user.mobile"
        name="mobile"
        left-icon="user-o"
        type="number"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="user.code"
        left-icon="envelop-o"
        type="number"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
      <template #button>
        <van-button
        size="mini"
        type="info"
        plain round
        @click.prevent="onGetCode"
        v-show="showGetCodeBtn"
        :disabled="isGetCodeDisable"
        >
        获取验证码
        </van-button>
        <van-count-down
          :time="time"
          @finish="stopShowCount"
          v-if="showCountDown"
          format="ss s"
        />
      </template>

      </van-field>

      <div style="margin: 16px;">
        <van-button round block plain type="info">
          登录
        </van-button>
      </div>
    </van-form>

   </div>
</template>

<script>
import { login, getCode } from '@/api/user.js'
/* import { Toast } from 'vant' */
export default {
  name: 'login', 
  components: {},
  props: {},
  data () {
    return {
      /* 用户数据 */
      user: {
        mobile: '17090086870',
        code: '246810'
      },
      /* 表单规则 */
      formRules: {
        mobile:[
          { required:true, message:'请输入手机号码'},
          { pattern: /^1[3-9](\d{9})$/, message: '请输入正确的手机号码'}
        ],
        code:[
          { required:true, message:'请输入验证码'},
          { pattern: /^\d{6}$/ , message:'验证码输入错误'}
        ]
      },
      /* 按钮倒计时 */
      time: 60 * 1000,
      showGetCodeBtn: true, // 获取验证码按钮显示与否
      showCountDown: false, // 倒计时显示与否
      isGetCodeDisable: false
      
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /* 登录 */
   async onLogin () {

    this.$toast.loading({
       message: '登录中...',
       forbidClick: true
     })

    try {
      const res =await login(this.user)
      /* 将后端返回的数据放到vueX里面 */
      const data = res.data.data
      this.$store.commit('setUser',data)
      this.$toast('登录成功')

      this.$router.push('/my')

      } catch(err) {
        this.$toast.fail('账号或验证码错误')
      }
    },
    /* 表单验证失败 */
    onFailed(error) {
      let failMsg = error.errors[0].message
      this.$toast(failMsg)
    },

    stopShowCount() {
      this.showCountDown = false
      this.showGetCodeBtn = true
    },

    /* 获取验证码 */
    async onGetCode () {
      this.isGetCodeDisable = true
    /* 手动验证表单 */
      try {
          /* 通过 */
          await this.$refs['login-form'].validate('mobile')

          this.showGetCodeBtn = false

          this.showCountDown = true

         await getCode(this.user.mobile)

      } catch(err) {    // 处理不同错误s
        /* try 里面的任何错误都会进入 catch */
        let message = ''
        if (err && err.response && err.response.status === 429) {
        /* 短信失败 */
          message = '发送太频繁，请稍后再试'
        } else if (err.name === 'mobile') {
          /* 表单失败 */
          message = err.message
        } else {
          /* 未知错误*/
          message = '发送失败，稍后重试'
        }
        /* 提示用户 */
        this.$toast(message)
      }
    }
  }

}
</script>

<style lang="less" scoped>


</style>