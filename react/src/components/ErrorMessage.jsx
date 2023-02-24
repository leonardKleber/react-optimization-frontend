import React from 'react';

import Alert from '@mui/material/Alert';

function ErrorMessage({visible, message}) {
  if(visible === true) {
    return (
      <React.Fragment>
        <Alert 
          severity="error"
        >
          {message}
        </Alert>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default ErrorMessage;