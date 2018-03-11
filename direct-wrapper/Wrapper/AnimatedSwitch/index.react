import React from 'react';
import { TransitionGroup , CSSTransition } from 'react-transition-group';

import getClassNames from 'direct-core/Algorithm/getAnimationNames';

class AnimatedSwitch extends React.PureComponent {
  render(){
    const { animation , unique , timeout , children } = this.props;
    return (
      <TransitionGroup className="fullSpaceBFC">
        <CSSTransition
          key={unique}
          classNames={getClassNames( animation )}
          timeout={timeout}
          mountOnEnter
          unmountOnExit
          appear
        >
          {
            children
          }
        </CSSTransition>
      </TransitionGroup>
    );
  }
};

export default AnimatedSwitch;
