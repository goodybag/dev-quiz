var utils = require('../lib/utils');
var pFillers = require('../../data/positive-fillers');
var nFillers = require('../../data/negative-fillers');

FillerView.tagName = 'section';
FillerView.classList = ['section-white', 'section-filler'];

module.exports = require('../lib/view')( FillerView );

function FillerView( logger, $el, options ){
  logger = logger.create('FillerView', {
    options:  options
  , $el:      $el
  });

  logger.info('Initializing');

  return Object.create(
    {}
  , require('events').EventEmitter
  , require('./mixins/linked-view-node')
  , {

    $el:          $el
  , options:      options
  , isFiller:     true
  , model:        options.model
  , question:     options.question

  , domEvents: function(){
      logger.info('Initing events');

      this.$el.find('.continuable').click( function( e ){
        this.emit('next');
      }.bind( this ));
    }

  , onShow: function(){
      this.render();
    }

  , render: function(){
      if ( this.question.madeSelection() ){
        if ( this.question.isSelectionCorrect() ){
          logger.info('Rendering positive filler');
          this.model = pFillers.getRandom();
          this.$el.addClass('correct-answer');
          this.$el.removeClass('incorrect-answer');
        } else {
          logger.info('Rendering negative filler');
          this.model = nFillers.getRandom();
          this.$el.addClass('incorrect-answer');
          this.$el.removeClass('correct-answer');
        }
      } else {
        this.$el.removeClass('correct-answer', 'incorrect-answer');
      }

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