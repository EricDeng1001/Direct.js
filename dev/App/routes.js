import React from 'react';
import Index from 'Pages/Index';
import { Link, Route, Switch } from 'react-router-dom';

function asyncComponent( importComponent ) {
  class AsyncComponent extends React.Component {
    constructor( props ) {
      super( props );
      this.state = {
        component: null,
      };
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component
      });
    }
    render() {
      const C = this.state.component;
      return C
        ? <C {...this.props} />
        : null;
    }
  }
  return AsyncComponent;
}

const NotFound = asyncComponent( () => import('Pages/NotFound') );
const testSpeed = asyncComponent( () => import('Pages/testSpeed') );
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/nest" component={Index}/>
        <Route exact path="/test" component={testSpeed}/>
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
