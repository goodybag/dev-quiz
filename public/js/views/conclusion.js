var utils = require('../lib/utils');

ConclusionView.tagName = 'section';
ConclusionView.classList = ['section-conclusion', 'section-white'];

module.exports = require('../lib/view')( ConclusionView );

function ConclusionView( logger, $el, options ){
  logger = logger.create('ConclusionView', {
    options:  options
  , $el:      $el
  });

  logger.info('Initializing');

  return Object.create(
    {}
  , require('./mixins/linked-view-node')
  , {

    $el:          $el
  , options:      options
  , model:        options.model
  , quiz:         options.quiz
  , isConclusion: true

  , domEvents: function(){
      logger.info('Initing events');
    }

  , render: function(){
      if ( !this.score ) return this;

      var base = [
        '<h1>You got a ' + this.score.percent + '%!</h1>'
      , '<div class="cupcake"></div>'
      ].join('\n');

      this.$el.html([
        '<div class="left-door">'
      , '  <div class="inner">' + base + '</div>'
      , '</div>'
      , '<div class="right-door">'
      , '  <div class="inner">' + base + '</div>'
      , '</div>'
      ].join('\n'));

      this.domEvents();

      return this;
    }

  , onShow: function(){
      this.score = this.quiz.score();
      this.render();
    }
  });
}