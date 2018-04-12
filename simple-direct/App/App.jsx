import React from "react";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import { TransitionGroup } from "react-transition-group";

import * as windowActions from "direct-core/WindowManager/actions";

import Alert from "direct-core/Alert";

import Fade from "direct-core/Animation/Fade";

import asyncLoad from "direct-core/asyncLoad";

import AnimatedPages from "AnimatedPages";

import windowSystem from "windowSystem";

import "global.less";

import "Styles/global.less";

class MaskedRoutes extends React.PureComponent {
  positioned = [];

  constructor( props ){
    super( props );
    this.moveWindow = this.props.moveWindow;
  }

  render(){
    const { Windows , masked , alertText , closeAlert , onMaskClick } = this.props;
    return (
      <div
        className="fullSpaceBFC"
        onDragEnter={this.getInit}
        onDragOver={this.smoothlyMove}
        onDrop={this.allowDrop}
      >
        {
          alertText?
          <div className={alertText && windowSystem.alertMask}>
            <Fade play>
              <Alert />
            </Fade>
          </div>
          :null
        }
        <div
          className={masked ? windowSystem.masked : windowSystem.positionSystem}
          onClick={onMaskClick}
        />
        <TransitionGroup>
        {
          Windows.map( Window =>
            <Fade key={Window.id}>
              <Window.Component
                position={this.position( Window.id )}
                width="50vw"
                height="50vh"
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
        left: 40 + ( id / 20 ) + ( id % 20 ) * 20 + "px",
        top: 40 + ( id % 20 ) * 20 +"px",
        right: "auto",
        bottom: "auto"
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
  ({ state: { WindowManager } }) => ({
    Windows: WindowManager.Windows,
    draging: WindowManager.draging,
    masked: WindowManager.masked,
    alertText: WindowManager.alert,
    onMaskClick: WindowManager.onMaskClick
  }),
  dispatch => bindActionCreators( windowActions , dispatch )
)( MaskedRoutes );
