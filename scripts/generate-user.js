require('dotenv').config();

const argv = require('minimist')(process.argv.slice(2));
const { createUser } = require('../controllers/authentication');

createUser(argv)
  .then(function(data) {
    if (data) {
      process.exit(1)
    } else {
      process.exit()
    }
  })