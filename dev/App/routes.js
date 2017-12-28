import React from 'react';
import { Route , withRouter , Switch} from 'react-router-dom';
import asyncLoad from 'HOC/asyncLoad';

import Index from 'Page/Index';

const NotFound = asyncLoad( () => import('Page/NotFound') );
const UITest = asyncLoad( () => import('Page/UITest') );
const Learning = asyncLoad( () => import('Page/Learning') );

class Routes extends React.Component {
  render() {
    return (
      <Switch location={this.props.location}>
        <Route exact path="/" component={Index} />
        <Route path="/learning" component={Learning} />
        <Route exact path="/ui" component={UITest} />
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
