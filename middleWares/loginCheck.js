const {ErrorModel} = require('../models/resModel');

function loginCheck(req, res, next){
    if (!req.session.username){
        res.json(
            new ErrorModel('登录验证失败')
        );
    }else{
        console.log('登录验证成功');
        next();
        return;
    }
}

module.exports = {
    loginCheck
}