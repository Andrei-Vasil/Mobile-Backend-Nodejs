const monk = require('monk');

const db = monk('localhost/cat');

module.exports = db;