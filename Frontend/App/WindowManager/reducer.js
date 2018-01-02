import {
  __ALERT,
  __CLOSE_ALERT,
  __OPEN_WINDOW,
  __CLOSE_WINDOW,
  __OPEN_MASK,
  __CLOSE_MASK
} from 'actionTypes';

export default ( state = {
  Windows: [],
  masked: false,
  alert: null
} , { type , payload , id } ) => {
  switch( type ){
    case __ALERT: {
      return {
        ...state,
        alert: payload.text
      };
    }
    case __CLOSE_ALERT: {
      return {
        ...state,
        alert: null
      };
    }
    case __OPEN_WINDOW: {
      let stack = [ ...state.Windows ];
      stack.push( payload );
      return {
        ...state,
        Windows: stack
      };
    }
    case __CLOSE_WINDOW: {
      let stack = [ ...state.Windows ];
      stack = stack.filter( m => m.id !== payload.id );
      return {
        ...state,
        Windows: stack
      };
    }
    case __OPEN_MASK: {
      return {
        ...state,
        masked: true
      };
    }
    case __CLOSE_MASK: {
      return {
        ...state,
        masked: false
      };
    }
    default:
      return state;
  }
}
