<template>
  <div class="searchAdvice">
    <van-cell
      icon="search"
      v-for="(option,index) in options"
      :key="index"
      @click="$emit('search',option)"
    >
    <div slot="title" v-html="highlight(option)"> <!-- 高亮处理 -->
      <!-- {{option}} -->
    </div>
    </van-cell>
    
  </div>
</template>

<script>
import { searchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash' // 防抖
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
  watch: {
   /*  advice() {
    console.log('这是简写的方法')
    } */
    advice: {
      handler: debounce(async function() { // 防抖
        const { data } = await searchSuggestion(this.advice)
        this.options = data.data.options
      },200),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight(option) {
      // 正则表达式里面的内容都会被当作正则匹配字符串来对待
      // RegExp 是正则表达式的构造函数
      // 参数一: 字符串
      // 参数二: 匹配模式
      // 返回值: 正则对象
      // /正则/g 全部替换 gi 全部替换忽略大小写
      return option.replace (
        new RegExp(this.advice, 'gi'),
        `<span style="color:red">${this.advice}</span>`
      ) 
    },
    
  }
}
</script>

<style lang="less" scoped>

</style>