import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FileUpload from 'VIEWS/FileUpload'
import AllReports from 'VIEWS/AllReports'
import Login from 'VIEWS/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'AllReports',
      component: AllReports
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/fileUpload',
      name: 'FileUpload',
      component: FileUpload
    },
  ]
})



export default router
