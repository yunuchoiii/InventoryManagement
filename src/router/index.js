import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/HomeView.vue')
  },
  {
    path: '/status/inventory',
    name: 'InventoryStatus',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/StatusViews/InventoryStatusView.vue')
  },
  {
    path: '/status/months',
    name: 'InventoryStatus',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/StatusViews/MonthStatusView.vue')
  },
  {
    path: '/list/input',
    name: 'InputList',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/ListViews/InputListView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
