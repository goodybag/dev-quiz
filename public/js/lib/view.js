var logger  = require('../logger').create('View');
var utils   = require('./utils');

module.exports = function( view ){
  logger.info( 'Setting up view', { view: view } );

  return function( logger, $el, options ){
    if ( !logger ){
      throw new Error('Views must receive a parent logger as the first argument');
    }

    options = options || {};

    logger.info( 'Instantiating view', { view: view } );
    $el = utils.dom( $el || '<' + (view.tagName || 'view') + ' />' );

    if ( Array.isArray( view.classList ) ){
      view.classList.forEach( $el.addClass.bind( $el ) );
    }

    return view( logger, $el, options );
  };
};