### webpack



> webpack是一个现代JavaScript应用程序的静态模块打包器。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

#### 历史介绍

- 2009年初，commonjs规范还未出来，此时前端开发人员编写的代码都是非模块化的，
  - 那个时候开发人员经常需要十分留意文件加载顺序所带来的依赖问题
- 与此同时 nodejs开启了js全栈大门，而requirejs在国外也带动着前端逐步实现模块化
  - 同时国内seajs也进行了大力推广
  - AMD 规范 ，具体实现是requirejs define('模块id',[模块依赖1,模块依赖2],function(){  return ;}) , ajax请求文件并加载
  - Commonjs || CMD 规范seajs 淘宝玉伯
    - commonjs和cmd非常相似的
      - cmd  require/module.exports
    - commonjs是js在后端语言的规范: 模块、文件操作、操作系统底层
    - CMD 仅仅是模块定义
  - UMD 通用模块定义，一种既能兼容amd也能兼容commonjs 也能兼容浏览器环境运行的万能代码
- npm/bower集中包管理的方式备受青睐，12年browserify/webpack诞生
  - npm 是可以下载前后端的js代码475000个包
  - bower 只能下载前端的js代码,bower 在下载bootstrap的时候会自动的下载jquery
  - browserify 解决让require可以运行在浏览器，分析require的关系，组装代码
  - webpack 打包工具，占市场主流



```javascript
(function (root, factory) {  
    if (typeof exports === 'object') { 
        module.exports = factory();  //commonjs环境下能拿到返回值
    } else if (typeof define === 'function' ) {  
        define(factory);   //define(function(){return 'a'})  AMD
    } else {  
        window.eventUtil = factory();  
    }  
})(this, function() {  
    // module  
    return {  
        //具体模块代码
        addEvent: function(el, type, handle) {  
            //...  
        },  
        removeEvent: function(el, type, handle) {  
              
        },  
    };  
}); 
```



#### 模块实现

###### 1.下载webpack为项目开发依赖

``` npm install webpack@3.12.0 -D```

######   2.创建main.js作为项目的入口文件

```javascript
// 整个程序的入口文件

import Vue from './vue.js'
import App from './App.js'
// 模块整体加载
// import {num,num2,add} from './App.js'

// console.log(num);
// console.log(num2);
// add(3,5);

// import * as object from './App.js'
// console.log(object);
// console.log(object.num);
// console.log(object.num2);
// add(3,5);
new Vue({
	el:'#app',
	components:{
		App
	},
	template:`<App />`
});
```



###### 3.创建一个App.js

```javascript
var App = {
	template:`
		<div>
			我是一个入口组件
		</div>
	`
};
//1. 声明并导出
export var num = 2; //作为一整个对象key导出

//2. 声明再导出
var  num2 = 4;
export {num2};
//3.抛出一个函数
export function add(x,y) {
	return console.log(x+y);
}
//4.抛出一个对象
export default App;
```

######  4.在package.json文件中配置如下：

```javascript
{
  "name": "29_module",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "build": "webpack ./main.js ./build.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.12.0"
  }
}

```

###### 5.新建一个index.html，script脚本引入打包完成的build.js如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<div id="app"></div>
	<script type="text/javascript" src="./build.js"></script>
	
</body>
</html>
```



#### webpack 编译之后的build.js文件解读

![image-20180821002853996](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180821002853996.png)

关于setimmediate介绍链接：

http://www.ruanyifeng.com/blog/2014/10/event-loop.html



##### webpack打包模块的源码 执行顺序

- 1:把所有模块的代码放入到函数中，用一个数组保存起来
- 2:根据require时传入的数组索引，能知道需要哪一段代码
- 3:从数组中，根据索引取出包含我们代码的函数
- 4:执行该函数，传入一个对象 module.exports
- 5:我们的代码，按照约定，正好是用module.exports = 'xxxx' 进行赋值
- 6:调用函数结束后，module.exports从原来的空对象，就有值了
- 7:最终return module.exports; 作为require函数的返回值

#### webpack.config.js文件配置

- ###### entry 是一个对象，程序的入口

  - key:随意写
  - value: 入口文件

- ###### output 是一个对象,产出的资源

  - key: filename
  - value : 生成的build.js

- ###### module 模块（对象）

  - loaders:[]
    - 存在一些loader   `{ test:正则,loader:'style-loader!css-loader'    }



###### 配置文件webpack.config.js的修改

修改配置文件名为:webpack.dev.config.js和webpack.prod.config.js

###### 在package.json文件中修改

```javascript
"scripts": {
     "dev": "webpack --config ./webpack.dev.config.js",
     "prod": "webpack --config ./webpack.prod.config.js"

}
```



#### css文件处理

###### es6模块导入

```javascript
import './main.css'
```

###### 编译之后报错

![image-20180821165449130](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180821165449130.png)

对于webpack来说，css文件也是一个模块，但是像这样的文件，webpack得需要loaders去处理这些文件

###### 下载并配置

```npm i css-loader style-loader -D	```

```javascript
module:{
		loaders:[
			{	
				// 遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			}
            ]
}
```

#### 图片文件的处理

###### App.js 导入图片资源

```javascript
import imgSrc from './myGirl.jpg'

export default{
	template:`
		<div>
			<img :src="imgSrc" alt="" />
		</div>
	`,
	data(){
		return {
			imgSrc:imgSrc
		}
	}
};
```

