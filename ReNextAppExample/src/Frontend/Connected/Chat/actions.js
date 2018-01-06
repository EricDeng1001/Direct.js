import {
  __ASYNC_SEND_MESSAGE,
  __GET_MESSAGE,
} from 'actionTypes';

/*
defineAsyncActionCreator sendMessage start
*/
let sendMessageCounter = 0;
const sendMessageStart = ( message ) => ({
    type: __ASYNC_SEND_MESSAGE.pending,
    payload: {
      message
    },
    id: sendMessageCounter
});
const sendMessageResolved = ( userid ) => ({
    type: __ASYNC_SEND_MESSAGE.resolved,
    payload: {
      userid
    },
    id: sendMessageCounter
});
const sendMessageRejected = ( reason , detail ) => ({
    type: __ASYNC_SEND_MESSAGE.rejected,
    id: sendMessageCounter
});

export const sendMessage = ( socket , message ) => ( dispatch , getState ) => {
  const oldState = getState();
  const reqId = ++sendMessageCounter;
  const dispatchLastest = action => {
    if( reqId === sendMessageCounter ){
      dispatch( action );
    }
  }
  dispatch( sendMessageStart( message ) );
  socket.emit("send message" , {
    userid: oldState.UserManager.userid,
    message
  } , response => {
    if( response.status === 200 ){
      dispatchLastest( sendMessageResolved( oldState.UserManager.userid ) );
    }
    else {
      dispatchLastest( sendMessageRejected() );
    }
  })
};

/*
defineAsyncActionCreator sendMessage end
*/

/*
defineSyncActionCreator getMessage start
*/
let getMessageCounter = 0;
export const getMessage = ( message ) => ({
    type: __GET_MESSAGE,
    payload: {
      message
    },
    id: getMessageCounter++
});
/*
defineSyncActionCreator getMessage end
*/
