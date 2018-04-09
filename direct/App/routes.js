import React from "react";

import { Route , Switch , Redirect } from "react-router-dom";

import ErrorBoundary from "direct-core/ErrorBoundary";

var Routes;

async function loadConfig(){
  const routesConfigPromise = import("Config/routes");
  const AppConfigPromise = import("Config/App");
  const routesConfig = (await routesConfigPromise).default;
  const AppConfig = (await AppConfigPromise).default;
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

 Routes = class extends React.PureComponent {
    render() {
      return (
        <ErrorBoundary
          showErrorMessage={AppConfig.onUIErrorShowErrorMessage}
          errorHandler={AppConfig.UIErrorHandler}
        >
          <Switch location={this.props.location}>
            {theRoutes}
          </Switch>
        </ErrorBoundary>
      );
    }
  }
}

loadConfig();
export default Routes;
