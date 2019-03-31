
const musicDB = require('../db');

module.exports = {
   findMusicsByUid: id => musicDB.q('select * from musics where uid = ?',[id]),
   addMusicByFields: (...fields) => musicDB.q('insert into musics (title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)',fields),
   findMusicById: id => musicDB.q('select * from musics where id = ?',[id]),
   updateMusic:(...music) => musicDB.q('update musics set title = ?,singer = ?, time = ?, file = ?,filelrc = ? where id = ?',music),
   deleteMusicById:id => musicDB.q('delete from musics where id = ?',[id])
}