import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Preloader = () => {
  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%',
    }}>
      <CircularProgress size={130} variant='indeterminate' thickness={2.2} />
    </Box>
  );
}