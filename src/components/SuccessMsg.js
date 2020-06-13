import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./Alert";

function SuccessMsg(props) {
  const { state, handleClose, msg } = props;

  const { vertical, horizontal, open } = state;
  return (
    <div>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SuccessMsg;
