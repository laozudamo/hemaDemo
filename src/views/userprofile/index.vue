<template>
  <div class="userprofile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link center>

      <label for="file">
      <van-image
        class="vanImage"
        fit="cover"
        round
        :src="user.photo"
      >
      </van-image>
      </label>

      <input
        type="file"
        id="file"
        ref="file"
        accept=".png, .jpg, .jpeg"
        hidden
        @change="onFileChange"
      >
      
    </van-cell>

    <van-cell title="昵称" is-link  @click="editNameShow= !editNameShow" center>
      <span>
        {{user.name}}
      </span>
    </van-cell>
    <van-cell title="性别" is-link @click="editSexShow= !editSexShow" >
      <span>
        {{user.gender===1 ? '女': '男'}}
      </span>
    </van-cell>

    <van-cell title="生日" is-link @click="editBirtdhShow= !editBirtdhShow">
      {{user.birthday}}
    </van-cell>
    
    <!-- 头像弹出层 -->
    <van-popup
      class="avatorPop"
      position="bottom"
      v-model="editAvatorShow"
      :style="{ height: '100%' }"
    >

      <updateuser-avatar
        :file="imgFile"
        @cancel="editAvatorShow=false"
        @updateAvator="onUpdateUerPhoto"
      />
      
    </van-popup>

    <!-- 昵称 -->
    <van-popup v-model="editNameShow" position="bottom" :style="{ height: '100%' }">
      <updateuser-name
        @cancel="editNameShow=$event"
        @updateName="user.name=$event"
      />
    </van-popup>

    <!-- 性别 -->
    <van-popup v-model="editSexShow" position="bottom" :style="{ height: '38%' }" >
      <updateuser-sex
        @cancel="editSexShow=$event"
        @updateSex="user.gender = $event"
      />
    </van-popup>

    <!-- 生日 -->
    <van-popup v-model="editBirtdhShow" position="bottom" :style="{ height: '38%' }" >
      <updateuser-birthday
         @cancel="editBirtdhShow=$event"
         @updateBirthday="user.birthday = $event"
      />
    </van-popup>

  </div>
</template>

<script>
import { getUserProfile } from  '@/api/user.js'
import UpdateuserAvatar from './components/updateuser-avatar.vue'
import UpdateuserBirthday from './components/updateuser-birthday.vue'
import UpdateuserName from './components/updateuser-name.vue'
import UpdateuserSex from './components/updateuser-sex.vue'

export default {
  name: 'userprofile', 
  components: {UpdateuserName, UpdateuserSex, UpdateuserBirthday, UpdateuserAvatar},
  props: {},
  data () {
    return {
      user: [],
      editAvatorShow: false,
      editNameShow: false,
      editSexShow: false,
      editBirtdhShow: false,
      imgFile: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadProfile()
  },
  mounted () {},
  methods: {
    async loadProfile() {
      const {data} = await getUserProfile()
      this.user = data.data
    },

    onFileChange() {
      // 打开弹出层 预览文件
      this.editAvatorShow = true
      this.imgFile =  this.$refs.file.files[0]
      this.$refs.file.value = ''
    },
    onUpdateUerPhoto (upImage) {
      this.user.photo = upImage
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f3f3f3;
}
.van-cell__value {
  padding-top: 5px;
}
.avatorPop {
  background-color: #000;
}
.vanImage {
  width: 35px;
  height: 35px;
}
.van-cell__value {
  padding: 0px;
}
</style>