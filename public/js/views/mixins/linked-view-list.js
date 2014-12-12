module.exports = {
  curr: null

, goToBeginning: function(){
    while ( this.curr.prevView ){
      this.curr = this.curr.prevView;
    }

    return this;
  }

, next: function(){
    this.curr.onHide();
    this.curr.hide();

    if ( this.curr.nextView ){
      this.curr = this.curr.nextView;
    } else {
      this.goToBeginning();
    }

    this.curr.show();
    this.curr.onShow();

    return this;
  }

, prev: function(){
    if ( !this.curr.prevView ) return this;

    this.curr.onHide();
    this.curr = this.curr.prevView;
    this.curr.show();
    this.curr.onShow();

    return this;
  }

, append: function( node ){
    var curr = this.curr;

    while ( curr.nextView ){
      curr = curr.nextView;
    }

    curr.setNext( node );

    return this;
  }
};