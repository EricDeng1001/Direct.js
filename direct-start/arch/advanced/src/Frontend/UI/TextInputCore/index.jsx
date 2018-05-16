//@flow

import React from "react";

type Props = {
  maxHistoryLength: number,
  init: string,
  each: boolean,
  keep: boolean,
  eachCheck: boolean,
  finalCheck: boolean,
  raw: boolean,
  endOnBlur: boolean,
  test: string => boolean,
  isEnd: string => boolean,
  replace: string => string,
  onData: string => any
};

type State = {
  value: string,
  valid: boolean
};

class Input extends React.Component<Props,State> {
  static defaultProps = {
    maxHistoryLength: 10,
    init: "",
    each: false,
    keep: false,
    eachCheck: false,
    finalCheck: false,
    raw: false,
    endOnBlur: false,
    isEnd: () => false,
    test: ( value ) => value.trim(),
    replace: a => a,
    onData: () => undefined
  }

  extractCoreProps = ( props ) => {
    const {
      maxHistoryLength,
      init,
      each,
      keep,
      eachCheck,
      finalCheck,
      raw,
      endOnBlur,
      isEnd,
      test,
      replace,
      onData,
      ...others
    } = props;
    return others;
  }

  history = []
  cursor = 0
  state = {
    value: "",
    valid: undefined
  }

  componentDidMount(){
    const { init } = this.props;
    if( init ){
      this.onChange({
        target: { value: init }
      });
      this.onInputEnd( init, undefined );
    }
  }

  componentDidUpdate(){
    if( this.checkKey ){
      this.checkKey = false;
      var { value, valid } = this.state;
      if( this.props.isEnd( this.lastKeyCode, value ) ){
        this.onInputEnd( value, valid );
      }
    }
  }

  onChange = ({ target: { value } }) => {
    const { each, onData ,eachCheck, test, raw, replace } = this.props;

    var valid = test( value );

    if( each ){ // in each mode, even invaid input will be sent back
      if( raw ){
        onData( value, valid );
      } else {
        onData( replace( value ), valid ); // just replace the data
      }
    }

    if( !eachCheck ){
      valid = undefined;
    }

    this.setState({
      value,
      valid
    });
  }

  onKeyDown = ev => {
    switch( ev.keyCode ){
      case 13: {
        var { value, valid } = this.state;
        this.onInputEnd( value, valid );
        break;
      }
      case 38: {
        this.cursor++;
        if( this.cursor > this.history.length ){
          this.cursor = this.history.length;
        }
        this.restoreHistroy( this.cursor );
        return ev.preventDefault();
      }
      case 40: {
        this.cursor--;
        if( this.cursor < 0 ){
          this.cursor = 0;
        }
        this.restoreHistroy( this.cursor );
        return ev.preventDefault();
      }
      default: {
        this.checkKey = true;
        this.lastKeyCode = ev.keyCode;
      }
    }
  }

  onBlur = () => {
    const { value, valid } = this.state;
    if( !value ){
      return;
    }
    if( this.props.endOnBlur ){
      this.onInputEnd( value, valid );
    }
  }

  setHistory( data ){
    this.history.push( data );
    if( this.history.length > this.props.maxHistoryLength ){
      this.history.shift();
    }
  }

  restoreHistroy( cursor ){
    const { history } = this;
    const value = history[history.length - cursor] || this.state.value;
    this.setState({
      value
    });
  }

  onInputEnd = ( value, valid ) => { // this always comes after getInput
    const { onData, keep, each, finalCheck, test, replace, raw } = this.props;
    var dataValid = valid;

    if( !dataValid ){ // not checked before
      dataValid = test( value );
    }

    if( dataValid ){

      if( !raw ){
        value = replace( value ); // replace the UI and the data
      }

      if( !each ){ // we should send the data now
        onData( value, true );
      }

      this.setHistory( value );
      this.cursor = 0;

      if( !keep ){
        value = ""; // update UI
      }
    }

    if( finalCheck ){
      valid = dataValid; // update UI
    }

    this.setState({
      valid,
      value
    });
  }


};

export default Input;
