var utils = module.exports = require('lodash').extend( {}, require('lodash') );

utils.dom       = require('jquery');
utils.domready  = require('jquery');
utils.http      = require('jquery').ajax;

var oCreate = Object.create;
Object.create = function(){
  var ctrs, objs = Array.prototype.slice.call( arguments );

  ctrs = objs.filter( function( o ){
    return typeof o === 'function';
  });

  objs = objs.filter( function( o ){
    return typeof o === 'object';
  });

  ctrs.forEach( function( ctr ){
    objs.push( ctr.prototype );
  });

  var obj = utils.extend.apply( null, objs );
  obj = oCreate( obj );

  ctrs.forEach( function( ctr ){
    ctr.call( obj );
  });

  return obj;
};