import React from "react";

import Auth from "Components/Auth";

import style from "./style";

class AuthPage extends React.PureComponent {

  render(){
    return (
      <div className={style.container}>
        <Auth
          onSuccess={this.props.history.goBack}
          onCancel={this.props.history.goBack}
        />
      </div>
    );
  }
};

export default AuthPage;
