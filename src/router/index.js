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
    path: '/status/monthly',
    name: 'MonthlyInventoryStatus',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/StatusViews/MonthlyStatusView.vue')
  },
  {
    path: '/status/warehousing',
    name: 'WarehousingStatus',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/StatusViews/WarehousingStatusView.vue')
  },
  {
    path: '/status/shipped',
    name: 'ShippedStatus',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/StatusViews/ShippedStatusView.vue')
  },
  {
    path: '/list/warehousing',
    name: 'WarehousingList',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/ListViews/WarehousingListView.vue')
  },
  {
    path: '/list/shipped',
    name: 'ShippedList',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/ListViews/ShippedListView.vue')
  },
  {
    path: '/list/product',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/ListViews/ProductListView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
