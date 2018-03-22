import {
  __ALERT,
  __CLOSE_ALERT,
  __OPEN_WINDOW,
  __CLOSE_WINDOW,
  __OPEN_MASK,
  __CLOSE_MASK
} from 'actionTypes';


export const alert = ( text ) => ({
  type: __ALERT,
  payload: {
    text: text
  }
});

export const closeAlert = () => ({
  type: __CLOSE_ALERT
});

let windowId = 1;
export const openWindow = ( Window , props , getId ) => ({
    type: __OPEN_WINDOW,
    payload: {
      Component: Window,
      props: props,
      id: getId ? ( getId( windowId ) ?  windowId++ : windowId++ ) : windowId++
    }
});

export const closeWindow = ( wid ) => ({
  type: __CLOSE_WINDOW,
  payload: {
    id: wid
  }
});

export const openMask = () => ({
  type: __OPEN_MASK
});

export const closeMask = () => ({
  type: __CLOSE_MASK
});
