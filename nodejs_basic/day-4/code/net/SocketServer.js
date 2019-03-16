const net = require('net')

const server = net.createServer()

server.on('connection', sock => {
  sock.setEncoding('utf-8')
  sock.on('data', msg => {
    console.log(msg);
    sock.write('hello, too');
  })
})

server.on('error', err => {
  console.error(err)
})

server.on('close', () => {
  console.log('Server closed.');
})

server.listen(1234, err => {
  if(err) return console.error(err);
  console.log('Server running.');
})