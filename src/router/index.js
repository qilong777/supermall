import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRouter from './home.js'
import MemberRouter from './member.js'
import ShopCarRouter from './shopcar'
import SearchRouter from './search.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  HomeRouter,
  MemberRouter,
  ShopCarRouter,
  SearchRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "mui-active"
})

export default router
