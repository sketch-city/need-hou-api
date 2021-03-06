'use strict';

require('dotenv').config();

var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    compression = require('compression');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

var auth = require('./auth/token');

var serverPort = process.env.PORT || '8080';

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

app.use(compression())

// Add headers
app.use(function (req, res, next) {

// Website you wish to allow to connect
//res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Origin', '*');
// Request methods you wish to allow
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// // Request headers you wish to allow
 res.setHeader('Access-Control-Allow-Headers',  'Accept, Content-Type, X-Access-Token, X-Application-Name, X-Request-Sent-Time');
// // Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
// Pass to next layer of middleware
next();
});

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Provide the security handlers
  app.use(middleware.swaggerSecurity({
    Bearer: auth.verifyToken
  }));
  app.use(function(err, req, res, next) {
    if(err.statusCode == 403){
      var error = {};
      error.code = 1006;
      error.status = 403;
      error.message = `Authorization Failed.  ${err.message}`;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(error));
    }
    next();
  });


  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
