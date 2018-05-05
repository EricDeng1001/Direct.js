import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppConfig from "Core/App";

import socket from "./socket";
import App from "./App";
import store from "./store";

const { onAppWillMount, onAppWillClose, persistentState } = AppConfig;

const _window = window;
const _document = document;

_window.addEventListener( "load", () => {

  onAppWillMount( store.getState(), store.dispatch.bind( store ), socket );

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    _document.getElementById("DirectRoot")
  );
});

_window.addEventListener( "beforeunload", () => {

  const state = store.getState();

  onAppWillClose( state, persistentState, socket );

  const stateToStore = extract( state, persistentState );

  localStorage.lastState = JSON.stringify( stateToStore );

});

function __extract( obj, condition, mountPoint ){
  const keys = Object.keys( condition );

  for( let i = 0 ; i < keys.length ; i++ ){
    if( condition[keys[i]] === true ){
      mountPoint[keys[i]] = obj[keys[i]];
    }
    else if( condition[keys[i]] === false ){
      continue;
    }
    else {
      mountPoint[keys[i]] = {};
      __extract( obj[keys[i]], condition[keys[i]], mountPoint[keys[i]] );
    }
  }
}

function extract( obj, condition ){
  const res = {};
  __extract( obj, condition, res );
  return res;
}
