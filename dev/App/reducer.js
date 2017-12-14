import { combineReducers } from 'redux';
import { reducer as ModalManager } from 'ModalManager';
import { reducer as Sample } from 'Connected/Sample';
//import { reducer as ... } from 'Connected/...';

export default combineReducers({
  ModalManager: ModalManager,
  Sample: Sample
  //others
});
