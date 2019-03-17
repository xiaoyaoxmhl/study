const path = require('path'); // 核心对象
module.exports = {
  viewDir:path.resolve('./views'),
  staticDir:path.resolve('./public'),
  appPort:8888,
  dbConfig:{
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'node_music'
  }
}