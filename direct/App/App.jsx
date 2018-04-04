import React from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { TransitionGroup } from 'react-transition-group';

import * as windowActions from 'direct-core/WindowManager/actions';

import Alert from 'direct-core/Alert';

import Fade from "direct-core/Animation/Fade";

import AnimatedPages from 'AnimatedPages';

import windowSystem from 'windowSystem';

import "global.less";

import "Styles/global.less";

class MaskedRoutes extends React.PureComponent {
  positioned = [];

  constructor( props ){
    super( props );
    this.moveWindow = this.props.moveWindow;
  }

  render(){
    const { Windows , masked , alertText , closeAlert } = this.props;
    return (
      <div
        className="fullSpaceBFC"
        onDragEnter={this.getInit}
        onDragOver={this.smoothlyMove}
        onDrop={this.allowDrop}
      >
        <div className={alertText && windowSystem.alertMask} >
        {
          alertText ? <Fade play><Alert /></Fade> : null
        }
        </div>
        <div className={masked ? windowSystem.masked : windowSystem.positionSystem} />
        <TransitionGroup>
        {
          Windows.map( Window =>
            <Fade key={Window.id}>
              <Window.Component
                position={this.position( Window.id )}
                width="200px"
                height="200px"
                {...Window.props}
                windowId={Window.id}
              />
            </Fade>
          )
        }
        </TransitionGroup>
        <BrowserRouter>
          <AnimatedPages />
        </BrowserRouter>
      </div>
    );
  }

  position = ( id ) => {
    if( !this.positioned[id] ){
      this.positioned[id] = {
        left: 40 + ( id / 20 ) + ( id % 20 ) * 20 + 'px',
        top: 40 + ( id % 20 ) * 20 +'px',
        right: 'auto',
        bottom: 'auto'
      };
    }
    return this.positioned[id];
  }

  getInit = ( ev ) => {
    const { left , top , id } = this.props.draging;
    this.initLeft = left;
    this.initTop = top;
    this.id = id;
  }

  smoothlyMove = ( ev ) => {
    this.moveWindow({
      left: ev.clientX + this.initLeft,
      top: ev.clientY + this.initTop,
      id: this.id
    });
    return ev.preventDefault();
  }

  allowDrop = ( ev ) => {
    return ev.preventDefault();
  }

};

export default connect(
  state => ({
    Windows: state.WindowManager.Windows,
    draging: state.WindowManager.draging,
    masked: state.WindowManager.masked,
    alertText: state.WindowManager.alert
  }),
  dispatch => bindActionCreators( windowActions , dispatch )
)( MaskedRoutes );
