var bcrypt = require('bcrypt');
var authQueries = require('../auth/queries');

var auth = require('../auth/token');
var utils = require('../utils/writer.js');

exports.createUser = function ({ username, fullname, password }) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, 10, function(error, hashedPassword) {
      resolve(
        authQueries.selectOrCreateUser({
          username,
          fullname,
          hashedPassword,
        })
        .then(function(data) {
          if (data) {
            console.warn(`User by username ${username} already exists`)
          } else {
            console.info(`User by username ${username} created`)
          }
          return data
        })
      )
    })
  })
}

exports.loginOPTIONS = function (req, res, next) {
  new Promise(function(resolve, reject) {
    resolve();
  })
  .then(function(response) {
    utils.writeJson(res, response)
  })
   .catch(function (response) {
    utils.writeJson(res, response);
  });
};

exports.loginPost = function(args, res, next) {
  var role = args.swagger.params.role.value;
  var username = args.body.username;
  var password = args.body.password;

  if (role != "user" && role != "admin") {
    var response = { message: 'Error: Role must be either "admin" or "user"' };
    return utils.writeJson(res, response, 400);
  }

  return authQueries.selectUser({ username })
    .then(function(data) {
      return new Promise(function (resolve, reject) {
        bcrypt.compare(password, data.password, function(err, matchedPassword) {
          if (matchedPassword) {
            resolve({username, role});
          } else {
            reject(new Error('Passwords do not match.'));
          }
        })
      })
    })
    .then(function({username, role}) {
      var tokenString = auth.issueToken(username, role);
      var response = { token: tokenString };
      return utils.writeJson(res, response)
    })
    .catch(function() {
      var response = { message: "Error: Credentials incorrect" };
      return utils.writeJson(res, response, 403);
    })

  // if (username == "username" && password == "password" && role) {
  // } else {
  //   bcrypt.hash(password, 10, function(error, hashedPassword) {
  //     authQueries.selectOrCreateUser({
  //       username,
  //       hashedPassword,
  //     })
  //   })
  // }
};