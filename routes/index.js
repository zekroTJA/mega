"use strict";

const express = require("express");
const md5 = require("md5");
const config = require("./../config.json");

const router = express.Router();
const lastRequest = {};

const redis = require("../modules/redis");

const db = redis(
  config.redis.host,
  config.redis.port,
  config.redis.db,
  config.redis.password
);

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(router.db);
  res.render("index", { title: "mega" });
});

/* GET forwarding page. */
router.get("/*", function (req, res, next) {
  getSortLink(req.params[0], (err, link) => {
    if (err) res.status(500).send(err);
    else if (link) res.redirect(link);
    else res.sendStatus(404);
  });
});

/* POST API biggen. */
router.post("/biggen", function (req, res, next) {
  if (req.body.urlToBig.length >= 1000) return res.sendStatus(413);
  if (!validateURL(req.body.urlToBig)) return res.sendStatus(406);

  let remoteIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (
    lastRequest[remoteIP] &&
    (new Date() - lastRequest[remoteIP]) / 1000 < (config.cooldown || 60)
  )
    return res.sendStatus(429);

  let urlID = getID();
  lastRequest[remoteIP] = new Date();

  setBig(urlID, req.body.urlToBig, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.set("Content-Type", "application/json");
      res.status(200).send({
        id: urlID,
        url: config.baseURL + urlID,
      });
    }
  });
});

module.exports = router;

function validateURL(inp) {
  let urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/; // thanks to https://urlregex.com
  return urlReg.test(inp);
}

function getID() {
  return Math.floor((1 + Math.random()) * 0x1000000)
    .toString(16)
    .substring(1);
}

function setBig(key, link, cb) {
  const expiration = config.expiration * 3600;
  key = md5(key);
  db.setex(key, expiration, link, cb);
}

function getSortLink(key, cb) {
  key = md5(key);
  console.log(key);
  db.get(key, cb);
}
