import React from "react";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { withStyles, createStyleSheet } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";

import Tabs, { Tab } from "material-ui/Tabs";

const styleSheet = createStyleSheet("UndockedDrawer", {
  list: {
    width: 350,
    flex: "initial"
  },
  listFull: {
    width: "auto",
    flex: "initial"
  },
  appBar: {
    padding: 20
  }
});

function SideList({ classes, list }) {
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        {"My cities"}
      </AppBar>
      <List className={classes.list} disablePadding>
        {list &&
          list.map(item =>
            <div>
              <ListItem dense button key={item.placeId}>
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

export default withStyles(styleSheet)(SideList);
