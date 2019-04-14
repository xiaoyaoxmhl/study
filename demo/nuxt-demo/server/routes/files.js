const Router = require('koa-router');
let router = new Router();
router.get('/music/add-music',(ctx,next)=>{
    ctx.render('add');
  })

module.exports = router;
