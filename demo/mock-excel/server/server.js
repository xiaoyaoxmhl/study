const Koa = require('koa');
const userRouter = require('./routers/user');
const filesRouter = require('./routers/files');
const path = require('path');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

let app = new Koa(); // 创建服务器对象

app.listen(4000, () => {
    console.log(`服务器启动在4000端口`);
    // 模板字符串，可以包含换行和嵌入变量
});


const render = require('koa-art-template');


render(app, {
    root: path.join(__dirname, '../views'), // 模板查找路径views
    extname: '.html',
    // 获取环境变量中的NODE_ENV: true : debug 开发
    //    1:  不压缩，不混淆 ，实时更新静态页面
    debug: process.env.NODE_ENV !== 'production', //  压缩，混淆 ，不实时更新静态页面
});

// const formidable = require('koa-formidable')
// app.use(formidable({
//     // 上传文件的目录
//     uploadDir:path.resolve(__dirname,'../public/files'),
//     keepExtensions:true // 保留后缀名
// }));

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));

/*
app.use(async (ctx, next) => {
    if (ctx.request.header.origin !== ctx.origin ) {
        ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
        ctx.set('Access-Control-Allow-Credentials', true);
    }
    await next();
});

app.use(async (ctx, next) => {
    if (ctx.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
        ctx.set('Access-Control-Max-Age', 3600 * 24);
        ctx.body = '';
    }
    await next();
});
*/
// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return "*"
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


const logger = require('koa-pino-logger');
const loggerCb = logger();
app.use((ctx, next) => {
    console.log(new Date().toString());
    return loggerCb(ctx, next);
})

const {validAuth} = require('./controllers/utils')

app.use(async (ctx, next) => {
    let {status, data, token} = await validAuth(ctx);
    ctx.validStatus = {status, data, token};
    await next();
})

app.use(userRouter.routes());
app.use(filesRouter.routes());
