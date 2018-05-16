//@flow

import React from "react";

import Input from "UI/TextInputCore";

import style from "./style";

type Props = {
  label: string,
  placeholder: string,
  id: number,
  onData?: ( string ) => any
};

class ExpandingTextInput extends Input<Props,any> {
  static defaultProps = {
    ...Input.defaultProps,
    validPrompt: "Valid",
    invalidPrompt: "Invalid",
    label: "text",
    autoComplete: "off",
    disabled: false,
    spellCheck: false,
    endOnBlur: false
  }

  render(){
    const { onChange, onKeyDown, onBlur, extractCoreProps } = this;
    const { value, valid } = this.state;
    const {
      rootClass,
      validPrompt,
      invalidPrompt,
      label,
      disabled,
      id,
      ...others
    } = extractCoreProps( this.props );

    return (
      <div className={`${style.container} ${rootClass}`}>
        <input
          className={`${style.input} ${disabled ? style.disabled : style.enabled}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          id={id}
          {...others}
        />
        <label htmlFor={id}>{label}</label>
        {
          disabled ?
            null
          : valid === true ?
              <div className={style.validTooltip}>
                {validPrompt}
              </div>
            : valid === false ?
                <div className={style.invalidTooltip}>
                  {invalidPrompt}
                </div>
              : null
        }
      </div>
    )
  }
};

export default ExpandingTextInput;
