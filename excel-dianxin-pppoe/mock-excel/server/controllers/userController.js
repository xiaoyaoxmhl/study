const {generateToken} = require('./utils');
const userObj = {};
const {findUserByUsername} = require('../models/userModel')
userObj.login = async (ctx, next) => {
    console.log(ctx.request.body);
    const {user, password} = ctx.request.body;
    let word = await  findUserByUsername(user);

    if (word.length === 0) {
        ctx.body = {
            status: false,
            msg: '账号密码错误',
        }
    } else if (word[0].password !== password) {
        ctx.body = {
            status: false,
            msg: '账号密码错误',
        }
    } else {


        ctx.body = {
            status: true,
            msg: 'succss',
            data: generateToken({user})
        }
    }
    await next();
}

module.exports = userObj;