import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRouter from './Home/home'
import NewsListRouter from './Home/newsList'
import NewsInfoRouter from './Home/newsInfo'
import PhotoListRouter from './Home/photoList'
import PhotoInfoRouter from './Home/photoInfo'
import GoodsList from './Home/goodsList'
import GoodsInfo from './Home/goodsInfo'
import GoodsDesc from './Home/goodsDesc'
import GoodsComment from './Home/goodsComment'
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
  NewsInfoRouter,
  PhotoListRouter,
  PhotoInfoRouter,
  GoodsList,
  GoodsInfo,
  GoodsDesc,
  GoodsComment
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "mui-active"
})

export default router
