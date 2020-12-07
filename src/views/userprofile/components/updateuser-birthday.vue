<template>
  <div>
    <van-datetime-picker
      ref="pick-birthday"
      v-model="currentDate"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('cancel',false)"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { Form } from 'vant'
import { editUserProfile } from '@/api/user.js'
export default {
  name: 'userBirthday', 
  components: {},
  props: {},
  data () {
    return {
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm() {
      const theday = this.$refs['pick-birthday'].getPicker().getValues()
      let str = theday.join('-')
      await editUserProfile({
        data: {
          birthday: str
        }
      })
      this.$emit('updateBirthday',str)
      this.$emit('cancel',false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>