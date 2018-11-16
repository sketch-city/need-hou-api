var pgp = require('pg-promise')();
var db = require('../db');

const QueryResultError = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
  selectOrCreateUser,
  selectUser,
  createUser,
}

function selectOrCreateUser({ username, fullname, hashedPassword }) {
  return selectUser({ username })
    .catch(function (error) {
      if (error instanceof QueryResultError && error.code === qrec.noData) {
        return createUser({ username, fullname, hashedPassword })
      }
      console.warn(error)
    })
}

function selectUser({ username }) {
  const queryStr = `SELECT * FROM users WHERE username = '${username}'`
  return db.one(queryStr)
}

function createUser({ username, fullname, hashedPassword }) {
  const queryStr = `INSERT INTO users (
      username,
      fullname,
      password
    ) VALUES (
      '${username}',
      '${fullname}',
      '${hashedPassword}'
    )`

  return db.none(queryStr)
}