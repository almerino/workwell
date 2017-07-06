import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import SideList from "../SideList/SideList";
import Search from "../Search/Search";
import "./SideBar.css";

import Geosuggest from "react-geosuggest";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Paper className="menu">
          <IconButton
            color="accent"
            aria-label="Menu"
            onClick={this.handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Geosuggest types={["(cities)"]} placeholder="Paris, New York ..." />
        </Paper>
        <Drawer
          open={this.state.open}
          onRequestClose={this.handleClose}
          onClick={this.handleClose}
        >
          <SideList />
        </Drawer>
      </div>
    );
  }
}

export default SideBar;
