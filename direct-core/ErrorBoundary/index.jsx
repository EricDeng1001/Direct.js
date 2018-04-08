import React from "react";

class ErrorBoundary extends React.Component {
  static defaultProps = {
    handler: () => null
  }
  state = { hasError: false }

  componentDidCatch( error, info ){
    const { handler , showErrorMessage } = this.props;
    showErrorMessage ?
    this.setState({ hasError: true , error , info })
    :this.setState({ hasError: true });
    handler( error, info );
  }

  render() {
    const { children , showErrorMessage } = this.props;
    const { error , info , hasError } = this.state;
    if ( hasError ){
      return (
        <React.Fragment>
          <h1>Something went wrong.</h1>
          {
            showErrorMessage ? (
              <div>
                <h2>error:</h2>
                <p>{error}</p>
                <h2>info:</h2>
                <p>{info}</p>
              </div>
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
