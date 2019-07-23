import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import About from '@/components/About'


Vue.use(Router)

export default new Router({
mode:'history',
scrollBehavior (to, from, savedPosition) {
	// 只有调用了history.pushState()
    // return 期望滚动到哪个的位置
     // return {x:0,y:200}

    // 判断如果滚动条的位置存在直接返回当前位置，否则返回到起点
    // savedPosition这个属性的获取只有用户点击了前进后退按钮 或者是调用go(-1) forward()

    console.log(savedPosition);

    if (savedPosition) {
    	return savedPosition
    }else{
    	  return {x:0,y:0}
    }
  

   
  },
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
