var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_music'
});


pool.getConnection(function(err, connection) {
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('INSERT INTO posts SET title=?', 'test', function(error, results, fields) {
            if (error) {
                return connection.rollback(function() {
                    throw error;
                });
            }

            var log = 'Post ' + results.insertId + ' added';

            connection.query('INSERT INTO log SET data=?', null, function(error, results, fields) {
                if (error) {
                    return connection.rollback(function() {
                        throw error;
                    });
                }
                connection.commit(function(err) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    console.log('success!');
                });
            });
        });
    });

});