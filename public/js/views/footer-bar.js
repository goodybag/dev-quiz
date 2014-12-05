/**
 * Footer bar
 */

module.exports = require('../lib/view')( FooterBarView );

function FooterBarView( logger, $el, options ){
  logger = logger.create('FooterBar');

  logger.info('Initializing');

  return Object.create({
    $el:      $el
  , options:  options
  , model:    options.model
  , quiz:     options.quiz

  , init: function(){
      this.quiz.on('question:change', function(){
        this.render();
      }.bind( this ));

      return this;
    }

  , domEvents: function(){
      this.$el.find('.next').click( this.onNextClick.bind( this ) );

      this.$el.find('.prev').click( this.onPrevClick.bind( this ) );
    }

  , render: function(){
      var html = [];

      html.push('<nav class="question-nav">');

      if ( this.quiz.currQuestion > 1 ){
        html.push('  <button class="prev">Previous</button>');
      }

      if ( this.quiz.currQuestion < this.quiz.questions.length - 1 ){
        html.push('  <button class="next">Next</button>');
      }

      html.push('</nav>');

      this.$el.html( html.join('\n') );

      this.domEvents();

      return this;
    }

  , show: function(){
      this.$el.removeClass('hide');
      return this;
    }

  , hide: function(){
      this.$el.addClass('hide');
      return this;
    }

  , onNextClick: function( e ){
      this.quiz.currQuestion++;
    }

  , onPrevClick: function( e ){
      this.quiz.currQuestion--;
    }
  }).init();
};