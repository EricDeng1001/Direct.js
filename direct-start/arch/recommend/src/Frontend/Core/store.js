import thunk from "redux-thunk";

var config;

if( process.env.NODE_ENV === "development" ){
  config = {
    middleWares: [
      thunk
    ],
    enhancers: []
  };
} else {
  config = {
    middleWares: [
      thunk
    ],
    enhancers: []
  };
}

export default config;
