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
    <van-form>
      <van-field
        v-model="user.mobile"
        :rules="formRules.mobile"
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
        <van-button size="mini" type="info" plain round>获取验证码</van-button>
      </template>

      </van-field>

      <div style="margin: 16px;">
        <van-button round block plain type="info" @click="onLogin">
          登录
        </van-button>
      </div>
    </van-form>
   </div>
</template>

<script>
import { login } from '@/api/user.js'
/* import { Toast } from 'vant' */
export default {
  name: 'login', 
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      formRules: {
        mobile:[
          { require:true, message:'请输入手机号码', trigger:'blur'},
          { pattern: /^1[3-9](\d{9})$/, message: '请输入正确手机号码'}
        ],
        code:[
          { require:true, message:'验证码', trigger:'blur'}
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
   async onLogin () {
    this.$toast.loading({
       message: '登录中...',
       forbidClick: true
     })
    try {
      const res =await login(this.user)
      console.log(res)
      this.$toast('登录成功')

      } catch(err) {
        this.$toast.fail('账号或验证码错误');
      }
    }
  }

}
</script>

<style lang="less" scoped>


</style>