import { combineReducers } from 'redux';

import WindowManager from 'direct-core/WindowManager/reducer';

import reducerConfig from 'Config/reducer';

export default combineReducers({
  WindowManager: WindowManager,
  ...reducerConfig
});
