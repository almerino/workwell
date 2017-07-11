import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import { LinearProgress } from "material-ui/Progress";
import "./SideList.css";

function SideList({ data }) {
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
                  <IconButton aria-label="Delete">
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

export const citiesQuery = gql`
  query {
    cities: allCities {
      id
      placeId
      description
    }
  }
`;

export const SimpleSideList = SideList;

export default graphql(citiesQuery)(SideList);
