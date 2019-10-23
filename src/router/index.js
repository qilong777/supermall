import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRouter from './home'
import NewsListRouter from './newsList'
import NewsInfoRouter from './newsInfo'
import MemberRouter from './member'
import ShopCarRouter from './shopcar'
import SearchRouter from './search'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  HomeRouter,
  MemberRouter,
  ShopCarRouter,
  SearchRouter,
  NewsListRouter,
  NewsInfoRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "mui-active"
})

export default router
