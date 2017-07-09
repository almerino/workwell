import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AddLocationIcon from "material-ui-icons/AddLocation";
import SideList from "../SideList/SideList";
import Search from "../Search/Search";
import "./SideBar.css";

import Geosuggest from "react-geosuggest";

function renderSuggestItem(suggest) {
  return (
    <span className="geosuggest__suggested-item">
      <span>
        <IconButton color="accent" aria-label="Menu">
          <AddLocationIcon />
        </IconButton>
      </span>
      <span>
        {suggest.label}
      </span>
    </span>
  );
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, cities: [] };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  onSuggestSelect(suggest) {
    console.log(suggest);
    if (!this.state.cities.some(city => city.placeId === suggest.placeId)) {
      this.setState({ cities: [...this.state.cities, suggest] });
      this._geoSuggest.clear();
    } else {
      // push notif to say it already exists
    }
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
          <Geosuggest
            ref={el => (this._geoSuggest = el)}
            types={["(cities)"]}
            placeholder="Paris, New York ..."
            renderSuggestItem={renderSuggestItem}
            onSuggestSelect={this.onSuggestSelect}
          />
        </Paper>
        <Drawer open={this.state.open} onRequestClose={this.handleClose}>
          <SideList list={this.state.cities} />
        </Drawer>
      </div>
    );
  }
}

export default SideBar;
