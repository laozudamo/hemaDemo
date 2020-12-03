<template>
  <div class="searchAdvice">
    <van-cell
      icon="search"
      v-for="(option,index) in options"
      :key="index"
    >
    {{option}}
    </van-cell>
    
  </div>
</template>

<script>
import { searchSuggestion } from '@/api/search.js'
export default {
  name: 'searchAdvice', 
  components: {},
  props: {
    advice:{
      type: [String,Number],
      require: true
    }
  },
  data () {
    return {
      options: []
    }
  },
  computed: {},
  watch: {},
  created () {
    // advice
    this.loadAdvice()
  },
  mounted () {},
  methods: {

    async loadAdvice() {
      const { data } = await searchSuggestion(this.advice)
      this.options = data.data.options
    }

  }
}
</script>

<style lang="less" scoped>

</style>