import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 引入
import Home from '@/components/Home/Home'
import Vip from '@/components/Vip/Vip'
import Cart from '@/components/Cart/Cart'
import Search from '@/components/Search/Search'
import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/Photo/PhotoList'





// 使用vue-router插件  Vue.prototype.$router = Router;
Vue.use(Router)

export default new Router({
  linkActiveClass:'link-active',
	// 匹配的路由规则
  routes: [
  {
    path:'/',
    redirect:'/home'
  },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 新闻列表
    {
    	path:"/news/list",
    	name:'news.list',
    	component:NewsList
    },
    {
      path:'/news/detail',
      name:'detail',
      component:NewsDetail
    },
    {
      path:"/photos/list/:categoryId",
      name:'photo.list',
      component:PhotoList
    }
  ]
})
