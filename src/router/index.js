import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import { Dialog } from 'vant';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { requiresAuth: false }
  },

  {
    path: '',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/myVideo',
        name: 'myVideo',
        component: () => import('@/views/myvideo/index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue'),
        meta: { requiresAuth: false }
      },
    ]
  },
    
  {
    path: '/search',
    name: 'search',
    component: () => import ('@/views/search/index.vue'),
    meta: { requiresAuth: false }
  },

  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import('@/views/userprofile/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/index.vue'),
    meta: { requiresAuth: false }
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    // 如果已登录，则直接通过
    if(store.state.user) {
      return next()
    }
    // 没有登录 提示登录
    Dialog.alert({
      title: '访问提示',
      message: '该功能需要登录',
    })
    .then(() => { // 执行
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    })
    .catch(()=> { // 取消执行
      next(false)
    })
  } else {
    next()
  }
})

export default router
