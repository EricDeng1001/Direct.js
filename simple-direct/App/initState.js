import _ from "lodash";

import reducerConfig from "Core/reducer";

import injectedState from "Core/injectedState";

const keys = Object.keys( reducerConfig );

const initState = {};

for( let key of keys ){
  initState[key] = reducerConfig[key]( undefined, {
    type: Symbol("@@DirectJS/RestoreLastStateShapeTheTree")
  });
}

var lastState;

try {
  lastState = JSON.parse( localStorage.lastState );
} catch( e ){
  lastState = {};
}

_.merge( initState, lastState );

if( injectedState ){
  _.merge( initState, injectedState );
}

export default initState;
