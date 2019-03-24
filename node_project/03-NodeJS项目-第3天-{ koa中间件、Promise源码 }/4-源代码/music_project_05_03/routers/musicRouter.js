// 1:引入 Koa-router
const Router = require('koa-router');

// 2: 创建路由对象
let router = new Router();

// 3:配置路由规则
router.get('/music/index',(ctx,next)=>{
    ctx.render('index');
})
.get('/music/add-music',(ctx,next)=>{
    ctx.render('add');
})
.get('/music/edit-music',(ctx,next)=>{
    ctx.render('edit');
})


// 导出给app。进行配置中间件
module.exports = router;