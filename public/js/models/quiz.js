var utils = require('../lib/utils');

module.exports.create = function( data ){
  if ( !Array.isArray( data.questions ) ){
    throw new Error('Missing `questions` property');
  }

  var quiz = Object.create(
    require('events').EventEmitter
  , {
      _step:          'intro'
    , possibleSteps:  ['intro', 'questions']
    , _currQuestion:  0
    , questions:      []

    , get step (){
        return this._step;
      }

    , set step ( s ){
        if ( this.possibleSteps.indexOf( s ) === -1 ){
          throw new Error('Invalid step');
        }

        if ( this._step === s ) return;

        var old = this._step;
        this._step = s;
        this.emit( 'step:change', s, old );
      }

    , get question (){
        return this.questions[ this.currQuestion ];
      }

    , set question( q ){
        for ( var i = 0; i < this.questions.length; i++ ){
          if ( q === this.questions[ i ] ){
            this.currQuestion = i;
            break;
          }
        }
      }

    , get currQuestion (){
        return this._currQuestion;
      }

    , set currQuestion ( q ){
        if ( isNaN( parseInt( q ) ) ){
          throw new Error('Invalid type for currQuestion index');
        }

        if ( this._currQuestion === q ) return;
        var old = this._currQuestion;
        this._currQuestion = q;
        this.emit( 'question:change', q, old );
      }

    , init: function(){
        this.initQuestions();
        return this;
      }

    , initQuestions: function(){
        this.questions.forEach( function( question ){
          question.removeAllListeners('selection:change');
        });

        this.questions.forEach( function( question ){
          question.on('selection:change', function( selection ){
            if ( this.question === question ){
              if ( selection !== null ){
                this.emit( 'question:ready', selection, question, this );
              } else {
                this.emit( 'question:not-ready', question, this );
              }
            }
          }.bind( this ));
        }.bind( this ));
      }

    , onFirstQuestion: function(){
        return this.currQuestion === 0;
      }

    , onLastQuestion: function(){
        return this.currQuestion === this.questions.length - 1;
      }

    , readyToContinue: function(){
        
      }
    }
  );

  utils.extend( quiz, data );

  return quiz.init();
};