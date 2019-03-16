import Vue from 'vue'

import App from './App.vue'


new Vue({
	el:'#app',

	// vue 2.0新增
	//Render函数是Vue2.x版本新增的一个函数；
	// 使用虚拟dom来渲染节点提升性能，因为它是基于JavaScript计算。
	// 通过使用createElement(h)来创建dom节点。createElement是render的核心方法。
	// 其Vue编译的时候会把template里面的节点解析成虚拟dom；

	render: c=>c(App)
})