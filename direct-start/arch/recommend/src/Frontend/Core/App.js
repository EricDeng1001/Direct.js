import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import _ from "lodash";

import AppShell from "./AppShell";

export default {
  socket: {

  },
  persistentState: {

  },
  modifyApp( App ){
    return props => (
      <MuiThemeProvider>
        <AppShell>
          <App {...props} />
        </AppShell>
      </MuiThemeProvider>
    );
  },
  onAppWillMount( state, dispatch, socket ){

  },
  onAppWillClose( state, persistentState, socket ){

  },
  onUIErrorShowErrorMessage: true,
  UIErrorMessage: (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>A Bug Happened</h1>
    </div>
  ),
  UIErrorHandler( error, info ){
    console.log( error );
    console.log( info );
  }
};
