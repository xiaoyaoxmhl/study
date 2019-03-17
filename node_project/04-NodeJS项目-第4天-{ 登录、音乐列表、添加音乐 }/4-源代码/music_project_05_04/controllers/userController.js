const obj = {};
const userModel = require('../models/userModel');
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

module.exports = obj;