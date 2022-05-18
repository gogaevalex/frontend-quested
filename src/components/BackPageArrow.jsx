import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ArrowLeftSvg from '@ui/icons/arrow-left.svg';
import { useHistory } from "react-router-dom";

export const BackPageArrow = () => {
    let history = useHistory();
  return (
    <Box sx={{
        alignSelf: 'flex-start',
    }}>
        <IconButton
            onClick={() => history.goBack()}
        >
            <ArrowLeftSvg />
        </IconButton>
    </Box>
  );
}