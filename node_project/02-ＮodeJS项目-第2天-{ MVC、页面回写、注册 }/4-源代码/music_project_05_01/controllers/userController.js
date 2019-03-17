const obj = {};
const userModel = require('../models/userModel');
obj.checkUsername = async (ctx,next) => {
    // 1: 接收请求体的username
    let { username } = ctx.request.body;
    // 2: 根据username查询数据库
    let users = await userModel.findUser(username);
    // 3: 根据查询结果来响应客户端 ctx.body = {code:'001'}
    if(users.length === 0) {
        ctx.body = { code:'001',msg:'可以注册'};
        return;
    }
    
    ctx.body = { code:'002',msg:'用户名已经存在'};

}



module.exports = obj;