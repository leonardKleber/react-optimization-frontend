import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function LiveView(props) {
  const [renderCharts, setRenderCharts] = useState({
    makespan: false,
    tardiness: false,
    penalties: false,
    major_setup_s1: false,
    major_setup_s2: false
  });

  const handle_makespan_change = (event) => {
    setRenderCharts(renderCharts => ({...renderCharts, makespan: event.target.checked}));
  }
  
  const handle_tardiness_change = (event) => {
    setRenderCharts(renderCharts => ({...renderCharts, tardiness: event.target.checked}));
  }

  const handle_penalties_change = (event) => {
    setRenderCharts(renderCharts => ({...renderCharts, penalties: event.target.checked}));
  }

  const handle_s1_change = (event) => {
    setRenderCharts(renderCharts => ({...renderCharts, major_setup_s1: event.target.checked}));
  }

  const handle_s2_change = (event) => {
    setRenderCharts(renderCharts => ({...renderCharts, major_setup_s2: event.target.checked}));
  }

  function submit_values() {
    console.log(renderCharts)
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
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={renderCharts.makespan}
                    onChange={handle_makespan_change}
                  />
                } 
                label="Makespan"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={renderCharts.tardiness}
                    onChange={handle_tardiness_change}
                  />
                } 
                label="Tardiness"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={renderCharts.penalties}
                    onChange={handle_penalties_change}
                  />
                } 
                label="Penalties"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={renderCharts.major_setup_s1}
                    onChange={handle_s1_change}
                  />
                } 
                label="Major Setup S1"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={renderCharts.major_setup_s2}
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

  return (
    <React.Fragment>
      {render_checkboxes()}
    </React.Fragment>
  )
}

export default LiveView;