export default asyncObj => Comp => {
  const keys = Object.keys( asyncObj );
  return class extends Comp {
    componentWillReceiveProps( nextProps ){
      for( const asyncProp of keys ){
        let nextProp = nextProps[asyncProp];
        if( nextProp !== this.props[asyncProp] ){
          if( nextProp === asyncObj[asyncProp].resolved ){
            if( asyncObj[asyncProp].onResolved ){
              setTimeout(
                $ => asyncObj[asyncProp].onResolved.call( this ),
                0
              );
            }
          } else if( nextProp === asyncObj[asyncObj].rejected ){
            if( asyncObj[asyncProp].onRejected ){
              setTimeout(
                $ => asyncObj[asyncProp].onRejected.call( this ),
                0
              );
            }
          }
        }
      }

      if( super.componentWillReceiveProps ){
        super.componentWillReceiveProps( nextProps );
      }
    }
  };
};
