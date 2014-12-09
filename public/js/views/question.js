View.tagName = 'section';

module.exports = require('../lib/view')( View );

var cid = 0;

function View( logger, $el, options ){
  logger = logger.create('QuestionView', {
    options:  options
  , $el:      $el
  , test:    'testing'
  });

  logger.info('Initializing');

  return Object.create({
    $el:      $el
  , options:  options
  , model:    options.model
  , cid:      cid++

  , render: function(){
      var base = [
        '<div class="question">'
      , '  <h1 class="question-text">' + this.model.text + '</h1>'
      , '  <div class="question-body">' + this.model.body + '</div>'
      , '  <ul class="question-answers">'
      , this.model.answers.map( function( answer, i ){
          return '    ' + [
            '<li>'
          , '  <input type="radio" name="question-{id}-answer-{index}'
              .replace( '{id}', this.model.cid )
              .replace( '{index}', i )
          , '<li>'
          ].join('\n    ');
        }.bind( this ))
      , '  </ul>'
      , '</div>'
      ].join('\n');

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

      if ( this.cid % 2 === 0 ){
        this.$el.addClass('section-red');
        logger.info('added red');
      }

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
      if ( this.prevView ){
        this.prevView.$el.removeClass('open');
      }

      return this;
    }
  });
}