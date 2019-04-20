const dbObj = require('./db');
module.exports = {

    findUserByUsername : username => dbObj.q('select * from users where name = ?',[username]),
    /*findMusicsByUid: id => musicDB.q('select * from musics where uid = ?', [id]),

    findMusicById: id => musicDB.q('select * from musics where id = ?', [id]),
    updateMusic: (...music) => musicDB.q('update musics set title = ?,singer = ?, time = ?, file = ?,filelrc = ? where id = ?', music),
    deleteMusicById: id => musicDB.q('delete from musics where id = ?', [id])*/
}