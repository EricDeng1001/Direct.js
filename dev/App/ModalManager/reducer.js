import {
  ALERT,
  CLOSE_ALERT,
  OPEN_MODAL,
  CLOSE_MODAL,
  SHADOW_CURRENT_PAGE,
  UNSHADOW_CURRENT_PAGE
} from 'actionTypes';

export default ( state = { Modals: [] , masked: false , alert: null } ,
{ type , payload , id } ) => {
  if( type === SHADOW_CURRENT_PAGE ){
    return { ...state,
      masked: true
    };
  }
  if( type === UNSHADOW_CURRENT_PAGE ){
    return { ...state,
      masked: false
    };
  }
  var stack = [ ...state.Modals ];
  switch( type ){
    case ALERT:
      return { ...state,
        alert: payload.text
      };
    case CLOSE_ALERT:
      return { ...state,
        alert: null
      };
    case OPEN_MODAL:
      stack.push( payload );
      break;
    case CLOSE_MODAL:
      stack = stack.filter( m => m.modalId !== payload.modalId );
      break;
    default:
      return state;
  }
  return {
    ...state,
    Modals: stack
  };
}
