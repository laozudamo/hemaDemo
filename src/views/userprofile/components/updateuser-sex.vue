<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: 'userSex', 
  components: {},
  props: {},
  data () {
    return {
      colums: [
        {
          values:['男','女']
        }
      ]
    }
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