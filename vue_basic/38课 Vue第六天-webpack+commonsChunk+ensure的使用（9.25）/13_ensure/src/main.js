import Vue from 'vue'
console.log(Vue);


document.getElementById('aBtn').onclick = function(){
	// 异步的加载A.js
	require.ensure(['./B.js'],function(){
		var A  = require('./A.js');
		alert(A.data);

	})
};


document.getElementById('bBtn').onclick = function(){
	// 异步的加载B.js
	require.ensure([],function(){
		var B = require('./B.js');
		alert(B.data);
		
	})
};