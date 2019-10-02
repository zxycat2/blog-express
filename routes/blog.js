var express = require('express');
var router = express.Router();

const { getBlogList, 
    getBlogDetail, 
    createNewBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../models/resModel')
const {loginCheck} = require('../middleWares/loginCheck')

/* GET home page. */
router.get('/list', function(req, res, next) {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    //登录验证
    // let loginCheckResult = loginCheck(req);
    // if (loginCheckResult != 1){
    //     return loginCheckResult;
    // }
    //强制只查询自己的博客
    if (req.session.username == null){
        res.json(new ErrorModel('未登录'));
    }else{
        author = req.session.username;
    }
    // const listData = getBlogList(author, keyword);
    // return new SuccessModel(listData, 'testMsg1')
    const resultBlogPromise = getBlogList(author, keyword)
    return resultBlogPromise.then( listData => {
        res.json(new SuccessModel(listData, 'testMsg1'));
    })
});

router.get('/detail', loginCheck, (req, res, next) => {
    const id = req.query.id;
        // const detailData = getBlogDetail(id);
        // return new SuccessModel(detailData, 'testMsg2')
        const detailResultPromise = getBlogDetail(id);
        return detailResultPromise.then( detailData => {
            res.json(SuccessModel(detailData, 'testMsg'));
        })
})

router.post('/update', loginCheck, (req, res, next) => {
    const id = req.query.id;
        const blogData = req.body;
        return updateBlog(id, blogData).then( result => {
            if (result){
                res.json(new SuccessModel());
            }else{
                res.json(new ErrorModel('更新博客失败'));
            }
        })
})

router.post('/delete', loginCheck, (req, res,next) => {
    const id = req.query.id;
    const author = req.session.username;
    return result = deleteBlog(id, author).then( result => {
        if (result){
            res.json(new SuccessModel());
        }else{
            res.json(new ErrorModel('更新博客失败'));
        }
    })
})

router.post('/new', loginCheck, (req, res,next) => {
    const blogData = req.body;
    blogData.author = req.session.username;
    return resultPromise = createNewBlog(blogData).then( idObj => {
        res.json(new SuccessModel(idObj, 'newBlogMsg'));
    })
})

module.exports = router;