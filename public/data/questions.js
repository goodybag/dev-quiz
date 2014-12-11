/**
 * Questions
 */

var questions = module.exports = [];

questions.push({
  type: 'multi'
, text: 'What is the output of the following statement:'
, body: [
    '<pre><code class="lang-javascript">'
  , '[1, 2].concat(3).concat([4])'
  , '</code></pre>'
  ].join('')
, answers: [
    { label: '[1, 2, 3, [4]]' }
  , { label: '[[1, 2], 3, [4]]' }
  , { label: '[1, 2, 3, 4]' }
  ]
, correctAnswer: 2
});

questions.push({
  type: 'multi'
, text: 'What is the value of the following statement?'
, body: [
    '<pre><code class="lang-javascript">'
  , '0.1 + 0.2 === 0.3'
  , '</code></pre>'
  ].join('')
, answers: [
    { label: 'True' }
  , { label: 'False' }
  ]
, correctAnswer: 1
});

questions.push({
  type: 'multi'
, text: 'What\'s the correct selector for all .thing-title elements <em>after</em> the second one?'
, body: [
    '<pre class="language-markup"><code class="lang-markup">'
  , [ '<div class="things">'
    , '  <div class="thing">'
    , '    <h2 class="thing-title"></h2>'
    , '    <p class="thing-body"></p>'
    , '  </div>'
    , '  <div class="thing">'
    , '    <h2 class="thing-title"></h2>'
    , '    <p class="thing-body"></p>'
    , '  </div>'
    , '  <div class="thing">'
    , '    <h2 class="thing-title"></h2>'
    , '    <p class="thing-body"></p>'
    , '  </div>'
    , '  <div class="thing">'
    , '    <h2 class="thing-title"></h2>'
    , '    <p class="thing-body"></p>'
    , '  </div>'
    , '</div>'
    ].join('\n')
      .replace( new RegExp('<', 'g'), '&lt;' )
      .replace( new RegExp('>', 'g'), '&gt;' )
  , '</code></pre>'
  ].join('')
, answers: [
    { label: '.things .thing-title:nth-child(3n)' }
  , { label: '.things .thing-title:nth-child(n+3)' }
  , { label: '.things .thing-title:first-child + .thing-title ~ .thing-title' }
  , { label: '.things :first-child + .thing ~ .thing > .thing-title' }
  ]
, correctAnswer: 3
});

questions.push({
  type: 'multi'
, text: 'What is the value of the following?'
, body: [
    '<pre><code class="lang-javascript">'
  , '[ 3, 5, 7, 8, 9 ].reduce( function( a, b ) {\n'
  , '  return a + b % 2;\n'
  , '}, 0);'
  , '</code></pre>'
  ].join('')
, answers: [
    { label: '11' }
  , { label: '10' }
  , { label: '4' }
  , { label: '6' }
  ]
, correctAnswer: 2
});

questions.push({
  type: 'multi'
  , text: 'What is the output of the following JS snippet?'
  , body: [
  '<pre><code class="lang-javascript">'
  , 'for( var i=0; i<=3; i++ ) {\n'
  , '  var foo = i;\n'
  , '}\n'
  , '\n'
  , 'console.log(foo);'
  , '</code></pre>'
  ].join('')
  , answers: [
  { label: 'undefined' }
  , { label: '0' }
  , { label: '1' }
  , { label: '2' }
  , { label: '3' }
  , { label: '4' }
  ]
  , correctAnswer: 4
});
 
questions.push({
  type: 'multi'
  , text: 'What is the value of the following?'
  , body: [
  '<pre><code class="lang-javascript">'
  , '17^4'
  , '</code></pre>'
  ].join('')
  , answers: [
  { label: '21' }
  , { label: '22' }
  , { label: '23' }
  , { label: '24' }
  , { label: '25' }
  ]
  , correctAnswer: 0
});