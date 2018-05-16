// @flow

import React from "react";

import FontAwesomeIcon from "FontAwesomeIcon";
import iconCheck from "faIcons/faCheck";
import iconTimes from "faIcons/faTimes";
import iconInfoCircle from "faIcons/faInfoCircle";
import ExpandingTextInput from "StateOnlyUI/ExpandingTextInput";
import StateOnlyRaisedButton from "StateOnlyUI/RaisedButton";

import style from "./style";

import { __testCertification__, __testPassword__ } from "Constant/Regex";

type PropType = {
  onConfirm: ( string, string ) => any,
  userNotExist: boolean,
  passwordWrong: boolean,
  initPassword: string,
  initCertification: string
};

const invalidCertficationPrompt = (
  <div className={style.wrongForm}>
    <FontAwesomeIcon icon={iconTimes} />&nbsp;
    <span>不合法</span>
    <div>这不可能是一个正确的证书</div>
  </div>
);

const invalidPasswordPrompt = (
  <div className={style.wrongForm}>
    <FontAwesomeIcon icon={iconTimes} />&nbsp;
    <span>不合法</span>
    <div>这不可能是一个正确的密码</div>
  </div>
);

const validPrompt = <FontAwesomeIcon icon={iconCheck} />;

const NotExist = (
  <span><FontAwesomeIcon icon={iconInfoCircle} /> 用户不存在</span>
);

const Wrong = (
  <span><FontAwesomeIcon icon={iconInfoCircle} /> 密码错误</span>
);

class LoginForm extends React.PureComponent<PropType,any> {

  state = {
    certification: "",
    certificationValid: undefined,
    password: "",
    passwordValid: undefined
  }

  getCertification = ( certification, certificationValid ) => {
    this.setState({
      certification,
      certificationValid
    });
  }

  getPassword = ( password, passwordValid ) => {
    this.setState({
      password,
      passwordValid
    });
  }

  onConfirm = ev => {
    const { certification, password, certificationValid, passwordValid } = this.state;
    if( certificationValid && passwordValid ){
      this.props.onConfirm( certification, password );
    }
    return ev.preventDefault();
  }

  render() {
    const {
      userNotExist,
      passwordWrong,
      initCertification,
      initPassword
    } = this.props;
    return (
      <form
        onSubmit={this.onConfirm}
        className={style.container}
      >
        <ExpandingTextInput
          endOnBlur
          onData={this.getCertification}
          keep
          finalCheck
          test={__testCertification__}
          validPrompt={validPrompt}
          invalidPrompt={invalidCertficationPrompt}
          rootClass={style.certInput}
          init={initCertification}
          id="LoginFormCertification"
          type="text"
          label={userNotExist ? NotExist : "证书"}
          placeholder="your certification"
        />
        <ExpandingTextInput
          eachCheck
          endOnBlur
          onData={this.getPassword}
          keep
          maxHistoryLength={0}
          finalCheck
          test={__testPassword__}
          validPrompt={validPrompt}
          invalidPrompt={invalidPasswordPrompt}
          rootClass={style.passwordInput}
          init={initPassword}
          id="LoginFormPassword"
          type="password"
          label={passwordWrong ? Wrong : "密码"}
          placeholder="your password"
        />
        <StateOnlyRaisedButton
          type="submit"
          onClick={this.onConfirm}
          className={style.confirmRaisedButton}
          label="Confirm"
          secondary
        />
      </form>
    );
  }
};


export default LoginForm;
