"use strict";

// https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers#417184
const MAX_SIZE = 2000 - 100; // Max theoretical URL size minus domain name, sub domain, TLD and bla.
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/[]@!$&'()*+,;=";

// Function used to generate character repetations to make
// the final URL even more uglier.
const multiplierFunc = (v) => Math.pow(v, 20) * 10 + 1;

/**
 * Generate an ID which is to 100 percent completely
 * and definetly unique on the entire universe. Just
 * to make sure. Not just to make the link longer.
 */
function getOneHundredPercentUniqueID() {
  let str = "";
  do {
    str += getRandChars();
  } while (str.length <= MAX_SIZE);

  return str.substr(0, MAX_SIZE);
}

function getRandChars() {
  const i = Math.floor(random(0, CHARS.length));
  const char = CHARS[i];

  const mult = Math.floor(multiplierFunc(random(0, 1)));
  return char.repeat(mult);
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

module.exports = getOneHundredPercentUniqueID;
