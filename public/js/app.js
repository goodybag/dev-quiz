var app = window.app = module.exports = {};

var utils   = require('./lib/utils');
var logger  = require('./logger');

utils.domready( function(){
  app.view = require('./views/app')( logger, document.body, {
    questions:  require('../data/questions').map(
                  require('./models/question').create
                )
  }).render();
});
