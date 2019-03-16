
var path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const packagejson  = require('./package.json');
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始解析
		"main1":"./src/main1.js",
		"main2":"./src/main2.js",
		"vendor":Object.keys(packagejson.dependencies) //获取生产环境依赖的库
	},
	output:{
		path:path.resolve('./dist'),//相对转绝对
		filename:'[name].js'
	},
	watch:true,//文件监视改动 自动产出build.js
	plugins:[
		new  webpack.optimize.CommonsChunkPlugin({
			name:['vendor','runtime'],
			filename:'[name].js',
			minChunks:Infinity //用来在第三方库中分离自定义的公共模块
		}),
		new  webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'[name].js',
			chunks:['main1','main2'] // 从main1.js和main2.js中抽离 common chunk
		})


	]
}