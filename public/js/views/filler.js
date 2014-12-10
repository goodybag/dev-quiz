var utils = require('../lib/utils');

View.tagName = 'section';

module.exports = require('../lib/view')( View );

var cid = 0;

function View( logger, $el, options ){
  logger = logger.create('FillerView', {
    options:  options
  , $el:      $el
  , test:    'testing'
  });

  logger.info('Initializing');

  return Object.create(
    require('./mixins/linked-view-node'), {

    $el:      $el
  , options:  options
  , model:    options.model
  , cid:      cid++

  , domEvents: function(){
      logger.info('Initing events');
    }

  , render: function(){
      var base = [
      , '  <h1 class="question-text filler-text">' + this.model.text + '</h1>'
      , '  <div class="question-body filler-body">' + this.model.body + '</div>'
      ].join('\n');

      this.$el.html([
        '<div class="left-door">'
      , '  <div class="inner">' + base + '</div>'
      , '</div>'
      , '<div class="right-door">'
      , '  <div class="inner">' + base + '</div>'
      , '</div>'
      ].join('\n'));

      if ( this.cid % 2 === 0 ){
        this.$el.addClass('section-red');
        logger.info('added red');
      }

      this.domEvents();

      return this;
    }
  });
}