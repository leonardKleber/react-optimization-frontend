import React, { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button'

function TimelineChart(props) {
  const [activated, setActivated] = useState(false);
  const [numberValues, setNumberValues] = useState(0);
  const [tardiness, setTardiness] = useState(false);

  const handleActivationChange = (event) => {
    setActivated(event.target.checked);
  }

  const handleNumberChange = (event) => {
    setNumberValues(event.target.value);
  }

  const handleTardinessChange = (event) => {
    setTardiness(event.target.checked);
  }

  function submit_values() {
    console.log(numberValues);
    console.log(tardiness);
  }

  // Defines the structure of the checkbox to activate the timeline settings.
  function render_checkbox() {
    return (
      <React.Fragment>
        <FormControlLabel 
          control={
            <Checkbox 
              checked={activated}
              onChange={handleActivationChange}
            />
          }
          label="Activate Timeline Chart"
        />
      </React.Fragment>
    )
  }

  // Defines the structure of the timeline settings.
  function render_timeline_settings() {
    return (
      <React.Fragment>
        <TextField
          label="Number of Results"
          type="number"
          onChange={handleNumberChange}
        />
        <FormControlLabel 
          control={
            <Checkbox 
              checked={tardiness}
              onChange={handleTardinessChange}
            />
          }
          label="Only with Tardiness"
        />
        <Button
          variant="contained"
          onClick={submit_values}
        >
          Submit
        </Button>
      </React.Fragment>
    )
  }

  if(activated === false) {
    return (
      <React.Fragment>
        {render_checkbox()}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {render_checkbox()}
        {render_timeline_settings()}
      </React.Fragment>
    )
  }
}

export default TimelineChart;