import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Button,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "../../constants";
import Axios from "axios";
import SuccessMsg from "../../components/SuccessMsg";
import appDate from "../../constants/appDate";
import ErrorMsg from "../../components/ErrorMsg";
import CONSTANTVAR from '../../constants/constVariables'

function AddInstitution() {
  const [institutionName, setInstitutionName] = useState("");
  const [institutionType, setInstitutionType] = useState("School");
  const [uniformPic, setUniformPic] = useState("");
  const [pEPic, setpEPic] = useState("");
  const [uniformShortPrice, setUniformShortPrice] = useState("");
  const [uniformShirtPrice, setUniformShirtPrice] = useState("");
  const [uniformSweaterPrice, setUniformSweaterPrice] = useState("");
  const [uniformTiePrice, setUniformTiePrice] = useState("");
  const [pEShortPrice, setPEShortPrice] = useState("");
  const [pESkirtPrice, setPESkirtPrice] = useState("");
  const [pEtShirtPrice, setPEtShirtPrice] = useState("");
  const [showSuccess, setShowSuccess] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [showError, setShowError] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [Message, setMsg] = useState("");

  const institutions = [
    { key: 1, label: "School" },
    { key: 2, label: "Company" },
  ];

  const formData = {
    name: institutionName,
    dateAdded: appDate.fullDate,
    type: institutionType,
    imageBlob: {
      uniform: "18726626ahsyyafs-12",
      peKit: "18726626ajshhsi1sks-23",
    },
    uniformPrices: {
      short: uniformShortPrice,
      skirt: uniformShirtPrice,
      sweater: uniformSweaterPrice,
      tie: uniformTiePrice,
    },
    peKitPrices: {
      short: pEShortPrice,
      skirt: pESkirtPrice,
      tShirt: pEtShirtPrice,
    },
  };

  const clearData=()=>{
  setTimeout(() => {
    setInstitutionName("")
    setInstitutionType("")
    setPEShortPrice("")
    setPESkirtPrice("")
    setPEtShirtPrice("")
    setUniformShirtPrice("")
    setUniformShortPrice("")
    setUniformSweaterPrice("")
    setUniformTiePrice("")
  }, 2000);
  }
  const handleClose = () => {
    setShowSuccess({ ...showSuccess, open: false }) ||
      setShowError({ ...showError, open: false });
  };

  const addInstitution = (newState) => {
    Axios({
      url: `${CONSTANTVAR.APIURL}institutions`,
      data: formData,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.status);
        //setShowSuccess(true)
        if (res.status === 200) {
          clearData();
          setMsg("Success Posting data.");
          setShowSuccess({ open: true, ...newState });
        }
      })
      .catch((err) => {
        console.log("Error is " + err);
        setMsg("Something went wrong.Kindly check your data.");
        setShowError({ open: true, ...newState });
      });
  };

  const handleInstitutionChange = (event) => {
    setInstitutionType(event.target.value);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Container>
        <SuccessMsg
          msg={Message}
          state={showSuccess}
          handleClose={handleClose}
        ></SuccessMsg>

        <ErrorMsg
          msg={Message}
          state={showError}
          handleClose={handleClose}
        ></ErrorMsg>
        <Typography className={classes.textHead} variant="h4" component="h4">
          Add Institution
        </Typography>

        <Typography className={classes.textHead2}>
          Institution Details
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Institution name
            </Typography>
            <TextField
              onChange={(e) => setInstitutionName(e.target.value)}
              className={classes.textInput}
              id="outlined-basic"
              label="Enter name of institution"
              variant="outlined"
              value={institutionName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Choose Institution
            </Typography>

            <TextField
              defaultValue={institutionType}
              className={classes.textInput}
              id="outlined-basic"
              select
              label="Select"
              value={institutionType}
              onChange={handleInstitutionChange}
              // helperText="Please select your currency"
              variant="outlined"
            >
              {institutions.map((institute) => (
                <MenuItem key={institute.key} value={institute.label}>
                  {institute.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Typography className={classes.textHead2}>Uniform Pics</Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>Uniform</Typography>

            <div className={classes.imageDiv}></div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>P.E Kit</Typography>
            <div className={classes.imageDiv}></div>
          </Grid>
        </Grid>

        <Typography className={classes.textHead2}>
          Prices For Uniform
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Short Price
            </Typography>
            <TextField
              onChange={(e) => setUniformShortPrice(e.target.value)}
              type="number"
              className={classes.textInput}
              id="outlined-basic"
              label="Enter price in digits eg. 300"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Shirt Price
            </Typography>
            <TextField
              onChange={(e) => setUniformShirtPrice(e.target.value)}
              type="number"
              className={classes.textInput}
              id="outlined-basic"
              label="Enter price in digits eg. 300"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Sweater Price
            </Typography>
            <TextField
              onChange={(e) => setUniformSweaterPrice(e.target.value)}
              type="number"
              className={classes.textInput}
              id="outlined-basic"
              label="Enter price in digits eg. 300"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Tie Price
            </Typography>
            <TextField
              onChange={(e) => setUniformTiePrice(e.target.value)}
              className={classes.textInput}
              id="outlined-basic"
              label="Enter price in digits eg. 300"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Typography className={classes.textHead2}>Prices For PE Kit</Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Short Price
            </Typography>
            <TextField
              onChange={(e) => setPEShortPrice(e.target.value)}
              required
              type="number"
              className={classes.textInput}
              id="outlined-basic"
              label="Enter price in digits eg. 300"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              Skirt Price
            </Typography>
            <TextField
              onChange={(e) => setPESkirtPrice(e.target.value)}
              type="number"
              className={classes.textInput}
              id="outlined-basic"
              label="Enter price in digits eg. 300"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>
              T-shirt Price
            </Typography>
            <TextField
              onChange={(e) => setPEtShirtPrice(e.target.value)}
              type="number"
              className={classes.textInput}
              id="outlined-basic"
              label="Enter price in digits eg. 300"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className={classes.textInputLabel}></Typography>
          <Button
            onClick={() =>
              addInstitution({ vertical: "top", horizontal: "center" })
            }
            className={classes.submitBtn}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Container>
    </div>
  );
}

export default AddInstitution;
