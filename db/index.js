var pgp = require('pg-promise')();
var connectionString = process.env.DB_STRING;
var db = pgp(connectionString);

module.exports = db;