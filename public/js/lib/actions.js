module.exports = Object.create(
  require('events').EventEmitter
, {
    actions: {
      'next-section': require('./actions/next-section')
    }

  , init: function( logger ){
      this.logger = logger.create('Actions');
      return this;
    }

  , getAction: function( action ){
      if ( !this.actions[ action ] ){
        throw new Error( 'No such action: ' + action );
      }

      return this.actions[ action ]( this.logger );
    }

  , dispatch: function( action ){
      action = this.getAction( action );
      action.apply( this, Array.prototype.slice.call( arguments, 1 ) );
      return this;
    }
  }
);