// 配置路由
const Router = require('koa-router');
let userController = require('../controllers/user_controller');
let router = new Router();
// 路由规则 

// 注册页面
router.get('/user/register',ctx =>{
  ctx.render('register');
})
.get('/user/login',ctx =>{
  ctx.render('login');
})
// .post('/check-username',(ctx)=>{ /*各种操作包括db*/ })
.post('/user/check-username', userController.checkUsername ) // 检查用户名
.post('/user/do-register',userController.doRegiser )
.post('/user/do-login',userController.doLogin) // 登录
.get('/user/test-session',userController.test) 
.get('/user/get-pic',userController.getPic) // 验证码
.get('/user/logout',userController.logout)
// 测试
// router.get('/',async ctx =>{

//   // 使用db.js里面对象的q函数 =>  
//   // 对应异步操作: 1: promise来包裹,  await 让其等,  async就需要有
//   let db = require('./models/db');
//   let users = await db.q('select * from users where id = ?',[5]);
//   console.log(users);
//   let user = users[0];

//   ctx.render('index',{
//     text:user.username
//   });
// })

module.exports = router;