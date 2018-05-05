import React from "react";

var download = 0;

export default ( importComponent, errorHandler, timeout, Loading = null ) => {

  setTimeout(
    importComponent,
    timeout || 2000 + 1000 * download++
  );

  return class extends React.PureComponent {
    constructor( props ) {
      super( props );
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      this.mounted = true;
      try {
        const { default: component } = await importComponent();
        if( this.mounted ){
          this.setState({
            component
          });
        }
      } catch( e ){
        if( errorHandler ){
          errorHandler( e );
        } else {
          console.log("An error happened during asyncLoad, add an errorHandler as the second param to handle this error:");
          console.log( e );
        }
      }
    }

    componentWillUnmount(){
      this.mounted = false;
    }

    render() {
      const C = this.state.component;
      return ( C ?
        <C {...this.props} />
        : Loading
      );
    }
  };
}
