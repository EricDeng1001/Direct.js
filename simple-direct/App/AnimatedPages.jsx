import React from 'react';

import { withRouter } from 'react-router-dom';

import { TransitionGroup , Transition } from 'react-transition-group';

import timeout from "direct-core/animationTime";

import routesAnimationConfig from "Core/routesAnimation";

import routesConfig from "Core/routes";

import Routes from './routes';

const fromConfig = routesAnimationConfig['*'].from;

const toConfig = routesAnimationConfig['*'].to;

const defaultConfig = routesAnimationConfig['*']['*'];

const defaultStyle = {};

const animation = ( from , to , state ) =>  {
  if( state === "exited" ){
    return {
      display: "none"
    };
  }
  var timingFunction = defaultConfig.timingFunction;
  var toAnimate = defaultConfig.toAnimate;

  var animation = defaultConfig;

  if( from in routesAnimationConfig ){
    if( to in routesAnimationConfig[from] ){
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
    timeout.setTime( defaultConfig.time );
  }
  if( typeof animation.timingFunction === "string" ){
    timingFunction = animation.timingFunction;
  }
  if( typeof animation.toAnimate === "string" ){
    toAnimate = animation.toAnimate;
  }

  defaultStyle.transition = `${toAnimate} ${timeout.value}ms ${timingFunction}`;
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
