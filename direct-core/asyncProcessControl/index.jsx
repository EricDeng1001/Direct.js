export default ( asyncObj = {} ) => Comp => {
  const keys = Object.keys( asyncObj );
  return class extends Comp {
    componentWillReceiveProps( nextProps ){
      for( const asyncProps of  keys ){
        if( nextProps[asyncProps].resolved !== this.props[asyncProps].resolved ){
          asyncObj[asyncProps].onResolved.call( this , nextProps );
        }
        else if( nextProps[asyncProps].rejected !== this.props[asyncProps].rejected ){
          if( asyncObj[asyncProps].onRejected ){
            asyncObj[asyncProps].onRejected.call( this , nextProps );
          }
        }
      }
    }
  };
};
