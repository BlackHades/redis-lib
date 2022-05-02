"use strict";
const Redis = require("ioredis");

/**
 *
 * @param {object} config
 * @param {string} config.appName
 * @param {string} config.url
 * @return {Cluster|Redis}
 */
const localhost = process.env.REDIS_HOST || "127.0.0.1";
const port = process.env.REDIS_PORT || 6370
const password = process.env.REDIS_PASSWORD || ""
module.exports = (config = {}) => {
    let url = config.url ||  process.env.REDIS_CLUSTER_URL || process.env.REDIS_URL ||  `redis://${password ? ":" + password + "@" : ""}${localhost}:${port}`;

    console.log("URL", url, config);
    let redis;
    //We are splitting the URL because of clusters
    const urls = url?.split(",");
    if (urls.length === 1) {
        redis = new Redis(url)
    } else {
        redis = new Redis.Cluster(urls);
    }

    redis.getAsync = redis.get;
    redis.setAsync = redis.set;
    redis.hmsetAsync = redis.hmset;
    redis.hmgetAsync = redis.hmget;
    redis.hgetAsync = redis.hget;
    redis.hsetAsync = redis.hset;
    redis.hgetAllAsync = redis.hgetall;
    redis.hdelAsync = redis.hdel;
    redis.clear = redis.del;

    redis.on("connected", function () {
        console.log("Redis is connected");
    });

    redis.on("error", function (err) {
        console.log("Redis error.", err);
        console.log(err.message, err, {}, true);
    });

    if(config.keepAlive){
        setInterval(function () {
            console.log(`Keeping alive ${config.appName || process.env.APP_NAME}`);
            redis.set('ping', 'pong');
        }, 1000 * 60 * 4);
    }


    global.cache = redis;
    global.redis = redis;
    return redis
}
