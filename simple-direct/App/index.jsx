import React from "react";

import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import extract from "direct-core/Algorithm/extractObject";

import socket from "direct-core/socket";

import App from "App";

import store from "store";

import AppConfig from "Config/App";

const modifyApp = AppConfig.modifyApp || a => a;

ReactDOM.render(
  modifyApp(
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById("reactRoot")
);


const { onAppWillMount , onAppWillClose , persistentState } = AppConfig;

window.addEventListener( "load" , () => {
  onAppWillMount( socket , store.dispatch.bind( store ) );
});

window.addEventListener( "beforeunload" , () => {

  onAppWillClose( store.getState() , persistentState , socket );

  const stateToStore = extract( store.getState() , persistentState );

  localStorage.lastState = JSON.stringify( stateToStore );

});
