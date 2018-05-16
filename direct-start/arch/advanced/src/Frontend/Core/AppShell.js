import React from "react";

import LinkList from "UI/LinkList";
import Drawer from "PureUI/Drawer";
import AppBar from "StateOnlyUI/AppBar";

import FontAwesomeIcon from "FontAwesomeIcon";
import iconNavigator from "faIcons/faSpaceShuttle";

const primaryList = [];

const othersList = [];

class AppShell extends React.Component {
  state = {
    open: false
  }

  close = () => {
    this.setState({
      open: false
    });
  }

  openShell = () => {
    this.setState({
      open: true
    });
  }

  render(){
    const { open, backgroundColor } = this.state;
    return (
      <div id="AppShell">
        <FontAwesomeIcon
          id="AppShellHandler"
          onClick={this.openShell}
          icon={iconNavigator}
        />
        <Drawer
          docked={false}
          open={open}
          onRequestChange={this.close}
        >
          <AppBar
            title="Navigator"
            showMenuIconButton={false}
          />
          <LinkList
            title="primary"
            list={primaryList}
            onClick={this.close}
          />
          <LinkList
            title="others"
            list={othersList}
            onClick={this.close}
          />
        </Drawer>
        {this.props.children}
      </div>
    );
  }
};

export default AppShell;
