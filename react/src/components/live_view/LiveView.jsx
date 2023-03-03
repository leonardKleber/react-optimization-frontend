import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import LiveCharts from './LiveCharts';

function LiveView(props) {
  const [currentCharts, setCurrentCharts] = useState({
    makespan: false,
    tardiness: false,
    penalties: false,
    major_setup_s1: false,
    major_setup_s2: false
  });
  const [finalCharts, setFinalCharts] = useState({});
  const [currentRefreshRate, setCurrentRefreshRate] = useState(0);
  const [finalRefreshRate, setFinalRefreshRate] = useState(0);

  const handle_makespan_change = (event) => {
    setCurrentCharts(currentCharts => ({...currentCharts, makespan: event.target.checked}));
  }
  
  const handle_tardiness_change = (event) => {
    setCurrentCharts(currentCharts => ({...currentCharts, tardiness: event.target.checked}));
  }

  const handle_penalties_change = (event) => {
    setCurrentCharts(currentCharts => ({...currentCharts, penalties: event.target.checked}));
  }

  const handle_s1_change = (event) => {
    setCurrentCharts(currentCharts => ({...currentCharts, major_setup_s1: event.target.checked}));
  }

  const handle_s2_change = (event) => {
    setCurrentCharts(currentCharts => ({...currentCharts, major_setup_s2: event.target.checked}));
  }

  const handle_rate_change = (event) => {
    setCurrentRefreshRate(event.target.value);
  }

  function submit_values() {
    setFinalRefreshRate(currentRefreshRate);
    setFinalCharts(currentCharts);
  }

  function render_checkboxes() {
    return (
      <React.Fragment>
        <Box 
          sx={{
            width: '25%', 
            paddingLeft: '1%', 
            paddingTop: '1%'
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Refreshrate in seconds"
              type="number"
              onChange={handle_rate_change}
            />
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={currentCharts.makespan}
                    onChange={handle_makespan_change}
                  />
                } 
                label="Makespan"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={currentCharts.tardiness}
                    onChange={handle_tardiness_change}
                  />
                } 
                label="Tardiness"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={currentCharts.penalties}
                    onChange={handle_penalties_change}
                  />
                } 
                label="Penalties"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={currentCharts.major_setup_s1}
                    onChange={handle_s1_change}
                  />
                } 
                label="Major Setup S1"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={currentCharts.major_setup_s2}
                    onChange={handle_s2_change}
                  />
                } 
                label="Major Setup S2"
              />
            </FormGroup>
            <Button
              variant="contained"
              onClick={submit_values}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </React.Fragment>
    )
  }

  if (finalRefreshRate === 0) {
    return (
      <React.Fragment>
        {render_checkboxes()}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {render_checkboxes()}
        <LiveCharts
          renderCharts={finalCharts}
          refreshRate={finalRefreshRate}
        />
      </React.Fragment>
    )
  }
}

export default LiveView;