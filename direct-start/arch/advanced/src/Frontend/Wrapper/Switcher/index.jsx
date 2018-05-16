import React from "react";

import style from "./style";

import { TransitionGroup } from "react-transition-group";

class Switcher extends React.PureComponent {
  render(){
    const {
      children,
      show,
      rootClass,
      Animation
    } = this.props;
    if( !children[show] ){
      return null;
    }
    if( Animation ){
      return (
        <TransitionGroup className={`${style.container} ${rootClass}`}>
          <Animation key={show}>
            <section>
              {children[show]}
            </section>
          </Animation>
        </TransitionGroup>
      );
    }
    return children[show];
  }
};

export default Switcher;
