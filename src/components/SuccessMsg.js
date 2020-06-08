import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./Alert";

function SuccessMsg(props) {
  const { state, handleClose } = props;

  const { vertical, horizontal, open } = state;
  return (
    <div>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    
    </div>
  );
}

export default SuccessMsg;
