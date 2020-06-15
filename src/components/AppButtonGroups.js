import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import {MailIcon,Visibility,Edit,Delete }from "@material-ui/icons/";

function AppButtonGroups() {
  return (
    <div>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button size="small" variant="outlined" color="primary"><Visibility fontSize="small"/></Button>
        <Button size="small" variant="contained" color="primary"><Edit fontSize="small"/></Button>
        <Button size="small" variant="contained" color="secondary"><Delete fontSize="small"/></Button>
      </ButtonGroup>
    </div>
  );
}

export default AppButtonGroups;
