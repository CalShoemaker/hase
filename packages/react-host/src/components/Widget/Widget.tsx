import * as React from 'react';
import Paper from '@mui/material/Paper';

export const Widget = (props:any) => {
  return (
    <Paper sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 240,
      ...props.sx
    }}>
    { props.children }
    </Paper>
  );
}

export default Widget