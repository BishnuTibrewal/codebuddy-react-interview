import { Snackbar, Alert } from "@mui/material";
import React from "react";

export default function Toast(props) {
  return (
    <Snackbar
      open={props.show}
      autoHideDuration={6000}
      onClose={props.onClose}
      sx={{ mb: 2 }}
      anchorOrigin={props.anchorOrigin ?? { vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={props.onClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
