const Koa = require('koa');

let app = new Koa(); // 创建服务器对象
const { rewriteUrlList, port, routeList, renderRootDir, staticDir,uploadDir } = require('./config');
// 监听端口
app.listen(port, () => {
    console.log(`服务器启动在${port}端口`);
    // 模板字符串，可以包含换行和嵌入变量
});
// art-template
const render = require('koa-art-template');


render(app, {
    root: renderRootDir, // 模板查找路径views
    extname: '.html',
    // 获取环境变量中的NODE_ENV: true : debug 开发
    //    1:  不压缩，不混淆 ，实时更新静态页面
    debug: process.env.NODE_ENV !== 'production', //  压缩，混淆 ，不实时更新静态页面
});


// 引入各个路由对象，并配置中间件
const musicRouter = require('./routers/musicRouter');
const userRouter = require('./routers/userRouter');
const errorHandler = require('./middlewares/errorHandler')

// 处理异常的中间件
app.use(errorHandler)



const rewriteUrl = require('./middlewares/reWriteUrl');
// 在静态资源处理中间件之前，捣鼓一点事情(重写URL)
app.use(rewriteUrl(rewriteUrlList));

// 处理静态资源                   // 相对变绝对
app.use(require('koa-static')(staticDir));



// 处理session 开始
const session = require('koa-session');
app.keys = ['some secret hurr']; // signed为true的时候，为了保证cookie的数据不被篡改，A|B,额外将A和B以特定字符串为基数的算法，进行计算（签名）

// 将session对应的数据保存再服务器内存中
let store = {
    storage: {},
    set: function(key, session) {
        this.storage[key] = session;
    },
    get: function(key) {
        return this.storage[key];
    },
    destroy: function(key) {  
        // 在 ctx.session = null的时候执行
        // 通过客户都的cookie钥匙删除session数据
        delete this.storage[key];
    }
};

const CONFIG = {
    key: 'koa:sess', // cookie的名称
    maxAge: 86400000, // 过期时间（毫秒）
    httpOnly: true, // true的话，客户端无法访问该cookie
    signed: true, // 数据签名，根据数据进行计算，保证数据不被修改
    rolling: false, // 顺延的cookie的有效期
    store: store, // 内存存储session数据
};

app.use(session(CONFIG, app));
// 处理session 结束


// 验证是否登录
const checkLogin = require('./middlewares/checkLogin');
app.use(checkLogin(routeList));


// 解析请求体数据
// app.use(require('koa-bodyparser')());  
// 上下两个中间件都有ctx.request.body ，再一起使用，产生的冲突，卡住了

// 上传文件
const formidable = require('koa-formidable')
app.use(formidable({
    // 上传文件的目录
    uploadDir,
    keepExtensions:true // 保留后缀名
}));

// 将服务器数据与视图进行连接
app.use(async function (ctx,next) {
    // art-template的视图对象
    ctx.state.user = ctx.session.user;
    await next();
});

// 路由
app.use(musicRouter.routes());
app.use(userRouter.routes());

// 原本配置了/a 的get请求方式,但你用了post请求方式, 返回404, 
// 以下配置可以返回405  方法不匹配
// 如果客户端使用了元·服务器不能支持的请求方式 比如copy, 返回404
// 以下配置可以返回501  方法未实现
app.use(userRouter.allowedMethods());








// const db = require('./db.js');

// app.use(async (ctx,next)=>{
//   let user;
//     // 查询数据库  结果是一个数组
//     // 1: await 对应 resolve(参数)
//     // 2: reject(????)
//     try {
//        user= (await db.q('select * from users where id = ?',[1]))[0].username;

//       console.log(user);
//       // ctx.body = 'haha'; // 响应数据
//       await ctx.render('index.html',{
//           msg:user
//       });
//     } catch (e) {
//       // 对应reject(err)
//       console.log(e);
//     }   
// });