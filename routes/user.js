var express = require('express');
var router = express.Router();

const {SuccessModel, ErrorModel} = require('../models/resModel')
const {login} = require('../controller/user');

/* GET home page. */
router.post('/login', function(req, res, next) {
    console.log('login in express controller');
    const {username, password} = req.body;
    return login(username, password).then( result => {
        if (result.realname){
            //设置session
            req.session.username = result.username;
            req.session.realname = result.realname;
            //同步到redis
            // setDataToRedis(req.sessionID, req.session);
            res.json(new SuccessModel('登录成功'));
        }else{
            res.json(new ErrorModel('登录失败'));
        }
    })
});

module.exports = router;