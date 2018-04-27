
import React from "react";

import Loading from "../Animation/Loading";

var download = 0;

type DynamicImport = () => ContravariantOf<React.Component> | ContravariantOf<React.PureComponent>;

type ErrorHandler = ( ContravariantOf<Error> ) => any;

export default ( importComponent: DynamicImport, errorHandler?: ErrorHandler, timeout?: number ) => {

  setTimeout(
    importComponent,
    timeout || 2000 + 2000 * download++
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
        this.setState({
          component
        });
      } catch( e ){
        if( errorHandler ){
          errorHandler( e );
        } else {
          console.log("An error happened during asyncLoad, add an errorHandler as the second param to handle this error:");
          console.log( e );
        }
      }
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
