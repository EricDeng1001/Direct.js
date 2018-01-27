import {
  __ASYNC_LOGIN,
  __ASYNC_LOGOUT,
  __ASYNC_READ_USER_INFO,
  __ASYNC_SIGNUP,
  __TOGGLE_KEEP_LOGIN,
  __TOGGLE_REMEMBER_PASSWORD
} from 'actionTypes';

export default ( state = {
    loginState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network",
      failedDetail: null
    },
    logoutState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network",
      failedDetail: null
    },
    signupState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network",
      failedDetail: null
    },
    //token: '',
    cert: "",
    userid: "",
    password: "",
    keepLogin: false,
    rememberPassword: false,
    signupStatus: -1,
    loginStatus: -1
} , { type , payload , id } ) => {

  switch( type ){
    /*
    defineSyncActionReducer __TOGGLE_REMEMBER_PASSWORD start
    */
    case __TOGGLE_REMEMBER_PASSWORD: {
      return {
        ...state,
        rememberPassword: !state.rememberPassword
      };
    }
    /*
    defineSyncActionReducer __TOGGLE_REMEMBER_PASSWORD end
    */
    /*
    defineSyncActionReducer __TOGGLE_KEEP_LOGIN start
    */
    case __TOGGLE_KEEP_LOGIN: {
      return {
        ...state,
        keepLogin: !state.keepLogin
      };
    }
    /*
    defineSyncActionReducer __TOGGLE_KEEP_LOGIN end
    */
    /*
    defineAsyncActionReducer __SIGNUP start
    */
    case __ASYNC_SIGNUP.pending: {
      let signupState = { ...state.signupState };
      let { cert , password } = payload;
      signupState.lastFailed = false;
      signupState.pending++;
      return {
        ...state,
        signupState,
        cert,
        password
      };
    }
    case __ASYNC_SIGNUP.resolved: {
      let { response } = payload;
      let signupState = { ...state.signupState };
      signupState.resolved++;
      signupState.pending--;
      return {
        ...state,
        signupState,
        signupStatus: response.status
      };
    }
    case __ASYNC_SIGNUP.rejected: {
      let { reason , detail } = payload;
      let signupState = { ...state.signupState };
      signupState.rejected++;
      signupState.pending--;
      signupState.lastFailed = true;
      signupState.failedReason = reason;
      signupState.failedDetail = detail;
      return {
        ...state,
        signupState
      };
    }
    /*
    defineAsyncActionReducer __SIGNUP end
    */
    /*
    defineAsyncActionReducer __LOGIN start
    */
    case __ASYNC_LOGIN.pending: {
      let loginState = { ...state.loginState };
      let { cert , password } = payload;
      loginState.lastFailed = false;
      loginState.pending++;
      return {
        ...state,
        loginState,
        cert,
        password
      };
    }
    case __ASYNC_LOGIN.resolved: {
      let { response: { token , userid , status } } = payload;
      let loginState = { ...state.loginState };
      loginState.resolved++;
      loginState.pending--;
      return {
        ...state,
        loginState,
        //token,
        userid,
        loginStatus: status
      }
    }
    case __ASYNC_LOGIN.rejected: {
      let { reason , detail } = payload;
      let loginState = { ...state.loginState };
      loginState.rejected++;
      loginState.pending--;
      loginState.lastFailed = true;
      loginState.failedReason = reason;
      loginState.failedDetail = detail;
      return {
        ...state,
        loginState
      };
    }
    /*
    defineAsyncActionReducer __LOGIN end
    */

    /*
    defineAsyncActionReducer __LOGOUT start
    */
    case __ASYNC_LOGOUT.pending: {
      let logoutState = { ...state.logoutState };
      logoutState.lastFailed = false;
      logoutState.pending++;
      return {
        ...state,
        logoutState
      };
    }
    case __ASYNC_LOGOUT.resolved: {
      let { response } = payload;
      let logoutState = { ...state.logoutState };
      logoutState.resolved++;
      logoutState.pending--;
      return {
        ...state,
        logoutState,
        loginStatus: -1,
        token: "",
        userid: "",
        password: state.rememberPassword ? state.password : ""
      };
    }
    case __ASYNC_LOGOUT.rejected: {
      let { reason , detail } = payload;
      let logoutState = { ...state.logoutState };
      logoutState.rejected++;
      logoutState.pending--;
      logoutState.lastFailed = true;
      logoutState.failedReason = reason;
      logoutState.failedDetail = detail;
      return {
        ...state,
        logoutState
      };
    }
    /*
    defineAsyncActionReducer __LOGOUT end
    */

    default:
      return state;
  }
}
