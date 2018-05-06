var config;

if( process.env.NODE_ENV === "development" ){
  config = {
    middleWares: [],
    enhancers: []
  };
} else {
  config = {
    middleWares: [],
    enhancers: []
  };
}

export default config;
