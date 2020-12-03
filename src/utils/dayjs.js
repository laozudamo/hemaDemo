import Vue from 'vue'
/* 配置使用dayjs */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

/* 配置中文语言包 */
dayjs.locale('zh-cn') // 全局使用
/* 日期格式化 */
/* 把处理时间的代码包装成全局过滤器
    然后就可以在组件的任何模板里面使用
    所谓的过滤器就是可以在模板里面使用的函数
*/
// 添加过滤器
// 在组件里面使用过滤器: {{xxx | relativeTime}}
// 管道符前面的内容作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中 
Vue.filter('relativeTime',value => {
  return dayjs(value).fromNow()
})