import React from 'react';

import { CSSTransition } from 'react-transition-group';

import getClassNames from '../Algorithm/getAnimationNames';

export default ( animationCSS , timeout )=> {
  const classNames = getClassNames( animationCSS );
  return class extends React.PureComponent {
    render(){
      const { children , play , ...other } = this.props;
      return (
        <CSSTransition
          {...other}
          in={play || other.in}
          mountOnEnter
          unmountOnExit
          classNames={classNames}
          timeout={timeout}
          appear
          >
            {children}
        </CSSTransition>
        );
    }
  };
}
