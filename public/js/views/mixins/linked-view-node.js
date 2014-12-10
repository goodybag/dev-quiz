module.exports = {
  show: function(){
    this.$el.removeClass('hide');
    return this;
  }

, hide: function(){
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