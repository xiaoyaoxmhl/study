const net = require('net')

const HOST = 'localhost',
      PORT = '1234';

const client = net.createConnection({
  host: HOST,
  port: PORT
}, () => {
  console.log('连接成功')
  client.write('hello')
})

client.setEncoding('utf-8')
client.on('data', msg => {
  console.log(msg)
})