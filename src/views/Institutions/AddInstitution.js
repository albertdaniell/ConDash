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
import { imgSrcToBlob, createBlob, createObjectURL, blobToDataURL, blobToBinaryString, binaryStringToBlob, blobToBase64String, dataURLToBlob } from 'blob-util'
const { v4: uuidv4 } = require("uuid");


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
  const [url1,setUrl1]=useState('')
  const [url2,setUrl2]=useState('')
  const [url3,setUrl3]=useState('')
  const [url4,setUrl4]=useState('')



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
    id: uuidv4(),
    name: institutionName,
    dateAdded: appDate.fullDate,
    type: institutionType,
    imageBlob: {
      uniform: url1,
      peKit: url2,
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


  const randomFn1=(e)=>{
    const img=document.getElementById('myImg').src
    let f=e.target.files[0];
    if(/(jpe?g|png|gif)$/i.test(f.type)){
      console.log(e.target.files[0]);
      console.log(e.target.files[0])
  
    let string=binaryStringToBlob(e.target.files[0])
    var myBlob = createBlob([e.target.files[0]], {type: e.target.files[0].type})
  let reader = new FileReader();
  let base64=reader.readAsDataURL(myBlob);
    console.log("type",myBlob.type)
  
    blobToDataURL(myBlob).then(function (base64String) {
    var blob =dataURLToBlob(base64String);
    let objurl=createObjectURL(blob)
    console.log(objurl)
  
   setUrl1(base64String)
     
    }).catch(function (err) {
      // error
    });
    }
    else{
      setUrl1('');
      alert("File format is incorrect, Kindly Choose an image")
    }

  }


  const randomFn2=(e)=>{
    const img=document.getElementById('myImg').src
    let f=e.target.files[0];
    if(/(jpe?g|png|gif)$/i.test(f.type)){
      console.log(e.target.files[0]);
      console.log(e.target.files[0])
  
    let string=binaryStringToBlob(e.target.files[0])
    var myBlob = createBlob([e.target.files[0]], {type: e.target.files[0].type})
  let reader = new FileReader();
  let base64=reader.readAsDataURL(myBlob);
    // console.log(myBlob)
  
    blobToDataURL(myBlob).then(function (base64String) {
    var blob =dataURLToBlob(base64String);
   
    
   setUrl2(base64String)
   console.log("url2",url2)
     
    }).catch(function (err) {
      // error
    });
    }
    else{
      setUrl2('');
      alert("File format is incorrect, Kindly Choose an image")
    }

  }

  let myconvertBlobToBase64=(blob)=>{
    console.log(blob)
    let base='';
    
    blobToDataURL(blob).then((base64String)=> {
     base = base64String
    //  console.log(base64String)
     //return base64String;
     setUrl3(base64String)
       
      })
      console.log("base",base)

      return base
  }


  let myconvertBlobToBase642=(blob)=>{
    //console.log(blob)
    let base='';
    
    blobToDataURL(blob).then((base64String)=> {
     base = base64String
    //  console.log(base64String)
     //return base64String;
     setUrl4(base64String)
       
      })
      console.log("base",base)

      return base
  }

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

            <div className={classes.imageDiv}>


  <img src={url1} id="myImg2" style={{height:'auto',width:350}}></img>


            </div>
            <input onChange={(e)=>randomFn1(e)} type="file" id="myImg"></input>

          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography className={classes.textInputLabel}>P.E Kit</Typography>
            <div className={classes.imageDiv}>




  <img src={url2} id="myImg2" style={{height:'auto',width:350}}></img>


            </div>
            <input onChange={(e)=>randomFn2(e)} type="file" id="myImg"></input>

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
