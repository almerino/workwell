import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import { LinearProgress } from "material-ui/Progress";
import CityShape from "../../Shapes/CityShape";
import citiesQuery from "../../GraphQL/Queries/citiesQuery";
import deleteCityMutation from "../../GraphQL/Mutations/deleteCityMutation";
import "./SideList.css";

class SideList extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    const variables = {
      id
    };

    this.props.deleteCity({ variables }).then();
  }

  render() {
    const { data } = this.props;

    if (data.loading) {
      return <LinearProgress mode="query" />;
    }

    return (
      <div>
        <AppBar position="static" className="app-bar">
          {"My cities"}
        </AppBar>
        <List className="list" disablePadding>
          {data.cities &&
            data.cities.map(city =>
              <div key={city.placeId}>
                <ListItem dense button>
                  <ListItemText primary={city.description} />
                  <ListItemIcon>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        this.delete(city.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </div>
            )}
        </List>
      </div>
    );
  }
}

SideList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    cities: PropTypes.arrayOf(CityShape)
  })
};

export const SimpleSideList = SideList;

export default graphql(citiesQuery)(
  graphql(deleteCityMutation, {
    name: "deleteCity",
    options: {
      update: (store, { data: { deletedCity } }) => {
        const data = store.readQuery({ query: citiesQuery });
        data.cities.splice(
          data.cities.findIndex(city => city.id === deletedCity.id),
          1
        );
        store.writeQuery({ query: citiesQuery, data });
      }
    }
  })(SideList)
);
