import { combineReducers } from 'redux';
import WindowManager from 'WindowManager/reducer';
import reducerConfig from 'Config/reducer';

export default combineReducers({
  WindowManager: WindowManager,
  ...reducerConfig
});
