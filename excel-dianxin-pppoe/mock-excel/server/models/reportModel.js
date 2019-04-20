const reportDb = require('./db');

module.exports = {
    addReport: (...fields) => reportDb.q('insert into report (path,name) values (?,?)', fields),
    findAllReport: () => reportDb.q('select * from report'),
    deleteReportById: id => reportDb.q('delete from report where id = ?', [id]),
    /*findMusicsByUid: id => musicDB.q('select * from musics where uid = ?', [id]),

    findMusicById: id => musicDB.q('select * from musics where id = ?', [id]),
    updateMusic: (...music) => musicDB.q('update musics set title = ?,singer = ?, time = ?, file = ?,filelrc = ? where id = ?', music),
    deleteMusicById: id => musicDB.q('delete from musics where id = ?', [id])*/
}