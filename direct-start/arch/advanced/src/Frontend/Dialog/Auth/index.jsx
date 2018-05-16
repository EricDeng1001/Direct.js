import React from "react";

import Dialog from "material-ui/Dialog";
import Auth from "Components/Auth";

class AuthDialog extends React.PureComponent {
  state = {
    open: false
  }

  constructor( props ){
    super( props );
    props.toggler( this.toggle );
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  toggle = ( open ) => {
    this.setState( ( prevState ) => {
      return {
        open: !prevState.open
      }
    });
  }

  render(){
    return (
      <Dialog
        open={this.state.open}
        onRequestClose={this.handleClose}
        contentClassName="flexCenter"
      >
        <Auth
          onCancel={this.handleClose}
        />
      </Dialog>
    );
  }
};

export default AuthDialog;
