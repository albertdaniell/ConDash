import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStyles } from "../../constants";

import {
  LinearProgress,
  Typography,
  Button,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { NavLink,  useLocation
} from "react-router-dom";
import AppButtonGroups from "../../components/AppButtonGroups";
import appDate from "../../constants/appDate";
import CONSTANTVAR from '../../constants/constVariables'
import { Add } from "@material-ui/icons";

const axios = require("axios");

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
function ViewInstitution() {
  const [InstitutionsData, setInstitutionData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name,setName]=useState('');

    const getInstitutionData = () => {
        axios({
          method: "GET",
          url: `${CONSTANTVAR.APIURL}institutions/${id}`,
          body:{deletedStatus:false},
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: 'no-cors' 
        })
          .then((res) => {
            console.log(res);
          setInstitutionData(res.data[0].rows)
          console.log("name",res.data[0].rows[0].name)
          setName(res.data[0].rows[0].name)
    
         //   setInstitutions(res.data[0].rows);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const classes = useStyles();
    //const {id}=props;
    let query = useQuery();
    const id=query.get("id")
useEffect(()=>{
    getInstitutionData()
},[])

    return (
        <div className={classes.root}>
      <Container>
        <Typography id="textHead" variant="h4" component="h4">
          {name}
        </Typography>

        <Grid container spacing={4}>
            <Grid item xs={12} sm={9}>
                haha
                </Grid>
                <Grid style={{marginBottom:20}}  item xs={12} sm={3}>
                    <Grid>
                    <Button style={{width:'100%'}}  variant="contained" color="primary">
                 Edit
                </Button>
                    </Grid>
                    <br/>
                <Grid>
                <Button style={{width:'100%'}} variant="contained" color="secondary">
                 Delete
                </Button>
                </Grid>

              
                </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ViewInstitution
