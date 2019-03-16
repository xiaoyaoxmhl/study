const http = require('http')

const options = {
  protocol: 'https:',
  hostname: 'www.baidu.com',
  port: 80,
  path: '/',
  method: 'post'
}

const client = http.request(options, res => {
  res.on('data', chunk => {
    // 开始接收数据
  })
  res.on('end', () => {
    // 数据接收完毕
  })
  res.on('error', err => {
    // 处理错误
  })
})
// 发送post数据
client.write('name=tom&age=10')
client.end()