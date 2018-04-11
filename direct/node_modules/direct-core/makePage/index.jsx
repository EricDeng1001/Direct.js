import React from 'react';

import * as actions from '../WindowManager/actions';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import animationTime from "../animationTime.js";

const ableToOperateWindow = connect(
  undefined,
  dispatch => bindActionCreators( actions , dispatch )
);

export default Comp => ableToOperateWindow( class extends React.PureComponent {
  constructor( props ){
    super( props );
    this.state = {
      ined: false
    };
    setTimeout(
      () => this.setState({
        ined: true
      }),
      animationTime.value
    );
  }
  render(){
    return (
      <Comp
        {...this.props} // include history , onAppWillClose , alert , openWindow ...
        ined={this.state.ined}
      />
    );
  }
});
