<template>
  <div class="user-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('cancel',false)"
      @click-right="onClickRight"
    />

    <div class="editArea">
      <van-field
      v-model="editedName"
      autosize
      type="textarea"
      maxlength="7"
      show-word-limit
    />
    </div>
    
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user.js'
export default {
  name: 'userName', 
  components: {},
  props: {},
  data () {
    return {
      editedName:'',
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onClickRight() {
      await editUserProfile ({
        data: {
          name: this.editedName
        }
      })
      this.$emit('updateName',this.editedName)
      this.$emit('cancel',false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__text {
    color:#fff
}
.editArea {
  position: fixed;
  top: 60px;
  left: 10px;
  right: 10px;
}
</style>