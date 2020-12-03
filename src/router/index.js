import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue') 
  },

  {
    path: '',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: '/myVideo',
        name: 'myVideo',
        component: () => import('@/views/myvideo/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue') 
      },
    ]
  },
    
  {
    path: '/search',
    name: 'search',
    component: () => import ('@/views/search/index.vue')
  },

  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import('@/views/userprofile/index.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
