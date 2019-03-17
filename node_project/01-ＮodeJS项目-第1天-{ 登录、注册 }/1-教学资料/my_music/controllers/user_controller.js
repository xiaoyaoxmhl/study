const user_db = require('../models/db.js');
// 其实当require一个模块的时候,默认导出是一个空对象

// module.exports.checkUsername = function () {}
exports.checkUsername = async (ctx) => {
  // 1: 接收请求体数据  ctx.request.body
  let { username } = ctx.request.body;
  // 2: 查询数据库 let data = await user_db.q();
  let users = await user_db.q('select * from users where username = ?',[username]);
  // 3: 响应json对象
  //     ctx.body = {data};
  // users.length != 0 说明,有该用户,响应002 用户存在
  if (users.length !== 0) {
    return ctx.body = { code:'002',msg:'用户名已经存在' };
  } 
  // 没有该用户
  ctx.body = { code:'001',msg:'可以注册'};
}

/**
 * 注册
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.doRegiser = async ctx => {

  


  // 1:接收请求体数据
  let { username,password,email,vcode } = ctx.request.body;

  // console.log(vcode);  // 字符串类型
  // console.log(ctx.session.vcode);  // 数字类型
  // 优先判断验证码
  if(vcode != ctx.session.vcode ) {
    return ctx.body = { code:'003',msg:'验证码不正确'};
  }


  // 2:查询
  let users = await user_db.q('select * from users where username = ? or email = ?',[username,email]);
  let user;
  // users.length == 1 对比到底是username相等,还是email相等
  if (users.length !== 0) {

    if (users.length > 1 ) return ctx.body = {code:'004',msg:'用户名和邮箱都存在'};
    
    user = users[0]; // 注册已经被我卡死,所以此处最多一条
    if ( user.username === username && user.email === email) return ctx.body = { code:'004',msg:'用户名和邮箱都存在'};
    if (user.username === username ) return ctx.body = {code:'002',msg:'用户名已经存在'};
    if (user.email === email) return ctx.body = {code:'003',msg:'邮箱已经存在'};
  }
 // 查询用户名与username相等 || 邮箱与email相等
  // users.length == 0完全不等 =>  可以注册
  // 3:插入数据
  let result = await user_db.q('insert into users (username,password,email) values (?,?,?)',[username,password,email]);
  console.log(result);
  // 4:响应结果
  ctx.body = { code:'001',msg:'注册成功'};
}


exports.doLogin = async ctx => {
  // 1:接收请求体
  let { username, password,remember_me } = ctx.request.body;

  // 查询数据库数据是否存在,用户名作为条件
  let users = await user_db.q('select * from users where username = ?',[username]);

  // 判断是否查询到用户
  if (users.length === 0) {
    // 没有用户不能登录
    return ctx.body = { code:'002',msg:'用户名或者密码不正确!'};
  }
  // 判断密码是否一致
  let user = users[0];
  if(user.password != password) {
    return ctx.body = {code:'002',msg:'用户名或者密码不正确!'};
  }

  // 用户存在且密码一致
  // 登录操作
  ctx.session.user = user; // 记住这个客户端的登录信息,下次访问,也能有该信息

  // 响应登录成功状态码
  ctx.body = { code:'001',msg:'登录成功'};


}

exports.test = (ctx) =>{
  ctx.body = ctx.session.user;
}

const captchapng = require('captchapng2');

/**
 * 生成验证码
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.getPic = ctx => {

    let rand = parseInt(Math.random() * 9000 + 1000);
    let png = new captchapng(80, 30, rand); // width,height, numeric captcha
 
    // 保存结果到用户的session中
    ctx.session.vcode = rand;


    ctx.response.set('Content-Type','image/png');
    ctx.body = png.getBuffer();
}


exports.logout = ctx => {
  // 清除登录信息,就是退出
  ctx.session.user = null;
  // 页面重定向
  ctx.response.redirect('/user/login');

}