import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StateOnlyRaisedButton from "StateOnlyUI/RaisedButton";
import PureRaisedButton from "PureUI/RaisedButton";
import makeAnimation from "lib/makeAnimation";
import asyncProcessControl from "lib/asyncProcessControl";
import applyHOCs from "lib/applyHOCs";

import Switcher from "Wrapper/Switcher";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import {
  __userExist__,
  __userNotExist__,
  __passwordWrong__,
  __authenticateThrottling__
} from "Constant/SystemCode";

import Loading from "Animation/Loading";

import * as actionsCreators from "Connected/Auth/actions";

import animation from "./animation";
import style from "./style";

const SlideLR = makeAnimation( animation, 650 );

class Auth extends React.PureComponent {
  static defaultProps = {
    onSuccess(){},
    onCancel(){},
    rootClass: ""
  }

  state = {
    show: 0
  }
  prompt = ["注册", "登录"];

  switch = () => {
    this.setState( prevState => {
      if( prevState.show === 1 ){
        return {
          show: 0
        };
      } else {
        return {
          show: 1
        };
      }
    });
  }

  render(){
    const {
      authenticated,
      authenticating,
      certification,
      password,
      reason,
      getAuth,
      createAuth,
      edit,
      logout,
      rootClass,
      onCancel
    } = this.props;
    const { show } = this.state;
    const reasonCode = parseInt( reason );
    if( authenticated ){
      return (
        <div className={`${style.container} ${rootClass}`}>
          <h1>你现在的认证是:</h1>
          <h3>{certification}</h3>
          <PureRaisedButton
            className={style.button}
            onClick={logout}
            secondary
            label="注销"
          />
          <PureRaisedButton
            className={style.button}
            onClick={edit}
            primary
            label="编辑账户"
          />
        </div>
      )
    }
    if( authenticating ){
      return (
        <div className={`${style.container} ${rootClass}`}>
          <Loading
            loading
            center
          />
        </div>
      );
    }
    return (
      <div className={`${style.container} ${rootClass}`}>
        {
          reasonCode === __authenticateThrottling__ ?
          <div className={style.throttlingWarn}>
            该账号登陆过于频繁，可能存在安全问题
          </div>
          : null
        }
        <h2>{this.prompt[show === 1 ? 0 : 1]}</h2>
          <Switcher
            rootClass={style.form}
            show={show}
            Animation={SlideLR}
          >
            <LoginForm
              userNotExist={reasonCode ===  __userNotExist__}
              passwordWrong={reasonCode === __passwordWrong__}
              onConfirm={getAuth}
              initCertification={certification}
              initPassword={password}
            />
            <SignupForm
              userExist={reasonCode === __userExist__}
              onConfirm={createAuth}
              initCertification={certification}
              initPassword={password}
            />
          </Switcher>
        <PureRaisedButton
          label={"去" + this.prompt[show] + " ->"}
          onClick={this.switch}
          className={style.button}
          primary
        />
        <StateOnlyRaisedButton
          label="取消"
          className={style.button}
          onClick={onCancel}
        />
      </div>
    );
  }
};

export default applyHOCs([
  asyncProcessControl({
    authenticated: {
      resolved: true,
      onResolved(){
        this.props.onSuccess();
      }
    }
  }),
  connect(
    state => ({
      authenticated: state.Auth.get("authenticated"),
      certification: state.Auth.get("certification"),
      password: state.Auth.get("password"),
      authenticating: state.Auth.get("authenticating"),
      reason: state.Auth.get("reason"),
    }),
    dispatch => bindActionCreators( actionsCreators, dispatch )
  )
], Auth );
