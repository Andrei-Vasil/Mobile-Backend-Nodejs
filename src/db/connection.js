const monk = require('monk');

const db = monk('127.0.0.1:27017/cat');

module.exports = db;