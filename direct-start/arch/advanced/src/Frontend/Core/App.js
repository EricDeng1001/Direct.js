import * as OfflinePluginRuntime from "offline-plugin/runtime";

import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { __authorizeEventName__ } from "Constant/SocketEventName.js";
import { __maxAge__ } from "Constant/SystemCode";

import { Map as ImmutableMap, List as ImmutableList } from "immutable";

import _ from "lodash";

import AppShell from "./AppShell";

export default {
  socket: {

  },
  persistentState: {
    Auth: {
      serializer( state ){
        const {
          certification,
          authorizedAt,
          authorized,
          permission,
          token,
          ...others
        } = state.toObject();
        return JSON.stringify({
          certification,
          authorizedAt,
          authorized,
          permission,
          token
        });
      },
      rebuilder( storedState ){
        if( !storedState ){
          return;
        }
        return JSON.parse( storedState );
      },
      merger( origin, lastState ){
        return origin.merge( lastState );
      }
    },
    Chat: {
      serializer( state ){
        const {
          uuid
        } = state.toObject();
        return JSON.stringify({ uuid });
      },
      rebuilder( storedState ){
        if( !storedState ){
          return;
        }
        return JSON.parse( storedState );
      },
      merger( origin, lastState ){
        return origin.merge( lastState );
      }
    }
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
    if( state.Auth.authorized ){
      socket.emit( __authorizeEventName__.checkAuthState, state.Auth.token, ( keeped ) => {
        if( !keeped ){
          state.Auth.authorized = false;
          state.Auth.token = "";
          state.permission = null;
        }
      });
    }

    OfflinePluginRuntime.install({
      onUpdateReady(){
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated(){
        if( process.env.NODE_ENV === "development" ){
          window.location.reload();
        }
        else if( window.confirm("App已经更新,是否重载?") ){
          window.location.reload();
        }
      }
    });

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
      <p>A bug happened</p>
    </div>
  ),
  UIErrorHandler( error, info ){
    console.log( error, info );
  }
};
