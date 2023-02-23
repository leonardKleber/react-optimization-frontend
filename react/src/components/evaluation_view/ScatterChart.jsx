import axios from 'axios';
import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import Plot from "react-plotly.js";

const API_BASE_URL = 'http://127.0.0.1:8000';

function ScatterChart(props) {
  const [currentValuesInUse, setCurrentValuesInUse] = useState([]);
  const [chartData, setChartData] = useState({});
  const [plotData, setPlotData] = useState([]);
  const [renderChart, setRenderChart] = useState(false);

  useEffect(() => {
    // Check if new props differ from the ones already in use.
    // If they are the same don't do anything.
    if(props.values !== currentValuesInUse) {
      // Check if the new props are valid:
      if(props.values.length === 2 || props.values.length === 3) {
        // Check weather to load a 2D or 3D chart.
        if(props.values.length === 2) {
          axios.post(
            API_BASE_URL + '/provide_2d_scatter_chart',
            {value1: props.values[0], value2: props.values[1]}
          ).then((response) => {
            setChartData(response.data);
            setCurrentValuesInUse(props.values);
            setRenderChart(true);
          })
        } else {
          axios.post(
            API_BASE_URL + '/provide_3d_scatter_chart',
            {
              value1: props.values[0], 
              value2: props.values[1], 
              value3: props.values[2],
              width: window.innerWidth,
            }
          ).then((response) => {
            setPlotData(response.data);
            setCurrentValuesInUse(props.values);
            setRenderChart(true);
          })
        }
      }
      // If they are not valid, stop rendering the current chart.
      else setRenderChart(false);
    } 
  })

  if(renderChart === false) {
    return (
      <React.Fragment>
        <div 
          align="center"
          style={{
            fontFamily: "Roboto",
            fontSize: '2em'
          }}
            >
          Loading...
        </div>
      </React.Fragment>
    )
  } else {
    if(currentValuesInUse.length === 2) {
      return (
        <React.Fragment>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="scatter"
            height={350}
          />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Plot 
            data={plotData}
            layout={plotData[0].layout}
          />
        </React.Fragment>
      )
    }
  }
}

export default ScatterChart;