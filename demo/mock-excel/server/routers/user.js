const Router = require('koa-router');

let router = new Router();

router.get('/',(ctx,next)=>{
    ctx.render('index');
})
module.exports = router;