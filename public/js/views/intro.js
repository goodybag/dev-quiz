/**
 * Intro View
 */

View.tagName = 'section';
View.classList = [
  'intro'
, 'section-white'
];

module.exports = require('../lib/view')( View );

function View( logger, $el, options ){
  logger = logger.create('QuestionView', {
    options:  options
  , $el:      $el
  });

  logger.info('Initializing');

  return Object.create({
    $el:      $el
  , options:  options
  , model:    options.model

  , events: function(){
      this.$el.find('.logo').click( function( e ){
        this.hide();
      }.bind( this ));
    }

  , render: function(){
      this.$el.html([
      , '<div class="left-door">'
      , '  <div class="inner">'
      , '    <div class="logo logo-lettermark"></div>'
      , '    <em class="sub-text script">Click to start!</em>'
      , '    </div>'
      , '  </div>'
      , '<div class="right-door">'
      , '  <div class="inner">'
      , '    <div class="logo logo-lettermark"></div>'
      , '    <em class="sub-text script">Click to start!</em>'
      , '  </div>'
      , '</div>'
      ].join('\n'));

      this.events();

      return this;
    }

  , hide: function(){
      this.$el.addClass('open');
      return this;
    }

  , show: function(){
      this.$el.removeClass('open');
      return this;
    }
  });
}