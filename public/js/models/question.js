/**
 * Question
 */

var utils = require('../lib/utils');

module.exports = {

};

module.exports.create = function( data ){
  var question = {};

  utils.extend( question, data );

  Object.keys( module.exports )
    .filter( function( k ){
      ['create'].indexOf( k ) === -1;
    })
    .forEach( function( k ){
      question[ k ] = module.exports[ k ];
    });

  return Object.create( question );
};