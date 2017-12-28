import React from 'react';
import { Button } from 'react-bootstrap';
import style from 'style';

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
      const { className , text , onClick } = this.props;
      return (
        <Button
          bsStyle="primary"
          className={style.basic + ' ' + className}
          onClick={onClick}
        >
          {text}
        </Button>
      );
  }
};

export default MyButton;
