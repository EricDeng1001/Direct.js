import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import reducerConfig from "Core/reducer";

import storeConfig from "Core/store";

import _ from "lodash";

import injectedState from "Core/injectedState";

import AppConfig from "Core/App";

const persistentState = AppConfig.persistentState;

const initState = {};

var topLevelStore;
try{
 topLevelStore = JSON.parse( localStorage.lastState );
} catch ( e ){
  topLevelStore = {};
}

for( let key in reducerConfig ){
  initState[key] = reducerConfig[key]( undefined, {
    type: Symbol("@@DirectJS/RestoreLastState")
  });
  if( persistentState[key] ){
    let rebuilder = persistentState[key].rebuilder
      || persistentState.rebuilder
      || JSON.parse;
    let merger = persistentState[key].merger
      || persistentState.merger
      || _.merge;
    initState[key] = merger( initState[key], rebuilder( topLevelStore[key] ) );
  }
  if( injectedState ){
    if( injectedState[key] ){
      let merger = injectedState[key].merger
        || injectedState.merger
        || _.merge;
      delete injectedState[key].merger;
      initState[key] = merger( initState[key], props );
    }
  }
}

export default createStore(
  combineReducers( reducerConfig ),
  initState,
  compose(
    applyMiddleware(
      ...(storeConfig.middleWares || [] )
    ),
    ...(storeConfig.enhancers || [] )
  )
);
