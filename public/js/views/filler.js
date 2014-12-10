var utils = require('../lib/utils');

FillerView.tagName = 'section';
FillerView.classList = ['conclusion', 'section-white', 'section-filler'];

module.exports = require('../lib/view')( FillerView );

function FillerView( logger, $el, options ){
  logger = logger.create('FillerView', {
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
  , isFiller:     true
  , model:        options.model

  , domEvents: function(){
      logger.info('Initing events');
    }

  , render: function(){
      var base = [
        '<h1>' + this.model.title + '</h1>'
      , '<div class="filler-body">' + this.model.body + '</div>'
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