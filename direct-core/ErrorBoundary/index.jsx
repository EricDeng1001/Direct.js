import React from "react";

class ErrorBoundary extends React.PureComponent {
  static defaultProps = {
    errorHandler: () => null
  }
  state = { hasError: false }

  componentDidCatch( error , info ){
    const { errorHandler , showErrorMessage , customMessage } = this.props;
    showErrorMessage ?
    this.setState({ hasError: true , error , info })
    :this.setState({ hasError: true });
    errorHandler( error , info );
  }

  render() {
    const { children , showErrorMessage , customMessage } = this.props;
    const { error , info , hasError } = this.state;
    if ( hasError ){
      return (
        <React.Fragment>
          {
            showErrorMessage ? (
              customMessage ? (
                <div>{customMessage}</div>
              ):(
                <div>
                  <h1>Something went wrong.</h1>
                  <h2>error:</h2>
                  <p>{error.name}:</p>
                  <p>{error.message}</p>
                  <h2>info:</h2>
                  <pre>{info.componentStack}</pre>
                </div>
              )
            )
            : null
          }
        </React.Fragment>
      );
    }
    return children;
  }
};

export default ErrorBoundary;
