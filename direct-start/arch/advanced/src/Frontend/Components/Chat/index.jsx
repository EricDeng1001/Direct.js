import React from "react";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import applyHOCs from "direct-core/applyHOCs";

import socket from "socket";

import { __chatSocketEventName__ } from "Constant/SocketEventName";

import ExpandingTextInput from "StateOnlyUI/ExpandingTextInput";

import * as actions from "Connected/Chat/actions";

import style from "./style";

class Chat extends React.PureComponent {
  constructor( props ){
    super( props );
    const { getMessage } = props;
    socket
    .on( __chatSocketEventName__.serverPushMessage, getMessage )
    .on( __chatSocketEventName__.queryHistory, getMessage );
  }

  componentDidMount(){
    socket.emit( __chatSocketEventName__.queryHistory );
  }

  componentWillUnmount(){
    const { getMessage } = this.props;
    socket
    .removeListener( __chatSocketEventName__.serverPushMessage, getMessage )
    .removeListener( __chatSocketEventName__.queryHistory, getMessage )
  }

  sendMessage = ( data ) => {
    const { userid } = this.props;
    this.props.sendMessage( data, userid );
    this.scroll( this.scroller.scrollHeight );
  }

  easeInOutQuad( t, b, c, d ){
    t /= d / 2;
    if( t < 1 ){
      return c / 2 * t * t + b;
    }
    t--;
    return - c / 2 * ( t * ( t - 2 ) - 1) + b;
  }

  scroll = ( top ) => {
    const start = this.scroller.scrollTop;
    const change = top - start;
    var currentTime = 0;
    const increment = 20;
    const duration = 800;

    var animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad( currentTime, start, change, duration );
      this.scroller.scrollTop = val;
      if( currentTime < duration ){
          setTimeout( animateScroll, increment );
      }
    };

    animateScroll();
  }

  getScroller = ref => this.scroller = ref

  render(){
    const { messages, rootClass } = this.props;
    return (
      <div className={`${style.container} ${rootClass}`}>
        <div
          className={style.messages}
          ref={this.getScroller}
        >
          {
            messages.map( ( message, key ) =>
              <div key={message + key} className={style.oneMessage}>
                <div className={style.userid}>{message.userid}</div>
                <div className={style.message}>{message.message}</div>
              </div>
            )
          }
        </div>
        <div className={style.inputContainer}>
          <ExpandingTextInput
            rootClass={style.input}
            label="chat"
            placeholder="input here"
            id="chatInput"
            onData={this.sendMessage}
          />
        </div>
      </div>
    );
  }
}

export default applyHOCs([
  connect(
    state => ({
      messages: state.Chat.get("messages"),
      userid: state.Auth.get("authorized") ?
        state.Auth.get("certification")
      : "visitor-" + state.Chat.get("uuid")
    }),
    dispatch => bindActionCreators( actions, dispatch )
  )
], Chat );
