const mysql = require('mysql');
const {MYSQL_CONFIG} = require('../config/db');

const con = mysql.createConnection(MYSQL_CONFIG);
con.connect();

//执行sql请求
function excute(sql) {
    const promise = new Promise( (resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err){
                reject(err);
                return;
            }else{
                resolve(res);
            }
        })
    })
    return promise;
}

module.exports = {
    excute,
    escape: mysql.escape
}