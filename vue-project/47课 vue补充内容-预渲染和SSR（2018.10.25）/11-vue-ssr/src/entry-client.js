// 编写客户端的入口

import {createApp} from './main'

const {app} = createApp();
const router = app.$router;


window.onload = function() {
	app.$mount('#app');
}