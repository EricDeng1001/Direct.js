import React from "react";

export default {
  socket: {

  },
  persistentState: {

  },
  modifyApp( App ){
    return ( props ) => (
      <App {...props} />
    );
  },
  onAppWillMount( state, dispatch, socket ){

  },
  onAppWillClose( state, persistentState, socket ){

  },
  onUIErrorShowErrorMessage: true,
  UIErrorMessage: undefined,
  UIErrorHandler( error, info ){
    console.log( error, info );
  }
};
