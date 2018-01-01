import React from 'react';
import { Route , withRouter , Switch } from 'react-router-dom';
import routesConfig from 'Config/routes';

const paths = Object.keys( routesConfig );
const routesVDOMDescriptor = ( props ) => (
  <Switch location={props.location}>
    {
      paths.map( path => (
        <Route key={path} path={path} exact={routesConfig[path].exact} component={routesConfig[path].page} />
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
