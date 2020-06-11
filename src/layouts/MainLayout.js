import React, { useState, useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import AppNav from "./AppNav";
import { useStyles } from "../constants";
import Sidenav from "./SideNav";
import { Button } from "@material-ui/core";
import SuccessMsg from "../components/SuccessMsg";
import ErrorMsg from "../components/ErrorMsg";
import EnhancedTable from "../components/AppTable";
import AddInstitution from "../views/Institutions/AddInstitution";
const axios=require('axios')

export default function Default() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [uniforms,setUniforms]=useState([]);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const getUniforms=()=>{
    axios({
      method:'GET',
      url:'institutions'
    }).then((res)=>{
      console.log(res);
      setUniforms(res.data[0].rows)

    }).catch((err)=>{
      console.log(err);

    })
  }

  useEffect(()=>{
    getUniforms();

  },[])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppNav handleDrawerOpen={handleDrawerOpen} open={open}></AppNav>
      <Sidenav
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        setOpen={setOpen}
      ></Sidenav>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          {/* <Button
            onClick={handleClick({ vertical: "top", horizontal: "center" })}
          >
            Top-Center
          </Button> */}
          {/* <SuccessMsg state={state} handleClose={handleClose} handleClick={handleClick}/> */}
          <ErrorMsg
            state={state}
            handleClose={handleClose}
            handleClick={handleClick}
          ></ErrorMsg>
          <AddInstitution></AddInstitution>
          {/* {
            uniforms.length != 0 || uniforms != 'undefined'?
            uniforms.map((uniform)=>{
              return (
              <p key={uniform.id}>{uniform.name} - {uniform.imageBlob.uniform} - {uniform.uniformPrices.short}</p>
              )

            })
            :null
          } */}
         
        </Typography>
        {/* <EnhancedTable></EnhancedTable> */}
      </main>
    </div>
  );
}
