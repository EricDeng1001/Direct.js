import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import reducerConfig from "Core/reducer";

import storeConfig from "Core/store";

import initState from "./initState";

import _ from "lodash";

import injectedState from "Core/injectedState";

import persistentState from "Core/persistentState";

const keys = Object.keys( reducerConfig );

const initState = {};

var lastState = {};

for( let key of keys ){
  initState[key] = reducerConfig[key]( undefined, {
    type: Symbol("@@DirectJS/RestoreLastStateShapeTheTree")
  });
  let rebuilder = persistentState.rebuilder || JSON.parse;
  lastState[key] = rebuilder( localStorage.lastState[key] );
}

_.merge( initState, lastState );

if( injectedState ){
  _.merge( initState, injectedState );
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
