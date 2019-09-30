const env = process.env.NODE_ENV; //获取环境

let MYSQL_CONFIG;
let REDIS_CONFIG;

if (env === 'dev'){
    //mysql config
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'rmdxyy2L.',
        port: '3306',
        database: 'myBlog',
        useConnectionPooling: true
    }
    //redis config
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}else if (env === 'production'){
    //mysql config
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'rmdxyy2L.',
        port: '3306',
        database: 'myBlog',
        useConnectionPooling: true
    }
    //redis config
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
};

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
};