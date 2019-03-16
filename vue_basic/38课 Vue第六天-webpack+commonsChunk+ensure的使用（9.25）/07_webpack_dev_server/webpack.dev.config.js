
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始解析
		"main":"./src/main.js"
	},
	output:{
		path:path.resolve('./dist'),//相对转绝对
		filename:'./build.js'
	},
	// 声明模块 包含各个loader
	module:{
		loaders:[
			{
				// style-loader  css-loader
				//  遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
					// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
					// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{

				// 对于图片的大小小于limit设置的大小  的图片，使用base64编码，
				// 可以减少一次图片的网络请求；那么对于比较大的图片,使用base64就不适合了，
				// 编码会和html混在一起，一方面可读性差，另一方面加大了html页面的大小，
				// 反而加大了下载页面的大小，得不偿失了呢,因此设置一个合理的limit是非常有必要的。

				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit=60000'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}
		]
	},
	plugins:[
		// 插件
		new HtmlWebpackPlugin({
			template:'./src/index.html',//参照物
		})
	],


	watch:true,//文件监视改动 自动产出build.js
}