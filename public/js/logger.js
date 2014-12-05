var Logger = require('loglog/lib/logger');

module.exports = new Logger({
  transport: require('loglog-dev-tools')()
}).create('App');