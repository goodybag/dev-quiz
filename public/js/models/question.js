/**
 * Question
 */

var utils = require('../lib/utils');

module.exports = {
  setSelection: function( s ){
    if ( this.selection === s ) return;

    var old = this.selection;
    this.selection = s;
    this.emit( 'selection:change', s, old, this );

    return this;
  }

, isReady: function(){
    return this.selection !== null && this.selection !== undefined;
  }
};

var cid = 0;

module.exports.create = function( data ){
  var question = Object.create(
    require('events').EventEmitter
  , module.exports
  );

  utils.extend( question, data, {
    cid: cid++
  });

  return question;
};