import axios from 'axios';
import React, { useState } from 'react';

import Chart from "react-apexcharts";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button'

const API_BASE_URL = 'http://127.0.0.1:8000';

function TimelineChart(props) {
  const [activated, setActivated] = useState(false);
  const [numberValues, setNumberValues] = useState(0);
  const [tardiness, setTardiness] = useState(false);
  const [chartData, setChartData] = useState({});
  const [renderChart, setRenderChart] = useState(false);

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
    axios.post(
      API_BASE_URL + '/provide_timeline_chart',
      {value_number: numberValues, tardiness: tardiness}
    ).then((response) => {
      setChartData(response.data);
      setRenderChart(true);
    })
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
    if(renderChart === false) {
      return (
        <React.Fragment>
          {render_checkbox()}
          {render_timeline_settings()}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {render_checkbox()}
          {render_timeline_settings()}
          <Chart
            options={chartData.options}
            series={chartData.series}
            type={chartData.options.chart.type}
            height={chartData.options.chart.height}
          />
        </React.Fragment>
      )
    }
  }
}

export default TimelineChart;