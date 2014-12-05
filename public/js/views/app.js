module.exports = require('../lib/view')( AppView );

var views = {
  intro:    require('./intro')
, question: require('./question')
};

function AppView( logger, $el, options ){
  logger = logger.create('AppView');

  if ( !Array.isArray( options.questions ) ){
    logger.error('AppView did not receive a questions array');
    throw new Error('AppView view must be instantiated with options.questions array');
  }

  return Object.create({
    $el: $el

  , questions: options.questions
  , questionViews: []

  , render: function(){
      this.$el.html([
        '<div class="footer-bar hide"></div>'
      , '<div class="container questions-container"></div>'
      ].join('\n') );

      this.$questions = this.$el.find('.questions-container');
      this.questionViews = [];

      var frag = document.createDocumentFragment();

      this.introView = views.intro( logger );
      frag.appendChild( this.introView.render().$el[0] );

      this.questions.forEach( function( q, i ){
        var view = views.question( logger, null, {
          model: q
        });

        questionViews.push( view );
        frag.appendChild( view.$el[0] );
      }.bind( this ) );

      this.questionViews.forEach( function( v, i, qviews ){
        v.setNext( qviews[ i ] );
        view.render();
      });

      this.$questions.append( frag );

      return this;
    }

  , start: function(){
      this.$questions.find('.open').removeClass('.open');
      return this;
    }
  });
};