import React from "react";
import { connect } from "react-redux";

import { closeAlert } from "../WindowManager/actions";

import style from "./style";

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
            <div className={style.info}>
              {text}
            </div>
          </div>
        </div>
        <div
          className={style.cancel}
          onClick={closeAlert}
        >
          X
        </div>
      </div>
    );
  }
});
