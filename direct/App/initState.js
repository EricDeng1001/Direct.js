import merge from "direct-core/Algorithm/mergeObject";

import reducerConfig from "Config/reducer";

import injectedState from "Config/injectedState";


const keys = Object.keys( reducerConfig );

const initState = {};

for( let key of keys ){
  initState[key] = reducerConfig[key]( undefined , { type: "@@DirectJS/RestoreLastState" } );
}

var lastState;

try {
  lastState = JSON.parse( localStorage.lastState );
} catch( e ){
  lastState = {};
}

Object.assign( initState , lastState );

if( injectedState ){
  merge( initState , injectedState , true );
}

export default initState;
