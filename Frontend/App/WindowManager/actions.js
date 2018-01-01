/*
**   Antinux Innovation
**   Author: Eric Deng
*/
import {
  ALERT,
  CLOSE_ALERT,
  OPEN_MODAL,
  CLOSE_MODAL,
  SHADOW_CURRENT_PAGE,
  UNSHADOW_CURRENT_PAGE
} from 'actionTypes';


export const alert = ( text ) => ({
  type: ALERT,
  payload: {
    text: text
  }
});

export const closeAlert = () => ({
  type: CLOSE_ALERT
});

let windowId = 1;
export const openWindow = ( Window , props , getId ) => ({
    type: OPEN_MODAL,
    payload: {
      Component: Window,
      props: props,
      id: getId ? ( getId( windowId ) ?  windowId++ : windowId++ ) : windowId++
    }
});

export const closeWindow = ( wid ) => ({
  type: CLOSE_MODAL,
  payload: {
    id: wid
  }
});

export const openMask = () => ({
  type: SHADOW_CURRENT_PAGE
});

export const closeMask = () => ({
  type: UNSHADOW_CURRENT_PAGE
});
