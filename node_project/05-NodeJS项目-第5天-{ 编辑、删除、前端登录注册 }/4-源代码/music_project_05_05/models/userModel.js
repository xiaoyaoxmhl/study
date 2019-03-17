// let userModel = {};
const userDB = require('../db');
// userModel.findUser = async username => {
//     return await userDB.q('select * from users where username = ?',[username]);
// }
module.exports = {
    findUserByUsername : username => userDB.q('select * from users where username = ?',[username]),
    addUser : userProps => userDB.q('insert into users (username,password,email) values (?,?,?)',userProps),

}