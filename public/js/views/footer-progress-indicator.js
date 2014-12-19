/**
 * Footer Progress Indicator
 */

module.exports = require('../lib/view')( FooterBarView );

FooterBarView.classList = [
  'footer-progress-indicator'
];

function FooterBarView( logger, $el, options ){
  logger = logger.create('ProgressIndicator');

  logger.info('Initializing');

  return Object.create( require('events').EventEmitter, {
    $el:      $el
  , options:  options
  , quiz:     options.quiz

  , init: function(){
      this.quiz.on('question:change', function(){
        this.render();
      }.bind( this ));

      return this;
    }

  , domEvents: function(){
      
    }

  , render: function(){
      var html = [
        '<span class="current">' + ( this.quiz.currQuestion + 1 ) + '</span>'
      , '<span class="separator">/</span>'
      , '<span class="total">' + this.quiz.questions.length + '</span>'
      ];

      this.$el.html( html.join('\n') );

      this.domEvents();

      return this;
    }
  }).init();
}