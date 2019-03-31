const express = require('express');
const app = express();

//解析 HTTP 请求中的正文信息，并把这些信息存储到 req.body 对象中
const bodyParser = require('body-parser');

var cors = require('cors');//它可以响应前端发送过来的 API 请求，并且让浏览器接受响应信息。

const test = require('./routers/mockTest');

app.use(bodyParser.json());
// 如果想使用form提交，这一行是必要的
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());//让所有的请求源都能访问服务器提供的接口，当服务器端响应 API 请求的时候，会在响应信息中添加一些响应头标识（response header）   Access-Control-Allow-Origin: *




app.listen(9093, function () {
    console.log('Node app start at port 9093')
})
test(app);