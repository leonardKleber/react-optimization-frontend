import React, { useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import NumericField from "./NumericField.jsx";
import SelectorField from "./SelectorField.jsx";
import StringField from "./StringField.jsx";

const API_BASE_URL = 'http://127.0.0.1:8000';
const ERROR_WRONG_UID = 'There is no settings form for this UID.';

function SettingsView(props) {
  const [validUid, setValidUid] = useState(false);
  const [uidErrorMessage, setUidErrorMessage] = useState('');
  const [settingsForm, setSettingsForm] = useState({});

  // Handles the submission of the UID input form.
  function submit_uid() {
    let current_uid = document.getElementById('uid-input-field').value;

    axios.post(API_BASE_URL + '/provide_settings_form', {uid: current_uid}).then((response) => {
      if(response.data.valid === false) {
        setUidErrorMessage(ERROR_WRONG_UID);
      }
      setSettingsForm(response.data.settings);
      setValidUid(response.data.valid);
    })
  }

  // Collects values from settings from and sends it to the backend.
  function submit_settings() {
    let values = []

    for(let i = 0; i < settingsForm.fields.length; i++) {
      values.push({
        name: settingsForm.fields[i].name,
        val: document.getElementById(settingsForm.fields[i].name).value
      })
    }
    
    axios.post(API_BASE_URL + '/get_optimization_parameters', {values: {values}}).then((response) => {
      console.log(response.status);
    })
  }

  // Renders the UID input form.
  if(validUid === false) {
    return (
      <React.Fragment>
        <Box 
          sx={{
            width: '30%', 
            paddingLeft: '35%', 
            paddingTop: '25%'
          }}
        >
          <Stack spacing={2}>
            <TextField
              id="uid-input-field"
              label="UID"
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={submit_uid}
            >
              Submit
            </Button>
            <div 
              align="center"
              style={{
                color: "#FF0000",
                fontFamily: "Roboto"
              }}
            >
              {uidErrorMessage}
            </div>
          </Stack>
        </Box>
      </React.Fragment>
    ) 
  } 
  // Renders the settings form.
  else {
    return (
      <React.Fragment>
        <Box 
          sx={{
            width: '60%', 
            paddingLeft: '20%', 
            paddingTop: '10%'
          }}
        >
          <Stack spacing={2}>
            <div 
              align="center"
              style={{
                fontSize: "1.5em",
                fontFamily: "Roboto"
              }}
            >
              <b>{settingsForm.title}</b>
            </div>
            <div 
              align="center"
              style={{
                fontFamily: "Roboto"
              }}
            >
              {settingsForm.description}
            </div>
            {settingsForm.fields.map((field) => (
              <React.Fragment>
                {field.type === "string" && <StringField field={field}/>}
                {field.type === "numeric" && <NumericField field={field}/>}
                {field.type === "selector" && <SelectorField field={field}/>}
              </React.Fragment>
            ))}
            <Button
              variant="contained"
              onClick={submit_settings}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </React.Fragment>
    )
  }
}

export default SettingsView;