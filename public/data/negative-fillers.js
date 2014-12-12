/**
 * Negative Fillers
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
  title: '(╯°□°)╯︵ ┻━┻'
, body:  [
    '<div class="cupcake"></div>'
  ].join('\n')
});

module.exports.push({
  title: 'Not quite right, but you\'ll get the next one!'
, body:  [
    '<div class="cupcake"></div>'
  ].join('\n')
});

module.exports.push({
  title: '¯\\_(ツ)_/¯'
, body:  [
    '<div class="cupcake"></div>'
  ].join('\n')
});