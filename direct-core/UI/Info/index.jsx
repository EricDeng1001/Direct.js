import React from 'react';
import style from 'style';

type Props = {
  info?: string
};

class Info extends React.PureComponent<Props> {
  constructor( props ){
    super( props );
  }

  render(){
    const { info } = this.props;
    if( !info || !info.trim() ){
      return null;
    }
    return (
      <div className={style.info}>
        {info}
      </div>
    );
  }
};

export default Info;
