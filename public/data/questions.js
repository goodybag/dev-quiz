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
, correctAnswer: 0
});

questions.push({
  type: 'multi'
, text: 'What is the value of the following?'
, body: [
    '<pre><code class="lang-javascript">'
  , '[3,5,7,8,9].reduce(function(a, b) {\n'
  , '  return a + b%2;\n'
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