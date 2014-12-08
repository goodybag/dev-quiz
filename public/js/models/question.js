/**
 * Question
 */

var utils = require('../lib/utils');

module.exports = {

};

module.exports.create = function( data ){
  var question = Object.create(
    require('events').EventEmitter
  , module.exports
  );

  utils.extend( question, data );

  return question;
};