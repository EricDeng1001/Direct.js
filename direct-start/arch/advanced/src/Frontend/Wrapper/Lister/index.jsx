import React from "react";

import FontAwesomeIcon from "FontAwesomeIcon";
import iconMenu from "faIcons/faBars";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";

import style from "./style";

class Header extends React.PureComponent {
  state = {
    showMenu: false
  }

  showMenu = () => {
    this.setState({
      showMenu: true
    });
  }

  hideMenu = () => {
    this.setState({
      showMenu: false
    });
  }

  getIcon = ref => this.icon = ref

  render(){
    const {
      children,
      containerClassName,
      listClassName,
      itemClassName
    } = this.props;
    return (
      <div className={`${style.container} ${containerClassName}`}>
        <div
          ref={this.getIcon}
          className={style.icon}
        >
          <FontAwesomeIcon
            icon={iconMenu}
            onClick={this.showMenu}
            size="2x"
          />
        </div>
        <Popover
          open={this.state.showMenu}
          anchorEl={this.icon}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.hideMenu}
        >
          <Menu>
          {
            React.Children.map( children, child => (
              <MenuItem
                className={`${style.item} ${itemClassName}`}
                onClick={this.hideMenu}
              >
                {child}
              </MenuItem>
            ))
          }
          </Menu>
        </Popover>
        <div className={`${style.lister} ${listClassName}`}>
          {
            React.Children.map( children, child => (
              <div className={`${style.item} ${itemClassName}`}>
                {child}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
};

export default Header;
