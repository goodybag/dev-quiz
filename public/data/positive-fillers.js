/**
 * Positive Fillers
 */

module.exports = [];

Object.defineProperty( module.exports, 'getRandom', {
  enumerable: false
, get: function(){
    return function(){
      return this[ ~~( Math.random() * this.length ) ];
    }.bind( this );
  }
});

module.exports.push({
  title: 'Keep it up!'
, body:  [
    '<div class="cupcake"></div>'
  ].join('\n')
});

module.exports.push({
  title: 'Yayyyyyyyyyyyyy!'
, body:  [
    '<div class="cupcake"></div>'
  ].join('\n')
});

module.exports.push({
  title: 'Maybe <em>you</em> should have made this quiz!'
, body:  [
    '<div class="cupcake"></div>'
  ].join('\n')
});

module.exports.push({
  title: ':D :D :D :D :D'
, body:  [
    '<div class="cupcake"></div>'
  ].join('\n')
});