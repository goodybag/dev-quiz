var app = window.app = module.exports = {};

var utils   = require('./lib/utils');
var logger  = require('./logger');
var quiz = require('./models/quiz').create({
  questions:  require('../data/questions').map(
                require('./models/question').create
              )
});

app.quiz = quiz;

utils.domready( function(){
  app.view = require('./views/app')( logger, document.body, {
    quiz: quiz
  , fillerFrequency: 1
  }).render();
});
