const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SEARCH_SERVICE:process.env.SEARCH_SERVICE || 'localhoast:3000'
};
