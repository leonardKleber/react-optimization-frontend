import React from 'react';
import TextField from "@mui/material/TextField";

function StringField(props) {
  return (
    <React.Fragment>
      <TextField
        id={props.field.name}
        placeholder={props.field.default_val}
        label={props.field.display_name}
        onInput={(e) => {
          e.target.value = e.target.value.slice(0, props.field.length);
        }}
      />
    </React.Fragment>
  )
}

export default StringField;