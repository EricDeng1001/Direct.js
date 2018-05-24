import React from "react";

import { withRouter, Redirect } from "react-router-dom";

import { TransitionGroup, Transition } from "react-transition-group";

import _ from "lodash";

import routesAnimationConfig from "Core/routesAnimation";

import routesConfig from "Core/routes";

import Routes from "./routes";

const fromConfig = routesAnimationConfig["*"].from;

const toConfig = routesAnimationConfig["*"].to;

const defaultConfig = routesAnimationConfig["*"]["*"];

const directAccess = routesAnimationConfig.direct;

const defaultDirectAccess = directAccess["*"];

const choosedAnimation = {};

const noAnimation = {
  entering: "",
  entered: "",
  exiting: "",
  timeout: 0,
  sameTime: false
};

const chooseAnimation = ( from, to, changed ) => {
  if( !changed ){
    return;
  }

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

  if( animation.timeout === 0 ){
    animation = noAnimation;
  }

  for( let key in choosedAnimation ){
    choosedAnimation[key] = undefined;
  }

  _.merge( choosedAnimation, animation );

  _.defaults( choosedAnimation, defaultConfig );

}

function sliceParams( path ){
  var number = 0;
  while( 1 ){
    let index = path.lastIndexOf(":");
    if( index === -1 ){
      break;
    } else {
      path = path.slice( 0, index - 1 );
      number++;
    }
  }
  return [path, number];
}

const getConfigedPath = ( path ) => {
  for( let p in routesConfig ){

    let [slicedP, number] = sliceParams( p );

    let slicedPath = path;
    for( let i = 0; i < number; i++ ){
      slicedPath = slicedPath.slice( 0, slicedPath.lastIndexOf( "/" ) );
    }

    if( routesConfig[p].nested ){
      console.log( slicedPath.slice( 0, slicedP.length ) );
      if( slicedPath.slice( 0, slicedP.length ) === slicedP ){
        return p;
      }
    } else {
      if( slicedP === slicedPath ){
        return p;
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
    const { location } = this.props;

    const configedPath = getConfigedPath( location.pathname );

    if( routesConfig[configedPath].redirect ){
      return (
        <Redirect
          to={routesConfig[configedPath].redirect}
        />
      );
    }

    this.from = this.to;
    this.to = configedPath;

    var changed = true;
    if( configedPath === this.lastPath ){
      changed = false;
    } else {
      this.lastPath = configedPath;
    }

    chooseAnimation( this.from, this.to, changed );

    return (
      <TransitionGroup>
        <Transition
          key={configedPath}
          timeout={{
            get enter(){
              return choosedAnimation.timeout;
            },
            get exit(){
              return choosedAnimation.timeout;
            }
          }}
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
