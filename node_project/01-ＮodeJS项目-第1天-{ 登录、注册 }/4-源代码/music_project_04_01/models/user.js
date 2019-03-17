const db = require('./db.js');
module.exports = {
  getUsers:async ()=> await db.q('select * from users',[]), 
  findUserByUsername:async username => await db.q('select 1 from users where username = ?',username),
  registerUser:async (...user) =>  await db.q('insert into users (username,password,email) values (?,?,?)',user) 
}