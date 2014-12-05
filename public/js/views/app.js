module.exports = require('../lib/view')( AppView );

var views = {
  intro:    require('./intro')
, question: require('./question')
, footer:   require('./footer-bar')
};

function AppView( logger, $el, options ){
  logger = logger.create('AppView');

  if ( !options.quiz ){
    logger.error('AppView did not receive quiz');
    throw new Error('AppView view must be instantiated with options.quiz');
  }

  return Object.create({
    $el: $el

  , currQ: options.quiz.currQuestion
  , quiz: options.quiz
  , questions: options.quiz.questions
  , questionViews: []

  , init: function(){
      this.quiz.on( 'step:change', function( step, old ){
        if ( step === 'intro' ){
          this.goToIntro();
        } else if ( step === 'questions' ){
          this.goToQuestion( this.quiz.currQuestion );
        }
      }.bind( this ));

      this.quiz.on( 'question:change', function( question, old ){
        this.goToQuestion( this.quiz.currQuestion );
      }.bind( this ));

      return this;
    }

  , render: function(){
      this.$el.html([
        '<div class="footer-bar hide"></div>'
      , '<div class="container questions-container"></div>'
      ].join('\n') );

      this.$questions = this.$el.find('.questions-container');
      this.questionViews = [];

      var frag = document.createDocumentFragment();

      this.introView = views.intro( logger, null, {
        quiz: this.quiz
      });

      frag.appendChild( this.introView.render().$el[0] );

      this.questions.forEach( function( q, i ){
        var view = views.question( logger, null, {
          model: q
        });

        this.questionViews.push( view );
        frag.appendChild( view.$el[0] );
      }.bind( this ) );

      this.questionViews.forEach( function( v, i, qviews ){
        v.setAdjacent( qviews[ i - 1 ], qviews[ i + 1 ] );
        v.render();
      }.bind( this ));

      this.$questions.append( frag );

      this.footer = views.footer( logger, this.$el.find('.footer-bar'), {
        quiz: this.quiz
      }).render();

      return this;
    }

  , goToIntro: function(){
      this.$questions.find('.open').removeClass('.open');
      this.footer.hide();
      return this;
    }

  , goToQuestion: function( i ){
      this.footer.show();

      if ( this.currQ < i ){
        for ( var ii = 0; ii < i; ii++ ){
          this.questionViews[ ii ].next();
        }
      } else {
        console.log('going to', i);
        for ( var ii = this.currQ; ii > i; ii-- ){
          console.log('prev');
          this.questionViews[ ii ].prev();
        }
      }

      this.currQ = i;

      return this;
    }
  }).init();
};