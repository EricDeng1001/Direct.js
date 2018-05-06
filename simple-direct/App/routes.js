import React from "react";

import { Route, Switch } from "react-router-dom";

import routesConfig from "Core/routes";

const paths = Object.keys( routesConfig );

const theRoutes = paths.map( path => {
  let tmp = routesConfig[path];
  if( tmp.redirect ){
    return undefined;
  } else {
    return (
      <Route
        key={path}
        path={path}
        exact={!tmp.nested}
        component={tmp.page || tmp}
      />
    );
  }
}).filter( x => x );

class Routes extends React.Component {
  render() {
    return (
      <Switch location={this.props.location}>
        {theRoutes}
      </Switch>
    );
  }
};

export default Routes;
