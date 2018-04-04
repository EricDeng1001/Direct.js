import React from 'react';

/*
protect( depObj ) gives you a HOC with particular rules,
then you apply this HOC to components
to protect them with the rules
you define
*/

//depObj is like
/*
{
  propName: {
    satisfy( realProp ){
      if( realProp === thePropIwant ){
        return true;
      }
      return false;
    },
    block(){
      this.whatIShouldDoWhenRealPropFailsToSatisfyMe()
      //this refers to the constructed component
      // you can acess this.props , this.selfDefinedFunction , etc.
    }
}
}
*/
export default ( depObj , always = true ) => Comp => {
  //always means always protect
  // this indicate that if once the props was satisfied
  //but changed to unstaisfied
  // the component wiil be protected again

  // if always set to be true
  // please make sure that you will update this component
  const keys = Object.keys( depObj );

  const makeProtection = function( props ){
    var allResolved = true;
    for( let key of keys ){
      if( !depObj[key].satisfy( props[key] ) ){
        allResolved = false;
        depObj[key].block.call( this );
        // above operation might cause a state change
        // so if in a componentWillReceiveProps
        // next componentWillReceiveProps will not be triggered till this loop finish
      }
    }
    return allResolved;
  }

  return class extends Comp {
    constructor( props ){
      super( props );
      //this loop fix all props required to be true to be true
      makeProtection.call( this , this.props )
    }

    componentWillReceiveProps( nextProps ){
      if( always ){
        makeProtection.call( this , nextProps )
      }
      // after this loop, nextProps will be the required shape
    }

    render(){
      return (
        <Comp {...this.props} />
      );
    }
  };
}
