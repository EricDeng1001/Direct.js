// @flow
import React from "react";

import Loading from "../Animation/Loading";

var download = 0;

type DynamicImport = () => ContravariantOf<React.Component> | ContravariantOf<React.PureComponent>;

type ErrorHandler = ( ContravariantOf<Error> ) => any;

export default ( importComponent: DynamicImport , errorHandler?: ErrorHandler ) => {

  setTimeout(
    importComponent,
    1000 + 1000 * download++
    // this will lead the client to download every following pages in every 1 second
  );

  return class extends React.PureComponent {
    constructor( props ) {
      super( props );
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      try {
        const { default: component } = await importComponent();
      } catch( e ){
        errorHandler( e );
      }
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
