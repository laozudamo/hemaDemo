import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'),// 当前登录用户登录状态
    cachePages: ['layout']
  },
  mutations: {
    setUser (state,data) {
      state.user = data
      setItem('user',data)
    },

    // 动态控制路由缓存
    // 添加缓存页面 
    addCachePage (state,pageName) {
      if(!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage (state,pageName) {
      const index = state.cachePages.indexOf(pageName)
      if(index !== -1) {
        state.cachePages.splice(index,1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
