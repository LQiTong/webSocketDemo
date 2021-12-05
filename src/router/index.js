import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: '',
    component: resolve => require(['@/views/dashboard/index'], resolve)
  },
  {
    path: '/socket_client',
    name: 'socket_client',
    component: resolve => require(['@/views/socketClient/socketClient'], resolve)
  }
  ]
})

export default router
