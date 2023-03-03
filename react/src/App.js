import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';

import ErrorMessage from "./components/ErrorMessage.jsx"
import SettingsView from "./components/settings_view/SettingsView";
import EvaluationView from "./components/evaluation_view/EvaluationView";
import LiveView from './components/live_view/LiveView.jsx';

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

function App() {
  const [status, setStatus] = useState(0);
  
  // Make an API call every 1000ms to check the current state of the optimization process.
  useInterval(() => {
    axios.get(API_BASE_URL + '/status')
      .then((response) => {
        setStatus(response.data);
      })
      .catch((e) => {
        // Set the status to a number that will later result in an unvalid status.
        setStatus(4);
      })
  }, 1000);
  
  // Checks the status of the optimiaztion and renderes the necessary view.
  if(status === 0) {
    return (
      <SettingsView/>
    )
  }
  if(status === 1) {
    return (
      <LiveView/>
    )
  }
  if(status === 2) {
    return (
      <EvaluationView/>
    )
  }

  // In case the status is neither 0, 1 or 2, return an error message.
  return (
    <Box 
      sx={{
        width: '50%', 
        paddingLeft: '25%', 
        paddingTop: '5%'
      }}
    >
      <ErrorMessage
        visible={true}
        message={'You are probably not connected to the API. Please check you connection.'}
      />
    </Box>
  )
}

export default App;