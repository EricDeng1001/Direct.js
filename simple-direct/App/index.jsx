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

  localStorage.lastState = {};
  for( let key of persistentState ){
    let serializer = persistentState[key].serializer || JSON.stringify;
    localStorage.lastState[key] = serializer( state[key] );
  }
});
