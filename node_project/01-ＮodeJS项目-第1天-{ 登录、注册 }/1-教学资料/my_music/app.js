const path = require('path');
// 构建服务器架构,配置好art-template,路由
const Koa = require('koa');

// 处理请求体数据
var bodyParser = require('koa-bodyparser');
// 引入配置对象
const config = require('./config');


let app = new Koa();

const render = require('koa-art-template');

render(app,{
  // 配置目录,后缀名,是否是调试模式(我们的机器一般都是true)
  // 调试模式: 不压缩代码,实时更新html的静态内容(每次都读文件)
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production' // true 我的环境变量中,没有这个变量,或者不是production的值
});

const router = require('./routes/user_router');
// 引入音乐router
const musicRouter = require('./routes/music_router');

// 重写URL,改掉/public
app.use(async (ctx,next)=> {
  // 判断,如果当前请求是以/public开头, 重写其url再放行
  if ( ctx.request.url.startsWith('/public') ) {
    ctx.request.url = ctx.request.url.replace('/public','');
    // /public/css/x.css  =>  /css/x.css
  }
  // else 不是/public开头,统一放行
  await next();
});

// 处理静态资源
app.use(require('koa-static')('./public') );

// 处理请求体数据 开始  
// app.use(bodyParser());  // 给ctx.request.body 挂数据
// 处理请求体数据 结束

// 处理文字和文件的请求体数据
const formidable = require('koa-formidable')
app.use(formidable({
  uploadDir:config.uploadDir, //上传目录
  keepExtensions:true // 保持原有后缀名
}));

// 处理session
const session = require('koa-session');
app.keys = ['shhhhh']; // 数字签名的加密依赖 
 // 这个是因为你需要保证传递的cookie数据不被串改
// 多发一个cookie(就是另一个cookie的数字签名)

// 配置session的stroe
let store = {  // 吧session数据作为内存处理,当然,还有配置数据库存储的方式
  storage: {},  
  set:function (key,sess) {
      this.storage[key] = sess;
  },
  get:function (key) {
    return this.storage[key];
  },
  destroy:function (key) {
    delete this.storage[key];
  }
};
app.use(session({store:store},app));


// 拦截用户,如果用户没有登录,给与一个简单页面,让用户登录
app.use( async (ctx,next) => {

  // add-music   edit-music delete-music
  // /login   /register
  let regex = /^\/user/; // 判断是否是登录和注册
  let isNonCheck = regex.test(ctx.request.url);

  if (isNonCheck)return await next(); // 是登录和注册,直接放行

  // 如果用户没有登录 !ctx.session.user
  if (!ctx.session.user) {
    return ctx.body = `<div>
          <a href="/login">没有登录,去登录</a>
    </div>`;
  }
  // 如果登录放行
  await next();
});

// 挂载了session和判断了权限
app.use( async (ctx,next) => {
  // 让session中的user,与art-template视图产生联系
  ctx.state.user = ctx.session.user;
  // 在模板处理中  {{ user }}

  // 放行
  await next();
});



// 将路由对象放入到中间件中
app.use( router.routes() );
app.use(musicRouter.routes() );
// 状态码增强, 404 => 405 + 501  
// 405:url存在请求方式错误
// 501:copy之类的不常见的请求方式,服务器没有实现对其处理的
app.use(router.allowedMethods() );
app.use(musicRouter.allowedMethods() );

// 开启服务器
app.listen(8888,()=>{
  console.log('服务器启动在8888端口');
});
