module.exports = {
  show: function(){
    this.$el.removeClass('hide');
    this.emit('show');
    return this;
  }

, hide: function(){
    this.$el.addClass('hide');
    this.emit('hide');
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