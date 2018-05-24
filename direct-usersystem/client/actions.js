// @flow
import {
  __edit__,
  __logout__,
  __createAuth__,
  __getAuth__
} from "./actionTypes";

export const logout = () => ({
  type: __logout__,
  handler( pending, resolve, reject ){
    pending();
    fetch( "/api/auth/logout", {
      method: "post",
      credentials: "same-origin"
    })
      .then( response => response.ok ? resolve(): reject() )
      .catch( $ => reject() )
    ;
  }
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
    fetch( "/api/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        certification,
        password
      })
    })
      .then( response => {
        if( response.ok ){
          return response.json();
        }
        throw "network";
      })
      .then( json => {
        if( json.status !== 200 ){
          throw json.status;
        }
        resolve( json );
        p = false;
      })
      .catch( reason => {
        reject( reason );
        p = false;
      })
    ;
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
    fetch( "/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        certification,
        password
      })
    })
      .then( response => {
        if( response.ok ){
          return response.json();
        }
        throw "network";
      })
      .then( json => {
        if( json.status !== 200 ){
          throw json.status;
        } else {
          resolve( json );
          p = false;
        }
      })
      .catch( reason => {
        reject( reason );
        p = false;
      })
    ;
  }
});
