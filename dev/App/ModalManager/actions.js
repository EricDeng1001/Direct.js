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

let modalId = 1;
export const openModal = ( Modal , props , getId ) => ({
    type: OPEN_MODAL,
    payload: {
      Component : Modal,
      props: props,
      modalId: getId ? ( getId( modalId ) ?  modalId++ : modalId++ ) : modalId++
    }
});

export const closeModal = ( mid ) => ({
  type: CLOSE_MODAL,
  payload: {
    modalId: mid
  }
});

export const shadowCurrentPage = () => ({
  type: SHADOW_CURRENT_PAGE
});

export const unShadowCurrentPage = () => ({
  type: UNSHADOW_CURRENT_PAGE
});
