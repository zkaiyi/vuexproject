import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/index'
    },
    {
      path: '/praject',
      name: 'praject',
      component: () => import('@/praject/index')
    },
    {
      path: '/ordersearch',
      name: 'ordersearch',
      component: () => import('@/views/order/index')      //代理商
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 是否包含配置
  const html_conf = Vue.prototype.Lo.isEmpty(store.state.store)
  next()
})

export default router
