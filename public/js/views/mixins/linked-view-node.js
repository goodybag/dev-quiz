module.exports = {
  show: function(){
    console.log('show', this.$el);
    this.$el.removeClass('hide');
    return this;
  }

, hide: function(){
  console.log('hide', this.$el);
    this.$el.addClass('hide');
    return this;
  }

, setNext: function( node ){
    this.nextView = node;
    node.prevView = this;
    return this;
  }

, onShow: function(){}
, onHide: function(){}
};