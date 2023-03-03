import axios, { all } from 'axios';
import React, { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import SingleLiveChart from './SingleLiveChart';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Defines a useRef that takes a function and executes it every x ms.
function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function LiveCharts({renderCharts, refreshRate}) {
  const [allChartsData, setAllChartsData] = useState({});
  const [renderAnything, setRenderAnything] = useState(false);
  // Make an API call every xms to get the current chart data.
  useInterval(() => {
    axios.get(API_BASE_URL + '/provide_chart_data').then((response) => {
      if(response.data === 'Done') {
        setRenderAnything(false);
      } else {
        setAllChartsData(response.data);
        setRenderAnything(true);
      }
    })
  }, refreshRate*1000);

  if (renderAnything === false) {
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
    return (
      <React.Fragment>
        <Box 
          sx={{
            width: '75%', 
            paddingLeft: '12.5%', 
            paddingTop: '5%'
          }}
        >
          <Stack spacing={2}>
            <SingleLiveChart
              render={renderCharts.makespan}
              data={allChartsData.makespan}
            />
            <SingleLiveChart
              render={renderCharts.tardiness}
              data={allChartsData.tardiness}
            />
            <SingleLiveChart
              render={renderCharts.penalties}
              data={allChartsData.penalties}
            />
            <SingleLiveChart
              render={renderCharts.major_setup_s1}
              data={allChartsData.major_setup_s1}
            />
            <SingleLiveChart
              render={renderCharts.major_setup_s2}
              data={allChartsData.major_setup_s2}
            />
          </Stack>
        </Box>
      </React.Fragment>
    )
  }
}

export default LiveCharts;