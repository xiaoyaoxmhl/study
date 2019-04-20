var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'resident'
});
let obj = {};
// 封装一个简易q函数
/**
 * 返回一个promise对象, async await使用
 * @param  {[type]} sql     [description]
 * @param  {[type]} dataArr [description]
 * @return {[type]}         [description]
 */
obj.q = function(sql,dataArr) {
    return new Promise(function(resolve,reject) {
        pool.getConnection(function(err, connection) {
            // 连接异常
            if (err) {
                reject(err);
                return;
            }

            // 调试语句
            // console.log(sql,dataArr);
            // 使用连接
            connection.query(sql, dataArr, function(error, results, fields) {
                // 释放连接会连接池
                connection.release();

                // CRUD相关异常
                if (error) {
                    reject(error);
                    return;
                }
                // console.log(results);
                resolve(results);
            });
        });



    });
}

// 返回obj对象
module.exports = obj;