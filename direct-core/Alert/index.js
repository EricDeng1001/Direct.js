import React from 'react';
import { connect } from 'react-redux';
import Button from 'direct-core/UI/Button';
import Info from "direct-core/UI/Info";

import { closeAlert } from 'direct-core/WindowManager/actions';

import style from 'style';

export default connect(
  state => ({
    text: state.WindowManager.alert
  }),
  dispatch => ({
    closeAlert: () => dispatch( closeAlert() )
  })
)( class extends React.Component {
  render(){
    const { closeAlert , text } = this.props;
    return (
      <div className={style.alert}>
        <div className={style.leftBanner} >
        </div>
        <div className={style.content}>
          <div className={style.contentTop}>Warning!</div>
          <div className={style.message}>
            <Info info={text}/>
          </div>
        </div>
        <Button
          className={style.cancel}
          onClick={closeAlert}
          text="X"
        />
      </div>
    );
  }
});
