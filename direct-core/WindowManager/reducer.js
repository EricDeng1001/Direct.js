import {
  __ALERT,
  __CLOSE_ALERT,
  __OPEN_WINDOW,
  __CLOSE_WINDOW,
  __OPEN_MASK,
  __CLOSE_MASK,
  __MOVE_WINDOW,
  __SET_DRAG
} from 'actionTypes';

export default ( state = {
  Windows: [],
  draging: {
    left: 0,
    top: 0,
    ref: null
  },
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
    case __MOVE_WINDOW: {
      let { id , left , top } = payload;
      let stack = [ ...state.Windows ];
      stack = stack.map( m => m.id === id ?
        {
          ...m,
          props:{
            ...m.props,
            position:{
              left: `${left}px`,
              top: `${top}px`
            }
          }
        }
        :m
      );

      return {
        ...state,
        Windows: stack
      };
    }
    case __SET_DRAG: {
      let { id , left , top } = payload;
      return {
        ...state,
        draging: {
          id,
          left,
          top
        }
      };
    }
    case __CLOSE_WINDOW: {
      let stack = [...state.Windows];
      stack = stack.filter( m => m.id !== payload.id );
      return {
        ...state,
        Windows: stack
      };
    }
    case __OPEN_MASK: {
      const { onMaskClick } = payload;
      return {
        ...state,
        onMaskClick,
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
