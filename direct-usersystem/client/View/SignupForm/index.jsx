// @flow

import React from "react";

import FontAwesomeIcon from "FontAwesomeIcon";
import iconCheck from "faIcons/faCheck";
import iconTimes from "faIcons/faTimes";
import iconInfoCircle from "faIcons/faInfoCircle";
import StateOnlyExpandingTextInput from "StateOnlyUI/ExpandingTextInput";
import ExpandingTextInput from "PureUI/ExpandingTextInput";

import RaisedButton from "material-ui/RaisedButton";

import { __testCertification__, __testPassword__ } from "Constant/Regex";

import style from "./style";

type PropType = {
  onConfirm: ( string, string ) => any,
  userExist: boolean,
  initPassword: stirng,
  initCertification: stirng
};

const invalidPasswordPrompt = (
  <div className={style.wrongForm}>
    <FontAwesomeIcon icon={iconTimes} />&nbsp;
    <span>格式错误</span>
    <div>
      <ul>
        <li>至少包含两个大写字母或者@,!,*</li>
        <li>没有其它特殊符号</li>
      </ul>
    </div>
  </div>
);

const invalidCertficationPrompt = (
  <div className={style.wrongForm}>
    <FontAwesomeIcon icon={iconTimes} />&nbsp;
    <span>格式错误</span>
    <div>
      <ul>
        <li>长度大于 8 且 小于 12 </li>
        <li>没有特殊符号</li>
      </ul>
    </div>
  </div>
);

const notMatchPrompt = (
  <div className={style.matchForm}>
    <FontAwesomeIcon icon={iconTimes} />
    <span>不匹配</span>
  </div>
);

const validPrompt = <FontAwesomeIcon icon={iconCheck} />;

const matchPrompt = (
  <div className={style.matchForm}>
    <span>匹配</span>
    <FontAwesomeIcon icon={iconCheck} />
  </div>
);

const Exist = (
  <span><FontAwesomeIcon icon={iconInfoCircle}/> 用户已存在</span>
);

class SignupForm extends React.PureComponent<PropType,any> {

  state = {
    certification: "",
    certificationValid: undefined,
    password: "",
    passwordValid: undefined,
    passwordConfirm: "",
    userExist: false
  }

  getCertification = ( certification, certificationValid ) => {
    this.setState({
      certification,
      certificationValid
    });
  }

  allConfirmed = ( passwordConfirm ) => {
    const { certification, password } = this.state;
    if( passwordConfirm !== password ){
      return;
    }
    this.props.onConfirm( certification, password );
  }

  getPassword = ( password, passwordValid ) => {
    this.setState({
      password,
      passwordValid
    });
  }

  onConfirm = ev => {
    const { certification, password, certificationValid, passwordValid } = this.state;
    if( certificationValid, passwordValid ){
      this.props.onConfirm( certification, password );
    }
    return ev.preventDefault();
  }

  render() {
    const {
      userExist,
      initPassword,
      initCertification
    } = this.props;
    const {
      certificationValid,
      passwordValid,
      password
    } = this.state;
    return (
      <form
        onSubmit={this.onConfirm}
        className={style.container}
      >
        <StateOnlyExpandingTextInput
          endOnBlur
          onData={this.getCertification}
          keep
          finalCheck
          test={__testCertification__}
          id="signupFormCertification"
          label={userExist ? Exist : "注册证书"}
          init={initCertification}
          placeholder="your certification"
          rootClass={style.certInput}
          validPrompt={validPrompt}
          invalidPrompt={invalidCertficationPrompt}
        />
        <StateOnlyExpandingTextInput
          each
          onData={this.getPassword}
          keep
          maxHistoryLength={0}
          eachCheck
          test={__testPassword__}
          validPrompt={validPrompt}
          invalidPrompt={invalidPasswordPrompt}
          id="signupFormPassword"
          type="password"
          label="密码"
          init={initPassword}
          placeholder="your password"
          rootClass={style.passwordInput}
        />
        <ExpandingTextInput
          onData={this.allConfirmed}
          keep
          maxHistoryLength={0}
          finalCheck
          isEnd={( key, value ) => value.length === password.length}
          test={text => text === password}
          validPrompt={matchPrompt}
          invalidPrompt={notMatchPrompt}
          id="signupFormPasswordConfirm"
          type="password"
          label="重复以确认"
          placeholder="retype to confirm your password"
          rootClass={style.passwordConfirmInput}
          disabled={!(passwordValid && certificationValid)}
        />
      </form>
    );
  }
};


export default SignupForm;
