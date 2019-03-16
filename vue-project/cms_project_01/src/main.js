// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false


// 使用mint-ui 引入全部的组件
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'


// 引入 自己书写的全局的css样式

import '../static/css/global.css'



// 配置公共的url
Axios.defaults.baseURL = 'http://www.sinya.online/api/';
// 配置axios
Vue.prototype.$axios = Axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
