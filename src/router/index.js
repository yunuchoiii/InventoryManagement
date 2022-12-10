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
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/Status/InventoryStatus.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
