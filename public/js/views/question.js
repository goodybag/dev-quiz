var utils = require('../lib/utils');

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

  return Object.create(
    {}
  , require('./mixins/linked-view-node')
  , {
      $el:              $el
    , options:          options
    , model:            options.model
    , cid:              cid++
    , isQuestion:       true
    , isFirstQuestion:  options.isFirstQuestion
    , isLastQuestion:   options.isLastQuestion

    , domEvents: function(){
        logger.info('Initing events');

        this.$el.find('input[type="radio"]').on('change', function( e ){
          var $el = utils.dom( e.currentTarget );
          this.model.setSelection( +$el.val() );
        }.bind( this ));
      }

    , render: function(){
        var base = [
          '<div class="section-inner question">'
        , '  <h1 class="question-text">' + this.model.text + '</h1>'
        , '  <div class="question-body">' + this.model.body + '</div>'
        , '  <ul class="question-answers">'
        , this.model.answers.map( function( answer, i ){
            return [
              '<li data-value="{value}">'
            , '  <input type="radio" name="question-{id}" value="{value}" id="{id}-{index}" />'
            , '  <label for="{id}-{index}">' + answer.label + '</label>'
            , '</li>'
            ].join('\n    ')
            .replace( new RegExp( '{id}', 'g' ), this.model.cid )
            .replace( new RegExp( '{value}', 'g' ), answer.value || i )
            .replace( new RegExp( '{index}', 'g' ), i );
          }.bind( this )).join('\n')
        , '  </ul>'
        , '</div>'
        ].join('\n');

        this.$el.html( base );

        if ( this.cid % 2 === 0 ){
          this.$el.addClass('section-red');
          logger.info('added red');
        }

        this.domEvents();

        return this;
      }
    }
  );
}