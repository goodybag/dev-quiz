/**
 * Next Section Action
 */

module.exports = function( logger ){
  logger = logger.create('NextSection');

  return function( app ){
    logger.info('Going to next');
    app.next();
  };
};