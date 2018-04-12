import { createStore , applyMiddleware , compose } from "redux";

import initState from "initState";

import reducer from "reducer";

import storeConfig from "Config/store";

export default createStore(
  reducer,
  initState,
  compose(
    applyMiddleware(
      ...(storeConfig.middleWares || [] )
    ),
    ...(storeConfig.enhancers || [] )
  )
);
