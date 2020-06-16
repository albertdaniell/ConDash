import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStyles } from "../constants";
import SideNavLinks from "./SideNavLinks";



export default function Sidenav(props) {
  const { handleDrawerClose, handleDrawerOpen, open, setOpen } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Drawer
        color="inherit"
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <SideNavLinks></SideNavLinks>
        <Divider />
      </Drawer>
    </div>
  );
}
