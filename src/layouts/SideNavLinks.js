import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { DashboardOutlined, ShoppingCartOutlined,SearchOutlined, VerifiedUserOutlined, SupervisedUserCircle, FeedbackOutlined, LocationCityOutlined,SupervisedUserCircleOutlined} from '@material-ui/icons';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailIcon from "@material-ui/icons/Mail";
import { useStyles } from "../constants";
import { Divider } from "@material-ui/core";

function SideNavLinks() {
  return (
    <div >
      <List>
        <ListItem button key="1">
          <ListItemIcon>
            <DashboardOutlined />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="2">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Clothes" />
        </ListItem>
        <ListItem button key="3">
          <ListItemIcon>
            <LocationCityOutlined></LocationCityOutlined>
          </ListItemIcon>
          <ListItemText primary="Institutions" />
        </ListItem>
        <ListItem button key="4">
          <ListItemIcon>
           <ShoppingCartOutlined></ShoppingCartOutlined>
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button key="5">
          <ListItemIcon>
            <SupervisedUserCircleOutlined></SupervisedUserCircleOutlined>
          </ListItemIcon>
          <ListItemText primary="Mobile App Users" />
        </ListItem>
        <ListItem button key="6">
          <ListItemIcon>
           <SearchOutlined></SearchOutlined>
          </ListItemIcon>
          <ListItemText primary="Searches" />
        </ListItem>
        <ListItem button key="7">
          <ListItemIcon>
          <FeedbackOutlined></FeedbackOutlined>
          </ListItemIcon>
          <ListItemText primary="Complaints" />
        </ListItem>
        <Divider></Divider>
        <ListItem button key="8">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Terms" />
        </ListItem>
      </List>
    </div>
  );
}

export default SideNavLinks;
