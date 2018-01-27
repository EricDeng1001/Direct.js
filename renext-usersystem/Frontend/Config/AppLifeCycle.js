export default ( state , persistentState , socket ) => {
  const { UserManager } = state;
  persistentState.UserManager.rememberPassword = true;
  persistentState.UserManager.keepLogin = true;
  persistentState.UserManager.password = UserManager.keepLogin || UserManager.rememberPassword;
  persistentState.UserManager.loginStatus = UserManager.keepLogin && UserManager.loginStatus === 0;
  persistentState.UserManager.cert = UserManager.rememberPassword;
  //persistentState.UserManager.token = UserManager.keepLogin;
  persistentState.UserManager.userid = UserManager.keepLogin;
}
