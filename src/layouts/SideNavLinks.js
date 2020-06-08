import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import { useStyles } from "../constants";

function SideNavLinks() {
  return (
    <div>
      <List>
        <ListItem button key="1">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="2">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="3">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="4">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="5">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </div>
  );
}

export default SideNavLinks;
