import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import About from '@/components/About'


Vue.use(Router)

export default new Router({
  mode:'history',   //去除了#的hash模式，基于h5中的history.pushState()函数 来添加历史记录
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
