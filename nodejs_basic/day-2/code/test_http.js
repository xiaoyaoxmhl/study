const http = require('http')

// 创建服务器的实例
const server = http.createServer((request, response) => {
    // 设置请求头
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    })
    // 根据 用户不同的path 响应不同的页面数据
    switch(request.url){
        case '/index':
            response.write('index')
            break
        case '/about':
            response.write('about')
            break
        default: 
            response.write('这是网站跟目录')

    }
    response.end('<p>哈哈 终于结束了</p>') // 通知客户端 数据响应完毕 不用等待了
})

// 启动服务器
server.listen(8888, (err) => {
    if(err) return console.error(err)

    console.log('服务器启动成功')
})

const client = http.get('http://localhost:8888/index', res => {
    // console.log(res)
    let {statusCode} = res
    // 请求成功
    if(statusCode == 200){
        res.setEncoding = 'utf-8'
        let chunks = []
        // 监听data事件 开始接收数据
        res.on('data', chunk => {
            chunks.push(chunk)
        })
        // 监听end事件，当end事件触发，表示接收数据完成
        res.on('end', () => {
            console.log(Buffer.concat(chunks).toString());
            // console.log(chunks.join(''));
        })
    } else { // 请求失败
        // ...
    }
})