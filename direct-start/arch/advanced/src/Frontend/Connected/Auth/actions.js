// @flow
import {
  __edit__,
  __logout__,
  __createAuth__,
  __getAuth__
} from "./actionTypes";

import getAuthGraphQL from "./getAuth";
import createAuthGraphQL from "./createAuth";

export const logout = () => ({
  type: __logout__
});

var p = false;
export const createAuth = ( certification, password ) => ({
  type: __createAuth__,
  handler( pending, resolve, reject ){
    if( p ){
      return;
    }
    p = true;
    pending({ certification, password });
    fetch( "/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        query: createAuthGraphQL,
        variables: {
          certification,
          password
        }
      })
    })
    .then( response => {
      if( response.ok ){
        return response.json();
      }
      throw "network";
    })
    .then( json => {
      if( json.errors ){
        throw json.errors[0].message;
      }
      resolve( json.data.createAuth );
      p = false;
    })
    .catch( reason => {
      reject( reason );
      p = false;
    })
  }
});

export const getAuth = ( certification, password ) => ({
  type: __getAuth__,
  handler( pending, resolve, reject ){
    if( p ){
      return;
    }
    p = true;
    pending({ certification, password });
    fetch( "/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        query: getAuthGraphQL,
        variables: {
          certification,
          password
        }
      })
    })
    .then( response => {
      if( response.ok ){
        return response.json();
      }
      throw "network";
    })
    .then( json => {
      if( json.errors ){
        throw json.errors[0].message;
      } else {
        resolve( json.data.authorize );
        p = false;
      }
    })
    .catch( reason => {
      reject( reason );
      p = false;
    });
  }
});
