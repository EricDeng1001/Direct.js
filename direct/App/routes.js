import React from 'react';

import { Route , Switch } from 'react-router-dom';

import RoutesConfig from 'Config/routes';

const paths = Object.keys( RoutesConfig );

const TheRoutes = paths.map( path => (
    <Route
      key={path}
      path={path}
      exact={RoutesConfig[path].exact}
      component={RoutesConfig[path].page}
    />
))

class Routes extends React.Component {
  render() {
    return (
      <Switch location={this.props.location}>
      {TheRoutes}
      </Switch>
    );
  }
}

export default Routes;
