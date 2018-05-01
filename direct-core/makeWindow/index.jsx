import React from 'react';

import style from 'style';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import * as windowActions from '../WindowManager/actions';

const ableToOperateWindow = connect(
  undefined,
  dispatch => bindActionCreators( windowActions , dispatch )
);

export default Comp => ableToOperateWindow( class extends React.Component {
  static defaultProps = {
    onCancel: () => null,
    headerClass: style.header
    contentClass: ""
  }
  render(){
    const {
      windowId,
      position,
      width,
      height,
      cancelable,
      CancelHandle,
      onCancel,
      headerClass,
      contentClass
    } = this.props;
    return (
      <div
        style={{
          left: position.left,
          top: position.top,
          width: width,
          height: height
        }}
        className={style.window}
        ref={this.getContainer}
      >
        <div
          draggable
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          className={`${style.dragHandle} ${headerClass}`}
          ref={this.getDragHandle}
        >
        </div>
        <div className={headerClass}>
          {
            cancelable ?
            <CancelHandle
              onClick={this.closeWindow}
            />
            :null
          }
        </div>
        <div className={`$style.contentContainer} ${contentClass}`}>
          <Comp
            {...this.props}
            //give the component the ability to close the window it open
            //this will trigger onCancel
            closeWindow={this.closeWindow}
          />
        </div>
      </div>
    );
  }

  getDragHandle = ref => this.dragHandle = ref
  getContainer = ref => this.container = ref

  closeWindow = () => {
    const { closeWindow , windowId , onCancel } = this.props;
    closeWindow( windowId );
    onCancel( this.props );
  }

  onDragStart = ( ev ) => {
    const { setDrag } = this.props;
    const styleTable = window.getComputedStyle( this.container , null );
    const left = styleTable.getPropertyValue("left");
    const top = styleTable.getPropertyValue("top");

    setDrag({
      left: parseInt( left ) - ev.clientX,
      top: parseInt( top ) - ev.clientY,
      ref: this.container
    });
    this.dragHandle.style.opacity = 0;
  }

  onDragEnd = () => {
    this.dragHandle.style.opacity = 1;
  }
});
