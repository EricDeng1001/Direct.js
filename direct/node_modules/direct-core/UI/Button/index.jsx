import React from "react";

type Props = {
  className?: string,
  text: string,
  onClick: () => any
};

class MyButton extends React.PureComponent<Props> {
  constructor( props ){
    super( props );
  }

  render(){
      const { className , text , children , onClick } = this.props;
      return (
        <div
          className={className || "btn btn-primary"}
          onClick={onClick}
        >
          {text || children}
        </div>
      );
  }
};

export default MyButton;
