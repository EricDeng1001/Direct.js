import React from 'react';
import style from 'style';
import { withRouter } from 'react-router-dom';

class SidebarItem extends React.PureComponent {
  inVokeItem = ( event ) => {
    const { href , history , onClick , to } = this.props;
    if( onClick ){
      onClick( event );
    }
    else if( href ){
      history.push( herf );
    }
    else if( to ){
      history.push( to );
    }
  }

  render(){
    const { text } = this.props;
    return (
      <span
        className={style.item}
        onClick={this.inVokeItem}
      >
        {text}
      </span>
    );
  }
};

export default withRouter( SidebarItem );
