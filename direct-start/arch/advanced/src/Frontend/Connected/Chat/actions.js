import {
  __asyncSendMessage__,
  __getMessageFromServer__,
  __queryHistory__
} from "./actionTypes";

import { __chatSocketEventName__ } from "Constant/SocketEventName";

import socket from "socket";

export const sendMessage = ( message, userid ) => ({
  type: __asyncSendMessage__,
  handler( pending, resolve, reject ){
    pending( message );
    socket.emit( __chatSocketEventName__.clientSendMessage, {
      userid,
      message
    }, status => {
      if( status === 200 ){
        resolve( userid );
      }
      else {
        reject();
      }
    })
  }
});

export const getMessage = ( message ) => ({
  type: __getMessageFromServer__,
  payload: message
});
