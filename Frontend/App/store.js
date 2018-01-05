import { createStore , applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import initState from 'initState';
import reducer from 'reducer';

export default createStore(
  reducer,
  initState,
  applyMiddleware(
    reduxThunk,
    logger
  )
);
