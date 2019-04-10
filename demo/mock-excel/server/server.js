const Koa = require('koa');
const userRouter = require('./routers/user');
const filesRouter = require('./routers/files');
const path = require('path');
const koaBody = require('koa-body');

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

app.use(userRouter.routes());
app.use(filesRouter.routes());
