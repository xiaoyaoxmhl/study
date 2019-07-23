
import './main.css'

// esModule的模块导入
import Vue from './vue.js'

import App from './App.js'

new Vue({
	el:'#app',
	components:{
		App
	},
	template:`<App />`
});