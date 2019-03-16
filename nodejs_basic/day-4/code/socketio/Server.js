const http = require('http')
const fs = require('fs')
const path = require('path')
const sio = require('socket.io')

const server = http.createServer((req, res) => {
  // 路由配置
  switch(req.url){
    case '/':
      fs.readFile('./index.html', (err, data) => {
        if(err){
          res.writeHead(500)
          res.end('Not Found Index Page.')
          return
        }
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8'
        })
        res.end(data)
      })
      break
    // 处理静态文件的请求
    default:
      fs.readFile(path.join(__dirname, req.url), (err, data) => {
        if(err){
          console.log(err)
          res.end('')
          return
        }
        res.end(data)
      })
      console.log(req.url);
  }
})

const io = sio(server)

const clients = {} // key => nickname, value => socket id

io.on('connection', client => {
  client.on('new user', nickname => {
    client.nickname = nickname
    clients[nickname] = client.id
    client.emit('login', {state: true})
  })
  client.on('new message', msg => {
    client.broadcast.emit('new message', {
      nickname: client.nickname,
      message: msg
    })
  })
})
// 私信 思路
// io.sockets.sockets 拿到了所有在线的用户的套接字对象 通过id过滤出来
// 作业
// 1 用户断开连接 清楚服务器信息
// 2 实现私信功能

server.listen(1234, () => {
  console.log('Server running.');
})