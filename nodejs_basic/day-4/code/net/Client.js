const net = require('net')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


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
  say()
})

function say(){
  rl.question('请输入：', (msg) => {
    console.log('我：' + msg);
    client.write(msg + '\n');
  });
}