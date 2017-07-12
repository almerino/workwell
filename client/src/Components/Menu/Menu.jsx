import React, { Component } from "react";
import { graphql } from "react-apollo";
import Geosuggest from "react-geosuggest";
import Paper from "material-ui/Paper";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import SideList from "../SideList/SideList";
import Snackbar from "material-ui/Snackbar";
import CloseIcon from "material-ui-icons/Close";
import GeoSuggestItem from "../GeoSuggestItem/GeoSuggestItem";
import createCityMutation from "../../GraphQL/Mutations/createCityMutation";
import citiesQuery from "../../GraphQL/Queries/citiesQuery";
import "./Menu.css";
import "./GeoSuggest.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, snackbarOpen: false };
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
    if (suggest.placeId === undefined) {
      this.setState({
        message: `${suggest.label} doesn't exist.`,
        snackbarOpen: true
      });
      this._geoSuggest.clear();
    } else if (
      !this.props.data.cities.some(city => city.placeId === suggest.placeId)
    ) {
      const variables = {
        placeId: suggest.placeId,
        description: suggest.description,
        lat: suggest.location.lat,
        lng: suggest.location.lng
      };

      this.props
        .createCity({ variables })
        .then(response => {
          this.setState({
            message: `${suggest.label} has been added to the list.`,
            snackbarOpen: true
          });
        })
        .catch(e => {
          console.log(e);
        });

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
            renderSuggestItem={GeoSuggestItem}
            onSuggestSelect={this.onSuggestSelect}
          />
        </Paper>
        <Drawer open={this.state.open} onRequestClose={this.handleClose}>
          <SideList />
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

export const SimpleMenu = Menu;

export default graphql(createCityMutation, {
  name: "createCity",
  options: {
    update: (store, { data: { city } }) => {
      const data = store.readQuery({ query: citiesQuery });
      data.cities.push(city);
      store.writeQuery({ query: citiesQuery, data });
    }
  }
})(graphql(citiesQuery)(Menu));
