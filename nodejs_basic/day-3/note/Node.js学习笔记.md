# Node.js

## 1. WHAT-它是什么

Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/).

* Node.js是运行js的环境，并不是一门新的语言。
* 依旧可以书写之前的js代码。
* 文件的读写，进程管理，数据库的操作
* 不能再去操作dom以及bom

## 2. WHERE-应用场景

- (1) 实时应用：如在线聊天，实时通知推送等等（如[socket.io](http://socket.io/)） 
- (2) 分布式应用：通过高效的并行I/O使用已有的数据  
- (3) 工具类应用：海量的工具，小到前端压缩部署（如[grunt](http://gruntjs.com/)），大到桌面图形界面应用程序  
- (4) 游戏类应用：游戏领域对实时和并发有很高的要求（如网易的[pomelo](http://pomelo.netease.com/)框架）
- (5) Web服务器：利用稳定接口提升Web渲染能力  
- (6) 前后端编程语言环境统一：前端开发人员可以非常快速地切入到服务器端的开发（如著名的纯Javascript全栈式[MEAN](http://mean.io/)架构



## 3. HOW-如何使用

之前怎么使用js开发，现在依旧如此。

## 4. 安装

* NVM 进行Node.js的版本管理
  * list ls 列举所有已安装的版本
  * list available ls-remote 列出所有官网的版本
  * nvm install 版本号 安装对应版本号的node.js
  * nvm use 版本号 切换node.js版本
* NRM 进行包的源管理 
  * npm 安装nrm
  * nrm ls 列出所有可用的npm包源
  * nrm use 源
  * nrm add 添加一个源
  * nrm del 删除一个源

## 5. 初体验

有两种方式来运行node.js

* 直接在终端上执行node命令：REPL
* 书写js文件 通过node命令 加上 参数 入口文件
* 安装nodemon 时时检测文件变化，自执行。

> ```js
> npm install -g nodemon
> ```

## 6. 模块

模块化能隐藏私有的属性和方法，只暴露出公共接口。

![](/Users/jerry/Desktop/Node.js/module.png)

### CommonJS规范

Node.js的模块系统就采用CommonJS规范。CommonJS标准规定：

* 一个单独的文件就是一个模块，
* 模块内将需要对外暴露的变量放到exports对象里，可以是任意对象，函数，数组等，未放到exports对象里的都是私有的。
* 用require方法加载模块，即读取模块文件获得exports对象。

 **注意**

> 在Node.js中，模块对外暴露接口时，实际上就是通过module.exports来实现的。exports只是对module.exports的一个引用。当替换默认对象来暴露接口时，不能使用exports。

**全局变量**

* __dirname : 当前模块所在的目录路劲
* __filename: 当前模块的文件名字
* console

**模块属性**

* module.id: 模块的唯一标识
* module.loaded：标记模块是否加载
* module.parent: 引用模块的模块

## 7. 常用模块

### 7.1 path

* path.join
* path.resolve
* path.parse
* path.format
* path.basename
* path.extname
* path.dirname

### 7.2 url

![](./url.png)

* url.path
* url.resolve
* url.format

### 7.3 query string

- querystring.escape(str)
- querystring.parse(str[, sep[, eq[, options\]]])
- querystring.stringify(obj[, sep[, eq[, options\]]])
- querystring.unescape(str)

### 7.4 http

* http.createServer([options\][, requestListener])
* http.get(options[, callback\])
* http.request(options[, callback\])

### 7.5 events

* EventEmitter
* emitter.on(eventName, listener)
* emitter.off(eventName, listener)
* emitter.once(eventName, listener)
* emitter.emit(eventName)

### 7.6 file system

错误优先：将错误的结果作为回调函数的第一个参数。

* 通用

  * fs.stat() 获取文件
  * fs.rename(oldPath, newPath, callback)
* 目录操作
  * fs.mkdir(path[, mode\], callback)
  * fs.readdir(path[, options\], callback)
  * fs.rmdir(path, callback) 删除目录时，只能删除空目录
* 文件操作

  * fs.writeFile(file, data[, options\], callback) 如果指定的file不存在，就会创建。
  * fs.readFile(path[, options\], callback)
  * fs.unlink(path, callback) 删除文件的
  * fs.appendFile([(path, data[, options\], callback)
  * fs.copyFile(src, dest[, flags\], callback)

* fs.Stats 类

  * stats.isDirectory()
  * stats.isFile()

每一个异步方法对应都有一个同步方法。方法的名字是在后面 + "Sync"。

`fs.writeFile()`  对应 同步方法 `fs.writeFileSync()

**文件权限**

-rw-r--r-- 

在十个字符中，第一个字符 是用来区分文件类型的 -代表是普通文件 d代表目录类型。

之后 九个字符 就表示 文件的权限。权限有三种：r读w写x可执行 r-4 w-2 x-1

* 头三个字符表示文件拥有者的权限rw-  其中-代表占位
* 中间三个字符表示组的权限 r--
* 最后三个表示其他用户的权限r--

****

### 7.7 stream

* [fs.createReadStream(path[, options\])](http://nodejs.cn/api/fs.html#fs_fs_createreadstream_path_options)

* [fs.createWriteStream(path[, options\])
* 模块zlib
  * zlib.createGzip([options\]) 压缩
  * zlib.createGunzip([options]) 解压缩
* 压缩文件

## 8. 路由

```js
// index.js
const http = require('http')

const server = http.createServer()

server.on('connection', (req, res) => {
    // http基本路由
    switch(req.url){
        case '/':
            break;
        case '/signin':
            break;
        case '/users':
            break;
    }
    // 单独逻辑 处理静态文件(.css .js .png .jpg)
})

server.listen(1234)
```



## 9. Socket编程
