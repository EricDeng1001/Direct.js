export default {
  onAppWillMount( socket ){
    socket.on( "connected" , date => {
      console.log( "connected to server at" + date );
    });
  },
  onAppWillClose( resolved , state , persistentState ){
    if( !state.UserManager.keepLogin ){
      persistentState.UserManager.apiKey = false;
      persistentState.UserManager.loginStatus = false;
      fetch( "/logout" , {
        headers: {
          'Content-Type': 'application/json',
          userid: state.UserManager.userid,
          apiKey: state.UserManager.apiKey
        },
        method: 'POST'
      });
    }
    else {
      persistentState.UserManager.apiKey = true;
      persistentState.UserManager.loginStatus = true;
    }
    if( !state.UserManager.rememberPassword ){
      persistentState.UserManager.password = false;
      persistentState.UserManager.userid = false;
    }
    else {
      persistentState.UserManager.password = true;
      persistentState.UserManager.userid = true;
    }
    resolved();
  }
};
