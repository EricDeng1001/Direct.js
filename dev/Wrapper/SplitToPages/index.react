/*
**   Antinux Innovation
**   Author: Eric Deng
*/
//@flow
import React from 'react';
import style from 'style';
import ButtonControlPane from 'UI/ButtonControlPane';

type Props = {
  children: Array
};

class SplitToPages extends React.PureComponent<Props> {
  static defaultProps = {
    capcity: 10
  }
  state = {
    page: 0
  };
  actions = [
    {
      text: 'pre',
      action: () => this.setState({
        page: Math.max( this.state.page - 1 , 0 )
      })
    },
    {
      text: 'next',
      action: () => this.setState({
        page: Math.min( this.state.page + 1 , Math.ceil( this.props.children.length / this.props.capcity ) - 1 )
      })
    }
  ]
  render(){
    const { children , capcity } = this.props;
    const { page } = this.state;
    var lastPage = false;
    var begin = page * capcity;
    var end;
    var actions;
    if( ( page + 1 ) * capcity > children.length ){
      lastPage = true;
      end  = children.length;
      actions = [this.actions[0]];
    }
    else {
      end  = begin + capcity;
      if( page === 0 ){
        actions = [this.actions[1]];
      }
      else {
        actions = this.actions;
      }
    }


    return (
      <div className="container">
      {
        children.slice( begin , end )
      }
      <ButtonControlPane
        additionalActions={actions}
      />
      </div>
    );
  }
};

export default SplitToPages;
