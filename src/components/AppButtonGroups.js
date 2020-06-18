import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import {MailIcon,Visibility,Edit,Delete }from "@material-ui/icons/";
import { Link } from "react-router-dom";

function AppButtonGroups(props) {
  const {id,setSelectedId,selectedId,deleteInstitution, deletedStatus}=props
  return (
    <div>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Link to={`/institution/q?id=${id}`}>
        <Button id="myBtn" size="small" variant="outlined" color="primary"><Visibility fontSize="small"/></Button>

        </Link>
        <Button id="myBtn" size="small" variant="contained" color="primary"><Edit fontSize="small"/></Button>
        {
          selectedId === id?
          <Button id="myBtn" onClick={()=>deleteInstitution(id)} size="small" variant="contained" color="secondary"><Delete fontSize="small"/> Delete</Button>
          :
          <Button id="myBtn" onClick={()=>setSelectedId(id)} size="small" variant="outlined" color="secondary"><Delete fontSize="small"/></Button>


        }
      </ButtonGroup>

    </div>
  );
}

export default AppButtonGroups;
