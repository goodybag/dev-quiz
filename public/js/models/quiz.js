module.exports.create = function( data ){
  if ( !Array.isArray( data.questions ) ){
    throw new Error('Missing `questions` property');
  }

  return Object.create(
    require('events').EventEmitter
  , {
      _step:          'intro'
    , possibleSteps:  ['intro', 'questions']
    , _currQuestion:  1

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

    , get currQuestion (){
        return this._currQuestion;
      }

    , set currQuestion ( q ){
        if ( isNaN( parseInt( q ) ) ){
          throw new Error
        }

        if ( this._currQuestion === q ) return;
        var old = this._currQuestion;
        this._currQuestion = q;
        this.emit( 'question:change', q, old );
      }
    }
  , data
  );
};