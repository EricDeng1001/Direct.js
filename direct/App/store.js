import { createStore , applyMiddleware } from 'redux';

import reduxThunk from 'redux-thunk';

import initState from 'initState';

import reducer from 'reducer';

import storeConfig from "Config/store";

export default createStore(
  reducer,
  initState,
  applyMiddleware(
    reduxThunk,
    ...storeConfig.middleWare
  )
);
