import React from "react";

function SelectorField(props) {
  return (
    <React.Fragment>
      <div 
        style={{
          color: "grey",
          fontFamily: "Roboto"
        }}
      >
        {props.field.display_name}
      </div>
      <select 
        id={props.field.name}
        style={{
          height: "50px"
        }}
      >
        {props.field.values.map((value) => (
          <option value={value.val}>
            {value.text}
          </option>
        ))}
      </select>
    </React.Fragment>
  )
}

export default SelectorField;