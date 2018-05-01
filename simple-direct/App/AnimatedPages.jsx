import React from 'react';

import { withRouter } from 'react-router-dom';

import { TransitionGroup, Transition } from 'react-transition-group';

import timeout from "direct-core/animationTime";

import routesAnimationConfig from "Core/routesAnimation";

import routesConfig from "Core/routes";

import Routes from './routes';

const fromConfig = routesAnimationConfig['*'].from;

const toConfig = routesAnimationConfig['*'].to;

const defaultConfig = routesAnimationConfig['*']['*'];

const directAccess = routesAnimationConfig["direct"];

const defaultDirectAccess = directAccess['*'];

const defaultStyle = {};

const lastAnimation = {};

const animation = ( from, to, state, changed ) =>  {
  if( !changed ){
    return lastAnimation[state];
  }

  if( state === "exited" ){
    return {
      display: "none"
    };
  }

  var timingFunction = defaultConfig.timingFunction;
  var toAnimate = defaultConfig.toAnimate;

  var animation = defaultConfig;

  if( from === "" ){
    if( from in directAccess ){
      animation = directAccess[from];
    } else {
      animation = defaultDirectAccess;
    }
  } else if( from in routesAnimationConfig ){
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
  entering -> entered, this is the enter animation
  entered -> exiting, this is the exiting animation
  */
  lastAnimation = animation;
  return animation[state];
}

const getConfigedPath = ( path ) => {
  for( let p in routesConfig ){
    if( p === path ){
      return p;
    }
    if( routesConfig[p].nested ){
      if( path.length > p.length ){
        if( path.slice( 0, p.length ) === p ){
          return p;
        }
      }
    }
  }
  return '*';
}

class AnimatedPages extends React.PureComponent {
  from = ''
  to = ''
  render(){
    var changed = true;
    const { location } = this.props;
    const configedPath = getConfigedPath( location.pathname );
    this.from = this.to;
    this.to = location.pathname;
    if( configedPath === this.lastPath ){
      changed = false;
    } else {
      this.lastPath = configedPath;
    }
    return (
      <TransitionGroup className="fullSpaceBFC">
        <Transition
          key={configedPath}
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
                  ...animation( this.from, this.to, state, changed )
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
