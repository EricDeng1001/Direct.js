import { combineReducers } from "redux";

import WindowManager from "direct-core/WindowManager/reducer";

import reducerConfig from "Core/reducer";

export default combineReducers({
  WindowManager,
  ...reducerConfig
});
