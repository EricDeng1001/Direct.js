import React from 'react';

import { Route , withRouter , Switch } from 'react-router-dom';

import RoutesConfig from 'Config/routes';

const paths = Object.keys( RoutesConfig );

const routesVDOMDescriptor = ( props ) => (
  <Switch location={props.location}>
    {
      paths.map( path => (
        <Route
          key={path}
          path={path}
          exact={RoutesConfig[path].exact}
          component={RoutesConfig[path].page}
        />
      ))
    }
  </Switch>
);

class Routes extends React.Component {
  render() {
    return routesVDOMDescriptor( this.props );
  }
}

export default Routes;
