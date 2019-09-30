const {REDIS_CONFIG} = require('../config/db');
const redis = require('redis');

const redisCli =  redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisCli.on('error', (err) => {
    console.error(err);
})

module.exports = {
    redisCli
};