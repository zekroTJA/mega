"use strict";

const redis = require("redis");

/**
 * Initialize a new redis client instance
 * which is returned afterwards.
 *
 * @param {string} host
 * @param {number} port
 * @param {numer} db
 * @param {string} password
 * @returns redis client
 */
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
