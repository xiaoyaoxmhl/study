import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListPage from '@/components/ListPage'
import Header from '@/components/Header'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ListPage',
      name: 'ListPage',
      component: ListPage,
      children:[
        {
          path: '/ListPage/header',
          name: 'Header',
          component: Header
        },
        {
          path: '/product',
          name: 'Product',
          component: Product
        }
      ]
    }
  ]
})
