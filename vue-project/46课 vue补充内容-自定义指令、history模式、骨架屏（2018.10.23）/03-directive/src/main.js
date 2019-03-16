import Vue from 'vue'
import App from './App.vue'

// 注册一个全局的自定义指令
// v-tack  固定定位 顶部的距离有40px

// 自定义指令：
	// 语法Vue.directive('指令的名',{})

	// {}字面量方式创建  
	// 生命周期的函数 bind() 只会被执行

	// update 更新数据的时候 会调用update

	// 在每个生命周期中 el: 绑定的dom节点  binding  存储的是一堆对象

	// binding属性中的采纳数
		// arg   v-tack:top
		// value:  传递的值

Vue.directive('tack',{
	bind(el,binding,vnode){
		console.log(el);
		console.log(binding);
		el.style.position = 'fixed';
		console.log(binding.value);
		el.style[binding.arg] = binding.value +'px';

	},
	update(el,binding,vnode){
		console.log(binding);
		el.style[binding.arg] = binding.value + 'px';
	}
})

Vue.directive('scroll',{
	// 被插入的元素 插入到父节点会被调用
	inserted(el,binding,vnode) {
		console.log(vnode)
		window.addEventListener('scroll',vnode.context.scrollLoad)
	}
})

new Vue({
  el: '#app',
  render: h => h(App)
})
