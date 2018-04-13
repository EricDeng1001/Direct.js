import React from 'react';
import { connect } from 'react-redux';
import Button from '../UI/Button';
import Info from "../UI/Info";

import { closeAlert } from '../WindowManager/actions';

import style from 'style';

export default connect(
  state => ({
    text: state.WindowManager.alert
  }),
  dispatch => ({
    closeAlert: () => dispatch( closeAlert() )
  })
)( class extends React.PureComponent {
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
