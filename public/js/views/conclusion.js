var utils = require('../lib/utils');

ConclusionView.tagName = 'section';
ConclusionView.classList = ['conclusion', 'section-white'];

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
  , isConclusion: true

  , domEvents: function(){
      logger.info('Initing events');
    }

  , render: function(){
      var base = [
      , '  <h1>This is the end!</h1>'
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
  });
}