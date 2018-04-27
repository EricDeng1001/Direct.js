module.exports = {
    https: true,
    port: 443,
    redirectToHttps: true,
    caFile: undefined,
    keyFile: undefined,
    certFile: undefined,
    session: {
      secret: "lalalalala",
      resave: false,
      saveUninitialized: false,
      store: undefined,
      unset: "destroy",
      cookie: {
        maxAge: undefined,
        //path: "/",
        sameSite: true,
        httpOnly: true,
        secure: true
      }
    },
    middleWares: [],
    errorHandlers: [],
    socketMiddleWares: []
};
