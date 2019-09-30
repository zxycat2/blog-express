var express = require('express');
var router = express.Router();

const { getBlogList, 
    getBlogDetail, 
    createNewBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../models/resModel')

/* GET home page. */
router.get('/list', function(req, res, next) {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    //登录验证
    // let loginCheckResult = loginCheck(req);
    // if (loginCheckResult != 1){
    //     return loginCheckResult;
    // }
    // author = req.session.username;
    
    // const listData = getBlogList(author, keyword);
    // return new SuccessModel(listData, 'testMsg1')
    const resultBlogPromise = getBlogList(author, keyword)
    return resultBlogPromise.then( listData => {
        res.json(new SuccessModel(listData, 'testMsg1'));
    })
});

module.exports = router;