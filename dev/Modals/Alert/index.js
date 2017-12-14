import React from 'react';
import Button from 'UI/Button';
import style from 'style';
import { actions as modalActions } from 'App/ModalManager';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeAlert } from 'App/ModalManager/actions';

import Alert from 'layout';

export default connect(
  () => ({}),
  ( dispatch ) => bindActionCreators( modalActions , dispatch )
)( class extends React.Component {
  constructor( props ){
    super( props );
  }
  render(){
    const { position , closeAlert } = this.props;
    return (
      <div style={{
          position: 'absolute',
          left: position.x,
          top: position.y
        }}
      >
        <div className={style.alert}>
          <div className={style.header}>
            <Button
              className={style.cancel}
              onClick={closeAlert}
              text="X"
            />
          </div>
          <Alert {...this.props} />
        </div>
      </div>
    );
  }
});
