"use strict";

const redis = require("redis");

function redisClient(host, port, db, password) {
  const client = redis.createClient({
    host,
    port,
    db,
    password,
  });

  return client;
}

module.exports = redisClient;
