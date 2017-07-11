import React, { Component } from "react";
import PropTypes from "prop-types";
import Geosuggest from "react-geosuggest";
import Paper from "material-ui/Paper";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AddLocationIcon from "material-ui-icons/AddLocation";
import SideList from "../SideList/SideList";
import Snackbar from "material-ui/Snackbar";
import CloseIcon from "material-ui-icons/Close";
import "./Menu.css";

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

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, cities: [], snackbarOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleRequestClose() {
    this.setState({ snackbarOpen: false });
  }

  onSuggestSelect(suggest) {
    if (!this.state.cities.some(city => city.placeId === suggest.placeId)) {
      this.setState({
        cities: [...this.state.cities, suggest],
        message: `${suggest.label} has been added to the list.`,
        snackbarOpen: true
      });
      this.props.addToMap(this.state.cities);
      this._geoSuggest.clear();
    } else {
      this.setState({
        message: `${suggest.label} is already in the list.`,
        snackbarOpen: true
      });
      this._geoSuggest.clear();
    }

    // hack due to bug in react-geosuggest
    // https://github.com/ubilabs/react-geosuggest/issues/327
    this._geoSuggest.blur();
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

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6e3}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {this.state.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

Menu.propTypes = {
  addToMap: PropTypes.func.isRequired
};

export default Menu;
