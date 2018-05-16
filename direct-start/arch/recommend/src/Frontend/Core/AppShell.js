import React from "react";

import LinkList from "UI/LinkList";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";

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
        <div
          id="AppShellHandler"
          onClick={this.openShell}
        >
          open shell
        </div>
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
          <footer id="directjs">
            <a href="https://github.com/GitAntinus/direct.js">
              Powered by direct.js
            </a>
          </footer>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
};

export default AppShell;
