"use strict";

// https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
// http://miguelduarte.pt/2017/04/19/using-jwt-authentication-with-swagger-and-node-js/

var jwt = require("jsonwebtoken");
var fs = require('fs');
var path = require('path');

var issuer = process.env.KEY_ISSUER || `localhost:${process.env.PORT || '8080'}`;

// use 'utf8' to get string instead of byte array  (512 bit key)
const PRIVATE_KEY  = fs.readFileSync(path.resolve(__dirname, 'private.key'), 'utf8');
const PUBLIC_KEY  = fs.readFileSync(path.resolve(__dirname, 'public.key'), 'utf8');  

const BASE_OPTIONS = {
  issuer,
  expiresIn:  "30d",
};

//Here we setup the security checks for the endpoints
//that need it (in our case, only /protected). This
//function will be called every time a request to a protected
//endpoint is received
exports.verifyToken = function(req, authOrSecDef, token, callback) {
  //these are the scopes/roles defined for the current endpoint
  var currentScopes = req.swagger.operation["x-security-scopes"];

  function sendError(error) {
    return new Error(`${error.message} ${req.swagger.swaggerObject.securityDefinitions.Bearer.description}`)
  }

  function confirmTokenVerification( verificationError, decodedToken) {
    //check if the JWT was verified correctly
    if (
      verificationError == null &&
      Array.isArray(currentScopes) &&
      decodedToken &&
      decodedToken.role
    ) {
      // check if the role is valid for this endpoint
      var roleMatch = currentScopes.indexOf(decodedToken.role) !== -1;
      // check if the issuer matches
      var issuerMatch = decodedToken.iss == issuer;

      // you can add more verification checks for the
      // token here if necessary, such as checking if
      // the username belongs to an active user

      if (roleMatch && issuerMatch) {
        //add the token to the request so that we
        //can access it in the endpoint code if necessary
        req.auth = decodedToken;
        //if there is no error, just return null in the callback
        return callback(null);
      } else {
        //return the error in the callback if there is one
        return callback(sendError({
          message: 'Token unverified.'
        }));
      }
    } else {
      //return the error in the callback if the JWT was not verified
      return callback(sendError({
        message: 'Token unverified.'
      }));
    }
  }

  //validate the 'Authorization' header. it should have the following format:
  //'Bearer tokenString'
  if (token && token.indexOf("Bearer ") == 0) {
    var tokenString = token.split(" ")[1];
    return jwt.verify(
      tokenString,
      PUBLIC_KEY,
      Object.assign({
        algorithm: ["RS256"],
      }, BASE_OPTIONS),
      confirmTokenVerification,
    );
  } else {
    //return the error in the callback if the Authorization header doesn't have the correct format
    return callback(sendError({
      message: 'Token missing.'
    }));
  }
};

exports.issueToken = function(username, role) {
  var token = jwt.sign({
      sub: username,
      role: role,
    },
    PRIVATE_KEY,
    Object.assign({
      algorithm:  "RS256",
    }, BASE_OPTIONS),
  );
  return token;
};