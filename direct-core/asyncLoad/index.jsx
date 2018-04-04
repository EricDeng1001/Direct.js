// @flow
import React from 'react';

import Loading from '../Animation/Loading';

var download = 0;

type dynamicImport = () => ContravariantOf<React.Component>;

export default ( importComponent: dynamicImport ) => {

  setTimeout(
    importComponent,
    1000 + 1000 * download++
    // this will lead the client to download every following pages in every 1 second
  );

  return class extends React.Component {
    constructor( props ) {
      super( props );
      this.state = {
        component: null
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
      return ( C ?
        <C {...this.props} />
        :<Loading
          center
          loading
        />
      );
    }
  };
}
