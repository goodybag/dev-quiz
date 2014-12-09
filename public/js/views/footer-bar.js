/**
 * Footer bar
 */

module.exports = require('../lib/view')( FooterBarView );

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

      return this;
    }

  , domEvents: function(){
      this.$el.find('.next').click( this.onNextClick.bind( this ) );
      this.$el.find('.prev').click( this.onPrevClick.bind( this ) );
    }

  , render: function(){
      var html = [];

      html.push('<nav class="question-nav">');
      html.push('  <button class="hide prev">←</button>');
      html.push('  <button class="hide next">→</button>');
      html.push('  <button class="hide finish">✔</button>');
      html.push('</nav>');

      this.$el.html( html.join('\n') );

      this.domEvents();

      return this;
    }

  , showBtn: function( btn ){
      setTimeout( function(){
        this.$el.find( '.question-nav > .' + btn ).removeClass('hide');
      }.bind( this ), 1 );

      return this;
    }

  , hideBtn: function( btn ){
      setTimeout( function(){
        this.$el.find( '.question-nav > .' + btn ).addClass('hide');
      }.bind( this ), 1 );
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
      this.emit( 'prev', e, this );
    }
  }).init();
}