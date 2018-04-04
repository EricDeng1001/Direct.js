import React from "react";

class Block extends React.Component {
  render(){
    const { width , height , children } = this.props;
    return (
      <div style={{ width , height }}>
        {children}
      </div>
    );
  }
};

export default Block;
