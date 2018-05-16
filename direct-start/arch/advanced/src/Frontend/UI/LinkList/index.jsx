import React from "react";

import { withRouter } from "react-router-dom";
import Subheader from "material-ui/Subheader";
import { Menu, MenuItem } from "material-ui/Menu";

import style from "./style";

class LinkList extends React.PureComponent {
  navigators = {}

  goTo = location => {
    if( !this.navigators[location] ){
      this.navigators[location] = () => {
        const { history, onClick } = this.props;
        if( onClick ){
          onClick();
        }
        history.push( location );
      }
    }
    return this.navigators[location];
  }

  render(){
    const {
      list,
      title,
      rootClass
    } = this.props;
    return (
      <div className={`${style.container} ${rootClass}`}>
        <Subheader>{title}</Subheader>
        <Menu>
          {
            list.map( l => (
              <MenuItem
                key={l.name + l.href}
                onClick={this.goTo( l.href )}
                primaryText={l.name}
              />
            ))
          }
        </Menu>
      </div>
    );
  }
};

export default withRouter( LinkList );