对文件的处理，webpack得需要```url-loader```和```file-loader```

###### 下载处理图片的loader模块

```npm i url-loader file-loader -D```



###### 添加loader的配置

```javascript
module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit=4000'
			}
		]
	},
```

```javascript
webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
简易,对于比较小的图片，使用base64编码，可以减少一次图片的网络请求；那么对于比较大的图片,使用base64就不适合了，编码会和html混在一起，一方面可读性差，另一方面加大了html页面的大小，反而加大了下载页面的大小，得不偿失了呢,因此设置一个合理的limit是非常有必要的。
```









#### html-webpack-plugin插件的使用

###### 下载模块

```npm i html-webpack-plugin --save-dev```

###### webpack.config.js文件配置

```javascript
const path = require('path');
//2.导入模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果一个，就默认从这一个入口开始分析
		 "main" : './src/main.js'
	},
	output:{
		// 指定产出的目录
		path: path.resolve('./dist'), //相对转绝对
		filename:'build.js'
	},
	// 声明模块
	// 包含各个loader
	module:{
		loaders:[
			{	
				// 遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit=100000'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}
		]
	},
	watch:true, //文件监视改动 自动产生build.js
    //添加插件 
	plugins:[
		new HtmlWebpackPlugin({
			//插件的执行运行与元素索引有关
			templat:'./src/index.html', //参照物
		})
	]
}
```





#### webpack-dev-server

###### 下载模块

1.```npm install webpack-dev-server --save-dev```

常用配置参数

--open 自动打开浏览器

--hot 热更新 ，不在舒心的情况下替换 css样式

--inline  自动刷新

--port 9999 指定端口

--process 显示编译进度

###### 在package.json文件中配置

![image-20180820163658397](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180820163658397.png)

###### 直接执行 ```npm run dev```







#### es6的解析

###### 模块介绍

```babel-core```:

`javascript babel-core的作用是把js代码分析成ast（抽象语法树），方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js`

abel转译器本身，提供了babel的转译API，如babel.transform等，用于对代码进行转译。像webpack的babel-loader就是调用这些API来完成转译过程的。

```babel-loader```:

在将es6的代码transform进行转义，就是通过babel-loader来完成	

```babel-preset-env```

如果要自行配置转译过程中使用的各类插件，那太痛苦了，所以babel官方帮我们做了一些预设的插件集，称之为preset，这样我们只需要使用对应的preset就可以了。以JS标准为例，babel提供了如下的一些preset：

- es2015
- es2016
- es2017
- env
   es20xx的preset只转译该年份批准的标准，而env则代指最新的标准，包括了latest和es20xx各年份
   另外，还有 stage-0到stage-4的标准成形之前的各个阶段，这些都是实验版的preset，建议不要使用。

```babel-plugin-transform-runtime```

babel编译时只转换语法，几乎所有的编译所有新的JavaScript语法，但不会转化DOM里面不兼容的API

比如Promise,Set,Symbol,Array,from,async等等一些API

参考链接：https://www.jianshu.com/p/7bc7b0fadfc2

###### 安装模块

```npm install babel-core babel-loader babel-preset-env babel-plugin-transform-runtime -D``` 

###### 在webpack-dev-config.js配置

```javascript
loader:[
    {
		// 处理es6,7,8
		test:/\.js$/,
		loader:'babel-loader',
		options:{
			presets:['env'],//处理关键字
			plugins:['transform-runtime'],//处理函数
		}
    }
]
```

配置完成之后执行 ```npm run dev```

发现！！！！！

![image-20180820171605801](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180820171605801.png)

解决：

排除不包含node_modules的路径，然后再配置文件中修改

```javascript
loader:[
    {
		// 处理es6,7,8
		test:/\.js$/,
		loader:'babel-loader',
         exclude:/node_modules/,
		options:{
			presets:['env'],//处理关键字
			plugins:['transform-runtime'],//处理函数
		}
    }
]
```

也会发现，当排除掉node_modules文件中的es6代码编译后，编译的时间也快了
以前出错的，3601毫秒的时候就开始出错了。。。。

![image-20180820172501168](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180820172501168.png)

排除掉node_modules之后

![image-20180820172551254](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180820172551254.png)



#### 单文件引入

###### 下载包

```npm install vue-loader@14.1.1 vue-template-compiler@2.5.17 -D```

###### 创建App.vue文件

```javascript
//组件的模板结构
<template>
	<div>
		{{ text }}
	</div>
</template>

//组件的业务逻辑
<script>
export default {
	data(){
		return {
			text:'hello Single file'				
		}
	}
}
</script>
//组件的样式
<style>
	body{
		background-color: green;
	}
</style>
```

###### 创建入口文件main.js

```javascript
import Vue from 'vue';
import App from './App'
new Vue({
	el:'#app',
	//Render函数是Vue2.x版本新增的一个函数；
	// 使用虚拟dom来渲染节点提升性能，因为它是基于JavaScript计算。
	// 通过使用createElement(h)来创建dom节点。createElement是render的核心方法。其Vue编译的时候会把template里面的节点解析成虚拟dom；
	render:c=>c(App)
	// components:{
	//  	App
	// },
	// template:`<App />`
});

```

###### webpack.dev.config.js文件配置

```javascript
// 处理Vue文件
{
	test:/\.vue$/,
	loader:'vue-loader'
}
```









