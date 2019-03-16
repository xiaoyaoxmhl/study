// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import Moment from  'moment'

Vue.config.productionTip = false


// 使用mint-ui 引入全部的组件
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'


// 引入 自己书写的全局的css样式
import '../static/css/global.css'
import './assets/font/iconfont.css'



// 配置公共的url
Axios.defaults.baseURL = 'http://127.0.0.1:8899/api/';
// 配置axios
Vue.prototype.$axios = Axios;


// 图片查看器
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview); //内部会原型Vue.component('vue-preview',{})



// 注册全局的导航栏组件
import Navbar from '@/components/Common/Navbar.vue'
Vue.component(Navbar.name,Navbar);

// 注册全局的评论组件
import Comment from '@/components/Common/Comment'
Vue.component(Comment.name,Comment);


// 自定义moment 全局过滤器
Vue.filter('converTime',function(data,formatStr) {
	return Moment(data).format(formatStr);
});
Vue.filter('relativeTime',function(data) {
	return Moment(data).fromNow();
});





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
