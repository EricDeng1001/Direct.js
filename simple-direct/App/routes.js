import React from "react";

import { Route , Switch , Redirect } from "react-router-dom";

import routesConfig from "Core/routes";

import AppConfig from "Core/App";

const modifyApp = AppConfig.modifyApp || ( a => a );

const paths = Object.keys( routesConfig );

const theRoutes = paths.map( path => {
  let tmp = routesConfig[path];
  if( tmp.redirect ){
    return (
      <Redirect
        key={path + tmp.redirect}
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
        component={tmp.page || tmp}
      />
    );
  }
});

const ModifiedApp = modifyApp( ( props ) => (
  <Switch location={props.location}>
    {theRoutes}
  </Switch>
));

class Routes extends React.PureComponent {
  render() {
    return <ModifiedApp location={this.props.location} />;
  }
};

export default Routes;
