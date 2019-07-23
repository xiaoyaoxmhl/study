const Vue = require('vue')
const exp = require('express')
const express = exp()
// 创建服务端的渲染器
const renderer = require('vue-server-renderer').createRenderer()
// 服务端渲染bundle文件
const creatApp = require('./dist/bundle.server.js')['default']

// const app = new Vue({template:''})

// 设置静态资源目录
express.use('/',exp.static(__dirname+'/dist'))

// 客户端的bundle
const clientBundleFileUrl = '/bundle.client.js';

express.get('/apo/getHomeInfo',(req,res)=>{
	res.send('SSR发送请求了');
})


// 服务端渲染的核心就在于：
// 通过vue-server-renderer插件的renderToString()方法，将Vue实例转换为字符串插入到html文件
express.get('*',(req,res)=>{
	const context = {url:req.url};

	creatApp(context).then(app=>{
	     renderer.renderToString(app,(err,html)=>{
		// console.log(html);
		if (err) {return res.state(500).end('运行错误')}

		res.send(`
			<!DOCTYPE html>
		            <html lang="en">
		                <head>
		                    <meta charset="UTF-8">
		                    <title>Vue2.0 SSR渲染页面</title>
		                    <script src = "${clientBundleFileUrl}"></script>
		                </head>
		                <body>
		                     ${html}
		                </body>
		            </html>`
			)
	})
	})
})
// 服务器监听地址
express.listen(8881, () => {
    console.log('服务器已启动！')
})