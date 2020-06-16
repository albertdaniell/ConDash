import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import {MailIcon,Visibility,Edit,Delete }from "@material-ui/icons/";

function AppButtonGroups(props) {
  const {id,setSelectedId,selectedId,deleteInstitution}=props
  return (
    <div>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button size="small" variant="outlined" color="primary"><Visibility fontSize="small"/></Button>
        <Button size="small" variant="contained" color="primary"><Edit fontSize="small"/></Button>
        {
          selectedId === id?
          <Button onClick={()=>deleteInstitution(id)} size="small" variant="contained" color="secondary"><Delete fontSize="small"/> Delete</Button>
          :
          <Button onClick={()=>setSelectedId(id)} size="small" variant="outlined" color="secondary"><Delete fontSize="small"/></Button>


        }
      </ButtonGroup>

    </div>
  );
}

export default AppButtonGroups;
