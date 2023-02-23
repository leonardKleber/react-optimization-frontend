import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import ScatterChart from './ScatterChart';

const OBJECTIVE_VALUES = [
  {val: 0, text: 'Makespan'},
  {val: 1, text: 'Total tardiness'},
  {val: 2, text: 'Penalties'},
  {val: 3, text: 'Major setup S1'},
  {val: 4, text: 'Major setup S2'}
]
const WRONG_NUMBER_OF_VALUES_ERROR = 'Select either 2 or 3 values!';

function EvaluationView(props) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [submittedValues, setSubmittedValues] = useState([]);
  const [valuesError, setValuesError] = useState('');
  
  function handleValueInput(event) {
    const {target: { value }} = event;
    setSelectedValues(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  function submit_values() {
    if(selectedValues.length === 2 || selectedValues.length === 3) {
      setValuesError('');
      setSubmittedValues(selectedValues);
    } else {
      setSubmittedValues([]);
      setValuesError(WRONG_NUMBER_OF_VALUES_ERROR);
    }
  }

  function render_input_field() {
    return (
      <React.Fragment>
        <Box 
          sx={{
            width: '50%', 
            paddingLeft: '25%', 
            paddingTop: '5%'
          }}
        >
          <Stack spacing={2}>
            <FormControl 
              sx={{ 
                width: '100%' 
              }}
            >
              <InputLabel 
                id="objective-values-input-label"
              >
                Objective Values
              </InputLabel>
              <Select
                labelId="objective-values-input-label"
                multiple
                value={selectedValues}
                onChange={handleValueInput}
                input={
                  <OutlinedInput label="Objective Values" />
                }
              >
                {OBJECTIVE_VALUES.map((value) => (
                  <MenuItem
                    key={value.val}
                    value={value.val}
                  >
                    {value.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={submit_values}
            >
              Submit
            </Button>
            <div 
              align="center"
              style={{
                color: "#FF0000",
                fontFamily: "Roboto",
              }}
            >
              {valuesError}
            </div>
          </Stack>
        </Box>
      </React.Fragment>
    )
  }

  if(submittedValues.length !== 0) {
    return (
      <React.Fragment>
        { render_input_field() }
        <Box 
          sx={{
            width: '50%', 
            paddingLeft: '25%'
          }}
        >
          <ScatterChart values={submittedValues}/>
        </Box>
      </React.Fragment>
    )
  } else {
    return(
      <React.Fragment>
        { render_input_field() }
      </React.Fragment>
    )
  }
}


export default EvaluationView;