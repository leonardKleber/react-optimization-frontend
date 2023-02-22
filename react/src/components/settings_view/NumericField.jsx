import React from "react";
import TextField from "@mui/material/TextField";

function NumericField(props) {
  return (
    <React.Fragment>
      <TextField
        id={props.field.name}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        placeholder={props.field.default_val}
        label={props.field.display_name}
      />
    </React.Fragment>
  )
}

export default NumericField;