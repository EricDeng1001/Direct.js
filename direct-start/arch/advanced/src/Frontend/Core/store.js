import logger from "redux-logger";
import thunk from "redux-thunk";
import fetch from "redux-fetch-thunk";

var config;

if( process.env.NODE_ENV === "development" ){
  config = {
    middleWares: [
      logger,
      fetch,
      thunk
    ],
    enhancers: []
  };
} else {
  config = {
    middleWares: [
      fetch,
      thunk
    ],
    enhancers: []
  };
}

export default config;
