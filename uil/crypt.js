const crypto = require('crypto');

//密匙
const SECRET_KEY = 'DoDoHereMate_10086!!!';

//md5 加密!
function md5Encrpt(content){
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

//加密函数
function generateEncytedPasswrod(plainPasswrod){
    let str = `Password=${plainPasswrod}&SECRET_KEY=${SECRET_KEY}`;
    return md5Encrpt(str);
}

console.log(generateEncytedPasswrod('123456'));

module.exports = {
    generateEncytedPasswrod
}