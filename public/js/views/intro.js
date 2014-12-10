/**
 * Intro View
 */

IntroView.tagName = 'section';
IntroView.classList = [
  'intro'
, 'section-white'
];

module.exports = require('../lib/view')( IntroView );

function IntroView( logger, $el, options ){
  logger = logger.create('QuestionView', {
    options:  options
  , $el:      $el
  });

  logger.info('Initializing');

  return Object.create(
    {}
  , require('events').EventEmitter
  , require('./mixins/linked-view-node')
  , {
      $el:          $el
    , options:      options
    , model:        options.model

    , events: function(){
        this.$el.find('.logo').click( function( e ){
          if ( typeof options.onLogoClick === 'function' ){
            options.onLogoClick( e, this );
          }
        }.bind( this ));
      }

    , render: function(){
        this.$el.html([
        , '<div class="left-door">'
        , '  <div class="inner">'
        , '    <div class="logo logo-lettermark">'
        , '      <em class="sub-text script">Click to start!</em>'
        , '    </div>'
        , '  </div>'
        , '</div>'
        , '<div class="right-door">'
        , '  <div class="inner">'
        , '    <div class="logo logo-lettermark">'
        , '      <em class="sub-text script">Click to start!</em>'
        , '    </div>'
        , '  </div>'
        , '</div>'
        ].join('\n'));

        this.events();

        return this;
      }
    }
  );
}