let userModel = {};
const userDB = require('../db');
// userModel.findUser = async username => {
//     return await userDB.q('select * from users where username = ?',[username]);
// }
userModel.findUser = username => userDB.q('select * from users where username = ?',[username]);



module.exports = userModel;