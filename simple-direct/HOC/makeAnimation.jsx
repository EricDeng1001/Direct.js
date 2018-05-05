import React from "react";

import { CSSTransition } from "react-transition-group";

const getClassNames = styleModule => ({
  appear: styleModule.appear,
  appearActive: styleModule.appearActive,
  enter: styleModule.enter,
  enterActive: styleModule.enterActive,
  exit: styleModule.exit,
  exitActive: styleModule.exitActive,
})

export default ( animationCSS, timeout )=> {
  const classNames = getClassNames( animationCSS );
  return class extends React.PureComponent {
    render(){
      const { children, play, ...other } = this.props;
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
