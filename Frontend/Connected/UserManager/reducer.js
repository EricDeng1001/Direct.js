import {
  __ASYNC_LOGIN
} from 'actionTypes';

export default ( state = {
    loginState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network", // "json" , "server"
      failedDetail: null
    },
    apiKey: '',
    token: '',
    rememberPassword: false,
    userid: "",
    password: "",
    nickname: "",
    authorized: -1
} , { type , payload , id } ) => {

  switch( type ){
    /*
    defineAsyncActionReducer __LOGIN start
    */
    case __ASYNC_LOGIN.pending: {
      let loginState = { ...state.loginState };
      let { userid , password } = payload;
      loginState.lastFailed = false;
      loginState.pending++;
      return {
        ...state,
        loginState,
        userid,
        password
      };
    }
    case __ASYNC_LOGIN.resolved: {
      let { response } = payload;
      let loginState = { ...state.loginState };
      loginState.resolved++;
      loginState.pending--;
      return {
        ...state,
        loginState,
        apiKey: response.apiKey,
        nickname: response.nickname,
        authorized: response.status
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
    default:
      return state;
  }
}
