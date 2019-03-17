const obj = {};
const userModel = require('../models/userModel');
const captchapng = require('captchapng2');
/**
 * 验证用户名是否存在
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
obj.checkUsername = async (ctx,next) => {
    // 1: 接收请求体的username
    let { username } = ctx.request.body;
    // 2: 根据username查询数据库
    let users = await userModel.findUserByUsername(username);
    // 3: 根据查询结果来响应客户端 ctx.body = {code:'001'}
    if(users.length === 0) {
        ctx.body = { code:'001',msg:'可以注册'};
        return;
    }
    
    ctx.body = { code:'002',msg:'用户名已经存在'};

}
/**
 * 注册
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
obj.doRegister = async ctx =>{
    // 1: 接收请求数据
    let { username,password,email,v_code } = ctx.request.body;
    // 2: 判断v_code 因为其不用查询DB
    if (ctx.session.v_code != v_code) {
        ctx.body = { code:'003',msg:'验证码不正确'};
        return;
    }
    // 3: 验证邮箱是否合法
    // 4: 根据用户名查询出数据,判断该用户是否存在
    let users = await userModel.findUserByUsername(username);
    
    if(users.length !== 0) {
        // 5: 如果存在，响应code:'002'
        ctx.body = { code: '002', msg:'用户名已经存在'};  
        return;  
    }
    // 6: 如果不存在，向数据库插入该数据
    let result = await userModel.addUser([username,password,email])
 

    // 判断插入数据是否成功
    if(result.affectedRows !== 1) {
        // 抛出异常
        ctx.throw(result.message); // 抛给错误处理中间件
        return;
    }

   // 7: 响应状态码001
    ctx.body = {
        code:'001',msg:'注册成功'
    }
}
/**
 * 登录
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
obj.doLogin = async (ctx,next) => {
    // 获取username和password
    let { username,password } = ctx.request.body;
    // 判断用户名是否存在，接着对比密码
    let users = await userModel.findUserByUsername(username);
    if( users.length === 0) {
        ctx.body = { code:'002',msg : '用户名或者密码不正确'};
        return;
    }
    // 对比密码是否一致
    let user = users[0]; 
    if(user.password != password) {
        ctx.body = { code:'002',msg : '用户名或者密码不正确'};
        return;
    }
    
    // session机制  通过cookie钥匙来实现
    ctx.session.user = user;
    // 用户存在
    ctx.body = { code:'001',msg:'登录成功'};
}
/**
 * 退出
 * @return {[type]} [description]
 */
obj.doLogout = (ctx,next) => {
    // 清除登录状态及销毁session
    ctx.session = null; // 销毁自己的session
    // ctx.body = { code:'001',msg:'退出成功'  };
    ctx.redirect('/user/login');
}
// CCAP 基于C++环境可以生成任意字符串
obj.getCaptcha = (ctx,next) => {
    let rand = parseInt(Math.random() * 9000 + 1000);
    let png = new captchapng(80, 30, rand); // width,height, 

    // 将答案记录在服务器，针对不同的请求
    ctx.session.v_code = rand;  // 在服务器保存答案，并响应一个cookie回去，建立session
    // 返回验证码数据
    ctx.body = png.getBuffer();  // 1234
}
module.exports = obj;