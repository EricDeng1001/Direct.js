import React from 'react';

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
        <Button
          className={`btn btn-primary ${className}`}
          onClick={onClick}
        >
          {text || children}
        </Button>
      );
  }
};

export default MyButton;
