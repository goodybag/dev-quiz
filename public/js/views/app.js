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

      this.quiz.on( 'question:ready', this.onQuestionReady.bind( this ) );
      this.quiz.on( 'question:not-ready', this.onQuestionNotReady.bind( this ) );

      return this;
    }

  , renderQuestions: function(){
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

      return this;
    }

  , renderFooter: function(){
      this.footer = views.footer( logger, this.$el.find('.footer-bar'), {
        quiz: this.quiz
      }).render();

      this.footer.on( 'next', function(){
        this.quiz.currQuestion++;
      }.bind( this ));

      this.footer.on( 'prev', function(){
        this.quiz.currQuestion--;
      }.bind( this ));
    }

  , render: function(){
      this.$el.html([
        '<div class="footer-bar hide"></div>'
      , '<div class="container questions-container"></div>'
      ].join('\n') );

      this.renderQuestions();
      this.renderFooter();

      return this;
    }

  , goToIntro: function(){
      this.$questions.find('.open').removeClass('.open');
      this.footer.hide();
      return this;
    }

  , goToQuestion: function( i ){
      this.footer.show();

      if ( this.quiz.onFirstQuestion() ){
        this.footer.hideBtn('prev');
      } else {
        this.footer.showBtn.bind( this.footer, 'prev');
      }

      if ( this.quiz.question.isReady() ){
        this.footer.showBtn('next');
      } else {
        this.footer.hideBtn('next');
      }

      this.footer.hideBtn('finish');

      var ii;
      if ( this.currQ < i ){
        for ( ii = 0; ii < i; ii++ ){
          this.questionViews[ ii ].next();
        }
      } else {
        for ( ii = this.currQ; ii > i; ii-- ){
          this.questionViews[ ii ].prev();
        }
      }

      this.currQ = i;

      return this;
    }

  , onQuestionReady: function( selection, question ){
      this.footer.showBtn('next');
    }

  , onQuestionNotReady: function( question ){
      this.footer.hideBtn('next');
    }
  }).init();
}