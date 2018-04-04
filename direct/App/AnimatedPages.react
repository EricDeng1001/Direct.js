import React from 'react';

import Routes from 'routes';

import { withRouter } from 'react-router-dom';

import { TransitionGroup , Transition } from 'react-transition-group';

import routesAnimationConfig from "Config/routesAnimation";

import timeout from "direct-core/animationTime";

import routesConfig from "Config/routes";

const fromConfig = routesAnimationConfig['*'].from;

const toConfig = routesAnimationConfig['*'].to;

const defaultStyle = {};

const animation = ( from , to , state ) =>  {
  var timingFunction = 'ease';
  var toAnimated = 'all';

  var animation = {
    exiting: {
      left: "-100%"
    },
    entering: {
      left: "100%"
    },
    entered: {
      left: "0"
    }
  };

  if( from in routesAnimationConfig ){
    if( to in routesAnimationConfig ){
      animation = routesAnimationConfig[from][to];
    }
  } else if( from in fromConfig ){
    animation = fromConfig[from];
  } else if ( to in toConfig ){
    animation = toConfig[to];
  }
  if( Number.isInteger( animation.time ) ){
    timeout.setTime( animation.time );
  } else {
    timeout.setTime( 1000 );
  }
  if( typeof animation.timingFunction === "string" ){
    timingFunction = animation.timingFunction;
  }
  if( typeof animation.toAnimated === "string" ){
    toAnimated = animation.toAnimated;
  }

  defaultStyle.transition = `${toAnimated} ${timeout.value}ms ${timingFunction}`;
  /*
  entering -> entered , this is the enter animation
  entered -> exiting , this is the exiting animation
  */
  return animation[state];
}
class AnimatedPages extends React.PureComponent {
  from = ''
  to = ''
  render(){
    const { location } = this.props;
     this.from = this.to;
     this.to = location.pathname;
    return (
      <TransitionGroup className="fullSpaceBFC">
        <Transition
          key={location.pathname}
          timeout={{
            enter: 0,
            exit: timeout.value
          }}
          appear
        >
          {
            state =>
              <section
                className="page"
                style={{
                  ...defaultStyle,
                  ...animation( this.from , this.to  , state )
                }}
              >
                <Routes location={location} />
              </section>
          }
        </Transition>
      </TransitionGroup>
    );
  }

};

export default withRouter( AnimatedPages );
