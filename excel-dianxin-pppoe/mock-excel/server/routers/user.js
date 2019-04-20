const Router = require('koa-router');
const userControl = require('../controllers/userController')
let router = new Router();

router.get('/', (ctx, next) => {
    ctx.render('index');
})
router.post('/login', userControl.login)

module.exports = router;