/**
 * Footer bar
 */

module.exports = require('../lib/view')( FooterBarView );

var Views = {
  ProgressIndicator: require('./footer-progress-indicator')
};

function FooterBarView( logger, $el, options ){
  logger = logger.create('FooterBar');

  logger.info('Initializing');

  return Object.create( require('events').EventEmitter, {
    $el:      $el
  , options:  options
  , model:    options.model
  , quiz:     options.quiz

  , init: function(){
      this.quiz.on('question:change', function(){
        this.render();
      }.bind( this ));

      this.views = {
        progress: Views.ProgressIndicator( logger, null, {
          quiz: this.quiz
        })
      };

      return this;
    }

  , domEvents: function(){
      this.$el.find('.next').click( this.emit.bind( this, 'next' ) );
      this.$el.find('.prev').click( this.emit.bind( this, 'prev' ) );
      this.$el.find('.finish').click( this.emit.bind( this, 'finish' ) );
      this.$el.find('.restart').click( this.emit.bind( this, 'restart' ) );
    }

  , render: function(){
      var html = [];

      html.push('<div class="progress-indicator"></div>');

      html.push('<nav class="question-nav">');
      html.push('  <button class="hide prev">←</button>');
      html.push('  <button class="hide next">→</button>');
      html.push('  <button class="hide finish">✔</button>');
      html.push('  <button class="hide restart">⟳</button>');
      html.push('</nav>');

      this.$el.html( html.join('\n') );

      this.views.progress.render();
      this.$el.find('.progress-indicator').append( this.views.progress.$el );

      this.domEvents();

      return this;
    }

  , showBtn: function( btn ){
      setTimeout( function(){
        this.$el.find( '.question-nav > .' + btn ).removeClass('hide');
      }.bind( this ), 10 );

      return this;
    }

  , hideBtn: function( btn ){
      setTimeout( function(){
        this.$el.find( '.question-nav > .' + btn ).addClass('hide');
      }.bind( this ), 10 );
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
      this.emit( 'next', e, this );
    }

  , onPrevClick: function( e ){
      
    }

  , onFinishClick: function( e ){
      this.emit( 'finish', e, this );
    }
  }).init();
}