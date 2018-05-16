const path = require("path");

const helmet = require("helmet");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const { __maxAge__ } = require("../../Constant/SystemCode");

module.exports = {
  https: true,
  port: 443,
  redirectToHttps: true,
  caFile: "",
  keyFile: "",
  certFile: "",
  session: {
    name: "nklasndli",
    secret: "Direct",
    resave: false, // if not change, not save
    saveUninitialized: false, // if never used, not save
    store: new RedisStore({
      ttl: __maxAge__
    }),
    unset: "destroy", // delete req.session.prop will clear the store prop
    cookie: {
      maxAge: __maxAge__,
      //path: "/",
      sameSite: true,
      httpOnly: true,
      secure: true // only https
    }
  },
  compression: {

  },
  middleWares: [
    helmet()
  ], // middleWares for all routes
  errorHandlers: [
    basicErrorHandler
  ],
  socketMiddleWares: []
};
