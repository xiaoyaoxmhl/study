const userModel = require('../models/user');
module.exports = {
  showRegister:async (ctx,next)=>{
      // let users = await userModel.getUsers();
      // console.log(users);
      ctx.render('register');
  },
  /**
   * 检查用户名是否存在
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  checkUsername:async (ctx,next) => {
    // 处理接受请求之类的繁琐事务，唯独不CRDU
    let { username } = ctx.request.body;
    // 查询数据库中是否存在该用户名
    let users = await userModel.findUserByUsername(username);
    // 判断users数组的长度是否为0
    if(users.length === 0) {
      ctx.body = {  code:'001',msg:'可以注册'};
      return;
    }

    // 存在该用户
    ctx.body = { code :'002',msg:'用户名已经存在'};
  },
  doRegister: async (ctx,next) => {
    let { username,password,email,v_code } = ctx.request.body;
    // 判断用户名是否存在
    let users = await userModel.findUserByUsername(username);
    // 判断是否可以注册
    if(users.length !== 0) {
      ctx.body = {  code:'002',msg:'用户名已经存在！'};
      return;
    }

   try {
     // 开始注册(可以做异常捕获)
      let result = await userModel.registerUser(username,password,email);

      // insertId  rows  判断是否插入成功，再给予提示
      // console.log(result);
      if (result.affectedRows === 1) {
        ctx.body = { code: '001',msg:'注册用户成功'}
        return;
      } 

      // 不等于1的情况会发生在id冲突，就不插入数据
      ctx.body = { code:'002' , msg:result.message };
    }catch(e) {
      // 判断e的一些信息 code
      ctx.throw('002');
    }


  }
}