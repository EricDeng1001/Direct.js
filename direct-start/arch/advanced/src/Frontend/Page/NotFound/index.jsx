import React from "react";

import style from "./style";

class NotFoundPage extends React.PureComponent {
  render(){
    return (
      <div className={style.container}>
        404 Not Found
      </div>
    );
  }
};

export default NotFoundPage;
