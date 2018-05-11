import React from "react";

import { withRouter, Redirect } from "react-router-dom";

import { TransitionGroup, Transition } from "react-transition-group";

import routesAnimationConfig from "Core/routesAnimation";

import routesConfig from "Core/routes";

import _ from "lodash";

import Routes from "./routes";

const basicTransition = routesAnimationConfig.basicTransition;

const fromConfig = routesAnimationConfig["*"].from;

const toConfig = routesAnimationConfig["*"].to;

const defaultConfig = routesAnimationConfig["*"]["*"];

const directAccess = routesAnimationConfig.direct;

const defaultDirectAccess = directAccess["*"];

const defaultStyle = {
  ...basicTransition,
  minHeight: "100%",
  minWidth: "100%"
};

const choosedAnimation = {

};

const chooseAnimation = ( from, to, changed ) => {
  if( !changed ){
    return animation;
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

  if( animation.timeout === undefined ){
    animation.timeout = defaultConfig.timeout;
  }

  if( animation.sameTime === undefined ){
    animation.sameTime = defaultConfig.sameTime;
  }

  _.merge( choosedAnimation, animation );
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
  return "*";
}

class AnimatedPages extends React.Component {
  from = ""
  to = ""
  state = {
    entered: false
  }

  shouldComponentUpdate( nextProps, nextState ){
    if( nextProps.location.pathname !== this.props.location.pathname ){
      return true;
    }
    if( nextState.entered !== this.state.entered ){
      return true;
    }
    return false;
  }

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
    if( routesConfig[configedPath].redirect ){
      return (
        <Redirect
          to={routesConfig[configedPath].redirect}
        />
      );
    }
    const key = location.pathname;
    chooseAnimation( this.from, this.to, changed );
    return (
      <TransitionGroup>
        <Transition
          key={configedPath}
          timeout={choosedAnimation.timeout}
          appear
        >
          {
            state => {
              if( state === "exited" ){
                if( choosedAnimation.sameTime ){
                  return null;
                } else {
                  return <div />; // do not use section
                }
              } else {
                return (
                  <section
                    style={defaultStyle}
                    className={choosedAnimation[state]}
                  >
                    <Routes location={location} />
                  </section>
                );
              }

            }
          }
        </Transition>
      </TransitionGroup>
    );
  }
};

export default withRouter( AnimatedPages );
