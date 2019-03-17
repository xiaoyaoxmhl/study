const Koa = require('koa');

// 引入两个router
const musicRouter = require('./routers/music');
const userRouter = require('./routers/user');
const bodyParser = require('koa-bodyparser');


// 创建服务器
let app = new Koa();

let { appPort,viewDir,staticDir } = require('./config');

// 开启服务器
app.listen(appPort,()=>{
  console.log(`服务器启动在${appPort}端口`);
});

// 模板渲染
const render = require('koa-art-template');
render(app, {
  root: viewDir,
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});


// 中间件使用列表 app.use

// 优雅的处理异常
app.use(async (ctx,next) => {
    try {
      //先放行
      await next();
    }catch (e) {
      // 根据之前的
      // e.code之类的状态码002
      ctx.render('error',{msg:'002状态错误，原因是:xxx'})
    }


})



// 为了给static重写URL
app.use(async (ctx,next) => {

    if(ctx.url.startsWith('/public') ) {
      // 重写URL
      ctx.url = ctx.url.replace('/public','');
    }

    // 放行
    await next();
});


//处理静态资源
app.use(require('koa-static')(staticDir));

// 处理请求体数据 ctx.request.body获取
app.use(bodyParser());

app.use(userRouter.routes());
app.use(musicRouter.routes());

//处理405 方法不匹配 和 501 方法未实现
app.use(userRouter.allowedMethods());

// 中间件使用列表  结束