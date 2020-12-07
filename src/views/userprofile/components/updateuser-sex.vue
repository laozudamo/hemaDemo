<template>
  <div>
    <van-picker
      ref="pick-sex"
      title="性别"
      default-index
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('cancel',false)"
    />
  </div>
</template>

<script>
import { Picker } from 'vant'
import { editUserProfile } from '@/api/user.js'
export default {
  name: 'userSex', 
  components: {},
  props: {},
  data () {
    return {
     columns: [
        {
          values: ['男','女'],
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm() {
      const index = this.$refs['pick-sex'].getIndexes() 
      await editUserProfile({
        data:{
          gender:index
        }
      })
      this.$emit('updateSex',index)
      this.$emit('cancel',false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>