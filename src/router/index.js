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
    path: '/tutorial',
    name: 'Tutorial',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/TutorialView.vue')
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
    path: '/status/inbound',
    name: 'InBoundStatus',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/StatusViews/InBoundStatusView.vue')
  },
  {
    path: '/status/outbound',
    name: 'OutBoundStatus',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/StatusViews/OutBoundStatusView.vue')
  },
  {
    path: '/list/inbound',
    name: 'InBoundList',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/ListViews/InBoundListView.vue')
  },
  {
    path: '/list/outbound',
    name: 'OutBoundList',
    component: () => import(/* webpackChunkName: "event", webpackPrefetch:true */ '../views/ListViews/OutBoundListView.vue')
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
