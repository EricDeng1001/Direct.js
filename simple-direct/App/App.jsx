import React from "react";
import { BrowserRouter } from "react-router-dom";

import {
  onUIErrorShowErrorMessage,
  UIErrorHandler,
  UIErrorMessage
} from "Core/App";

import AnimatedPages from "./AnimatedPages";
import "Styles/global.less";


const ModifiedApp = modifyApp( ( props ) => (
  <AnimatedPages {..props} />
));

class App extends React.Component {
  state = { hasError: false }

  componentDidCatch( error, info ){
    onUIErrorShowErrorMessage ?
    this.setState({ hasError: true, error, info })
    :this.setState({ hasError: true });
    UIErrorHandler( error, info );
  }

  render(){
    const { error, info, hasError } = this.state;
    if( hasError ){
      return (
        <React.Fragment>
          {
            onUIErrorShowErrorMessage ? (
              UIErrorMessage ? (
                UIErrorMessage
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
    return (
      <BrowserRouter>
        <ModifiedApp />
      </BrowserRouter>
    );
  }

};

export default App;
