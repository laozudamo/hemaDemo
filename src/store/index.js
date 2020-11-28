import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user') // 当前登录用户登录状态
  },
  mutations: {
    setUser (state,data) {
      state.user = data
      setItem('user',data)
    }
    
  },
  actions: {
  },
  modules: {
  }
})
