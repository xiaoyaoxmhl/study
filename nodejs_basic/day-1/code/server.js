const http = require('http')

const server = http.createServer((req, res) => {
    //...
})

// server.listen(8080, www.xxx.com)


module.exports = server;

// 做测试 当该模块作为主文件执行时，才会执行下面代码。
if(!module.parent){
    server.listen(8888)
    // 模块测试代码
}
// server.listen(8888)