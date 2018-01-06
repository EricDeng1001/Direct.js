import {
  __GET_MESSAGE,
  __ASYNC_SEND_MESSAGE,
} from 'actionTypes';

export default ( state = {
    message: "",
    messages: []
  } , { payload , type , id } ) => {
    switch( type ){
      /*
      defineAsyncActionReducer __SEND_MESSAGE start
      */
      case __ASYNC_SEND_MESSAGE.pending: {
        return {
          ...state,
          message: payload.message
        };
      }
      case __ASYNC_SEND_MESSAGE.resolved: {
        let newMessages = [...state.messages];
        newMessages.push({
          userid: payload.userid,
          message:state.message
        });
        return {
          message: "",
          messages: newMessages
        };
      }
      case __ASYNC_SEND_MESSAGE.rejected: {
        return state;
      }
      /*
      defineAsyncActionReducer __SEND_MESSAGE end
      */
      /*
      defineSyncActionReducer __GET_MESSAGE start
      */
      case __GET_MESSAGE: {
        let { message } = payload;
        let newMessages = [...state.messages];
        newMessages.push( message );
        return {
          ...state,
          messages: newMessages
        };
      }
      /*
      defineSyncActionReducer __GET_MESSAGE end
      */
      default:
        return state;
    }
  }
