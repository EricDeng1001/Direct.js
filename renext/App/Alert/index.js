import React from 'react';
import { connect } from 'react-redux';
import Button from 'renext-core/UI/Button';
import Info from "renext-core/UI/Info";

import { closeAlert } from 'renext-core/WindowManager/actions';

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
          <img src="/static/pics/hot.png"/>
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