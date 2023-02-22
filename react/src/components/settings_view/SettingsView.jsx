import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const API_BASE_URL = 'http://127.0.0.1:8000';
const ERROR_WRONG_UID = 'There is no settings form for this UID.';

function SettingsView(props) {
  const [validUid, setValidUid] = useState(false);
  const [uidErrorMessage, setUidErrorMessage] = useState('');

  // Handles the submission of the UID input form.
  function submit_uid() {
    let current_uid = document.getElementById('uid-input-field').value;
    axios.post(API_BASE_URL + '/check_uid/', {uid: current_uid}).then((response) => {
      setValidUid(response.data.data);
      if(response.data.data === false) setUidErrorMessage(ERROR_WRONG_UID);
    })
  }

  // Renders the UID input form.
  if(validUid === false) return (
    <React.Fragment>
      <Box sx={{width: '30%', paddingLeft: '35%', paddingTop: '25%'}}>
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
  
  return (
    <div>Status: 200</div>
  )
}

export default SettingsView;