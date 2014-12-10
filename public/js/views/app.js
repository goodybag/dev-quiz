var utils = require('../lib/utils');
var fillers = require('../../data/fillers');

module.exports = require('../lib/view')( AppView );

var views = {
  intro:        require('./intro')
, question:     require('./question')
, filler:       require('./filler')
, conclusion:   require('./conclusion')
, footer:       require('./footer-bar')
};

function AppView( logger, $el, options ){
  options = utils.defaults( options || {}, {
    fillerFrequency: 1
  });

  logger = logger.create('AppView');

  if ( !options.quiz ){
    logger.error('AppView did not receive quiz');
    throw new Error('AppView view must be instantiated with options.quiz');
  }

  return Object.create(
    {}
  , require('./mixins/linked-view-list')
  , {
      $el: $el

    , quiz: options.quiz
    , questions: options.quiz.questions

    , init: function(){
        this.quiz.on( 'reset', this.reset.bind( this ) );
        return this;
      }

    , reset: function(){
        this.goToBeginning();
        this.$container.find('> .hide').removeClass('hide');
        this.$el.find(':checked').attr( 'checked', false );
        this.applyFooterState();
        return this;
      }

    , next: function(){
        require('./mixins/linked-view-list').next.call( this );
        this.applyFooterState();
        return this;
      }

    , prev: function(){
        require('./mixins/linked-view-list').prev.call( this );
        this.applyFooterState();
        return this;
      }

    , renderIntro: function( frag ){
        this.curr = this.introView = views.intro( logger, null, {
          onLogoClick: function( e ){
            this.next();
          }.bind( this )
        }).render();

        frag.appendChild( this.curr.$el[0] );
      }

    , renderQuestions: function( frag ){
        frag.appendChild( this.introView.render().$el[0] );

        var prev = this.curr;

        this.questions.forEach( function( q, i ){
          var view = views.question( logger, null, {
            model: q
          , isFirstQuestion: i === 0
          , isLastQuestion: i === this.questions.length - 1
          }).render();

          q.on( 'selection:change', this.applyFooterState.bind( this ) );

          prev.setNext( view );
          prev = view;

          frag.appendChild( view.$el[0] );

          if ( i % options.fillerFrequency !== 0 ) return;

          console.log(~~( Math.random() * fillers.length ), fillers[ ~~( Math.random() * fillers.length ) ]);
          view = views.filler( logger, null, {
            model: fillers[ ~~( Math.random() * fillers.length ) ]
          }).render();

          prev.setNext( view );
          prev = view;
          frag.appendChild( view.$el[0] );
        }.bind( this ) );

        return this;
      }

    , renderConclusion: function( frag ){
        this.conclusion = views.conclusion( logger, null, {
          quiz: this.quiz
        }).render();

        this.append( this.conclusion );

        frag.appendChild( this.conclusion.$el[0] );
      }

    , renderFooter: function( frag ){
        this.footer = views.footer( logger, this.$el.find('.footer-bar'), {
          quiz: this.quiz
        }).render();

        this.footer.on( 'next', function(){
          this.next();
        }.bind( this ));

        this.footer.on( 'prev', function(){
          this.prev();
        }.bind( this ));

        this.footer.on( 'finish', function(){
          this.next();
        }.bind( this ));

        this.footer.on( 'restart', function(){
          this.quiz.reset();
        }.bind( this ));
      }

    , render: function(){
        this.$el.html([
          '<div class="footer-bar hide"></div>'
        , '<div class="container"></div>'
        ].join('\n') );

        this.$container = this.$el.find('.container');

        var frag = document.createDocumentFragment();

        this.renderIntro( frag );
        this.renderQuestions( frag );
        this.renderFooter( frag );
        this.renderConclusion( frag );

        this.$container.append( frag );

        return this;
      }

    , applyFooterState: function(){
        if ( !this.curr.prevView ){
          this.footer.hide();
        } else {
          this.footer.show();
        }

        var state = {
          prev:     this.curr.isFiller || !this.curr.isFirstQuestion && !this.curr.isConclusion
        , next:     this.curr.isFiller || this.curr.nextView && this.curr.isQuestion && !this.curr.isLastQuestion && this.curr.model.isReady()
        , finish:   this.curr.isLastQuestion && this.curr.model.isReady()
        , restart:  this.curr.isConclusion
        };

        for ( var key in state ){
          this.footer[ (state[ key ] ? 'show' : 'hide') + 'Btn' ]( key );
        }

        return this;
      }
    }
  ).init();
}