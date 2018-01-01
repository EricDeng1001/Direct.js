const lastState = localStorage.lastState;
var exports;
try {
  exports = JSON.parse( lastState );
}
catch ( e ){
  exports = {};
}
export default exports;
