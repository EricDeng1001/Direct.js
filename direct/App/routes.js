import React from "react";

import { Route , Switch , Redirect } from "react-router-dom";

import routesConfig from "Config/routes";

import ErrorBoundary from "direct-core/ErrorBoundary";

const paths = Object.keys( routesConfig );

const theRoutes = paths.map( path => {
  let tmp = routesConfig[path];
  if( tmp.redirect ){
    return (
      <Redirect
        key={tmp.from + tmp.to}
        from={path}
        to={tmp.redirect}
        exact={tmp.exact}
      />
    );
  } else {
    return (
      <Route
        key={path}
        path={path}
        exact={!tmp.nested}
        component={tmp.page}
      />
    );
  }
});

class Routes extends React.PureComponent {
  render() {
    return (
      <ErrorBoundary>
        <Switch location={this.props.location}>
          {theRoutes}
        </Switch>
      </ErrorBoundary>
    );
  }
}

export default Routes;
