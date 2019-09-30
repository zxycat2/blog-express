const {excute, escape} = require('../db/mysql');
const {generateEncytedPasswrod} = require('../uil/crypt');

const login = (username, password) => {
    //加密
    encrytedPassword = generateEncytedPasswrod(password);
    //防止sql注入
    username = escape(username);
    encrytedPassword = escape(encrytedPassword);

    console.log(encrytedPassword);

    const sql = `select username, realname from users where username=${username} and password=${encrytedPassword}`;
    // const sql = `select * from users`;
    return excute(sql).then( rows => {
        return rows[0] || {};
    })
//aa
}

module.exports = ({
    login
})