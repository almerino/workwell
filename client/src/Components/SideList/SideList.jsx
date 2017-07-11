import React from "react";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { withStyles, createStyleSheet } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import "./SideList.css";

function SideList({ list }) {
  return (
    <div>
      <AppBar position="static" className="app-bar">
        {"My cities"}
      </AppBar>
      <List className="list" disablePadding>
        {list &&
          list.map(item =>
            <div key={item.placeId}>
              <ListItem dense button>
                <ListItemText primary={item.description} />
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

export default SideList;
