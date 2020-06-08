import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./Alert";

function ErrorMsg(props) {
  const { state, handleClose } = props;

  const { vertical, horizontal, open } = state;
  return (
    <div>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          This is a error message!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ErrorMsg;

