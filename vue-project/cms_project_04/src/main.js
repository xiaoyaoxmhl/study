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
// Axios.defaults.baseURL = 'http://127.0.0.1:8899/api/';
Axios.defaults.baseURL = 'http://www.sinya.online/api/';

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

// 注册全局的轮播图组件
import MySwiper from '@/components/Common/MySwiper'
Vue.component(MySwiper.name,MySwiper);


// 自定义moment 全局过滤器
Vue.filter('converTime',function(data,formatStr) {
	return Moment(data).format(formatStr);
});
Vue.filter('relativeTime',function(data) {
	return Moment(data).fromNow();
});
// 设置中文显示
Moment.locale('zh-cn');

// 控制字数显示的过滤器
Vue.filter('controllShow',function(str,num) {

	// 如果当前字符串长度小于num，返回原值
	if (str.length <= num) {
		return str;
	}
	// 如果当前字符串长度大于num，则截取0~num-1位
	if (str.length > num) {

		return str.substr(0,num-1) + '...';
	}
	
});

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 加载提示框
    Mint.Indicator.open({
    	text:'玩命加载ing....'
    });
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 关闭加载提示框
    Mint.Indicator.close();
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
