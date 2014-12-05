View.tagName = 'section';

module.exports = require('../lib/view')( View );

function View( logger, $el, options ){
  logger = logger.create('QuestionView', {
    options:  options
  , $el:      $el
  });

  logger.info('Initializing');

  return Object.create({
    $el:      $el
  , options:  options
  , model:    options.model

  , render: function(){
      var base = [
        '<div class="question">'
      , '  <h1 class="question-text">' + this.model.text + '</h1>'
      , '  <div class="question-body">' + this.model.body + '</div>'
      , '</div>'
      ].join('\n')

      this.$el.html([
      , '<div class="left-door">'
      , '  <div class="inner">'
      ,    base
      , '  </div>'
      , '</div>'
      , '<div class="right-door">'
      , '  <div class="inner">'
      ,    base
      , '  </div>'
      , '</div>'
      ].join('\n'));

      return this;
    }

  , setAdjacent: function( prev, next ){
      this.prevView = prev;
      this.nextView = next;
      return;
    }

  , next: function(){
      this.$el.addClass('open');
      return this;
    }

  , prev: function(){
      if ( this.$prev ){
        this.prev.$el.removeClass('open');
      }

      return this;
    }
  });
};