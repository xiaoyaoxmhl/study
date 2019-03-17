// 引入路由中间件 开始
const Router = require('koa-router');

let musicRouter = new Router();

musicRouter.get('/music/index',async ctx => {
  ctx.render('index');
})
.get('/music/add',async ctx => {
  ctx.render('add');
})
.get('/music/edit',async ctx => {
  ctx.render('edit');
});

module.exports = musicRouter;
// 引入路由中间件 结束