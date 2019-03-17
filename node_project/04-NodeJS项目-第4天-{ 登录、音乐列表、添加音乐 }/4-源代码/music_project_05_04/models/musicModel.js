
const musicDB = require('../db');

module.exports = {
   findMusicsByUid: id => musicDB.q('select * from musics where uid = ?',[id]),
   addMusicByFields: (...fields) => musicDB.q('insert into musics (title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)',fields)
}