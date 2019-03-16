// 编写客户端的入口

import {createApp} from './main'

const {app} = createApp();
const router = app.$router;

// 同步服务端信息

if (window.__INITIAL_STATE__) {
	app.$store.replaceState(window.__INITIAL_STATE__)
}

window.onload = function() {
	app.$mount('#app');
}