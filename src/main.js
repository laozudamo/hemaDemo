import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
/* 引入vant */
import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'

import '@/styles/index.less'

/* 放到最后有利于覆盖样式 */

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
