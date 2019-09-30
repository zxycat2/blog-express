const {excute, escape} = require('../db/mysql');
const xss = require('xss');

//获取博客List
const getBlogList = (author, keyword) => {

    //执行sql语句
    let sql = 'select * from blogs where 1=1 ';
    if (author){
        author = escape(author);
        sql += ` and author = ${author} `
    };
    if (keyword){
        keyword = escape(keyword);
        sql += ` and title like %${keyword}%`
    }
    sql += ` order by createTime desc;`;
    //注意此处return的是一个promise
    return excute(sql);
}

//获取博客Detail
const getBlogDetail  = (id) => {
    //防止sql注入
    id = escape(id);

    const sql = `select * from blogs where id=${id}`;

    return excute(sql).then( allResults => {
        // console.log(allResults);
        // console.log(allResults[0]);
        return allResults[0];
    });
}

//新建博客
const createNewBlog = (blogData = {}) => {
    //防止sql注入
    const title = escape(blogData.title);
    const content = escape(blogData.content);
    const author = escape(blogData.author);
    const createTime = Date.now();
    //防止xss攻击
    title = xss(title);
    contente = xss(content);

    const sql = `insert into blogs (title, content, createTime, author) 
    values (${title},${content}, '${createTime}', ${author})`;

    return excute(sql).then( resultObj => {
        console.log(resultObj);
        return {
            id:resultObj.insertId
        };
    })

     //返回新博客在数据库中的id，证明新建成功
     
}

//更新博客
const updateBlog = (id, blogData = {}) => {
    //防止sql注入
    id = escape(id);
    const title = escape(blogData.title);
    const content = escape(blogData.content);

    const sql = `update blogs set title=${title}, content=${content} 
    where id=${id}`;
    console.log(sql);//c
    return excute(sql).then( resultObj => {
        if (resultObj.affectedRows > 0){
            return true;
        }else{
            return false;
        }
    })
}

//删除博客
const deleteBlog = (id, author) => {
    //防止sql注入
    id = escape(id);
    author = escape(author);
    const sql = `delete from blogs where id=${id} and author=${author}`;
    return excute(sql).then( resultObj => {
        if (resultObj.affectedRows > 0){
            return true;
        }else{
            return false;
        }
    })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}