import { createStore, applyMiddleware, compose } from "redux";

import storeConfig from "Core/store";

import initState from "./initState";

import reducer from "./reducer";

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
