import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
  const [valuesError, setValuesError] = useState('');
  const [renderResults, setRenderResults] = useState(false);
  
  function handleValueInput(event) {
    const {target: { value }} = event;
    setSelectedValues(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  function submit_values() {
    if(selectedValues.length === 2) {
      setRenderResults(true);
      setValuesError('');
      return;
    }
    if(selectedValues.length === 3) {
      setRenderResults(true);
      setValuesError('');
      return;
    }
    setRenderResults(false);
    setValuesError(WRONG_NUMBER_OF_VALUES_ERROR);
    return;
  }

  // Defines the structure of the input field.
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
  // If no valid amount of values has been selected, render only the input field.
  if(renderResults === false) {
    return (
      <React.Fragment>
        { render_input_field() }
      </React.Fragment>
    )
  }
  // If a valid amount of values has been selected, render the input field and the results.
  else {
    return (
      <React.Fragment>
        { render_input_field() }
        <div>
          Results
        </div>
      </React.Fragment>
    )
  }
}

export default EvaluationView;