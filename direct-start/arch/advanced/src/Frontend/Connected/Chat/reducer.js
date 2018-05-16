import {
  __getMessageFromServer__,
  __asyncSendMessage__,
} from "./actionTypes";

import { Map as ImmutableMap, List as ImmutableList } from "immutable";

export default ( state = new ImmutableMap({
  message: "",
  sendState: {
    pending: false,
    resolved: false,
    rejected: false
  },
  messages: new ImmutableList(),
  uuid: btoa( Math.round( Math.random() * Number.MAX_SAFE_INTEGER ) )
}), { payload, type, id } ) => {
  switch( type ){
    case __asyncSendMessage__.pending: {
      return state.mergeDeep({
        message: payload,
        sendState: {
          pending: true,
          resolved: false,
          rejected: false
        }
      });
    }
    case __asyncSendMessage__.resolved: {
      return state.withMutations( map => {
        map
          .mergeDeep({
            message: "",
            sendState: {
              pending: false,
              resolved: true,
            }
          })
          .update( "messages", messages => {
            return messages.push({
              userid: payload,
              message: state.get("message")
            });
          })
        ;
      });
    }
    case __asyncSendMessage__.rejected: {
      return state.mergeDeep({
        sendState: {
          pending: false,
          rejected: true
        }
      });
    }

    case __getMessageFromServer__: {
      return state.update( "messages", messages => {
        if( Array.isArray( payload ) ){ // messages might be batched
          return messages.clear().concat( payload );
        } else {
          return messages.push( payload );
        }
      });
    }

    default:
      return state;
  }
};
