'use strict';

const express = require('express');
const md5 = require('md5');

const config = require('./../config.json');
const redis = require('../modules/redis');
const getID = require('../modules/idgenerator');

const router = express.Router();
const lastRequest = {};

const db = redis(
  config.redis.host,
  config.redis.port,
  config.redis.db,
  config.redis.password
);

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(router.db);
  res.render('index', { title: 'mega' });
});

/* GET forwarding page. */
router.get('/*', function (req, res, next) {
  getBigLink(req.params[0], (err, link) => {
    if (err) res.status(500).send(err);
    else if (link) res.redirect(link);
    else res.sendStatus(404);
  });
});

/* POST API biggen. */
router.post('/biggen', function (req, res, next) {
  if (req.body.urlToBig.length >= 1000) return res.sendStatus(413);
  if (!validateURL(req.body.urlToBig)) return res.sendStatus(406);

  const remoteIP =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (
    lastRequest[remoteIP] &&
    (new Date() - lastRequest[remoteIP]) / 1000 < (config.cooldown || 60)
  )
    return res.sendStatus(429);

  const urlID = getID();
  lastRequest[remoteIP] = new Date();

  setBigLink(urlID, req.body.urlToBig, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.set('Content-Type', 'application/json');
      res.status(200).send({
        id: urlID,
        url: config.baseURL + urlID,
      });
    }
  });
});

module.exports = router;

/**
 * Returns true when the given URL string
 * matches a valid URL format.
 * @param {string} inp
 * @returns validity
 */
function validateURL(inp) {
  const urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/; // thanks to https://urlregex.com
  return urlReg.test(inp);
}

/**
 * Sets the given key with the given link
 * to the database with a duration read from
 * config.
 *
 * The given key is hashed using md5 to bypass
 * storing 2k chars as key to the database.
 *
 * @param {string} key
 * @param {string} link
 * @param {(err: Error) => void} cb
 */
function setBigLink(key, link, cb) {
  const expiration = config.expiration * 3600;
  key = md5(key);
  db.setex(key, expiration, link, cb);
}

/**
 * Retrieves a value form database by given
 * key which is md5 hashed.
 *
 * The value is passed to the given callback
 * together with potential errors.
 *
 * @param {string} key
 * @param {(err: Error, v: string) => void} cb
 */
function getBigLink(key, cb) {
  key = md5(key);
  db.get(key, cb);
}
